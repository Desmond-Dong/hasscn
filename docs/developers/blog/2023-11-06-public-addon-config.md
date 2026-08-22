---
author: Mike Degatano
authorURL: https://github.com/mdegat01
title: "公开 Add-on 配置"
---

Add-on 现在可以有一个用于配置文件或数据文件的公共文件夹，用户可以看到并修改它，但它仍然会与 add-on 一起被备份。

许多 add-on 会要求用户在 add-on 配置中提供文件。或者生成一些文件，希望用户能够查看并可能修改它们。它们通常通过映射文件夹列表中包含 `config` 和/或 `share` 来处理。

但这样做有两个问题：

1. `config` 或 `share` 中的内容都不会与 add-on 一起备份。因此，在恢复后，该 add-on 的备份不包含运行它所需的所有文件。
2. 映射 `config` 的 add-on 拥有的访问权限远多于其应有的权限，因为 `config` 包含了你在 Home Assistant 集成中使用的所有 secrets 和 credentials。

现在为 add-on 开发者提供了一种更好的解决方案。Add-on 可以在映射文件夹列表中包含 `addon_config`。然后，supervisor 将为该 add-on 在 `/addon_configs/<your addon slug>` 处创建一个文件夹，并将其映射到 add-on container 内的 `/config`。如果你的 add-on 除了收集用户文件之外，还需要能够在此文件夹中创建和修改文件，则使用 `addon_config:rw`。

要了解更多关于此功能及其用例的信息，请参阅[Add-on advanced options](/developers/apps/configuration#app-advanced-options)。

## 与 `/config` 的向后兼容

你可能会注意到新的公共 config 文件夹被映射到 `/config`。此前如果你将 `config` 添加到 `map` 字段中，Home Assistant 的 config 文件夹就会被映射到此处。

此选项旨在取代 add-on 将 Home Assistant 的 config 映射到其 container 的需求。因此，add-on 不能在 `map` 字段中同时包含 `config` 和 `addon_config`。

今后，如果你确实需要将 Home Assistant 的 config 提供给你的 add-on，你应该在 `map` 字段中将 `homeassistant_config` 列为文件夹。然后 Home Assistant 的 config 文件夹将被映射到 container 内的 `/homeassistant`。

## 新的 `addon_configs` 文件夹

一些 add-on 需要访问所有这些 add-on 专用的 config 文件夹。例如：

1. Samba
2. SSH
3. Studio Code Server

本质上，这些 add-on 提供了编辑 Home Assistant 及其 add-on 配置文件的其他手段。类似这些 add-on 应将 `all_addon_configs:rw` 添加到 map 字段中的文件夹列表。这将把整个 add-on config 文件夹映射到 container 内的 `/addon_configs`。
