我们开始更新 base images 以使用新的 s6-Overlay v3。[迁移文章](https://github.com/just-containers/s6-overlay/blob/master/MOVING-TO-V3.md)也解释了围绕此变更的新可能性。这篇博客文章说明了使用我们的新 base images 所需的最小变更。

我们已经更新了我们的[示例 add-on](https://github.com/home-assistant/addons-example)以包含新的行为。

## 最低要求

如果你的 add-on 的 `config.yaml` 中还没有，请添加 `init: false`。在 V3 中，S6 强制要求正确使用其 init。如果使用 Docker 默认系统 init，启动 add-on 时会看到以下错误：

```
s6-overlay-suexec: fatal: can only run as pid 1
```

确保你的 git repository rootfs 文件夹中的所有可执行/脚本文件已设置执行权限。你可以使用以下命令更新权限：

```sh
$ git update-index --chmod=+x rootfs/etc/service.d/my-service/run
```

如果你在 S6-overlay services 中使用 `finish` 脚本（例如，在出错时停止容器），你需要将 `s6-svscanctl -t /var/run/s6/services` 替换为 `/run/s6/basedir/bin/halt`。

## AppArmor

你需要调整你的 [AppArmor profile](/developers/apps/presentation.md#apparmor) 使其与新 s6-Overlay 配合工作。我们更新了文档中的默认 profile。需要进行以下更改：

```txt
# S6-Overlay
  /init ix,
  /bin/** ix,
  /usr/bin/** ix,
  /run/{s6,s6-rc*,service}/** ix,
  /package/** ix,
  /command/** ix,
  /etc/services.d/** rwix,
  /etc/cont-init.d/** rwix,
  /etc/cont-finish.d/** rwix,
  /run/{,**} rwk,
  /dev/tty rw,
```

## `host_pid` 选项

未启用 protection mode 的 addons 可以在配置中设置 `host_pid: true`。如[文档](https://developers.home-assistant.io/docs/apps/configuration#optional-configuration-options)中所述：

> 允许容器在 host PID namespace 上运行。仅适用于未受保护的 add-ons。

这存在问题，因为 S6 期望自己是 PID 1（这在其[标语](https://github.com/just-containers/s6-overlay#s6-overlay-)中明确说明），而在使用 host PID namespace 时这是不可能的。

在 V2 中，S6 实际上并没有检查自己是否作为 PID 1 运行。这就是为什么过去在此模式下它"能工作"的原因（尽管它需要一些[变通方法](https://github.com/hassio-addons/addon-glances/blob/8575d7903ef4c0a7c49e9ab32e0536bd2eb12dd6/glances/rootfs/bin/s6-nuke)来防止 s6 以此方式运行时破坏系统）。在 V3 中，S6 检查自己是否确实是 PID 1，否则拒绝启动。

要解决此问题，不要在你的 addon 中使用 s6 overlay，因为它不是为此用例设计的。你可以通过用 no-op 脚本覆盖 `/init` 然后使用正常的 docker init 系统来继续使用 addon base images。或者你可以切换到其他 base image（如 stock alpine 或 debian）并添加所需的内容。
