app 仓库可以包含一个或多个 app（以前称为 add-on）。每个 app 存储在各自独立的文件夹中。要被识别为仓库，该仓库必须包含一个配置文件。

请查看 [Example app repository](https://github.com/home-assistant/addons-example) 以获取更多详细信息。

## 安装仓库

用户可以通过进入 Home Assistant 的 Supervisor 面板，点击右上角的商店图标，将你的仓库 URL 复制/粘贴到仓库文本区域，然后点击 **Save** 来添加一个仓库。

:::tip
你可以在 readme 文件中生成一个 [my.home-assistant.io](https://my.home-assistant.io/create-link/) 链接，让用户一键完成此操作。
:::

## 仓库配置

每个仓库都要求在 git 仓库的根目录中包含 `repository.yaml`。

```yaml
name: Name of repository
url: http://www.example/addons
maintainer: HomeAssistant Team <info@home-assistant.io>
```

| Key | Required | Description |
| --- | -------- | ----------- |
| `name` | yes | 仓库的名称 |
| `url` | no | 仓库的主页。你可以在这里介绍各种 app。 |
| `maintainer` | no | 维护者的联系信息。 |
