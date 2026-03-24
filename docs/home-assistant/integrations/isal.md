---
title: Intelligent Storage Acceleration
description: 智能存储加速
ha_release: 2024.6
ha_category:
  - Other
ha_codeowners:
  - '@bdraco'
ha_domain: isal
ha_integration_type: system
ha_quality_scale: internal
ha_iot_class: Local Polling
---

[`zlib`](https://github.com/madler/zlib) 是 [`aiohttp`](https://github.com/aio-libs/aiohttp) 的性能瓶颈，尤其是在 WebSocket 连接场景中。[Intelligent Storage Acceleration](https://github.com/intel/isa-l) 用于加速 [`aiohttp`](https://github.com/aio-libs/aiohttp)，因为它可以将压缩速度[提升](https://github.com/pycompression/python-isal/tree/develop/benchmark_scripts)多达 5 倍。

## 配置

Home Assistant Operating System 和 Home Assistant Container 安装方式已预装 `isal`，无需执行任何操作。

如果您因某种原因将其移除，并且您的系统支持 [`isal`](https://github.com/pycompression/python-isal)，则可以通过以下配置重新启用：

```yaml
# Example configuration.yaml entry
isal:
```
