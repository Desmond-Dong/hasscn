使用 webhook config flow helper（`homeassistant.helpers.config_entry_flow.register_webhook_flow`）的集成现已支持 reconfiguration。这使得集成能够重新获取 webhook，或在 Home Assistant 实例 URL 更改时获取更新的 webhook。

使用 webhook config flow helper 的自定义集成必须为 reconfiguration flow 添加 translation strings。

**reconfiguration flow 的示例 translation strings：**

```json
{
  "config": {
    "abort": {
      "reconfigure_successful": "**Reconfiguration was successful**\n\nIn Sleep as Android go to *Settings → Services → Automation → Webhooks* and update the webhook with the following URL:\n\n`{webhook_url}`"
    },
    "step": {
      "reconfigure": {
        "description": "Are you sure you want to re-configure the Sleep as Android integration?",
        "title": "Reconfigure Sleep as Android"
      }
    }
  }
}
```

更多详情请参阅 [core PR #151729](https://github.com/home-assistant/core/pull/151729)。
