---
title: 场景编辑器
description: 关于如何使用场景编辑器的说明。
---

在用户界面中，选择位于侧边栏的 **设置**，然后选择 **自动化与场景** 进入场景编辑器。点击右下角的 **添加场景** 按钮开始创建。

为您的场景选择一个有意义的名称。

![场景编辑器](/home-assistant/images/docs/scenes/editor.png)

选择所有您想要包含在场景中的实体（当用户配置文件中启用了高级模式时，也可以选择设备）。
设备的状态将被保存，以便在您完成场景创建后恢复。
将设备的状态设置为您希望它们在场景中的样子，可以通过选择设备并在弹出窗口中编辑状态，或使用其他任何更改状态的方法来完成。
当您保存场景时，所有设备的状态都会存储在场景中。
当您离开编辑器时，设备的状态将恢复到您开始编辑之前的状态。
右上角的菜单提供了 **复制场景** 和 **删除场景** 的选项。

场景可以通过动作和脚本使用打开场景动作来调用：

```yaml
action: scene.turn_on
target:
  entity_id: scene.my_unique_id
```

## 更新配置以使用编辑器

首先，检查您是否已激活配置编辑器。

```yaml
# 激活配置编辑器
config:
```

场景编辑器读取和写入位于[配置](/home-assistant/docs/configuration/)文件夹根目录下的 `scenes.yaml` 文件。
目前，此文件的名称和位置都是固定的。
确保您已设置场景集成以读取该文件：

```yaml
# `configuration.yaml` 示例
scene: !include scenes.yaml
```

如果您仍然想使用旧的场景部分，请为旧条目添加标签：

```yaml
scene old:
  - name: ...
```

您可以同时使用 `scene:` 和 `scene old:` 部分：

- `scene old:` 保留您手动设计的场景
- `scene:` 保存由在线编辑器创建的场景

```yaml
scene: !include scenes.yaml
scene old: !include_dir_merge_list scenes
```

## 将场景迁移到 `scenes.yaml`

如果您想迁移旧场景以使用编辑器，您需要将它们复制到 `scenes.yaml`。确保 `scenes.yaml` 始终是一个列表！对于您复制的每个场景，都需要添加一个 `id`。这可以是任何字符串，只要它是唯一的即可。

例如：

```yaml
# `scenes.yaml` 条目示例
- id: my_unique_id # <-- 编辑器正常工作所必需。
  name: 浪漫氛围
  entities:
    light.tv_back_light: on
    light.ceiling:
      state: on
      xy_color: [0.33, 0.66]
      brightness: 200
```

:::note
当您通过编辑器更新场景时，文件中的任何注释都将丢失，模板将被重新格式化。
:::
