---
title: SIA Alarm Systems
description: 有关如何集成基于 SIA 的报警系统的说明。
ha_category:
  - Alarm
ha_release: 2021.6
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@eavanvalkenburg'
ha_domain: sia
ha_platforms:
  - alarm_control_panel
  - binary_sensor
ha_integration_type: hub
---

**SIA Alarm Systems** 集成为多个实现了 SIA 协议的报警系统提供支持，其中包括 [Ajax Systems](https://ajax.systems/)。该协议是只监听的，因此不允许您打开或关闭报警系统；它只会更新状态以反映报警状态，并允许您根据该状态执行操作，例如在报警触发时打开所有灯并拉开窗帘。底层软件包支持多种 SIA 变体，包括 DC-09、DC-04，以及有限的一部分 ADM-CID。如果您的报警系统使用 ADM-CID 标准但无法正常工作，请在[这里](https://github.com/eavanvalkenburg/pysiaalarm/issues/new)提交问题。

要使用此平台，您需要将报警系统设置为使用 SIA 协议进行通信，并在报警系统上完成若干配置。该集成的工作方式本质上是让 Home Assistant 在一个端口上监听来自报警系统的消息，对这些消息进行处理和响应，最后更新 Home Assistant 中的一个或多个实体。

## 报警系统设置（以 Ajax Systems Hub 为例）

1. 在 Hub 设置中，进入 monitoring stations 页面。
2. 选择 `SIA Protocol`。
3. 启用 `Connect on demand`。
4. 填写 Account Id，长度为 3-16 个 ASCII 十六进制字符，例如 `AAA`。
5. 填入 Home Assistant 的 IP 地址。Hub 必须能够访问这个 IP 地址，不需要云连接。
6. 填入 Home Assistant 的监听端口。该端口不能被 Home Assistant 所在机器上的其他程序占用，详见下方的[端口使用](#port-usage)说明。
7. 选择 Preferred Network。如果 Hub 和 HA 在同一网络中，建议优先使用以太网。多网络环境未经测试。
8. 启用 Periodic Reports。该选项指定报警系统向监控站汇报的间隔，默认是 1 分钟。此组件会在将报警标记为不可用之前额外增加 30 秒，以处理 Ajax 与 HA 之间的轻微延迟以及 HA 的异步特性。
9. 建议启用加密，但这不是必须的。密码应为 16、24 或 32 个 ASCII 字符。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
port:
  description: 报警系统与之通信的端口，必须按上述说明在报警系统中设置。
account:
  description: 用于通信的 Hub 账户，长度为 3-16 个 ASCII 十六进制字符。必须按上述说明在报警系统中设置。
encryption_key:
  description: 加密密钥。应为 16、24 或 32 个 ASCII 字符，并且必须与 Hub 属性中的设置一致。
ping_interval:
  description: 报警系统发送 `Automatic communication test report` 消息所使用的 ping 间隔，单位为分钟。在将该账户下的所有实体（报警和二进制传感器）标记为不可用前，组件会额外增加 30 秒。取值必须在 1 到 1440 分钟之间。
zones:
  description: 您的报警系统中配置的分区数量。
additional_account:
  description: 用于询问是否需要添加额外账户；如果需要，在检查当前输入后会打开下一个账户的配置对话框。
```

ASCII 十六进制字符为 `0-9` 和 `ABCDEF`，因此账户看起来会像 `346EB` 这样，而加密密钥也使用同样的字符集，但长度必须是 16、24 或 32 个字符。

### 关于监控多个报警系统的说明

如果您有多个要监控的账户（报警系统），可以让它们都通过同一个端口通信；这种情况下，请在对话框中使用 additional accounts 复选框来设置下一个账户，并重复此操作直到全部完成。您也可以选择让它们分别运行在不同端口上；这种情况下，请用不同端口配置该组件两次。

### 端口使用

此组件使用的端口必须未被运行 HA 实例的机器上的其他进程占用。如果您的网络结构较复杂，或者想监控其他地点的报警系统，通常需要为此开放防火墙和/或创建网络路由。该集成只会监听传入该端口的消息，不会主动发送内容，只会向报警系统返回确认响应。

### 实体

在初始版本中，设置完成后，您会为每个账户与分区组合看到一个 `alarm_control_panel`。该实体具有 5 个属性，用于反映该账户和分区接收到的所有消息，包括 `last_code`、`last_zone`、`last_message`、`last_id`、`last_timestamp`。`alarm_control_panel` 的状态会根据部分代码值进行变化，包括但不限于 `CA`、`CB`、`CG`、`BA`、`TA`、`OA`、`NC`、`NL`；完整列表请查看 GitHub 上的代码。如果您原本预期状态会发生变化，请记录对应代码并同时在 GitHub 提交问题。

### 事件

每个通过 SIA 进入系统的事件也会被转发到 HA 内部事件总线，因此您可以直接根据这些代码触发自动化。生成的事件其 `event_type` 格式为 `sia_event_<port>_<account>`。`event_data` 中包含多个字段，详见下文。

<details>
<summary>SIA 集成发出的 HA 事件中，`event_data` 包含的字段。</summary>


- message_type
- receiver
- line
- account
- sequence
- content
- ti
- id
- ri (also known as `zone`)
- code
- message
- x_data
- timestamp
- event_qualifier
- event_type
- partition
- extended_data (list)
  - identifier
  - name
  - description
  - length
  - characters
  - value
- sia_code
  - code
  - type
  - description
  - concerns


</details>
