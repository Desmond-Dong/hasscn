---
author: Simone Chemelli
authorURL: https://github.com/chemelli74
title: "Update 平台的版本比较现在可以自定义覆盖"
---

随着 [core PR #124797](https://github.com/home-assistant/core/pull/124797) 的合并（该 PR 将合入 Home Assistant Core 2024.10），update 平台新增了一个方法：`version_is_newer()`。

在此更改之前，已安装固件版本、新可用版本与 beta 版本之间的比较逻辑是硬编码的：

```python
def version_is_newer(self, latest_version: str, installed_version: str) -> bool:
    """Return True if latest_version is newer than installed_version."""
    return AwesomeVersion(latest_version) > installed_version
```

现在，新方法允许开发者自定义该比较逻辑，编写他们自己的方法即可。
以下是一个示例（为 Shelly gen1 设备实现）：

```python
def version_is_newer(self, latest_version: str, installed_version: str) -> bool:
    """Return True if available version is newer then installed version."""
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