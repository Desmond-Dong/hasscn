# File size

**文件大小**集成用于显示文件的大小（以 MB 为单位）。

:::important
文件路径还必须添加到 `configuration.yaml` 中的 [allowlist\_external\_dirs](/home-assistant/integrations/homeassistant/index.md#allowlist_external_dirs)。

用于监视配置文件夹中的文件的示例 `allowlist_external_dirs` 配置。

```yaml

homeassistant:
  allowlist_external_dirs:
    - "/config" # Default configuration directory

```

文件路径应该是绝对路径。例如：`/config/home-assistant_v2.db` 监控默认数据库的大小。

:::
:::注意配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
