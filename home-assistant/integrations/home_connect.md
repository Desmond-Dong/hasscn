# Home Connect

**Home Connect** 集成可让你通过[官方云端 API](https://developer.home-connect.com)接入支持 Home Connect 标准的 Bosch 和 Siemens 家电。

## 使用场景

* 监控设备的多个传感器，并基于这些传感器触发自动化。
* 在仪表板中启动设备程序。
* 监控设备程序状态。
* 控制设备灯光。
* 调整设备设置。

:::note
请注意，具体支持哪些功能取决于设备本身以及 API 权限。

:::

## 支持的设备

你可以在 [Home Connect 网站](https://www.home-connect.com/global/smart-home-appliances)查看受支持设备信息。

## 前提条件

1. 访问 <https://developer.home-connect.com> 并注册开发者账号。
2. 在注册流程中的 "Default Home Connect User Account for Testing" 处，填写你用于原版 Bosch/Siemens Home Connect App 的登录邮箱。
3. 前往 [Applications](https://developer.home-connect.com/applications) 页面并选择 [Register Application](https://developer.home-connect.com/application/add)：

* Application ID: Home Assistant（或你认为合适的名称）
* OAuth Flow: Authorization Code Grant Flow
* Redirect URI: `https://my.home-assistant.io/redirect/oauth`
* 前往 `https://my.home-assistant.io/` 并确认已设置你的 Home Assistant URL。例如：`http://homeassistant:8123/` 或 `http://homeassistant.local:8123`

4. 成功后，你会被重定向到 **Applications** 页面。为你的应用选择 **Details**。记下 Client ID 和 Secret，这些信息将在下一步使用。然后退出 Home Connect 开发者门户。
5. 在 Home Assistant 中找到并启动 Home Connect 集成。系统会提示你创建 [Application Credential](https://www.home-assistant.io/integrations/application_credentials)。除了上一步的 Client ID 和 Secret 外，你还需要提供一个名称（可自定义）。然后按界面步骤完成设置。

:::important

* 要更新设备程序列表，你可以在设备开机时重新加载 Home Connect 集成。如果重新加载未触发重新初始化，请在设备开机时重启 Home Assistant。
* 完成上述步骤后，请从你的 Home Connect Developer 账号中[退出登录](https://developer.home-connect.com/user/logout)。否则，下面的配置步骤会在 OAuth 认证期间失败，并显示 `“error”: “unauthorized_client”`。
* 提供的 Home Connect 用户账号邮箱**必须**全部小写，否则会导致身份验证失败。
* 开发者门户中的所有更改都需要 15 分钟后才会生效。

:::

<details>
<summary>我已手动禁用 My Home Assistant</summary>

如果你的安装中没有 [My Home Assistant](/home-assistant/integrations/my.md)，
你可以改用 `<HOME_ASSISTANT_URL>/auth/external/callback`
作为重定向 URI。

`<HOME_ASSISTANT_URL>` 必须与配置/认证流程中使用的地址一致。

内网示例：`http://192.168.0.2:8123/auth/external/callback`、`http://homeassistant.local:8123/auth/external/callback`。

</details>

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

集成配置会要求你填写上面创建的 *Client ID* 和 *Client Secret*。更多信息请参阅 [Application Credentials](/home-assistant/integrations/application_credentials.md)。

## 支持的功能

:::note

* 实体可用性取决于设备类型，但设备不一定支持该类型下的所有实体。
* 程序选项实体仅会在其在“已选程序”或“当前运行程序”中可用后，由集成提供。
* 某些设备在关机时不会上报数据，因此相关实体在集成加载后，需等设备开机才会出现。

:::

### 二进制传感器

<details>
<summary>二进制传感器列表</summary>

* **连接状态**:
  * **说明**: 显示设备的连接状态。
  * **可用性**: 所有设备
* **远程控制**:
  * **说明**: 指示是否已启用远程控制。
  * **可用性**: 灶台、油烟机、烤箱、保温抽屉、洗碗机、洗衣机、烘干机、洗烘一体机
* **远程启动**:
  * **说明**: 指示程序是否可远程启动。
  * **可用性**: 咖啡机、油烟机、烤箱、保温抽屉、洗碗机、洗衣机、烘干机、洗烘一体机
* **本地控制**:
  * **说明**: 指示家电当前是否正由用户在设备端进行物理操作。
  * **可用性**: 咖啡机、灶台、油烟机、烤箱、保温抽屉、洗衣机、烘干机、洗烘一体机
* **饮料冷藏室门**:
  * **说明**: 指示饮料冷藏室门是否打开。
  * **可用性**: 冰箱冷冻组合、冰箱
* **通用冷藏室门**:
  * **说明**: 指示通用冷藏室门是否打开。
  * **可用性**: 冰箱冷冻组合、冰箱
* **冷却室门**:
  * **说明**: 指示冷却室门是否打开。
  * **可用性**: 冰箱冷冻组合、冰箱
* **左侧冷藏室门**:
  * **说明**: 指示左侧冷藏室门是否打开。
  * **可用性**: 冰箱冷冻组合、冰箱
* **右侧冷藏室门**:
  * **说明**: 指示右侧冷藏室门是否打开。
  * **可用性**: 冰箱冷冻组合、冰箱
* **灵活分区门**:
  * **说明**: 指示灵活分区门是否打开。
  * **可用性**: 冰箱冷冻组合
* **冷冻室门**:
  * **说明**: 指示冷冻室门是否打开。
  * **可用性**: 冷冻柜、冰箱冷冻组合
* **冷藏室门（冰箱门）**:
  * **说明**: 指示冰箱门是否打开。
  * **可用性**: 冰箱冷冻组合、冰箱
* **酒柜门**:
  * **说明**: 指示酒柜门是否打开。
  * **可用性**: 酒柜
* **电池充电状态**:
  * **说明**: 描述设备当前是在充电还是放电。
  * **可用性**: 清洁机器人
* **充电连接状态**:
  * **说明**: 指示设备当前是已连接还是已断开。
  * **可用性**: 清洁机器人

</details>

### 按钮

<details>
<summary>按钮列表</summary>

* **停止程序**:
  * **说明**: 停止当前正在运行的程序。
  * **可用性**: 所有带程序的设备
* **暂停程序**
  * **说明**: 暂停当前正在运行的程序。
  * **可用性**: 烤箱、清洁机器人、洗衣机、烘干机、洗烘一体机
* **恢复程序**
  * **说明**: 恢复已暂停的程序。
  * **可用性**: 烤箱、清洁机器人、洗碗机、洗衣机、烘干机、洗烘一体机
* **开门**
  * **说明**: 打开设备门。
  * **可用性**: 烤箱、冷冻柜、冰箱冷冻组合、冰箱
* **部分开门**
  * **说明**: 将设备门部分打开。
  * **可用性**: 烤箱

</details>

### 灯光

<details>
<summary>灯光实体列表</summary>

* **内部照明**:
  * **说明**: 控制制冷设备的内部照明。
  * **可用性**: 冷冻柜、冰箱冷冻组合、冰箱、酒柜
  * **控制项**: 开/关、亮度
* **外部照明**:
  * **说明**: 控制制冷设备的外部照明。
  * **可用性**: 冷冻柜、冰箱冷冻组合、冰箱、酒柜
  * **控制项**: 开/关、亮度
* **功能照明**:
  * **说明**: 控制油烟机的功能照明。
  * **可用性**: 油烟机
  * **控制项**: 开/关、亮度
* **氛围照明**:
  * **说明**: 控制设备的氛围照明。
  * **可用性**: 油烟机、洗碗机
  * **控制项**: 开/关、亮度、HSV、RGB

</details>

### 数值

<details>
<summary>数值实体列表</summary>

#### 设置

* **闹钟**
  * **说明**: 设置闹钟。
  * **可用性**: 灶台、烤箱
* **冷却室目标温度**:
  * **说明**: 设置冷却室温度。
  * **可用性**: 冰箱冷冻组合、冰箱
* **冷冻室目标温度**:
  * **说明**: 设置冷冻室温度。
  * **可用性**: 冷冻柜、冰箱冷冻组合
* **饮料冷藏室目标温度**:
  * **说明**: 设置饮料冷藏室温度。
  * **可用性**: 冰箱冷冻组合、冰箱
* **冷藏室目标温度**:
  * **说明**: 设置冷藏室温度。
  * **可用性**: 冰箱冷冻组合、冰箱
* **左侧冷藏室目标温度**:
  * **说明**: 设置左侧冷藏室温度。
  * **可用性**: 冰箱冷冻组合、冰箱
* **右侧冷藏室目标温度**:
  * **说明**: 设置右侧冷藏室温度。
  * **可用性**: 冰箱冷冻组合、冰箱
* **酒柜目标温度**:
  * **说明**: 设置酒柜温度。
  * **可用性**: 酒柜
* **酒柜 2 目标温度**:
  * **说明**: 设置第二个酒柜分区温度。
  * **可用性**: 酒柜
* **酒柜 3 目标温度**:
  * **说明**: 设置第三个酒柜分区温度。
  * **可用性**: 酒柜
* **色温百分比**:
  * **说明**: 以百分比设置功能照明的色温（暖光：0%，冷光：100%）。要使用该项，需将色温选择实体设为 `custom`。
  * **可用性**: 油烟机
* **i-Dos 1 基础档位**:
  * **说明**: 设置 i-Dos 内容物 1 的基础投放量。
  * **可用性**: 洗衣机、洗烘一体机
* **i-Dos 2 基础档位**:
  * **说明**: 设置 i-Dos 内容物 2 的基础投放量。
  * **可用性**: 洗衣机、洗烘一体机

#### 程序选项

* **运行时长**:
  * **说明**: 定义程序运行时长。到时后设备会停止。
  * **可用性**: 烤箱
* **相对延迟启动**:
  * **说明**: 定义程序何时启动，单位为从现在起的秒数。
  * **可用性**: 烤箱、洗碗机
* **相对结束时间**:
  * **说明**: 定义程序何时结束，单位为从现在起的秒数。
  * **可用性**: 烘干机、洗衣机、洗烘一体机
* **注水量**:
  * **说明**: 描述咖啡机程序中使用的水量（毫升）。
  * **可用性**: 咖啡机
* **目标温度**:
  * **说明**: 定义烤箱腔体目标温度，烤箱会维持该温度。
  * **可用性**: 烤箱

</details>

### 选择

<details>
<summary>选择实体列表</summary>

#### 程序

* **当前运行程序**:
  * **说明**: 表示设备当前运行的程序，选择某个选项会启动该程序。
  * **可用性**: 所有带程序的设备
* **已选程序**:
  * **说明**: 表示设备当前已选中的程序，选择某个选项会将其设为已选程序。
  * **可用性**: 所有带程序的设备

<details>
<summary>程序选项</summary>

这两个实体都可使用以下选项，但具体可用项取决于设备型号。

* **全屋清扫**: `consumer_products_cleaning_robot_program_cleaning_clean_all`
* **地图清扫**: `consumer_products_cleaning_robot_program_cleaning_clean_map`
* **返回充电座**: `consumer_products_cleaning_robot_program_basic_go_home`
* **Ristretto**: `consumer_products_coffee_maker_program_beverage_ristretto`
* **Espresso**: `consumer_products_coffee_maker_program_beverage_espresso`
* **Espresso doppio**: `consumer_products_coffee_maker_program_beverage_espresso_doppio`
* **咖啡**: `consumer_products_coffee_maker_program_beverage_coffee`
* **特大杯咖啡**: `consumer_products_coffee_maker_program_beverage_x_l_coffee`
* **Caffe grande**: `consumer_products_coffee_maker_program_beverage_caffe_grande`
* **Espresso macchiato**: `consumer_products_coffee_maker_program_beverage_espresso_macchiato`
* **Cappuccino**: `consumer_products_coffee_maker_program_beverage_cappuccino`
* **Latte macchiato**: `consumer_products_coffee_maker_program_beverage_latte_macchiato`
* **Caffe latte**: `consumer_products_coffee_maker_program_beverage_caffe_latte`
* **奶泡**: `consumer_products_coffee_maker_program_beverage_milk_froth`
* **热牛奶**: `consumer_products_coffee_maker_program_beverage_warm_milk`
* **Kleiner brauner**: `consumer_products_coffee_maker_program_coffee_world_kleiner_brauner`
* **Grosser brauner**: `consumer_products_coffee_maker_program_coffee_world_grosser_brauner`
* **Verlaengerter**: `consumer_products_coffee_maker_program_coffee_world_verlaengerter`
* **Verlaengerter braun**: `consumer_products_coffee_maker_program_coffee_world_verlaengerter_braun`
* **Wiener melange**: `consumer_products_coffee_maker_program_coffee_world_wiener_melange`
* **馥芮白**: `consumer_products_coffee_maker_program_coffee_world_flat_white`
* **Cortado**: `consumer_products_coffee_maker_program_coffee_world_cortado`
* **Cafe cortado**: `consumer_products_coffee_maker_program_coffee_world_cafe_cortado`
* **Cafe con leche**: `consumer_products_coffee_maker_program_coffee_world_cafe_con_leche`
* **Cafe au lait**: `consumer_products_coffee_maker_program_coffee_world_cafe_au_lait`
* **Doppio**: `consumer_products_coffee_maker_program_coffee_world_doppio`
* **Kaapi**: `consumer_products_coffee_maker_program_coffee_world_kaapi`
* **Koffie verkeerd**: `consumer_products_coffee_maker_program_coffee_world_koffie_verkeerd`
* **Galao**: `consumer_products_coffee_maker_program_coffee_world_galao`
* **Garoto**: `consumer_products_coffee_maker_program_coffee_world_garoto`
* **Americano**: `consumer_products_coffee_maker_program_coffee_world_americano`
* **红眼咖啡**: `consumer_products_coffee_maker_program_coffee_world_red_eye`
* **黑眼咖啡**: `consumer_products_coffee_maker_program_coffee_world_black_eye`
* **死眼咖啡**: `consumer_products_coffee_maker_program_coffee_world_dead_eye`
* **热水**: `consumer_products_coffee_maker_program_beverage_hot_water`
* **预冲洗**: `dishcare_dishwasher_program_pre_rinse`
* **自动 1**: `dishcare_dishwasher_program_auto_1`
* **自动 2**: `dishcare_dishwasher_program_auto_2`
* **自动 3**: `dishcare_dishwasher_program_auto_3`
* **节能 50ºC**: `dishcare_dishwasher_program_eco_50`
* **快速 45ºC**: `dishcare_dishwasher_program_quick_45`
* **强洗 70ºC**: `dishcare_dishwasher_program_intensiv_70`
* **标准 65ºC**: `dishcare_dishwasher_program_normal_65`
* **玻璃 40ºC**: `dishcare_dishwasher_program_glas_40`
* **玻璃护理**: `dishcare_dishwasher_program_glass_care`
* **夜洗**: `dishcare_dishwasher_program_night_wash`
* **快速 65ºC**: `dishcare_dishwasher_program_quick_65`
* **标准 45ºC**: `dishcare_dishwasher_program_normal_45`
* **强洗 45ºC**: `dishcare_dishwasher_program_intensiv_45`
* **自动半负载**: `dishcare_dishwasher_program_auto_half_load`
* **强力洗**: `dishcare_dishwasher_program_intensiv_power`
* **固定区域强洗**: `dishcare_dishwasher_program_intensive_fixed_zone`
* **每日洗**: `dishcare_dishwasher_program_magic_daily`
* **超强 60ºC**: `dishcare_dishwasher_program_super_60`
* **短程 60ºC**: `dishcare_dishwasher_program_kurz_60`
* **智能**: `dishcare_dishwasher_program_learning_dishwasher`
* **闪亮快洗 65ºC**: `dishcare_dishwasher_program_express_sparkle_65`
* **机器自洁**: `dishcare_dishwasher_program_machine_care`
* **蒸汽清新**: `dishcare_dishwasher_program_steam_fresh`
* **深度清洁**: `dishcare_dishwasher_program_maximum_cleaning`
* **混合装载**: `dishcare_dishwasher_program_mixed_load`
* **主动清洁**: `heating_ventilation_air_conditioning_air_conditioner_program_active_clean`
* **自动**: `heating_ventilation_air_conditioning_air_conditioner_program_auto`
* **制冷**: `heating_ventilation_air_conditioning_air_conditioner_program_cool`
* **除湿**: `heating_ventilation_air_conditioning_air_conditioner_program_dry`
* **送风**: `heating_ventilation_air_conditioning_air_conditioner_program_fan`
* **制热**: `heating_ventilation_air_conditioning_air_conditioner_program_heat`
* **棉织物**: `laundry_care_dryer_program_cotton`
* **化纤**: `laundry_care_dryer_program_synthetic`
* **混合**: `laundry_care_dryer_program_mix`
* **毛毯**: `laundry_care_dryer_program_blankets`
* **商务衬衫**: `laundry_care_dryer_program_business_shirts`
* **羽绒**: `laundry_care_dryer_program_down_feathers`
* **卫生**: `laundry_care_dryer_program_hygiene`
* **牛仔**: `laundry_care_dryer_program_jeans`
* **户外**: `laundry_care_dryer_program_outdoor`
* **化纤焕新**: `laundry_care_dryer_program_synthetic_refresh`
* **毛巾**: `laundry_care_dryer_program_towels`
* **精细衣物**: `laundry_care_dryer_program_delicates`
* **超快 40ºC**: `laundry_care_dryer_program_super_40`
* **衬衫 15ºC**: `laundry_care_dryer_program_shirts_15`
* **枕头**: `laundry_care_dryer_program_pillow`
* **防缩水**: `laundry_care_dryer_program_anti_shrink`
* **我的烘干时长**: `laundry_care_dryer_program_my_time_my_drying_time`
* **冷风（可变时长）**: `laundry_care_dryer_program_time_cold`
* **暖风（可变时长）**: `laundry_care_dryer_program_time_warm`
* **篮筐烘干**: `laundry_care_dryer_program_in_basket`
* **冷风（20 分钟）**: `laundry_care_dryer_program_time_cold_fix_time_cold_20`
* **冷风（30 分钟）**: `laundry_care_dryer_program_time_cold_fix_time_cold_30`
* **冷风（60 分钟）**: `laundry_care_dryer_program_time_cold_fix_time_cold_60`
* **暖风（30 分钟）**: `laundry_care_dryer_program_time_warm_fix_time_warm_30`
* **暖风（40 分钟）**: `laundry_care_dryer_program_time_warm_fix_time_warm_40`
* **暖风（60 分钟）**: `laundry_care_dryer_program_time_warm_fix_time_warm_60`
* **Dessous**: `laundry_care_dryer_program_dessous`
* **自动**: `cooking_common_program_hood_automatic`
* **排风**: `cooking_common_program_hood_venting`
* **延时关闭**: `cooking_common_program_hood_delayed_shut_off`
* **预热**: `cooking_oven_program_heating_mode_pre_heating`
* **热风**: `cooking_oven_program_heating_mode_hot_air`
* **热风节能**: `cooking_oven_program_heating_mode_hot_air_eco`
* **柔和热风**: `cooking_oven_program_heating_mode_hot_air_gentle`
* **热风烧烤**: `cooking_oven_program_heating_mode_hot_air_grilling`
* **上下加热**: `cooking_oven_program_heating_mode_top_bottom_heating`
* **上下加热节能**: `cooking_oven_program_heating_mode_top_bottom_heating_eco`
* **下加热**: `cooking_oven_program_heating_mode_bottom_heating`
* **披萨模式**: `cooking_oven_program_heating_mode_pizza_setting`
* **慢煮**: `cooking_oven_program_heating_mode_slow_cook`
* **强力加热**: `cooking_oven_program_heating_mode_intensive_heat`
* **保温**: `cooking_oven_program_heating_mode_keep_warm`
* **餐具预热**: `cooking_oven_program_heating_mode_preheat_ovenware`
* **冷冻食品专用加热**: `cooking_oven_program_heating_mode_frozen_heatup_special`
* **烘干脱水**: `cooking_oven_program_heating_mode_desiccation`
* **解冻**: `cooking_oven_program_heating_mode_defrost`
* **发酵**: `cooking_oven_program_heating_mode_proof`
* **热风 + 30% 湿度**: `cooking_oven_program_heating_mode_hot_air_30_steam`
* **热风 + 60% 湿度**: `cooking_oven_program_heating_mode_hot_air_60_steam`
* **热风 + 80% 湿度**: `cooking_oven_program_heating_mode_hot_air_80_steam`
* **热风 + 100% 湿度**: `cooking_oven_program_heating_mode_hot_air_100_steam`
* **安息日程序**: `cooking_oven_program_heating_mode_sabbath_programme`
* **90 Watt**: `cooking_oven_program_microwave_90_watt`
* **180 Watt**: `cooking_oven_program_microwave_180_watt`
* **360 Watt**: `cooking_oven_program_microwave_360_watt`
* **450 Watt**: `cooking_oven_program_microwave_450_watt`
* **600 Watt**: `cooking_oven_program_microwave_600_watt`
* **900 Watt**: `cooking_oven_program_microwave_900_watt`
* **1000 Watt**: `cooking_oven_program_microwave_1000_watt`
* **最大**: `cooking_oven_program_microwave_max`
* **蒸汽模式**: `cooking_oven_program_steam_modes_steam`
* **保温抽屉**: `cooking_oven_program_heating_mode_warming_drawer`
* **自动 30ºC**: `laundry_care_washer_program_auto_30`
* **自动 40ºC**: `laundry_care_washer_program_auto_40`
* **自动 60ºC**: `laundry_care_washer_program_auto_60`
* **雪纺**: `laundry_care_washer_program_chiffon`
* **棉织物**: `laundry_care_washer_program_cotton`
* **彩色棉织物**: `laundry_care_washer_program_cotton_colour`
* **棉织物节能**: `laundry_care_washer_program_cotton_cotton_eco`
* **棉织物节能 40/60ºC**: `laundry_care_washer_program_cotton_eco_4060`
* **窗帘**: `laundry_care_washer_program_curtains`
* **深色洗**: `laundry_care_washer_program_dark_wash`
* **丝绸精细洗**: `laundry_care_washer_program_delicates_silk`
* **Dessous**: `laundry_care_washer_program_dessous`
* **羽绒被**: `laundry_care_washer_program_down_duvet_duvet`
* **筒自洁**: `laundry_care_washer_program_drum_clean`
* **易护理**: `laundry_care_washer_program_easy_care`
* **卫生**: `laundry_care_washer_program_hygiene_plus`
* **混合**: `laundry_care_washer_program_mix`
* **混合夜洗**: `laundry_care_washer_program_mix_night_wash`
* **Monsoon**: `laundry_care_washer_program_monsoon`
* **户外**: `laundry_care_washer_program_outdoor`
* **毛绒玩具**: `laundry_care_washer_program_plush_toy`
* **强速 <59 分钟**: `laundry_care_washer_program_power_speed_59`
* **漂洗**: `laundry_care_washer_program_rinse`
* **漂洗+脱水+排水**: `laundry_care_washer_program_rinse_rinse_spin_drain`
* **敏感护理**: `laundry_care_washer_program_sensitive`
* **衬衫/女衫**: `laundry_care_washer_program_shirts_blouses`
* **脱水/排水**: `laundry_care_washer_program_spin_drain`
* **运动服**: `laundry_care_washer_program_sport_fitness`
* **毛巾**: `laundry_care_washer_program_towels`
* **超快 15 分钟**: `laundry_care_washer_program_super_153045_super_15`
* **超快 15/30 分钟**: `laundry_care_washer_program_super_153045_super_1530`
* **防水**: `laundry_care_washer_program_water_proof`
* **羊毛**: `laundry_care_washer_program_wool`
* **棉织物**: `laundry_care_washer_dryer_program_cotton`
* **棉织物节能 40/60ºC**: `laundry_care_washer_dryer_program_cotton_eco_4060`
* **混合**: `laundry_care_washer_dryer_program_mix`
* **易护理**: `laundry_care_washer_dryer_program_easy_care`
* **洗烘（60 分钟）**: `laundry_care_washer_dryer_program_wash_and_dry_60`
* **洗烘（90 分钟）**: `laundry_care_washer_dryer_program_wash_and_dry_90`

</details>

#### 设置

* **当前地图**:
  * **说明**: 表示清洁机器人的当前选中地图。
  * **可用性**: 清洁机器人
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **临时地图**: `consumer_products_cleaning_robot_option_reference_map_id_temp_map`
    * **地图 1**: `consumer_products_cleaning_robot_option_reference_map_id_map_1`
    * **地图 2**: `consumer_products_cleaning_robot_option_reference_map_id_map_2`
    * **地图 3**: `consumer_products_cleaning_robot_option_reference_map_id_map_3`

    </details>
* **功能照明色温**:
  * **说明**: 表示功能照明的色温。
  * **可用性**: 油烟机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **自定义**: `cooking_hood_enum_type_color_temperature_custom`
    * **暖色**: `cooking_hood_enum_type_color_temperature_warm`
    * **暖色到中性**: `cooking_hood_enum_type_color_temperature_warm_to_neutral`
    * **中性**: `cooking_hood_enum_type_color_temperature_neutral`
    * **中性到冷色**: `cooking_hood_enum_type_color_temperature_neutral_to_cold`
    * **冷色**: `cooking_hood_enum_type_color_temperature_cold`

    </details>
* **氛围照明颜色**:
  * **说明**: 表示氛围照明的颜色。
  * **可用性**: 油烟机、洗碗机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **自定义**: `b_s_h_common_enum_type_ambient_light_color_custom_color`
    * **1**: `b_s_h_common_enum_type_ambient_light_color_color_1`
    * ...
    * **99**: `b_s_h_common_enum_type_ambient_light_color_color_99`

    </details>

#### 程序选项

* **参考地图 ID**:
  * **说明**: 定义要使用的参考地图。
  * **可用性**: 清洁机器人
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **临时地图**: `consumer_products_cleaning_robot_option_reference_map_id_temp_map`
    * **地图 1**: `consumer_products_cleaning_robot_option_reference_map_id_map_1`
    * **地图 2**: `consumer_products_cleaning_robot_option_reference_map_id_map_2`
    * **地图 3**: `consumer_products_cleaning_robot_option_reference_map_id_map_3`

    </details>
* **清洁模式**:
  * **说明**: 定义首选清洁模式。
  * **可用性**: 清洁机器人
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **静音**: `consumer_products_cleaning_robot_enum_type_cleaning_modes_silent`
    * **标准**: `consumer_products_cleaning_robot_enum_type_cleaning_modes_standard`
    * **强力**: `consumer_products_cleaning_robot_enum_type_cleaning_modes_power`
    * **智能模式**: `consumer_products_cleaning_robot_enum_type_cleaning_mode_intelligent_mode`
    * **仅吸尘**: `consumer_products_cleaning_robot_enum_type_cleaning_mode_vacuum_only`
    * **仅拖地**: `consumer_products_cleaning_robot_enum_type_cleaning_mode_mop_only`
    * **吸尘并拖地**: `consumer_products_cleaning_robot_enum_type_cleaning_mode_vacuum_and_mop`
    * **先吸尘后拖地**: `consumer_products_cleaning_robot_enum_type_cleaning_mode_mop_after_vacuum`

    </details>
* **吸力档位**:
  * **说明**: 定义吸力强度。
  * **可用性**: 清洁机器人
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **静音**: `consumer_products_cleaning_robot_enum_type_suction_power_silent`
    * **标准**: `consumer_products_cleaning_robot_enum_type_suction_power_standard`
    * **最大**: `consumer_products_cleaning_robot_enum_type_suction_power_max`

    </details>
* **咖啡豆用量**:
  * **说明**: 表示咖啡机程序使用的咖啡豆量。
  * **可用性**: 咖啡机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **极淡**: `consumer_products_coffee_maker_enum_type_bean_amount_very_mild`
    * **淡**: `consumer_products_coffee_maker_enum_type_bean_amount_mild`
    * **淡 +**: `consumer_products_coffee_maker_enum_type_bean_amount_mild_plus`
    * **标准**: `consumer_products_coffee_maker_enum_type_bean_amount_normal`
    * **标准 +**: `consumer_products_coffee_maker_enum_type_bean_amount_normal_plus`
    * **浓**: `consumer_products_coffee_maker_enum_type_bean_amount_strong`
    * **浓 +**: `consumer_products_coffee_maker_enum_type_bean_amount_strong_plus`
    * **很浓**: `consumer_products_coffee_maker_enum_type_bean_amount_very_strong`
    * **很浓 +**: `consumer_products_coffee_maker_enum_type_bean_amount_very_strong_plus`
    * **特浓**: `consumer_products_coffee_maker_enum_type_bean_amount_extra_strong`
    * **双份**: `consumer_products_coffee_maker_enum_type_bean_amount_double_shot`
    * **双份 +**: `consumer_products_coffee_maker_enum_type_bean_amount_double_shot_plus`
    * **双份 ++**: `consumer_products_coffee_maker_enum_type_bean_amount_double_shot_plus_plus`
    * **三份**: `consumer_products_coffee_maker_enum_type_bean_amount_triple_shot`
    * **三份 +**: `consumer_products_coffee_maker_enum_type_bean_amount_triple_shot_plus`
    * **咖啡粉**: `consumer_products_coffee_maker_enum_type_bean_amount_coffee_ground`

    </details>
* **咖啡温度**:
  * **说明**: 表示咖啡机程序使用的咖啡温度。
  * **可用性**: 咖啡机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **88ºC**: `consumer_products_coffee_maker_enum_type_coffee_temperature_88_c`
    * **90ºC**: `consumer_products_coffee_maker_enum_type_coffee_temperature_90_c`
    * **92ºC**: `consumer_products_coffee_maker_enum_type_coffee_temperature_92_c`
    * **94ºC**: `consumer_products_coffee_maker_enum_type_coffee_temperature_94_c`
    * **95ºC**: `consumer_products_coffee_maker_enum_type_coffee_temperature_95_c`
    * **96ºC**: `consumer_products_coffee_maker_enum_type_coffee_temperature_96_c`

    </details>
* **豆仓选择**:
  * **说明**: 定义首选咖啡豆仓。
  * **可用性**: 咖啡机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **左侧**: `consumer_products_coffee_maker_enum_type_bean_container_selection_right`
    * **右侧**: `consumer_products_coffee_maker_enum_type_bean_container_selection_left`

    </details>
* **流速**:
  * **说明**: 定义水与咖啡的接触时间，时长会影响咖啡浓度。
  * **可用性**: 咖啡机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **标准**: `consumer_products_coffee_maker_enum_type_flow_rate_normal`
    * **浓郁**: `consumer_products_coffee_maker_enum_type_flow_rate_intense`
    * **浓郁加强**: `consumer_products_coffee_maker_enum_type_flow_rate_intense_plus`

    </details>
* **咖啡牛奶比例**:
  * **说明**: 定义牛奶用量。
  * **可用性**: 咖啡机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **10%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_10_percent`
    * **20%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_20_percent`
    * **25%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_25_percent`
    * **30%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_30_percent`
    * **40%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_40_percent`
    * **50%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_50_percent`
    * **55%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_55_percent`
    * **60%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_60_percent`
    * **65%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_65_percent`
    * **67%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_67_percent`
    * **70%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_70_percent`
    * **75%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_75_percent`
    * **80%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_80_percent`
    * **85%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_85_percent`
    * **90%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_90_percent`

    </details>
* **热水温度**:
  * **说明**: 定义适合不同茶类的热水温度。
  * **可用性**: 咖啡机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **白茶**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_white_tea`
    * **绿茶**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_green_tea`
    * **红茶**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_black_tea`
    * **50ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_50_c`
    * **55ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_55_c`
    * **60ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_60_c`
    * **65ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_65_c`
    * **70ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_70_c`
    * **75ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_75_c`
    * **80ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_80_c`
    * **85ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_85_c`
    * **90ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_90_c`
    * **95ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_95_c`
    * **97ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_97_c`
    * **122ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_122_f`
    * **131ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_131_f`
    * **140ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_140_f`
    * **149ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_149_f`
    * **158ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_158_f`
    * **167ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_167_f`
    * **176ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_176_f`
    * **185ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_185_f`
    * **194ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_194_f`
    * **203ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_203_f`
    * **最大**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_max`

    </details>
* **烘干目标**:
  * **说明**: 描述烘干机程序的烘干目标。
  * **可用性**: 烘干机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **熨烫干**: `laundry_care_dryer_enum_type_drying_target_iron_dry`
    * **轻柔干燥**: `laundry_care_dryer_enum_type_drying_target_gentle_dry`
    * **衣橱干**: `laundry_care_dryer_enum_type_drying_target_cupboard_dry`
    * **衣橱干加强**: `laundry_care_dryer_enum_type_drying_target_cupboard_dry_plus`
    * **特干**: `laundry_care_dryer_enum_type_drying_target_extra_dry`

    </details>
* **排风档位**:
  * **说明**: 定义所需的风机档位。
  * **可用性**: 油烟机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **风机关闭**: `cooking_hood_enum_type_stage_fan_off`
    * **风机 1 档**: `cooking_hood_enum_type_stage_fan_stage_01`
    * **风机 2 档**: `cooking_hood_enum_type_stage_fan_stage_02`
    * **风机 3 档**: `cooking_hood_enum_type_stage_fan_stage_03`
    * **风机 4 档**: `cooking_hood_enum_type_stage_fan_stage_04`
    * **风机 5 档**: `cooking_hood_enum_type_stage_fan_stage_05`

    </details>
* **强力档位**:
  * **说明**: 定义强力模式档位。
  * **可用性**: 油烟机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **强力档关闭**: `cooking_hood_enum_type_intensive_stage_intensive_stage_off`
    * **强力 1 档**: `cooking_hood_enum_type_intensive_stage_intensive_stage1`
    * **强力 2 档**: `cooking_hood_enum_type_intensive_stage_intensive_stage2`

    </details>
* **保温档位**:
  * **说明**: 定义保温抽屉的档位。
  * **可用性**: 烤箱
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **低**: `cooking_oven_enum_type_warming_level_low`
    * **中**: `cooking_oven_enum_type_warming_level_medium`
    * **高**: `cooking_oven_enum_type_warming_level_high`

    </details>
* **温度**:
  * **说明**: 定义洗涤程序的温度。
  * **可用性**: 洗衣机、洗烘一体机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **冷水**: `laundry_care_washer_enum_type_temperature_cold`
    * **20ºC 衣物**: `laundry_care_washer_enum_type_temperature_g_c_20`
    * **30ºC 衣物**: `laundry_care_washer_enum_type_temperature_g_c_30`
    * **40ºC 衣物**: `laundry_care_washer_enum_type_temperature_g_c_40`
    * **50ºC 衣物**: `laundry_care_washer_enum_type_temperature_g_c_50`
    * **60ºC 衣物**: `laundry_care_washer_enum_type_temperature_g_c_60`
    * **70ºC 衣物**: `laundry_care_washer_enum_type_temperature_g_c_70`
    * **80ºC 衣物**: `laundry_care_washer_enum_type_temperature_g_c_80`
    * **90ºC 衣物**: `laundry_care_washer_enum_type_temperature_g_c_90`
    * **冷水**: `laundry_care_washer_enum_type_temperature_ul_cold`
    * **温水**: `laundry_care_washer_enum_type_temperature_ul_warm`
    * **热水**: `laundry_care_washer_enum_type_temperature_ul_hot`
    * **超热**: `laundry_care_washer_enum_type_temperature_ul_extra_hot`

    </details>
* **脱水转速**:
  * **说明**: 定义洗衣程序的脱水转速。
  * **可用性**: 洗衣机、洗烘一体机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **关闭**: `laundry_care_washer_enum_type_spin_speed_off`
    * **400 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m_400`
    * **600 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m_600`
    * **700 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m_700`
    * **800 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m_800`
    * **900 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m_900`
    * **1000 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m_1000`
    * **1200 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m_1200`
    * **1400 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m_1400`
    * **1600 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m_1600`
    * **关闭**: `laundry_care_washer_enum_type_spin_speed_ul_off`
    * **低**: `laundry_care_washer_enum_type_spin_speed_ul_low`
    * **中**: `laundry_care_washer_enum_type_spin_speed_ul_medium`
    * **高**: `laundry_care_washer_enum_type_spin_speed_ul_high`

    </details>
* **VarioPerfect（可变优化）**:
  * **说明**: 定义程序偏向节能（Eco Perfect）还是省时（Speed Perfect）。
  * **可用性**: 洗衣机
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **关闭**: `laundry_care_common_enum_type_vario_perfect_off`
    * **节能优先**: `laundry_care_common_enum_type_vario_perfect_eco_perfect`
    * **速度优先**: `laundry_care_common_enum_type_vario_perfect_speed_perfect`

    </details>

</details>

### 传感器

<details>
<summary>传感器列表</summary>

* **结束时间**:
  * **说明**: 表示程序结束的时间。
  * **可用性**: 咖啡机、油烟机、烤箱、洗碗机、烘干机、洗衣机、洗烘一体机

:::note
该传感器仅在程序运行时可用。

:::

* **程序进度**:
  * **说明**: 表示程序当前进度。
  * **可用性**: 咖啡机、油烟机、烤箱、保温抽屉、洗碗机、烘干机、洗衣机、洗烘一体机

:::note
该传感器仅在程序运行时可用。

:::

* **运行状态**:
  * **说明**: 表示设备当前运行状态。
  * **可用性**: 所有带程序的设备
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **未激活**: `inactive`
    * **就绪**: `ready`
    * **延迟启动**: `delayedstart`
    * **运行中**: `run`
    * **已暂停**: `pause`
    * **需要操作**: `actionrequired`
    * **已完成**: `finished`
    * **错误**: `error`
    * **正在中止**: `aborting`

    </details>
* **门状态**:
  * **说明**: 表示门当前状态。
  * **可用性**: 烤箱、洗碗机、烘干机、洗衣机、洗烘一体机、冷冻柜、冰箱冷冻组合、冰箱、酒柜
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **已关闭**: `closed`
    * **已锁定**: `locked`
    * **打开**: `open`

    </details>
* **咖啡计数**:
  * **说明**: 表示已制作咖啡杯数。
  * **可用性**: 咖啡机
* **咖啡粉计数**:
  * **说明**: 表示以咖啡粉制作的杯数。
  * **可用性**: 咖啡机
* **热水计量**:
  * **说明**: 表示已出热水总毫升数。
  * **可用性**: 咖啡机
* **热水杯数**:
  * **说明**: 表示已出热水杯数。
  * **可用性**: 咖啡机
* **热牛奶计数**:
  * **说明**: 表示已出热牛奶杯数。
  * **可用性**: 咖啡机
* **奶泡计数**:
  * **说明**: 表示已出奶泡杯数。
  * **可用性**: 咖啡机
* **牛奶计数**:
  * **说明**: 表示已出牛奶杯数。
  * **可用性**: 咖啡机
* **咖啡与牛奶计数**:
  * **说明**: 表示已出咖啡加牛奶饮品杯数。
  * **可用性**: 咖啡机
* **Ristretto 浓缩咖啡计数**:
  * **说明**: 表示已出 Ristretto 浓缩咖啡杯数。
  * **可用性**: 咖啡机
* **电池电量**:
  * **说明**: 表示电池电量。
  * **可用性**: 清洁机器人
* **摄像头状态**:
  * **说明**: 表示摄像头状态。
  * **可用性**: 清洁机器人
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **已禁用**: `disabled`
    * **休眠中**: `sleeping`
    * **就绪**: `ready`
    * **本地串流**: `streaminglocal`
    * **云端串流**: `streamingcloud`
    * **本地与云端串流**: `streaminglocalancloud`
    * **错误**: `error`

    </details>
* **上次选择的地图**:
  * **说明**: 表示清洁机器人上次选择的地图。
  * **可用性**: 清洁机器人
  * <details>
    <summary><b>可选项：</b>（点击查看）</summary>

    * **临时地图**: `tempmap`
    * **地图 1**: `map1`
    * **地图 2**: `map2`
    * **地图 3**: `map3`

    </details>
* **当前腔体温度**:
  * **说明**: 表示当前腔体温度。
  * **可用性**: 烤箱

:::important
不建议使用**当前腔体温度**传感器，因为其温度读数可能无法满足所需精度。

:::

#### 事件传感器

:::note
在设备首次上报相应事件之前，集成不会提供对应的事件传感器。

:::

<details>
<summary>事件传感器可选值</summary>

所有事件传感器都可能出现以下取值：

* **已确认**: `confirmed`
* **存在**: `present`
* **关闭**: `off`

</details>

* **程序已中止**:
  * **说明**: 每次程序成功取消时触发事件。
  * **可用性**: 烹饪处理机、清洁机器人、洗碗机
* **程序已完成**:
  * **说明**: 每次程序成功运行完成时触发事件。
  * **可用性**: 烹饪处理机、灶台、油烟机、烤箱、清洁机器人、洗碗机、洗衣机、洗烘一体机
* **闹钟到时**:
  * **说明**: 闹钟到时后触发事件。
  * **可用性**: 灶台、烤箱
* **快速预热完成**:
  * **说明**: 启用 **快速预热** 程序选项且预热阶段结束时触发事件。
  * **可用性**: 灶台、烤箱
* **常规预热完成**:
  * **说明**: 预热阶段结束时触发事件（且 **快速预热** 选项未启用或不受支持）。
  * **可用性**: 烤箱
* **烘干流程完成**:
  * **说明**: 烘干流程结束时触发事件。
  * **可用性**: 烘干机
* **盐余量不足**:
  * **说明**: 洗碗盐即将用尽时触发事件。
  * **可用性**: 洗碗机
* **漂洗剂余量不足**:
  * **说明**: 漂洗剂即将用尽时触发事件。
  * **可用性**: 洗碗机
* **豆仓为空**:
  * **说明**: 豆仓为空时触发事件。
  * **可用性**: 咖啡机
* **水箱为空**:
  * **说明**: 水箱为空时触发事件。
  * **可用性**: 咖啡机
* **接水盘已满**:
  * **说明**: 接水盘已满时触发事件。
  * **可用性**: 咖啡机
* **请冷藏奶罐**:
  * **说明**: 需要取下奶容器并放入阴凉处以保持牛奶新鲜时触发事件。
  * **可用性**: 咖啡机
* **20 杯后需除垢**:
  * **说明**: 距离需要除垢还剩 20 杯时触发事件。
  * **可用性**: 咖啡机
* **15 杯后需除垢**:
  * **说明**: 距离需要除垢还剩 15 杯时触发事件。
  * **可用性**: 咖啡机
* **10 杯后需除垢**:
  * **说明**: 距离需要除垢还剩 10 杯时触发事件。
  * **可用性**: 咖啡机
* **5 杯后需除垢**:
  * **说明**: 距离需要除垢还剩 5 杯时触发事件。
  * **可用性**: 咖啡机
* **设备需除垢**:
  * **说明**: 设备需要除垢时触发事件。
  * **可用性**: 咖啡机
* **设备除垢逾期**:
  * **说明**: 设备除垢已逾期时触发事件。
  * **可用性**: 咖啡机
* **设备除垢受阻**:
  * **说明**: 设备除垢流程受阻时触发事件。
  * **可用性**: 咖啡机
* **设备需清洁**:
  * **说明**: 设备需要清洁时触发事件。
  * **可用性**: 咖啡机
* **设备清洁逾期**:
  * **说明**: 设备清洁已逾期时触发事件。
  * **可用性**: 咖啡机
* **20 杯后需 Calc'N'Clean**:
  * **说明**: 距离需要执行 Calc'N'Clean 流程还剩 20 杯时触发事件。
  * **可用性**: 咖啡机
* **15 杯后需 Calc'N'Clean**:
  * **说明**: 距离需要执行 Calc'N'Clean 流程还剩 15 杯时触发事件。
  * **可用性**: 咖啡机
* **10 杯后需 Calc'N'Clean**:
  * **说明**: 距离需要执行 Calc'N'Clean 流程还剩 10 杯时触发事件。
  * **可用性**: 咖啡机
* **5 杯后需 Calc'N'Clean**:
  * **说明**: 距离需要执行 Calc'N'Clean 流程还剩 5 杯时触发事件。
  * **可用性**: 咖啡机
* **设备需 Calc'N'Clean**:
  * **说明**: 设备需要执行 Calc'N'Clean 流程时触发事件。
  * **可用性**: 咖啡机
* **设备 Calc'N'Clean 逾期**:
  * **说明**: 设备 Calc'N'Clean 已逾期时触发事件。
  * **可用性**: 咖啡机
* **设备 Calc'N'Clean 受阻**:
  * **说明**: 设备 Calc'N'Clean 流程受阻时触发事件。
  * **可用性**: 咖啡机
* **冷冻室开门报警**:
  * **说明**: 冷冻室门长时间未关闭时触发事件。
  * **可用性**: 冷冻柜、冰箱冷冻组合
* **冷藏室开门报警**:
  * **说明**: 冷藏室门长时间未关闭时触发事件。
  * **可用性**: 冰箱冷冻组合、冰箱
* **冷冻室温度报警**:
  * **说明**: 冷冻室温度过高时触发事件。
  * **可用性**: 冷冻柜、冰箱冷冻组合
* **清空尘盒并清洁滤网**:
  * **说明**: 需要清空尘盒并清洁滤网时触发事件。
  * **可用性**: 清洁机器人
* **清洁机器人被卡住**:
  * **说明**: 清洁机器人被卡住且无法继续运行时触发事件。
  * **可用性**: 清洁机器人
* **未找到充电座**:
  * **说明**: 清洁机器人无法找到充电座时触发事件。
  * **可用性**: 清洁机器人
* **i-Dos 1 余量不足**:
  * **说明**: i-Dos 内容物 1 余量不足时触发事件。
  * **可用性**: 洗衣机
* **i-Dos 2 余量不足**:
  * **说明**: i-Dos 内容物 2 余量不足时触发事件。
  * **可用性**: 洗衣机
* **油脂滤网接近饱和**:
  * **说明**: 油脂滤网即将需要清洁时触发事件。
  * **可用性**: 油烟机
* **油脂滤网已饱和**:
  * **说明**: 油脂滤网已饱和时触发事件。
  * **可用性**: 油烟机

</details>

### 开关

<details>
<summary>开关实体列表</summary>

* **电源**:
  * **说明**: 打开/关闭设备，或将设备设为待机模式。
  * **可用性**: 所有设备

:::note
某些设备仅支持 `on` 状态，不支持关机。更多信息请参阅 [Home Connect API 文档中的电源状态支持说明](https://api-docs.home-connect.com/settings/#power-state)。

:::

* **童锁**:
  * **说明**: 表示童锁状态。
  * **可用性**: 咖啡机、灶台、烤箱、保温抽屉、洗碗机、烘干机、洗衣机、洗烘一体机、冷冻柜、冰箱冷冻组合、冰箱、酒柜
* **杯托加热**:
  * **说明**: 启用/禁用杯托加热功能。
  * **可用性**: 咖啡机
* **冷冻室超级模式**:
  * **说明**: 将冷冻室降至最低温，直到关闭或超时。
  * **可用性**: 冷冻柜、冰箱冷冻组合
* **冷藏室超级模式**:
  * **说明**: 将冷藏室降至最低温，直到关闭或超时。
  * **可用性**: 冰箱冷冻组合、冰箱
* **节能模式**:
  * **说明**: 启用/禁用节能模式。
  * **可用性**: 冷冻柜、冰箱冷冻组合、冰箱
* **安息日模式**:
  * **说明**: 启用/禁用安息日模式。该模式会关闭多项功能（如照明、提示音），以便遵守安息日习俗的用户使用设备。
  * **可用性**: 烤箱、冷冻柜、冰箱冷冻组合、冰箱、酒柜
* **度假模式**:
  * **说明**: 启用/禁用度假模式。启用后会将冷藏室温度设为 +14ºC 以降低能耗，冷冻室温度保持当前设定。
  * **可用性**: 冰箱冷冻组合、冰箱
* **保鲜模式**:
  * **说明**: 启用/禁用保鲜模式。启用后会自动将冷藏室温度降至 2ºC，冷冻室保持不变。
  * **可用性**: 冰箱冷冻组合、冰箱
* **饮水分配器启用**:
  * **说明**: 启用/禁用冰水分配器。
  * **可用性**: 冰箱冷冻组合、冰箱
* **冷冻室开门辅助**:
  * **说明**: 启用/禁用冷冻室自动开门功能。
  * **可用性**: 冷冻柜、冰箱冷冻组合
* **冷藏室开门辅助**:
  * **说明**: 启用/禁用冷藏/冷冻室自动开门功能。
  * **可用性**: 冰箱冷冻组合、冰箱

</details>

## 动作

Home Connect 集成提供以下动作：
可用动作：`set_program_and_options` 和 `change_setting`

### 动作：设置程序和选项

`home_connect.set_program_and_options` 动作用于启动或选择程序。若未设置 `program` 属性，该动作会为当前运行程序或已选程序设置选项。

| 数据属性    | 可选 | 说明                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | 否 | 设备 ID。 |
| `affects_to` | 否 | 选择该动作影响“当前运行程序”还是“已选程序”。 |
| `program` | 是 | 要选择的程序。设置后会根据 `affects_to` 启动或选择对应程序。 |
| `heating_ventilation_air_conditioning_air_conditioner_option_fan_speed_percentage` | 是 | 用百分比调整空调风速档位。 |
| `heating_ventilation_air_conditioning_air_conditioner_option_fan_speed_mode` | 是 | 调整风速模式为手动或自动。 |
| `consumer_products_cleaning_robot_option_reference_map_id` | 是 | 定义要使用的参考地图。 |
| `consumer_products_cleaning_robot_option_cleaning_mode` | 是 | 定义首选清洁模式。 |
| `consumer_products_cleaning_robot_option_suction_power` | 是 | 定义吸力强度。 |
| `consumer_products_coffee_maker_option_bean_amount` | 是 | 描述咖啡机程序使用的咖啡豆用量。 |
| `consumer_products_coffee_maker_option_fill_quantity` | 是 | 描述咖啡机程序使用的水量（毫升）。 |
| `consumer_products_coffee_maker_option_coffee_temperature` | 是 | 描述咖啡机程序使用的咖啡温度。 |
| `consumer_products_coffee_maker_option_bean_container` | 是 | 定义首选咖啡豆仓。 |
| `consumer_products_coffee_maker_option_flow_rate` | 是 | 定义水与咖啡的接触时间，时长会影响咖啡浓度。 |
| `consumer_products_coffee_maker_option_multiple_beverages` | 是 | 定义是否启用双杯出饮。 |
| `consumer_products_coffee_maker_option_coffee_milk_ratio` | 是 | 定义牛奶用量。 |
| `consumer_products_coffee_maker_option_hot_water_temperature` | 是 | 定义适合不同茶类的热水温度。 |
| `b_s_h_common_option_start_in_relative` | 是 | 定义程序何时启动（从当前起算秒数）。例如：9000 表示 2 小时 30 分后。 |
| `dishcare_dishwasher_option_intensiv_zone` | 是 | 定义是否对下层篮筐提高喷淋压力，以清洗重油污锅具。 |
| `dishcare_dishwasher_option_brilliance_dry` | 是 | 定义是否通过特殊烘干流程优化程序，使玻璃和塑料器皿更亮洁。 |
| `dishcare_dishwasher_option_vario_speed_plus` | 是 | 定义是否动态缩短程序时长（最多缩短 66%），同时保持较佳洗涤和烘干效果。 |
| `dishcare_dishwasher_option_silence_on_demand` | 是 | 定义是否在指定时间段启用超静音模式。 |
| `dishcare_dishwasher_option_half_load` | 是 | 定义是否为小负载启用节能清洗，可降低水电消耗并节省时间。餐具可放于上下篮筐。 |
| `dishcare_dishwasher_option_extra_dry` | 是 | 定义是否启用加强烘干，提升玻璃与塑料器皿的烘干效果。 |
| `dishcare_dishwasher_option_hygiene_plus` | 是 | 定义是否以更高温度进行清洗，以确保日常使用中的更高卫生标准。 |
| `dishcare_dishwasher_option_eco_dry` | 是 | 定义是否自动开门以实现更节能且更高效的烘干。 |
| `dishcare_dishwasher_option_zeolite_dry` | 是 | 定义是否通过特殊烘干流程优化程序，提升玻璃、餐盘和塑料器皿的烘干效果。 |
| `laundry_care_dryer_option_drying_target` | 是 | 描述烘干机程序的烘干目标。例如：熨烫干、衣橱干、特干。 |
| `cooking_hood_option_venting_level` | 是 | 定义所需风机档位。 |
| `cooking_hood_option_intensive_level` | 是 | 定义强力模式档位。 |
| `cooking_oven_option_setpoint_temperature` | 是 | 定义目标腔体温度，烤箱会维持该温度。 |
| `b_s_h_common_option_duration` | 是 | 定义程序运行时长，到时后设备停止。 |
| `cooking_oven_option_fast_pre_heat` | 是 | 定义是否启用快速预热。请注意设定温度需大于等于 100 °C 或 212 °F，否则不会启用快速预热。 |
| `cooking_oven_option_warming_level` | 是 | 定义保温抽屉档位。 |
| `laundry_care_washer_option_temperature` | 是 | 定义洗涤程序温度。 |
| `laundry_care_washer_option_spin_speed` | 是 | 定义洗衣程序脱水转速。 |
| `b_s_h_common_option_finish_in_relative` | 是 | 定义程序何时结束（从当前起算秒数）。例如：9000 表示 2 小时 30 分后。 |
| `laundry_care_washer_option_i_dos1_active` | 是 | 定义是否启用/禁用洗涤剂投放（i-Dos 内容物 1）。 |
| `laundry_care_washer_option_i_dos2_active` | 是 | 定义是否启用/禁用洗涤剂投放（i-Dos 内容物 2）。 |
| `laundry_care_washer_option_vario_perfect` | 是 | 定义程序偏向节能（Eco Perfect）还是省时（Speed Perfect）。 |

### 动作：更改设置

`home_connect.change_setting` 动作用于更改某项设置。

| 数据属性    | 可选 | 说明                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | 否 | 与家电关联的设备 ID。 |
| `key` | 否 | 设置项键名。 |
| `value` | 否 | 设置项值。 |

## 自动化示例

可参考以下自动化示例快速上手。

### 当设备程序结束时发送通知

<details>
<summary>YAML 配置示例</summary>

```yaml
alias: "程序结束时通知"
triggers:
  - trigger: state
    entity_id:
      - sensor.appliance_operation_state
    to: finished
actions:
  - action: notify.notify
    data:
      message: "设备已完成程序。"
```

</details>

### 电价低时启动程序

由于夜间电价通常更低，此自动化会在夜间启动程序时启用静音模式。

<details>
<summary>YAML 配置示例</summary>

```yaml
alias: "电价低时启动程序"
triggers:
  - trigger: state
    entity_id: sensor.electricity_price
    to: "0.10"
conditions:
  - condition: state
    entity_id: sensor.diswasher_door
    state: closed
actions:
  - if:
      - condition: time
        after: '22:00:00'
        before: '06:00:00'
    then:
      - action: home_connect.set_program_and_options
        data:
          device_id: "your_device_id"
          affects_to: "active_program"
          program: "dishcare_dishwasher_program_eco_50"
          dishcare_dishwasher_option_silence_on_demand: true
    else:
      - action: home_connect.set_program_and_options
        data:
          device_id: "your_device_id"
          affects_to: "active_program"
          program: "dishcare_dishwasher_program_eco_50"
```

</details>

## 数据更新

该集成通过 Home Connect API 的服务器发送事件（SSE）接收设备实时更新。
当配置条目加载时，或在流式连接出错后（例如断线后），集成会重新请求所有设备的全部数据（如设备信息、可用命令、程序、设置和状态）。
当账号中新增设备时，集成会自动请求新设备数据并创建对应实体。

## 已知限制

* Home Connect API 与 Home Connect App 并非完全一致。App 中可用的某些程序、选项或设置，可能无法通过 API 访问或使用。
* 该集成仅支持一个集成条目，因为 Home Connect API 无法唯一标识账号。

## 故障排查

### 无法配置 Home Connect 集成

#### 症状：尝试配置 Home Connect 集成时失败，并显示 `Error while obtaining access token.`（获取访问令牌时出错）

##### 说明

该问题通常由应用凭据配置不正确导致。

##### 解决方案

可按以下步骤解决：

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 点击右上角三点菜单 `[mdi:dots-vertical]`，选择 **应用凭据**。

   ![设备与服务溢出菜单](/home-assistant/images/integrations/application_credentials/devices-and-services-menu.png)

   ![应用凭据列表](/home-assistant/images/integrations/application_credentials/application-credentials.png)
3. 在为 Home Connect 创建的应用凭据右侧点击三点菜单 `[mdi:dots-vertical]`，选择 **删除**。
4. 回到 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 重新添加 Home Connect 集成。

### “当前运行程序”和“已选程序”实体缺少选项

#### 症状：“虽然我有可选项，但 App 中可用的一些程序没有出现在‘当前运行程序’和‘已选程序’实体的选项列表中，或这些实体本身没有出现”

在 App、设备本体或设备诊断文件中可选的一些程序，未出现在“当前运行程序”和“已选程序”实体中。

##### 说明

如果你在 App 或设备本体中看到程序，但集成里没有，请先检查它们是否出现在[诊断文件](https://www.home-assistant.io/docs/configuration/troubleshooting/#download-diagnostics)中。若诊断文件中存在，说明 API 能将其发送到集成，但集成暂时无法识别。

##### 解决方案

需要将对应程序键添加到集成中。你可以在 [aiohomeconnect](https://github.com/MartinHjelmare/aiohomeconnect) 提交 issue，反馈缺失的程序键。

#### 症状：“集成没有提供‘当前运行程序’和‘已选程序’实体”

集成未提供“当前运行程序”和“已选程序”实体，且下载的设备诊断文件中也未列出任何程序。

##### 说明

Home Connect API 没有向集成发送任何程序数据。

##### 解决方案

该问题暂无可行修复方式。你只能通过以下渠道向 Home Connect 反馈：

* [Home Connect 服务与联系方式](https://www.home-connect.com/us/en/support/contact-and-service)
* [Home Connect 开发者帮助与支持](https://developer.home-connect.com/support/contact)

### 某个设备的实体不可用

#### 症状：“与某台设备相关的实体之前可用，现在不可用”

重新加载 Home Connect 集成后，某台设备原本可用的实体变为不可用。
此外，从该设备条目下载诊断数据时，可能得到如下内容：

```json
{
  "data": {
    "connected": false,
    "status": {},
    "programs": null
  }
}
```

##### 说明

实体不可用可能由以下原因导致：

* 设备处于关机状态。关机后设备会断开连接，API 无法获取该设备信息。
* 设备存在网络连接问题。
* Home Connect API 服务本身异常。

##### 解决方案

可按以下步骤尝试排查：

1. 打开设备电源并重新加载 Home Connect 集成。
2. 若设备已开机但问题仍在，请检查设备网络连接并对设备执行软重置。
3. 若问题仍在，请在 Home Connect App 中检查设备与 Home Connect API 的连接状态。
   1. 打开 Home Connect App。
   2. 进入出现问题的设备页面。
   3. 在屏幕底部打开设置菜单。
   4. 进入 **网络（Network）** 部分。
4. 检查设备是否连接到云端：
   * 若设备与云端之间的连线为红色，且带有红色告警图标 `[mdi:alert-outline]`，说明设备未连接到 Home Connect API。
   * 若设备与云端之间的连线为绿色，说明设备已连接到云端。
5. 若上述均正常但问题依旧，请联系 Home Connect 支持。
   * [Home Connect 服务与联系方式](https://www.home-connect.com/us/en/support/contact-and-service)
   * [Home Connect 开发者帮助与支持](https://developer.home-connect.com/support/contact)

## 移除集成

该集成按标准方式移除，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

删除集成后，请前往 [Home Connect 开发者门户中的应用列表](https://developer.home-connect.com/applications)，找到用于 Home Assistant 的应用，进入详情后点击“删除应用（Delete Application）”。
