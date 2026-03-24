---
title: Dialogflow
description: 关于如何将 Dialogflow 与 Home Assistant 集成的说明。
ha_category:
  - Voice
ha_release: 0.56
ha_config_flow: true
ha_iot_class: Cloud Push
ha_domain: dialogflow
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

**Dialogflow** 集成设计用于 [Dialogflow](https://cloud.google.com/dialogflow/docs/) 的 [webhook](https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook) 集成。在用户说出每个短语后，Dialogflow 会向 webhook 发送一个动作和参数。

为了能够从 Dialogflow 接收消息，您的 Home Assistant 实例需要可以从网络访问，并且您需要[配置](/home-assistant/integrations/homeassistant/#editing-the-general-settings-in-yaml)外部 URL。如果您的服务器没有响应或响应时间过长（超过 5 秒），Dialogflow 将返回后备答案。

Dialogflow 可以与许多流行的消息传递、虚拟助手和物联网平台[集成](https://cloud.google.com/dialogflow/es/docs/integrations)。

:::note
在 [2023 年 6 月 13 日对话操作停用](https://developers.google.com/assistant/ca-sunset) 后，Dialogflow 无法再与 Google Assistant 集成。

:::
使用 Dialogflow 可以轻松创建如下对话：

_用户：家里的温度是多少？_

_机器人：温度是 34 度_

_用户：打开灯_

_机器人：在哪个房间？_

_用户：厨房_

_机器人：正在打开厨房灯_

要使用此集成，您应该在 Dialogflow 中定义一个对话（意图），配置 Home Assistant 返回的语音，以及可选的要执行的动作。

### 配置您的 Dialogflow 账户

要获取 webhook URL，请转到配置屏幕中的集成页面并找到"Dialogflow"。点击"配置"。按照屏幕上的说明操作。

- 使用您的 Google 账户[登录](https://console.dialogflow.com/)。
- 点击"Create Agent"。
- 选择名称、语言（如果您计划使用 Google Actions，请查看其[支持的语言](https://support.google.com/assistant/answer/7108196)）和时区。
- 点击"Save"。
- 现在转到"Fulfillment"（在左侧菜单中）。
- 启用 Webhook 并将您的 Dialogflow webhook URL 设置为端点，例如 `https://myhome.duckdns.org/api/webhook/800b4cb4d27d078a8871656a90854a292651b20635685f8ea23ddb7a09e8b417`
- 点击"Save"。
- 创建一个新意图。
- 在"User says"下方输入您（用户）将对 Dialogflow 说的短语，例如 `What is the temperature at home?`。
- 在"Action"中输入动作名称。这应该与您的 Home Assistant 配置中的 IntentScript 名称匹配，例如在下面的示例中为"Temperature"。
- 在"Response"中输入"Cannot connect to Home Assistant or it is taking to long"（后备响应）。
- 在页面底部，展开"Fulfillment"并选中"Use webhook"。
- 点击"Save"。
- 在屏幕右上角显示"Try it now..."的地方，输入或说出您之前定义的短语，然后按回车键。
- Dialogflow 现在将向您的 Home Assistant 实例发送请求并显示响应。

:::note
V1 API 将于 2019 年 10 月 23 日弃用。如果您仍在使用 V1 API，建议更改 Dialogflow 中的设置以使用 V2 API。升级到 V2 API 后，无需更改您的意图 YAML 配置。通过点击[此处](https://console.dialogflow.com/)的齿轮按钮，然后选择 V2 API 来更改为 V2 API。

:::
查看左侧菜单中的"Integrations"以配置第三方。

### 配置 Home Assistant

激活后，[`alexa` 集成](/home-assistant/integrations/alexa/) 将让 Home Assistant 的本机意图支持处理传入的意图。如果您想基于意图运行动作，请使用 [`intent_script`](/home-assistant/integrations/intent_script) 集成。

## 示例

下载 [此 zip 文件](https://github.com/home-assistant/home-assistant.io/blob/current/source/assets/HomeAssistant_APIAI.zip) 并在您的 Dialogflow 代理中加载它（**Settings** > **Export and Import**），以获取与此配置一起使用的示例意图：


```yaml
# Example configuration.yaml entry
dialogflow:

intent_script:
  Temperature:
    speech:
      text: The temperature at home is {{ states('sensor.home_temp') }} degrees
  LocateIntent:
    speech:
      text: >
        {%- for state in states.device_tracker -%}
          {%- if state.name.lower() == User.lower() -%}
            {{ state.name }} is at {{ state.state }}
          {%- elif loop.last -%}
            I am sorry, I do not know where {{ User }} is.
          {%- endif -%}
        {%- else -%}
          Sorry, I don't have any trackers registered.
        {%- endfor -%}
  WhereAreWeIntent:
    speech:
      text: >
        {%- if is_state('device_tracker.adri', 'home') and
               is_state('device_tracker.bea', 'home') -%}
          You are both home, you silly
        {%- else -%}
          Bea is at {{ states("device_tracker.bea") }}
          and Adri is at {{ states("device_tracker.adri") }}
        {% endif %}
  TurnLights:
    speech:
      text: Turning {{ Room }} lights {{ OnOff }}
    actions:
      - action: notify.pushbullet
        data:
          message: Someone asked via apiai to turn {{ Room }} lights {{ OnOff }}
      - action: >
          {%- if OnOff == "on" -%}
            switch.turn_on
          {%- else -%}
            switch.turn_off
          {%- endif -%}
        target:
          entity_id: "switch.light_{{ Room | striptags | replace(' ', '_') }}"
```


