# Schlage

**Schlage** 集成通过 Schlage 的云 API 提供与 Schlage WiFi 智能锁的连接能力。

## 已知可用的设备

* Schlage Encode Smart WiFi Deadbolt
* Schlage Encode Smart WiFi Lever
* Schlage Encode Plus Smart WiFi Deadbolt

上面未列出的其他设备尚未经过测试，可能无法按预期工作。

Home Assistant 目前支持以下设备类型：

* Binary sensor
* Lock
* Sensor
* Switch

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 数据更新

Schlage 集成每 30 秒获取一次更新后的锁状态数据。

## 二进制传感器

启用 Schlage 集成后，您会看到以下二进制传感器：

* **Keypad disabled** - 表示键盘已被禁用，通常是因为输入了过多错误的开锁码。

## 选择器

启用 Schlage 集成后，您会看到以下选择器：

* **Auto Lock Time** - 配置门锁自动上锁前的等待时间，或完全禁用自动上锁功能。例如：`0` 表示禁用自动上锁，`15` 表示 15 秒后自动上锁，`300` 表示 5 分钟后自动上锁。

## 传感器

启用 Schlage 集成后，您会看到以下传感器：

* Lock Battery

## 开关

启用 Schlage 集成后，您会看到以下开关：

* **1-Touch Locking** - 启用后，按下 Schlage 按钮即可上锁。
* **Keypress Beep** - 控制锁在使用时是否发出按键提示音。

## 移除此集成

此集成遵循标准的集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
