# 使用 Jupyter Notebooks 探索 IoT 数据

*这是 Anton Kireyeu 的第一篇博客文章。他是 Home Assistant 的新贡献者，接下来会专注于 Home Assistant 数据的探索与可视化。*

正如我们在 Fabian 最近的[博客文章][博客 post by Fabian]中了解到的那样，你的 Home Assistant 应用运行数据都存储在本地，并且可以被进一步探索。我们的第一步通常是用 [DB Browser for SQLite] 查询数据，把结果导出为 CSV，再在 LibreOffice 里画图。但这些数据还能做什么？又有哪些工具可以用？

这篇文章会帮你配置几款常用数据科学工具，让你在本地处理自己的数据：

*  [Pandas]：Python 开源数据分析工具
*  [matplotlib]：Python 绘图库
*  [Jupyter notebook]：可创建和分享文档的应用，文档中可包含可执行代码、可视化图表和说明文字

<p class='img'>
<img src='/home-assistant/images/blog/2016-07-data-exploration/graph.png'>
本教程中生成的一张图表。
</p>

*TL;DR：直接使用[这个 Jupyter Notebook][nb-prev] 来可视化你的数据。*

[博客 post by Fabian]: /博客/2016/07/19/visualizing-your-iot-data/

[DB Browser for SQLite]: https://sqlitebrowser.org/

[Pandas]: https://pandas.pydata.org/

[matplotlib]: https://matplotlib.org/

[Jupyter notebook]: https://jupyter.org/

[nb-prev]: https://nbviewer.org/github/home-assistant/home-assistant-notebooks/blob/master/other/DataExploration-1/DataExploration-1.ipynb

<!--more-->

### 依赖项

要运行本文提供的 Jupyter notebook，请先确认你的电脑已安装以下应用/库：

* Pandas
* NumPy
* Matplotlib
* SQLAlchemy
* Jupyter

作为 Windows 用户，我觉得安装这些依赖最简单、最快、最省事的方法是使用 [WinPython]。这个免费的开源便携发行版包含了本 notebook 所需的全部依赖，以及未来进行数据探索时可能会用到的一些常用 Python 库。

[WinPython]: https://winpython.github.io/

#### 为什么用 Jupyter？

虽然不同 Home Assistant 部署的配置、组件和脚本各不相同，但底层数据结构是标准化且定义清晰的。这让我们可以编写与环境无关的 Python 代码。把这些内容放进 Jupyter notebook，可以把代码、图表和步骤说明组织得更易读、更完整。Jupyter 最强大的特点之一，就是你可以边运行边改代码，实时定制输出和可视化结果！

#### 从哪里开始？

本教程基于我们制作的一份带有大量注释的 Jupyter Notebook。要开始，请先打开它：

* [下载教程 Jupyter Notebook][nb-prev]（链接会打开预览页，然后点击右上角 download）
* 启动 Jupyter Notebook 应用
* 点击“upload”按钮，将下载的 notebook 添加到 Jupyter
* 调整 notebook 开头的 `DB_URL`，指向你的 Home Assistant 数据库
* 在顶部菜单中选择：Cell -> Run All

就这么简单！附带代码会带你完成：导入所需库、对本地数据库执行原始 SQL、从 states 表绘制基础数据图，最后还会输出系统中每个实体的变化图，以及过去 20 天的日均值图表。

完成以上步骤后，你会看到如下格式良好的可视化结果：

<p class='img'>
<img src='/home-assistant/images/blog/2016-07-data-exploration/graph.png'>
本教程中生成的一张图表。
</p>

#### 下一步做什么？

借助 Jupyter 的强大能力，所有代码都可按需定制：想只展示某个实体的数据？完全可以！想调整图表样式参数？也没问题！

在你学习和探索 IoT 数据的同时，我们也会继续提供更多开箱即用的 Jupyter Notebooks。欢迎随时提问或提出建议。你是否想看到某种特定可视化？是否对某个数据维度特别感兴趣？一起来交流，一起深入数据世界！
