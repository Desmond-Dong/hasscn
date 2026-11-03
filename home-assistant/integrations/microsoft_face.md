# Microsoft Face

**Microsoft Face** 集成是 Microsoft Azure Cognitive Service [Face](https://azure.microsoft.com/products/cognitive-services/vision-services) 的主集成。
所有数据都存储在您自己位于 Azure 云中的私有实例中。

## 设置

您需要一个 API 密钥。该密钥免费，但需要使用您的 Microsoft ID 完成 [Azure 注册](https://azure.microsoft.com/free/)。
免费资源（*F0*）限制为每分钟 20 次请求、每月 3 万次请求。如果您不想使用 Azure 云，也可以通过注册 [cognitive-services](https://azure.microsoft.com/try/cognitive-services/) 获取 API 密钥。
请注意，cognitive services 上的所有密钥都必须每 90 天重新创建一次。

## 配置

要启用 Microsoft Face 集成，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
microsoft_face:
  api_key: YOUR_API_KEY
  azure_region: eastus2
```

```yaml
api_key:
  description: 您的 Cognitive 资源的 API 密钥。
  required: true
  type: string
azure_region:
  description: 您部署 Microsoft Cognitive Services 终端节点所使用的区域。
  required: false
  type: string
timeout:
  description: 设置 API 连接超时时间。
  required: false
  type: time
  default: 10s
```

### 人员和分组

对于大多数服务，您需要先设置分组或人员。
这样可将处理和检测范围限制在该分组提供的元素内。
Home Assistant 会为所有分组创建实体，并允许您在前端直接显示状态、人员和 ID。

以下操作可用于管理此功能，并可通过前端、脚本或 REST API 调用。

* *microsoft\_face.create\_group*
* *microsoft\_face.delete\_group*

```yaml
action: microsoft_face.create_group
data:
  name: "Family"
```

* *microsoft\_face.create\_person*
* *microsoft\_face.delete\_person*

```yaml
action: microsoft_face.create_person
data:
  group: family
  name: "Hans Maier"
```

您需要为人员添加图像。您可以为每个人添加多张图片，以提高识别效果。您可以从摄像头拍照，或将本地图像发送到 Azure 资源。

* *microsoft\_face.face\_person*

```yaml
action: microsoft_face.face_person
data:
  group: family
  name: "Hans Maier"
  camera_entity: camera.door
```

对于本地图像，您需要使用 `curl`。
`{personId}` 可在分组实体的属性中找到。

```bash
$ curl -v -X POST "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{GroupName}/persons/{personId}/persistedFaces" \
  -H "Ocp-Apim-Subscription-Key: YOUR_API_KEY" \
  -H "Content-Type: application/octet-stream" --data-binary "@/tmp/image.jpg"
```

完成某个分组的修改后，我们需要训练该分组，让 AI 学会如何处理新数据。

* *microsoft\_face.train\_group*

```yaml
action: microsoft_face.train_group
data:
  group: family
```
