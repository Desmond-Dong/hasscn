---
title: 用户界面
description: Music Assistant 用户界面导览
---

# 用户界面

## 主菜单

!<a href="/assets/screenshots/UI-main-menu.png" target="_blank"><img src="/assets/screenshots/UI-main-menu.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

此菜单的外观可以在设置/用户界面中配置。在桌面上，它可以垂直放置在左侧（如图所示）或水平放置在底部（通过选择"强制移动端布局"）。在移动端布局中，主页、搜索和库将显示，其他项目将在"库"下可用。启用的菜单项（视图）按选择顺序显示。任何视图都可以隐藏。如果设置视图从菜单中隐藏，可以通过导航到 `YOUR_MA_IP_ADDRESS:8095/#/settings` 访问

> [!CAUTION]
> 如果您同时删除主页和设置图标，您将被锁定。在这种情况下，您需要手动输入路径（例如 `http://192.168.1.166:8095/#/settings/frontend`）或清除浏览器 Cookie 以重新获得对设置页面的访问权限。

***************************************************************

## 全局搜索
<a href="/assets/screenshots/global-search.png" target="_blank"><img src="/assets/screenshots/global-search.png" alt="image" loading="lazy" /></a>

搜索可以通过任意组合的单词或部分单词进行，也可以通过提供商的 URL 进行，例如 `https://open.spotify.com/album/0BwWUstDMUbgq2NYONRqlu` 

最初，视图默认为"全部"，在音轨、艺术家、专辑、播放列表、播客、有声读物和广播这七个类别中最多显示8个项目。

选择特定类别后将显示最多50个项目。每个项目都有上下文敏感菜单。如果未找到所需项目，请缩小搜索词范围或导航到艺术家，该视图中应显示所有可用的专辑和音轨。
***************************************************************

## 播放器栏
<a href="/assets/screenshots/UI-playercontrols-bar.png" target="_blank"><img src="/assets/screenshots/UI-playercontrols-bar.png" alt="image" loading="lazy" /></a>

[音频管道](/music-assistant/audiopipeline/)可选标签通过彩色图标和两个字母显示音频输出的质量（低质量、高质量和 Hi-Res）。橙色圆圈和 LQ 表示正在使用有损编解码器，绿色圆圈和 HQ 表示正在使用无损编解码器，青色圆圈和 HR 表示无损编解码器和[高解析度采样率或位深](/music-assistant/player-support/#audio-quality)。对于群组，如果播放器之间的质量不同，将指示可用的最高质量。

***************************************************************

## 正在播放视图
<a href="/assets/screenshots/now-playing-view.png" target="_blank"><img src="/assets/screenshots/now-playing-view.png" alt="image" loading="lazy" /></a>

此视图会根据屏幕宽度而变化。在较宽的显示器上，您可以看到正在播放的音轨（及相关信息）以及队列，播放器选择在底部可用。在较窄的显示器上，您需要使用右下角的切换按钮在当前播放信息和队列之间切换，播放器选择通过顶部较小的扬声器图标可用。可以使用右侧的 ⋮ 菜单对队列进行调整。

[音频管道](/music-assistant/audiopipeline/)可选标签在上面的[播放器栏](#player-bar)部分中有描述。

您也可以[通过 URL 直接访问正在播放视图](/music-assistant/faq/how-to/#now-playing-view)

当收藏图标为实心时，选择它将显示两个选项 - "从收藏夹移除"和"添加到播放列表"。如果在播放开始后从其他视图更改了收藏状态，则在重新播放该音轨之前，收藏状态可能无法正确显示。

当正在播放的音轨有歌词可用时，将显示"歌词"可选标签。选择后，队列将被歌词替换，当有时间信息时，歌词将与音乐同步。准确的歌词选择取决于元数据提供商，对于歌曲的替代版本可能不准确。
***************************************************************

## 播放器列表

<a href="/assets/screenshots/UI-speakers-menu.png" target="_blank"><img src="/assets/screenshots/UI-speakers-menu.png" alt="image" loading="lazy" /></a>

> [!NOTE]
> 播放器群组旁显示的音量是每个单独播放器音量的平均值。当群组音量更改时，每个播放器按比例更改。

当[播放器群组](/music-assistant/faq/groups/)打开时，该群组的成员将从播放器列表中消失，对这些播放器的单独播放将不可用。要单独播放到某个播放器，请关闭群组或将播放器从群组中移除。

> [!NOTE]
> 每个播放器旁显示的 MDI 图标可以在播放器设置中更改。
***************************************************************

## 播放器分组

有四种方式可以对播放器进行分组

1.   **[临时同步群组。](/music-assistant/faq/groups/#temporary-sync-group)** 如[播放器列表](#player-list)部分所示，播放器可以通过播放器列表中的复选框链接。只有支持同步播放的相同类型播放器才允许加入。这些播放器将同步播放。需要注意的是，当以这种方式分组播放器时，只有主播放器保存队列。 
2.   **[同步群组。](/music-assistant/faq/groups/#sync-groups)** 通过设置创建一个（永久）群组播放器。除了同步播放外，群组还将在群组播放器上保存队列，而不是在其子播放器之一上。
3.   **[通用群组。](/music-assistant/faq/groups/#universal-groups)** 这允许对不同的播放器提供商类型进行分组，但请仔细注意链接页面上的潜在限制。
4.   **原生群组。** 使用某些播放器提供商类型（如 Google Cast）提供的原生分组功能

对于临时同步群组，由于命名约定，可以看到正在流式传输的播放器数量。在下面的示例图像中，群组中有三个播放器。

!<a href="/assets/screenshots/group_indication.png" target="_blank"><img src="/assets/screenshots/group_indication.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

> [!NOTE]
> **注意**
>
> 如果尝试打开一个群组，而该群组的成员已经是另一个已打开群组的成员，则会显示错误。

> [!NOTE]
> **注意**
>
> 如果播放器被其他应用接管，MA 不会知道，群组可能无法正常工作。此外，如果同步群组中的播放器尝试延迟加入（例如它之前未通电），它将不会与群组同步。
***************************************************************

## 播放按钮 !<a href="/assets/icons/play-button.png" target="_blank"><img src="/assets/icons/play-button.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

播放按钮用作在 UI 中播放各种项目的快捷方式。它在非移动设备上悬停时显示，或在移动设备上始终可见。  

点击/触摸播放按钮将执行项目的默认播放操作或显示播放菜单。为确保用户不会意外在错误的播放器上播放，播放菜单将显示：

- 首次进入 MA 视图时；或
- 如果播放器未播放（或已暂停）

> [!NOTE]
> **注意**
>
> 如果不确定项目是否会立即开始播放，请使用右键或长按调出菜单。

***************************************************************

## 多选 !<a href="/assets/icons/multiselect.png" target="_blank"><img src="/assets/icons/multiselect.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

选择多选图标后，全选图标将出现。  

点击/触摸全选图标将选择视图中的所有项目（或视图的适当部分）。对于大型列表，将出现确认对话框，因为根据主机的资源，选择数千个项目可能会导致无响应。

CTRL-A 也可以选择所有项目，除非搜索框可见，此时它将选择该框中的所有文本。此外，CTRL-A 在具有多个部分的视图上不起作用（例如艺术家视图有专辑和音轨），因此在这种情况下必须使用多选图标。 

***************************************************************

## 音轨菜单

在以下任何视图中，右键或长按音轨以获取以下菜单

!<a href="/assets/screenshots/UI-track-menu.png" target="_blank"><img src="/assets/screenshots/UI-track-menu.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

只有在有支持它的提供商时，才会看到"开始电台"选项。开始电台会用基于所选音轨的音轨填充队列。音轨由提供商而非 MA 选择。 
***************************************************************

## 视图 - 主页

<a href="/assets/screenshots/homescreen.png" target="_blank"><img src="/assets/screenshots/homescreen.png" alt="image" loading="lazy" /></a>

主页视图提供对各种媒体类型的快速访问。还显示来自支持此功能的提供商（如 Tidal）的推荐。查看音乐提供商页面以确定哪些提供商支持此功能。

视图完全可配置。选择右上角的蓝色图标，然后选择"编辑主页"。然后可以显示或隐藏每一行并调整顺序。返回菜单以禁用编辑模式。

<a href="/assets/screenshots/homescreen_edit.png" target="_blank"><img src="/assets/screenshots/homescreen_edit.png" alt="image" loading="lazy" /></a>
***************************************************************

## 视图 - 艺术家/专辑/音轨

<a href="/assets/screenshots/UI-artist-view.png" target="_blank"><img src="/assets/screenshots/UI-artist-view.png" alt="image" loading="lazy" /></a>

专辑和音轨视图与上述相同，只是没有专辑艺术家筛选图标，音轨视图有[通过 URL 添加](/music-assistant/music-providers/builtin/)选项。

任何图标上的蓝点（例如搜索图标 !<a href="/assets/icons/search-icon.png" target="_blank"><img src="/assets/icons/search-icon.png" alt="image" loading="lazy" style="max-width: 100%;" /></a> ）表示查看的结果受到筛选。

提供商筛选图标仅在安装了两个或更多支持正在查看的媒体类型的音乐提供商时才会显示。可以选择多个提供商作为筛选的一部分。

所有视图中的项目都可以"右键单击"或"长按"以调出广泛的选项菜单，这与右侧的 ⋮ 菜单相同。在上图中显示了完整的可能性列表，这将根据当前视图略有不同。

可以通过单击[多选图标](#multi-select)来选择多个专辑/艺术家/音轨。选择一个或多个项目后，单击底部的"操作"

!<a href="/assets/screenshots/UI-actions.png" target="_blank"><img src="/assets/screenshots/UI-actions.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

将调出此菜单

!<a href="/assets/screenshots/UI-actions-menu.png" target="_blank"><img src="/assets/screenshots/UI-actions-menu.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

上述描述的行为适用于您看到"已选择 x 个项目"文本的任何视图。
***************************************************************

## 视图 - 单个艺术家

<a href="/assets/screenshots/UI-individual-artist.png" target="_blank"><img src="/assets/screenshots/UI-individual-artist.png" alt="image" loading="lazy" /></a>

音轨和专辑部分可折叠。上面的视图显示它们都已折叠。音轨部分显示库中或所有提供商上可用的所有音轨。库图标上的蓝点 !<a href="/assets/icons/library-icon.png" target="_blank"><img src="/assets/icons/library-icon.png" alt="image" loading="lazy" style="max-width: 100%;" /></a> 表示查看的结果被筛选为仅显示库中的项目。要查看任何给定音轨所在的专辑，您可以按字母顺序排序或单击一个并使用上下文菜单和"显示信息"。

专辑部分有一个额外的筛选选项。您可以选择按专辑、单曲、合辑、EP 或未知专辑类型的任意组合进行筛选。

展开"图片"部分允许选择缩略图、同人画或 Logo。显示的其他类型目前不在 UI 中使用。如果没有显示图片或图片有限，或图片部分缺失，请转到视图右上角的 ⋮ 菜单并选择"更新元数据"。右键单击图片可将其设为主要使用的图片。（类似功能在专辑视图中也可用于缩略图）

### 提供商详情

"提供商详情"部分显示在可用提供商中链接到艺术家的提供商（专辑和音轨有类似部分）。如果艺术家有别名或存在变体拼写、标点使用等情况，这里有多个条目是正常的。因此，可能有许多条目显示提供商内和跨提供商的匹配链接。当项目添加到 MA 库时，会触发跨提供商和提供商内的交叉链接，可以通过使用 <img src="/assets/icons/database-search.png" alt="icon" style="width: 20px;"  loading="lazy" />图标来触发。添加新提供商不会触发现有库项目的链接。

当项目添加到 MA 库时，可以创建 MA 库内到其他相同项目（在提供商内或跨提供商）的链接。如果内部匹配逻辑满足，将自动建立链接。

可以通过 ⋮ 菜单中的删除选项删除不正确的映射。对于本地文件，如果源文件未[全面标记](/music-assistant/music-providers/filesystem/#tagging-files)，可能会发生不正确的链接。

流媒体提供商旁显示的 ID 可用于自动化和脚本，可通过按右侧的 ⋮ 图标获取。在此菜单中，对于流媒体提供商，还有一个外部链接，可在源提供商上打开该项目的页面。

***************************************************************

## 视图 - 单个音轨

<a href="/assets/screenshots/UI-track-show-info.png" target="_blank"><img src="/assets/screenshots/UI-track-show-info.png" alt="image" loading="lazy" /></a>

> [!NOTE]
> 此视图中的"提供商详情"部分还具有在本地设备上播放音轨简短示例的功能。任何指示的采样率和位深都是由提供商报告的，如果在音频数据到达 MA 之前进行了转码，则可能在播放期间有所不同。
***************************************************************

## 视图 - 广播

广播视图显示 MA 库中可用的流媒体广播电台（这不是播放器队列的[电台模式](/music-assistant/usage/#radio-mode)）。可以通过以下方式将电台添加到库中：

* 添加到 URL - 可以通过从广播视图右上角的菜单中选择"添加到 URL"，将流媒体广播电台（包括自托管的 icecast 电台）的 URL 添加到库中。按提供商筛选时，它们将显示为由"Music Assistant"提供。

支持广播项目的音乐提供商在添加到库中时，这些项目将显示在此处
## 视图 - 浏览

进入浏览视图将显示已安装的[音乐提供商](/music-assistant/music-providers/)列表。选择其中一个将显示该提供商可浏览的项目相关列表。 

查看提供商时，您只会看到流媒体提供商库中已有的内容。对于本地提供商，您将看到所有文件，如果访问了一个尚未在 MA 库中的文件夹，即使之前已删除，它也将自动添加。

> [!CAUTION]
> **注意**
>
> 在提供商内浏览时要小心，因为选择文件夹上的"播放"将播放该文件夹和所有子文件夹中的所有内容。尝试播放数千个音轨可能会消耗主机上过多的系统资源，并导致 MA 崩溃或无响应。

[Radio Browser](/music-assistant/music-providers/radio-browser/) 提供商的所有广播电台都在此视图中可用。已添加到库中的单个电台可在广播视图中找到。

