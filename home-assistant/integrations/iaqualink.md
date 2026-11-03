# Jandy iAqualink

[Jandy](https://www.jandy.com/) 的 [iAqualink](https://www.iaqualink.com/) 可让您随时随地控制泳池。

Home Assistant 目前支持以下设备类型：

* Binary sensor
* Climate
* Light
* Sensor
* Switch

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 已知限制

* 该平台仅支持单个泳池。
* 目前仅支持泳池系统。

## 集成调试

如果您在使用 iAqualink 或此集成时遇到问题，可以启用调试日志。

```yaml
logger:
  default: info
  logs:
    iaqualink: debug
    homeassistant.components.iaqualink: debug
```
