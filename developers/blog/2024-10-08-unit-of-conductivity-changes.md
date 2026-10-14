`UnitOfConductivity` enum 已从以下内容更改为：

```py
  class UnitOfConductivity(StrEnum):
    """Conductivity units."""

    SIEMENS = "S/cm"
    MICROSIEMENS = "µS/cm"
    MILLISIEMENS = "mS/cm"
```

更改为：

```py
  class UnitOfConductivity(StrEnum):
    """Conductivity units."""

    SIEMENS_PER_CM = "S/cm"
    MICROSIEMENS_PER_CM = "µS/cm"
    MILLISIEMENS_PER_CM = "mS/cm"
```

旧的 enum 成员可以在为期一年的 deprecation 期内继续使用，以便自定义集成有时间迁移到新的 enum 成员。

实现详情请参阅 [core PR #127919](https://github.com/home-assistant/core/pull/127919)。
