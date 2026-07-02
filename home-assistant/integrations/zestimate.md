# Zestimate

**Zestimate** 集成可让您使用 [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm) 跟踪房产的 Zestimate® 估值。根据 Zillow 网站说明，Zestimate® 是 Zillow 估算的房产市场价值，并不是正式估价。您可以将其作为判断房产价值的起点。Zestimate® 由 [Zillow](https://www.zillow.com) 提供，该网站主要用于展示美国的房屋买卖和租赁信息。

此集成会为每个指定的 zpid 添加一个实体。如果您跟踪多个 Zestimate，则会创建名为 `sensor.zestimate` 并附加编号的实体。

## 配置

您需要通过 [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm) 注册 Zillow API。您还需要每套想要跟踪房产的 Zillow 房产 ID。这些信息可以从对应房产页面的 URL 中获得。如果您是该房产的所有者，建议先认领该房源并更新房产信息，以提高数据准确性。

例如，白宫的 zpid 是 84074482，可在其 Zillow URL 中找到：<https://www.zillow.com/homedetails/1600-Pennsylvania-Ave-NW-Washington-DC-20006/84074482_zpid/>

要启用此传感器，请将以下内容添加到您的 `configuration.yaml` 中。

```yaml
sensor:
  - platform: zestimate
    api_key: YOUR_API_KEY
    zpid:
      - YOUR_ZPID_1
      - YOUR_ZPID_2
```

```yaml
api_key:
  description: 用于访问此服务的 API 密钥。可通过 [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm) 获取。
  required: true
  type: string
zpid:
  description: 要在前端中跟踪的房产 ID。可按上文所述从 Zillow URL 中找到。仅填写数字部分，不要包含 `_zpid`。
  required: true
  type: list
```

### 附加属性

此传感器还提供以下附加属性。

可用属性包括：

* 上次更新时间
* 30 天价值变化
* 估值范围上限
* 估值范围下限
* 地址
* 货币
* 金额

示例截图：

<img src="/home-assistant/images/integrations/zestimate/zestimateexample.png" />
