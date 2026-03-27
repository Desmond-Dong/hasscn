---
title: Egardia
description: 'Egardia 集成可让您控制 Egardia(https://egardia.com/)/Woonveilig(https://woonveilig.nl) 控制面板。这类报警面板在世界各地会以不同品牌名称销售，例如在荷兰称为 Woonveilig。'
ha_category:
  - Alarm
  - Binary sensor
  - Hub
ha_release: 0.65
ha_iot_class: Local Polling
ha_codeowners:
  - '@jeroenterheerdt'
ha_domain: egardia
ha_platforms:
  - alarm_control_panel
  - binary_sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Egardia

**Egardia** 集成可让您控制 [Egardia](https://egardia.com/)/[Woonveilig](https://woonveilig.nl) 控制面板。这类报警面板在世界各地会以不同品牌名称销售，例如在荷兰称为 Woonveilig。该集成已经在 Egardia/Woonveilig 平台的 WL-1716、GATE-01、GATE-02 和 GATE-03 版本上进行了测试。除了集成报警控制面板外，受支持的传感器（目前为门磁）也会自动添加。

您需要知道报警面板在本地网络中的 IP 地址。请先在浏览器中访问该 IP 地址，并使用您的 Egardia/Woonveilig 账户登录，以确认能够正常访问面板。

## 基本配置

要启用与报警面板的集成，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
egardia:
  host: YOUR_HOST
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

```yaml
host:
  description: Egardia/Woonveilig 报警面板的本地 IP 地址。
  required: true
  type: string
username:
  description: Egardia/Woonveilig 账户的用户名。
  required: true
  type: string
password:
  description: Egardia/Woonveilig 账户的密码。
  required: true
  type: string
version:
  description: Egardia 系统的版本。目前支持 `GATE-01`、`GATE-02` 和 `GATE-03`。
  required: false
  type: string
  default: "GATE-01"
port:
  description: 报警面板的端口。
  required: false
  type: integer
  default: 80
report_server_enabled:
  description: 启用服务器上报。
  required: false
  type: string
  default: false
report_server_port:
  description: Egardia 服务器的端口。
  required: false
  type: integer
  default: 52010
report_server_codes:
  description: 不同状态对应代码列表的映射。
  required: false
  type: map
  keys:
    arm:
      description: `arm` 状态对应的代码列表。
      required: false
      type: list
    disarm:
      description: `disarm` 状态对应的代码列表。
      required: false
      type: list
    armhome:
      description: `armhome` 状态对应的代码列表。
      required: false
      type: list
    triggered:
      description: `triggered` 状态对应的代码列表。
      required: false
      type: list
    ignore:
      description: 将被忽略的代码列表。
      required: false
      type: list
```

请注意，这种基本配置只能让您读取报警系统的布防、离家布防和撤防状态；当报警被触发时，状态**不会**自动更新。这是由 Egardia 系统的设计方式决定的，报警触发信息通常会通过其服务器传递。

不过，您可以通过下面的步骤更改这一点。这属于更高级、也更实用的配置方式。

:::note
GATE-02 设备似乎存在多个软件版本。我们收到过一些 GATE-02 用户反馈，他们在 GATE-02 模式下成功运行了此软件包；也有人反馈说，必须将版本指定为 GATE-03，才能成功集成他们的 GATE-02 设备。

:::
## 高级配置

1. 登录报警系统的控制面板。您需要访问 `http://[控制面板的 IP]`。这个地址您已经知道，因为在上面的基础配置中就需要用到。使用您的 Egardia/Woonveilig 用户名和密码登录控制面板。
2. 登录后，前往 *System Settings*、*Report*，然后将主服务器的 Server Address 改为您的 Home Assistant 主机的 IP 地址或主机名。端口号可以保留为 52010，也可以改成您喜欢的其他值。**务必修改主服务器的设置，否则消息不会发送过来。请注意，这样做会限制，甚至完全停止您通过 Egardia/Woonveilig 官方服务接收到的报警消息。** 也许这正是您想要的结果。完成后选择 `OK` 保存设置。**如果系统支持 XMPP，请在 XMPP 菜单中使其配置失效（例如修改用户名）以禁用 XMPP。对于较新的 GATE-03 固件，这是必需的，因为如果存在有效的 XMPP 配置，系统将完全不会使用 Reporting server。**
3. Egardia 集成依赖于捕获报警系统在发生事件（状态变化或触发）时发出的状态代码。这些代码在每种情况下都是唯一的。比如，当某个传感器被触发时，报警系统发出的代码对该传感器来说是唯一的。如果您有多个用户或遥控器，那么每个遥控器以及每个用户在改变报警状态时，也都会发出各自独有的代码。为了让 Egardia 集成正常工作，您需要先捕获这些代码。操作方法是在 Home Assistant 主机上运行 `$ sudo python3 egardiaserver.py`。参数的详细说明请参阅 [python-egardia 仓库](https://github.com/jeroenterheerdt/python-egardia)。该脚本会接收来自报警控制面板的状态代码并将其显示出来。请记录显示的代码以及它们对应的状态（参见下面的第 4 步）。请尽量通过所有可能的方式切换报警状态到所有模式（撤防、布防、居家布防），包括所有用户、遥控器、网页登录以及 App 操作，同时也要用所有可能方式触发报警，以尽可能完整地收集系统生成的全部代码。通常只需运行一次脚本，并在捕获完所有可能代码后停止即可。另外，如果您之后新增了用户、遥控器或传感器，请务必重新运行该脚本来捕获新增代码，以便更新配置（参见下面的第 4 步）。**为了避免打扰，触发报警前，您可以先临时禁用警报器（可在 Panel Settings 中设置）。**
4. 获取这些代码后，更新您的 `configuration.yaml`：

   ```yaml
   # Example configuration.yaml entry
   egardia:
     host: YOUR_HOST
     username: YOUR_USERNAME
     password: YOUR_PASSWORD
     report_server_enabled: true
     report_server_port: PORT_OF_EGARDIASERVER # optional, defaults to 52010
     report_server_codes:
       arm:
         - XXXXXXXXXXXXXXXX
         - XXXXXXXXXXXXXXXX
       disarm:
         - XXXXXXXXXXXXXXXX
         - XXXXXXXXXXXXXXXX
       armhome:
         - XXXXXXXXXXXXXXXX
       triggered:
         - XXXXXXXXXXXXXXXX
         - XXXXXXXXXXXXXXXX
         - XXXXXXXXXXXXXXXX
       ignore:
         - XXXXXXXXXXXXXXXX
   ```

   请注意，对于所有代码分组（如 *arm*、*disarm* 等），都可以填写多个代码，因为每个传感器触发时的代码都不同，而且系统中的每个用户也都有各自独立的布防和撤防代码。还要注意，系统会定期执行自检，这些自检信息同样会被上报。由于 Home Assistant 目前没有合适的方式来正确处理这些信息，您可以将这些代码填入 *ignore* 中（同样可以填写多个代码）。如果 Egardia 集成收到任何列在 *ignore* 中的代码，它会忽略这些代码并继续保留当前状态，而不是错误地切换状态。

   这一点很有用。例如，您在夜间布防后，系统通常至少会执行一次自检；如果该自检代码没有在配置中被正确处理，Home Assistant 可能会把报警状态错误地重置为默认的未布防状态。实际上这并不正确。将这些代码加入 *ignore* 后，即使发生系统自检，Home Assistant 仍会继续显示正确的报警状态，如 `disarm`、`arm`、`home` 或 `triggered`。
5. 测试您的设置并开始使用。只要报警状态发生变化，包括被触发时，集成都会更新。您可以据此创建自己的自动化并发送通知。*注意*：旧版本需要额外部署一个单独的 egardiaserver，现在已经不再需要，相关系统服务也可以移除（使用 `systemctl`）。

## 二进制传感器

`egardia` 平台允许您在 Home Assistant 中获取 [Egardia](https://www.egardia.com)/[Woonveilig](https://www.woonveilig.nl) 二进制传感器的数据。
目前仅支持门磁。红外传感器不受支持，而且大概率永远不会支持，因为它们的状态无法在报警控制面板之外读取。烟雾传感器和其他类型设备未来可能会加入支持，但当前尚未支持。
