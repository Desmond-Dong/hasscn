---
title: "Amazon Alexa Custom Skill"
description: '内置的 Alexa 集成允许您将 Home Assistant 集成到 Alexa/Amazon Echo 中。此集成将允许您通过语音查询信息并在 Home Assistant 中执行操作。Home Assistant 不提供内置语句，但提供了一个框架供您定义自己的语句。'
ha_category:
  - Voice
ha_release: "0.10"
ha_domain: alexa
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Amazon Alexa Custom Skill

## 我想构建自定义命令以配合 Echo 使用

内置的 Alexa 集成允许您将 Home Assistant 集成到 Alexa/Amazon Echo 中。此集成将允许您通过语音查询信息并在 Home Assistant 中执行操作。Home Assistant 不提供内置语句，但提供了一个框架供您定义自己的语句。

<lite-youtube videoid="1Ke3mtWd_cQ" videotitle="Home Assistant integration for Amazon Echo" posterquality="maxresdefault"></lite-youtube>

### 要求

- Amazon 开发者账户。您可以在[这里](https://developer.amazon.com)注册。
- 如果您想使用 Alexa Custom Skill API，需要一个 [AWS 账户](https://aws.amazon.com/free/)。您的 Alexa Custom Skill 的一部分将托管在 [AWS Lambda](https://aws.amazon.com/lambda/pricing/) 上。不过，您无需担心费用，因为 AWS Lambda 每月免费提供最多 100 万次请求和 1GB 出站数据传输。
- Alexa Custom Skill API 还需要您的 Home Assistant 实例可以通过互联网访问，使用 443 端口的 HTTPS，并使用由 [Amazon 认可的证书颁发机构](https://ccadb-public.secure.force.com/mozilla/IncludedCACertificateReport)签名的证书。这是为了进行账户关联。请阅读我们的[博客文章](/home-assistant/blog/2015/12/13/setup-encryption-using-lets-encrypt/)了解如何为 Home Assistant 设置加密。运行 Home Assistant Operating System 时，使用 [Duck DNS](/home-assistant/addons/duckdns/) 插件是最简单的方法。

### 创建您的 Amazon Alexa Custom Skill

- 登录 [Amazon 开发者控制台][amazon-dev-console]
- 点击控制台顶部的 Alexa 按钮
- 点击右上角蓝色的"Create Skill"按钮
  - 要添加的模型：Custom
  - 名称：HomeAssistantIntentsSkill（或您想为此技能命名的任何名称）
  - 托管方式：Provision your own

您可以使用这个[特定尺寸的 Home Assistant 图标][large-icon]作为大图标，[这个][small-icon]作为小图标。

### 创建您的 Lambda 函数

Alexa Custom skill 将触发 AWS Lambda 函数来处理请求，我们将编写一小段代码作为 Lambda 函数托管， basically 将请求重定向到您的 Home Assistant 实例，然后 Home Assistant 中的 Alexa 集成将处理请求并发回响应。您的 Lambda 函数将把响应传回给 Alexa。

好的，让我们开始。您首先需要登录您的 [AWS 控制台](https://console.aws.amazon.com/)，如果您还没有 AWS 账户，可以在[这里](https://aws.amazon.com/free/)创建一个新用户，享受 12 个月的免费套餐福利。如果您的账户已经过了前 12 个月，您也不必担心费用，AWS 每月为所有用户免费提供最多 100 万次 Lambda 请求、1GB 出站数据和无限入站数据。详情请参阅 [Lambda 定价](https://aws.amazon.com/lambda/pricing/)。

#### 为 Lambda 创建 IAM 角色

登录 [AWS 控制台](https://console.aws.amazon.com/) 后，您需要做的第一件事是为 Lambda 执行创建一个 IAM 角色。AWS 有非常严格的访问控制，您必须明确定义和分配权限。

- 点击顶部导航栏中的 `Service`，展开菜单显示所有 AWS 服务，点击 `Security, Identity, & Compliance` 部分下的 `IAM` 导航到 IAM 控制台。或者您可以使用此[链接](https://console.aws.amazon.com/iam/home)
- 点击左侧面板中的 `Roles`，然后点击 `Create role`，在向导的第一页选择 `AWS Service` -> `Lambda`，然后点击 `Next: Permissions`
- 选择 `AWSLambdaBasicExecutionRole` 策略，然后点击 `Next: Tags`。（提示：您可以使用搜索框过滤策略）

<p class='img'>
  <img src='/home-assistant/images/integrations/alexa/create_iam_role_attach_permission.png' alt='截图：为 IAM 角色附加权限策略'>
</p>

- 您可以跳过 `Add tags` 页面，点击 `Next: Review`。
- 为您的新角色命名，例如 `AWSLambdaBasicExecutionRole-Intents`，然后点击 `Create role` 按钮。现在您应该能在角色列表中找到您的新角色。

#### 创建 Lambda 函数并添加代码

接下来您需要创建一个 Lambda 函数。

- 点击顶部导航栏中的 `Service`，展开菜单显示所有 AWS 服务，点击 `Compute` 部分下的 `Lambda` 导航到 Lambda 控制台。或者您可以使用此[链接](https://console.aws.amazon.com/lambda/home)
- **重要** 您的当前区域将显示在右上角。确保根据您的 Amazon 账户所在国家选择正确的区域：
  - **US East (N.Virginia)** 区域用于 English (US) 或 English (CA) 技能
  - **EU (Ireland)** 区域用于 English (UK)、English (IN)、German (DE)、Spanish (ES) 或 French (FR) 技能
  - **US West (Oregon)** 区域用于 Japanese 和 English (AU) 技能。
- 点击左侧导航栏中的 `Functions`，显示您的 Lambda 函数列表。
- 点击 `Create function`，选择 `Author from scratch`，然后输入 `Function name`。
- 选择 `Python 3.x` 作为 `Runtime`（选择最新可用的 Python 3 版本）。
- 选择 *Use an existing role* 作为 `Execution role`，然后从 `Existing role` 列表中选择您刚刚创建的角色。
- 点击 `Create function`，然后您可以配置 Lambda 函数的详细信息。
- 在 `Configuration` 选项卡下，展开 `Designer`，然后点击面板左侧的 `+ Add trigger`，从下拉列表中选择 `Alexa Skills Kit`，为您的 Lambda 函数添加 Alexa Skills Kit 触发器。
- 向下滚动一点，您需要输入上一步创建的技能的 `Skill ID`。（您可能需要切换回 Alexa Developer Console 复制 `Skill ID`）。
- 点击图表中间的 Lambda 函数图标并向下滚动，您将看到一个 `Function code` 窗口。
- 清除示例代码并复制此 [GitHub Gist](https://gist.github.com/lpomfrey/97381cf4316553b03622c665ae3a47da) 中的 Python 脚本。
- 点击 `Function code` 窗口的 `Deploy` 按钮。
- 再次向下滚动并选择 `Configuration' 选项卡，选中它，左侧您将找到 `Environment variables`，点击 `Edit` 按钮并根据需要添加以下环境变量：
  - BASE_URL *（必需）*：您的 Home Assistant 实例的互联网可访问 URL，如果需要请包含端口。*不要包含末尾的 `/`*。
  - NOT_VERIFY_SSL *（可选）*：设置为 *True* 以忽略 SSL 问题，如果您没有有效的 SSL 证书或使用自签名证书。
  - DEBUG *（可选）*：设置为 *True* 以记录调试消息。
  - LONG_LIVED_ACCESS_TOKEN *（可选，不推荐）*：您将在后续步骤中将您的 Alexa Custom skill 与您的 Home Assistant 用户账户关联，因此您不需要在这里使用长期访问令牌。但是，您从登录流程获得的访问令牌仅有效 30 分钟。使用测试数据中的访问令牌测试 lambda 函数会很困难。为方便起见，您可以从测试数据中删除访问令牌，[生成一个长期访问令牌][generate-long-lived-access-token]放在这里，然后函数将回退到从环境变量读取令牌。（提示：您没有为环境变量启用安全存储，所以保存在这里的令牌不是很安全。您应该只将其用于调试和测试目的。完成调试后，您应该删除长期访问令牌。）
- 点击 `Save` 按钮保存您的环境变量。
- 接下来，复制页面顶部显示的 ARN，这是此 Lambda 函数的标识。
  - 返回您的 Alexa 技能，进入左侧的 Custom->Endpoint 菜单选项。
  - 将 ARN 值粘贴到"Default Region"。注意：在您完成上述步骤将 Alexa Skills Kit 触发器（在上一步完成）添加到 AWS Lambda 函数之前，您将无法执行此操作。

### 账户关联

Alexa 可以将您的 Amazon 账户与您的 Home Assistant 账户关联。因此，Home Assistant 可以确保只有经过身份验证的 Alexa 请求才会被执行。为了关联账户，您必须确保您的 Home Assistant 实例可以从互联网访问。

- 登录 [Amazon 开发者控制台][amazon-dev-console]
- 进入 `Alexa Skills` 页面。
- 找到您刚创建的技能，点击 `Actions` 列中的 `Edit`。
- 点击构建页面左侧导航栏中的 `ACCOUNT LINKING`
- 输入所有必需信息。假设您的 Home Assistant 可以通过 `https://[YOUR HOME ASSISTANT URL:PORT]` 访问
  - `Authorization URI`: `https://[YOUR HOME ASSISTANT URL]/auth/authorize`
  - `Access Token URI`: `https://[YOUR HOME ASSISTANT URL]/auth/token`
    - 注意：您必须使用有效/受信任的 SSL 证书和 443 端口，账户关联才能工作
  - `Client ID`:
    - 如果您在美国，使用 `https://pitangui.amazon.com/`
    - 如果您在欧洲，使用 `https://layla.amazon.com/`
    - 如果您在日本或澳大利亚，使用 `https://alexa.amazon.co.jp/`

    末尾的斜杠很重要。

  - `Client Secret`: 输入任何您喜欢的内容，Home Assistant 不检查此字段
  - `Client Authentication Scheme`: 确保您选择了 *Credentials in request body*。Home Assistant 不支持 *HTTP Basic*。
  - `Scope`: 输入 `intent`。Home Assistant 目前不使用此字段，当我们允许更细粒度的访问控制时可能会在未来使用。
- 您可以将 `Domain List` 和 `Default Access Token Expiration Time` 留空。

<p class='img'>
  <img src='/home-assistant/images/integrations/alexa/account_linking.png' alt='截图：账户关联'>
</p>

- 点击右上角的 `Save` 按钮。
- 接下来，您将使用 Alexa 移动应用或 [Alexa 网页应用](http://alexa.amazon.com/)来关联您的账户。
  - 打开 Alexa 应用，导航到 `Skills` -> `Your Skills` -> `Dev Skills`
  - 点击您刚创建的 Custom skill。
  - 点击 `Enable`。
  - 将打开一个新窗口，引导您到 Home Assistant 的登录界面。
  - 成功登录后，您将被重定向回 Alexa 应用。

### 配置您的 Amazon Alexa skill

Alexa 基于 intents 工作。每个 intent 有一个名称和变量槽位。例如，一个 `LocateIntent` 有一个包含 `User` 的槽位。示例 intent 架构：

```json
{
  "intents": [
    {
      "intent": "LocateIntent",
      "slots": [
      {
          "name": "User",
          "type": "AMAZON.US_FIRST_NAME"
        }]
    },
    {
      "intent": "WhereAreWeIntent",
      "slots": []
    }
  ]
}
```

要将这些 intents 绑定到用户说的语句，您需要定义话语。示例话语可以如下：

```text
LocateIntent Where is {User}
LocateIntent Where's {User}
LocateIntent Where {User} is
LocateIntent Where did {User} go

WhereAreWeIntent where we are
```

这意味着我们现在可以问 Alexa 诸如此类的问题：

- Alexa，询问 Home Assistant Paul 在哪里
- Alexa，询问 Home Assistant 我们在哪里

## 配置 Home Assistant

激活后，Alexa 集成将让 Home Assistant 的原生 intent 支持处理传入的 intents。如果您想基于 intents 运行操作，请使用 [`intent_script`](/home-assistant/integrations/intent_script) 集成。

要启用 Alexa，请将以下条目添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
alexa:
```

### 使用场景

Alexa 集成最有用的应用之一是直接调用场景。通过在 Home Assistant 端进行一些简单设置，并让 Alexa 知道您想运行哪些场景，可以轻松实现。

首先，我们将配置 Alexa。在 Amazon Interaction 模块中，将以下内容添加到 intent 架构：

```json
{
  "intent": "ActivateSceneIntent",
  "slots":
  [
    {
      "name" : "Scene",
      "type" : "Scenes"
    }
  ]
}
```

然后创建一个名为 `Scenes` 的自定义槽位类型，列出您想控制的每个场景：

<p class='img'>
<img src='/home-assistant/images/integrations/alexa/scene_slot.png' />
场景支持的自定义槽位类型。
</p>

名称必须与场景名称完全匹配（减去下划线 - 反正 Amazon 会丢弃它们，我们稍后用模板将它们映射回来）。

在新的 Alexa Skills Kit 中，您还可以为槽位类型值创建同义词，可以在话语中代替基础值使用。同义词将在发送到 Alexa API 端点的 intent 请求中替换为其关联的槽位值，但仅当没有多个同义词匹配时。否则，将使用所说话语的同义词值。

如果您想使用同义词值旁边或代替同义词值的 `Optional ID` 字段，您可以简单地在模板变量末尾附加 "_Id"，例如 `Scene_Id`。

<p class='img'>
<img src='/home-assistant/images/integrations/alexa/scene_slot_synonyms.png' />
带有同义词的自定义槽位值。
</p>

添加示例话语：

```text
ActivateSceneIntent activate {Scene}
```

然后将 intent 添加到您的 HA 配置文件中的 `intent_script` 部分：


```yaml
intent_script:
  ActivateSceneIntent:
    action:
      action: scene.turn_on
      target:
        entity_id: scene.{{ Scene | replace(" ", "_") }}
      data:
        id: {{ Scene_Id }}
    speech:
      type: plain
      text: OK
```


这里我们使用[模板]将我们给 Alexa 的名称（例如 `downstairs on`）中的空格替换为下划线，使其变成 `downstairs_on`，正如 Home Assistant 所期望的那样。

现在说 `Alexa 请求 Home Assistant 激活 <某个场景>`，Alexa 将为您激活该场景。

### 添加脚本

我们可以轻松地将上述想法扩展到脚本。如前所述，为脚本添加一个 intent：

```json
{
  "intent": "RunScriptIntent",
  "slots":
  [
    {
      "name" : "Script",
      "type" : "Scripts"
    }
  ]
}
```

创建一个名为 `Scripts` 的自定义槽位类型，列出您想运行的每个脚本：

<p class='img'>
<img src='/home-assistant/images/integrations/alexa/script_slot.png' />
脚本支持的自定义槽位类型。
</p>

添加示例话语：

```text
RunScriptIntent run {Script}
```

然后将 intent 添加到您的 HA 配置文件中的 intent_script 部分：


```yaml
intent_script:
  RunScriptIntent:
    action:
      action: script.turn_on
      target:
        entity_id: script.{{ Script | replace(" ", "_") }}
    speech:
      type: plain
      text: OK
```


现在说 `Alexa 请求 Home Assistant 运行 <某个脚本>`，Alexa 将为您运行该脚本。

### 支持 Launch Requests

有时您可能想响应从命令（如"Alexa，红色警报！"）发起的 launch request。

首先，您需要获取 skill id：

- 登录 [Amazon 开发者控制台][amazon-dev-console]
- 点击控制台顶部的 Alexa 按钮
- 点击 Alexa Skills Kit Get Started 按钮
  - 找到您想要 Launch Request 支持的技能
  - 点击"View Skill ID"链接并复制 ID

配置与 intent 相同，只是您将使用您的 skill ID 而不是 intent 名称。

```yaml
intent_script:
  amzn1.ask.skill.08888888-7777-6666-5555-444444444444:
    action:
      action: script.turn_on
      target:
        entity_id: script.red_alert
    speech:
      type: plain
      text: OK
```

### 支持 Session Ended Requests

有时您可能想响应由于缺少语音响应而发起的 session ended request。

首先，您需要获取 skill id：

- 登录 [Amazon 开发者控制台][amazon-dev-console]
- 点击控制台顶部的 Alexa 按钮
- 点击 Alexa Skills Kit Get Started 按钮
  - 找到您想要 Launch Request 支持的技能
  - 点击"View Skill ID"链接并复制 ID

配置与 intent 相同，只是您将使用您的 skill ID 而不是 intent 名称。

```yaml
intent_script:
  amzn1.ask.skill.08888888-7777-6666-5555-444444444444:
    speech:
      text: 已经很晚了。我要关灯吗？
    reprompt:
      text: 我要关灯吗？
  AMAZON.YesIntent:
    speech:
      text: 好的。晚安！
    action:
      action: switch.turn_off
      target:
        entity_id:
          - switch.room1
          - switch.room2
  AMAZON.NoIntent:
    speech:
      text: 好的
  amzn1.ask.skill.08888888-7777-6666-5555-444444444444.SessionEndedRequest:
    action:
      action: switch.turn_off
      target:
        entity_id:
          - switch.room1
          - switch.room2
```

## 给 Alexa 一些个性

在上面的示例中，我们告诉 Alexa 在成功完成任务后说 `OK`。这很有效但有点无聊！我们可以再次使用[模板]来增加一些趣味。

首先创建一个名为 `alexa_confirm.yaml` 的文件，内容如下（来吧，发挥创意！）：


```text
>
  {{ [
    "OK",
    "Sure",
    "If you insist",
    "Done",
    "No worries",
    "I can do that",
    "Leave it to me",
    "Consider it done",
    "As you wish",
    "By your command",
    "Affirmative",
    "Yes oh revered one",
    "I will",
    "As you decree, so shall it be",
    "No Problem"
  ] | random }}
```


然后，在任何您想用简单文本如 `OK` 作为响应的地方，将其替换为对该文件的引用：

```yaml
text: OK
```

变为：

```yaml
text: !include alexa_confirm.yaml
```

Alexa 现在每次都会随机选择一个短语回复。您可以将此 include 用于任意多个不同的 intents，因此您只需要创建一次列表。

## 无需说出技能名称的变通方法

有时，您想在不使用技能名称的情况下运行脚本或场景 intent。例如，'Alexa `<某个脚本>`' 而不是 'Alexa 请求 Home Assistant 运行 `<某个脚本>`'，因为这样更短。

您可以通过使用 Alexa 例程来实现。
1. 在 Alexa 应用中配置一个例程，响应您想使用的命令：
   -  例如，'Alexa，打开烘干机'。
2.  确保此例程包含一个自定义操作，其中包含您在技能中配置的完整短语：
     - 例如，'Alexa，请求 Home Assistant 运行 dryer on script'。

[amazon-dev-console]: https://developer.amazon.com
[large-icon]: /images/integrations/alexa/alexa-512x512.png
[small-icon]: /images/integrations/alexa/alexa-108x108.png
[templates]: /docs/configuration/templating/
[generate-long-lived-access-token]: https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token