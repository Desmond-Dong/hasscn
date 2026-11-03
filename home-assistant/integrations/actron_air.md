# Actron Air

**Actron Air** integration 允许您将 [Actron Air](https://www.actronair.com.au/) 空调控制器集成到 Home Assistant 中。

## 前提条件

您必须拥有一台配备 Neo 或 Que 控制器的 **Actron Air** 空调，具有活跃的互联网连接，并已注册到电子邮件地址。

## 支持的设备

此集成支持 Actron Air Neo 和 Que 控制器。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的功能

### 气候

集成将为主要发现的空调系统以及每个区域创建一个气候实体。主空调单元将根据 Actron Air 应用程序中的名称显示。您可以通过此实体设置温度、运行模式和风速。

每个区域将显示为单独的气候实体。您可以为每个区域设置温度和运行模式（如果您的空调支持）。

### 开关

集成将为您的 Actron Air 空调添加**外出模式**、**连续风扇**、**静音模式**和**强力模式**（如果支持）开关。

## 移除集成

此集成遵循标准集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
