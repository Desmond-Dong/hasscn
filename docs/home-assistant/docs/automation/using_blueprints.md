---
title: 使用自动化蓝图
description: '自动化蓝图是预制好的自动化模板，您可以轻松将其添加到 Home Assistant 实例中。每个蓝图可以根据需要多次使用。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 使用自动化蓝图

自动化蓝图是预制好的自动化模板，您可以轻松将其添加到 Home Assistant 实例中。每个蓝图可以根据需要多次使用。

快速链接：

- [Home Assistant 论坛中的蓝图][blueprint-forums]

## 蓝图自动化

基于蓝图的自动化需要进行配置。需要配置的内容因蓝图而异。

1. 要创建第一个基于蓝图的自动化，请前往 [**设置** > **自动化与场景** > **蓝图**](https://my.home-assistant.io/redirect/blueprints/)。
2. 找到您想使用的蓝图，然后选择 **创建自动化**。
   - 这将打开自动化编辑器，并已选中该蓝图。
3. 为其命名并配置蓝图。
4. 选择右下角的蓝色 **保存自动化** 按钮。

完成！如果您想修改配置值，请前往 [**设置** > **自动化与场景** > **蓝图**](https://my.home-assistant.io/redirect/blueprints/)。

## 导入蓝图

Home Assistant 可以从 Home Assistant 论坛、GitHub 和 GitHub Gist 导入蓝图。

1. 要导入蓝图，首先[找到您想导入的蓝图][blueprint-forums]。
   - 如果您只是想练习导入，可以使用这个 URL：

      ```text
      https://github.com/home-assistant/core/blob/dev/homeassistant/components/automation/blueprints/motion_light.yaml
      ```

2. 前往 [**设置** > **自动化与场景** > **蓝图**](https://my.home-assistant.io/redirect/blueprints/)。
3. 选择右下角的蓝色 **导入蓝图** 按钮。
   - 此时会弹出一个新对话框，要求您输入 URL。
4. 输入 URL 并选择 **预览**。
   - 这将加载蓝图并在导入对话框中显示预览。
   - 您可以更改名称并完成导入。

现在可以使用该蓝图创建自动化了。

## 编辑已导入的蓝图

您可以通过“接管控制”来调整已导入的蓝图。Home Assistant 会将基于蓝图的自动化转换为常规自动化，这样您就可以进行任意调整，而无需从头重新设计。

要编辑已导入的蓝图，请按照以下步骤操作：

1. 前往 [**设置** > **自动化与场景** > **蓝图**](https://my.home-assistant.io/redirect/blueprints/)。
2. 从列表中选择蓝图。
3. 选择 `[mdi:dots-vertical]` 并选择 **接管控制**。
4. 将显示自动化的预览。
   - **信息**：接管控制后，蓝图将转换为自动化。您将无法将其转换回蓝图。
   - 要将其转换为自动化并接管控制，请选择 **是**。
   - 如果您改变主意想保留蓝图，请选择 **否**。

   ![演示如何接管蓝图控制的屏幕录像](/home-assistant/images/blueprints/blueprint_take_control.webp)

## 重新导入蓝图

社区创建的蓝图可能会经历多次修订。有时用户创建了蓝图，社区提供反馈，然后添加新功能。

获取这些更改的最快方法是重新导入蓝图。这将覆盖您当前拥有的蓝图。

**在此之前请注意**：如果重新导入的蓝图不兼容，可能会破坏您的自动化。

- 在这种情况下，您需要手动调整您的自动化。

### 重新导入蓝图

1. 前往 [**设置** > **自动化与场景** > **蓝图**](https://my.home-assistant.io/redirect/blueprints/)。
2. 在要重新导入的蓝图上，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **重新导入蓝图**。

## 在 YAML 中更新已导入的蓝图

社区创建的蓝图可能会经历多次修订。有时用户创建了蓝图，社区提供反馈，然后添加新功能。

如果您因某些原因不想[重新导入蓝图](/home-assistant/docs/automation/using_blueprints/#重新导入蓝图)，可以手动编辑其 YAML 内容以保持最新：

1. 前往蓝图目录 (`blueprints/automation/`)。
   此目录的位置取决于安装类型。这与查找 [`configuration.yaml`](/home-assistant/docs/configuration/#editing-configurationyaml) 的方式类似。
2. 接下来，您必须找到要更新的蓝图。蓝图的路径名称包括：
   - 创建者的用户名。名称取决于蓝图的来源：论坛或 GitHub。
   - YAML 文件的名称。对于论坛，是 URL 中主题的标题；对于 GitHub，是 YAML 文件的名称。
3. 使用编辑器打开 YAML 文件并更新其内容。
4. 重新加载自动化以使更改生效。

新更改也将应用于您现有的自动化。

## 寻找新蓝图

Home Assistant 社区论坛有一个专门的蓝图标签。此标签用于收集所有蓝图。

[访问 Home Assistant 论坛][blueprint-forums]

[blueprint-forums]: /get-blueprints

## 创建新蓝图

使用蓝图简单方便，但如果您能创建社区急需的那个缺失的蓝图呢？

通过[阅读我们关于创建蓝图的教程](/home-assistant/docs/blueprint/tutorial/)，了解更多关于蓝图的信息。

## 故障排除：自动化缺失

当您使用蓝图创建自动化但它们未显示在界面中时，请确保将默认配置中的 `automation: !include automations.yaml` 添加回您的 **`configuration.yaml`** 中。
