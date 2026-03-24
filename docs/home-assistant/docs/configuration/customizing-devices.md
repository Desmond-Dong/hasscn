---
title: 自定义实体
description: 实体的简单自定义。
---

添加新设备后，您可能会发现自动分配的实体 ID 过于技术化，且实体缺少友好的名称。您可以个性化这些元素以更好地适应您的命名约定，或修改图标等其他属性。

要更改实体属性，请按照以下步骤操作：

1. 前往 [**设置** > **设备与服务** > **实体**](https://my.home-assistant.io/redirect/entities/)，然后从列表中选择该实体。
2. 在右上角，选择 `[mdi:cog]` 齿轮图标。

   ![实体对话框与齿轮图标。](/home-assistant/images/docs/configuration/customizing-entity-dialog.png)

3. 输入或编辑属性：
   - 例如，此处的实体 ID 可以缩短为 `binary_sensor.lumi_sensor_aq2_opening`。
     - 您可以使用小写字母、数字和下划线。
     - ID 不能以下划线开头或结尾。
     - 要撤消更改并将 ID 恢复为默认值，请选择 `[mdi:restore]` 图标。
       - **注意**：您只能将具有唯一 ID 的实体的 ID 重置为默认 ID。
         - 已禁用的实体或尚未设置集成的实体的 ID 无法恢复。
     - 要恢复设备的所有实体 ID，请在设备页面上选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **重新创建实体 ID**。
     - **结果**：这将重置实体 ID 并应用当前的默认命名约定。
       - 用于生成实体 ID 的术语取决于几个因素。优先级如下：
         1. 如果您更改了实体的友好名称，则将使用该友好名称。
         2. 集成建议的实体 ID（只有少数集成会这样做）。
         3. 用户语言的默认名称（如果使用拉丁文字）。
            - 如果使用非拉丁文字，则实体 ID 基于英文默认名称。
            - 这是因为实体 ID 必须使用 [a-z,1-9] 范围内的小写字母数字字符。

        ![从设备页面恢复所有实体 ID](/home-assistant/images/docs/configuration/customizing-entity.png)

   - 输入或编辑友好名称。
     - 在此示例中，这将更改 "Opening"。
   - 如果需要，从 **显示为** 菜单中，您可以选择不同的 [设备类](/home-assistant/integrations/homeassistant/#device-class)。
   - 如果需要，可以添加一个 [标签](/home-assistant/docs/organizing/labels/)。

   ![实体设置。](/home-assistant/images/docs/configuration/customizing-entity.png)

4. 要应用更改，请选择 **更新**。
5. 如果您在自动化和脚本中使用了此实体，则也需要在那里重命名实体 ID。
   - 前往 [**设置** > **自动化与场景**](https://my.home-assistant.io/redirect/automations/)，打开相应的选项卡并找到您的自动化或脚本。

### 在 YAML 中自定义实体

如果您的实体不受支持，或者您无法通过用户界面自定义所需内容，则需要在 **`configuration.yaml`** 文件中编辑设置。有关实体配置变量和 [设备类](/home-assistant/integrations/homeassistant/#device-class) 信息的详细描述，请参阅 [Home Assistant 核心集成文档](/home-assistant/integrations/homeassistant/)。