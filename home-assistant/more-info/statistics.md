# 预期数据源未列出

您正在配置统计数据，但在下拉列表中找不到您的源？

请检查它是否在 [Recorder](https://www.home-assistant.io/integrations/recorder/) 配置中被排除。

否则，这是由于提供实体的集成中存在错误。集成需要正确配置其实体，以便 Home Assistant 知道我们需要为其跟踪统计数据以及如何跟踪。

请向集成的作者提出问题，并链接到 https://developers.home-assistant.io/docs/core/entity/sensor#long-term-statistics。
