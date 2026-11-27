> For AI agents: the complete documentation index is available at /llms.txt, the full documentation bundle is available at /llms-full.txt.

# QNAP QSW

此集成可与 [QNAP QSW 网管交换机](https://www.qnap.com/en/product/series/qsw-managed-switches)的本地 API 交互。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
URL:
  description: "设备 URL（通常为 http://IP）"
Username:
  description: "用户名（通常为 admin）"
Password:
  description: "密码"
```

## 二进制传感器

会创建以&#x4E0B;_&#x4E8C;进制传感器_：

| 二进制传感器  | 说明    |
| :------ | :---- |
| anomaly | 设备异常。 |

每个端口（或 LACP）都会创建以&#x4E0B;_&#x4E8C;进制传感器_：

| 二进制传感器 | 说明    |
| :----- | :---- |
| link   | 链路状态。 |

## 按钮

会创建以&#x4E0B;_&#x6309;钮_：

| 按钮     | 说明    |
| :----- | :---- |
| reboot | 重启设备。 |

## 传感器

会创建以&#x4E0B;_&#x4F20;感器_：

| 传感器         | 说明        |
| :---------- | :-------- |
| fan_1_speed | 风扇 1 转速。  |
| fan_2_speed | 风扇 2 转速。  |
| ports       | 已使用的端口数量。 |
| rx          | RX 总字节数。  |
| rx_errors   | RX 错误总数。  |
| rx_speed    | RX 总速率。   |
| temperature | 交换机温度。    |
| tx          | TX 总字节数。  |
| tx_speed    | TX 总速率。   |
| uptime      | 运行时长（秒）。  |

每个端口（或 LACP）都会创建以&#x4E0B;_&#x4F20;感器_：

| 传感器        | 说明       |
| :--------- | :------- |
| link_speed | 链路速率。    |
| rx         | RX 字节数。  |
| rx_errors  | RX 错误数量。 |
| rx_speed   | RX 速率。   |
| tx         | TX 字节数。  |
| tx_speed   | TX 速率。   |

## 更新

| 更新实体            | 说明      |
| :-------------- | :------ |
| firmware_update | 固件更新状态。 |

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
