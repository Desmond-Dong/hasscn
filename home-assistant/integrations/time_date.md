The **Time & Date** integration allows one to create sensors for the current date or time in different formats. All values are based on the timezone which is set in "General Configuration".

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

Sensors including the time update every minute, the date sensor updates each day at midnight.

<p class='img'>
  <img src='/home-assistant/images/screenshots/time_date.png' />
</p>

# Producing your own custom time and date sensor

The following can be used to create a time and date sensor whose output can be properly customised to use your own preferred formatting, specified in the call to timestamp\_custom() using standard [Python datetime formatting](https://docs.python.org/3.8/library/datetime.html#strftime-and-strptime-behavior).

```yaml
sensor:
  # Minimal configuration of the standard time and date sensor
  - platform: time_date
    display_options:
      - 'date_time_iso'
  # Build on the standard sensor to produce one that can be customized    
template:
  - sensor:
      - name: "Date and time"
        state: "{{ as_timestamp(states('sensor.date_time_iso')) | timestamp_custom('%A %B %-d, %I:%M %p') }}"
        icon: "mdi:calendar-clock"
```

## More time-related resources

For more information about using time related variables and sensors in templates (such as `today_at()`, `now()` or `as_timestamp()`) visit this [time section](/home-assistant/docs/configuration/templating/index.md#time) on the templating page.
