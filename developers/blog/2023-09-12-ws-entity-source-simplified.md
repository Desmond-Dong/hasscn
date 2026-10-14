websocket 命令 `entity/source` 已大大简化：

* 不再能够获取单个 entity 的信息
* 响应中仅包含 entities 的 domain，`custom_component`、`config_entry` 和 `source` 不再存在。

### 新响应示例

```json
{
  "light.entity_1": {
    "domain": "template",
  },
  "switch.entity_2": {
    "domain": "shelly",
  },
}
```

### 旧响应示例

```json
{
  "light.entity_1": {
    "custom_component": false,
    "domain": "template",
    "source": "platform_config",
  },
  "switch.entity_2": {
    "custom_component": false,
    "config_entry": "<config_entry_id>",
    "domain": "shelly",
    "source": "config_entry",
  },
}
```

此变更在 [core PR#99439](https://github.com/home-assistant/core/pull/99439) 中引入。
