# World Tides

**World Tides** 集成使用 [World Tides](https://www.worldtides.info/) 的数据，为全球任意位置提供潮汐预测信息。

## 设置

从您的 [World Tides](https://www.worldtides.info/) 账户中获取 API 密钥。

## 配置

要使用此集成，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: worldtidesinfo
    api_key: YOUR_API_KEY
```

```yaml
api_key:
  description: 您的 API 密钥。
  required: true
  type: string
name:
  description: 在前端中使用的名称。
  required: false
  type: string
  default: WorldTidesInfo
latitude:
  description: 要显示潮汐信息的位置纬度。
  required: false
  type: float
  default: "您 `configuration.yaml` 文件中的纬度。"
longitude:
  description: 要显示潮汐信息的位置经度。
  required: false
  type: float
  default: "您 `configuration.yaml` 文件中的经度。"
```
