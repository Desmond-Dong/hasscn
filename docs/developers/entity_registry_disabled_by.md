---
title: 实体注册表与禁用实体
description: '实体注册表会跟踪所有具有唯一 ID 的实体。对于每个实体，注册表都会跟踪影响实体与 Core 交互方式的选项，其中之一就是 disabledby。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: 禁用实体
---
# 实体注册表与禁用实体

实体注册表会跟踪所有具有唯一 ID 的实体。对于每个实体，注册表都会跟踪影响实体与 Core 交互方式的选项，其中之一就是 `disabled_by`。

当 `disabled_by` 不为 `None` 时，集成即使将实体传给 `async_add_entities`，实体也不会被添加到 Home Assistant。

## 集成架构

当实体被禁用时，集成需要确保自身仍能正常工作。如果您的集成保留了对已创建实体对象的引用，则应仅在实体的生命周期方法 `async_added_to_hass` 中注册这些引用。只有当实体实际被添加到 Home Assistant 时，才会调用此生命周期方法。

实体禁用既适用于通过配置条目提供的实体，也适用于通过 `configuration.yaml` 中条目提供的实体。如果您的集成通过配置条目设置并支持[卸载](/developers/config_entries_index#unloading-entries)，那么在实体的启用/禁用状态被修改后，Home Assistant 无需重启即可重新加载您的集成。

## 用户编辑实体注册表

禁用实体的一种方式，是用户通过 UI 编辑实体注册表。在这种情况下，`disabled_by` 的值会被设置为 `RegistryEntryDisabler.USER`。这仅适用于已注册的实体。

## 集成为新的实体注册表项设置 `disabled_by` 的默认值

作为集成开发者，您可以控制实体在首次注册时是否启用。这由 `entity_registry_enabled_default` 属性控制，默认值为 `True`，表示实体会被启用。

如果该属性返回 `False`，则新注册实体的 `disabled_by` 值会被设置为 `RegistryEntryDisabler.INTEGRATION`。

## 配置条目系统选项为新的实体注册表项设置 `disabled_by` 的默认值

用户还可以通过将配置条目的系统选项 `disable_new_entities` 设置为 `True`，来控制如何处理与该配置条目相关的新实体。这可以通过 UI 完成。

如果实体正在注册，且该系统选项设置为 `True`，则 `disabled_by` 属性会初始化为 `RegistryEntryDisabler.CONFIG_ENTRY`。

如果 `disable_new_entities` 设置为 `True` 并且 `entity_registry_enabled_default` 返回 `False`，则 `disabled_by` 值将设置为 `RegistryEntryDisabler.INTEGRATION`。

## 集成提供控制 `disabled_by` 的选项

一些集成希望向用户提供选项，用于控制哪些实体会被添加到 Home Assistant。例如，Unifi 集成就提供了启用/禁用无线和有线客户端的选项。

集成可以通过[配置 YAML](/developers/configuration_yaml_index)或[选项流](/developers/config_entries_options_flow_handler)向用户提供这些选项。

如果集成提供了此类选项，则不应依赖实体注册表中的 `disabled_by` 属性。相反，如果通过配置选项流禁用了实体，请将它们从设备注册表和实体注册表中删除。
