---
title: Ecovacs
description: 'Ecovacs 集成是集成 Ecovacs(https://www.ecovacs.com)（Deebot）扫地机和割草机的主要集成。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Hub
  - Lawn mower
  - Vacuum
ha_iot_class: Cloud Push
ha_release: 0.77
ha_codeowners:
  - '@mib1185'
  - '@edenhaus'
  - '@Augar'
ha_config_flow: true
ha_domain: ecovacs
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - event
  - image
  - lawn_mower
  - number
  - select
  - sensor
  - switch
  - vacuum
ha_integration_type: hub
---
# Ecovacs

**Ecovacs** 集成是集成 [Ecovacs](https://www.ecovacs.com)（Deebot）扫地机和割草机的主要集成。

## 前提条件

您需要 Ecovacs 账户信息（用户名、密码）来发现和控制您账户中的扫地机和割草机。您的用户名是您的电子邮件地址。

附加说明：密码编码过程中存在一些问题。在密码中使用某些特殊字符（例如 `-`）不起作用。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

启用 `advanced_mode` 后，用户可以通过云服务器使用自托管实例。自托管有一些要求和限制。有关其他详细信息，请参阅[自托管配置](#self-hosted-configuration)。

## 提供的实体

Ecovacs 集成为连接到您 Ecovacs 账户的每个设备提供一个扫地机实体。

使用扫地机实体，您可以监控和控制您的 Ecovacs Deebot 扫地机。

此外，**根据您的型号**，集成提供以下实体：

- **二进制传感器**：
  - `拖布已安装`：如果安装了拖布则为开。注意：如果您在 Home Assistant 中没有看到状态更改为`拖布已安装`，您可能需要唤醒机器人以推送状态更改。某些型号仅当扫地机的整体状态发生变化时才报告实体状态更改。例如，如果整体状态从 `docked` 变为 `cleaning`。
- **按钮**：
  - `重置寿命`：对于每个支持的组件，将创建一个用于重置寿命的按钮实体。默认全部禁用。
  - `重新定位`：用于触发手动重新定位的按钮实体。
  - `基站操作`：对于每个支持的基站操作，将创建一个按钮实体。
- **事件**：
  - `上次任务`：以 event_type 形式提供停止原因
- **图像**：
  - `地图`：楼层平面图/地图，SVG 格式的图像。
- **数值**：
  - `清洁次数`：设置清洁区域的次数。
  - `切割方向`：设置割草机切割方向（0 到 180 度）。
  - `音量`：设置音量。
  - `水位`：设置使用拖布清洁期间的精确水位。
- **选择**：
  - `活动地图`：选择活动地图。当地图没有名称时将显示 ID。
  - `水位`：从预定义水位中选择用于拖布清洁的水位。
  - `工作模式`：指定机器人应如何清洁的模式。
- **传感器**：
  - `自动清空频率`：清洁期间清空机器人集尘盒的频率。
  - `错误`：错误代码和错误描述。`0` 表示无错误。默认禁用。
  - `寿命`：对于每个支持的组件，将创建一个具有剩余寿命的实体。
  - `网络`：将创建以下网络相关实体。默认全部禁用。
    - `IP 地址`
    - `Wi-Fi RSSI`
    - `Wi-Fi SSID`
  - `清洁周期`：
    - `区域`：已清洁区域
    - `时间`：已清洁时间
  - `基站状态`：基站状态枚举传感器。查看选项以查看所有可能的状态
  - `总计统计`：每次清洁周期后更新：
    - `区域`：总清洁区域
    - `清洁次数`：清洁次数
    - `时间`：总清洁时间
- **开关**：
  - `高级模式`：启用高级模式。默认禁用。
  - `边角旋转`：启用边角旋转，这意味着机器人在拖地时会倾斜以达到角落。存在于没有可伸缩拖布的机器人上。默认禁用。
  - `边角切换`：启用边角切换。默认禁用。
  - `地毯自动风扇加速`：如果检测到地毯则启用最大风扇速度。默认禁用。
  - `童锁`：启用童锁。默认禁用。
  - `移动警告`：启用设备移动警告。默认禁用。
  - `跨越地图边界警告`：启用跨越地图边界的警告。默认禁用。
  - `连续清洁`：启用连续清洁，这意味着如果机器人需要中途充电，它会恢复清洁工作。默认禁用。
  - `安全保护`：启用"安全保护"功能。默认禁用。
  - `True Detect`：启用"True Detect"功能。默认禁用。

## 扫地机

`ecovacs` 扫地机平台允许您监控和控制您的 Ecovacs Deebot 扫地机。

### 集成寿命

Deebot 扫地机上组件的剩余寿命将作为属性报告在扫地机实体上。该值将是一个表示剩余寿命百分比的整数。

以下是如何使用[模板传感器](/home-assistant/integrations/template)将滤网寿命提取到自己的传感器的示例：


```yaml
# 示例 configuration.yaml 条目
template:
  - sensor:
    - name: "扫地机滤网剩余寿命"
      unit_of_measurement: "%"
      state: "{{ state_attr('vacuum.my_vacuum_id', 'component_filter') }}"
```


或者，如果您想要一个简单的二进制传感器，当滤网需要更换时（5% 或更少）变为`开`：


```yaml
# 示例 configuration.yaml 条目
template:
  - binary_sensor:
    - name: "扫地机滤网"
      device_class: problem
      state: "{{ state_attr('vacuum.my_vacuum_id', 'component_filter') <= 5 }}"
```


### 处理错误

扫地机实体有一个 `error` 属性，其中包含来自扫地机的_最近_错误消息。没有所有错误消息的综合列表，因此您可能需要进行一些实验来确定您的扫地机可以发送的错误消息。

如果扫地机触发"无错误"事件，`error` 属性将更改回 `None`。但请注意，这不会发生在所有类型的错误上。

或者，您可以使用 `ecovacs_error` 事件来监视错误。此事件将包含如下数据负载：

```json
{
  "entity_id": "vacuum.deebot_m80",
  "error": "an_error_name"
}
```

最后，如果扫地机变得不可用（通常是由于空闲并且离开充电器足够长时间导致完全关机），扫地机的 `status` 属性将更改为 `offline`，直到再次打开。

### 获取设备和充电器坐标

集成有一个 `raw_get_positions` 动作来检索设备和充电器坐标。

示例：

```yaml
action: ecovacs.raw_get_positions
target:
  entity_id: vacuum.deebot_n8_plus
```

<details>
<summary>动作响应示例</summary>

该动作返回一个原始响应，其中包含在 `resp -> body -> data` 中可用的坐标列表，如下所示：

```yaml
vacuum.deebot_n8_plus:
  ret: ok
  resp:
    header:
      pri: 1
      tzm: 480
      ts: "1717748487712"
      ver: 0.0.1
      fwVer: 1.2.0
      hwVer: 0.1.1
    body:
      code: 0
      msg: ok
      data:
        deebotPos:
          x: 1
          y: 5
          a: 85
          invalid: 0
        chargePos:
          - x: 5
            y: 9
            a: 85
            t: 1
            invalid: 0
        mid: "200465850"
  id: 5o81
  payloadType: j
```


</details>

## 自托管配置

根据您自托管实例的设置，您可以使用以下设置连接到服务器：
- `用户名`：输入您实例中配置的电子邮件地址。如果禁用了身份验证，您可以输入任何有效的电子邮件地址。
- `密码`：输入您实例中配置的密码。如果禁用了身份验证，您可以输入任何字符串（字符序列）。
- `REST URL`：http://`SELF_HOSTED_INSTANCE`:8007
- `MQTT URL`：mqtts://`SELF_HOSTED_INSTANCE`:8883
- `验证 MQTT SSL 证书`：禁用

将 `SELF_HOSTED_INSTANCE` 替换为您实例的 IP 地址或主机名。

上述配置基于 [Bumper 文档](https://bumper.readthedocs.io)中的信息。

## 故障排除

无论如何，当报告问题时，请启用[调试日志](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics)，重新启动集成，一旦问题再次发生，请停止调试日志（_调试日志文件的下载将自动开始_）。此外，_如果仍然可能_，请也下载[诊断](/home-assistant/integrations/diagnostics)数据。如果您已收集调试日志和诊断数据，请随问题报告一起提供。

### 您的设备不受支持？

由于 Ecovacs 不提供其 API 的公开文档，设备的支持基于设备通信的逆向工程。这种逆向工程只能由拥有此类设备并了解如何进行逆向工程的人员完成。因此，设备的支持严重依赖社区的贡献。
如果您的设备不受支持，请请求帮助或直接向 [`deebot_client`](https://github.com/DeebotUniverse/client.py) 库贡献您设备的支持。

## 移除集成

此集成遵循标准集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.