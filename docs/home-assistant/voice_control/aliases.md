---
title: 别名 - 实体、区域和楼层
description: 'Assist 会使用你的实体、区域和楼层名称，以及你配置的所有别名。已配置的别名不仅会被 Assist 使用，如果你设置了 Google Assistant，也可以在那里使用。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 别名 - 实体、区域和楼层

Assist 会使用你的实体、区域和楼层名称，以及你配置的所有别名。已配置的别名不仅会被 Assist 使用，如果你设置了 Google Assistant，也可以在那里使用。

如果你会用多个名字称呼同一个设备，
或者同时使用多种语言的语音助手，这些别名会非常有帮助。

## 为实体添加别名

为实体添加别名有多种方式：

- **Option 1**: 前往 **设置** > **语音助手**。在 **Expose** 选项卡中，选择你想要添加别名的实体。
![Screenshot showing the alias editing capabilities added to the more info dialog of 实体, accessed from the 语音助手 page](/home-assistant/images/assist/assist_aliases.png)
- **选项 2**：你也可以在实体的更多信息对话框中，进入设置选项卡的高级部分来修改别名。
![Screenshot showing the alias editing capabilities added to the more info dialog of 实体, accessed from the 语音助手 page](/home-assistant/images/assist/assist_aliases_02.png).

## 为区域添加别名

1. 要为区域添加别名，请前往 **设置** > **Areas, labels & zones**。
2. 在目标区域卡片上，选择铅笔按钮。
3. 选择 **Add alias**，然后输入你想用于该区域的别名。
4. **保存**更改。

## 为楼层添加别名

1. 要为楼层添加别名，请前往 **设置** > **Areas, labels & zones**。
2. 在目标楼层旁边，选择三点菜单 `[mdi:dots-vertical]`，然后选择 **Edit floor**。
3. 选择 **Add alias**，然后输入你想用于该楼层的别名。
4. **保存**更改。

### 已分配区域实体的无区域别名

最佳实践是将区域加进实体的规范名称中，例如 Living room lamp。不过，由于 Assist 既可以推断区域，也可以从句子中显式提取区域，因此为所有已暴露的实体添加简化别名会是个很好的做法。比如，为 Living room lamp 设置别名 Lamp 后，你既可以说“打开客厅的灯”，也可以在客厅里的语音卫星上直接说“打开灯”。

如果你还有一个 Bedroom lamp，也不用担心。你同样可以把它的别名设为 Lamp，因为它只会在与区域名称（Living room 或 Bedroom）结合时被匹配到。
