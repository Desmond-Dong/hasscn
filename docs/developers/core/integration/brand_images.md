---
title: "品牌图片"
sidebar_label: "品牌图片"
---

为了帮助用户从视觉上识别集成和硬件，Home Assistant 会为集成和硬件实体显示图标和 logo。

图标是用于在空间有限的 UI 中显示的正方形图片，而 logo 是用于集成配置页面及其他有更大空间的矩形图片。

Home Assistant 支持亮色和暗色模式图片。

## 如何添加品牌图片

添加品牌图片的方式取决于集成的类型。

### Core 集成

对于 core 集成，品牌图片通过向 [brands repository] 创建 pull request 来添加。

图片应添加到 `core_integrations/` 目录中一个以集成 domain 命名的目录下。

例如，Philips Hue 集成的品牌图片应放在 `core_integrations/hue` 中。

:::info
这些图片在服务端进行缓存，因此一旦 pull request 被合并，图片可能不会立即可用。
:::

#### Material design icons

有些集成（如 helpers）没有代表其品牌的标识。

在这种情况下，你可以在 `core_integrations/` 中的对应文件夹中放置一个 `icon.txt` 文件，其内容为要使用的图标名称，前面加上 `mdi:` 前缀，从而使用 Material Design Icons 库中的图标。

### Core 品牌

与 core 集成类似，[core 品牌] 也是通过向 [brands repository] 创建 pull request 来添加。

图片应添加到 `core_brands/` 目录中一个以品牌 domain 命名的目录下。

例如，Google 品牌的品牌图片应放在 `core_brands/google` 中。

如果品牌的图片与其某个集成的图片相同，可以创建 symlink 以避免重复。

例如，Samsung 品牌的图片与 Samsung TV 集成的图片相同，因此 `core_integrations/samsung_tv` 目录中包含指向 `core_brands/samsung` 中图片的 symlink。

### Custom 集成

在 Home Assistant 2026.3 之前，custom 集成也被要求将品牌图片添加到 [brands repository]。

从 Home Assistant 2026.3 开始，custom 集成可以通过在集成目录内添加 `brand/` 目录来包含自己的品牌图片。

例如，如果你有一个 domain 为 `my_integration` 的 custom 集成，你可以在 `custom_components/my_integration/brand/` 中添加品牌图片。

本地品牌图片优先于来自 [brands repository] 的图片，因此如果 custom 集成有本地 `brand/` 目录，Home Assistant 将使用这些图片而不是来自 [brands repository] 的图片。

:::info
如果 custom 集成将贡献给 Home Assistant Core，请务必移除本地品牌图片，并改为打开 PR 将它们添加到 [brands repository]。
:::

[core brands]: /docs/creating_integration_brand.md
[brands repository]: https://github.com/home-assistant/brands

## 品牌图片如何被提供

品牌图片通过本地 API 提供，以便它们与 frontend 来自同一来源。

可用的 API endpoint 如下：

- `/api/brands/integration/{domain}/{image}` - 集成的图标和 logo
- `/api/brands/hardware/{category}/{image}` - 硬件图片

如果请求的图片不存在，所有 endpoint 默认返回通用占位图片。

若要选择退出并在图片不存在时返回 404，请添加 `?placeholder=no` 查询参数。

这些 endpoint 需要认证。请求可以使用标准已认证会话（Bearer token）或通过在 `token` 查询参数中传递 access token 来认证。

frontend 通过 `brands/access_token` WebSocket 命令获取此 access token，并自动将其附加到所有品牌图片 URL。
