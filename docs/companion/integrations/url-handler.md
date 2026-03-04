---
title: "URL 处理器"
id: 'url-handler'
---

Home Assistant 支持通过 URL 从其他应用打开。

## 平台兼容性

不同类型深度链接的平台支持会有所不同，请查阅下表了解您的平台可用的深度链接类型。

<table className="core-table">
  <thead>
    <tr>
      <th><strong>深度链接类型</strong></th>
      <th><img alt="Android" src="/companion-assets/android.svg" /> Android</th>
      <th><img alt="iOS" src="/companion-assets/iOS.svg" /> & <img alt="macOS" src="/companion-assets/macOS.svg" /></th>
      </tr>
  </thead>
    <tbody>
      <tr>
        <td>导航</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>调用服务</td>
        <td></td>
        <td>✅</td>
      </tr>
        <tr>
        <td>触发事件</td>
        <td></td>
        <td>✅</td>
      </tr>
        <tr>
        <td>发送位置</td>
        <td></td>
        <td>✅</td>
      </tr>
    </tbody>
</table>

## 导航
这允许您通过深度链接更新前端页面位置。要构建深度链接，请按照以下步骤操作：

1. 在 Web 应用中导航到您想要深度链接的链接，例如 `http://homeassistant.local:8123/dashboard-mobile/my-subview`
2. 复制 URL 的路径部分，在这个例子中是 `/dashboard-mobile/my-subview`
3. 通过以 `homeassistant://navigate` 开头并添加路径来构建您的 URL，例如 `homeassistant://navigate/dashboard-mobile/my-subview`

:::info
默认情况下，如果您有多个服务器，应用会询问您要导航到哪个服务器。
要定义您要导航到哪个服务器，请使用查询参数 `?server=`，如下例所示：<br /><br />
当您的服务器名称是 `My Home` 时使用 `homeassistant://navigate/webcams?server=My%20home`，或者如果您想导航到第一个可用服务器，请使用 `?server=default`。
:::

## 调用服务
示例：`homeassistant://call_service/device_tracker.see?entity_id=device_tracker.entity`

查询参数作为字典传递到调用中。

:::info
如果多个服务器连接到一个应用，`call_service` 链接将使用列表中的第一个服务器处理。
:::

## 触发事件
您可以创建一个[事件触发器](https://www.home-assistant.io/docs/automation/trigger/#event-trigger)并触发该事件。

示例：`homeassistant://fire_event/custom_event?entity_id=MY_CUSTOM_EVENT`

查询参数作为字典传递到调用中。

:::info
如果多个服务器连接到一个应用，`fire_event` 链接将使用列表中的第一个服务器处理。
:::

## 发送位置
示例：`homeassistant://send_location/`