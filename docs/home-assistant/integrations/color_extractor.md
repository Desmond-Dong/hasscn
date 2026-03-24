---
title: ColorExtractor
description: 关于如何将颜色提取器集成到 Home Assistant 的说明。
ha_release: 0.118
ha_category:
  - Image processing
ha_domain: color_extractor
ha_codeowners:
  - '@GenericStudent'
ha_config_flow: true
ha_integration_type: integration
---

**ColorExtractor** 集成将从给定图像中提取主要颜色，并将该颜色应用于目标灯光。
作为自动化的一部分非常有用。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 动作

由于 `color_extractor.turn_on` 会调用 `light.turn_on`，您可以传递任何有效的 [`light.turn_on`](/home-assistant/integrations/light#action-lightturn_on) 参数（`rgb_color` 会为您设置）。

将键 `color_extract_url` 传递给动作调用将下载链接的图像并从中提取主要颜色。将键 `color_extract_path` 传递给动作将从本地存储处理图像文件。`color_extract_url` 和 `color_extract_path` 是互斥的，不能一起使用。

| 键                    | 示例                                  | 描述                                               |
| --------------------- | ------------------------------------- | -------------------------------------------------- |
| `color_extract_url`   | `https://example.com/images/logo.png` | 要处理的图像的完整 URL（包括协议，`http://`、`https://`） |
| `color_extract_path`  | `/tmp/album.png`                      | 要处理的本地存储图像文件的完整路径                 |
| `entity_id`           | `light.shelf_leds`                    | 将设置颜色的 RGB 灯光                              |

:::important
确保任何 [外部 URL](/home-assistant/integrations/homeassistant/#allowlist_external_urls) 或 [外部文件](/home-assistant/integrations/homeassistant/#allowlist_external_dirs) 已授权使用。如果不允许此集成访问这些外部资源，您将收到错误消息。

:::
### URL 动作

将参数键 `color_extract_url` 添加到动作中。

此动作允许您传入图像的 URL，下载它，从中提取主要颜色，然后将灯光的 RGB 值设置为该颜色。

### 文件动作

将参数键 `color_extract_path` 添加到动作中。

此动作与上面的 URL 动作非常相似，不同之处在于它处理来自本地文件存储的文件。

## 自动化示例

在自动化中的示例用法，获取 Chromecast 上显示的专辑封面，并在其更改时提供给 `light.shelf_leds`：


```yaml
#automation.yaml
- alias: "Chromecast to Shelf Lights"

  triggers:
    - trigger: state
      entity_id: media_player.chromecast

  actions:
    - action: color_extractor.turn_on
      data_template:
        color_extract_url: "{{ states.media_player.chromecast.attributes.entity_picture }}"
        entity_id: light.shelf_leds
```

带有 5 秒的过渡效果，每次将亮度设置为 100%（[`light.turn_on`](/home-assistant/integrations/light#action-lightturn_on) 动作参数的一部分）：

```yaml
#automation.yaml
- alias: "Nicer Chromecast to Shelf Lights"

  triggers:
    - trigger: state
      entity_id: media_player.chromecast

  actions:
    - action: color_extractor.turn_on
      data_template:
        color_extract_url: "{{ states.media_player.chromecast.attributes.entity_picture }}"
        entity_id: light.shelf_leds
        brightness_pct: 100
        transition: 5
```


