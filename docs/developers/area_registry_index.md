---
title: 区域注册表
---

区域注册表（area registry）是 Home Assistant 跟踪区域的注册表。区域代表 Home Assistant 中的一个物理位置。它可以用来将设备放置在不同的区域。

| 属性 | 描述 |
| --------- | ----------- |
| id | 区域的唯一 ID（由 Home Assistant 生成）
| name | 此区域的名称
| aliases | 区域的备用名称/别名
| floor_id | 区域所属楼层的 ID
| humidity_entity_id | 提供区域湿度的 entity ID
| icon | 此区域的图标
| labels | 分配给区域的 label ID 集合
| picture | 此区域的图片
| temperature_entity_id | 提供区域温度的 entity ID
| created_at | 区域创建时的时间戳
| modified_at | 区域最后修改时的时间戳
