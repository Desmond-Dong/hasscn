启用 debouncer 的 update coordinator 现在会在更新进行时接受更新请求。
该请求将被排队，等待当前更新完成后再执行。

考虑以下情况：

```python
async def _update():
    a = await get_a()
    # A: 用户或其他逻辑在此通过 async_schedule_update() 请求新更新
    b = await get_b()
    return (a,b)
```

在时间戳 `A` 请求更新的用户或代码，期望链接的 entity 都将获得从该时间点开始的新数据。然而，由于我们以前会忽略该请求，entity 获得的 `a` 值的数据来自被忽略的更新请求之前的时间点。

为避免这种情况，update coordinator 现在将在当前执行更新时收到请求的情况下，安排一次额外的更新。

此变更的一个副作用是，现在可以从 coordinator 的 update 函数内部安排更新。这在例如更新过程中连接丢失时非常有用，我们希望所有 entity 立即指示为不可用，同时希望尽快尝试重新连接，但将其放在下一个更新周期中进行。
