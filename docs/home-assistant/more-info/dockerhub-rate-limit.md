---
title: Docker Hub 速率限制
description: Docker Hub 正在对您可以执行的拉取次数进行速率限制。
---

## 问题

Docker Hub 对您可以从其容器注册表获取容器信息的次数进行了限制。[在此阅读更多关于其处理方式的信息][Docker-rate-limit]。

Home Assistant 使用 Docker Hub 作为容器注册表。当您的 IP 地址受到速率限制时，更新我们的容器将失败。

## 解决方案

如果您正在运行 watchtower 或类似解决方案来保持容器更新，您需要重新配置它们，使其检查频率低于默认配置。如果您正在运行受监管模式安装，您还应该考虑完全移除它们，因为与 Supervisor 一起运行这些[不受支持][unsupported-容器]。

完成此操作后，您需要等待限制解除，这可能需要长达 6 小时。

如果您与其他方共享 IP 地址，他们的使用也会影响您。Supervisor 支持使用账户登录 Docker Hub，通过这种方法，Supervisor 和 Docker Hub 之间的所有获取都将使用身份验证，不会受到匿名速率限制的限制。经过身份验证的用户也会受到速率限制，但这是与您的账户绑定的专用限制。

_如果您没有 Docker Hub 账户，[可以在此创建一个][dockerhub-signup]。_

要在 Supervisor 中使用您的 Docker Hub 凭据：

1. 您需要在用户个人资料设置中启用高级用户切换。
2. 前往 [**设置** > **应用** > **安装应用**](https://my.home-assistant.io/redirect/supervisor_store/)。
3. 在屏幕右上角，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **注册表**。

4. 在打开的对话框中，选择 **添加新注册表** 并输入 `docker.io` 作为注册表，然后输入您的凭据：

    <p class='img'>
    <img src='/home-assistant/images/screenshots/supervisor_registry_dockerhub.png' alt='在 Supervisor 面板中为 Docker Hub 添加身份验证。'>
    在 Supervisor 面板中为 Docker Hub 添加身份验证
    </p>

_如果您不想使用 UI，也可以使用 [CLI] 完成_

[Docker-rate-limit]: https://docs.Docker.com/Docker-hub/download-rate-limit/
[dockerhub-signup]: https://hub.Docker.com/signup
[unsupported-容器]: /more-info/unsupported/software
[CLI]: https://github.com/home-assistant/cli
