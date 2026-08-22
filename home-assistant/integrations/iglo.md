# iGlo

**iGlo** 集成允许您将 [iGlo Lights](https://www.youtube.com/watch?v=oHTS9ji_v-s) 集成到 Home Assistant 中。

要在您的系统中使用 iGlo 灯，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
light:
  - platform: iglo
    host: 192.168.1.10
```

```yaml
host:
  required: true
  description: 用于连接灯光的 IP 地址。
  type: string
name:
  required: false
  description: 此灯光的名称。
  default: iGlo Light
  type: string
port:
  required: false
  description: 用于连接灯光的端口。
  default: 8080
  type: integer
```
