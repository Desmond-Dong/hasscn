---
title: Supervisor update
description: Upcoming changes to the Supervisor
---

## Renaming snapshot to 备份

"Snapshot" is a term that we have been using in the Supervisor since the beginning,
but it's not very descriptive for those that do not know what it is.
Over the next few weeks, we will start using "备份"
in all our software and 文档.

The functionality of it does not change, this is just a rename to make it more understandable.

## 受监管模式 installations

:::note
Having a supervisor does not make it a 受监管模式 安装, Home Assistant Operating System also has this, the information below does not apply to Home Assistant Operating System.
:::

While we try not to break 受监管模式 installations, we do have a few things we need to change.
These adjustments you have to manually apply to your 安装. Without these adjustments you will start to see 警告 in your 日志, and your 安装 will eventually be marked as unsupported.

If you are interested to make changes required on 受监管模式 installations more maintainable, have a look at the [博客 on the developer site][dev_blog].

As an alternative to doing these adjustments, you can migrate your 安装 to [Home Assistant Operating System][installation_docs].

## Bullseye

Two weeks ago Debian 11 (Bullseye) was released. The upcoming 版本 of the Supervisor will recognize that 版本 as a supported Operating System. This means that if you are running Home Assistant 受监管模式, you can start upgrading that.

Support for the previous 版本 (Debian 10 (Buster)) is now deprecated and will be removed in the first 版本 of the Supervisor after the 4 months grace period.
This means that within the next 4 months you need to 更新 to Debian 11.

### Environment variables

There are a few environment variables that you have to add in order to make the Supervisor work properly with newer versions of the Supervisor.
These variables have to be added to the run command for the Supervisor 容器, on most installations this is a 脚本 called from a 服务 file.

- `SUPERVISOR_SHARE` - The path to the directory for the Supervisor data files, typically `/usr/share/hassio`.
- `SUPERVISOR_NAME` - The name of the supervisor 容器, typically `hassio_supervisor`
- `SUPERVISOR_MACHINE` - The machine you are using. For a list of machine types, [have a look here][machine_types]

### OS Agent

Recently, we 创建 an [OS Agent][os_agent]. OS Agent allows for better communication between the host OS and the Supervisor which will enable new features.
You can find the 安装 instructions for OS Agent in its [GitHub repository][os_agent].

If you you are interested we have also just published a [博客 on the developer site][dev_blog].

[os_agent]: https://github.com/home-assistant/os-agent
[dev_blog]: https://开发者.home-assistant.io/博客/2021/08/24/supervisor_update/
[installation_docs]: /installation/
[machine_types]: https://github.com/home-assistant/受监管模式-installer#supported-machine-types
