---
title: "Audible"
---

# Audible 提供者 <img src="/assets/icons/audible-icon.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持从 Audible 流式传输。由 <a href="https://github.com/ztripez" target="_blank" rel="noopener noreferrer">ztripez</a> 贡献和维护。

> [!NOTE]
> 此提供者需要付费订阅

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 否 |
| 自托管本地媒体   | 否 |
| 支持的媒体类型 | 播客 |
| 支持[推荐](/music-assistant/ui/#view-home) | 否 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 否 |
| 最高流媒体质量 | 有损，AAC 可变比特率 |
| 登录方式 | OAuth |

### 其他

- 可以列出 Audible 媒体库
- 将填充有声读物的元数据
- 可以从 Audible 报告的最后位置恢复播放
- 章节导航
- 可以添加多个 Audible 账户。

## 配置

要设置 Audible 提供者，请按照以下步骤操作：

1. 从可用选项中为您的 Audible 账户选择适当的市场。
2. 单击"使用 Audible 验证"按钮启动验证过程。这将打开一个新窗口，将您重定向到 Audible 进行验证。请确保禁用任何弹出窗口阻止程序。
3. 成功登录后，您将看到"页面未找到"消息。这是预期的。从地址栏复制 URL 并将其粘贴到"登录后 URL"文本框中。
4. 单击"验证 Audible URL"按钮检查 URL 并注册提供者。

注意：如果您需要重新验证或更改市场，您将不得不再次进行验证过程。

## 已知问题 / 说明

- 最后播放位置目前不会报告回 Audible
- 切换市场需要重新验证
- 提供者将在 Audible 上注册为设备。如果您删除提供者，它将注销该设备
- 虽然在开发过程中没有出现过注册设备数量的问题，但值得注意的是 Audible 有各种内容许可要求。如果用户的材料有设备许可限制，那么拥有许多注册设备可能会导致问题

## 尚不支持

- 按作者、朗读者、系列等浏览功能
- 搜索功能
- 播客、附加文件和其他与有声读物不直接相关的服务

