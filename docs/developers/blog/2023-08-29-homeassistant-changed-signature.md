---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: "HomeAssistant.__init__ 要求向其传递字符串"
---

`HomeAssistant.__init__` 的签名已从无需参数更改为要求以字符串形式传递配置目录。Home Assistant core 仓库之外的脚本、测试等如果创建了 `HomeAssistant` 对象，都需要进行更新。

此变更在 [core PR#98442](https://github.com/home-assistant/core/pull/98442) 中引入。

如果需要保持向后兼容，可以通过以下方式实现：

```python
    try:
        hass = HomeAssistant()  # pylint: disable=no-value-for-parameter
    except TypeError:
        hass = HomeAssistant(config_dir)  # pylint: disable=too-many-function-args
```
