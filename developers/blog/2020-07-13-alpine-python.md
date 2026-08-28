我们的大多数 Containers 使用 Alpine。它是容器的完美发行版，因为它体积小（基于 BusyBox）、支持许多 CPU 架构，并且包系统精简。Alpine 使用 musl 作为其 C 库，而不是更常用的 glibc。

Alpine 与 musl 相比其同类产品相对年轻（分别有 15 年和 9 年的历史），但发展速度显著。由于进展如此之快，基于已不再真实的情况，对两者存在许多误解。本文的目标是解决其中几个问题，以及我们如何解决它们。

本博文无意成为 musl vs. glibc 的争吵。每种用例都不同，有自己的权衡。例如，我们在操作系统中使用 glibc。

对于测试，我使用了 [Docker Python library](https://github.com/docker-library/python) 的镜像，结果发布到我们的 [base images](https://github.com/home-assistant/docker-base)。我使用 pyperformance 进行实验室测试，并使用 Home Assistant 内部 benchmark 工具进行更真实的对比。测试环境运行在与 Docker host 相同的容器内。

## C/POSIX 标准库

我经常读到：Python 在使用 musl 作为默认 C 库时速度较慢。这个事实并不 100% 正确。如果 Python 运行时使用相同的 GCC 和 `-O3` 编译，glibc 版本在实验室基准测试中稍快，但在实际世界中，差异微不足道。Alpine 使用 `-Os` 编译，而大多数其他发行版使用 `-O2` 编译。这导致了 Python 运行时解释器之间常被提及的差异。但使用相同的编译器优化时，基于 musl 的 Python 运行时没有负面副作用。

但有一个变革者，使得基于 musl 的运行时相比基于 glibc 的运行时更实用。它是内存分配器 [jemalloc](http://jemalloc.net/)，一个注重减少碎片和可扩展并发支持的通用 malloc 实现。我在一些关于 Rust 的博文上发现了一个有趣的效果。一些开发者发现 musl 在使用 jemalloc 时比 glibc 快得多，而 glibc 在使用 jemalloc 时反而变慢。可以肯定的是，glibc 和 jemalloc 的好处不在于速度（因为它们优化的是内存管理），但 musl 同时获得两者的好处。虽然纯 musl 和 glibc 之间的差异可以忽略不计，但 musl + jemalloc 与 glibc 之间的差异是实质性的（禁用 GCC 内置内存分配器优化时）。是的，现在的 jemalloc 与 musl 兼容（曾经有一段时间不兼容）。

## 编译器

如何编译 Python 也很重要。Fedora 或 Redhat 曾有关于禁用 `semantic-interposition` 以获得高性能提升的声明。我在 GCC 9.3.0 上无法重现这一点，但也未看到任何不良副作用。我建议禁用语义（如内置分配器优化）并在构建时链接 jemalloc。我也建议使用 `-O3` 优化。我们从未在目标平台上看到这些激进优化引发任何问题。需要说明的是，与发行版的 Python 运行时解释器不同，我们不需要在所有地方运行。因此，我们可以不加任何覆盖地使用 `--enable-optimizations` 并添加更多 flags。我可以肯定地说，PGO/LTO/O3 使 Python 更快，并且在我们的目标 CPU 上有效。

## Python 包

Alpine 使用 musl 确实没有 manylinux 兼容性。如果你不缓存构建，安装需要 C extensions 的包时，需要编译它们。这个过程需要时间，就像使用 Qemu 为不同 CPU 架构 cross-build 一样。你无法从 PyPi 获取预编译的二进制文件。这对我们不是问题，因为 PyPI 上提供的二进制文件大多不为我们的目标系统优化。

为了解决 Python 包的安装时间问题，我们创建了自己的 [wheel index](https://wheels.home-assistant.io/) 和 [backend](https://github.com/home-assistant/wheels)，用于编译所有需要的 wheels，并通过 CI agents 保持最新。我们为每种 CPU 架构预构建了超过 1k 个包，Docker 文件的构建时间已不再重要。

## Alpine Linux

Alpine 是容器的优秀基础系统，使我们能够为用户提供最佳体验。非常感谢 Alpine Linux、musl 和 jemalloc，使这一切成为可能。

下表显示了 Alpine Linux 的 Python 运行时与我们优化（GCC 9.3.0/musl）的结果对比。所有测试均使用 Python 3.8.3 进行。

| Benchmark               | Alpine   | Optimized                     |
| ----------------------- | -------- | ----------------------------- |
| 2to3                    | 924 ms   | 699 ms: 1.32x faster (-24%)   |
| chameleon               | 37.9 ms  | 25.6 ms: 1.48x faster (-33%)  |
| chaos                   | 393 ms   | 273 ms: 1.44x faster (-31%)   |
| crypto\_pyaes            | 373 ms   | 245 ms: 1.52x faster (-34%)   |
| deltablue               | 22.8 ms  | 16.4 ms: 1.39x faster (-28%)  |
| django\_template         | 184 ms   | 145 ms: 1.27x faster (-21%)   |
| dulwich\_log             | 157 ms   | 122 ms: 1.29x faster (-22%)   |
| fannkuch                | 1.81 sec | 1.32 sec: 1.38x faster (-27%) |
| float                   | 363 ms   | 263 ms: 1.38x faster (-28%)   |
| genshi\_text             | 113 ms   | 83.9 ms: 1.34x faster (-26%)  |
| genshi\_xml              | 226 ms   | 171 ms: 1.32x faster (-24%)   |
| go                      | 816 ms   | 598 ms: 1.36x faster (-27%)   |
| hexiom                  | 36.8 ms  | 24.2 ms: 1.52x faster (-34%)  |
| json\_dumps              | 34.8 ms  | 25.6 ms: 1.36x faster (-26%)  |
| json\_loads              | 61.2 us  | 47.4 us: 1.29x faster (-23%)  |
| logging\_format          | 30.0 us  | 23.5 us: 1.28x faster (-22%)  |
| logging\_silent          | 673 ns   | 486 ns: 1.39x faster (-28%)   |
| logging\_simple          | 27.2 us  | 21.3 us: 1.27x faster (-22%)  |
| mako                    | 54.5 ms  | 35.6 ms: 1.53x faster (-35%)  |
| meteor\_contest          | 344 ms   | 219 ms: 1.57x faster (-36%)   |
| nbody                   | 526 ms   | 305 ms: 1.73x faster (-42%)   |
| nqueens                 | 368 ms   | 246 ms: 1.49x faster (-33%)   |
| pathlib                 | 64.4 ms  | 45.2 ms: 1.42x faster (-30%)  |
| pickle                  | 20.3 us  | 17.1 us: 1.19x faster (-16%)  |
| pickle\_dict             | 40.2 us  | 33.6 us: 1.20x faster (-16%)  |
| pickle\_list             | 6.77 us  | 5.88 us: 1.15x faster (-13%)  |
| pickle\_pure\_python      | 1.85 ms  | 1.27 ms: 1.45x faster (-31%)  |
| pidigits                | 274 ms   | 222 ms: 1.24x faster (-19%)   |
| pyflate                 | 2.53 sec | 1.74 sec: 1.45x faster (-31%) |
| python\_startup          | 14.9 ms  | 12.1 ms: 1.23x faster (-19%)  |
| python\_startup\_no\_site  | 9.84 ms  | 8.24 ms: 1.19x faster (-16%)  |
| raytrace                | 1.61 sec | 1.23 sec: 1.30x faster (-23%) |
| regex\_compile           | 547 ms   | 398 ms: 1.38x faster (-27%)   |
| regex\_dna               | 445 ms   | 484 ms: 1.09x slower (+9%)    |
| regex\_effbot            | 10.3 ms  | 9.96 ms: 1.03x faster (-3%)   |
| regex\_v8                | 81.8 ms  | 71.6 ms: 1.14x faster (-12%)  |
| richards                | 265 ms   | 182 ms: 1.46x faster (-31%)   |
| scimark\_fft             | 1.31 sec | 851 ms: 1.54x faster (-35%)   |
| scimark\_lu              | 616 ms   | 384 ms: 1.61x faster (-38%)   |
| scimark\_monte\_carlo     | 390 ms   | 248 ms: 1.57x faster (-36%)   |
| scimark\_sor             | 838 ms   | 571 ms: 1.47x faster (-32%)   |
| scimark\_sparse\_mat\_mult | 19.0 ms  | 13.2 ms: 1.43x faster (-30%)  |
| spectral\_norm           | 567 ms   | 388 ms: 1.46x faster (-32%)   |
| sqlalchemy\_declarative  | 364 ms   | 286 ms: 1.27x faster (-21%)   |
| sqlalchemy\_imperative   | 60.3 ms  | 46.8 ms: 1.29x faster (-22%)  |
| sqlite\_synth            | 6.88 us  | 5.09 us: 1.35x faster (-26%)  |
| sympy\_expand            | 1.39 sec | 1.05 sec: 1.32x faster (-24%) |
| sympy\_integrate         | 67.3 ms  | 49.5 ms: 1.36x faster (-26%)  |
| sympy\_sum               | 505 ms   | 389 ms: 1.30x faster (-23%)   |
| sympy\_str               | 945 ms   | 656 ms: 1.44x faster (-31%)   |
| telco                   | 17.9 ms  | 12.5 ms: 1.44x faster (-31%)  |
| tornado\_http            | 347 ms   | 273 ms: 1.27x faster (-21%)   |
| unpack\_sequence         | 232 ns   | 212 ns: 1.09x faster (-9%)    |
| unpickle                | 41.6 us  | 30.7 us: 1.36x faster (-26%)  |
| unpickle\_list           | 10.5 us  | 9.24 us: 1.14x faster (-12%)  |
| unpickle\_pure\_python    | 1.28 ms  | 945 us: 1.36x faster (-26%)   |
| xml\_etree\_parse         | 335 ms   | 292 ms: 1.15x faster (-13%)   |
| xml\_etree\_iterparse     | 281 ms   | 226 ms: 1.24x faster (-20%)   |
| xml\_etree\_generate      | 330 ms   | 219 ms: 1.51x faster (-34%)   |
| xml\_etree\_process       | 263 ms   | 181 ms: 1.45x faster (-31%)   |
