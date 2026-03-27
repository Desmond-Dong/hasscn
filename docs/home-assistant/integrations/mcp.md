---
title: Model Context Protocol
description: 'The Model Context Protocol(https://modelcontextprotocol.io) is an open protocol that standardizes how applications provide context to LLMs. The Model。'
ha_category:
  - Voice
ha_release: 2025.2
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@allenporter'
ha_domain: mcp
ha_integration_type: integration
related:
  - docs: /integrations/conversation/
    title: Conversation
ha_quality_scale: silver
---
# Model Context Protocol

The [Model Context Protocol](https://modelcontextprotocol.io) is an open protocol that
standardizes how applications provide context to LLMs. The **Model Context Protocol** integration
enables using MCP Servers in Home Assistant for providing additional tools to use with a
[conversation agent](/home-assistant/integrations/conversation). For example, you can add an MCP server that
supports memory functionality, or that can search the web using functionality not already
available in Home Assistant.

Controlling Home Assistant is done by providing MCP clients access to the Assist API of Home
Assistant. You can control what devices and entities it can access from the [exposed entities page](https://my.home-assistant.io/redirect/voice_assistants/).

## Prerequisites

1. You will need an [MCP server](https://modelcontextprotocol.io/examples).
2. If your MCP server only supports the <abbr title="Standard input/output">*stdio*</abbr> protocol, you will also need an additional
   MCP proxy (such as [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy)) to expose
   the server over <abbr title="Server-sent events">*SSE*</abbr>.
3. If your MCP server requires authentication, then you will need an OAuth Client ID and Secret.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Configuration options

The integration provides the following configuration options:

```yaml
SSE Server URL:
  description: The URL for the SSE endpoint of the MCP server. For example, `http://example/sse`.
Client ID:
  description: If the server requires authentication, enter the OAuth Client ID for the MCP server in the Application Credentials
Client Secret:
  description: If the server requires authentication, enter the OAuth Client Secret for the MCP server in the Application Credentials.
```

## Architecture overview

This integration can provide additional functionality for LLM conversation agents
(for example [Anthropic](/home-assistant/integrations/anthropic/), [Google Generative AI](/home-assistant/integrations/google_generative_ai_conversation), [Ollama](/home-assistant/integrations/ollama/), [Open AI](/home-assistant/integrations/openai_conversation/)). 

Home Assistant acts as a client to the MCP server you specify. Home Assistant will
poll the MCP server SSE endpoint and query the list of available tools. The tools are
made available for use by Home Assistant conversation agents, similar to the Assist API.
See the [Model Context Protocol Introduction](https://modelcontextprotocol.io/introduction#general-architecture)
for more details on the protocol.

The Home Assistant Model Context Protocol integration acts as a client using the
[Server-Sent Events (SSE) transport](https://modelcontextprotocol.io/docs/concepts/transports#server-sent-events-sse)
allowing streaming client-to-server communication. Most MCP clients today only support
[stdio](https://modelcontextprotocol.io/docs/concepts/transports#standard-input-output-stdio) transport,
and directly run an MCP server as a local command line tool. You can 
use an MCP proxy server like [mcp-proxy](https://github.com/sparfenyuk/mcp-proxy)
to enable Home Assistant to access an MCP SSE server.

Once the integration is configured, you also need to configure the conversation
agent to use the tools.

## Supported functionality

### Tools

[MCP Tools](https://modelcontextprotocol.io/docs/concepts/tools) enable LLMs to
perform actions through Home Assistant. The tools used by the configured LLM API
are exposed.

### Authorization

The Model Context Protocol supports OAuth, and allows you to give Home Assistant
access to restricted MCP servers. You can enter the MCP Servers [Application Credentials](https://www.home-assistant.io/integrations/application_credentials/) when configuring
the MCP integration.

## Known limitations

The Home Assistant Model Context Protocol integration currently only supports a
subset of MCP features:

| Feature | Supported by Home Assistant |
| ------- | --------- |
| Prompts | ❌ |
| Tools | ✅ |
| Resources | ❌ |
| Sampling | ❌ |
| Notifications | ❌ |

## Troubleshooting

See [Model Context Protocol: Debugging](https://modelcontextprotocol.io/docs/tools/debugging) for
general tips on debugging MCP. If you are developing your own MCP server and having trouble making it work
with Home Assistant, you can also use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
to verify that your MCP server is working correctly.

## Removing the integration

This integration can be removed by following these steps:

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
