# hddtemp

**hddtemp** 集成使用由 [HDDTemp](https://savannah.nongnu.org/projects/hddtemp) 提供的数据。

## 设置

需要在本地或远程系统上启动 `hddtemp`，或让其以守护进程模式运行。

```bash
hddtemp -dF
```

## 配置

若要在您的安装中设置 HDDTemp，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: hddtemp
    disks:
      - /dev/sda1
```

```yaml
name:
  description: 在前端中使用的友好名称。
  required: false
  default: HD Temperature
  type: string
host:
  description: 运行 `hddtemp` 的主机。
  required: false
  default: localhost
  type: string
port:
  description: `hddtemp` 使用的端口。
  required: false
  default: 7634
  type: integer
disks:
  description: "要监控的磁盘。例如：`/dev/sda1`。"
  required: false
  type: list
```
