---
title: "配置"
---

在 [`hass` 对象](/developers/dev_101_hass) 上有一个 `Config` 类实例。`Config` 类包含用户偏好的单位制、配置目录路径，以及当前已加载的组件。

| Name | Type | Description |
| ---- | ---- | ----------- |
| latitude | float | 实例位置的纬度 |
| longitude | float | 实例位置的经度 |
| elevation | int | 实例的海拔 |
| location_name | str | 实例名称 |
| time_zone | str | 时区 |
| units | UnitSystem | 单位制 |
| internal_url | str | 可在内部访问该实例的 URL |
| external_url | str | 可在外部访问该实例的 URL |
| currency | str | 首选货币 |
| country | str | 实例所在国家 |
| language | str | 首选语言 |
| config_source | ConfigSource | 配置是通过 UI 设置还是存储在 YAML 中 |
| skip_pip | bool | 若为 True，启动时会跳过 requirements 的 pip install |
| skip_pip_packages | list[str] | 启动时安装 requirements 时要跳过的包列表 |
| components | set[str] | 已加载组件列表 |
| api | ApiConfig | API（HTTP）服务器配置 |
| config_dir | str | 保存配置的目录 |
| allowlist_external_dirs | set[str] | 允许访问的外部目录列表 |
| allowlist_external_urls | set[str] | 集成可使用的外部 URL 白名单 |
| media_dirs | dict[str, str] | 集成可使用的媒体文件夹字典 |
| safe_mode | bool | Home Assistant 是否运行在安全模式 |
| legacy_templates | bool | 使用旧版模板行为 |

它还提供了一些辅助方法。
