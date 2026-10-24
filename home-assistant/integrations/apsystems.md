# APsystems

**APsystems** 集成允许您读取 [APsystems EZ1](https://emea.apsystems.com/diy/ez1/) 微型逆变器的数据。它还允许您将输出限制设置为 30 瓦以上的任何值。

## 传感器

### 数值传感器

| 传感器 ID | 单位 | 描述
|---|---| ---|
| total\_power | W | 逆变器的当前总输出
| lifetime\_production\_p1 | kWh | 第一个输入的终身发电量
| lifetime\_production\_p2 | kWh | 第二个输入的终身发电量
| lifetime\_production | kWh | 两个输入的终身发电量总和
| total\_power\_p1 | W | 第一个输入的当前输入
| total\_power\_p2 | W | 第二个输入的当前输入
| today\_production | kWh | 今日两个输入的发电量总和
| today\_production\_p1 | kWh | 今日第一个输入的发电量
| today\_production\_p2 | kWh | 今日第二个输入的发电量

### 二值传感器

| 传感器 ID  | 描述
|---|---|
| off\_grid\_status | 当逆变器未连接到电网时开启
| dc\_1\_short\_circuit\_error\_status | 在第一个输入上检测到短路
| dc\_2\_short\_circuit\_error\_status | 在第二个输入上检测到短路
| output\_fault\_status | 因任何错误导致输出停用

## 设置

| 设置 ID | 类型 | 描述
|---|---|---|
| inverter\_status | switch | 启用或禁用逆变器的输出
| output\_limit | number | 设置逆变器的最大输出

## Flash 耐久性

关于过度使用 `output_limit` 设置会缩短逆变器寿命的讨论。APsystems 官方向我确认了这一点，同时也承认较新的硬件版本没有此问题，而较旧的版本最多应每 300 秒更新一次。较新的逆变器序列号以 `Ex701` 开头，因此在设置 `output_limit` 频率超过每 300 秒时不会面临 flash 磨损风险。

## 前提条件

确保本地 API 已激活并设置为**持续**。为此，使用应用程序通过蓝牙连接到逆变器，转到**设置** > **本地模式**，将**启用本地模式**开关设置为开，并确保将此设置为**持续**。

:::note
如果**设置** > **本地模式**在 APsystems 应用程序中不可见，则设备可能仍连接到 APsystems 云端。

要使**设置** > **本地模式**可用：

1. 在移动设备上打开 APsystems 应用程序。
2. 在应用程序中注销您的 APsystems 云账户。
3. 如果应用程序特别要求您从云端移除设备以便您可以在本地使用它，请按照屏幕上的步骤操作。
4. 注销后，通过蓝牙直接重新连接到逆变器。

当您仅通过蓝牙连接时，**设置** > **本地模式**应该在应用程序中可见。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
