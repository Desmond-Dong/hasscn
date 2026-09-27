# Travis-CI

通过此集成，您可以在 Home Assistant 中集成由 [Travis-CI](https://travis-ci.org/) 报告的测试构建结果。

## 设置

创建一个 GitHub [访问令牌](https://github.com/settings/tokens)，并授予以下作用域：

* **read:org**
* **user:email**
* **repo\_deployment**
* **repo:status**
* **write:repo\_hook**

## 配置

要启用此平台，请将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: travisci
    api_key: YOUR_ACCESS_TOKEN
```

```yaml
api_key:
  description: GitHub 的访问令牌。
  required: true
  type: string
branch:
  description: "指定 **state** 条件应使用哪个默认分支。"
  required: false
  default: master
  type: string
monitored_conditions:
  description: 要在前端显示的条件。如果未指定，默认启用以下所有条件。可以监控以下条件。
  required: false
  type: list
  keys:
    last_build_id:
      description: 返回最近一次构建任务的 ID。
    last_build_duration:
      description: 返回最近一次测试任务的运行耗时（秒）。
    last_build_finished_at:
      description: 返回最近一次测试任务完成的时间戳。
    last_build_started_at:
      description: 返回最近一次测试任务开始的时间戳。
    last_build_state:
      description: "返回最近一次测试任务/PR 的状态。可能的值包括：'passed'、'failed' 或 'started'。"
    state:
      description: "返回由 **branch** 参数指定分支的构建测试状态。"
repository:
  description: 要监控的 GitHub 仓库名称。如果未指定，默认启用所有已链接到 Travis-CI 的 GitHub 仓库。
  required: false
  type: list
```
