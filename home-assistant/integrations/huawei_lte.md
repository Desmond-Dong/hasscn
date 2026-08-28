# Huawei LTE

Home Assistant 的 **Huawei LTE** 路由器与调制解调器集成可让您监控并控制 [Huawei LTE 设备](https://consumer.huawei.com/en/routers/)。

目前在 Home Assistant 中支持以下平台：

* Presence detection - 已连接设备的设备追踪
* Notifications - 通过短信通知
* Sensors - 设备、网络、信号、短信计数、流量和电池信息
* Switch - 移动数据开/关、Wi-Fi 访客网络开/关
* Binary sensor - 移动网络与 Wi-Fi 连接状态、短信存储是否已满
* Button - 清除流量统计、重启
* Select - 首选网络模式

## Setup

此集成可通过前端启用，详情见下文。
此外，如果 Home Assistant 中启用了 [SSDP 集成](/home-assistant/integrations/ssdp.md)，会自动发现支持且已启用 UPnP 的 Huawei LTE 设备，并在前端中提供进一步的可选配置。

首次配置时，集成需要使用路由器凭据进行身份验证；之后可在有验证或无验证模式下运行。验证模式可启用所有可用功能与实体，但当集成处于活动状态时，可能会影响您通过其他来源（如浏览器）访问设备 Web 界面，反之亦然。哪些功能必须通过验证才能工作会因设备型号和固件版本而异。集成会尝试使用所有已配置功能；若在无验证模式下检测到需要验证的功能，会以可恢复方式失败。

目标设备提供的实体中，默认仅启用以下一部分：

* WAN IP 地址传感器
* LTE 信号传感器 RSRQ、RSRP、RSSI 和 SINR
* 移动数据与 Wi-Fi 访客网络开关
* 移动连接二元传感器
* 设备追踪条目

其余实体会添加到实体注册表中，但默认禁用。

不同类别信息（及对应可用实体）的支持情况会因设备型号和固件版本而不同。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
URL:
  description: 路由器 API 的基础 URL。通常形如 `http://192.168.X.1`，其中 `X` 可能是 `1`、`8` 或 `100`。这也是在浏览器访问路由器 Web 界面时地址的前缀部分。
Verify SSL certificate:
  description: 访问路由器时是否验证其 SSL 证书。仅在通过 HTTPS 访问路由器时适用，也就是配置的 URL 以 `https://` 开头时。
Username:
  description: 用于访问路由器 API 的用户名。通常为 `admin`，或留空（若可用则推荐）。
Password:
  description: 用于访问路由器 API 的密码。
```

## Options

To define options for Huawei LTE, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).

2. If multiple instances of Huawei LTE are configured, choose the instance you want to configure.

3. On the card, select the cogwheel `[mdi:cog-outline]`.

   * If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Notification service name:
  description: 通知服务名称。当配置了多个 Huawei LTE 设备时，可用来区分通知服务。此处名称会加上 `notify.` 前缀。例如填写 `huawei_lte`，完整服务名将为 `notify.huawei_lte`。
Notification recipients:
  description: 通知服务的默认短信接收号码列表，使用逗号分隔。当发送方未指定接收人时会使用该列表。可接受格式可能因设备型号和套餐类型而异，但建议优先使用带 `+` 前缀和国家代码的国际 [E.164](https://en.wikipedia.org/wiki/E.164) 数字格式。
Track wired network clients:
  description: 设备追踪实体是否除了无线客户端外，也追踪连接到路由器有线以太网的客户端。
Unauthenticated mode:
  description: 是否以无验证模式运行。有关验证与无验证模式的差异，请参见上文。
```

## Actions

可用的路由器动作如下。由用户调用时需要管理员权限。

### Action: Suspend integration

`huawei_lte.suspend_integration` 动作会暂停集成。这会让集成从路由器登出并停止访问。如果您需要临时通过其他来源（例如浏览器）访问路由器 Web 界面，此功能会很有用。调用 `huawei_lte.resume_integration` 动作可恢复。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `url`                  | yes, if only one router configured | 路由器 URL。 |

### Action: Resume integration

`huawei_lte.resume_integration` 动作会恢复已暂停的集成。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `url`                  | yes, if only one router configured | 路由器 URL。 |

## Tested devices

此集成的目标是并且极有可能可用于所有[在底层 huawei-lte-api 库中报告为可用的设备](https://github.com/Salamek/huawei-lte-api#tested-on)。

对该列表中标注为不可用的设备则无法工作。

## Removing the integration

此集成遵循标准移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
