---
title: Mealie
description: 'Mealie(https://mealie.io/) is an open source, self-hosted recipe manager, meal planner, and shopping list. The Mealie integration will fetch and allow you。'
ha_category:
  - Calendar
  - To-do list
ha_config_flow: true
ha_release: 2024.7
ha_iot_class: Local Polling
ha_codeowners:
  - '@joostlek'
  - '@andrew-codechimp'
ha_domain: mealie
ha_platforms:
  - calendar
  - diagnostics
  - sensor
  - todo
ha_integration_type: service
ha_quality_scale: platinum
---
# Mealie

[Mealie](https://mealie.io/) is an open source, self-hosted recipe manager, meal planner, and shopping list. The Mealie integration will fetch and allow you to create and update data held in your Mealie instance.

## 使用场景

- View your upcoming meal plans in the calendars.
- Use automations or your voice assistant to add items to a shopping list.
- Use [zone presence-detection](/home-assistant/getting-started/presence-detection/) to remind you when you approach a store that you have items on your shopping list to pick up.
- Search for a recipe by ingredient.

## 支持的版本

Mealie instances version 2 and later are supported.

## 前提条件

You create your API token on your Mealie installation:

1. Sign in to Mealie.
2. Go to your user (profile).
3. Go to **Manage Your API Tokens** under (`/user/profile/api-tokens`).
4. Enter a meaningful token name, such as 'Home Assistant'.
5. Select **Generate**.
6. Copy the token that now appears so that you can later paste it into Home Assistant.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
URL:
  description: The URL of your Mealie installation.
API token:
  description: The API token for your Mealie installation you generated in the prerequisites.
Verify SSL certificate:
  description: Enable this unless you are using a self-signed certificate on your Mealie installation.
```

## 可用日历

The integration will create a calendar for every type of meal plan, which are updated once an hour:

- Breakfast
- Lunch
- Dinner
- Side
- Dessert
- Drink
- Snack

## 购物清单

The integration will create a to-do list for every Mealie shopping list, which are updated every 5 minutes.

## 传感器

The integration provides the following sensors for the statistics, which are updated every 15 minutes:

- number of recipes
- categories (such as beverage, dessert, Italian, seafood)
- tags (such as alcohol)
- tools (such as instant pot, air fryer, or BBQ)
- users

## 操作

All Mealie actions require the integration `config_entry_id`. To find it, go to **Developer tools** > **Actions**. Choose the desired action and select your integration from dropdown. Then switch to YAML mode to see `config_entry_id`.

### 操作：获取餐食计划

The `mealie.get_mealplan` action gets the meal plan for a specified range.

- **Data attribute**: `config_entry_id`
  - **Description**: The ID of the Mealie config entry to get data from.
  - **Optional**: No

- **Data attribute**: `start_date`
  - **Description**: The start date of the meal plan. (today if not supplied)
  - **Optional**: Yes

- **Data attribute**: `end_date`
  - **Description**: The end date of the meal plan. (today if not supplied)
  - **Optional**: Yes

### 操作：获取菜谱

The `mealie.get_recipe` action gets the recipe for a specified recipe ID or slug.

- **Data attribute**: `config_entry_id`
  - **Description**: The ID of the Mealie config entry to get data from.
  - **Optional**: No

- **Data attribute**: `recipe_id`
  - **Description**: The ID or the slug of the recipe to get.
  - **Optional**: No

### 操作：获取菜谱列表

The `mealie.get_recipes` action gets a list of recipes that match your search terms. You can use this action to find the recipe ID or slug. The response includes a brief description of each recipe. To view full details and steps for a specific recipe, use the `mealie.get_recipe` action afterwards.

Please note the behavior of the search function depends on the backend used for Mealie (see [documentation](https://docs.mealie.io/documentation/getting-started/faq/#what-is-fuzzy-search-and-how-do-i-use-it)). In the case of postgresql backend, the search will be fuzzy, otherwise it will be literal.

- **Data attribute**: `config_entry_id`
  - **Description**: The ID of the Mealie config entry to get data from.
  - **Optional**: No

- **Data attribute**: `search_terms`
  - **Description**: Search terms on which all the properties of recipes are searched.
  - **Optional**: Yes

- **Data attribute**: `result_limit`
  - **Description**: The maximum number of recipes to return.
  - **Optional**: Yes

### 操作：导入菜谱

The `mealie.import_recipe` action imports a recipe into Mealie from a URL.

- **Data attribute**: `config_entry_id`
  - **Description**: The ID of the Mealie config entry to get data from.
  - **Optional**: No

- **Data attribute**: `url`
  - **Description**: The URL of the recipe.
  - **Optional**: No

- **Data attribute**: `include_tags`
  - **Description**: Include tags from the website to the recipe. (false by default)
  - **Optional**: Yes

### 操作：设置餐食计划

The `mealie.set_mealplan` action sets a meal plan on a specific date.

- **Data attribute**: `config_entry_id`
  - **Description**: The ID of the Mealie config entry to get data from.
  - **Optional**: No

- **Data attribute**: `date`
  - **Description**: The date that should be filled. 
  - **Optional**: No

- **Data attribute**: `entry_type`
  - **Description**: One of "breakfast", "lunch", "dinner", "side", "drink", "dessert", or "snack".
  - **Optional**: No

- **Data attribute**: `recipe_id`
  - **Description**: The recipe to plan.
  - **Optional**: Yes

- **Data attribute**: `note_title`
  - **Description**: The title of the meal note.
  - **Optional**: Yes

- **Data attribute**: `note_text`
  - **Description**: The description of the meal note.
  - **Optional**: Yes

### 操作：设置随机餐食计划

The `mealie.set_random_mealplan` action sets a random meal plan on a specific date.

- **Data attribute**: `config_entry_id`
  - **Description**: The ID of the Mealie config entry to get data from.
  - **Optional**: No

- **Data attribute**: `date`
  - **Description**: The date that should be filled. 
  - **Optional**: No

- **Data attribute**: `entry_type`
  - **Description**: One of "breakfast", "lunch", "dinner", "side", "drink", "dessert", or "snack".
  - **Optional**: No

### 操作：获取购物清单项目

The `mealie.get_shopping_list_items` action gets the shopping list items for a shopping list, including structured data for labels, units, and food.

- **Data attribute**: `entity_id`
  - **Description**: The ID of the Mealie ToDo list entity. May be a list of multiple entity IDs.

## 示例

<details>
<summary>使用 get_mealplan 的模板传感器示例</summary>


Example template sensor that contains today's dinner meal plan entries:


```yaml
template:
  - triggers:
      - trigger: time_pattern
        hours: /1
    actions:
      - action: mealie.get_mealplan
        data:
          config_entry_id: YOUR_MEALIE_CONFIG_ENTITY_ID
        response_variable: result
    sensor:
      - name: "Dinner today"
        unique_id: mealie_dinner_today
        state: >
          {% for meal in result.mealplan if meal.entry_type == "dinner" -%}
          {{ meal.recipe['name'] if meal.recipe is not none else meal.title -}}
          {{ ", " if not loop.last }}
          {%- endfor %}
```


</details>

## 已知限制

- When editing a food item within the shopping list the item will be converted to a note style item.

## 故障排除

If you are using the Mealie app for Home Assistant (formerly known as Mealie add-on), use the direct URL with port number (default 9090) for the Mealie web page. Do not use the ingress URL that ends with /xxx_mealie.

Before reporting an issue, enable [debug logging](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and restart the integration. As soon as the issue re-occurs, stop the debug logging again (_download of debug log file will start automatically_). Further, _if still possible_, download the diagnostics data. If you have collected the debug log and the diagnostics data, include them in the issue report.

## 删除集成

This integration follows standard integration removal, once the integration is removed you can remove the API token (assuming it was only used by this integration) by going to your Account in the Mealie web interface, then to **Manage Your API Tokens** and deleting the token you created for Home Assistant.

### 从 Home Assistant 中删除集成实例

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
