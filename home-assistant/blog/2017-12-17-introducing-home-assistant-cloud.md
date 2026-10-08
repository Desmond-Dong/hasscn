# Introducing Home Assistant Cloud

Today we’re introducing the next step in the Home Assistant saga: the Home Assistant Cloud. The goal of the Home Assistant Cloud is to bridge the gap between your local Home Assistant instance and 服务 in the cloud while delivering the maximum possible security and privacy.

The first 服务 that is supported via the Home Assistant Cloud is the Amazon Alexa Smart Home skill. 此integrations will allow you to control all your 设备 in Home Assistant via Amazon Alexa. You will be able to say *“Alexa, 打开 the kitchen 灯光”* and your local Home Assistant will 打开 the 灯光. Because Alexa talks to Home Assistant, it doesn’t Matter what kind of 灯光 they are! Anything that is linked to Home Assistant will work. IKEA 灯光, a 10 year old X10 开关 or something you’ve made yourself. As long as Home Assistant can control it, you can control it via Alexa.

We have designed the Home Assistant Cloud with security in mind. When you activate the new Cloud component, your instance will create a secure connection to the Home Assistant Cloud. There is no need for any further 配置 or to expose your instance to the internet.

集成 like Alexa will deliver messages to our cloud which we will forward to your local instance for processing. We just forward the response back to Alexa. This means that we do not have to store the 状态 of your house in our cloud, we’re just the messenger!

We are making the beta of the Home Assistant Cloud publicly available today. During the beta period the Home Assistant Cloud will be free to use. We are currently planning to run a beta till March 1, 2018 0:00 UTC. Once the beta ends, the Home Assistant Cloud will be part of our Community Support package which will run at $5 USD/month.

By subscribing to the Community Support package you will show your support for the Home Assistant organization, its projects and its community. It will help fund development, 遮盖 our operating costs and gives you access to use Home Assistant Cloud.

So if you ever felt like donating money to support the development of Home Assistant and Hass.io: sign up for the Home Assistant Cloud!

### Why not take donations?

With donations you have to convince people to keep donating and it will be hard to plan around the amount of available money. The biggest concern is what do you do when there is not enough money. We could shut down the servers or again depend on the wallets of our 开发者. We could run Wikipedia style advertisements for donating, but those are even more annoying than running advertisements.

## 入门

升级 Home Assistant to 0.60 and enable the [`cloud`](/home-assistant/integrations/cloud/index.md) and [`config`](/home-assistant/integrations/config/index.md) components:

```yaml
# Example configuration.yaml entry
cloud:
config:
```

Now 重启 Home Assistant and navigate to the 配置 面板. It will offer a new cloud section. Here you can create an account and login. Once logged in, your instance will connect to the cloud.

The next step is to 配置 Alexa. This can be done by enabling the Home Assistant skill for Alexa and link your Home Assistant cloud account.

Once you’re done, ask Alexa to discover 设备 (“Alexa, discover 设备”) and you are all set to control them: “Alexa, 打开 <设备 name>”.

See the [Cloud component 配置](/home-assistant/integrations/cloud/index.md) to learn how to filter which 设备 get exposed to Alexa.

## 常见问题

*Last updated: February 22, 2018*

#### I thought the Home Assistant crew didn't like the cloud?

You are right, [we don't](/home-assistant/blog/2016/01/19/perfect-home-automation/#your-system-should-run-at-home-not-in-the-cloud)! The Home Assistant Cloud is not an alternative to running your local Home Assistant instance. All control and 自动化 are still running locally.

Instead, the Home Assistant Cloud is an extension of your local instance. It allows to communicate with companies that force us to communicate via a public available cloud endpoint like Amazon Alexa and Google Assistant.

Home Assistant Cloud is only used to route the messages to your local Home Assistant instance. All messages are processed locally.

*(Some people have suggested we rename to Home Assistant Bridge to avoid this confusion)*

#### Will Home Assistant and Hass.io remain 开源?

Yes. Yes. Yes! Home Assistant is the work of hundreds of 开发者 all working together in creating something amazing. The only thing that will require a subscription is the optional cloud functionality.

#### Where is the source code for the Alexa skill?

All messages are processed locally and so the Alexa skill code is part of the Home Assistant code. The Home Assistant Cloud only routes the messages to your local Home Assistant instance. This means that you can audit the source code to check all the things that the cloud can do:

* [Module that processes incoming cloud messages](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/integrations/cloud/iot.py)
* [Alexa Smart Home v3 skill](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/integrations/alexa/smart_home.py)

#### What other features will come to the cloud?

We have a lot of ideas! We are not going to make any promises but here are some things that we’re looking into:

* Google Home / Google Assistant Smart Home skill
* Allow easy linking of other cloud 服务 to Home Assistant. No more local juggling with OAuth flows. For example, link your Fitbit account and the Fitbit component will show up in Home Assistant.
* Encrypted 备份 of your Hass.io data
* Text-to-speech powered by AWS Polly
* Generic HTTP cloud endpoint for people to send messages to their local instance. This will allow people to build applications on top of the Home Assistant cloud.
* IFTTT 集成
* Alexa shopping list 集成

#### What countries are supported at launch?

As of February 2018, we are live in all countries that have Alexa except for Japan (which is under certification).

#### How is the connection made to the cloud?

The connection is made using a WebSocket connection over HTTPS. [See the source here](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/integrations/cloud/iot.py).

#### I think that the price is too high for what I get.

The Home Assistant Cloud functionality is a perk for becoming a supporter of the Home Assistant project. As a supporter you will help fund development, 遮盖 our operating costs and gives you access to use Home Assistant Cloud. You are not paying to just maintain the cloud servers.

The perks offered for being a supporter will also extend over time, as noted in [this answer](#what-other-features-will-come-to-the-cloud).

#### What will the Home Assistant organization do with the funds ?

The plan is to hire 开发者 to work fulltime on Home Assistant. We have grown a lot in the last 4 years and the work load is pushing the limits of what our 核心 开发者 can do. 开源 burn out is very common ([1], [2]) and we want to avoid this by moving most organization and 发布 chores to a paid position.

*For more background on these topics, check out [HASS Podcast 15](https://hasspodcast.io/ha015/).*

[1]: https://nolanlawson.com/2017/03/05/what-it-feels-like-to-be-an-open-source-maintainer/

[2]: https://kennethreitz.org/essays/2017/01/05/the-reality-of-developer-burnout
