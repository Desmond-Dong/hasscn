在 [`hass` 对象](/developers/dev_101_hass.md) 上存在一个 `Config` 类的实例。`Config` 类包含了用户首选的单位、config 目录路径以及加载了哪些 components。

| Name | Type | Description |
| ---- | ---- | ----------- |
| latitude | float | 实例位置的纬度 |
| longitude | float | 实例位置的经度 |
| elevation | int | 实例的海拔 |
| location\_name | str | 实例名称 |
| time\_zone | str | 时区 |
| units | UnitSystem | 单位系统 |
| internal\_url | str | 可在内部访问实例的 URL |
| external\_url | str | 可在外部访问实例的 URL |
| currency | str | 首选货币 |
| country | str | 实例所在的国家 |
| language | str | 首选语言 |
| config\_source | ConfigSource | 配置是通过 UI 设置还是存储在 YAML 中 |
| skip\_pip | bool | 如果为 `True`，启动时会跳过对 requirements 的 pip install |
| skip\_pip\_packages | list\[str] | 启动时安装 requirements 时要跳过的包列表 |
| components | set\[str] | 已加载的 components 列表 |
| api | ApiConfig | API (HTTP) 服务器配置 |
| config\_dir | str | 存放配置的目录 |
| allowlist\_external\_dirs | set\[str] | 允许访问的外部目录列表 |
| allowlist\_external\_urls | set\[str] | 允许 integrations 使用的外部 URL 列表 |
| media\_dirs | dict\[str, str] | integrations 可使用的媒体文件夹字典 |
| safe\_mode | bool | Home Assistant 是否正在以 safe mode 运行 |
| legacy\_templates | bool | 使用旧的模板行为 |

它还提供了若干 helper 方法。
