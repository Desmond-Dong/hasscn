---
author: Jan Čermák
authorURL: https://github.com/sairon
date: 2025-07-14
title: 自 OS 16 起 add-on 中打开文件限制的处理
---

随着 Home Assistant OS 16 的发布，Docker 容器（以及由此扩展的所有 add-on 及其内部进程）的打开文件描述符默认限制已发生变化。Home Assistant OS 现在使用 Systemd 提供的默认值：软限制为 **1024**，硬限制为 **524288** 个打开文件。

这与之前的 OS 版本不同，之前的版本将限制设置为"无限"（实际上超过 10 亿的值）——这也是上游引入的变更——[自 Home Assistant OS 10 起](/developers/blog/2023-04-13-new_limits_for_add_ons)。新限制符合现代 Linux 系统上的常见做法，并遵循其他 Linux 发行版逐渐采用的变更。

有关这些限制和最佳实践的更多详情，请参阅 Lennart Poettering 对 [File Descriptor Limits](https://0pointer.net/blog/file-descriptor-limits.html) 的解释。简而言之，需要超过默认软限制 1024 个文件描述符的应用程序，应在启动时显式提高自身的限制，最高不超过系统设定的硬限制（在我们的情况下为 524288）。这种方法确保每个应用程序仅请求其所需的资源，并避免可能导致意外资源耗尽的全局高限制。

### 这对 add-on 开发者意味着什么？

- 如果您的 add-on 应用程序需要打开超过 1024 个文件（socket、pipe 等），您应自行调整限制，例如使用 `ulimit -Sn <value>`，只要 `<value>` 不超过硬限制（可通过 `ulimit -Hn` 检查）。
- 大多数 add-on 可能不会受此变更影响，但部分 add-on——例如处理大量网络连接或访问大量文件（如数据库或文件共享应用程序）的 add-on——可能需要调整其启动流程。

### 如果限制太低会发生什么？

如果 add-on 或其应用程序需要的文件描述符超过默认软限制（1024），且未自行提高限制，则在达到限制后可能无法打开更多文件、socket 或网络连接。这通常会导致"Too many open files"或"No file descriptors available"（`EMFILE`）等错误、网络连接失败或服务异常。

如有任何问题或遇到故障，请参阅[此 GitHub discussion](https://github.com/home-assistant/operating-system/discussions/4166)，其中还包含更多细节和背景信息。