# Jewish Calendar

**Jewish Calendar** 集成通过多个传感器公开犹太日历信息。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Language:
  description: 文本传感器使用的语言，希伯来语（א' תשרי תשע"ט）或英文字符（1 Tishrei 5779）。有效选项为 `english` 和 `hebrew`。默认值为 `english`。

Diaspora:
  description: 将位置视为离散（חוץ לארץ）用于计算每周部分和节日。默认情况下，它将位置视为以色列（一天 Yom Tov），将其设置为 true 将显示第二天的 Yom Tov。

Latitude, Longitude, Time Zone and Elevation:
  description: 允许您覆盖 Home Assistant 提供的默认位置信息用于计算。
```

## 高级选项

```yaml
Minutes before sunset for candle lighting:
  description: 日落前多少分钟被视为点灯时间。在以色列，这通常是 20、30 或 40 分钟，具体取决于您的位置。在以色列以外，通常使用 18 或 24 分钟。*默认设置为 18 分钟。*

Minutes after sunset for Havdalah:
  description: 默认情况下，Havdalah 时间被视为太阳在地平线下 8.5 度的时刻。通过指定此偏移量，Havdalah 时间将计算为相对于日落的静态时间偏移。
```

## 传感器列表

### 数据传感器

* `date`：显示今天的希伯来日期。
* `parshat_hashavua`：显示每周部分（parshat hashavu'a - פרשת השבוע）
* `holiday`：如果是节日，显示节日名称（*更多信息见下文*）。
* `day_of_the_omer`：指示 Omer 日期（1-49）的整数传感器，如果当前不是 Omer 则为 0。
* `daf_yomi`：显示日期的 daf yomi 页面。

### 时间传感器

*注意：由于各拉比对计算不同时间的意见不同，我们不对您宗教依赖这些计算承担任何责任。*

时间传感器状态表示为 ISO8601 格式的 *UTC 时间*。

* `alot_hashachar`：黎明第一道光（Alot Hashachar - עלות השחר）
* `talit_and_tefillin`：披巾和经文匣的最早时间（Misheyakir - משיכיר）
* `hanetz_hachama`：晨祷的最早时间（Hanetz Hachama - הנץ החמה）
* `latest_time_for_shma_gr_a`：根据 Gr"a 的 Shma 阅读最后时间。
* `latest_time_for_shma_mg_a`：根据 MG"A 的 Shma 阅读最后时间。
* `latest_time_for_tefilla_gr_a`：根据 Gr"a 的完整晨祷最后时间。
* `latest_time_for_tefilla_mg_a`：根据 MG"A 的完整晨祷最后时间。
* `chatzot_hayom`：一天的中点（Chatzot Hayom - חצות היום）
* `mincha_gedola`：午后祷告的最早时间（Mincha Gedola - מנחה גדולה）
* `mincha_ketana`：午后祷告的首选最早时间（Mincha Ketana - מנחה קטנה）
* `plag_hamincha`：Plag Hamincha 时间（פלג המנחה）
* `shkia`：日落（Shkiya - שקיעה）
* `t_set_hakochavim`：第一颗星星可见的时间（Tseit Hakochavim - צאת הכוכבים）
* `t_set_hakochavim_3_stars`：三颗星星可见的时间，主要用于 Havdalah
* `upcoming_shabbat_candle_lighting`：当前安息日（如果当前是安息日）或即将到来的安息日的点灯时间。
* `upcoming_shabbat_havdalah`：当前安息日（如果当前是安息日）或即将到来的安息日的 Havdalah 时间。如果当前是三天假日，此值*可能*为 None（例如，如果假日是周六/周日/周一，而现在是周六，将没有 `shabbat_havdalah` 值。有关详细信息，请参阅 hdate 库中的注释。）
* `upcoming_candle_lighting`：当前安息日或节日，或即将到来的安息日或节日的点灯时间。例如，如果今天是周日，而犹太新年是周一晚上到周三晚上，这将报告周一晚上犹太新年的点灯时间。这避免了在当前是节日时触发点灯前自动化的情况。要始终获取安息日时间，请使用 `upcoming_shabbat_candle_lighting` 传感器。
* `upcoming_havdalah`：当前安息日或节日，或即将到来的安息日或节日的 Havdalah 时间。例如，如果今天是周日，而犹太新年是周一晚上到周三晚上，这将报告周三晚上犹太新年的 Havdalah 时间。要始终获取安息日时间，请使用 `upcoming_shabbat_havdalah` 传感器。

### 二值传感器

* `issur_melacha_in_effect`：指示当前是否不允许工作的布尔传感器。当前是安息日或节日时值为 *on*，否则为 *off*。
* `erev_shabbat_hag`：指示即将到来的安息日或节日的布尔传感器。
* `motzei_shabbat_hag`：指示安息日或节日已结束的布尔传感器。

### 节日传感器

节日传感器包含 2 个属性：*type* 和 *id*。

*id* 对自动化很有用，这样它们就不依赖于语言。

在 Tevet 月的 Rosh Chodesh，这总是落在光明节期间，传感器将报告两个值："Rosh Chodesh, Chanukah"。

在以色列，Shvat 月 30 日，传感器将报告："Rosh Chodesh, Family day"。在 Tishrei 月 22 日，它将报告："Shmini Atzeret, Simchat Torah"。

以下是传感器知道的节日列表及其选定的类型：

| ID                   | English                    | Hebrew                | Type                      |
|----------------------|----------------------------|-----------------------|---------------------------|
| erev\_rosh\_hashana    | Erev Rosh Hashana          | ערב ראש השנה          | EREV\_YOM\_TOV              |
| rosh\_hashana\_i       | Rosh Hashana I             | א' ראש השנה           | YOM\_TOV                   |
| rosh\_hashana\_ii      | Rosh Hashana II            | ב' ראש השנה           | YOM\_TOV                   |
| tzom\_gedaliah        | Tzom Gedaliah              | צום גדליה             | FAST\_DAY                  |
| erev\_yom\_kippur      | Erev Yom Kippur            | עיוה"כ                | EREV\_YOM\_TOV              |
| yom\_kippur           | Yom Kippur                 | יום הכפורים           | YOM\_TOV                   |
| erev\_sukkot          | Erev Sukkot                | ערב סוכות             | EREV\_YOM\_TOV              |
| sukkot               | Sukkot                     | סוכות                 | YOM\_TOV                   |
| sukkot\_ii            | Sukkot II                  | שני של סוכות          | YOM\_TOV                   |
| hol\_hamoed\_sukkot    | Hol hamoed Sukkot          | חול המועד סוכות       | HOL\_HAMOED                |
| hoshana\_raba         | Hoshana Raba               | הושענא רבה            | EREV\_YOM\_TOV              |
| shmini\_atzeret       | Shmini Atzeret             | שמיני עצרת            | YOM\_TOV                   |
| simchat\_torah        | Simchat Torah              | שמחת תורה             | YOM\_TOV                   |
| chanukah             | Chanukah                   | חנוכה                 | MELACHA\_PERMITTED\_HOLIDAY |
| rabin\_memorial\_day   | Yitzhak Rabin memorial day | יום הזכרון ליצחק רבין | MEMORIAL\_DAY              |
| asara\_btevet         | Asara B'Tevet              | צום עשרה בטבת         | FAST\_DAY                  |
| tu\_bshvat            | Tu B'Shvat                 | ט"ו בשבט              | MINOR\_HOLIDAY             |
| family\_day           | Family Day                 | יום המשפחה            | ISRAEL\_NATIONAL\_HOLIDAY   |
| memorial\_day\_unknown | Memorial day for fallen whose place of burial is unknown | יום הזיכרון לחללי מערכות ישראל שמקום קבורתם לא נודע | MEMORIAL\_DAY |
| taanit\_esther        | Ta'anit Esther             | תענית אסתר            | FAST\_DAY                  |
| purim                | Purim                      | פורים                 | MELACHA\_PERMITTED\_HOLIDAY |
| shushan\_purim        | Shushan Purim              | שושן פורים            | MELACHA\_PERMITTED\_HOLIDAY |
| erev\_pesach          | Erev Pesach                | ערב פסח               | EREV\_YOM\_TOV              |
| pesach               | Pesach                     | פסח                   | YOM\_TOV                   |
| pesach\_ii            | Pesach II                  | שני של פסח            | YOM\_TOV                   |
| hol\_hamoed\_pesach    | Hol hamoed Pesach          | חול המועד פסח         | HOL\_HAMOED                |
| pesach\_vii           | Pesach VII                 | שביעי פסח             | YOM\_TOV                   |
| pesach\_viii          | Pesach VIII                | אחרון של פסח          | YOM\_TOV                   |
| yom\_hashoah          | Yom HaShoah                | יום השואה             | MEMORIAL\_DAY              |
| yom\_hazikaron        | Yom HaZikaron              | יום הזכרון            | MEMORIAL\_DAY              |
| yom\_haatzmaut        | Yom HaAtzma'ut             | יום העצמאות           | MODERN\_HOLIDAY            |
| lag\_bomer            | Lag B'Omer                 | ל"ג בעומר             | MINOR\_HOLIDAY             |
| yom\_yerushalayim     | Yom Yerushalayim           | יום ירושלים           | MODERN\_HOLIDAY            |
| erev\_shavuot         | Erev Shavuot               | ערב שבועות            | EREV\_YOM\_TOV              |
| shavuot              | Shavuot                    | שבועות                | YOM\_TOV                   |
| shavuot\_ii           | Shavuot II                 | שני של שבועות         | YOM\_TOV                   |
| tzom\_tammuz          | Tzom Tammuz                | צום שבעה עשר בתמוז    | FAST\_DAY                  |
| zeev\_zhabotinsky\_day | Zeev Zhabotinsky day       | יום זאב ז'בוטינסקי    | MEMORIAL\_DAY              |
| tisha\_bav            | Tish'a B'Av                | תשעה באב              | FAST\_DAY                  |
| tu\_bav               | Tu B'Av                    | ט"ו באב               | MINOR\_HOLIDAY             |
| rosh\_chodesh         | Rosh Chodesh               | ראש חודש              | ROSH\_CHODESH              |

## 操作

可用操作：

* `jewish_calendar.count_omer`

### 操作 数 Omer

`jewish_calendar.count_omer` 操作返回给定日期的数 Omer 祷文。

| 数据属性 | 可选 | 描述                              |
| -------------- | -------- | ---------------------------------------- |
| `date`         | 是    | 获取 Omer 祝福的日期。默认为今天。 |
| `after_sunset` | 是  | 如果为 true 且提供了日期，则根据日落后的希伯来日期计算 Omer 计数。如果未指定日期则忽略。默认为 true。 |
| `nusach`       | 否     | Omer 祝福的 Nusach（传统）。 |
| `language`     | 是    | 返回的语言。默认为希伯来语。 |

如果给定日期没有 Omer 计数，消息将为空。
支持的 nusachim 有：Ashkenaz、Sfarad、Adot Mizrah 和 Italian。

#### 示例

```yaml
action: jewish_calendar.count_omer
data:
  nusach: sfarad
  date: "2025-05-20"       # 可选；默认为今天
  language: en             # 可选；默认为希伯来语
  after_sunset: true       # 可选；默认为 true
```

将返回以下内容：

```yaml
message: Today is the thirty-seventh day, which are five weeks and two days of the Omer
weeks: 5
days: 2
total_days: 37
```

#### 最小调用

```yaml
action: jewish_calendar.count_omer
data:
  nusach: sfarad
```

将根据希伯来日期返回当前希伯来语文本，考虑当前时间相对于日落。

```yaml
message: היום ארבעה עשר יום שהם שני שבועות לעומר
weeks: 2
days: 0
total_days: 14
```
