---
title: "Alexa"
---

# Alexa 设备 <img src="/assets/icons/alexa-icon.png" alt="Preview image" style="width: 70px; float: right;"  loading="lazy" />

<img src="/assets/label-expert.png" alt="Expert icon" style="width: 128px;"  loading="lazy" /> <img src="/assets/label-experimental.png" alt="Experimental icon" style="width: 133px;"  loading="lazy" />

Music Assistant 支持 Alexa 设备。此组件由 <a href="https://github.com/alams154" target="_blank" rel="noopener noreferrer">Sameer Alam</a> 贡献和维护。

## 功能

- 检测链接到您 Amazon 帐户的所有 Alexa 设备并将其注册为播放器
- 在 Alexa 设备上控制播放（播放、暂停）
- 在 Alexa 设备上设置和静音音量

## 设置

除了[单个播放器设置](/music-assistant/settings/individual-player/)外，Alexa 提供商在高级部分还有一个独特设置和一个独特的预设部分

- <b>高级 - 启用显示支持。</b> ...................

## 配置

### 1. 设置 Music Assistant Alexa Skill 原型
使用 Docker Compose 运行（推荐）：

- 从原型仓库（`https://github.com/alams154/music-assistant-alexa-skill-prototype`）复制 `docker-compose.yml`，确保已安装 Docker 和 Docker Compose。
- 在 `docker-compose.yml` 旁边创建 `secrets/` 目录，并添加以下文件（相对于 compose 文件）：

  - `./secrets/api_username.txt` — 包含您的 API 用户名
  - `./secrets/api_password.txt` — 包含您的 API 密码

- 根据需要编辑 `docker-compose.yml` 中的环境变量（例如：`MA_HOSTNAME`、`PORT`）。
- 启动服务：

  ```sh
  docker compose up -d
  ```

- 默认情况下，服务将在 `http://localhost:5000`（或您配置的 IP/端口）上可用。
- 在浏览器中，打开 `http://localhost:5000/setup` 的设置 UI。设置页面将：
   - 检测现有的持久 ASK 凭据（如果存在）并跳过基于浏览器的认证流程
   - 如果凭据不存在，指导您完成 ASK CLI 授权流程
   - 运行自动技能创建/更新、交互模型上传、模型构建轮询和测试启用。
- 在浏览器中，打开 `http://localhost:5000/status` 的状态 UI 检查技能状态

### 2. 使用 SSL 证书设置代理
- 在技能原型服务（默认端口：5000）和 Music Assistant 流媒体端口（默认端口：8097）前配置反向代理（如 Nginx 或 Caddy）[如果仅使用 APL 设备则可选]
- 为您的域获取并安装有效的 SSL 证书（例如使用 Let's Encrypt）
- 确保原型和 Music Assistant 流媒体端点 [如果仅使用 APL 设备则可选] 都可通过 HTTPS（端口：443）访问，因为 Alexa 需要安全端点

### 3. 在 Alexa 开发者控制台中设置 Alexa Skill

1. 转到 <a href="https://developer.amazon.com/alexa/console/ask" target="_blank" rel="noopener noreferrer">Alexa 开发者控制台</a> 并点击 **创建技能**。
2. 选择技能名称（例如：**Music Assistant**）并选择您的默认语言/区域。
3. 选择 **音乐和音频** 作为体验，选择 **自定义** 作为模型。
4. 对于托管，选择 **自行配置**（不是 Alexa 托管），这样您可以将技能指向原型服务。
5. 选择 **从头开始** 模板并创建技能。
6. 在技能设置中：
  - 打开 **调用名称** 并将调用设置为 `music assistant`，然后保存。
  - 打开 **端点** 并将其设置为 **HTTPS**。在默认区域填写您的公共 HTTPS 端点（原型服务的反向代理地址），如果适用，选择通配符证书选项。
7. 在 **交互模型 → 意图** 下，添加名为 `PlayAudio` 的意图，示例话语如 `play audio`、`start` 和 `play`，然后构建模型。
8. 在 **接口** 下，启用 **音频播放器** 和 **Alexa Presentation Language** 接口并保存更改。
9. 转到 **测试** 标签页，通过切换到 **开发** 启用测试。

**摘要：**  
技能原型作为单独的服务器运行，必须设置带有 SSL 证书的代理，创建并配置 Alexa 技能，然后 Music Assistant 播放现在应该在您的 Alexa 设备上启用。

### 登录流程

- 需要 Amazon 帐户凭据（电子邮件和密码）
- 需要 Amazon 帐户的双重认证代码生成
    - 在配置屏幕上填写所需信息（电子邮件和密码）
    - 按 `使用 Amazon 认证` 按钮
    - 填写凭据后点击 `登录` 单选按钮，然后点击蓝色的大 `登录` 按钮（这将失败）
    - 关闭该标签页，点击"如果弹出窗口没有打开，请点击这里"
    - 在 Amazon 登录页面上继续登录

## 已知问题 / 注意事项

- 如果使用太频繁，命令有时会在控制设备时失败（这是 Alexa API 的限制）
- 状态报告有问题，因此 MA UI 中显示的播放状态和音量可能不反映实际情况
- 公告和自定义命令可能根据设备和地区有有限支持

## 尚不支持

- 多房间同步播放（真正的 Alexa 多房间音乐）
- 高级播放功能（例如，随机播放、重复、淡入淡出）

