# 品牌

一个商业品牌可能对应多个集成，它们分别支持该品牌下的不同产品。此外，品牌也可能生产支持通用物联网标准的设备，例如 Zigbee 或 Z-Wave 设备。
第一种情况的例子是：Google 有多个集成分别支持不同产品，例如 Google Calendar（`google` 集成）和 Google Sheets（`google_sheets` 集成）。
第二种情况的例子是：Innovelli 提供 Zigbee 和 Z-Wave 设备，但并不需要专门的品牌集成。

为了让用户更容易找到这些集成，应将相关信息记录在 `homeassistant/brands` 目录中的文件里。

示例：

```json
{
  "domain": "google",
  "name": "Google",
  "integrations": ["google", "google_sheets"]
}
```

```json
{
  "domain": "innovelli",
  "name": "Innovelli",
  "iot_standards": ["zigbee", "zwave"]
}
```

也可以使用下面这个最小示例作为起点：

```json
{
  "domain": "your_brand_domain",
  "name": "Your Brand",
  "integrations": [],
  "iot_standards": []
}
```

## 域

域是由小写字符和下划线组成的简短标识符，必须唯一且不可更改。Google 品牌的域名示例为 `google`。`domain` 的值必须与品牌文件名一致。如果存在同名的集成域，则它必须被列在品牌的 `integrations` 中。

## 名称

这里填写品牌名称。

## 集成

这里填写支持该品牌产品的集成域列表。

## 物联网标准

这里填写该品牌设备支持的物联网标准列表。可选值包括 `homekit`、`zigbee` 和 `zwave`。请注意，该品牌下的某些设备可能并不支持这里列出的任何 IoT 标准。

## 品牌形象

官方集成的品牌图片（图标和徽标）存储在[品牌库](https://github.com/home-assistant/brands)。自定义集成也可以提供自己的品牌图片。有关品牌图片及其提供方式的更多信息，请参阅[集成文件结构：品牌图片](/developers/creating_integration_file_structure.md#品牌形象---brand)。
