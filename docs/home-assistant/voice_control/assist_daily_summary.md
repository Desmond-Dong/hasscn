---
title: Assist 每日摘要
---

在本教程中，我们将创建一个自动化，让 Assist 每天向你发送摘要。Assist 会告诉你今天的天气和日历事件，也会把这份摘要发送到你的聊天应用。

<p class='img'>
<img class='no-shadow' src='/home-assistant/images/assist/assist-daily-summary.png' alt='Daily summary 通知'>每日摘要通知 - 使用中性语气
</p>

我们将使用 OpenAI，因此需要一个 OpenAI 账户。对于本教程中的内容，免费试用就已足够，无需填写信用卡信息。

## 前提条件

本教程假设你已经完成以下准备：

- [Home Assistant Cloud](https://www.nabucasa.com) 或手动配置的[本地语音助手管线](/home-assistant/voice_control/voice_remote_local_assistant/)。

本教程使用 **Local calendar**、**Meteorologisk institutt** 和 **Telegram** 集成完成。尚未使用其他通知类或日历类集成进行测试。

### 添加日历

如果你已经在使用日历，可以跳过本节。

1. 前往[集成页面](/home-assistant/integrations/)，选择日历 **Calendar** 筛选器。
2. 选择一个你喜欢的日历，并按照文档说明安装。
3. 如果你只是想跟着本教程操作，请安装 [local calendar](/home-assistant/integrations/local_calendar/) 集成。
   - 系统提示输入名称时，请命名为 `Local calendar`。
   - 现在你应该能在左侧导航栏中看到一个新的日历条目。打开它。

     ![Calendar](/home-assistant/images/assist/calendar_01.png)
   - 为今天和接下来几天添加一些事件。

### 添加天气集成

如果你已经在使用天气集成，可以跳过本节。

1. 前往[集成页面](/home-assistant/integrations/)，选择 **Weather** 筛选器。
2. 选择一个你喜欢的天气集成，并按照文档说明安装。
3. 如果不确定，请选择 **Meteorologisk institutt** 并添加该集成。
   - 系统提示时，输入你家的纬度和经度。
   - 这些坐标可以让集成显示你所在位置的天气预报。

### 将 Home Assistant 连接到聊天服务

如果你已经在使用通知集成，可以跳过本节。

1. 前往[集成页面](/home-assistant/integrations/)，选择 **通知** 筛选器。
2. 选择一个你喜欢的聊天服务，并按照文档说明安装。
3. 如果不确定，请选择 **Telegram** 并添加该集成。
4. 如果你还没有，请先在手机上安装 Telegram。
5. 要开始在 Home Assistant 中使用 Telegram，请按照[设置说明](/home-assistant/integrations/telegram/#configuration-example)逐步操作。
   - 请确保不要直接复制示例中的以下值，而是填写你自己的真实值：
     - `api_key`
     - `allowed_chat_ids`
     - `name`
     - `chat_id`
     - `service`
6. 现在你已经拥有一个可用的**通知**集成，Home Assistant 可以向你发送消息了。

### 创建 OpenAI 语音助手个性

OpenAI 个性能为消息增添独特风格。
使用 OpenAI 需要一个 OpenAI 账户。对于本教程，免费试用就足够了，无需填写信用卡信息。

- [创建一个 Mario 个性](/home-assistant/voice_control/assist_create_open_ai_personality/)。

### 通过蓝图创建自动化

我们将使用一个由 [@allenporter] 提供的蓝图，它会读取日历事件并收集天气信息，然后让 ChatGPT 进行总结，并将结果发送到你的手机。

1. 要导入该蓝图，请选择下方按钮：


2. 选择 **Preview**，然后选择 **Import blueprint**。
3. 从列表中选择蓝图 **Conversation agent agenda 通知**。
4. 为每个类别输入相应的值。
   ![Add prompt for Mario personality](/home-assistant/images/assist/blueprint_daily_summary_notification_01.png)
   - 在 **Notify 服务 name** 下，请不要保留默认值，而要使用你之前设置好的那个服务，例如 `notify.nina`。
   - **保存**你的更改。
   - 在对话框中，为新的自动化输入一个名称，例如 `Daily summary by Mario`。
5. 要查看该自动化，请前往 [**设置** > **自动化 & 场景**](https://my.home-assistant.io/redirect/automation/)。
6. 要测试该自动化，请在自动化上选择三点菜单，然后选择 **Run**。
   - 现在你应该会在聊天应用中收到来自 Assist 的通知。

[@allenporter]: https://github.com/allenporter
