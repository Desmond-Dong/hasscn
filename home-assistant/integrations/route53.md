# AWS Route53

借助 **AWS Route53** 集成，您可以让 AWS Route53 DNS 记录保持最新。

该集成每小时运行一次，也可以通过 `route53.update_records` 操作手动触发。

请注意，此平台使用 [ipify.org](https://www.ipify.org/) 的 API 来获取公网 IP 地址。

## 设置

要使其正常工作，您需要为 AWS 账户配置合适的 IAM 策略和 API 密钥。

如果您已经熟悉该流程，可以跳过下一节，直接查看配置部分。

在 AWS 侧，您需要完成以下步骤：

1. 为您拥有并在 Route53 中管理的域名创建一个合适的 zone，这里以 `home.yourdomain.com` 为例。

2. 创建完成后，记下该域名的 Hosted Zone ID。后续的插件和 IAM 配置都需要它。

3. 创建一个 IAM 策略，明确授予该域名的更新和查询权限，且不要授予 AWS 账户中的其他权限。

下面是一个 IAM 策略示例，别忘了把 Resource 行中的 Zone ID 替换成您自己的。

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "route53:GetHostedZone",
                "route53:ChangeResourceRecordSets",
                "route53:ListResourceRecordSets"
            ],
            "Resource": "arn:aws:route53:::hostedzone/YOURZONEIDGOESHERE"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "route53:TestDNSAnswer",
            "Resource": "*"
        }
    ]
}
```

4. 完成上述操作后，创建一个名为 `homeassistant` 的新用户，并将该 IAM 策略附加给它，以允许其管理这个 DNS 资源。

5. 在 `homeassistant` 用户的安全凭证标签页下，创建一组访问密钥，供集成 YAML 配置使用。

## 配置

要在您的安装中使用此集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
route53:
  aws_access_key_id: ABC123
  aws_secret_access_key: DEF456
  zone: ZONEID678
  domain: yourdomain.com
  records:
    - vpn
    - hassio
    - home
```

### Configuration variables for `route53`

aws\_access\_key\_id:
description: 具备该域名 IAM 访问权限的 AWS 账户访问密钥 ID。
required: true
type: string
aws\_secret\_access\_key:
description: 具备该域名 IAM 访问权限的 AWS 账户私有访问密钥。
required: true
type: string
zone:
description: 该域名在 Route53 中的 AWS zone ID。
required: true
type: string
domain:
description: Route53 中的域名名称。
required: true
type: string
records:
description: 您要更新的记录列表。使用 `.` 可更新默认记录，即 *yourdomain.com*。
required: true
type: list
ttl:
description: DNS 记录的 TTL 值。
required: false
type: integer
default: 300

## 操作

### 操作：更新记录

`route53.update_records` 操作用于手动触发 DNS 记录更新。
