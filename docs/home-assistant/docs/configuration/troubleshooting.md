---
title: 配置故障排除
description: 配置调整过程中常见问题及其解决方案。
---

在配置 Home Assistant 时，您可能会遇到一些问题。例如，某个集成未显示或运行异常。本页面将讨论一些最常见的问题。

在深入讨论常见问题之前，请确保您知道配置目录的位置。Home Assistant 启动时会打印出正在使用的配置目录。

每当集成或配置选项导致警告时，它都会记录在[日志](/home-assistant/integrations/logger/#viewing-logs)中。

## 我的集成未显示

当集成未显示时，可能有多种原因。在尝试以下步骤之前，请务必查看[日志](/home-assistant/integrations/logger/#viewing-logs)，看看是否有与您尝试设置的集成相关的错误。

如果配置文件中存在错误的条目，您可以使用配置检查命令（见下文）来帮助识别它们。

### 配置问题

Home Assistant 最常见的问题之一是 **`configuration.yaml`** 或其他配置文件无效。

- Home Assistant 提供了一个 CLI，可以让您查看它如何解析配置文件，每种安装类型在常用任务中都有自己的章节：
  - [操作系统](/home-assistant/common-tasks/os/#configuration-check)
  - [容器](/home-assistant/common-tasks/container/#configuration-check)

- 配置文件（包括 **`configuration.yaml`**）必须使用 UTF-8 编码。如果您看到类似 `'utf-8' codec can't decode byte` 的错误，请编辑有问题的配置文件并将其重新保存为 UTF-8 格式。
- 您可以使用[此在线 YAML 解析器](https://yaml-online-parser.appspot.com/)或 [YAML 验证器](https://codebeautify.org/yaml-validator/)来验证配置结构。
- 要了解更多关于 YAML 的特性，请阅读 SaltStack 的 [YAML IDIOSYNCRASIES](https://docs.saltproject.io/en/latest/topics/troubleshooting/yaml_idiosyncrasies.html)（其中的示例是 SaltStack 特有的，但很好地解释了 YAML 问题）。

`configuration.yaml` 不允许多个部分使用相同的名称。如果您想为一个集成加载多个平台，可以在名称后附加数字或字符串，或将它们嵌套：

```yaml
sensor:
  - platform: forecast
    ...
  - platform: bitcoin
    ...
```

另一个常见问题是缺少必需的配置设置。如果是这种情况，集成会在[日志](/home-assistant/integrations/logger/#viewing-logs)中报告此问题。您可以查看[各个集成页面](/home-assistant/integrations/)了解如何设置该集成。

有关如何为特定模块定义所需日志级别的说明，请参阅 [logger](/home-assistant/integrations/logger/) 集成。

如果您发现任何错误或想要扩展文档，请[告诉我们](https://github.com/home-assistant/home-assistant.io/issues)。

#### 依赖问题

几乎所有集成都有外部依赖项，用于与您的设备和服务通信。有时 Home Assistant 无法安装必要的依赖项。如果是这种情况，它应该显示在[日志](/home-assistant/integrations/logger/#viewing-logs)中。

第一步是尝试重启 Home Assistant，看看问题是否仍然存在。如果问题持续存在，请查看日志了解错误是什么。如果您无法找出原因，请[报告问题](https://github.com/home-assistant/core/issues)，以便我们调查发生了什么。

#### 集成问题

某些集成可能一开始就无法正常工作，或者在 Home Assistant 运行一段时间后停止工作。如果您遇到这种情况，请[报告问题](https://github.com/home-assistant/core/issues)，以便我们进行查看。

#### 多文件配置

如果您使用多个文件进行配置，请确保指针正确且文件格式有效。理解不同类型的 `!include` 以及每个文件的内容应该如何结构化非常重要——有关将配置拆分为多个文件的各种方法的更多信息，请参阅[这里](/home-assistant/docs/configuration/splitting_configuration)。

```yaml
light: !include devices/lights.yaml
sensor: !include devices/sensors.yaml
```

`lights.yaml` 的内容（注意它不包含 `light:`）：

```yaml
- platform: hyperion
  host: 192.168.1.98
  ...
```

`sensors.yaml` 的内容：

```yaml
- platform: mqtt
  name: "Room Humidity"
  state_topic: "room/humidity"
- platform: mqtt
  name: "Door Motion"
  state_topic: "door/motion"
  ...
```

:::note
每当您报告问题时，请注意我们是志愿者，无法拥有世界上所有的设备，也没有无限的时间来解决每一个问题。
:::

### 实体名称

实体名称中唯一有效的字符是：

- 小写字母
- 数字
- 下划线

实体名称不能以下划线开头或结尾。如果您从 UI 创建包含其他字符的实体，Home Assistant 会验证名称。如果您直接在文件中更改名称，Home Assistant 可能不会为该实体生成错误。但是，尝试使用该实体将产生错误（或可能静默失败）。

有关如何更改实体名称的说明，请参阅[自定义实体](/home-assistant/docs/configuration/customizing-devices/)部分。

## 调试日志和诊断信息

在在线报告问题之前，您首先需要的是给您带来麻烦的集成的调试日志和诊断信息（如果可用）。提前获取这些信息将确保有人能以最快的方式帮助您解决问题。

### 启用调试日志记录

要为特定集成启用调试日志记录，请按照以下步骤操作：

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 选择您要为其启用调试日志记录的集成。
3. 在页面右上角，打开三点 `[mdi:dots-vertical]` 菜单，然后选择 **启用调试日志记录**。

    <p class='img'>
      <img src='/home-assistant/images/docs/configuration/enable-debug-logging.png' alt='显示集成详情页面上启用调试日志记录按钮的截图'>
      显示 <b>启用调试日志记录</b> 菜单项的截图。
    </p>
4. 要在日志中查看错误，您需要重现该错误。
   - 运行您的自动化、操作您的设备或执行之前产生错误的任何操作。
5. 继续执行[禁用调试日志记录并下载日志](#disable-debug-logging-and-download-logs)中的步骤。

<a id="disable-debug-logging-and-download-logs"></a>

### 禁用调试日志记录并下载日志

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 选择您要为其禁用调试日志记录的集成。
3. 在页面右上角，打开三点 `[mdi:dots-vertical]` 菜单，然后选择 **禁用调试日志记录**。
4. 禁用后，系统会提示您下载日志文件。
   - 将其保存到安全的位置以便稍后上传。

### 下载诊断信息

下载日志后，您还需要下载给您带来麻烦的集成的诊断信息。并非所有集成都提供诊断信息，但如果提供，您可以按照以下步骤下载：

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 选择该集成。
3. 在集成卡片的右上角，打开三点 `[mdi:dots-vertical]` 菜单，然后选择 **下载诊断信息**。

<p class='img'>
  <img src='/home-assistant/images/docs/configuration/download-diagnostics.png' alt='下载诊断信息示例'>
  显示 Zigbee 集成卡片上 <b>下载诊断信息</b> 按钮的示例。
</p>

### 处理意外重启或崩溃

如果您发现 Home Assistant 意外重启或崩溃，很可能是因为某个集成行为异常影响了系统稳定性。Home Assistant 有一个内置调试选项，可以帮助发现实现错误。它还可以阻止许多不安全的线程操作导致系统崩溃。启用调试会对系统性能产生轻微影响，不建议长期使用。要启用调试，请在您的 **`configuration.yaml`** 中添加以下内容：

```yaml
homeassistant:
  debug: true
```

启用调试后，定期检查 [Home Assistant 系统日志](https://my.home-assistant.io/redirect/日志)以获取新消息。
