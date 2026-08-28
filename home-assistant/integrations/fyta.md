# FYTA

**FYTA** 集成使用 [FYTA](https://www.fyta.de) 的开放 API 从您的植物传感器获取数据并将其集成到 Home Assistant 中。

## 支持的设备

集成应适用于任何 [FYTA Beam](https://fyta.de/collections/all/products/single-beam)。

## 先决条件

为了使集成正常进行，您需要一个 [FYTA Beam](https://fyta.de/collections/all/products/single-beam) 和一个 FYTA 帐户。

:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

要设置集成，您需要以下信息：

```yaml
电子邮件：
描述：“用于访问 FYTA 帐户的电子邮件地址。”
密码：
描述：“用于访问FYTA帐户的密码。”
```

＃＃ 配置

该集成没有额外的配置选项。

## 支持的功能

### 二进制传感器

目前每个工厂可使用以下二进制传感器：

* 电池电量低
* 灯光通知
* 营养通知
* 温度通知
* 水通知
* 生产工厂
* 重新盆栽
* 传感器更新可用

＃＃＃ 图像

添加通用植物图像和用户图像的图像实体。您可以将它们用于您的仪表板。

### 传感器

目前每个工厂可使用以下传感器：

|名称 |单位|描述 |
|-----------------------|--------|:-------------------------------------------|
|科学名称 |        |植物学名|
|工厂状态 |        | FYTA-状态（参见下面的比例）|
|温度状态 |        | FYTA-状态（参见下面的比例）|
|灯光状态 |        | FYTA-状态（参见下面的比例）|
|湿度状态 |        | FYTA-状态（参见下面的比例）|
|营养状况|        | FYTA-状态（参见下面的比例）|
|盐度状态 |        | FYTA-状态（参见下面的比例）|
|温度| ℃ |传感器测量温度 |
|光 |微摩尔/小时 |传感器测量的光（每小时光合有效辐射 PAR）|
|水分 | % |传感器测量的湿度|
|盐度|毫秒/厘米|通过传感器测量的盐度（以电导率测量）|
|施肥\_最后 |日期 |植物最后一次受精的日期 |
|施肥\_下一个 |日期 |植物应施肥的日期|
|电池电量| % |传感器的电池电量 |

工厂状态可能具有以下状态之一：

* 植物被删除
* 工厂状况良好
* 工厂状况不佳
* 工厂无传感器

对于工厂测量，应用以下状态量表：

* 无数据
* 太低
* 低的
* 完美的
* 高的
* 太高

对于测量传感器（光、湿度、盐度和温度），定义对植物可接受和有益的范围的最大/最小值被保存为传感器的额外属性。例如：低于 10 度就太冷了，这可能是可接受的最低温度。 15 可能是良好范围的最小值。 15到30之间是完美的。 30 是最大的好，35 是最大的可接受。 35以上就太热了。这些值可用于仪表板上的自动化或可视化。

## 数据更新

该集成每 4 分钟从设备获取一次数据。

## 行动

该集成不提供任何额外操作。

## 已知限制

该集成提供通过工厂 API 公开的数据。当前日光积分 (DLI) 的光测量尚不可用（当前仅提供 PAR 值）。

请注意，为了能够通过 API 访问您的植物数据，您需要 [FYTA hub](https://fyta.de/collections/all/products/single-hub) 将数据从 Beam 传感器上传到 FYTA 服务器。或者，移动应用程序可以充当网关，将数据从 Beam 上传到服务器。不支持直接连接到 FYTA Beam（因为 Beam 仅提供原始数据，需要在 FYTA 服务器上进行处理）。

## 删除集成

对于此集成，删除集成的一般流程适用：

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
