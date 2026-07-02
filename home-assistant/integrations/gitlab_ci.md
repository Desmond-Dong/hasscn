# GitLab-CI

**GitLab-CI** 集成可接入 [GitLab](https://gitlab.com/) 中 CI/CD 流水线作业上报的结果。

## 设置

您需要一个 GitLab 仓库 ID。在 GitLab 仓库的 **Details** 页面中，项目名称下方可以找到 **Project ID:**。

或者，您也可以使用 `GitLab_Username/GitLab_RepositoryName`，例如 `MyCoolUsername/MyCoolRepository`。

还需要一个至少具有 API 权限范围的 GitLab 令牌，您可以在 GitLab 用户设置中的 [GitLab Personal Access Tokens](https://gitlab.com/profile/personal_access_tokens) 页面创建。

## 配置

若要启用此集成，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: gitlab_ci
    gitlab_id: YOUR_GITLAB_ID
    token: YOUR_GITLAB_TOKEN
```

```yaml
gitlab_id:
  description: GitLab 仓库标识符。
  required: true
  type: string
token:
  description: GitLab API 令牌。
  required: true
  type: string
name:
  description: 该传感器在 Home Assistant 中显示的名称。
  required: false
  type: string
  default: GitLab CI Status
url:
  description: GitLab 仓库 URL。用于自托管仓库。
  required: false
  type: string
  default: https://gitlab.com
```
