---
author: Frenck
authorURL: https://github.com/frenck
authorImageURL: https://avatars.githubusercontent.com/u/195327?v=4
title: "自定义集成现在可以自带品牌图片"
---

从 Home Assistant 2026.3 开始，自定义集成可以直接在集成目录中包含自己的品牌图片（图标和 logo）。无需再提交到单独的仓库——只需将图片放入 `brand/` 文件夹即可在 UI 中显示。

## 自定义集成本地品牌图片

在你的自定义集成中添加一个 `brand/` 目录，包含你的图标和 logo 文件：

```text
custom_components/my_integration/
├── __init__.py
├── manifest.json
└── brand/
    ├── icon.png
    └── logo.png
```

支持以下图片文件名：

- `icon.png` / `dark_icon.png`
- `logo.png` / `dark_logo.png`
- `icon@2x.png` / `dark_icon@2x.png`
- `logo@2x.png` / `dark_logo@2x.png`

本地品牌图片会自动优先于 brands CDN 中的图片。无需任何额外配置。

更多详情，请参阅 [integration file structure 文档](/developers/creating_integration_file_structure#brand-images---brand)。

## 品牌图片现在通过本地 API 提供

为了使本地品牌图片成为可能，所有品牌图片现在都通过 Home Assistant 本地 API 提供，而不是由浏览器直接从 CDN 获取。

一个新的 `brands` system integration 通过两个端点代理品牌图片：

- `/api/brands/integration/{domain}/{image}` — 集成的图标和 logo
- `/api/brands/hardware/{category}/{image}` — 硬件图片

图片会在本地磁盘上缓存，并使用 stale-while-revalidate 策略提供，因此在网络中断期间仍然可用。

### 对 frontend 的影响

`src/util/brands-url.ts` 中的 `brandsUrl()` 和 `hardwareBrandsUrl()` helper 现在返回本地 API 路径，而不是 CDN URL。如果你的自定义卡片或面板使用了这些 helper，则无需任何更改。

如果你是在手动构建品牌图片 URL，请进行更新：

```typescript
// 旧
const url = `https://brands.home-assistant.io/_/${domain}/icon.png`;

// 新
import { brandsUrl } from "../util/brands-url";
const url = brandsUrl({ domain, type: "icon" });
```

这些端点需要身份验证。`brandsUrl()` helper 会自动处理此问题，通过追加 access token。如果你手动构建 URL，则需通过 `brands/access_token` WebSocket 命令获取 token，并将其作为 `token` 查询参数追加。
