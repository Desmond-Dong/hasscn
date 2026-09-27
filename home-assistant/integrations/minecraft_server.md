# Minecraft Server

[Minecraft](https://www.minecraft.net/en-us) 是由 Mojang Studios 开发的沙盒游戏。Minecraft 服务器允许玩家通过互联网或局域网与其他玩家一起游玩。**Minecraft Server** 集成让您可以在 Home Assistant 中获取 Minecraft 服务器的信息。它同时支持 **Java Edition** 和 **Bedrock Edition** 服务器。

## 前提条件

* Minecraft Java Edition 服务器必须为 1.4 或更高版本。
* 对于 1.7 或更高版本的服务器，必须在服务器配置文件（`server.properties`）中将 `enable-status` 参数设置为 `true`。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

在设置过程中，系统会提示您输入服务器的**地址**。

### 服务器地址

**服务器地址**由主机名和端口组成，其中端口是可选的。对于 SRV 记录，端口会自动提取。对于其他所有情况，如果省略端口，则使用默认端口（Java Edition 为 25565，Bedrock Edition 为 19132）。以下是一些服务器地址示例：

* **SRV record**：`hypixel.net`
* **Hostname**：`mc.hypixel.net:25565` 或 `mc.hypixel.net`
* **IP address**：`192.168.0.123:19132` 或 `192.168.0.123`

:::note
默认值为 `localhost:25565`。

Bedrock Edition 服务器不支持 SRV 记录。

:::

## 二进制传感器

此集成会为 Minecraft 服务器提供以下信息的二进制传感器：

* 连接状态

## 传感器

此集成会为 Minecraft 服务器提供以下信息的传感器：

* 延迟
* 版本
* 协议版本
* 在线玩家数量
  * 如果可用，还会在状态属性中包含玩家名称列表（见下方说明）。
* 最大玩家数量
* 服务器消息 / 今日消息（MOTD）

对于 Bedrock Edition 服务器，还会额外提供以下传感器：

* Edition：Minecraft Pocket Edition（MCPE）或 Minecraft Education Edition（MCEE）
* Game mode
* Map name

:::note
玩家名称仅在 Java Edition 1.7 或更高版本服务器上可用。根据服务器不同，玩家名称列表可能不会完整显示。有些服务器和插件会限制或完全隐藏该列表，甚至会用虚假的玩家名称替换它，以在其中显示自定义消息。

:::

## 移除此集成

此集成遵循标准集成移除流程，不需要额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
