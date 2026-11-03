# pip3：找不到命令

这个工具通常会作为 Python 3 安装的一部分一同安装。运行 `python3 --version` 可检查 Python 3 是否已安装。如果尚未安装，请[在此下载](https://www.python.org/getit/)。

如果您能够成功运行 `python3 --version` 但无法运行 `pip3`，请通过运行以下命令来安装 Home Assistant：

```bash
python3 -m pip install homeassistant==..
```

在 Debian 系统上，您也可以通过 `sudo apt-get install python3` 安装 python3，通过 `sudo apt-get install python3-pip` 安装 pip3。

如果您在安装过程中遇到错误，请检查您是否已安装所有必要的先决条件包，包括 `python3-dev`、`libffi-dev` 和 `libssl-dev`。在基于 Debian 的系统上，您可以通过 `apt-get` 安装这些包：

```bash
sudo apt-get install python3-dev libffi-dev libssl-dev
```
