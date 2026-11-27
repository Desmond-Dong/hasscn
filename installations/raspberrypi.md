> For AI agents: the complete documentation index is available at /llms.txt, the full documentation bundle is available at /llms-full.txt.

# 树莓派刷机步骤

## 所需软件

- SD Card 烧录工具：[Balena Etcher](https://etcher.balena.io/) 或 [Raspberry Pi Imager](https://www.raspberrypi.com/software/) 等
- 从本站下载最新的对应的树莓派镜像文件.

## 操作步骤

推荐使用 [Balena Etcher](https://etcher.balena.io/) 或 [Raspberry Pi Imager](https://www.raspberrypi.com/software/) 烧录镜像，二者选其一即可

### Balena Etcher

- 将 SD Card 接入读卡器中，并插在电脑上(Windows/MacOS/Linux)
- 运行 Balena Etcher

![etcher main cn](/static/image/etcher-main-cn.26a86e400f.png)
- "从文件烧录" -> 选择下载到本地的`Home Assistant OS 极速版`镜像文件

![etcher select file cn](/static/image/etcher-select-file-cn.9503ab783d.png)
- "选择目标磁盘" -> 选择您所插入的 SD Card \[!!!请注意不要选错磁盘!!!]

![etcher select target cn](/static/image/etcher-select-target-cn.3839849a96.png)
- 点击"现在烧录！"开始将下载的`Home Assistant OS 极速版`镜像文件烧录到 SD Card中，烧录过程中请不要操作 SD Card

### Raspberry Pi Imager

- 将 SD Card 接入读卡器中，并插在电脑上(Windows/MacOS/Linux)
- 运行  Raspberry Pi Imager

![pi imager main cn](/static/image/pi-imager-main-cn.24eca7dc07.png)
- "选择设备" -> 选择 No filtering

![pi imager device cn](/static/image/pi-imager-device-cn.f09bd26adb.png)
- "选择操作系统" -> 选择 Use custom> 选择下载到本地的`Home Assistant OS 极速版`镜像文件

![pi imager os cn](/static/image/pi-imager-os-cn.5efbedc42a.png)
![pi imager custom cn](/static/image/pi-imager-custom-cn.9607c83d64.png)
- "选择SD卡" -> 选择您所插入的 SD Card \[!!!请注意不要选错磁盘!!!]

![pi imager storage cn](/static/image/pi-imager-storage-cn.3af0da57f5.png)
- 点击"NEXT"-> 允许清空SD卡的所有数据

![pi imager settings cn](/static/image/pi-imager-settings-cn.a7da0f7439.png)
![pi imager clear cn](/static/image/pi-imager-clear-cn.858bcd368d.png)
![pi imager confirm cn](/static/image/pi-imager-confirm-cn.a3204af702.png)
![pi imager flashing cn](/static/image/pi-imager-flashing-cn.6098f525ba.png)
- 开始将下载的`Home Assistant OS 极速版`镜像文件烧录到 SD Card中，烧录过程中请不要操作 SD Card
