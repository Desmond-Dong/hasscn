# Islamic Prayer Times

The **Islamic Prayer Times** integration displays the various prayer times for Muslims as sensors.

This platform calculates prayer times using the following calculation methods:

* Shia Ithna-Ansari
* Islamic Society of North America
* University of Islamic Sciences, Karachi
* Muslim World League
* Umm Al-Qura University, Makkah
* Egyptian General Authority of Survey
* Institute of Geophysics, University of Tehran
* Gulf Region
* Kuwait
* Qatar
* Majlis Ugama Islam Singapura, Singapore
* Union Organization islamic de France
* Diyanet İşleri Başkanlığı, Turkiye
* Spiritual Administration of Muslims of Russia
* Moonsighting Committee Worldwide

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Integration Sensors

The following sensors are added by the integration:

sensors:

* fajr: Show the fajr prayer time for today.
* sunrise: Show the sunrise for today which is the end of fajr prayer. This is a calculated field and may not necessarily be the same as the astronomical sunrise.
* dhuhr: Show the dhuhr prayer time for today.
* asr: Show the asr prayer time for today.
* maghrib: Show the maghrib prayer time for today.
* isha: Show the isha prayer time for today.
* midnight: Show the midnight for today which is the end of isha prayer. This is a calculated field and is not the same as 12AM.

## Configuration

### Prayer calculation method

Default: Islamic Society of North America

A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to Islamic Society of North America.

### Latitude Adjustment Method

Default: Middle of the night

Method for adjusting times higher latitudes - for instance, if you are checking timings in the UK or Sweden.

### Midnight mode

Default: Standard (mid sunset to sunrise)

### School

Default: Shafi

Method for adjusting Asr time calculation, if not specified, it defaults to Shafi.
