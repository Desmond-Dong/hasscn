---
title: Workday
description: 配置工作日二值传感器的步骤。
ha_category:
  - Binary sensor
  - Calendar
  - Utility
ha_iot_class: Local Polling
ha_release: 0.41
ha_quality_scale: internal
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
  - '@gjohansson-ST'
ha_domain: workday
ha_platforms:
  - binary_sensor
  - calendar
  - diagnostics
ha_integration_type: service
---

**Workday** 集成用于指示当天是否为工作日。

它允许您指定一周中哪些天算作工作日，并使用 Python 模块 [holidays](https://pypi.org/project/holidays/) 纳入地区性公共假期信息。

它可用于创建在工作日和非工作日执行不同逻辑的日常自动化。例如，您可以设置在工作日上午 7 点柔和地打开卧室灯，而在非工作日则等到 11 点再打开。

`workday` 集成还提供一个日历实体，可用于查看即将到来的工作日。

## 设置

请查看[国家列表](https://github.com/vacanza/holidays#available-countries)，了解每个国家可用的省份及其他行政区划（如州和领地）。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

关键字 `Holidays` 用于表示由 holidays 模块识别出的公共假期，以及通过 `Add holidays` 配置选项添加的假期。

:::important
请特别留意 `Holidays` 这个关键字。您第一反应可能会是把它添加到 `Excludes` 配置中，以为这样表示“跳过假期”。但它的实际含义是：将假期列表中的日期从工作日中排除。因此，当您排除 `Holidays` 且某个工作日恰好落在该假期上时，这一天会被排除，传感器状态将为 **off**。如果您希望无论是否是假期都将每个工作日标记出来，请确保 `Excludes` 配置中包含除 `Holidays` 之外的其他内容。

:::
## 字段说明

国家代码必须按照 [holidays](https://pypi.org/project/holidays/) 的写法填写。国家也可以设置为 `None`，以便从一个空的假期集合开始。这与 `add holidays` 字段搭配使用时会很有帮助。

行政区划代码必须按照 [holidays](https://pypi.org/project/holidays/) 的写法填写。

`Add holidays` 仅接受 `YYYY-MM-DD` 格式的日期，或 `YYYY-MM-DD,YYYY-MM-DD` 格式的日期范围。

`Remove holidays` 接受 `YYYY-MM-DD` 格式的日期、`YYYY-MM-DD,YYYY-MM-DD` 格式的日期范围，或节日名称的一部分。例如，`christmas` 会排除 `Christmas Day`。

`offset` 可用于查看未来某一天是否为工作日。例如，填入 `1` 表示查看明天是否为工作日。

您还可以通过配置添加附加类别，以纳入 [python-holidays library](https://github.com/vacanza/python-holidays?tab=readme-ov-file#available-countries) 中列出的可选假期。

## Action `workday.check_date`


此操作会填充 [Response Data](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data)，用于返回指定日期是否为工作日。

| Data attribute | Required | Description | Example |
| ---------------------- | -------- | ----------- | --------|
| `check_date` | yes | Date to test if workday or not. | 2022-03-10


```yaml
action: workday.check_date
target:
  entity_id: binary_sensor.workday
data:
  check_date: "2023-12-25"
response_variable: check_date
```


响应数据字段 `check_date` 提供以下内容：

| Response data | Description | Example |
| ---------------------- | ----------- | -------- |
| `workday` | Is date a workday. | True

## 自动化示例

自动化用法示例：

```yaml
automation:
  alias: "Turn on heater on workdays"
  triggers:
    - trigger: time
      at: "08:00:00"
  conditions:
    - condition: state
      entity_id: binary_sensor.workday_sensor
      state: "on"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.heater
```
