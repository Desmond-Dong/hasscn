注意：
此处描述的变更已被回退，并替换为 presentation rounding，更多详情请参见[此博客文章](/developers/blog/2023-02-08-sensor_presentation_rounding.md)。

`SensorEntity` 现在可以在将数值型 `native_value` 转换为 sensor state 时进行 rounding。这是 [core PR #86074](https://github.com/home-assistant/core/pull/86074) 的一部分。rounding 由集成通过设置 `native_precision` 属性来 opt-in。建议集成设置此属性，因为它可确保即使经过单位转换后，小数位数仍然合理。

以下是 PR 描述中变更的摘要：

* 默认情况下不进行任何 rounding
  * 集成可以通过设置新属性 `native_precision` 来影响 state precision
* state precision 受单位转换影响
  * 从小单位转换到大单位会增加 display precision
  * 从大单位转换到小单位会减小 display precision（前提是集成已设置 `native_precision`）
  * 从大单位转换到小单位时的最小 precision 为 0，即不会 round 到十位、百位等
* 用户可以从 frontend 覆盖 display precision
  * 没有最小 precision，即通过设置负 precision 可以 round 到十位、百位等
* 鼓励集成取消 display rounding，改为设置 `native_precision` 属性
* 在以下情况下，会在 sensor state 的字符串表示中补充尾随零以匹配 precision：
  * precision 由用户设置
  * `native_precision` 属性不为 `None`
  * 进行了单位转换
