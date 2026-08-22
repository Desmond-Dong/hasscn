# FreeDNS

通过 **FreeDNS** 集成，您可以让 [FreeDNS](https://freedns.afraid.org) 记录保持最新。

## 设置（默认 API V1）

您需要先确定更新 URL 或访问令牌。

1. 前往 [FreeDNS](https://freedns.afraid.org) 网站并登录您的账户。
2. 选择菜单中的 "Dynamic DNS"。
3. 此时您应当能在页面底部的表格中看到可更新的记录。
4. 复制 "Direct URL" 的链接地址。
5. 访问令牌就是该链接末尾的部分：`https://freedns.afraid.org/dynamic/update.php?YOUR_UPDATE_TOKEN`
6. 您可以将令牌填入 `access_token`，或者将完整 URL 填入 `url` 属性。

## 配置（API V1）

要在您的安装中使用该集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
freedns:
  access_token: YOUR_TOKEN
```

## 设置（API V2）

您需要先确定更新 URL 或访问令牌。

1. 前往 [FreeDNS](https://freedns.afraid.org) 网站并登录您的账户。
2. 选择菜单中的 "Dynamic DNS"。
3. 此时您应当能在页面底部的表格中看到可更新的记录。
4. 前往 [Version 2](https://freedns.afraid.org/dynamic/v2/) 页面，并启用相应记录。
5. 访问令牌是链接末尾的部分：`http://sync.afraid.org/u/RANDOMIZED_TOKEN/`
6. 将完整 URL 填入 `url` 属性。
7. 除了 Version 2 中的随机令牌 URL 外，也可以使用其他形式的 URL。

## 配置（API V2）

要在您的安装中使用该集成，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
freedns:
  url: http://sync.afraid.org/u/RANDOMIZED_TOKEN/
```

```yaml
  access_token:
    description: 您的访问令牌。与 `url` 互斥。
    required: false
    type: string
  url:
    description: 完整的更新 URL。与 `access_token` 互斥。
    required: false
    type: string
  scan_interval:
    description: 调用更新服务的频率。
    required: false
    type: time
    default: 10 minutes
```
