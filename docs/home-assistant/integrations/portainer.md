---
title: Portainer
description: 'The Portainer integration is used as an interface to the Portainer API(https://docs.portainer.io/api). Portainer is a lightweight management UI that。'
ha_category:
  - Binary sensor
  - Button
  - Sensor
  - Switch
ha_release: '2025.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@erwindouna'
ha_domain: portainer
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---
# Portainer

The **Portainer** integration is used as an interface to the [Portainer API](https://docs.portainer.io/api).
Portainer is a lightweight management UI that allows you to easily manage your Docker containers, images, networks, and volumes. It works on every Docker host or Swarm cluster.

The Portainer API provides a way to manage Docker containers, images, networks, and volumes. It allows you to interact programmatically with your Docker host or Swarm cluster.

## Prerequisites

Before you can configure Portainer within Home Assistant, you need a few things:

- have Portainer installed and a user with administrator rights on Portainer.
- An access token. 

Create a Portainer Access Token by following these steps:

1. Log in to your Portainer instance.
2. To create an access token, follow the steps in the [Portainer documentation](https://docs.portainer.io/api/access).
3. Copy the generated Access Token and store it somewhere safe, you will need it in the next steps.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Supported functionality

There is currently support for the following device types within Home Assistant:

### Binary sensors

- **Status**: Reports whether a container is running.

### Buttons

- **Restart container**: Restarts the container.
- **Prune unused images**: Removes unused Docker images from the endpoint.

### Sensors

#### Container sensors

- **State**: Current container state (such as `running`, `exited`, `paused`).
- **Image**: The Docker image the container is based on.
- **CPU usage total**: Total CPU time consumed by the container.
- **Memory usage**: Current memory usage of the container.
- **Memory usage percentage**: Memory usage as a percentage of the container's limit.
- **Memory limit**: Memory limit configured for the container.

#### Endpoint sensors

- **Docker version**: Docker engine version running on the host.
- **API version**: Docker API version on the host.
- **Kernel version**: Kernel version of the host operating system.
- **Operating system**: Operating system running on the host.
- **Total memory**: Total memory available on the host.
- **Total CPU**: Total CPU cores available on the host.
- **Containers running**: Number of currently running containers.
- **Containers stopped**: Number of stopped containers.
- **Containers paused**: Number of paused containers.
- **Container count**: Total number of containers on the endpoint.
- **Image count**: Total number of Docker images.
- **Container disk usage total size**: Total disk space used by containers.
- **Image disk usage total size**: Total disk space used by images.
- **Volume disk usage total size**: Total disk space used by volumes.

#### Stack sensors

- **Status**: Whether the stack is `active` or `inactive`.
- **Type**: The stack type: `Compose`, `Swarm`, or `Kubernetes`.
- **Container count**: Number of containers belonging to the stack.

### Switches

- **Container**: Starts or stops an individual Docker container.
- **Stack**: Starts or stops all containers in a stack.

## Examples

The following examples show how to use the Portainer integration in Home Assistant automations. These examples are just a starting point, and you can use them as inspiration to create your own automations.

### Notify when a container went down

The following example sends a notification to your mobile device when a container went down.


```yaml
automation:
  - alias: "Container went down"
    triggers:
      - trigger: state
        entity_id:
          - sensor.container_state
        to:
          - exited

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Container alert"
          message: "Container went down!"
```


## Actions

Portainer provides the following actions.

### Action: Prune images

The `portainer.prune_images` can be used to prune unused images more granually, such as a duration and/or if images are dangling.

- **Data attribute**: `device_id`
    - **Description**: The ID of the device/endpoint to prune images on.
    - **Optional**: No
- **Data attribute**: `until`
    - **Description**: The duration in time in the past.
    - **Optional**: Yes
- **Data attribute**: `dangling`
    - **Description**: If true, only prune dangling images.
    - **Optional**: Yes

## Supported devices

The integration creates one device per Portainer endpoint (Docker host). Containers and stacks appear as child devices under their endpoint. If a container belongs to a stack, it is nested under that stack instead.

### Endpoints

Each Docker host managed by Portainer is represented as an endpoint device, exposing host-level information such as Docker version, memory, CPU, and container counts.

### Containers

Each Docker container is a child device under its endpoint or stack. Container devices expose resource usage sensors, a status binary sensor, a restart button, and a switch to start or stop the container.

### Stacks

Each Docker Compose or Swarm stack is a child device under its endpoint. Stack devices expose a status sensor, a type sensor, a container count sensor, and a switch to start or stop the entire stack.

Docker API Engine needs to be equal to or above version 1.44. Older versions are [deprecated](https://docs.docker.com/reference/api/engine/#deprecated-api-versions). 

## Data updates

The integration normally updates every 60 seconds. For more detailed steps on how to define a custom polling interval, follow the procedure below.

### Defining a custom polling interval

If you want to define a specific interval at which your device is polled for data, you can disable the default polling interval and create your own polling automation.

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/), and select your integration.
2. On the integration entry, select `[mdi:dots-vertical]`.
   - Then, select **System options** and toggle the button to disable polling.
   ![Disable polling for updates](/home-assistant/images/screenshots/custom_polling_01.png)
3. To define your custom polling interval, create an automation.
   - Go to [**Settings** > **Automations & scenes**](https://my.home-assistant.io/redirect/automations/) and create a new automation.
   - Define any trigger and condition you like.
   - Select **Add action**, then select **Other actions**.
   - Select **Perform action**, and from the list, select the [`homeassistant.update_entity` action](/home-assistant/integrations/homeassistant/#action-homeassistantupdate_entity).
   - Choose your targets by selecting the **Choose area**, **Choose device**, **Choose entity**, or **Choose label** buttons.
   ![Update entity](/home-assistant/images/screenshots/custom_polling_02.png)
4. Save your new automation to poll for data.

## Known limitations

Currently, the integration does not support stacks or Edge computing.

## Removing the integration

This integration follows standard integration removal.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

After removing the integration, consider deleting the Portainer access token.
