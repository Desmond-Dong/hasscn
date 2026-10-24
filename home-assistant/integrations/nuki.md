# Nuki Bridge

The **Nuki Bridge** integration allows you to control [Nuki Smart Locks](https://nuki.io/en/smart-lock/) via a [Nuki Bridge](https://help.nuki.io/hc/en-001/sections/360004474718-Bridge).
Many Nuki Smart Locks also support [local integrations](#local-integration-alternatives) using a different integration.

## Prerequisites

要将 Nuki 桥添加到您的安装中，您需要将设备连接到 WiFi、启用开发人员模式并定义端口和访问令牌。这可以使用 [Android 应用程序](https://play.google.com/store/apps/details?id=io.nuki) 或 [iPhone 应用程序](https://apps.apple.com/app/id1044998081) 来实现。转到管理我的设备，然后选择支持桥接或 WiFi 的智能锁并连接到设备。打开 HTTP API 并检查屏幕中的详细信息。请注意，API 令牌的长度应为 6-20 个字符，即使应用程序允许您设置更长的字符。
为了更快地更新，可以使用 Nuki 桥的回调函数。这要求 Nuki 桥可通过 HTTP 访问您的 Home Assistant，因为 Nuki 桥不支持 HTTPS。

## Configuration

To add the **Nuki Bridge** hub to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nuki)

Nuki Bridge can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nuki).
* From the list, select **Nuki Bridge**.
* Follow the instructions on screen to complete the setup.

</details>

```yaml
Host:
  description: Hostname or IP address of your Nuki bridge, e.g., `192.168.1.25`.
Port:
  description: Port of the Nuki bridge HTTP API, default is `8080`.
Token:
  description: Token to authenticate against the Nuki bridge HTTP API.
Use an encrypted token for authentication:
  description: Use an encrypted token for API calls to the bridge. This should only be deactivated if you experience issues with the API (authentication, etc). The default is `True`.
```

## Actions

### Action `nuki.lock_n_go`

这将首先解锁，等待几秒钟（默认为 20 秒），然后重新锁定。等待时间可以通过应用程序自定义。
有关此功能的更多详细信息，请参阅 [Nuki 网站](https://nuki.io/en/support/smart-lock/sl-features/locking-with-the-smart-lock/)。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s Nuki Locks.
| `unlatch` | yes | Boolean - Whether to unlatch the door when first opening it.

### 动作 `nuki.set_continuous_mode`

此操作允许您启用或禁用 Nuki Openers 的“连续模式”功能。这类似于映射到“锁定/解锁”的响铃开门功能，但它没有时间限制 - 只要启用此模式，按下蜂鸣器按钮时门就会打开，类似于它在例如白天去医生办公室或其他场所。在其他 Nuki 产品上，此操作是无操作的。

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s Nuki Locks.
| `enabled` | yes | Boolean - Set to `true` to enable Continuous Mode, or `false` to disable.

## Events

### Event `nuki_event`

Nuki 生成的事件作为“nuki\_event”类型的事件发送，内容如下：

| Event data attribute | Description                                |
| -------------------- | ------------------------------------------ |
| `type`               | The type of the event. Values: `ring`
| `entity_id`          | The ID of the entity generating the event.

## 本地集成替代方案

许多 Nuki 智能锁支持本地替代品。请参阅 [Nuki 网站](https://help.nuki.io/hc/en-001/categories/360003042457-Integrations-Services)，获取最新的集成选项和支持的设备列表。

### HomeKit support

第二代和第三代智能锁支持[HomeKit via Bluetooth](https://help.nuki.io/hc/en-001/articles/19948907390737-Apple-HomeKit-via-Bluetooth)，并可以通过[HomeKit集成](/home-assistant/integrations/homekit_controller/index.md#adding-a-homekit-device-through-bluetooth)直接与Home Assistant集成。

### MQTT support

Nuki Smart Lock 3.0 Pro和第四代设备支持[MQTT]([https://support.nuki.io/hc/en-us/articles/12947926779409-MQTT-support])，并可以通过[MQTT discovery](/home-assistant/integrations/mqtt/index.md#mqtt-discovery)直接与Home Assistant集成。
详细信息可以在[此处](https://developer.nuki.io/t/mqtt-api-specification-v1-3/17626)找到。

### Matter Support

Smart Lock Ultra、Smart Lock Pro、Smart Lock Go、第四代智能锁支持 Thread 上的 [Matter](https://help.nuki.io/hc/en-001/sections/14596766576401-Matter)，并可以通过 [Matter 集成](/home-assistant/integrations/matter/index.md#adding-a-matter-device-to-home-assistant) 直接与 Home Assistant 集成。
