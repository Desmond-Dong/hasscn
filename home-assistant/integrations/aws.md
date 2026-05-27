# Amazon Web Services (AWS)

**AWS** 集成提供了一个与 [Amazon Web Services](https://aws.amazon.com/) 交互的单一位置。目前它提供了一个可以向 [AWS SQS](https://aws.amazon.com/sqs/)、[AWS SNS](https://aws.amazon.com/sns/) 发送消息或调用 [AWS Lambda](https://aws.amazon.com/lambda/) 函数的通知平台。

## 设置

您必须拥有 AWS 账户才能使用 Amazon Web Services，可在[此处](https://aws.amazon.com/free/)创建一个具有 12 个月免费套餐优惠的账户。请注意，即使在前 12 个月内，如果您使用的资源超过免费套餐提供的范围，仍可能被收费。我们建议您在 [AWS 账单控制台](https://console.aws.amazon.com/billing/) 中密切监控您的费用。您可以阅读[控制您的 AWS 费用](https://aws.amazon.com/getting-started/hands-on/control-your-costs-free-tier-budgets/)指南了解更多信息。

`aws` 集成中使用的 `lambda`、`sns`、`sqs` 和 `events` 服务即使在 12 个月期限之后也为所有用户提供**永久免费**套餐。智能家居的一般使用很可能不会达到免费套餐限制。请阅读 [Lambda 定价](https://aws.amazon.com/lambda/pricing/)、[SNS 定价](https://aws.amazon.com/sns/pricing/)、[SQS 定价](https://aws.amazon.com/sqs/pricing/) 和 [EventBridge 定价](https://aws.amazon.com/eventbridge/pricing/) 了解更多详情。

`aws` 集成使用 [botocore](https://botocore.amazonaws.com/v1/documentation/api/latest/index.html) 与 Amazon Web Services 通信，这也被 [AWS Command Client Interface](https://aws.amazon.com/cli/) 工具使用。因此，`aws` 与 `awscli` 工具共享相同的凭据和配置文件。请阅读[配置 AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) 了解如何获取访问密钥以及如何在本地系统上安全管理它们。

## 配置

要在您的安装中使用 `aws` 集成和 `notify` 平台，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
aws:
  credentials:
    - name: My AWS Account
      aws_access_key_id: AWS_ID
      aws_secret_access_key: AWS_SECRET
  notify:
    # 默认使用 aws 集成中定义的第一个凭据
    - service: lambda
      region_name: us-east-1
```

### 凭据配置

```yaml
name:
  description: 给您的 AWS 凭据命名，以便您可以在其他 AWS 平台中引用它。
  required: true
  type: string
aws_access_key_id:
  description: 您的 AWS 访问密钥 ID。如果提供，您还必须提供 `aws_secret_access_key` 且**不得**提供 `profile_name`。如果提供了 `aws_secret_access_key` 则必需。
  required: false
  type: string
aws_secret_access_key:
  description: 您的 AWS 秘密访问密钥。如果提供，您还必须提供 `aws_access_key_id` 且**不得**提供 `profile_name`。如果提供了 `aws_access_key_id` 则必需。
  required: false
  type: string
profile_name:
  description: 凭据配置文件名称。
  required: false
  type: string
validate:
  description: 是否在使用前验证凭据。验证凭据需要 `IAM.GetUser` 权限。
  required: false
  default: true
  type: boolean
```

### 通知配置

```yaml
service:
  description: 将用于通知的 Amazon Web Services。您可以从 `lambda`、`sns` 或 `sqs` 中选择。
  required: true
  type: string
region_name:
  description: 要连接的区域标识符，例如 `us-east-1`。
  required: true
  type: string
credential_name:
  description: 对 `aws` 凭据的引用。如果未提供 `credential_name`、`aws_access_key_id` 或 `profile_name`，通知平台将使用 `~/.aws` 中定义的 `默认配置文件`。
  required: false
  type: string
aws_access_key_id:
  description: 您的 AWS 访问密钥 ID。如果提供，您还必须提供 `aws_secret_access_key`。
  required: false
  type: string
aws_secret_access_key:
  description: 您的 AWS 秘密访问密钥。如果提供，您还必须提供 `aws_access_key_id`。如果提供了 aws_access_key_id 则必需。
  required: false
  type: string
profile_name:
  description: 凭据配置文件名称。
  required: false
  type: string
name:
  description: 设置可选参数 `name` 允许创建多个通知器。通知器将绑定到 `notify.NOTIFIER_NAME` 动作。
  required: false
  default: notify
  type: string
context:
  description: 您可以提供的可选字典，用于将自定义上下文传递给通知处理程序。
  required: false
  type: string
```

## Lambda 通知用法

AWS Lambda 是一个通知平台，因此可以通过调用 `notify` 动作来控制，[如此处所述](/home-assistant/integrations/notify/index.md)。它将为通知负载中给定的所有目标调用 Lambda。目标可以格式化为函数名称、完整的 ARN（[Amazon 资源名称](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html)）或部分 ARN。有关更多信息，请参阅 [botocore 文档](https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/lambda/client/invoke.html)。

Lambda 事件负载将包含动作负载中传递的所有内容。以下是发送到 Lambda 的示例负载：

```json
{
  "title": "Test message!",
  "target": "arn:aws:lambda:us-east-1:123456789012:function:ProcessKinesisRecords",
  "data": {
    "test": "okay"
  },
  "message": "Hello world!"
}
```

上下文将如下所示：

```json
{
  "custom": {
    "two": "three",
    "test": "one"
  }
}
```

## SNS 通知用法

AWS SNS 是一个通知平台，因此可以通过调用 `notify` 动作来控制，[如此处所述](/home-assistant/integrations/notify/index.md)。它将向通知负载中给定的所有目标发布消息。目标必须是 SNS 主题或端点 ARN（[Amazon 资源名称](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html)）。有关更多信息，请参阅 [botocore 文档](https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/sns/client/publish.html)。

如果存在，SNS Subject 将设置为标题。负载中的所有属性（消息除外）将作为字符串化的消息属性发送。

### 在 AWS 中设置 SNS

* 登录您的 AWS 控制台，在"安全和身份"下选择"Identity & Access Management"。
* 在左侧选择"Users"，然后点击"Create New Users"。在此输入名称，然后点击"Create"。
* 您可以下载凭据或点击箭头一次性显示它们。

:::warning
如果您不下载它们，您将丢失它们，必须重新创建新用户。

:::

* 复制/粘贴此处显示的两个密钥到您的 "`configuration.yaml`" 文件中。
* 在屏幕左侧返回"Users"并选择您刚创建的用户。在"Permissions"选项卡上点击"Attach Policy"图标。搜索"SNS"并附加策略"AmazonSNSFullAccess"。
* 返回 AWS 控制台，您现在需要找到"SNS"并点击进入该服务。它在 Mobile Services 组下。
* 在左侧选择"Topics"，然后"Create new topic"。
* 选择主题名称和显示名称。
* 现在选中您刚创建的主题旁边的框，在 Actions 下选择"Subscribe to topic"。
* 在弹出的框中，选择 Protocol = SMS 并在"Endpoint"旁边输入您希望发送短信的电话号码。现在点击"Create"。
* 对其他号码重复此操作。
* 返回"Users"部分，您将看到一行以"arn:"开头并以您之前选择的主题名称结尾的长字母数字行。这就是您在 Home Assistant 中的"target"。

## SQS 通知用法

AWS SQS 是一个通知平台，因此可以通过调用 `notify` 动作来控制，[如此处所述](/home-assistant/integrations/notify/index.md)。它将为通知负载中给定的所有目标向队列发布消息。目标必须是 SQS 主题 URL。有关更多信息，请参阅 [SQS 文档](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-queue-message-identifiers.html) 和 [botocore 文档](https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/sqs/client/send_message.html)

SQS 事件负载将包含动作负载中传递的所有内容。SQS 负载将作为字符串化的 JSON 发布。负载中的所有属性（消息除外）也将作为字符串化的消息属性发送。以下是发布到 SQS 队列的示例消息：

```json
{
  "title": "Test message!",
  "target": "https://sqs.us-east-1.amazonaws.com/123456789012/queue2%22",
  "data": {
    "test": "okay"
  },
  "message": "Hello world!"
}
```

## EventBridge 通知用法

AWS EventBridge 是一个通知平台，因此可以通过调用 `notify` 动作来控制，[如此处所述](/home-assistant/integrations/notify/index.md)。它将为通知负载中给定的所有目标向事件总线发布消息。目标必须是给定凭据可访问的事件总线的名称。目标不是必需的，如果未指定，将使用默认事件总线。有关更多信息，请参阅 [EventBridge 文档](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html) 和 [botocore 文档](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/events/client/put_events.html)

根据动作负载生成事件详情有两个选项。如果指定了 `detail` 属性，则其值将序列化为 JSON 对象并用于事件详情。如果未指定该属性，则 `message` 属性的值将序列化为一个简单的 JSON 对象，具有名为 `message` 的单个键和提供给动作的消息值。

以下是显示动作输入和相应 API 条目的几个示例：

```json
// 服务调用负载
{
  "message": "Hello world!"
}

// 相应条目
{
  "Detail": "{\"message\": \"Hello world!\"}"
  "DetailType": "",
  "Source": "homeassistant",
  "Resources": [],
}
```

```json
// 服务调用负载：
{
  "target": ["eventbus1", "eventbus2"]
  "data": {
    "detail_type": "test_event":
    "detail": {
      "key1", "value1",
      "key2", "value2"
    },
    "resources": ["resource1", "resource2"],
    "source": "example"
  }
  
}

// 相应条目
[
  {
    "Detail": "{\"key1\": \"value1\",\"key2\": \"key2\": \"value2\"}"
    "DetailType": "test_event",
    "EventBusName": "eventbus1",
    "Resources": ["resource1", "resource2"],
    "Source": "example"
  },
  {
    "Detail": "{\"key1\": \"value1\",\"key2\": \"key2\": \"value2\"}"
    "DetailType": "test_event",
    "EventBusName": "eventbus2",
    "Resources": ["resource1", "resource2"],
    "Source": "example"
  }
]

```
