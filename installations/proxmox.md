> For AI agents: the complete documentation index is available at /llms.txt, the full documentation bundle is available at /llms-full.txt.

# Proxmox VE 刷机步骤

1. 下载对应的固件，并且解压缩成.qcow2格式

2. 上传.qcow2文件到 Proxmox VE 控制台的本地存储中

![upload](/static/image/upload.59924ff283.png)
3. 登录 Proxmox VE 控制台，在右上角点击新建虚拟机

![new](/static/image/new.6a21e9d02e.png)
![General](/static/image/General.e98109e52b.png)
![OS](/static/image/OS.4d4fc01756.png)
![System](/static/image/System.65798ed6e1.png)
4. 关键步骤：选择本地存储，选择刚刚上传的.qcow2文件，点击创建

![Disk](/static/image/Disk.75b51f01ff.png)
5. 其余的步骤都根据你的需求来选择，然后点击创建

6. 创建完成后，点击虚拟机，继续进行最后一步的编辑

![final](/static/image/final.ae707c045e.png)
7. 在编辑页面，确保关键点跟我上图中的类似即可。
