# 示例

以下示例说明如何与 Supervisor API 交互。

## 使用 cURL 获取网络信息

```bash
curl -sSL -H "Authorization: Bearer $SUPERVISOR_TOKEN" http://supervisor/network/info
```

**响应：**

```json
{
  "result": "ok",
  "data": {
    "interfaces": {
      "eth0": {
        "ip_address": "192.168.1.100/24",
        "gateway": "192.168.1.1",
        "id": "Wired connection 1",
        "type": "802-3-ethernet",
        "nameservers": ["192.168.1.1"],
        "method": "static",
        "primary": true
      }
    }
  }
}
```

## 测试 Supervisor 连通性

```bash
curl -sSL http://supervisor/supervisor/ping
```

**响应：**

```json
{
  "result": "ok",
  "data": {}
}
```
