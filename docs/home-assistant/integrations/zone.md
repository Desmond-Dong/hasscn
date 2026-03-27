---
title: 区域
description: '区域允许你在地图上指定特定范围。它们可用于区域在家检测(/home-assistant/getting-started/presence-detection/)。这些信息可用于自动化，比如你离家后启动扫地机器人，或离开办公室时提前开启家中供暖。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Organization
  - Presence detection
ha_release: 0.69
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: zone
ha_integration_type: system
related:
  - docs: /docs/configuration/basic/
    title: Editing basic settings
  - docs: /docs/organizing/areas/
    title: Areas
  - docs: /getting-started/onboarding/
    title: Onboarding
  - docs: /getting-started/presence-detection/
    title: Presence detection
---
# 区域

区域允许你在地图上指定特定范围。它们可用于[区域在家检测](/home-assistant/getting-started/presence-detection/)。这些信息可用于自动化，比如你离家后启动扫地机器人，或离开办公室时提前开启家中供暖。

请为每个需要自动化的地点创建一个区域，比如公司、学校和家。可以使用不同技术来检测这些区域中的在家状态，常见方式是基于手机应用的位置检测。

<p class='img'>
    <img src="/home-assistant/images/screenshots/map.png" alt="Screenshot of a map dashboard in Home Assistant showing a school, work and home zone and two people."/>
    地图仪表板展示了学校、公司和家庭区域，以及两个人的位置。
</p>

## 关于家庭区域

在[入门设置流程](/home-assistant/getting-started/onboarding/)中，Home Assistant 会询问你的家庭位置。你可以手动输入，或让 Home Assistant 自动检测。这个位置会用于创建半径 100&nbsp;m 的家庭区域。家庭区域是一个预定义的特殊区域，具有一些不同于其他区域的特性。

- 该区域名称由你的 Home Assistant 安装名称决定（默认是 "Home"）。
- 家庭区域无法删除，并且在区域配置页面会显示家庭图标。
- 家庭区域的位置会被基于地理位置的集成使用。比如 [Sun 集成](/home-assistant/integrations/sun/) 会用它来计算太阳相对你家的位置。
- 在入门流程中，Home Assistant 会用该位置设置单位制和时区等参数。如果你之后修改位置，单位制和时区将不再自动更新。
- 位于家庭区域内的设备不会显示在 Home Assistant 的地图中。比如你使用手机进行在家检测时，在家时不会在地图仪表板上看到手机位置。

## 添加新区域或编辑区域

1. 前往 [**Settings** > **Areas, labels & zones**](https://my.home-assistant.io/redirect/zones/)。
2. 如需编辑现有区域，选择编辑按钮 `[mdi:edit]`。如需新增区域，选择 **Add zone**。
3. 为区域命名，例如 `Nina's office` 或 `school`。
   - 家庭区域始终使用 Home Assistant 安装名称。要更改家庭名称，请前往 [**Settings** > **System** > **General**](https://my.home-assistant.io/redirect/general/)。
4. 从 [Material Design Icons](https://pictogrammers.com/library/mdi/) 选择图标，并以 `mdi:` 作为前缀。
   - 例如 `mdi:school`、`mdi:briefcase`、`mdi:home`、`mdi:cart` 或 `mdi:castle`。
   - 家庭区域的图标不可更改。
5. 要更改位置或半径，请在 **Edit location** 下选择编辑。
   - 调整位置时，可直接输入 GPS 坐标，或在地图上拖动图标
   - 调整区域半径时，可拖动区域圆大小，或直接编辑以米为单位的 **Radius**

    ![Screenshot of the UI for adding or editing a zone](/home-assistant/images/integrations/zone/zone_edit_ui.png)

6. 如果你希望在前端隐藏该区域，并且不把它用于设备追踪器状态，请启用 **Passive**。你仍然可以在自动化中使用它。
   - 家庭区域不提供 **Passive** 选项。
7. 要保存更改，请选择 **Update**。

## 在 YAML 中编辑区域

区域也可以通过 "`configuration.yaml`" 配置。如果你在 YAML 中定义这些设置，它们将无法在 UI 中编辑，并显示为灰色。

```yaml
# Example configuration.yaml entry
zone:
  - name: School
    latitude: 32.8773367
    longitude: -117.2494053
    radius: 250
    icon: mdi:school

  - name: Work
    latitude: 32.8753367
    longitude: -117.2474053

  # This will override the default home zone
  - name: Home
    latitude: 32.8793367
    longitude: -117.2474053
    radius: 100
    icon: mdi:account-multiple
```

```yaml
name:
  description: 区域显示名称。
  required: true
  type: string
latitude:
  description: 区域中心点的纬度。
  required: true
  type: float
longitude:
  description: 区域中心点的经度。
  required: true
  type: float
radius:
  description: 区域半径（单位：米）。
  required: false
  type: integer
  default: 100
icon:
  description: 用于替代名称显示的图标。
  required: false
  type: string
passive:
  description: 仅将区域用于自动化，并在前端隐藏，同时不用于设备追踪器状态。
  required: false
  type: boolean
  default: false
```

如需查找某个地点的经纬度，你可以使用 [Google Maps](https://www.google.com/maps/) 或 [Bing Maps](https://www.bing.com/maps)。在 Bing 中右键并复制坐标，或在 Google 中选择 "What is here?"。

## 状态

区域的状态是一个数字，表示当前位于该区域内的
[persons](https://my.home-assistant.io/redirect/people/) 数量。

区域内人数对自动化很有帮助，比如判断是否有人在家、是否独自在家，或者是否所有人都不在家。这个逻辑同样适用于其他区域。
