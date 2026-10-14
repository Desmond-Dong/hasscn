## 理由

从 Home Assistant 中移除设备或服务并不总是很简单。
文档应提供有关如何移除设备或服务的清晰说明。

## 示例实现

```markdown showLineNumbers
## 移除集成

此集成遵循标准的集成移除方式。无需额外步骤。

{% include integrations/remove_device_service.md %}

删除集成后，请前往制造商的应用，并从中移除 Home Assistant 集成。
```

## 例外

本规则没有例外。
