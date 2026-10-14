在 Home Assistant 2024.3 中，我们为 integration manifest 文件引入了一个新的 `single_config_entry` 选项。
此选项允许你设置你的集成仅支持一个 config entry。

Home Assistant 将处理并阻止在已经存在该集成的 config entry 时初始化 config flow。
这样你就不必在 config flow 中实现任何检查。

未在 manifest 中设置此选项并在 config flow 中进行检查的集成，应使用新选项替换该检查。
