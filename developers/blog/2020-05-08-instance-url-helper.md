如果你是 integration 开发者，并遇到了获取用户的 Home Assistant instance URL 的问题，你可能知道，这过去并不总是容易的。

主要问题是 Home Assistant instance 通常安装在家庭中。这意味着内部地址和外部地址可能不同，甚至这些地址本身也可能有变体（例如，如果用户拥有 Home Assistant Cloud 订阅）。

如果 integration 对 URL 有特定要求，情况会变得更糟；例如，它必须可从外部访问并且需要 SSL。

从 Home Assistant Core 0.110 开始，引入了一个新的 instance URL helper 来简化这一点。我们从以下流程图开始解决此问题：

[![获取 Home Assistant instance URL 的流程图](/img/en/blog/2020-05-instance-url-helper/flowchart.png)](/img/en/blog/2020-05-instance-url-helper/flowchart.png)

因此，之前可用的 `base_url` 现在被两个新的用户 core 配置设置替换：internal URL 和 external URL。

从开发的角度来看，使用 `hass.config.api.base_url` 现在已被弃用，改用新的 `get_url` helper 方法。

有关使用和实现此新 URL helper 方法的更多信息，请参阅我们的[文档](/developers/instance_url.md)。
