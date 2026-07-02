# RESTful Notifications

The **RESTful Notifications** integration allows you to deliver [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) notifications from Home Assistant to another party.

To enable the REST notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: rest
    resource: http://IP_ADDRESS/ENDPOINT
```

```yaml
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: notify
  type: string
resource:
  description: The resource or endpoint that will receive the value.
  required: true
  type: string
method:
  description: The method of the request. Valid options are `GET`, `POST` or `POST_JSON`.
  required: false
  default: GET
  type: string
verify_ssl:
  description: Verify the SSL certificate of the endpoint.
  required: false
  type: boolean
  default: True
authentication:
  description:  Type of the HTTP authentication. `basic` or `digest`.
  required: false
  default: basic
  type: string
username:
  description: The username for accessing the REST endpoint.
  required: false
  type: string
password:
  description: The password for accessing the REST endpoint.
  required: false
  type: string
headers:
  description: The headers for the request.
  required: false
  type: string
message_param_name:
  description: Parameter name for the message.
  required: false
  default: message
  type: string
title_param_name:
  description: Parameter name for the title.
  required: false
  type: string
target_param_name:
  description: Parameter name for the target.
  required: false
  type: string
data:
  description: Dictionary of extra parameters to send to the resource.
  required: false
  type: string
data:
  description: Template dictionary of extra parameters to send to the resource.
  required: false
  type: template
```

要使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/index.md)。

### Using templates

For incoming data, a value template translates incoming JSON or raw data into a valid payload.
Incoming payloads are rendered with possible JSON values, so when rendering, the `value_json` variable can be used to access attributes in a JSON-based payload. Otherwise, the `value` variable can be used for non-JSON payloads.

The `this` variable can also be used in the template. The `this` attribute refers to the current [entity state](/home-assistant/docs/configuration/state_object.md) of the entity.
Further information about the `this` variable can be found in the [template documentation](/home-assistant/integrations/template/index.md#template-and-action-variables).

:::note
**Example value template with JSON:**

With the following payload:

```json
{ "state": "ON", "temperature": 21.902 }
```

Template `{{ value_json.temperature | round(1) }}` renders to `21.9`.
:::
