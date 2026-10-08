### 变更摘要

从 `2026.7` 起，在 Home Assistant 中安装 `pyserial-asyncio` 将被阻止。

建议库维护者和自定义集成迁移到 `pyserial-asyncio-fast`。

### 背景

`pyserial-asyncio` 因为执行阻塞式 `sleep` 而阻塞 event loop。该库也不再维护，因此改善状况的努力尚未发布。

`pyserial-asyncio-fast` 被创建为替代方案（见[仓库](https://github.com/home-assistant-libs/pyserial-asyncio-fast)），所有核心集成现已迁移完成。

### 迁移

`pyserial-asyncio-fast` 被设计为 `pyserial-asyncio` 的替代方案，必要的更改非常简单。

#### 依赖项

```python
# 旧方式
  install_requires=[
    "pyserial-asyncio"
  ]

# 新方式
  install_requires=[
    "pyserial-asyncio-fast"
  ]
```

#### 用法

```python
# 旧方式
import serial_asyncio

async def connect():
    conn = await serial_asyncio.open_serial_connection(**self.serial_settings)

# 新方式
import serial_asyncio_fast

async def connect():
    conn = await serial_asyncio_fast.open_serial_connection(**self.serial_settings)
```

更多示例请参阅[跟踪 pull request](https://github.com/home-assistant/core/pull/116635)。
