---
title: "Amazon Alexa 智能家居技能"
description: 'Amazon Alexa 提供了 Smart Home API，可实现更丰富的家庭自动化控制，而且无需用户说出技能名称，例如：。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Voice
ha_release: "0.54"
ha_codeowners:
  - '@home-assistant/cloud'
  - '@ochlocracy'
  - '@jbouwh'
ha_domain: alexa
---
# Amazon Alexa 智能家居技能

Amazon Alexa 提供了 Smart Home API，可实现更丰富的家庭自动化控制，而且无需用户说出技能名称，例如：

- _"Alexa, turn off the light."_
- _"Alexa, set the thermostat to cool."_
- _"Alexa, is the garage door open?"_

这项配置需要投入不少精力。您的 Home Assistant 实例必须可从互联网访问，而且您还需要创建 Amazon Developer 账户和 Amazon Web Services（AWS）账户。更简单的方案是使用 [Home Assistant Cloud](/home-assistant/integrations/cloud/)。

[Emulated Hue 集成][emulated-hue-integration]提供了更简单的替代方案，让您可以使用像 _"Alexa, turn on the kitchen light"_ 这样的语句。不过它存在一些限制，因为所有设备都会被视为灯泡。

:::note
使用 [Home Assistant Cloud](/home-assistant/cloud/)，您只需简单点击几下，就可以将 Home Assistant 实例连接到 Amazon Alexa。借助 Home Assistant Cloud，您无需处理动态 DNS、SSL 证书或在路由器上开放端口。只需通过用户界面登录，即可建立与云端的安全连接。Home Assistant Cloud 在 30 天免费试用后需要付费订阅。
<br/>
<br/>
Home Assistant Cloud 用户可在[这里](https://www.nabucasa.com/config/amazon_alexa/)查看相关文档。


:::
将 Amazon Alexa 智能家居技能与 Home Assistant 集成的步骤：

- [要求](#requirements)
- [创建 Amazon Alexa 智能家居技能](#create-an-amazon-alexa-smart-home-skill)
- [创建 AWS Lambda 函数](#create-an-aws-lambda-function)
  - [为 Lambda 创建 IAM 角色](#create-an-iam-role-for-lambda)
  - [向 Lambda 函数添加代码](#add-code-to-the-lambda-function)
  - [测试 Lambda 函数](#test-the-lambda-function)
- [配置智能家居服务端点](#configure-the-smart-home-service-endpoint)
- [账户关联](#account-linking)
- [Alexa 智能家居集成配置](#alexa-smart-home-integration-configuration)
- [支持的平台](#supported-platforms)
  - [报警控制面板](#alarm-control-panel)
    - [布防](#arming)
    - [撤防](#disarming)
  - [Alert、Automation、Group](#alert-automation-group)
  - [二值传感器](#binary-sensor)
    - [例程](#routines)
  - [Button、Input Button](#button-input-button)
    - [例程](#routines-1)
    - [使用 binary\_sensor 进行门铃播报](#doorbell-announcement-with-binary_sensor)
    - [使用二值传感器进行存在检测](#presence-detection-with-binary-sensor)
  - [摄像头](#camera)
  - [Climate](#climate)
    - [设置温控器温度](#set-thermostat-temperature)
    - [温控器模式](#thermostat-mode)
  - [Cover](#cover)
    - [打开/关闭/升起/降下](#opencloseraiselower)
    - [设置窗帘位置](#set-cover-position)
    - [设置窗帘倾斜角度](#set-cover-tilt)
    - [停止 Cover 操作](#stop-the-covers-operation)
    - [车库门](#garage-doors)
  - [事件实体](#event-entities)
    - [门铃事件](#doorbell-events)
  - [风扇](#fan)
    - [风扇速度](#fan-speed)
    - [风扇预设模式](#fan-preset-mode)
    - [风扇方向](#fan-direction)
    - [风扇摆动](#fan-oscillation)
  - [加湿器](#humidifier)
    - [加湿器目标湿度](#humidifier-target-humidity)
    - [加湿器模式](#humidifier-mode)
  - [图像处理](#image-processing)
    - [存在检测通知](#presence-detection-notification)
  - [Input Number 和 Number](#input-number-and-number)
  - [灯光](#light)
    - [亮度](#brightness)
    - [色温](#color-temperature)
    - [颜色](#color)
  - [门锁](#lock)
    - [解锁](#unlocking)
  - [媒体播放器](#media-player)
    - [切换频道](#change-channel)
    - [扬声器音量](#speaker-volume)
    - [均衡器模式](#equalizer-mode)
    - [输入源](#inputs)
    - [播放状态](#playback-state)
  - [Remote](#remote)
  - [场景](#scene)
  - [脚本](#script)
  - [传感器](#sensor)
  - [Switch、Input Boolean](#switch-input-boolean)
    - [例程](#routines-2)
  - [计时器](#timer)
  - [扫地机](#vacuum)
  - [阀门](#valve)
    - [打开/关闭](#openclose)
    - [设置阀门位置](#set-valve-position)
    - [停止阀门](#stop-the-valve)
  - [热水器](#water-heater)
    - [设置目标温度](#set-target-temperature)
    - [运行模式](#operation-mode)
- [故障排除](#troubleshooting)
- [调试](#debugging)

## 要求

- Alexa Smart Home API 要求您的 Home Assistant 实例能够通过使用 SSL/TLS 证书的 HTTPS 在 443 端口上从互联网访问。自签名证书不可用，但受信任的公共证书或由[Amazon 认可的证书颁发机构](https://ccadb-public.secure.force.com/mozilla/IncludedCACertificateReport)签发的证书通常可用。有关如何为 Home Assistant 设置加密，请参阅[我们的博客](/home-assistant/blog/2015/12/13/setup-encryption-using-lets-encrypt/)。在运行 Home Assistant 时，使用 [Duck DNS](/home-assistant/addons/duckdns/) 加载项是最简单的方法。
- 一个 Amazon Developer 账户。可在[这里](https://developer.amazon.com)注册。
- 需要一个 [Amazon Web Services (AWS)](https://aws.amazon.com/free/) 账户来托管 Alexa 智能家居技能所需的 Lambda 函数。[AWS Lambda](https://aws.amazon.com/lambda/pricing/) 每月可免费使用最多 100 万次请求和 1GB 出站数据传输。

## 创建 Amazon Alexa 智能家居技能

- 登录 [Alexa Developer Console][alexa-dev-console]，您可以在登录页面创建免费账户。请注意，这个账户*必须*与您在 Alexa 设备和 Alexa 应用中使用的 Amazon 账户相同。
- 如果当前不在 `Alexa Skills` 页面，请先进入该页面，然后选择 `Create Skill` 按钮开始创建。
- 输入您喜欢的 `Skill name`，然后选择技能的 `Default language`。
- 选择 `Smart Home` 和 `Provision your own`，然后点击右上角的 `Create skill` 按钮。

<p class='img'>
  <img src='/home-assistant/images/integrations/alexa/create_a_new_skill.png' alt='截图：创建智能家居技能'>
</p>

- 在下一个页面中，请确保 `Payload version` 选择的是 *v3*，并记下您的 `Skill ID`
- 现在，您已经创建好了一个 Smart Home 技能的基础骨架。下一步我们要做一些“真正的”开发工作。请保持 Alexa Developer Console 打开，稍后我们还需要修改技能配置。

## 创建 AWS Lambda 函数

我们将编写一小段托管在 AWS Lambda 函数中的代码，用于将 Alexa 智能家居技能的请求转发到您的 Home Assistant 实例，然后由 Home Assistant 中的 Alexa 集成处理请求并返回响应。随后，Lambda 函数会再将该响应返回给 Alexa 智能家居技能。

好了，开始吧。首先，您需要登录 [AWS console](https://console.aws.amazon.com/)。如果您还没有 AWS 账户，可以在[这里](https://aws.amazon.com/free/)创建一个新用户，并享受 12 个月免费套餐。即使您的账户已经超过前 12 个月，也不必太担心费用，因为 AWS 每个月都会为所有用户免费提供最多 100 万次 Lambda 请求、1GB 出站数据，以及所有入站数据。有关更多信息，请参阅 [Lambda 定价](https://aws.amazon.com/lambda/pricing/)。

### 为 Lambda 创建 IAM 角色

登录 [AWS console](https://console.aws.amazon.com/) 之后，您首先需要为 Lambda 执行创建一个 IAM 角色。AWS 的访问控制非常严格，因此您必须明确地定义并分配所需权限。

- 在顶部导航栏中选择 `Services`，展开菜单以显示所有 AWS 服务，然后在 `Security, Identity, & Compliance` 部分选择 `IAM`，进入 IAM 控制台。您也可以直接使用这个[链接](https://console.aws.amazon.com/iam/home)
- 在左侧面板选择 `Roles`，然后点击 `Create role`，在向导的第一页中选择 `AWS Service` -> `Lambda`，再点击 `Next: Permissions`
- 选择 `AWSLambdaBasicExecutionRole` 策略，然后点击 `Next: Tags`。（提示：您可以使用搜索框筛选策略）

<p class='img'>
  <img src='/home-assistant/images/integrations/alexa/create_iam_role_attach_permission.png' alt='截图：向 IAM 角色附加权限策略'>
</p>

- 为新角色命名，例如 `AWSLambdaBasicExecutionRole-SmartHome`，然后点击页面底部的 `Create role` 按钮。现在，您应该可以在角色列表中找到这个新角色。

### 向 Lambda 函数添加代码

接下来，您需要创建一个 Lambda 函数。

- 在顶部导航栏选择 `Services`，展开菜单显示所有 AWS 服务，然后在 `Compute` 部分选择 `Lambda`，进入 Lambda 控制台。您也可以使用这个[链接](https://console.aws.amazon.com/lambda/home)
**重要 - Alexa 技能仅支持特定 AWS 区域。** 当前服务器位置会显示在右上角（例如 Ohio）。请根据您的 Amazon 账户区域，而不是实际地理位置，从下面列表中选择可用服务器（[参考](https://developer.amazon.com/en-US/docs/alexa/smarthome/develop-smart-home-skills-in-multiple-languages.html#deploy)）。**如果 Alexa Lambda 函数创建在其他区域，将无法正常工作，甚至可能导致账户关联失败！例如，如果您的区域设置为 English (US)，而您住在加利福尼亚，您必须使用 US East (N.Virginia)，而不是 US West (Oregon)。即使使用错误区域也能完成设置流程，技能仍然无法工作，而且不会有明确错误信息告诉您原因。**
  - **US East (N.Virginia)** 区域适用于 English (US)、English (CA) 或 Portuguese (BR) 技能
  - **EU (Ireland)** 区域适用于 English (UK)、English (IN)、German (DE)、Spanish (ES) 或 French (FR) 技能
  - **US West (Oregon)** 区域适用于 Japanese 和 English (AU) 技能

- 在左侧导航栏中选择 `Functions`，显示您的 Lambda 函数列表。
- 选择 `Create function`，选中 `Author from scratch`，然后输入 `Function name`。
- 将 `Runtime` 设为 `Python 3.x`（选择当前可用的最新 Python 3 版本）。
- 可选：将 `Architecture` 设为 `arm64`（性能会略好一些）。
- 展开 `Change default execution role` 下拉框，并确保在 `Execution role` 中选择 *Use an existing role*，然后从 `Existing role` 列表中选中刚创建的角色。
- 选择 `Create function`，然后即可配置 Lambda 函数的详细信息。
- 展开 `Function overview`（如果尚未展开），然后在面板左侧选择 `+ Add trigger`，再从下拉列表中选择 `Alexa Smart Home`，将 Alexa 智能家居触发器添加到您的 Lambda 函数。
- 接着系统会要求您输入上一步创建技能时的 `Skill ID`。（提示：您可能需要切回 Alexa Developer Console 复制 `Skill ID`。）然后点击 `Add`。
- 向下滚动到 `Code source`，如果尚未打开，请打开 `lambda_function.py`。
- 清空示例代码，并复制以下 Python 脚本：[https://gist.github.com/matt2005/744b5ef548cc13d88d0569eea65f5e5b](https://gist.github.com/matt2005/744b5ef548cc13d88d0569eea65f5e5b)（已修改为支持 Alexa 的主动模式，详见下文）
- 点击 `Deploy` 按钮发布更新后的代码。
- 切换到 `Configuration` 选项卡，然后选择 `Environment variables`。您需要添加 1 个必填环境变量，以及按需添加 3 个可选变量。方法是选择 `Edit`，然后添加以下内容：
  - *(必填)* Key = BASE_URL，Value = 您的 Home Assistant 实例可从互联网访问的 URL。*不要包含末尾的 `/`*
  - *(可选)* Key = NOT_VERIFY_SSL，Value = *True*。如果您没有有效的 SSL 证书，或使用的是自签名证书，可以将其设为 *True* 以忽略 SSL 问题
  - *(可选)* Key = DEBUG，Value = *True*。将此变量设为 *True* 可记录调试日志，并允许使用 LONG_LIVED_ACCESS_TOKEN
  - *(可选，不推荐)* Key = LONG_LIVED_ACCESS_TOKEN，Value = 您的 Home Assistant 长期访问令牌。为避免使用长期访问令牌，您将在后续步骤中将 Alexa 智能家居技能与 Home Assistant 用户账户关联，因此这里其实不一定需要填写。不过，通过登录流程获取的访问令牌只有 30 分钟有效期，因此在测试数据中使用它来测试 Lambda 函数会比较麻烦。为了方便，您可以先从测试数据中移除 access token，并在此处填写一个[长期访问令牌][generate-long-lived-access-token]，这样函数就会回退为从环境变量中读取令牌。（提示：您并未为环境变量启用安全存储，因此保存在这里的令牌并不安全。请仅将它用于调试和测试，并在调试完成后移除并删除该长期访问令牌。）

<p class='img'>
  <img src='/home-assistant/images/integrations/alexa/lambda_function_env_var.png' alt='截图：Lambda 函数中的环境变量'>
</p>

- 现在点击右下角的 `Save` 按钮。
- 接下来，复制页面顶部显示的 ARN，它是这个 Lambda 函数的唯一标识。稍后继续配置 Alexa 智能家居技能时，您会用到这个 ARN。

### 测试 Lambda 函数

现在，您已经创建好了 Lambda 函数，但在测试之前，您还需要先完成 Home Assistant 中的必要配置。请将以下最小配置添加到您的 `configuration.yaml` 文件中。它会将所有受支持的设备和自动化暴露给 Alexa。强烈建议您查看[配置部分](#alexa-smart-home-integration-configuration)，以控制哪些设备和实体会暴露出去。

```yaml
alexa:
  smart_home:
```

重启 Home Assistant 后，返回 `AWS Lambda Console`，接下来您将进行一些测试。

- 切换到 `Test` 选项卡，然后选择 `Create new event`
- 为事件命名，例如 `Discovery`
- 在名为 `Event JSON` 的代码框中输入以下数据：

```json
{
  "directive": {
    "header": {
      "namespace": "Alexa.Discovery",
      "name": "Discover",
      "payloadVersion": "3",
      "messageId": "1bd5d003-31b9-476f-ad03-71d471922820"
    },
    "payload": {
      "scope": {
        "type": "BearerToken"
      }
    }
  }
}
```

- 点击右上角的 `Create`。

这个测试事件是一个 `Discovery` 指令，您的 Home Assistant 实例会返回一个 Alexa 可以交互的设备列表。由于这个测试数据在 `payload.scope` 中缺少 `token`，您的 Lambda 函数会从环境变量中读取 `LONG_LIVED_ACCESS_TOKEN`。

点击 `Test` 按钮。如果您没有设置 `LONG_LIVED_ACCESS_TOKEN`，或者没有启用 `DEBUG`，执行结果会返回 `INVALID_AUTHORIZATION_CREDENTIAL` 响应。

您可以登录 Home Assistant，并[生成一个长期访问令牌][generate-long-lived-access-token]。在将该令牌填入 `LONG_LIVED_ACCESS_TOKEN` 环境变量，并把 `DEBUG` 环境变量设为 `True` 后，请不要忘记先点击 `Save` 按钮，再重新执行 `Test`。

这一次，您将在响应中看到自己的设备列表。🎉

## 配置智能家居服务端点

现在，您可以移除长期访问令牌（如果您愿意），复制 Lambda 函数的 ARN，然后返回 [Alexa Developer Console][alexa-dev-console]。接下来您将完成 Smart Home 技能的配置。

- 返回 [Alexa Developer Console][alexa-dev-console]，如果当前不在 `Alexa Skills` 页面，请先进入该页面。
- 找到刚刚创建的技能，在 `Actions` 列点击 `Edit`。
- 在构建页面左侧导航栏中选择 `SMART HOME`。
- 在 `2. Smart Home service endpoint` 下，将 `Default endpoint` 填写为您从 Lambda 函数配置中复制的 `ARN`。

## 账户关联

Alexa 需要将您的 Amazon 账户与 Home Assistant 账户关联。这样，Home Assistant 才能确保只有经过身份验证的 Alexa 请求可以访问您家中的设备。要完成账户关联，您必须确保 Home Assistant 可从互联网访问。

- 返回 [Alexa Developer Console][alexa-dev-console]，如果当前不在 `Alexa Skills` 页面，请先进入该页面。
- 找到刚创建的技能，在 `Actions` 列点击 `Edit`。
- 在构建页面左侧导航栏中选择 `ACCOUNT LINKING`
- 不要启用 “Allow users to link their account to your skill from within your application or website” 开关。这样会要求提供 Redirect URI，而这在这里无法正常工作。
- 填写所有必需信息。假设您的 Home Assistant 可通过 `https://[YOUR HOME ASSISTANT URL][:PORT]` 访问，其中 `PORT` 为 TCP 端口。如果端口是 `443`，则可以省略。对于 Alexa 账户关联，默认使用标准 443 端口。如有需要，请通过防火墙转发该端口：
  - `Authorization URI`: `https://[YOUR HOME ASSISTANT URL][:PORT]/auth/authorize`
  - `Access Token URI`: `https://[YOUR HOME ASSISTANT URL][:PORT]/auth/token`

    虽然可以分配不同的端口，但更推荐使用 443 端口，因此请确保您的防火墙或代理通过 443 端口进行转发。

    有关账户关联要求的更多信息，请参阅 [Alexa 开发者文档](https://developer.amazon.com/en-US/docs/alexa/account-linking/requirements-account-linking.html)。

    :::note
尽管 Alexa 文档中有免责声明，但 [Let's Encrypt](https://letsencrypt.org/) 证书仍然可以使用。
    
:::
:::important
您必须使用有效且受信任的 SSL 证书，账户关联功能才能正常工作。
自签名证书不可用，但您可以使用免费的 Let's Encrypt 证书。

:::
- `Client ID`：
  - 如果您位于美国或巴西，请使用 `https://pitangui.amazon.com/`
  - 如果您位于欧洲，请使用 `https://layla.amazon.com/`
  - 如果您位于日本或澳大利亚，请使用 `https://alexa.amazon.co.jp/`（尚未验证）

    这里末尾的斜杠非常重要。

- `Client Secret`：可填写任意内容，Home Assistant 不会检查此字段
- `Your Authentication Scheme`：请确保选择 *Credentials in request body*。Home Assistant 不支持 *HTTP Basic*
- `Scope`：点击 `+ Add scope` 并输入 `smart_home`。Home Assistant 当前尚未使用该值，但未来在支持更细粒度访问控制时可能会用到
- `Domain List` 和 `Default Access Token Expiration Time` 可以留空

<p class='img'>
  <img src='/home-assistant/images/integrations/alexa/account_linking.png' alt='截图：账户关联'>
</p>

- 点击右上角的 `Save` 按钮。
- 接下来，您需要使用 Alexa 手机应用来关联账户。
  - 在 Alexa 应用中，依次进入 `More` -> `Skills & Games` -> `Your Skills` -> `Dev`
  - 点击您刚刚创建的 Smart Home 技能
  - 点击 `Enable to use`
  - 系统会打开一个新窗口，引导您进入 Home Assistant 的登录页面
  - 登录成功后，您会被重定向回 Alexa 应用
  - Alexa 现在应该会自动开始发现您的设备！通常物理设备上会显示蓝色光环作为提示
  - 如果没有，请直接让 Alexa 执行 `Discover Devices`
- 现在，您就可以通过 Echo 或 Alexa 应用对 Alexa 说 _"Alexa, turn on bedroom light"_ 了 🎉

## Alexa 智能家居集成配置

配置示例：

```yaml
alexa:
  smart_home:
    locale: en-US
    endpoint: https://api.amazonalexa.com/v3/events
    client_id: YOUR_SKILL_CLIENT_ID
    client_secret: YOUR_SKILL_CLIENT_SECRET
    filter:
      include_entities:
        - light.kitchen
        - light.kitchen_left
      include_entity_globs:
        - binary_sensor.*_motion
      include_domains:
        - switch
      exclude_entities:
        - switch.outside
    entity_config:
      light.kitchen:
        name: "Custom Name for Alexa"
        description: "厨房里的灯"
      switch.stairs:
        display_categories: LIGHT
```

```yaml
alexa:
  description: Alexa 配置
  required: true
  type: map
  keys:
    smart_home:
      description: Alexa 智能家居配置
      required: true
      type: map
      keys:
        locale:
          description: 您的 Alexa 设备的语言区域。支持的语言区域有 `de-DE`、`en-AU`、`en-CA`、`en-GB`、`en-IN`、`en-US`、`es-ES`、`es-MX`、`es-US`、`fr-CA`、`fr-FR`、`hi-IN`、`it-IT`、`ja-JP`、`nl-NL` 和 `pt-BR`。更多信息请参阅 [Alexa 语言区域](#alexa-locale)。
          required: false
          type: string
          default: en-US
        endpoint:
          description: >-
            要启用主动事件，您需要向 Alexa 事件网关发送消息，将其发送到与您的智能家居技能地理可用性相匹配的事件端点。以下是端点列表及其覆盖的区域。更多信息请参阅 [主动事件](#proactive-events)。
             - 北美：`https://api.amazonalexa.com/v3/events`
             - 欧洲：`https://api.eu.amazonalexa.com/v3/events`
             - 远东：`https://api.fe.amazonalexa.com/v3/events`
          required: false
          type: string
        client_id:
          description: 更多信息请参阅 [主动事件](#proactive-events)。
          required: false
          type: string
        client_secret:
          description: 更多信息请参阅 [主动事件](#proactive-events)。
          required: false
          type: string
        filter:
          description: 过滤 Alexa 的域和实体。（[配置过滤器](#configure-filter)）
          type: map
          keys:
            include_domains:
              description: 要包含的域列表（例如 `light`）。
              required: false
              type: list
            exclude_domains:
              description: 要排除的域列表（例如 `light`）。
              required: false
              type: list
            include_entity_globs:
              description: 包含所有匹配列出模式的实体（例如 `binary_sensor.*_motion`）。
              required: false
              type: list
            exclude_entity_globs:
              description: 排除所有匹配列出模式的实体（例如 `binary_sensor.*_motion`）。
              required: false
              type: list
            include_entities:
              description: 要包含的实体列表（例如 `light.attic`）。
              required: false
              type: list
            exclude_entities:
              description: 要排除的实体列表（例如 `light.attic`）。
              required: false
              type: list
        entity_config:
          description: 特定实体的配置。所有下级键是对应的实体 ID 或域，例如 `alarm_control_panel.woowoo`。
          required: false
          type: map
          keys:
            '`<ENTITY_ID>`':
              description: 特定实体的附加选项。
              required: false
              type: map
              keys:
                name:
                  description: 在 Amazon Alexa 应用程序中显示的实体名称。
                  required: false
                  type: string
                description:
                  description: 在 Amazon Alexa 应用程序中显示的实体描述。
                  required: false
                  type: string
                display_categories:
                  description: >-
                    在 Alexa 应用程序中显示每个实体的显示类别和图标。用逗号分隔每个类别。第一个类别是主要的。例如 `MUSIC_SYSTEM,STREAMING_DEVICE,SPEAKER`。可用类别列表请参阅 [Alexa 显示类别](#alexa-display-categories)。
                  required: false
                  type: string
```

<!-- omit in toc -->
### Alexa 区域设置

`locale` 应与您的 Amazon Echo 设备所使用的位置和语言相匹配。

支持的区域设置如下：

- `de-DE`
- `en-AU`
- `en-CA`
- `en-GB`
- `en-IN`
- `en-US`
- `es-ES`
- `es-MX`
- `es-US`
- `fr-CA`
- `fr-FR`
- `hi-IN`
- `it-IT`
- `ja-JP`
- `nl-NL`
- `pt-BR`

请参阅[功能接口和支持区域设置列表][alexa-supported-locales]。

<!-- omit in toc -->
### 主动事件

`endpoint`、`client_id` 和 `client_secret` 是可选项，只有在您想启用 Alexa 的主动模式（也就是启用 “Send Alexa Events”）时才需要配置。如果您要启用主动模式，请注意以下事项：

- 根据技能所属区域的不同，端点 URL 也会不同。请在 <https://developer.amazon.com/docs/smarthome/send-events.html#endpoints> 查看可用端点
- `client_id` 和 `client_secret` 不是通过 “Login with Amazon” 为技能配置的那一组（位于 [Alexa Developer Console][alexa-dev-console]：Build > Account Linking），而是来自 “Alexa Skill Messaging”（位于 Alexa Developer Console：Build > Permissions > Alexa Skill Messaging）。要获取它们，您需要启用 “Send Alexa Events” 权限
- 如果此前未启用 “Send Alexa Events” 权限，您需要在 Alexa 应用中取消关联并重新关联该技能，否则 Home Assistant 会显示以下错误：“Token invalid and no refresh token available.” 此外，每次在 Alexa 中禁用或重新启用技能后，您都需要重启 Home Assistant

<!-- omit in toc -->
### 配置过滤器

默认情况下，不会排除任何实体。若要限制哪些实体会暴露给 Alexa，您可以使用 `filter` 参数。请记住，只有[受支持的平台](#supported-platforms)中的实体才能被添加。

```yaml
# 示例过滤器：包含指定域并排除指定实体
alexa:
  smart_home:
    filter:
      include_domains:
        - alarm_control_panel
        - light
      include_entity_globs:
        - binary_sensor.*_occupancy
      exclude_entities:
        - light.kitchen_light
```

Filters are applied as follows:

1. No filter
    - All entities included
2. Only includes
    - Entity listed in entities include: include
    - Otherwise, entity matches domain include: include
    - Otherwise, entity matches glob include: include
    - Otherwise: exclude
3. Only excludes
    - Entity listed in exclude: exclude
    - Otherwise, entity matches domain exclude: exclude
    - Otherwise, entity matches glob exclude: exclude
    - Otherwise: include
4. Domain and/or glob includes (may also have excludes)
    - Entity listed in entities include: include
    - Otherwise, entity listed in entities exclude: exclude
    - Otherwise, entity matches glob include: include
    - Otherwise, entity matches glob exclude: exclude
    - Otherwise, entity matches domain include: include
    - Otherwise: exclude
5. Domain and/or glob excludes (no domain and/or glob includes)
    - Entity listed in entities include: include
    - Otherwise, entity listed in exclude: exclude
    - Otherwise, entity matches glob exclude: exclude
    - Otherwise, entity matches domain exclude: exclude
    - Otherwise: include
6. No Domain and/or glob includes or excludes
    - Entity listed in entities include: include
    - Otherwise: exclude

The following characters can be used in entity globs:

`*` - The asterisk represents zero, one, or multiple characters
`?` - The question mark represents zero or one character

如果您在设置集成时遇到问题，请参阅[故障排除](#troubleshooting)。

<!-- omit in toc -->
### Alexa 显示类别

您可以配置显示类别，以覆盖实体在 Alexa 应用中显示时使用的类别和图标。这会让设备更容易被查找和监控。

```yaml
light.kitchen_light:
  display_categories: LIGHT,SWITCH
```

:::note
像摄像头、车库门和报警控制面板这样的设备，需要特定的显示类别才能获得 Amazon Alexa 提供的全部功能。覆盖默认显示类别会限制 Amazon Alexa 可提供的功能。

:::
完整列表请参阅 [Alexa Display Categories][alexa-display-categories]

## 支持的平台

Home Assistant 可通过 Alexa 的 Smart Home Skill 支持以下集成。Home Assistant Cloud 用户可在[这里](https://www.nabucasa.com/config/amazon_alexa/)查看相关文档。

以下各段将介绍当前受支持平台所具备的功能。

### 报警控制面板

您可以对报警控制面板实体执行布防和撤防，也可以向 Alexa 查询其状态。

- _"Alexa, arm my home in away mode."_
- _"Alexa, arm my home."_
- _"Alexa, disarm my home."_
- _"Alexa, is my home armed?"_

#### 布防

报警控制面板必须先处于 `disarmed` 状态，才能执行布防。Alexa 不支持在已布防状态下直接切换到另一种布防状态，比如从 `armed_home` 切换到 `armed_night`，必须先撤防。

Alexa 不支持报警控制面板状态 `armed_custom_bypass`，它会被视为 `armed_home`。

:::note
Alexa 当前不支持通过语音 PIN 进行布防。因此，如果报警控制面板在布防时要求提供 `code`，或者 `code_arm_required` 属性为 `true`，则该实体在发现阶段不会被暴露给 Alexa。
即使平台实际上不支持或不要求此项，报警控制面板也可能默认将 `code_arm_required` 属性设为 `true`。您可以使用[实体自定义工具](/home-assistant/docs/configuration/customizing-devices/#customization-using-the-ui)将 `code_arm_required` 覆盖为 `false`，从而在发现阶段暴露该报警控制面板。

:::
#### 撤防

用户必须在 Alexa 应用中主动启用语音撤防功能。Alexa 在撤防时会要求输入 4 位语音个人识别码（PIN）。您可以在 Alexa 应用中配置一个 4 位 PIN，也可以使用报警控制面板中现有的 4 位 PIN。

<p class='img'>
<a href='/home-assistant/images/integrations/alexa/alexa_app_security_system_pin.png' target='_blank'>
  <img height='460' src='/home-assistant/images/integrations/alexa/alexa_app_security_system_pin.png' alt='截图：Alexa 应用中的安防系统 PIN'/></a>
</p>

如果要使用报警控制面板中已有的代码，则 `code` 必须是 4 位数字，且 `code_format` 属性必须为 `number`。在发现完成后，Alexa 应用会提供选项，让您使用现有 `code`，或额外创建一个用于 Alexa 的 4 位 PIN。

现有代码不会从 Home Assistant 传递给 Alexa。在撤防过程中，Alexa 会要求输入 PIN。用户对 Alexa 说出的 PIN 会被转发到 Home Assistant，并传递给 `alarm_control_panel.alarm_disarm` 动作。如果 `alarm_control_panel.alarm_disarm` 动作因任何原因失败，系统会认为 PIN 不正确，并向 Alexa 报告为无效 PIN。

### Alert、Automation、Group

Alert、Automation 和 Group 实体会被当作开关来打开和关闭。

- _"Alexa, turn on the front door alert."_
- _"Alexa, turn off energy saving automations."_
- _"Alexa, Downstairs to on."_

### 二值传感器

需要启用[主动事件](#proactive-events)。

支持带有以下 [`device_class`](/home-assistant/integrations/binary_sensor/#device-class) 属性的二值传感器：`door`、`garage_door`、`opening`、`window`、`motion`、`presence`。

| `device_class` | Alexa Sensor Type |
| :------------: | :---------------: |
|     `door`     |      Contact      |
| `garage_door`  |      Contact      |
|   `opening`    |      Contact      |
|    `window`    |      Contact      |
|    `motion`    |      Motion       |
|   `presence`   |      Motion       |

您可以向 Alexa 询问接触类传感器的状态。

- _"Alexa, is the bedroom window open?"_

#### 例程

需要启用[主动事件](#proactive-events)。

当二值传感器以接触传感器或运动传感器的形式暴露给 Alexa 时，可用于触发 Alexa 例程。

您可以使用[实体自定义工具](/home-assistant/docs/configuration/customizing-devices/#customization-using-the-ui)覆盖 `device_class` 属性，以便将某个 `binary_sensor` 暴露给 Alexa。

### Button、Input Button

您可以使用按钮名称，或通过 _"turn on"_ 语句来触发 Button 和 Input Button。它们会在 Alexa 应用中显示为场景。

- _"Alexa, Ring Phone."_
- _"Alexa, turn on Ring Phone."_

#### 例程

需要启用[主动事件](#proactive-events)。

当 Button 和 Input Button 被按下时，可以触发 Alexa 例程。

为了实现这一点，这些按钮会表现为具有“presence detection”能力。由于 Alexa 本身不支持按钮类型设备，这是启用此功能所采用的方式。若要在按钮按下时触发例程，请在触发条件菜单中选择该按钮，然后选择 “Person” 能力。

<p class='img'>
<a href='/home-assistant/images/integrations/alexa/alexa_app_button_trigger.png' target='_blank'>
  <img height='460' src='/home-assistant/images/integrations/alexa/alexa_app_button_trigger.png' alt='截图：Alexa 应用中的按钮例程触发器'/></a>
</p>

#### 使用 binary_sensor 进行门铃播报

需要启用[主动事件](#proactive-events)。

请注意，Home Assistant 原生支持通过 `device_class` 为 `doorbell` 的 `event` 实体来表示门铃。

在 [`entity_config`](#entity_config) 中为某个 `binary_sensor` 配置 `display_category: DOORBELL`，即可在 Alexa 应用中使用门铃通知设置。请注意，Home Assistant 也可以原生通过 `event` 实体支持此功能。

```yaml
alexa:
  smart_home:
    entity_config:
      binary_sensor.alexa_doorbell:
        name: "Front Door"
        description: "Doorbell Binary Sensor"
        display_categories: DOORBELL
```

当某个 `binary_sensor` 的状态从 `off` 变为 `on` 时，Alexa 会在所有 Echo 设备上播报 _"Someone is at the [entity name]"_。

另请参阅[事件实体](#event-entities)。

#### 使用二值传感器进行存在检测

需要启用[主动事件](#proactive-events)。

若某个 `binary_sensor` 的 `device_class` 属性为 `motion` 或 `presence`，则可在 [`entity_config`](#entity_config) 中将其 `display_category` 配置为 `CAMERA`，以便在 Alexa 应用中启用存在检测通知设置。

```yaml
alexa:
  smart_home:
    entity_config:
      binary_sensor.driveway_presence:
        name: "Driveway"
        description: "Driveway Presence Sensor"
        display_categories: CAMERA
```

Alexa 会在所有 Echo 设备上播报 _"Person detected at [entity name]"_。

:::important
每台 Echo 设备都需要启用 communication 和 Announcements 设置，并关闭 Do Not Disturb 功能。

:::
<p class='img'>
   <a href='/home-assistant/images/integrations/alexa/alexa_app_person_detection.png' target='_blank'>
    <img height='460' src='/home-assistant/images/integrations/alexa/alexa_app_person_detection.png' alt='截图：Alexa 应用中的人员检测通知'/></a>
 </p>

[图像处理](#image-processing)实体也支持此通知。

### 摄像头

可在 Amazon Echo 设备上查看摄像头视频流。

- _"Alexa, show the front door camera."_

要将摄像头视频流发送到 Amazon Echo 设备，需要使用 [`stream`](/home-assistant/integrations/stream/) 集成。

Amazon Echo 设备会向 Home Assistant 请求摄像头视频流。Home Assistant 的 URL 必须能从 Echo 设备所在的网络访问，并且必须支持 443 端口上的 HTTPS，且使用由[Amazon 认可的证书颁发机构](https://ccadb-public.secure.force.com/mozilla/IncludedCACertificateReport)签发的证书。这些要求可以通过 Home Assistant Cloud 或 LetsEncrypt/DuckDNS 满足。

请为与 Echo 设备配合使用的摄像头启用预加载视频流选项，以减少响应时间，并避免在 6 秒限制内超时。

### Climate

支持单设定点、双设定点和三设定点温控器。温控器中的温度值也会作为单独的[温度传感器](#sensor)暴露出来。

#### 设置温控器温度

- _"Alexa, set thermostat to 20."_
- _"Alexa, set the AC to 75."_
- _"Alexa, make it warmer in here."_
- _"Alexa, make it cooler in here."_

#### 温控器模式

- _"Alexa, set living room thermostat to automatic."_

- `DRY` 会在 Alexa 应用中显示为 `DEHUMIDIFY`
- `ECO` 在 Home Assistant 中作为 `preset` 处理，因此不会显示在 Alexa 应用中
- `FAN_ONLY` 不受 Alexa 语音模型支持，因此会在 Alexa 应用中显示为 `OFF`

要更改温控器模式，必须使用精确的说法：

- _"Alexa, set [entity name] to [mode utterance]."_

如果 climate 实体支持开/关功能，则可以将实体名称或模式名称与 _"turn on"_ 和 _"turn off"_ 语句搭配使用。

- _"Alexa, turn on the [mode utterance]."_
- _"Alexa, turn off the [entity name]."_

Alexa 支持以下 climate 温控器模式说法：

| HA Climate Mode | Alexa Mode Utterances   |
| --------------- | ----------------------- |
| `AUTO`          | _"auto"_, _"automatic"_ |
| `COOL`          | _"cool"_, _"cooling"_   |
| `HEAT`          | _"heat"_, _"heating"_   |
| `ECO`           | _"eco"_, _"economical"_ |
| `DRY`           | _"dry"_, _"dehumidify"_ |
| `OFF`           | _"off"_                 |

### Cover

Covers 应配置合适的 `device_class`。

`device_class` 为 `blind`、`shade`、`curtain` 的 Cover 会在 Alexa 应用中显示为室内百叶帘，而 `window`、`awning` 或 `shutter` 则会显示为室外百叶帘。

`device_class` 为 `garage` 的 Cover 会显示为[车库门](#garage-doors)，并支持语音 PIN 开门功能。

您可以使用[实体自定义工具](/home-assistant/docs/configuration/customizing-devices/#customization-using-the-ui)覆盖 `device_class` 属性，以便将 `cover` 正确暴露给 Alexa。

#### 打开/关闭/升起/降下

Home Assistant 会为 cover 配置语义，从而支持 _"raise"_、_"lower"_、_"open"_、_"close"_ 等说法。除此之外，_"turn on"_ / _"turn off"_ 也同样可用。

- _"Alexa, open the garage door."_
- _"Alexa, close the curtain."_
- _"Alexa, lower the shades."_
- _"Alexa, raise the roof!"_

语义会根据 cover 支持的功能自动分配。如果 cover 支持倾斜功能，则 _"open"_ 和 _"close"_ 会分配给倾斜功能，而 _"raise"_ 和 _"lower"_ 则分配给位置功能。

如果 cover 不支持倾斜，则 _"raise"_、_"lower"_、_"open"_、_"close"_ 这些语义都会分配给位置功能。

#### 设置窗帘位置

支持设置位置的 Cover 可以通过百分比进行控制。

- _"Alexa, set the [entity name] position to thirty percent."_
- _"Alexa, increase [entity name] position by ten percent."_
- _"Alexa, decrease [entity name] position by twenty percent."_

| Locale  | Friendly Name Synonyms    |
| ------- | ------------------------- |
| `en-US` | _"position"_, _"opening"_ |

目前，Alexa 仅在 `en-US` 区域设置下支持这些友好名称同义词。

#### 设置窗帘倾斜角度

支持倾斜位置控制的 Cover 可以通过百分比进行控制。

- _"Alexa, set the [entity name] tilt to thirty percent."_
- _"Alexa, increase [entity name] tilt by ten percent."_
- _"Alexa, decrease [entity name] tilt by twenty percent."_

| Locale  | Friendly Name Synonyms             |
| ------- | ---------------------------------- |
| `en-US` | _"tilt"_, _"angle"_, _"direction"_ |

目前，Alexa 仅在 `en-US` 区域设置下支持这些友好名称同义词。

#### 停止 Cover 操作

若要停止 Cover 的操作，请说：

- _"Alexa, stop [entity name]."_

如果您的 cover 支持 `STOP` 功能，这将停止 cover 的位置操作。
如果您的 cover 支持 `STOP_TILT` 功能，这将停止 cover 的倾斜操作。
如果两项功能都支持，则两者都会被停止。

#### 车库门

`device_class` 为 `garage` 的 Cover 支持 Alexa 应用中的语音 PIN 开门功能。您可以在 Alexa 应用中配置一个 4 位 PIN 码来打开车库门。

<p class='img'>
<a href='/home-assistant/images/integrations/alexa/alexa_app_garage_door_pin.png' target='_blank'>
  <img height='460' src='/home-assistant/images/integrations/alexa/alexa_app_garage_door_pin.png' alt='截图：Alexa 应用中的车库门语音开启功能'/></a>
</p>

### 事件实体

需要启用[主动事件](#proactive-events)。

#### 门铃事件

如果 Home Assistant 中某个 `event` 实体的 `device_class` 设为 `doorbell`，它就可以在 Alexa 中触发门铃播报。
当 `event` 实体收到更新时，Alexa 会在所有 Echo 设备上播报 _"Someone is at the [entity name]"_。

:::note
每台 Amazon Echo 设备都需要启用 communication 和 announcements 设置，并关闭 Do Not Disturb 功能。

:::
<p class='img'>
<a href='/home-assistant/images/integrations/alexa/alexa_app_doorbell_announcement.png' target='_blank'>
  <img height='460' src='/home-assistant/images/integrations/alexa/alexa_app_doorbell_announcement.png' alt='截图：Alexa 应用中的门铃通知'/></a>
</p>

### 风扇

可控制风扇速度、方向和摆动。

#### 风扇速度

风扇设备必须通过 `percentage` 属性支持基于百分比的速度控制。

- _"Alexa, set the fan speed to three."_
- _"Alexa, set the fan speed to fifty percent."_
- _"Alexa, set the fan power level to fifty percent."_
- _"Alexa, turn up the speed on the tower fan."_
- _"Alexa, set the air speed on the tower fan to maximum."_

#### 风扇预设模式

风扇设备必须支持 `preset_mode` 属性。

- _"Alexa, set the fan preset to eco."_
- _"Alexa, set the fan preset to smart."_
- _"Alexa, set the fan preset to auto."_

目前，Alexa 仅在 `en-US` 区域设置下支持预设模式。

#### 风扇方向

风扇设备必须支持 `direction` 属性。

- _"Alexa, set the fan direction to forward."_
- _"Alexa, set the fan direction to reverse."_

#### 风扇摆动

风扇设备必须支持 `oscillating` 属性。

- _"Alexa, is oscillate on for the tower fan?"_
- _"Alexa, turn on swivel for the tower fan."_
- _"Alexa, turn on oscillation mode for the table fan."_

| Locale  | Friendly Name Synonyms                                                   |
| ------- | ------------------------------------------------------------------------ |
| `en-US` | _"oscillate"_, _"swivel"_, _"oscillation"_, _"spin"_, _"back and forth"_ |

目前，Alexa 仅在 `en-US` 区域设置下支持这些友好名称同义词。

### 加湿器

可控制电源、目标湿度和模式。

#### 加湿器目标湿度

- _"Alexa, set the [entity name] humidity to fifty percent."_

#### 加湿器模式

加湿器设备必须支持 `mode` 属性。

- _"Alexa, set the [entity name] mode to eco."_

### 图像处理

需要启用[主动事件](#proactive-events)。

#### 存在检测通知

所有 `image_processing` 实体都支持 Alexa 应用中的存在检测通知设置。任意状态变化都会触发通知。

Alexa 会在所有 Echo 设备上播报 _"Person detected at [entity name]"_。

 <p class='img'>
   <a href='/home-assistant/images/integrations/alexa/alexa_app_person_detection.png' target='_blank'>
    <img height='460' src='/home-assistant/images/integrations/alexa/alexa_app_person_detection.png' alt='截图：Alexa 应用中的人员检测通知'/></a>
 </p>

:::note
显示类别默认会设为 `CAMERA`，以在 Alexa 应用中启用存在检测通知设置。每台 Echo 设备都需要启用 communication 和 Announcements 设置，并关闭 Do Not Disturb 功能。

:::
### Input Number 和 Number

您可以使用 Alexa 控制 `input_number` 或 `number` 实体。系统会将该实体的 `min`、`max`、`step` 和 `unit_of_measurement` 属性同步给 Alexa。

- _"Alexa, set [entity name] to forty five [unit of measurement]."_
- _"Alexa, increase the [entity name] by two."_
- _"Alexa, set the [entity name] to maximum."_

下表列出了一个 `min: -90`、`max: 90`、`step: 45`、`unit_of_measurement: degrees` 的 Input Number 或 Number 可用的友好名称同义词。

| Fan Range | Friendly Name Synonyms                    |
| --------- | ----------------------------------------- |
| -90       | _"negative ninety"_, _"minimum"_, _"min"_ |
| -45       | _"negative forty five"_                   |
| 0         | _"zero"_                                  |
| 45        | _"forty five"_                            |
| 90        | _"ninety"_, _"maximum"_, _"max"_          |

`unit_of_measurement` 将用于从 [Global Alexa catalog](https://developer.amazon.com/en-US/docs/alexa/device-apis/resources-and-assets.html#global-alexa-catalog) 中选择一个受支持的单位标签。如果没有匹配项，则会分配为预设控制器。

支持的单位包括：°C、°F、K、m、km、mi、yd、in、kg、g、oz、lb、L、ft³、m³、gal 和 %

### 灯光

可通过 _"turn on"_ 和 _"turn off"_ 语句控制灯光，并调整亮度、颜色和色温。

- _"Alexa, turn on the bathroom light."_
- _"Alexa, turn off the patio light."_

#### 亮度

支持亮度控制的灯光可以通过 0 到 100 的百分比进行调整。

- _"Alexa, set the bedroom light to fifty percent."_
- _"Alexa, living room lights to one hundred percent."_

_"dim"_ 语句会让灯光亮度降低 25 个百分点。

- _"Alexa, dim the bathroom light."_

#### 色温

支持色温的灯光可以使用以下友好名称来调整：

- _"Alexa, set the dining room softer."_
- _"Alexa, make the living room warmer."_
- _"Alexa, set the dining room cooler."_
- _"Alexa, make the living room light whiter."_
- _"Alexa, make the living room warm white."_
- _"Alexa, set the kitchen to daylight."_

下表列出了支持色温控制的灯光可用的友好名称同义词。

| Color Temperature in Kelvin | Friendly Name Synonyms           |
| --------------------------- | -------------------------------- |
| 2200                        | _"warm"_, _"warm white"_         |
| 2700                        | _"incandescent"_, _"soft white"_ |
| 4000                        | _"white"_                        |
| 5500                        | _"daylight"_, _"daylight white"_ |
| 7000                        | _"cool"_, _"cool white"_         |

可使用 _"warmer"_、_"softer"_、_"cooler"_、_"whiter"_ 等语句，以 50 `mired` 为步进调整色温（大约相当于 300 到 500 开尔文的变化）。

- _"Alexa, set the dining room softer."_
- _"Alexa, make the living room warmer."_
- _"Alexa, set the dining room cooler."_
- _"Alexa, make the living room light whiter."_

#### 颜色

您可以使用 CSS [基础颜色关键字](https://drafts.csswg.org/css-color-3/#html4)或[扩展颜色关键字](https://drafts.csswg.org/css-color-3/#svg-color)作为友好颜色名称来设置灯光颜色。

- _"Alexa, set the front porch light to blue."_
- _"Alexa, set the bedroom light to red."_
- _"Alexa, change the kitchen to the color crimson."_

### 门锁

- _"Alexa, lock my front door."_
- _"Alexa, unlock the dungeon."_

#### 解锁

要进行解锁，Alexa 会要求输入一个 4 位语音个人识别码（PIN）。请在 Alexa 应用中配置一个 4 位 PIN 来解锁门锁。

### 媒体播放器

#### 切换频道

- _"Alexa, change the channel to 200 on the Living Room TV."_
- _"Alexa, change the channel to PBS on the TV."_
- _"Alexa, next channel on the Living Room TV."_
- _"Alexa, channel up on the TV."_
- _"Alexa, channel down on the TV."_

#### 扬声器音量

- _"Alexa, set the volume of the speakers to 50."_
- _"Alexa, turn the volume down on the stereo by 20."_
- _"Alexa, turn the volume down on Living Room TV."_
- _"Alexa, mute speakers."_
- _"Alexa, unmute speakers."_
- _"Alexa, lower the volume on the stereo."_
- _"Alexa, volume up 20 on the speakers."_

#### 均衡器模式

支持从预设的 `sound_mode_list` 中切换媒体播放器的 `sound_mode`。

- _"Alexa, set mode to movie on the TV."_

Alexa 仅支持以下模式：`movie`、`music`、`night`、`sport`、`tv`。

#### 输入源

支持从预设的 `source_list` 中切换媒体播放器的 `source`。

- _"Alexa, change the input to DVD on the Living Room TV."_

Home Assistant 会尝试将 `media_player` 的 `source_list` 转换为 Alexa 可识别的有效 `source` 名称。Alexa 仅支持以下输入源名称：

`AUX 1`, `AUX 2`, `AUX 3`, `AUX 4`, `AUX 5`, `AUX 6`, `AUX 7`, `BLURAY`, `CABLE`, `CD`, `COAX 1`, `COAX 2`, `COMPOSITE 1`, `DVD`, `GAME`, `HD RADIO`, `HDMI 1`, `HDMI 2`, `HDMI 3`, `HDMI 4`, `HDMI 5`, `HDMI 6`, `HDMI 7`, `HDMI 8`, `HDMI 9`, `HDMI 10`, `HDMI ARC`, `INPUT 1`, `INPUT 2`, `INPUT 3`, `INPUT 4`, `INPUT 5`, `INPUT 6`, `INPUT 7`, `INPUT 8`, `INPUT 9`, `INPUT 10`, `IPOD`, `LINE 1`, `LINE 2`, `LINE 3`, `LINE 4`, `LINE 5`, `LINE 6`, `LINE 7`, `MEDIA PLAYER`, `OPTICAL 1`, `OPTICAL 2`, `PHONO`, `PLAYSTATION`, `PLAYSTATION 3`, `PLAYSTATION 4`, `SATELLITE`, `SMARTCAST`, `TUNER`, `TV`, `USB DAC`, `VIDEO 1`, `VIDEO 2`, `VIDEO 3`, `XBOX`

#### 播放状态

需要启用[主动事件](#proactive-events)。

:::note
当前还不支持前进（skip）或后退（go back）这类意图。

:::
### Remote

支持从给定的 `activity_list` 中切换 Remote 的 `activity`。

- _"Alexa, change the TV to PlayStation."_
- _"Alexa, change the input on the TV to PlayStation."_

:::note
Alexa 不允许以下词语用作 activity 名称：

`alarm`, `alarms`, `all alarms`, `away mode`, `bass`, `camera`, `date`, `date today`, `day`, `do not disturb`, `drop in`, `music`, `night light`, `notification`, `playing`, `sleep sounds`, `time`, `timer`, `today in music`, `treble`, `volume`, `way f. m.`

:::
### 场景

您可以通过场景名称，或使用 _"turn on"_ 语句来激活场景。Home Assistant 目前不支持对场景执行停用或 _"turn off"_。

- _"Alexa, Party Time."_
- _"Alexa, turn on Party Time."_

### 脚本

您可以通过脚本名称，或使用 _"turn on"_ 语句来运行脚本。正在运行的脚本可通过 _"turn off"_ 语句停止。

- _"Alexa, Party Time."_
- _"Alexa, turn on Party Time."_
- _"Alexa, turn off Party Time."_

### 传感器

需要启用[主动事件](#proactive-events)。

目前仅支持温度传感器。

- _"Alexa, what's the temperature in the kitchen?"_
- _"Alexa, what's the upstairs temperature?"_

### Switch、Input Boolean

支持 _"turn on"_ 和 _"turn off"_ 语句。

- _"Alexa, turn on the vacuum."_
- _"Alexa, turn off the lights."_

#### 例程

需要启用[主动事件](#proactive-events)。

当 Switch 和 Input Boolean 状态发生变化时，可以触发 Alexa 例程。

为了实现这一点，Switch 和 Input Boolean 会在 Alexa 例程的触发条件菜单中显示为接触传感器。这是因为 Alexa 不支持通过开关类型设备触发例程，只支持通过接触传感器和运动传感器触发。在该菜单中，选择某个开关后，`Open` 对应 `on`，`Close` 对应 `off`。

<p class='img'>
<a href='/home-assistant/images/integrations/alexa/alexa_app_switch_trigger.png' target='_blank'>
  <img height='460' src='/home-assistant/images/integrations/alexa/alexa_app_switch_trigger.png' alt='截图：Alexa 应用中的开关例程触发器'/></a>
</p>

### 计时器

您可以使用 _"turn on"_ 语句来启动计时器。

- _"Alexa, turn on the laundry."_

您可以使用 _"turn off"_ 语句来取消计时器。

- _"Alexa, turn off the laundry."_

您还可以暂停和重启 Home Assistant 中的 Timer 实体。

- _"Alexa, pause the microwave."_
- _"Alexa, hold the sous vide."_
- _"Alexa, restart the microwave."_

:::important
为了避免与 Alexa 内置的计时器功能发生冲突，Timer 实体的友好名称中不应包含单词 "timer"。

:::
### 扫地机

支持 _"turn on"_ 和 _"turn off"_ 语句，也支持暂停和继续。

- _"Alexa, turn on the vacuum."_
- _"Alexa, pause the vacuum."_
- _"Alexa, restart the vacuum."_

### 阀门

Alexa 原生不支持阀门。因此，在 Alexa 中它们会显示为未知类型的设备。

#### 打开/关闭

Home Assistant 会为阀门配置语义，以支持 _"open"_ 和 _"close"_ 语句。

- _"Alexa, open the water valve."_
- _"Alexa, close the gas valve."_

#### 设置阀门位置

支持设定位置的阀门可以通过百分比进行控制。

- _"Alexa, set the [entity name] position to thirty percent."_
- _"Alexa, increase [entity name] position by ten percent."_
- _"Alexa, decrease [entity name] position by twenty percent."_

| Locale  | Friendly Name Synonyms    |
| ------- | ------------------------- |
| `en-US` | _"position"_, _"opening"_ |

目前，Alexa 仅在 `en-US` 区域设置下支持这些友好名称同义词。

#### 停止阀门

支持 `stop` 的阀门会额外提供一个切换控制，用于停止阀门的打开或关闭操作。

### 热水器

支持单设定点、双设定点和三设定点温控器。热水器的温度值也会作为单独的[温度传感器](#sensor)暴露出来。

#### 设置目标温度

- _"Alexa, set the boiler's target temperature to 50."_

您可以向 Alexa 询问当前温度和当前目标温度。

- _"Alexa, what is the boiler's target temperature?"_
- _"Alexa, what is the boiler's current temperature?"_

#### 运行模式

运行模式可以从 UI 中设置。所有 Home Assistant 运行模式都可以设置（仅支持英文）。

- _"Alexa, set main boiler to eco."_

要更改热水器的模式，必须使用精确的说法：

- _"Alexa, set [entity name] to [mode utterance]."_

如果热水器实体支持开/关功能，则可以将实体名称或模式名称与 _"turn on"_ 和 _"turn off"_ 语句搭配使用。

- _"Alexa, turn on the [mode utterance]."_
- _"Alexa, turn off the [entity name]."_

## 故障排除

<!-- omit in toc -->
### 例程触发器中找不到 Binary Sensor

支持带有以下 [`device_class`](/home-assistant/integrations/binary_sensor/#device-class) 属性的二值传感器：`door`、`garage_door`、`opening`、`window`、`motion`、`presence`。

您可以使用[实体自定义工具](/home-assistant/docs/configuration/customizing-devices/#customization-using-the-ui)覆盖 `device_class` 属性，以便将某个 `binary_sensor` 暴露给 Alexa。

<!-- omit in toc -->
### Token Invalid and no Refresh Token Available

请在 Alexa 应用中禁用并重新启用该技能，然后重启 Home Assistant。

## 调试

当日志级别设为 `debug` 时，Alexa 集成会记录更多关于状态更新和其他消息的信息。请将以下相关内容添加到 `configuration.yaml`：

如果您是通过 Alexa 智能家居技能和 Lambda 函数（如 haaska）使用 Alexa：

```yaml
logger:
  default: info
  logs:
    homeassistant.components.alexa: debug
```

如果您使用的是 Home Assistant Cloud，还需要同时调试 `hass_nabucasa.iot`：

```yaml
logger:
  default: info
  logs:
    homeassistant.components.alexa: debug
    hass_nabucasa.iot: debug
```

[alexa-dev-console]: https://developer.amazon.com/alexa/console/ask
[emulated-hue-integration]: /integrations/emulated_hue/
[generate-long-lived-access-token]: https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token
[alexa-display-categories]: https://developer.amazon.com/docs/alexa/device-apis/alexa-discovery.html#display-categories
[alexa-supported-locales]: https://developer.amazon.com/docs/alexa/device-apis/list-of-interfaces.html
