---
title: "实体：集成设备和服务"
sidebar_label: "介绍"
---

集成可以代表和Home Assistant中的服务。数据点表示为实体。实体由其他集成（如`light`、`switch`等）标准化。标准化的实体带有控制操作，但集成也可以提供自己的服务操作，出现未标准化的设备设备的情况。

实体抽象了 Home Assistant 的内部工作原理。集成商，您不必担心服务操作或状态机如何工作。另外，您可以扩展实体类并作为要集成的设备类型实现必要的属性和方法。

<img className='invertDark'
src='/developers/img/en/architecture/integrating-devices-services.svg'
alt='集成设备和服务' />

<!--
https://docs.google.com/drawings/d/1oysZ1VMcPPuyKhY4tequsBWcblDdLydbWxlu6bH6678/edit?usp=sharing
-->

配置通常由用户通过[配置条目](/developers/config_entries_index)完成；在某些特殊或历史遗留场景下，也可能通过 [configuration.yaml](/developers/configuration_yaml_index) 进行配置。

设备集成（即 `hue`）将使用此配置来建立与 device/service. 的连接，将转发配置边界（传统使用发现助手）以各自在各自的集成（灯、交换机）中设置其实体。设备集成还可以针对未标准化的事物注册自己的服务操作。这些操作在集成的域（即 `hue.activate_scene`）下发布。

实体集成（即`light`）负责定义抽象实体类和服务来控制实体。

实体 组件助手负责将配置分发到 平台、转发发现并收集 实体 以进行服务调用。

实体 平台 帮助程序管理 平台 的所有 实体 并在必要时轮询它们以获取更新。添加实体时，实体 平台负责向设备和实体注册表注册实体。

集成平台（即`hue.light`）通过配置查询外部device/service并创建要添加的实体。集成平台也可以注册实体服务。这些服务将适用于设备集成实体集成的所有实体（即所有Hue light实体）。这些服务在设备集成域下发布。

## 实体与 Home Assistant Core 交互

从实体基类继承的集成实体类获取负责数据并处理调用服务。如果取消轮询，它还负责通知 Home Assistant 数据何时可用。

<img className='invertDark'
src='/developers/img/en/architecture/entity-core-interaction.svg'
alt='实体与Core交互'/>

<!--
https://docs.google.com/drawings/d/12Z0t6hriYrQZ2L5Ou7BVhPDd9iGvOvFiGniX5sgqsE4/edit?usp=sharing
-->

实体基类（由实体 集成定义）负责格式化数据并将其写入状态机。

实体存在于任何当前不受实体状态支持的已注册实体写入 `unavailable`。

## 实体 数据层次结构

<img className='invertDark'
样式={{maxWidth:“200px”}}
src='/developers/img/en/architecture/entity-data-hierarchy.svg'
alt='实体层次结构' />

<!--
https://docs.google.com/drawings/d/1TorZABszaj3m7tgTyf-EMrheYCj3HAvwXB8YmJW5NZ4/edit?usp=sharing
-->

删除、禁用或重新启用任何对象，下面的所有对象都将进行相应调整。
