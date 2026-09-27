# History

**History** 集成会跟踪 Home Assistant 中发生的一切，并允许您浏览这些记录。它依赖 [`recorder`](/home-assistant/integrations/recorder/index.md) 集成来存储数据，并使用相同的数据库设置。
如果某些实体被排除在记录之外，
这些实体将不会有任何历史记录可用。

除非您在配置中禁用了或移除了 [`default_config:`](/home-assistant/integrations/default_config/index.md) 这一行，否则此集成默认处于启用状态。如果您移除了它，下面的示例展示了如何手动启用此集成：

```yaml
# Basic configuration.yaml entry
history:
```

## 从 History 面板导出数据

您可以从侧边栏访问 **History** 面板。要导出数据，请按以下步骤操作：

1. 选择您关注的区域、设备或实体。
2. 设置时间范围。
3. 在右上角选择 **Download data** 按钮。
   **结果**：您的数据会以 CSV 格式导出。

<img class="no-shadow" src='/home-assistant/images/integrations/history/history-panel_export-data.png' alt='History panel can be accessed via sidebar.'>

## 关于数据来源

默认情况下，recorder 会保存 10 天的传感器数据。更早的数据会被自动清除。最近 10 天的数据直接来自 recorder。

如果您选择的时间范围超过 10 天，则数据将来自长期统计表。长期统计会为 `state_class` 为 `measurement`、`total` 或 `total_increasing` 的传感器保存。为了节省存储空间，长期统计数据每小时采样并求平均一次。因此，这些数值可能与 recorder 数据中显示的内容不同；后者显示的是该传感器按其采样率记录的测量值。图表中的详细数据会以较深的线条显示。

<img class="no-shadow" src='/home-assistant/images/integrations/history/history-panel_including-long-term-storage.png' alt='If the chosen time frame exceeds the retention period defined in the recorder, the long term statistics table is used as a data source.'>

如果您想在更长时间范围内查看完整分辨率的数据，可以在 recorder 中调整该传感器的保留时长。如果这样做，您可能需要增加设备的存储容量。

## API

历史信息也可通过 [RESTful API](/home-assistant/developers/rest_api/#get-apihistory) 获取。
