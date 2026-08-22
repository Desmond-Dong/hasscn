---
title: 更新实体
sidebar_label: Update
---

Update entity 是一种指示 device 或 service 是否有 update 可用的 entity。
它可以是任何 update，包括 device（如 light bulb 或 router）的 firmware
update，或 apps（以前称为 add-ons）或 containers 的 software updates。

它可用于：

- 提供 device 或 service 是否有 update 可用的指示器。
- 提供一种 install method，允许安装 update 或 software 的特定 version。
- 允许在安装新 update 之前提供 backup。

## 属性

:::tip
Properties 应该只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| auto_update | bool | `False` | Entity 所代表的 device 或 service 具有 auto update logic。当此值设为 `True` 时，不能跳过 updates。
| display_precision | int | `0` | 显示 update progress 的小数位数。
| in_progress | bool | `False` | Update installation progress。应返回布尔值（进行中标记为 True，未进行标记为 False）。
| installed_version | str | `None` | 当前已安装并使用的 software version。
| latest_version | str | `None` | 可用 software 的最新 version。
| release_summary | str | `None` | Release notes 或 changelog 的摘要。不适合长 changelogs，仅适合最多 255 字符的简短 update description 摘录。
| release_url | str | `None` | 可用最新 version 的完整 release notes 的 URL。
| title | str | `None` | Software 的 title。这有助于区分 device 或 entity name 与已安装 software 的 title。
| update_percentage | int, float | `None` | Update installation progress。可以返回一个 0 到 100% 的 progress 数字，或 None。

其他在所有 entity 中通用的 properties（如 `device_class`、`entity_category`、`icon`、`name` 等）仍然适用。

## 支持的功能

Supported features 通过使用 `UpdateEntityFeature` enum 中的值来定义。

| Value | Description |
|----------|--------------------------------------|
| `BACKUP` | 可以在安装 update 之前自动创建 backup。
| `INSTALL` | 可以从 Home Assistant 安装 update。
| `PROGRESS` | 此集成能够提供 progress information。如果省略，Home Assistant 会尝试提供 progress status；尽管最好是从 device 或 service API 中提取 progress。
| `SPECIFIC_VERSION` | 可以使用 `update.install` service action 安装 update 的特定 version。
| `RELEASE_NOTES` | Entity 提供获取完整 changelog 的 methods。

## 方法

### 比较版本

在需要 override 默认 version comparison logic 时应实现此 method。
以下是一个示例：

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

它允许 developers 指定自定义逻辑来确定一个 version 是否比另一个更新。首次尝试应基于 [AwesomeVersion library](https://github.com/ludeeus/awesomeversion?tab=readme-ov-file#awesomeversion-class) 提供的 strategies。

### 安装

实现此 method 使用户可以直接从 Home Assistant 内安装提供的 update。

此 method 要求设置 `UpdateEntityFeature.INSTALL`。此外，如果此集成支持安装特定 version 或能够在开始 update installation process 之前创建 backup，则可以分别设置 `UpdateEntityFeature.SPECIFIC_VERSION` 和
`UpdateEntityFeature.BACKUP`。

```python
class MyUpdate(UpdateEntity):
    # 实现以下方法之一。

    def install(
        self, version: str | None, backup: bool, **kwargs: Any
    ) -> None:
        """Install an update."""

    async def async_install(
        self, version: str | None, backup: bool, **kwargs: Any
    ) -> None:
        """Install an update.

        Version 可以指定为安装特定 version。当为 `None` 时，
        需要安装最新 version。

        Backup 参数表示应在安装 update 之前创建 backup。
        """
```

### 发布说明

实现此 method 使用户可以在安装 update 之前，在 Home Assistant Frontend 的 more-info dialog 中查看完整的 release notes。

返回的字符串可以包含 markdown，frontend 会正确格式化它。

此 method 要求设置 `UpdateEntityFeature.RELEASE_NOTES`。

```python
class MyUpdate(UpdateEntity):
    # 实现以下方法之一。

    def release_notes(self) -> str | None:
        """Return the release notes."""
        return "Lorem ipsum"

    async def async_release_notes(self) -> str | None:
        """Return the release notes."""
        return "Lorem ipsum"
```

### 可用的设备类型

选项性地指定 entity 的类型。

| Constant | Description
| ----- | -----------
| `UpdateDeviceClass.FIRMWARE` | Update 是 device 的 firmware update。
