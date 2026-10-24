# WattTime

**WattTime** 集成可让您从 [WattTime](https://www.watttime.org) 获取指定经纬度位置的实时排放数据。

## 注册账户

WattTime 账户需要[通过其 REST API](https://www.watttime.org/api-documentation/#register-new-user) 注册。最简单的方式是在命令行中使用 cURL：

```bash
curl -X "POST" "https://api2.watttime.org/v2/register" \
     -H 'Content-Type: application/json' \
     -d '{
       "username": "<USERNAME>",
       "password": "<PASSWORD>",
       "email": "<EMAIL>",
       "org": "<ORG>"
     }'
```

请注意，`org` 的值可以任意填写，不一定要代表真实组织。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

:::note
您可用的传感器取决于所持有的 WattTime 订阅类型。您可以通过[其网站](https://www.watttime.org/contact/)联系 WattTime 以升级订阅。

:::
| 名称 | 订阅等级 | 含义 |
| ---- | -------- | ---- |
| Marginal Operating Emissions Rate | Pro | 当前测得的每兆瓦时二氧化碳排放量，单位为磅 |
| Relative Marginal Emissions Intensity | All | 一个百分比，表示其位于过去两周观测到的最低（最清洁）和最高 MOER 值之间的位置 |

您可以通过以下文章进一步了解 WattTime 收集的数据：

* https://www.watttime.org/aer/what-is-aer/
* https://www.watttime.org/aer/how-aer-works/
