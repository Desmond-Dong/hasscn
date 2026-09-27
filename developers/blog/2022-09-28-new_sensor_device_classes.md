已添加多个新的 sensor device classes：

* `distance`，以 `cm`、`ft`、`in`、`km`、`m`、`mi`、`mm`、`yd` 之一测量的距离
* `speed`，以 `ft/s`、`in/d`、`in/h`、`km/h`、`kn`、`m/s`、`mm/d`、`mph` 之一测量的速度
* `volume`，以 `fl. oz.`、`ft³`、`gal`、`L`、`mL`、`m³` 之一测量的体积
* `weight`，以 `g`、`kg`、`lb`、`mg`、`oz`、`µg` 之一测量的质量

与 `pressure` 和 `temperature` sensors 类似，用户可以在 UI 中自由地为使用任何新 device class 的 sensors 选择显示单位。

### 长期统计

长期统计将 `distance` 存储为 `m`，`speed` 存储为 `m/s`，`volume` 存储为 `m³`，`weight` 存储为 `g`。
对于修改为其中一种新 device class 的现有 sensors，统计将继续以 sensor 的 `state_unit` 记录，但用户将获得选项，可以将现有统计转换为标准化单位。
