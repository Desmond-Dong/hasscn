# UpCloud

**UpCloud** 集成允许您在 Home Assistant 中访问 [UpCloud](https://upcloud.com/) 服务器的信息。

Home Assistant 目前支持以下设备类型：

* [Binary sensor](#binary-sensor)
* [Switch](#switch)

## 设置

请在 [UpCloud 控制面板](https://hub.upcloud.com/) 中设置 API 用户凭据。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 二进制传感器

系统会为所有已发现的服务器创建二进制传感器实体。

## 开关

系统会为所有已发现的服务器创建开关实体。您可以使用该开关控制服务器的启动和停止。
