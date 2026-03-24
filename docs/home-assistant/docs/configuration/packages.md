---
title: 包
description: 介绍 Home Assistant 中配置包的所有相关信息。
---

Home Assistant 中的包提供了一种将多个集成的配置捆绑在一起的方式。通过包，我们可以使用 [拆分配置](/home-assistant/docs/configuration/splitting_configuration) 中介绍的任何 `!include` 指令来包含多个集成或集成的部分内容。

包在配置的核心 `homeassistant/packages` 下进行配置，格式为包名称（不含空格，全小写）后跟包含包配置的字典。例如，包 `pack_1` 将创建为：

```yaml
homeassistant:
  ...
  packages: 
    pack_1:
      ...package configuration here...
```

包配置可以包括：`switch`、`light`、`automation`、`groups` 或大多数其他 Home Assistant 集成，包括硬件平台。

它可以内联指定，也可以使用 `!include` 在单独的文件中指定。

内联示例，主 **`configuration.yaml`**：

```yaml
homeassistant:
  ...
  packages: 
    pack_1:
      switch:
        - platform: rest
          ...
      light:
        - platform: rpi
          ...
```

引用示例，主 **`configuration.yaml`**：

```yaml
homeassistant:
  ...
  packages: 
    pack_1: !include my_package.yaml
```

文件 `my_package.yaml` 包含“顶层”配置：

```yaml
switch:
  - platform: rest
    ...
light:
  - platform: rpi
    ...
```

对于将被合并的包，有一些规则：

1. 基于平台的集成（`light`、`switch` 等）始终可以合并。
2. 实体由代表 entity_id 的键标识的集成（`{key: config}`），在包和主配置文件之间需要有唯一的"键"。

    例如，如果主配置中有以下内容。则不允许在包中再次为 `input_boolean` 使用 "my_input"：

    ```yaml
    input_boolean:
      my_input:
    ```

3. 任何不是平台 [1] 或带有实体 ID 键的字典 [2] 的集成，只有当其键（列表除外）仅被定义一次时才能合并。

:::tip
包内的集成只能使用配置样式 1 指定平台条目，即所有平台都归类在集成名称下。
:::

## 创建包文件夹

组织包的一种方法是在 Home Assistant 配置目录中创建一个名为 "packages" 的文件夹。在这个包文件夹中，您可以在文件中存储任意数量的包，并根据需要将这些包组织到文件和子文件夹中。使用 `!include_dir_named` 时，文件名被用作包名。这意味着文件名必须是全局唯一的，即使在子文件夹中也是如此。在您的 **`configuration.yaml`** 中添加以下条目将加载此 _packages_ 文件夹及其子文件夹中的所有文件：

```yaml
homeassistant:
  packages: !include_dir_named packages
```

这种方法的好处是将集成系统所需的所有配置整合到一个文件中，而不是分散在多个文件中。
您可以为包使用其他 `!include` 方法。例如：`!include_dir_merge_named`。但是，与 `!include_dir_merge_named` 不同，`!include_dir_named` 方法使用与 'configuration.yaml' 相同的缩进。这意味着您可以从配置文件中复制和粘贴元素。

使用 `!include_dir_merge_named` 方法时，包名必须包含在文件中。下面的配置需要相应缩进。这意味着您不能直接从配置文件复制和粘贴。

```yaml
homeassistant:
  packages: !include_dir_merge_named packages/
```

在 `packages/subsystem1/functionality1.yaml` 中：

```yaml
subsystem1_functionality1:
  input_boolean:
  ...
  binary_sensor:
  ...
  automation:
```

## 在包中自定义实体

可以在包内 [自定义实体](/home-assistant/docs/configuration/customizing-devices/)。只需在以下位置创建您的自定义条目：

```yaml
homeassistant:
  customize:
```

:::important
如果您正在将配置移动到包中，`auth_providers` 必须保留在 'configuration.yaml' 中。请参阅 [身份验证提供程序](/home-assistant/docs/authentication/providers/#configuring-auth-providers) 的常规文档。

这是因为 Home Assistant 在启动过程的早期就会处理身份验证，甚至在处理包之前。
:::
