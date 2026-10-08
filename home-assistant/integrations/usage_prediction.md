# Usage Prediction

**Usage Prediction** 集成是一个内部集成，用于预测用户最有可能与哪些实体交互。前端会利用这些预测结果向用户展示最相关的实体。

## Configuration

虽然此集成属于 [`default_config:`](/home-assistant/integrations/default_config/index.md) 的一部分，用于启用默认体验中的相关功能，但它只会在您完成配置流程后，或手动将其添加到 `configuration.yaml` 文件后才会启用。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例
usage_prediction:
```
