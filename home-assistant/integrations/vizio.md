# VIZIO SmartCast

**VIZIO SmartCast** 集成允许您控制兼容 [SmartCast](https://www.vizio.com/smartcast-app) 的电视和条形音箱（2016 年及之后的型号）。

## 查找设备

如果启用了 `zeroconf` 发现，您的设备会被自动发现。若要手动发现设备，请阅读以下小节。

### 在本地安装 `pyvizio`

:::note
如果找不到 `pip3` 命令，请改用 `pip`

:::

* 若要安装，请在终端中运行 `pip3 install pyvizio`。
* 如果本地已安装 `pyvizio`，请在终端中运行 `pip3 install --upgrade pyvizio`，确保使用的是最新版本。

### 发现设备

使用以下命令查找设备：

```bash
pyvizio --ip=0 discover
```

请记下其 IP 地址和端口号。如果没有找到预期中的设备，可以通过添加 `--timeout` 选项来增加发现超时时间（例如：`pyvizio --ip=0 discover --timeout=10`）。

## 配对

此集成需要访问令牌才能与电视通信（扬声器不需要访问令牌）。您可以通过手动方式或 Home Assistant 前端完成配对流程来获取访问令牌。

### 使用 Home Assistant 前端进行配对

* **使用 `configuration.yaml`：** 如果您已在 `configuration.yaml` 中添加 `vizio` 条目，但没有提供访问令牌值，那么在 Home Assistant 初始化后，您会看到一个可配置的 VIZIO SmartCast 设备。打开配置窗口后，系统会引导您完成配对流程。虽然 Home Assistant 会在 `vizio` 实体存在期间保存访问令牌，但仍建议您记下窗口中显示的访问令牌值，并将其添加到 `configuration.yaml` 中。这样，如果您未来重建 Home Assistant 实例，就无需再次进行配对。
* **通过 Integrations 菜单使用自动发现或手动设置：** 若要启动配对流程，请在初始配置中将 Access Token 留空后提交。

### 使用 CLI 手动配对

下面这个由 [JeffLIrion](https://github.com/JeffLIrion) 编写的脚本可用于获取身份验证令牌。您需要将 `<IP>` 替换为自己的 IP 地址，并将 `<PORT>` 替换为端口（通常是 7345 或 9000）。

```bash
#!/bin/bash

VIZIO_IP="<IP>"
VIZIO_PORT="<PORT>"

curl -k -H "Content-Type: application/json" -X PUT -d '{"DEVICE_ID":"pyvizio","DEVICE_NAME":"Python Vizio"}' https://${VIZIO_IP}:${VIZIO_PORT}/pairing/start

read -p "PIN:  " VIZIO_PIN
read -p "PAIRING_REQ_TOKEN:  " VIZIO_PAIRING_REQ_TOKEN

curl -k -H "Content-Type: application/json" -X PUT -d '{"DEVICE_ID": "pyvizio","CHALLENGE_TYPE": 1,"RESPONSE_VALUE": "'"${VIZIO_PIN}"'","PAIRING_REQ_TOKEN": '"${VIZIO_PAIRING_REQ_TOKEN}"'}' https://${VIZIO_IP}:${VIZIO_PORT}/pairing/pair
```

### 使用 `pyvizio` 手动配对

若要手动获取身份验证令牌，请按照以下步骤操作：

继续之前，请确保设备已开机。

| Parameter     | Description                                                             |
| :------------ | :---------------------------------------------------------------------- |
| `ip`          | `IP Address:Port`（从上一节获取） |
| `device_type` | 要连接的设备类型。可选值为 `tv` 或 `speaker` |

输入以下命令以启动配对：

```bash
pyvizio --ip={ip:port} --device_type={device_type} pair
```

启动后会显示两个值：

| Value           | Description                                                                                             |
| :-------------- | :------------------------------------------------------------------------------------------------------ |
| Challenge type  | 通常应为 `"1"`。 |
| Challenge token | 在下一步完成配对时所需的令牌 |

此时，电视顶部应会显示一个 PIN 码。拿到这些值后，您就可以完成配对：

```bash
pyvizio --ip={ip:port} --device_type={device_type} pair-finish --token={challenge_token} --pin={pin} --ch_type={challenge_type}
```

配置 Home Assistant 时，您需要使用该命令返回的身份验证令牌。

## 配置

若要将 VIZIO 电视添加到安装中，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
vizio:
  - host: "DEVICE_IP:DEVICE_PORT"
    access_token: AUTH_TOKEN
```

```yaml
host:
  description: "设备的 `IP Address:Port`（端口可选，但建议填写）。"
  required: true
  type: string
name:
  description: 设备昵称，用于生成设备实体 ID。如果配置了多个 VIZIO 设备，则每个条目的值都必须唯一。
  required: false
  type: string
  default: VIZIO SmartCast
access_token:
  description: 您在配对流程最后一步获得的身份验证令牌。仅当设备是电视时才需要此令牌，您也可以选择不在配置中提供，而改为通过 Home Assistant 前端完成配对流程。
  required: false
  type: string
device_class:
  description: 设备类别。有效选项为 `tv` 或 `speaker`。
  required: false
  type: string
  default: "`tv`"
volume_step:
  description: 每次调节音量时增减的步数。
  required: false
  type: integer
  default: 1
apps:
  description: 使用此部分定义应用专属设置（仅适用于 VIZIO 智能电视）。
  required: false
  type: map
  keys:
    include:
      description: 要包含在信号源列表中的应用列表。不能与 `exclude` 同时使用。
      required: exclusive
      type: list
    exclude:
      description: 要从信号源列表中排除的应用列表。不能与 `include` 同时使用。
      required: exclusive
      type: list
    additional_configs:
      description: 需要手动配置的应用列表，这些应用不在集成默认提供的应用列表中。
      required: false
      type: map
      keys:
        name:
          description: 该应用在信号源列表中显示的名称，也用于启动应用。
          required: true
          type: string
        config:
          description: 用于检测和启动该应用的配置。
          required: true
          type: map
          keys:
            APP_ID:
              description: 请参阅下方的[获取应用配置](#obtaining-an-app-configuration)部分。
              required: true
              type: string
            NAME_SPACE:
              description: 请参阅下方的[获取应用配置](#obtaining-an-app-configuration)部分。
              required: true
              type: integer
            MESSAGE:
              description: 请参阅下方的[获取应用配置](#obtaining-an-app-configuration)部分。
              required: false
              type: string
              default: null
```

```yaml
# Complete configuration.yaml entry
vizio:
  - host: "DEVICE_IP:DEVICE_PORT"
    access_token: AUTH_TOKEN
    name: MY_VIZIO_DEVICE
    device_class: tv
    volume_step: 1
    apps:
      include:
        - APP_1
        - APP_2
      exclude:
        - APP_1
        - APP_2
      additional_configs:
        - name: MY_CUSTOM_APP
          config:
            APP_ID: 9
            NAME_SPACE: 9
            MESSAGE: MY_MESSAGE
```

### 获取应用配置

如果某个您希望通过 Home Assistant 启动的应用默认未被检测到，您就需要在 `configuration.yaml` 中指定该应用配置。该配置可以在设备运行未知应用时，从 `app_id` 状态属性中获取。

### 获取可包含或排除的有效应用列表

默认提供的应用列表在[这里](https://github.com/vkorn/pyvizio/blob/master/pyvizio/const.py#L23)静态定义。如果您希望使用更精简的列表，可以在 Home Assistant 前端查看 VIZIO 智能电视的信号源列表，或者运行以下命令（需要本地安装 `pyvizio`）：

```bash
pyvizio --ip=0 get-apps-list
```

## 操作 `vizio.update_setting`

此操作允许您更新指定 VIZIO 设备上的设置。要执行此操作，您需要知道设置类型和设置名称。您可以在 SmartCast 应用中进入目标设备的设置页面来确定它们。设置类型是您会选择的第一个菜单项的小写形式（例如 `display`、`audio`、`system`），设置名称则与应用中显示的名称一致，只是空格会被替换为下划线，并且全部转为小写（例如 AV delay 会写作 `av_delay`）。

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | yes | 要更新设置的设备。 | `media_player.vizio_smartcast` |
| `setting_type` | no | 设置类型。 | `audio` |
| `setting_name` | no | 设置名称。 | `eq` |
| `new_value` | no | 要设置的新值。 | `Music` |

## 说明与限制

### 打开设备

如果您的设备 `Power Mode` 设置为 `Eco Mode`，则无法开机。

### 切换曲目

切换曲目的行为类似于切换频道。如果当前输入源不是普通电视，该命令可能不会产生任何效果。
