---
title: "部署与发布"
sidebar_label: 部署
---

Home Assistant Operating System 的发布版本从 release 分支构建。GitHub Actions 用于构建所有公开发布版本。没有固定的时间表，构建由 HAOS 维护者按需触发。更改需要先应用到开发分支，并标记 `rel-x` 标签。维护者将在下一次发布前将这些补丁 backport 到 release 分支。

## 分支

- `dev`：开发分支。在开发过程中承载下一个主要版本。在 release candidate 阶段，release candidate 会在此分支上打标签。
- `rel-X`：发布分支。每个主要版本一个。通常新的发布版本只从最后一个主要版本号构建。每个版本都会打上一个版本号标签。

## 版本控制

版本的格式为 *MAJOR.BUILD*。每次发布新 release，BUILD 编号都会递增（存储在 `buildroot-external/meta` 中）。MAJOR 编号继承自开发分支，并在创建 release 分支后立即递增。

构建系统默认会自动添加一个 *dev\{DATE\}* 后缀来标记开发构建。

在新主要版本发布之前，可以在开发分支上构建 release candidate。使用 release candidate 后缀来标记它们，例如 *MAJOR.0.rc1*。

## 部署类型

HAOS 提供 3 种不同类型的部署。不同部署之间的区别在于它们为 over the air 更新包含了哪些公钥。部署类型显示在 Supervisor web 前端的 System 选项卡中的 Host 卡片上。

- development（dev）
- staging（beta）
- production（stable）

## 构建流水线

GitHub Actions 用于构建 HAOS 的开发版本和发布版本。存在两个 workflow：

- `.github/workflows/dev.yml`：开发构建，手动触发，镜像存储在 [os-builds.home-assistant.io](https://os-builds.home-assistant.io/)。
- `.github/workflows/release.yml`：发布（和 release candidate）构建，在 GitHub release 发布时触发，镜像作为 GitHub release asset 存储。

开发构建流水线也可以从 PR 触发：首先需要设置相应的板卡标签，然后在添加 `run-dev-build` 标签时会为这些板卡触发构建。
