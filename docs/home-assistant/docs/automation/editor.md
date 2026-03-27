---
title: 自动化编辑器
description: '自动化编辑器是一种通过用户界面创建和编辑自动化的简便方法。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 自动化编辑器

自动化编辑器是一种通过用户界面创建和编辑自动化的简便方法。

本教程使用 [Random 传感器](/home-assistant/integrations/random#sensor)，因为它可以生成数据（默认情况下，值在 0 到 20 之间）。即使您还没有连接任何实际传感器，也可以跟着本示例操作。您也可以使用任何其他输出数值的传感器。

1. 前往 [**设置** > **自动化与场景**](https://my.home-assistant.io/redirect/automation/)，在右下角选择 **创建自动化** 按钮。
2. 选择 **创建新自动化**。

    ![创建自动化对话框](/home-assistant/images/docs/automation-editor/create-automation.png)

3. 选择 **添加触发器**，在 **搜索触发器** 字段中输入 `num`。
   - 选择 **数值状态**。

    ![添加触发器](/home-assistant/images/docs/automation-editor/add-trigger-to-automation.png)

4. 输入触发器条件：
   - 定义传感器：在 **实体** 下，输入 "sensor.random_sensor"。
   - 当传感器值大于 10 时，我们希望自动化被触发。
     - 在 **大于** 字段中，输入 "10"。

    ![自动化触发器](/home-assistant/images/docs/automation-editor/new-trigger.png)

5. 定义要执行的动作：
   - 在 **然后执行** 部分，选择 **添加动作**。

     ![添加动作](/home-assistant/images/docs/automation-editor/add_action.png)

6. 我们要创建一个 [持久通知](/home-assistant/integrations/persistent_notification/)。
   - 输入 "No" 并选择 **通知：发送持久通知**。

    ![自动化动作](/home-assistant/images/docs/automation-editor/send-notification.png)

7. 作为消息，我们希望显示一段简单文本作为通知的一部分。

    ```yaml
    message: Sensor value greater than 10
    ```

8. 选择 **保存**，为您的自动化起一个有意义的名称，然后再次 **保存**。

    ![新建自动化编辑器](/home-assistant/images/docs/automation-editor/new-automation.png)

    - **结果**：通过用户界面创建或编辑的自动化在保存后会立即激活。
    - 要了解更多关于自动化的内容，请阅读 [自动化 Home Assistant](/home-assistant/getting-started/automation/) 文档。

## 故障排除：自动化缺失

当您使用 GUI 创建自动化但它们没有出现在用户界面中时，请确保您在 **`configuration.yaml`** 中添加了默认配置中的 `automation: !include automations.yaml`。
