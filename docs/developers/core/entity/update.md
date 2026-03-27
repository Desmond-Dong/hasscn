---
title: 更新实体
description: '更新实体用于指示某个对象是否有可用更新。 这个对象可以是设备或服务。更新类型可以是任意形式， 例如灯泡、路由器等设备的固件更新， 也可以是应用程序（以前称为附加组件）或容器的软件更新。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: 更新
---
# 更新实体

更新实体用于指示某个对象是否有可用更新。
这个对象可以是设备或服务。更新类型可以是任意形式，
例如灯泡、路由器等设备的固件更新，
也可以是应用程序（以前称为附加组件）或容器的软件更新。

它可用于：

- 指示设备或服务是否存在可用更新。
- 允许安装更新，或安装软件的特定版本。
- 允许在安装新更新之前提供备份。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ------- | -----------
| auto_update | bool | `False` | 实体代表的设备或服务具有自动更新逻辑。当此项设置为 `True` 时，您无法跳过更新。
| display_precision | int | `0` | 显示更新进度的小数位数。
| in_progress | bool | `None` | 更新安装进度。应该返回一个布尔值（如果正在进行则为 True，如果没有则为 False）。
| installed_version | str | `None` | 当前安装和使用的软件版本。
| latest_version | str | `None` | 可用软件的最新版本。
| release_summary | str | `None` | 发行说明或变更日志摘要。不适合放置较长的变更日志，只适合最多 255 个字符的简短更新描述。
| release_url | str | `None` | 最新可用版本的完整发行说明的 URL。
| title | str | `None` | 软件的标题。这有助于区分设备或实体名称与所安装软件的标题。
| update_percentage | int, float | `None` | 更新安装进度。可以返回一个数字来指示从 0 到 100% 的进度，也可以返回 None。

所有实体共有的其他属性（例如 `device_class`、`entity_category`、`icon`、`name` 等）仍然适用。

## 支持的功能

支持的功能是通过使用 `UpdateEntityFeature` 枚举中的值来定义的。

| 值 | 说明 |
|----------|--------------------------------------|
| 'BACKUP' | 在安装更新之前，可以自动进行备份。
| 'INSTALL' | 可以从 Home Assistant 安装更新。
| 'PROGRESS' | 这种集成能够提供进度信息。如果省略，Home Assistant 将尝试提供进度状态；尽管如果可以从设备或服务 API 中提取进度会更好。
| 'SPECIFIC_VERSION' | 可以使用 `update.install` 服务操作安装特定版本的更新。
| 'RELEASE_NOTES' | 该实体提供了获取完整变更日志的方法。

## 方法

### 比较版本

当需要覆盖默认版本比较逻辑时，应该实现此方法。
这是一个例子：

```python
def version_is_newer(self, latest_version: str, installed_version: str) -> bool:
    """Return True if latest_version is newer than installed_version."""
    return AwesomeVersion(
        latest_version,
        find_first_match=True,
        ensure_strategy=[AwesomeVersionStrategy.SEMVER],
    ) > AwesomeVersion(
        installed_version,
        find_first_match=True,
        ensure_strategy=[AwesomeVersionStrategy.SEMVER],
    )
```

它允许开发者指定自定义逻辑，以判断某个版本是否比另一个版本更新。优先应基于 [AwesomeVersion 库](https://github.com/ludeeus/awesomeversion?tab=readme-ov-file#awesomeversion-class)提供的策略来实现。

### 安装

可以实现此方法，让用户直接在 Home Assistant 中安装提供的更新。

该方法需要设置 `UpdateEntityFeature.INSTALL`。此外，如果集成支持安装特定版本，
或能够在开始安装更新前执行备份，则还可以分别设置
`UpdateEntityFeature.SPECIFIC_VERSION` 和 `UpdateEntityFeature.BACKUP`。

```python
class MyUpdate(UpdateEntity):
    # Implement one of these methods.

    def install(
        self, version: str | None, backup: bool, **kwargs: Any
    ) -> None:
        """Install an update."""

    async def async_install(
        self, version: str | None, backup: bool, **kwargs: Any
    ) -> None:
        """Install an update.

        Version can be specified to install a specific version. When `None`, the
        latest version needs to be installed.

        The backup parameter indicates a backup should be taken before
        installing the update.
        """
```

### 发行说明

可以实现此方法，以便用户可以在安装更新之前在 Home Assistant 前端的更多信息对话框中获取完整的发行说明。

返回的字符串可以包含 markdown，前端将正确格式化它。

该方法需要设置`UpdateEntityFeature.RELEASE_NOTES`。

```python
class MyUpdate(UpdateEntity):
    # Implement one of these methods.

    def release_notes(self) -> str | None:
        """Return the release notes."""
        return "Lorem ipsum"

    async def async_release_notes(self) -> str | None:
        """Return the release notes."""
        return "Lorem ipsum"
```

### 可用设备类别

可以选择指定它是什么类型的实体。

| 常量 | 说明
| ----- | -----------
| `UpdateDeviceClass.FIRMWARE` | 该更新是设备的固件更新。
