---
title: "Amazon Alexa 快报"
description: "关于如何使用 Home Assistant 创建 Flash Briefing 技能的说明。"
ha_category:
  - Voice
ha_release: "0.31"
ha_domain: alexa
---

## 快报技能

从 [0.31][zero-three-one] 版本开始，Home Assistant 支持新的 [Alexa Flash Briefing Skills API][flash-briefing-api]。快报技能会添加一个由 Home Assistant 生成的全新 Flash Briefing 来源。

### 要求

Amazon 要求技能的端点必须通过 SSL 托管。由于我们的技能只会在开发模式下运行，因此可以使用自签名证书。有关如何为 Home Assistant 配置加密，请参阅[我们的博客][blog-lets-encrypt]。使用 [Let's Encrypt](/home-assistant/addons/lets_encrypt/) 和 [Duck DNS](/home-assistant/addons/duckdns/) 加载项是最简单的方法。如果您无法成功启用 HTTPS，可以考虑使用[这个适用于 Alexa 技能的 AWS Lambda 代理](https://community.home-assistant.io/t/5230)。

此外，在撰写本文时，您的 Alexa 技能端点*必须*通过 443 端口接收请求（Home Assistant 默认端口为 8123）。您可以通过以下两种方式处理：

  1. 在路由器中，将外部 443 端口转发到 Home Assistant 的服务端口（默认为 8123）
  或者
  2. 将 Home Assistant 的服务端口改为 443。这可以通过在 `configuration.yaml` 文件的 [`http`](/home-assistant/integrations/http/) 部分设置 `server_port` 实现

[blog-lets-encrypt]: /blog/2015/12/13/setup-encryption-using-lets-encrypt/

### 在 Home Assistant 中配置快报技能

您可以对 `title`、`audio`、`text` 和 `display_url` 配置参数使用[模板][templates]。

以下是一个快报技能配置示例，它会告诉您谁在家：


```yaml
# 示例 configuration.yaml 条目
alexa:
  flash_briefings:
    password: YOUR_PASSWORD
    whoishome:
      - title: Who's at home?
        text: >
          {%- if is_state('device_tracker.paulus', 'home') and
                 is_state('device_tracker.anne_therese', 'home') -%}
            你们俩都在家，真逗
          {%- else -%}
            Anne Therese 在 {{ states("device_tracker.anne_therese") }}
            Paulus 在 {{ states("device_tracker.paulus") }}
          {% endif %}
```


如果需要，您可以为一个源添加多个条目。Amazon 要求的 UID 和时间戳会在启动时随机生成，并在每次 Home Assistant 重启时变化。

有关允许使用的配置参数和格式的更多信息，请参阅 [Amazon 文档][flash-briefing-api-docs]。

### 配置您的快报技能


1. 登录 [Amazon developer console][amazon-dev-console]
2. 选择 **Create Alexa Skills**
3. 选择右上角蓝色的 **Console** 按钮
4. 选择右上角浅蓝色的 **Create Skill** 按钮
5. 在 **Skill Information** 中：
   - 输入任意技能名称
   - 在 **Choose a model** 中选择 **Flash Briefing**
   - 选择右上角的 **Create Skill**
6. 在 **Flash Briefing** 中：
   - 输入自定义错误消息，比如 “This skill is currently not available.”
   - 添加新的 feed：
     - 在 **Preamble** 中输入 “From Home Assistant”（或任意您喜欢的内容）
     - 在 **Name** 中输入 “Home Assistant”
     - 将 **Content type** 设为 “Text”
     - 选择一个类型，比如 “Other”
     - 在 **Feed** 中输入 `https://YOUR_HOST/api/alexa/flash_briefings/BRIEFING_ID?password=YOUR_PASSWORD`，其中 `BRIEFING_ID` 是您在配置中填写的键名（如上例中的 `whoishome`）。**注意：** 不要使用非标准的 HTTP 或 HTTPS 端口，否则 AWS 无法连接
     - 您可以使用这个[专门调整尺寸的 Home Assistant 标志][large-icon]作为 Feed Icon
     - 选择 **Add**
     - 选择右上角的 **Save**
7. 在 **Test** 中：
   - 当您通过所有验证并到达此页面后，就可以选择 **< Back to All Skills**，因为您的 flash briefing 已作为 “Development” 服务可用
8. 要调用您的快报，请打开手机上的 Alexa 应用，或前往 [Alexa Settings Site][alexa-settings-site]，打开 “Skills” 配置部分，选择 “Your Skills”，滚动到底部，点选您刚创建的 Flash Briefing Skill，启用它，然后管理 Flash Briefing 并按需调整顺序。最后，向您的 Echo 说出 “news”、“flash briefing” 或 “briefing” 来触发它。

[amazon-dev-console]: https://developer.amazon.com/alexa
[flash-briefing-api]: https://developer.amazon.com/docs/flashbriefing/understand-the-flash-briefing-skill-api.html
[flash-briefing-api-docs]: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/flash-briefing-skill-api-feed-reference
[large-icon]: /images/integrations/alexa/alexa-512x512.png
[small-icon]: /images/integrations/alexa/alexa-108x108.png
[templates]: /docs/configuration/templating/
[zero-three-one]: /blog/2016/10/22/flash-briefing-updater-hacktoberfest/
[alexa-settings-site]: https://alexa.amazon.com/
[emulated-hue-integration]: /integrations/emulated_hue/
