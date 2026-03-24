---
title: 备份应急工具包
description: 关于备份应急工具包的信息
---

存储在 Home Assistant Cloud 上的[备份](/home-assistant/common-tasks/general/#backups)始终使用 [AES-128](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) 加密。对于存储在[其他备份位置](/home-assistant/common-tasks/general/#defining-backup-locations)的备份，您可以选择是否加密备份。备份应急工具包包含[恢复备份](/home-assistant/common-tasks/general/#restoring-a-backup)所需的信息，例如加密密钥和相关备份的元数据。

## 什么是加密，为什么要加密备份？

加密是一种将数据转换为编码格式的方法，只有拥有加密密钥的人才能读取。这确保您关于家庭的数据保持私密。因此，即使其他人获得了您的 Home Assistant 备份副本，如果没有加密密钥，他们也无法读取。

## 将备份应急工具包存储在安全的地方

1. 要下载备份应急工具包，前往 [**设置** > **系统** > **备份**](https://my.home-assistant.io/redirect/backup/)。
2. 如果这是您第一次定义备份设置，选择 **设置自动备份** 并下载备份应急工具包。
   - 您也可以稍后从备份配置页面再次下载加密密钥。

    ![显示备份应急工具包下载对话框中加密密钥的截图](/home-assistant/images/more-info/backup_emergency_kit_01.png)

3. 将工具包存储在 Home Assistant 系统之外的安全地方。
   - Home Assistant 会跟踪当前的加密密钥。如果您从 Home Assistant 下载，它可以解密您的备份。
   - 但如果您在此期间更改了加密密钥，您仍然需要与旧备份匹配的旧密钥。如果没有加密密钥，就没有办法[恢复加密的备份](/home-assistant/common-tasks/general/#restoring-a-backup)。

## 更改您的加密密钥

当您设置[备份](/home-assistant/common-tasks/general/#backups)时，会自动生成一个加密密钥。此密钥用于您所有的备份。您可以用新密钥替换它，新密钥将用于所有未来的备份。要解密更改之前创建的备份，您仍然需要以前的加密密钥。

1. 前往 [**设置** > **系统** > **备份**](https://my.home-assistant.io/redirect/backup/)。
2. 选择 **配置自动备份**，在 **加密密钥** 下，选择 **更改**。
3. 如果您尚未下载旧的应急工具包，请立即下载。
   - 由于新加密密钥不适用于您迄今为止进行的备份，请将其保存在安全的地方，并记录它适用于哪些备份。
4. 要生成新的加密密钥，选择 **下一步**，然后选择 **更改加密密钥**。
5. 下载新的加密密钥并将其存储在安全的地方。

## 我丢失了备份加密密钥 - 如何找回？

如果您仍然可以访问您的 Home Assistant 实例，您可以从备份设置中再次下载加密密钥。有 2 个选项：

- **选项 1：您尚未更改加密密钥**：Home Assistant 仍然拥有它。
  1. 在 Home Assistant 中，前往 [**设置** > **系统** > **备份**](https://my.home-assistant.io/redirect/backup/)
  2. 在 **备份设置** 下的 **加密密钥** 部分中，下载您的应急工具包或复制密钥。
  3. 如果您从 Home Assistant 备份页面下载备份，它会即时解密备份。

- **选项 2：您已更改加密密钥**：Home Assistant 无法即时解密。
  - 您需要与该备份相关的加密密钥。
  - 如果您丢失了加密密钥，且无法访问您的 Home Assistant 实例，就没有办法恢复备份。
  - Nabu Casa 不会存储您的加密密钥，如果密钥丢失，无法提供解密备份的支持。
