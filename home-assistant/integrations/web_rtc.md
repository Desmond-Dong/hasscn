# WebRTC

**WebRTC** 集成是一个内部集成，为 Home Assistant 中的摄像头串流提供 WebRTC 功能。它会在需要时自动设置，无需手动配置。

## 高级配置

要配置您自己的 <abbr title="session traversal utilities for NAT">STUN</abbr> 和 <abbr title="traversal using relays around NAT">TURN</abbr> 服务器，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
web_rtc:
```

```yaml
web_rtc:
  description: 启用 WebRTC 集成。只允许配置一次。
  required: true
  type: map
  keys:
    ice_servers:
      description: STUN 和 TURN 服务器配置列表。
      required: true
      type: list
      keys:
        url:
          description: STUN 或 TURN 服务器 URL。可以是单个 URL，也可以是 URL 列表。
          required: true
          type: string
        username:
          description: TURN 服务器认证用户名。
          required: false
          type: string
        credential:
          description: TURN 服务器认证凭据。
          required: false
          type: string
```

### 配置示例

```yaml
# Example configuration.yaml entry with custom STUN and TURN servers
web_rtc:
  ice_servers:
    # Add an entry for each STUN or TURN server
    - url:
        - "stun:stun.example.com:19302"
        - "stun:stun2.example.com:12345"
    - url: "turn:turn.domain.com"
      username: "username"
      credential: "abc123"
```
