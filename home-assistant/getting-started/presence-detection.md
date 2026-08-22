# 设置在场检测

区域在场检测可以检测人员是否在某个区域内，这可以作为自动化的重要输入。知道谁在家或他们在哪里可以开启一系列自动化选项：

* 当我的孩子到达学校时发送通知给我
* 当我离开工作时打开空调

<p class='img'>
    <img src="/home-assistant/images/screenshots/map.png" alt="Home Assistant 地图仪表盘截图，显示学校、工作区和家庭区域以及两个人的位置"/>
    地图仪表盘显示学校、工作区、家庭区域和两个人的位置。
</p>

## 关于设置区域在场检测

有几种不同的方式设置区域在场检测。一种方式是在手机上运行应用程序，向您的 Home Assistant 实例发送详细的位置信息。另一种检测在场的方法是检查哪些设备连接到网络。如果您有我们[支持的路由器][routers]，您可以这样做。通过利用您的路由器已经知道的信息，您可以检测人们是否在家。

## 使用手机添加区域在场检测

### 前提条件

* [已安装 Home Assistant](/home-assistant/installation/index.md)
* 已完成[初始设置步骤](/home-assistant/getting-started/onboarding/index.md)
* [已启用远程访问](/home-assistant/docs/configuration/remote/index.md)
  * 最简单的方法是启用
    * [Home Assistant Cloud](https://nabucasa.com/config/)
* 手机：
  * Android（Android 5 或更高版本）或 iPhone（iOS 15 或更高版本）
  * 有互联网访问的电话套餐
  * 访问运行 Home Assistant 的本地网络
* 手机上已安装 [Home Assistant Companion 应用](https://companion.home-assistant.io/docs/getting_started/)
  * 在设置过程中，确保授予 **位置访问权限**
    * 位置访问权限为该设备创建一个 `device_tracker` 实体。此实体可用于自动化和条件。

### 使用手机添加区域在场检测

1. 在手机上打开 Home Assistant Companion 应用并登录到您的 Home Assistant 实例。
2. 在 **连接到 Home Assistant** 屏幕上，确保已启用 **位置追踪**。
   * 选择 **继续**。
3. 转到 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并查找新添加的集成：**移动应用**。
   * 在集成卡片上，选择 **1 设备**。这将打开设备信息页面。
   * 您现在可以看到您的手机名称及其实体。
4. 要在地图上查看手机位置，打开 **地图** 仪表盘。
   * 您现在可以看到地图上带有您首字母的圆圈。
   * 它显示手机的当前位置。
   * 要查看详细信息，选择该首字母。
     * 打开 **属性** 列表查看手机的 **纬度**、**经度** 和信息 **来源**。
     * 来源是该设备的 `device_tracker` 实体，例如 `device_tracker.pixel_7_pro`。
5. 要查看实体详细信息和历史记录，转到 [**设置** > **设备与服务** > **实体**](https://my.home-assistant.io/redirect/entities/)，在搜索字段中输入 `devi` 并从列表中选择您的 `device_tracker` 实体。
6. 检查您的[区域](/home-assistant/integrations/zone/index.md)为自动化做准备。
   * 您的家庭区域在初始设置期间设置，但您可以编辑它。
   * 如果您想在其他区域上自动化，可以添加其他区域。
     * 例如，如果您想在离开办公室时启动暖气，可以添加一个称为 **办公室** 的区域。
     * 在这种情况下，离开办公室区域将是一个自动化触发器。
     * 您也可以将位置信息用作自动化条件，例如，当您有一个在日落时打开灯的自动化，但只有在您在家时。

## 为家中的其他人添加在场检测

1. 对于每个要拥有在场检测的人，添加一个设备追踪器（例如，他们的手机）。
   * 您也可以使用智能手表进行在场检测。为此，在设备上安装 [Home Assistant Companion 应用](https://companion.home-assistant.io/docs/getting_started/)。确保允许位置追踪。
   * 要在家外用于区域在场检测，智能手表需要有移动套餐。
2. 转到 [**设置** > **人员**](https://my.home-assistant.io/redirect/people/) 并选择该人员。
3. 向下滚动，在 **选择属于此人员的设备** 下，选择设备。

[routers]: /integrations/index.md#presence-detection

[nmap]: /integrations/nmap_tracker

[ha-bluetooth]: /integrations/bluetooth_tracker

[ha-bluetooth-le]: /integrations/bluetooth_le_tracker

[ha-locative]: /integrations/locative

[ha-gpslogger]: /integrations/gpslogger

[ha-presence]: /integrations/index.md#presence-detection

[MQTT-self]: /integrations/MQTT/#run-your-own

[MQTT-cloud]: /integrations/MQTT/#cloudmqtt

[zone]: /integrations/zone/

[trigger]: /docs/automation/trigger/#zone-trigger

[condition]: /docs/automation/condition/#zone-condition

[companion]: https://companion.home-assistant.io/

:::info [加入社区](/home-assistant/getting-started/join-the-community/index.md)
:::
