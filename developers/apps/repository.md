# 创建应用程序存储库

应用程序存储库可以包含一个或多个应用程序（以前称为加载项）。每个应用程序都存储在其自己独特的文件夹中。要被识别为存储库，存储库必须包含配置文件。

检查[Example app repository](https://github.com/home-assistant/addons-example) 了解更多详细信息。

## 安装存储库

用户可以通过以下方式添加存储库：转到 Home Assistant 中的 Supervisor 面板，单击右上角的存储图标，将存储库的 URL 复制/粘贴到存储库文本区域，然后单击 **节省**。

:::tip
您可以为您的用户生成一个 [my.home-assistant.io](https://my.home-assistant.io/create-link/)，只需单击自述文件中的按钮即可执行此操作。
:::

## 存储库配置

每个存储库都需要在 git 存储库的根目录中包含`repository.yaml`。

```yaml
name: Name of repository
url: http://www.example/addons
maintainer: HomeAssistant Team <info@home-assistant.io>
```

|钥匙 | 必需的 | 描述|
| --- | -------- | ----------- |
|@@保护0@@ | 是的 | 存储库名称
|@@保护0@@ | 不 | 存储库的主页。在这里您可以解释各种应用程序。
|@@保护0@@ | 不 | 维护者的联系信息。
