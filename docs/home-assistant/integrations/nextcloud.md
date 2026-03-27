---
title: Nextcloud
description: 'The Nextcloud integration pulls summary Nextcloud(https://nextcloud.com/) information into Home Assistant. 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_category:
  - Binary sensor
  - Sensor
  - Update
ha_iot_class: Cloud Polling
ha_release: 0.108
ha_domain: nextcloud
ha_config_flow: true
ha_codeowners:
  - '@mib1185'
ha_platforms:
  - binary_sensor
  - sensor
  - update
ha_integration_type: service
---
# Nextcloud

The **Nextcloud** integration pulls summary [Nextcloud](https://nextcloud.com/) information into Home Assistant.

该集成为内置 Nextcloud [serverinfo 应用程序](https://github.com/nextcloud/serverinfo) 提供的大多数数据点提供传感器和二进制传感器。

要查看您的 nextcloud 实例公开了哪些数据点，请浏览到以下 URL：“https://<your_nextcloud_url>/ocs/v2.php/apps/serverinfo/api/v1/info?format=json&skipUpdate=false”。

![Nextcloud 示例传感器](/home-assistant/images/screenshots/nextcloud-sample-sensor.png)

## Configuration

此集成具有以下 Nextcloud Server 先决条件：

- 用户必须属于 Nextcloud `admin` 组 (__*Nextcloud*__ > __*Users*__)
- 必须安装 Nextcloud“监控”应用程序（__*Nextcloud*__ > __*应用程序*__ > 🔍（搜索图标）> __*监控*__ > __*启用*__）
- （推荐）应生成 Nextcloud 应用程序密码以在 Home Assistant 中使用（__*Nextcloud*__ > __*设置*__ > __*个人*__ > __*安全*__ > __*设备和会话*__ > __*创建新应用程序密码*__）

## Configuration

To add the **Nextcloud** service to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nextcloud)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nextcloud).
- From the list, select **Nextcloud**.
- Follow the instructions on screen to complete the setup.

</details>

## Sensors

For each entry, the integration will create the following sensors:

| Sensor | Enabled by default |
| ------ | ------------------ |
| Amount of active users last 5 minutes | ✅ |
| Amount of active users last day | ✅ |
| Amount of active users last hour | ✅ |
| Amount of files | ✅ |
| Amount of group shares | ✅ |
| Amount of link shares | ✅ |
| Amount of local storages | ✅ |
| Amount of mail shares | ✅ |
| Amount of other storages | ✅ |
| Amount of passwordless link shares | ✅ |
| Amount of room shares | ✅ |
| Amount of shares | ✅ |
| Amount of shares received | ✅ |
| Amount of shares sent | ✅ |
| Amount of storages | ✅ |
| Amount of storages at home | ✅ |
| Amount of user | ✅ |
| Amount of user shares | ✅ |
| Apps installed | ✅ |
| Avatars enabled | ✅ |
| CPU load last 1 minute | ✅ |
| CPU load last 15 minutes | ✅ |
| CPU load last 5 minutes | ✅ |
| Cache TTL | ❌ |
| Cache expunges | ❌ |
| Cache memory | ❌ |
| Cache memory size | ✅ |
| Cache number of entries | ❌ |
| Cache number of hits | ❌ |
| Cache number of inserts | ❌ |
| Cache number of misses | ❌ |
| Cache number of slots | ❌ |
| Cache start time | ❌ |
| Database size | ✅ |
| Database type | ✅ |
| Database version | ✅ |
| Debug enabled | ✅ |
| Filelocking enabled | ✅ |
| Free memory | ✅ |
| Free space | ✅ |
| Free swap memory | ✅ |
| Interned buffer size | ❌ |
| Interned free memory | ❌ |
| Interned number of strings | ❌ |
| Interned used memory | ❌ |
| JIT active | ❌ |
| JIT buffer free | ❌ |
| JIT buffer size | ❌ |
| JIT enabled | ❌ |
| JIT kind | ❌ |
| JIT opt flags | ❌ |
| JIT opt level | ❌ |
| Opcache blacklist miss ratio | ❌ |
| Opcache blacklist misses | ❌ |
| Opcache cached keys | ❌ |
| Opcache cached scripts | ❌ |
| Opcache current wasted percentage | ❌ |
| Opcache free memory | ❌ |
| Opcache hash restarts | ❌ |
| Opcache hit rate | ❌ |
| Opcache hits | ❌ |
| Opcache last restart time | ❌ |
| Opcache manual restarts | ❌ |
| Opcache max cached keys | ❌ |
| Opcache misses | ❌ |
| Opcache out of memory restarts | ❌ |
| Opcache start time | ❌ |
| Opcache used memory | ❌ |
| Opcache wasted memory | ❌ |
| PHP max execution time | ✅ |
| PHP memory limit | ✅ |
| PHP upload maximum filesize | ✅ |
| PHP version | ✅ |
| Previews enabled | ✅ |
| SMA available memory | ❌ |
| SMA number of segments | ❌ |
| SMA segment size | ❌ |
| System memcache distributed | ❌ |
| System memcache local | ❌ |
| System memcache locking | ❌ |
| System theme | ✅ |
| System version | ✅ |
| Total memory | ✅ |
| Total swap memory | ✅ |
| Updates available | ✅ |
| Webserver | ✅ |

## Update entity

An update entity will be created for each entry.
