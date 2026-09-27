# NASweb

The **NASweb** integration brings the device's smart home features into **Home Assistant**, converting them into entities that users can monitor, control, and incorporate into scripts and automations.

NASweb 结合了控制面板的功能和管理楼宇自动化的能力。该设备监控来自传感器和可编程开关的信息流，并存储设置、定义和配置的操作。 [更多信息。](https://www.chomtech.pl/produkt/naswebio-multisystemowy-sterownik-automatyki-budynkowej/)

![NASweb 智能家居功能图](/home-assistant/images/integrations/nasweb/nasweb_scheme.png)

## Prerequisites

在将 NASweb 集成添加到 Home Assistant 之前，您需要创建一个有权访问 NASweb API 的用户。

要创建有权访问 NASweb API 的 NASweb 用户，请执行以下步骤：

1. 要登录设备 **NASweb** 页面，请输入本地网络中的设备 IP：
   * `https://<设备 IP 地址>/nasweb`（例如：`https://192.168.117.230/nasweb`）
2. 在右上角，选择您的用户，然后在弹出窗口中选择**管理员**。
   ![设备仪表板](/home-assistant/images/integrations/nasweb/dashboard.png)
3. 找到您想要从 Home Assistant 访问 NASweb API 的用户。选择**编辑**。
   * “admin”用户不能用于此目的。选择另一个用户。
     ![设备管理员](/home-assistant/images/integrations/nasweb/users.png)
4. 在左侧 **Modules** 列中，找到 **API** 模块。
5. 单击 **API** 模块将其移至右侧列 (`1`)，其中列出了为此用户启用的模块。
   * 要保存更改，请选择 **应用** (`2`)。
     ![管理员用户详细信息](/home-assistant/images/integrations/nasweb/modules.png)

## Configuration

To add the **NASweb** hub to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nasweb)

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nasweb).
* From the list, select **NASweb**.
* Follow the instructions on screen to complete the setup.

</details>

```yaml
Host:
  description: NASweb device address

用户：
  描述：启用API模块的用户登录

密码：
  描述：启用API模块的用户密码
```
