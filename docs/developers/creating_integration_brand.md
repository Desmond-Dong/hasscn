---
title: "品牌"
---

一个商业品牌可能拥有多个集成，分别提供对该品牌下不同产品的支持。此外，一个品牌也可能提供符合某个 IoT 标准（例如 Zigbee 或 Z-Wave）的设备。

第一种情况的示例是，有多个集成分别提供对不同 Google 产品的支持，例如 `google` 集成提供的 Google Calendar，以及 `google_sheets` 集成提供的 Google Sheets。

第二种情况的示例是，Innovelli 提供 Zigbee 和 Z-Wave 设备，并不需要它自己的集成。

为了让用户更容易找到这些集成，应该将它们收集到 `homeassistant/brands` 文件夹中的一个文件中。

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
  "domain": "inovelli",
  "name": "Inovelli",
  "iot_standards": ["zigbee", "zwave"]
}
```

或者一个可以直接复制到你的项目中的最小示例：

```json
{
  "domain": "your_brand_domain",
  "name": "Your Brand",
  "integrations": [],
  "iot_standards": []
}
```

## 域名

domain 是由字符和下划线组成的短名称。该 domain 必须唯一，且无法更改。Google 品牌的 domain 示例：`google`。domain 键必须与该品牌文件所在的文件名相匹配。如果存在一个与品牌同名的集成，它必须列在该品牌的 `integrations` 中。

## 名称

品牌的名称。

## 集成

实现该品牌产品的集成 domain 列表。

## IoT 标准

该品牌的设备所支持的 IoT 标准列表。可能的值是 `homekit`、`matter`、`zigbee` 和 `zwave`。请注意，某个特定设备可能不支持列出的任何 IoT 标准。

## 品牌图片

品牌图片（图标和徽标）存储于 [brands 仓库](https://github.com/home-assistant/brands)。有关品牌图片及其提供方式的更多详情，请参阅 [品牌图片](/developers/core/integration/brand_images)。
