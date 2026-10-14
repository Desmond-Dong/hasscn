如何与 supervisor API 对接的示例。

## 使用 cURL 获取网络信息

```bash
curl -sSL -H "Authorization: Bearer $SUPERVISOR_TOKEN" http://supervisor/network/info
```

**response:**

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

## 向 supervisor 发送 Ping

```bash
curl -sSL http://supervisor/supervisor/ping
```

**response:**

```json
{
  "result": "ok",
  "data": {}
}
```
