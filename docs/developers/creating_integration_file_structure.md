---
title: "集成文件结构"
description: '每个集成都存放在一个以集成域命名的目录中。域是由小写字符和下划线组成的简短标识符，必须唯一且不可更改。移动应用集成的域名示例为 mobileapp，因此该集成的所有文件都位于 mobileapp/ 目录中。 本页属于 Home Assistant 开发者文档。'
sidebar_label: "文件结构"
---
# 集成文件结构

每个集成都存放在一个以集成域命名的目录中。域是由小写字符和下划线组成的简短标识符，必须唯一且不可更改。移动应用集成的域名示例为 `mobile_app`，因此该集成的所有文件都位于 `mobile_app/` 目录中。

该目录至少应包含以下内容：

- `manifest.json`：manifest 文件，用于描述集成及其依赖项。[更多信息](/developers/creating_integration_manifest)
- `__init__.py`：集成入口文件。如果该集成只提供平台，那么这个文件可以只保留一行文档字符串，例如 `"""The Mobile App integration."""`。

## 设备平台 - `light.py`、`switch.py` 等

如果您的集成需要接入一个或多个设备，通常应通过创建实体平台来实现。例如，如果要在 Home Assistant 中表示灯设备，就需要创建 `light.py`，并在其中实现灯平台。

- 更多信息：[可用实体类型](/developers/core/entity).
- 更多信息：[创建平台](/developers/creating_platform_index).

## 服务操作 - `services.yaml`

如果您的集成需要注册服务操作，则应提供这些操作的说明。说明内容保存在 `services.yaml` 中。[有关 `services.yaml` 的更多信息。](/developers/dev_101_services)

## 数据更新协调器 - `coordinator.py`

集成获取数据的方式可能有很多种，包括推送和轮询。很多情况下，集成会通过一个供所有实体共享的协调轮询器来获取数据，这通常意味着需要使用 `DataUpdateCoordinator`。
如果您准备定义一个协调器类，或为其创建子类，建议将其放在 `coordinator.py` 中。[有关 `DataUpdateCoordinator` 的更多信息](/developers/integration_fetching_data#coordinated-single-api-poll-for-data-for-all-entities)

## Home Assistant 在哪里查找集成

当 Home Assistant 在配置中看到某个域（例如 `mobile_app:`），或发现它是另一个集成的依赖项时，就会去查找对应集成。Home Assistant 会检查以下位置：

- `<config directory>/custom_components/<domain>`
- `homeassistant/components/<domain>`（内置集成）

## 品牌形象 - `brand/`

品牌图片（图标和徽标）存储在[品牌库](https://github.com/home-assistant/brands)。Home Assistant Core 会通过本地 API 代理这些图片，以便它们从与前端相同的源提供。

可用的 API 端点如下：

- `/api/brands/integration/{domain}/{image}` - 集成 图标和徽标
- `/api/brands/hardware/{category}/{image}` - 硬件图像

如果请求的图片不存在，所有端点默认都会返回通用占位图像。若想关闭此行为并接收 404，请添加 `?placeholder=no` 查询参数。

这些端点需要身份验证。请求既可以使用标准的已认证会话（Bearer token），也可以通过 `token` 查询参数传入访问令牌来完成认证。前端会通过 `brands/access_token` WebSocket 命令获取该访问令牌，并自动将其附加到所有品牌图片 URL 上。

支持以下图像文件名：

- `icon.png` / `dark_icon.png`
- `logo.png` / `dark_logo.png`
- `icon@2x.png` / `dark_icon@2x.png`
- `logo@2x.png` / `dark_logo@2x.png`

### 自定义集成的本地品牌图片

自定义集成可以在集成目录中包含 `brand/` 目录，以提供自己的品牌图片。例如：

```text
custom_components/my_integration/
├── __init__.py
├── manifest.json
└── brand/
    ├── icon.png
    └── logo.png
```

当 `brand/` 目录存在时，图片会通过 `/api/brands/integration/{domain}/{image}` 端点直接从本地文件系统提供。本地图片的优先级高于品牌 CDN 中的图片。

您也可以在 `<config directory>/custom_components` 中放置一个具有相同域名的集成，以覆盖内置集成。[当您覆盖 Core 集成时，`manifest.json` 必须包含版本字段](/developers/creating_integration_manifest#版本)。被覆盖的 Core 集成可通过集成概览页面中卡片右上角的特定图标识别：[![打开您的 Home Assistant 实例并显示您的集成。](https://my.home-assistant.io/badges/integrations.svg)](https://my.home-assistant.io/redirect/integrations/)
请注意，不建议覆盖内置集成，因为这样您将无法继续获得其更新。通常更建议使用一个独特的名称。
