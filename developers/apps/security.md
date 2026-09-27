Home Assistant 根据 app（以前称为 add-on）所需权限对其进行评级。评级为 6 的 app 非常安全。如果 app 的评级为 1，除非你 100% 确定可以信任该来源，否则不应运行此 app。

## API 角色

要访问 Supervisor API，你需要定义一个角色或以默认模式运行。这仅对 Supervisor API 是必需的，对 Home Assistant proxy 不要求。所有角色都已可以访问默认的 API 调用，不需要任何额外的设置。

### 可用的角色

| Role | Description |
|------|-------------|
| `default` | 可以访问所有 `info` 调用 |
| `homeassistant` | 可以访问所有 Home Assistant API endpoints |
| `backup` | 可以访问所有 backup API endpoints |
| `manager` | 适用于运行 CLI 且需要扩展权限的 Apps |
| `admin` | 可以访问所有 API 调用。这是唯一可以禁用/启用 App protection mode 的角色 |

## 保护

默认情况下，所有 app 都在启用 protection 的模式下运行。此模式防止 app 在系统上获得任何权限。如果 app 需要更多权限，你可以通过该 app 的 API app options 禁用此 protection。但要小心，禁用了 protection 的 app 可能会破坏你的系统！

## 制作安全的 app

作为开发者，请遵循以下最佳实践来确保 app 安全：

* 不要在主机网络上运行
* 创建 AppArmor profile
* 如果不需要写入访问权限，则以只读方式映射文件夹
* 如果需要任何 API 访问权限，请确保不授予不必要的权限
* 签署已发布的镜像（支持的 [publishing workflow](/developers/apps/publishing.md) 可以使用 Cosign 签署镜像）

## 使用 Home Assistant 用户后端

与其允许用户以明文配置设置新的登录凭据，不如使用 Home Assistant [Auth backend](/developers/api/supervisor/endpoints.md#auth)。你可以通过 `auth_api: true` 启用对 API 的访问。现在你可以将登录凭据发送到 auth backend，并在 Home Assistant 中进行验证。

## 使用 Ingress 时验证用户

当 app 通过 supervisor 的 Ingress 访问时，授权用户可以通过其 session token 来识别。supervisor 会为每个请求添加一些标识用户的 header：

| Header name                | Description                                 |
| -------------------------- | ------------------------------------------- |
| X-Remote-User-Id           | 已认证的 Home Assistant 用户 ID            |
| X-Remote-User-Name         | 已认证用户的用户名                          |
| X-Remote-User-Display-Name | 已认证用户的显示名称                        |
