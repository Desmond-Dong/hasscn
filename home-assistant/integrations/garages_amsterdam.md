# Garages Amsterdam

**Garages Amsterdam** 集成使用阿姆斯特丹市政府提供的 API，来获取荷兰阿姆斯特丹停车场的占用情况。您可以通过多次添加此集成来跟踪多个停车场。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Garage name:
  description: 您想要监控的停车场名称。
```

## 数据更新

此集成每 10 分钟轮询一次阿姆斯特丹的 API，以更新 Home Assistant 中的数据。

### 传感器

添加停车场后，默认会在您的配置中创建 4 个传感器：

* **Free space long** - 持卡人或预留车位的空闲数量
* **Free space short** - 普通付费停车位的空闲数量
* **Long capacity** - 持卡人或预留车位的总数量
* **Short capacity** - 普通付费停车位的总数量

:::note
部分停车场没有长期停车位，这种情况下不会创建这 2 个专用的 **Long** 传感器。
:::

### 二进制传感器

每个停车场还会有一个二进制传感器，用于指示 API 提供的数据是否存在问题。当其显示为 `ok` 时，一切正常。如果状态变为 `problem`，则表示上游数据可能不是最新的或不可靠，并会一直保持该状态，直到有新数据到来。

## 删除集成

您可以按照默认删除流程移除每个停车场实例。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
