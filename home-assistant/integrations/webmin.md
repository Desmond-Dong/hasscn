# Webmin

[Webmin](https://webmin.com) 是一个基于 Web 的 Unix 类服务器系统管理界面。

此集成为监控服务器的 CPU 和内存使用情况提供传感器。

## 前提条件

### 身份验证设置

:::warning
在暴露具有系统级访问权限的服务之前，请务必先考虑您自己的部署方式和安全需求。

:::
作为良好的安全实践，请为 Home Assistant 单独创建一个 Webmin 用户。专用账户可确保当您更改 Webmin 的主登录凭据时，此集成仍能持续运行；同时也便于您更细粒度地控制权限，只向 Home Assistant 提供必要的数据和访问权限。

#### 建议的用户设置

* 使用强密码创建该账户
* 仅启用 *"Can accept RPC calls"* 权限（位于 "Permissions for all modules" 下）
* 考虑为其他用户禁用 *"Can accept RPC calls"* 权限（除非确有需要）
* 如果合适，考虑将此账户限制为仅允许通过 Home Assistant 实例的 IP 地址访问

:::note
Webmin API 会忽略通过前端设置的任何 2FA。即使启用了 2FA，仍然可以仅使用用户名和密码访问 API。

:::

### 所需的 Webmin Perl 模块

在配置此集成之前，请确保已通过 [Webmin Perl Modules](https://webmin.com/docs/modules/perl-modules/) 安装 `XML::Parser` Perl 模块。

#### 安装 XML::Parser Perl 模块

1. 在 Webmin UI 中，前往 **Tools** > **Perl Modules**。
2. 在 **Install module** 选项卡下，将 `XML::Parser` 输入到 **From CPAN** 文本框中。
3. 在对话框底部选择 **Install**。
4. 确认安装成功。
   * 如果安装成功：
     * 继续完成 Home Assistant 的其余步骤。
   * 如果安装失败：
     * 参考 [Webmin documentation for Perl Modules](https://webmin.com/docs/modules/perl-modules/) 解决相关 Webmin 问题。
     * 重试模块安装，并确认 `XML::Parser` 已显示在 Perl Modules 页面中的 **Existing Modules** 下。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

:::note
所有实体默认均为 **disabled**。您必须手动启用需要使用的实体。

:::
提供以下传感器：

* 负载（1 分钟）
* 负载（5 分钟）
* 负载（15 分钟）
* 内存总量
* 空闲内存
* Swap 总量
* 空闲 Swap
* 所有磁盘的总空间
* 所有磁盘的空闲空间
* 所有磁盘的已用空间
* 对于每个文件系统挂载点：
  * 已用空间
  * 空闲空间
  * 总空间
  * 已用 inode
  * 空闲 inode
  * 总 inode
  * 磁盘使用率百分比
  * inode 使用率百分比
