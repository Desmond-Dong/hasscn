# Yardian

**Yardian** 集成可让您控制 [Yardian 智能喷灌控制器](https://yardian.com/products/yardian-pro-smart-sprinkler-controller/)。

Home Assistant 目前支持以下平台：

* Switch - 可查看各分区状态并进行控制。
* Binary sensor - 显示浇灌状态，以及待机和防冻相关诊断信息。还会按分区提供启用状态诊断，但默认禁用。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

在配置过程中，您需要手动设置 **Host** 和 **Access Token**。您可以在 [Yardian App](https://yardian.com/app/) 中找到它们。

![Yardian Host/Token Location](/home-assistant/images/integrations/yardian/yardian_config_flow.jpg)

## 支持的功能

**Yardian** 集成提供以下实体。

### 二进制传感器

* **Watering running**：当某个分区正在浇灌时为 `on`。
* **Standby**：当控制器处于待机模式时为 `on`。
* **Freeze prevent**：当控制器启用防冻保护时开启。
* **Zone enabled**：如果某个分区已启用，则为 `on`。这些实体会按分区创建，且默认禁用。

## 操作

### yardian.start\_irrigation

按指定分钟数启动一个分区。此操作接受一个 Yardian 分区开关实体，并允许指定持续时间。

| 数据属性 | 可选 | 说明 |
| -------- | ---- | ---- |
| `entity_id` | yes | 要开启的 Yardian 分区开关 |
| `duration` | no | 此分区保持开启的分钟数 |
