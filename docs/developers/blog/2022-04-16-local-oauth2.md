---
author: Allen Porter
authorURL: https://github.com/allenporter
title: "Local OAuth2 更新"
---

从 Home Assistant Core 2022.5 开始，注册了 `config_entry_oauth2_flow.LocalOAuth2Implementation` 的集成必须对 `auth` component 有[manifest dependency](https://developers.home-assistant.io/docs/creating_integration_manifest?_highlight=manifest#dependencies)。

这是由改善 OAuth [Application Credentials](https://github.com/home-assistant/architecture/discussions/692#discussioncomment-2121633) 处理的更广泛努力所驱动的，该努力需要更改 OAuth callback 的 HTTP endpoint 注册方式。
