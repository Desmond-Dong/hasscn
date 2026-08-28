# Nintendo Switch parental controls

The **Nintendo Switch Parental Controls** integration integrates with the Nintendo Switch Parental Controls service, allowing parents to monitor and control screentime for their children.

## Supported devices

此集成支持 Nintendo Switch 家长控制移动应用程序支持的设备。

## Prerequisites

要使用 Nintendo Switch 家长控制集成，您必须访问您的 Nintendo 帐户的身份验证令牌。此过程必须在**未**安装官方 Nintendo Switch 家长控制移动应用程序的设备上执行。集成需要拦截身份验证流程，该流程通常由应用程序自动处理。

您将需要：

* 您的任天堂帐户凭据。
* 未安装官方应用程序的电脑或移动设备。

## Configuration

1. In the Home Assistant UI, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).

2. 选择 **添加集成** 并搜索 **Nintendo Switch 家长控制**。

3. 系统将提示您提供**访问令牌**。选择对话框描述中提供的链接。此链接对于您的设置会话是唯一的。

4. 将打开一个新的浏览器选项卡。使用您的凭据登录您的任天堂帐户。

5. 成功登录后，您将看到**链接外部帐户**屏幕。对于您想要链接的任天堂帐户，右键单击红色按钮**选择此人**，然后选择**复制链接**（或**复制链接地址**/**复制 URL**，具体取决于您的浏览器）。

* **重要**：不要直接选择该按钮，因为这可能会重定向您并阻止您获取必要的令牌。

* 复制的链接的格式应类似于“npf54789befxxxxxxxx://auth#session\_token\_code={redacted}\&state={redacted}\&session\_state={redacted}”。

6. 关闭任天堂帐户浏览器选项卡。

7. 将复制的整个链接（完整字符串）粘贴到 Home Assistant 配置对话框中的 **访问令牌** 字段中。

8. Select **Submit**.

9. 然后配置流程应显示附加选项。

10. 选择“**提交**”以完成设置。

## Supported functionality

### Entities

**Nintendo Switch 家长控制**集成提供以下实体。

#### Number

* **今天的最大放映时间**
  * **描述**：今天允许的最大屏幕时间，对于无限制的屏幕时间，设置为“-1”。通过将其设置为“0”并打开**挂起软件**开关，您可以“锁定”您的 Nintendo Switch。

#### 选择

* **限制模式**
  * **说明**：控制是否每天应用相同的屏幕时间限制，或者一周中的每一天是否都有自己单独的限制。

#### Sensors

* **使用的屏幕时间**
  * **描述**：给定设备当前使用的屏幕时间。
  * **测量单位**：`分钟`
  * **设备类别**：`持续时间`
* **剩余时间**
  * **描述**：设备剩余的总时间量。
  * **测量单位**：`分钟`
  * **设备类别**：`持续时间`

#### 开关

* **暂停软件**
  * **说明**：启用在达到就寝时间警报或超过最大屏幕时间时自动暂停正在运行的软件。关闭以允许软件继续运行超过这些限制。

#### Time

* **就寝闹钟**
  * **描述**：给定设备的设定就寝时间，此时，开关可以“锁定”或在左上角显示警报。
* **就寝时间结束时间**
  * **描述**：就寝时间应该结束的时间。设置为 00:00 以禁用。接受 05:00 到 09:00 之间的就寝时间结束时间值。

## Actions

该集成提供以下操作。

### Action: Add bonus time

`nintendo_parental_controls.add_bonus_time` 操作向指定设备添加额外的奖励屏幕时间，该奖励屏幕时间是在允许的最大屏幕时间之外授予的。

* **数据属性**：`config_entry_id`
  * **描述**：包含授予奖励时间的设备的配置条目的 ID。
  * **可选**：否
* **数据属性**：`device_id`
  * **描述**：授予奖励时间的设备ID。
  * **可选**：否
* **数据属性**：`bonus_time`
  * **描述**：授予的时间量（以分钟为单位）（最少 5 分钟，最多 30 分钟）。
  * **可选**：否

## Known limitations

该集成目前不提供移动应用程序中的所有功能。未来的更新将对此进行扩展。

此外，这种集成依赖于云，无法与您的交换机建立本地连接。

奖励时间的范围由任天堂设定，因此无法更改。

## Troubleshooting

### Home Assistant 中的数据未更新

确保 Switch 可以访问互联网，否则，使用数据将不会发送到任天堂。

## Removing the integration

此集成遵循标准集成删除。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
