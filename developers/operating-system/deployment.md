# 部署/发布

Home Assistant Operating System 的发布版本从 release 分支构建。所有公开发布都使用 GitHub Actions 构建。没有固定的发布时间表，构建会由 HAOS 维护者按需触发。变更需要先应用到开发分支，并打上 `rel-x` 标签。维护者会在下一个发布前将这些补丁回移植到 release 分支。

## Branches

* `dev`：开发分支。在开发期间承载下一个主版本。在发布候选阶段，release candidate 会在此分支上打标签。
* `rel-X`：发布分支。每个主版本一个。通常新发布只会从最新的主版本发布分支进行构建。每个发布都会使用其版本号打标签。

## Versioning

版本格式为 *MAJOR.BUILD*。每次发布一个新版本时，BUILD 号都会递增（存储在 `buildroot-external/meta` 中）。MAJOR 号继承自开发分支，并会在创建发布分支后立即提升。

构建系统默认会自动添加一个 *dev{DATE}* 后缀，以标记开发构建。

在新的主版本发布前，可以在开发分支上构建 release candidate，并使用发布候选后缀进行标记，例如 *MAJOR.0.rc1*。

## Deployment types

HAOS 提供 3 种不同的部署类型。它们的区别在于所包含的 OTA 更新公钥不同。部署类型会显示在 Supervisor Web 前端的 System 标签页中的 Host 卡片上。

* development (dev)
* staging (beta)
* production (stable)

## Build pipelines

GitHub Actions 用于构建 HAOS 开发版和发布版。共有两个工作流：

* `.github/workflows/dev.yml`：开发构建，手动触发，镜像存储在 [os-builds.home-assistant.io](https://os-builds.home-assistant.io/)。
* `.github/workflows/release.yml`：发布版（以及发布候选版）构建，在 GitHub release 发布时触发，镜像作为 GitHub release asset 存储。

开发构建流水线也可以从 PR 触发：需要先设置相应的开发板标签，随后在添加 `run-dev-build` 标签时，会为这些开发板触发构建。
