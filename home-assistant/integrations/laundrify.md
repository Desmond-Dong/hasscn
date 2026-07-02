# laundrify

使用 [laundrify](https://laundrify.de/) WiFi 电源插头，在 Home Assistant 中监控洗衣机或烘干机的状态。

此集成当前支持以下平台/实体：

* Binary sensor
  * 洗涤周期（*running*/*not running*）
* Sensor
  * 功率（最近一次测量值，单位为 *W*）
  * 能耗（总耗电量，单位为 *kWh*）

## 生成 Auth Code

*请注意，启用 Home Assistant 集成需要 laundrify App v1.12.0。*

此集成需要使用 Auth Code 完成账户关联。打开 laundrify App，轻点 `Home Assistant -> Integration aktivieren` 以生成您的代码。

<p class='img'>
  <img src='/home-assistant/images/integrations/laundrify/generate-code.png' alt='Screenshot: generate an Auth Code in the laundrify App'>
</p>

代码会在激活后 60 分钟内过期，请及时完成集成配置。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Code:
  description: "可在 laundrify App 中获取的 Auth Code（见上文），例如 `123-456`。"
```
