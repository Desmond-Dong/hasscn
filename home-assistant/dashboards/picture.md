# 图片卡片

图片卡片允许您设置一张图片，用于导航到界面中的各种路径或执行动作。

<p class='img'>
<img src='/home-assistant/images/dashboards/picture.png' alt='图片卡片的截图'>
图片卡片的截图。
</p>

## 添加图片卡片到仪表盘

1. 要添加卡片，请按照[从视图添加卡片](/home-assistant/dashboards/cards/#to-add-a-cards-from-a-view)中的步骤 1-4 操作。
   * 在步骤 2 中，在 **按卡片** 选项卡上，选择图片。

2. 添加图片：

   * **上传图片** 让您从用于显示 Home Assistant UI 的系统中选择一张图片。
   * **本地路径** 让您选择存储在 Home Assistant 上的图片。例如：`/homeassistant/images/lights_view_background_image.jpg`。
     * 要在 Home Assistant 上存储图片，您需要[配置文件访问权限](/home-assistant/common-tasks/os/index.md#configuring-access-to-files)，例如通过 [Samba](/home-assistant/common-tasks/os/index.md#installing-and-using-the-samba-app) 或 [Studio Code Server](/home-assistant/common-tasks/os/index.md#installing-and-using-the-visual-studio-code-vsc-app) 应用程序（以前称为插件）。
   * **网页 URL** 让您使用来自网络的图片。例如 `https://www.home-assistant.io/images/frontpage/assist_wake_word.png`。

3. 定义图片卡片特有的参数。
   * 有关特定设置的描述，请参阅 YAML 配置下的描述。
   * 它们也适用于 UI。

4. 保存您的更改。

## YAML 配置

当您使用 YAML 模式或只是在 UI 的代码编辑器中更喜欢使用 YAML 时，可以使用以下 YAML 选项。

type:
required: true
description: "`picture`"
type: string
image:
required: true
description: "图片的 URL。当您想在 Home Assistant 安装中存储图片时，请使用[托管文件文档](/home-assistant/integrations/http/index.md#hosting-files)。存储文件后，使用 `/local` 路径，例如 `/local/filename.jpg`。要使用现有 [媒体](/home-assistant/integrations/media_source/index.md) 目录中的图片，请提供完整的 media-source 标识符（参见示例）。"
type: string
image\_实体:
required: false
description: 要显示的图片或人员实体。
type: string
alt\_text:
required: false
description: 图片的替代文本。这对辅助技术用户来说是必要的。[W3C 图片教程](https://www.w3.org/WAI/tutorials/images/) 提供了编写替代文本的简单指南。"
type: string
theme:
required: false
description: 使用任何已加载的主题覆盖此卡片使用的主题。有关主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/index.md)。"
type: string
tap\_action:
required: false
description: 卡片点击时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-actions)。"
type: map
hold\_action:
required: false
description: 卡片长按时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#hold-actions)。"
type: map
double\_tap\_action:
required: false
description: 卡片双击时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#double-tap-actions)。"
type: map

### 示例

跳转到另一个视图：

```yaml
type: picture
image: /local/home.jpg
tap_action:
  action: navigate
  navigation_path: /lovelace/home
```

查看[视图](/home-assistant/dashboards/views/)设置，了解如何设置自定义 ID。

使用动作切换实体：

```yaml
type: picture
image: /local/light.png
tap_action:
  action: perform-action
  perform_action: light.toggle
  data:
    entity_id: light.ceiling_lights
```

显示来自[媒体](/home-assistant/integrations/media_source/index.md)目录的图片：

```yaml
type: picture
image: media-source://media_source/local/test.jpg
```
