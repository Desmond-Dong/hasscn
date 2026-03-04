---
title: "gPodder"
---

# gPodder 提供者 <img src="/assets/icons/gpodder-icon.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 <a href="https://gpodder.github.io" target="_blank" rel="noopener noreferrer">gPodder</a>。由 <a href="https://github.com/fmunkes" target="_blank" rel="noopener noreferrer">Fabian Munkes</a> 贡献和维护。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 是 |
| 自托管本地媒体  | 否 |
| 支持的媒体类型 | 播客 |
| 支持[推荐](/music-assistant/ui/#view-home) | 否 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 否 |
| 最高流媒体质量 | 有损，可变质量 |
| 登录方式 | 密码或 Nextcloud 登录 |

### 其他
- 进度报告和获取
- 用播客填充媒体库
- 在定期提供者同步时更新播放日志

## 配置
### gpodder.net 兼容网络服务
支持 <a href="https://github.com/gpodder/mygpo" target="_blank" rel="noopener noreferrer">mygpo</a> 兼容的网络服务，此提供者已针对
<a href="https://github.com/kd2org/opodsync" target="_blank" rel="noopener noreferrer">opodsync</a> 进行测试
要设置此功能，您需要：

- <b>gPodder 服务 URL。</b> 例如，`http://192.168.1.20:14000` 或 `https://sync.yourdomain.com`
- <b>用户名。</b>
- <b>密码。</b>
- <b>设备 ID。</b>

> [!NOTE]
> 设备 ID 可以是任何 ASCII 字符串，但请记住，这是用于同步的。其他客户端必须使用相同的设备 ID

> [!NOTE]
> 故意不支持 `gpodder.net`。提供者依赖频繁的 API 调用，而那里托管的服务已知要么很慢要么完全无响应，这将减慢 MA。考虑使用本地托管的替代方案。

### nextcloud-gpodder
提供者支持 <a href="https://apps.nextcloud.com/apps/gpoddersync" target="_blank" rel="noopener noreferrer">nextcloud-gpodder/gpoddersync</a>。

要设置此功能，您需要 `Nextcloud URL`，然后单击使用 NEXTCLOUD 验证按钮启动验证流程。完成后单击保存

### 多用户环境

gpodder 提供者可以为不同用户设置多次。
要实现与 MA 用户的单个媒体项目进度的正确同步，请参阅[用户管理](/music-assistant/settings/user-management/#filter-progress-multi-user)。

### 设置

- <b>最大剧集数。</b> 每个源同步的最大剧集数。使用 0 表示无限制
- <b>高级 - 验证 SSL。</b> 启用以验证 SSL/TLS 连接的证书。默认开启

## 已知问题 / 说明

- 无

