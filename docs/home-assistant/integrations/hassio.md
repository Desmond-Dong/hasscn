---
title: Home Assistant Supervisor
description: 从 Home Assistant 控制 Supervisor 应用和操作系统
ha_category:
  - Backup
  - Binary sensor
  - Sensor
  - Switch
  - Update
ha_iot_class: Local Polling
ha_release: 0.42
ha_domain: hassio
ha_quality_scale: internal
ha_platforms:
  - backup
  - binary_sensor
  - diagnostics
  - sensor
  - switch
  - update
ha_codeowners:
  - '@home-assistant/supervisor'
ha_integration_type: integration
---

**Home Assistant Supervisor** 集成允许您从 Home Assistant 监控和控制 Supervisor 应用及操作系统。
如果您运行 Home Assistant Operating System，此集成已安装。请注意，此集成无法安装在 Home Assistant Container 上。

## 传感器实体

对于每个已安装的应用，提供以下传感器：

| 传感器 | 默认启用 | 描述 |
| ------- | ------------------ | ----------- |
| 版本 | 否 | 应用的当前版本
| 最新版本 | 否 | 当前可用的最新应用版本
| CPU 百分比| 否 | 应用的 CPU 使用百分比
| 内存百分比| 否 | 应用的内存 (RAM) 使用百分比

对于 Home Assistant OS，提供以下传感器：

| 传感器 | 默认启用 | 描述 |
| ------- | ------------------ | ----------- |
| 版本 | 否 | Home Assistant OS 的当前版本
| 最新版本 | 否 | 当前可用的最新 Home Assistant OS 版本

对于 Home Assistant Core，提供以下传感器：

| 传感器 | 默认启用 | 描述 |
| ------- | ------------------ | ----------- |
| CPU 百分比| 否 | 核心的 CPU 使用百分比
| 内存百分比| 否 | 核心的内存 (RAM) 使用百分比

对于 Home Assistant Supervisor，提供以下传感器：

| 传感器 | 默认启用 | 描述 |
| ------- | ------------------ | ----------- |
| CPU 百分比| 否 | Supervisor 的 CPU 使用百分比
| 内存百分比| 否 | Supervisor 的内存 (RAM) 使用百分比

对于 Home Assistant 主机，提供以下传感器：

| 传感器 | 默认启用 | 描述 |
| ------- | ------------------ | ----------- |
| OS Agent 版本 | 否 | 已安装的 OS Agent 版本
| Apparmor 版本 | 否 | apparmor 的版本
| 磁盘空闲 | 否 | 设备上的剩余空间（GB）
| 磁盘总量 | 否 | 设备上的总空间（GB）
| 磁盘已用 | 否 | 设备上的已用空间（GB）

## 二值传感器实体

对于每个已安装的应用，Supervisor 提供以下二值传感器：

（这些实体默认禁用，必须重新启用才会显示）

| 传感器 | 默认启用 | 描述 |
| ------- | ------------------ | ----------- |
| 有可用更新 | 否 | 此应用是否有可用更新（已弃用，请改用更新实体。）
| 运行中 | 否 | 应用是否正在运行。

对于每个网络存储，Supervisor 提供以下二值传感器：

| 传感器 | 默认启用 | 描述 |
| ------- | ------------------ | ----------- |
| 已连接 | 否 | 网络存储是否已连接并正常工作。

对于 Home Assistant OS，Supervisor 提供以下二值传感器：

| 传感器 | 默认启用 | 描述 |
| ------- | ------------------ | ----------- |
| 有可用更新 | 否 | OS 是否有可用更新

## 开关实体

对于每个已安装的应用，提供以下开关：

| 开关 | 默认启用 | 描述 |
| ------- | ------------------ | ----------- |
| 运行中 | 否 | 显示应用是否正在运行，并允许您根据其当前状态启动或停止应用。 |

## 更新实体

对于所有已安装的应用、Home Assistant Core、Home Assistant Supervisor 以及 Home Assistant Operating System（如果您正在运行），此集成将提供 [update](/home-assistant/integrations/update) 实体，提供有关待处理更新的信息，并允许您更新到它们。

## 动作

### 动作：启动应用

`hassio.app_start` 动作启动一个应用。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `app` | 否 | 应用标识

### 动作：停止应用

`hassio.app_stop` 动作停止一个应用。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `app` | 否 | 应用标识

### 动作：重启应用

`hassio.app_restart` 动作重启一个应用。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `app` | 否 | 应用标识

### 动作：写入应用标准输入

`hassio.app_stdin` 动作将数据写入应用标准输入。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `app` | 否 | 应用标识

### 动作：重启主机

`hassio.host_reboot` 动作重启主机系统。

### 动作：关闭主机

`hassio.host_shutdown` 动作关闭主机系统。

### 动作：创建完整备份

`hassio.backup_full` 动作创建一个完整备份。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `name` | 是 | 默认情况下，使用您在常规设置中设置的本地时间的当前日期和时间。
| `password` | 是 | 备份的可选密码
| `compressed` | 是 | `false` 以创建未压缩的备份
| `location` | 是 | 替代备份位置，而不是使用默认备份位置
| `homeassistant_exclude_database` | 是 | 从备份中排除 Home Assistant 数据库文件

### 动作：创建部分备份

`hassio.backup_partial` 动作创建一个部分备份。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `apps` | 是 | 要备份的应用标识列表
| `folders` | 是 | 要备份的目录列表
| `name` | 是 | 备份文件名称。默认为用户本地时间的当前日期和时间
| `password` | 是 | 备份的可选密码
| `compressed` | 是 | `false` 以创建未压缩的备份
| `location` | 是 | 替代备份位置，而不是使用默认备份位置
| `homeassistant` | 是 | 在备份中包含 Home Assistant 及相关配置
| `homeassistant_exclude_database` | 是 | 从备份中排除 Home Assistant 数据库文件

### 动作：从完整备份恢复

`hassio.restore_full` 动作从完整备份恢复。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `slug` | 否 | 要从中恢复的备份标识
| `password` | 是 | 备份的可选密码

### 动作：从部分备份恢复

`hassio.restore_partial` 动作从部分备份恢复。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `slug` | 否 | 要从中恢复的备份标识
| `homeassistant` | 是 | 是否恢复 Home Assistant，`true` 或 `false`
| `apps` | 是 | 要恢复的应用标识列表
| `folders` | 是 | 要恢复的目录列表
| `password` | 是 | 备份的可选密码