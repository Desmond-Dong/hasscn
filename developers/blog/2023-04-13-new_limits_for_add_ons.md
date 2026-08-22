随着 Home Assistant OS 10，我们更新到最新的 Docker 发布版本 23.0。在
新的 Docker 版本中，add-on 的最大打开文件描述符数量
更改为无限（接近无限）。

如果您是 add-on 开发者，并且在 Home
Assistant OS 10 上遇到内存不足问题，您可以在
启动服务之前使用 `ulimit -n 1048576` 来应用旧的限制。

背景：在 Home Assistant OS release candidate 阶段，较高的限制对
几个 add-on 来说有问题（Node-RED、Network UPS Tools 和 EMQX
MQTT broker，参见 [Home Assistant OS issue #2438](https://github.com/home-assistant/operating-system/issues/2438)）。
在所有情况下，问题都表现为内存不足错误，
而在上一版 Home Assistant OS 发布的相同硬件上则工作正常。并且
在所有三种情况下，内存都是根据允许的
打开文件描述符数量动态分配的（可通过 `prlimit64` 系统调用确定，
返回的限制为 1073741816）。

我们考虑过恢复旧限制；然而，根据 Docker（moby）仓库中的变更，
使用无限作为限制的开销更少。
因此我们决定保留新的默认值。
