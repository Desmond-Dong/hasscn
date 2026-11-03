# Improved Hass.io build system

:::note
This is going to be a technical post for Hass.io 插件 开发者 and people that run locally build 插件 (not the default).
:::

Two months ago we [introduced Hass.io][intro], allowing our 用户 to easily 安装, 更新 and manage their Home Assistant 安装. In this short time we've seen great adoption from the community. Around 20% of our 用户 are choosing Hass.io as their method of running Home Assistant today. We've also seen many 插件 being made available on [the forums][插件-repos]. There are currently 14 reposities full of 插件 being shared!

Hass.io is built on top of Docker, a 容器 runtime. One thing that Docker did not support was dynamic build environements. That was annoying for Hass.io because by supporting multiple CPU architectures, that was exactly what we needed! Luckily this feature has been added in Docker 17.05. By moving to Docker 17.05 as the minimum supported 版本 we will be able to replace our templated Dockerfile approach with standard Dockerfiles that work out of the box. Thanks to [Frenck][frenck] for notifying us of this new build feature.

This change only impacts people that build 插件 or use 插件 that are built locally. You can check if your 插件 is building locally on the detail page of 插件.

:::tip

If you are an 插件 developer, read [the 文档][publishing-插件] on how to publish your 插件 to Docker Hub. This will greatly improve the 用户 experience.

:::

### 模板 changes

As an 插件 developer, you will only have to change one line in your 模板 to make it compatible with the new system. If you wish, you can also change the default build options for your 图像 using the new [`build.json`][build-file] file.

Old:

```dockerfile
FROM %%BASE_IMAGE%%
```

New:

```dockerfile
ARG BUILD_FROM
FROM $BUILD_FROM
```

### When

The new system will become active with Hass.io 0.64 and Host OS 1.1. Host OS 1.1 is available today. Navigate to Advanced 设置 in the Hass.io 面板 to start the OTA 更新.

We have also updated our build 脚本 and replaced it with a [builder Docker engine][builder]. This builder makes deploying Hass.io components very easy. All basic functionality is supported. If you want more functionality, check out [the builder by the Community Hass.io 插件 project][community-builder].

[hassio-hardware-图像-发布]: https://github.com/home-assistant/hassio-build/releases/tag/1.1

[安装]: /hassio/installation/

[builder]: https://github.com/home-assistant/hassio-builder

[frenck]: https://github.com/frenck

[build-file]: /developers/hassio/addon_config/#插件-extended-build

[插件-repos]: https://community.home-assistant.io/tags/hassio-repository

[community-builder]: https://github.com/hassio-addons/build-env

[intro]: /博客/2017/07/25/introducing-hassio/

[publishing-插件]: /developers/hassio/addon_publishing/#custom-插件
