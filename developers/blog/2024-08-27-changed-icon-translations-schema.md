icon translations schema 已经调整，允许为[service 中的 sections](/developers/dev_101_services.md#grouping-of-service-action-fields)分配 icon。
service 的 icon 现在应按照更明确的 schema 提供，该 schema 允许为 sections 指定 icon。

这允许像这样指定 service icon：

```json
  "services": {
    "test_service_1": {
      "service": "mdi:flask",
      "sections": {
        "section_1": "mdi:test-tube"
      }
    }
  }
```

旧格式在为期一年的弃用期间得到支持，以便自定义集成有时间迁移到新 schema：

```json
  "services": {
    "test_service_1": "mdi:flask"
  }
```

请参阅 [core PR #124656](https://github.com/home-assistant/core/pull/124656) 以获取实现细节。

### 对自定义卡片的影响

发送到 frontend 的 icon 数据始终遵循新格式，显示 service icon 的自定义卡片需要进行调整。
