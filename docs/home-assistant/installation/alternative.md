---
title: 其他安装方式
description: 'Home Assistant 可以通过多种方式安装。以下是其他可选的安装方法。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 其他安装方式

## 替代安装方式

Home Assistant 可以通过多种方式安装。以下是其他可选的安装方法。

## Docker 安装

如果您已经熟悉 Docker，可以在容器中运行 Home Assistant：

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /run/dbus:/run/dbus:ro \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

## 容器安装

Home Assistant Container 是一个独立的容器，与 Home Assistant Operating System 不同，它不包含附加组件商店。

### 先决条件

- 已安装 Docker
- 基本的 Docker 命令知识

### 安装步骤

1. 拉取镜像：
   ```bash
   docker pull ghcr.io/home-assistant/home-assistant:stable
   ```

2. 创建配置目录：
   ```bash
   mkdir -p /path/to/config
   ```

3. 启动容器：
   ```bash
   docker run -d \
     --name homeassistant \
     --privileged \
     --restart=unless-stopped \
     -e TZ=Asia/Shanghai \
     -v /path/to/config:/config \
     --network=host \
     ghcr.io/home-assistant/home-assistant:stable
   ```

## 核心安装

Home Assistant Core 是 Python 虚拟环境中的最小安装。推荐高级用户使用。

### 先决条件

- Python 3.10 或更高版本
- pip 包管理器
- 虚拟环境

### 安装步骤

1. 创建虚拟环境：
   ```bash
   python3 -m venv homeassistant
   ```

2. 激活虚拟环境：
   ```bash
   source homeassistant/bin/activate
   ```

3. 安装 Home Assistant：
   ```bash
   pip install homeassistant
   ```

4. 启动 Home Assistant：
   ```bash
   hass
   ```

## 选择安装方式

| 安装方式 | 推荐用户 | 优点 |
|---------|---------|------|
| Home Assistant OS | 新手 | 完整功能，包含附加组件 |
| Container | 熟悉 Docker 的用户 | 灵活配置 |
| Core | 高级用户 | 最小化安装 |

## 下一步

安装完成后，继续进行 [初始设置](/home-assistant/getting-started/onboarding/)。