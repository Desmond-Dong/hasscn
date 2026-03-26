---
title: "该文档描述了数据如何更新"
---

## 推理

为了让用户了解集成是如何工作的，我们应该描述集成的数据是如何更新的。
因为这将帮助用户对集成对其用例的效果产生预期。
每 5 分钟才轮询一次的运动传感器的可用性低于主动推送更新的运动传感器。

由于用户可以为轮询集成定义自己的轮询间隔，因此我们应该添加现在轮询的速率并描述任何限制。
例如，如果我们连接的设备在处理太多请求时存在已知问题，我们应该在文档中进行描述。

## 实施示例

```markdown showLineNumbers
## Data updates

My integration fetches data from the device every 5 minutes by default.
Newer devices (the ones running MyOS) have the possibility to push data.
At the start of the integration we try to enable that, and if it fails we fall back to {% term polling %}.
```

## 例外情况

这条规则没有例外。
