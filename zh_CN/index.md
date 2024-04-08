---
{
  'title': 'EMQX Cloud 文档中心',
  'description': 'EMQX Cloud 是由 EMQ 提供的全托管 MQTT 5.0 物联网云服务平台，可连接海量物联网设备并实时处理数据，它支持按量付费，可零代码实现消息分发和持久化。',
  'introduction': '作为物联网领域的统一 MQTT 平台，以及全球首个支持 MQTT 5.0 消息服务的平台，EMQX Cloud 为 MQTT 服务提供全面托管的环境以及 MQTT 服务的本地部署方案。借助 EMQX Cloud，您可以快速构建面向物联网领域的行业应用，轻松实现物联网数据的采集、传输、计算和持久化。',
  'headers':
    [
      { 'title': '产品介绍', 'slug': '产品介绍' },
      { 'title': '快速入门', 'slug': '快速入门' },
      { 'title': '控制台指南', 'slug': '控制台指南' },
      { 'title': '开发指南', 'slug': '开发指南' },
      { 'title': '常见问题', 'slug': '常见问题' },
    ],
  'categoryList':
    [
      {
        'iconName': 'learn',
        'title': '产品介绍',
        'menus':
          [
            {
              'name': '简介',
              'subMenus': [{ 'name': '产品概述', 'link': './overview.html' }],
            },
            {
              'name': '购买',
              'subMenus':
                [
                  { 'name': '版本介绍', 'link': './price/plans.html' },
                  { 'name': '定价计费', 'link': './price/pricing.html' },
                ],
            },
          ],
      },
      {
        'iconName': 'started',
        'title': '快速入门',
        'menus':
          [
            {
              'name': '快速上手',
              'subMenus':
                [
                  {
                    'name': '入门简介',
                    'link': './quick_start/introduction.html',
                  },
                  {
                    'name': '使用 MQTTX 连接/验证',
                    'link': './connect_to_deployments/mqttx.html',
                  },
                ],
            },
            {
              'name': '创建部署',
              'subMenus':
                [
                  {
                    'name': '创建 Serverless 部署',
                    'link': './create/serverless.html',
                  },
                  {
                    'name': '创建专有版部署',
                    'link': './create/dedicated.html',
                  },
                ],
            },
          ],
      },
      {
        'iconName': 'console',
        'title': '控制台指南',
        'menus':
          [
            {
              'name': '项目和用户管理',
              'subMenus':
                [
                  { 'name': '项目管理', 'link': './deployments/project.html' },
                  { 'name': '角色和权限', 'link': './feature/role.html' },
                  { 'name': '用户管理', 'link': './feature/user.html' },
                ],
            },
            {
              'name': '监控和问题分析',
              'subMenus':
                [
                  { 'name': '监控', 'link': './deployments/monitors.html' },
                  { 'name': '指标', 'link': './deployments/metrics.html' },
                  { 'name': '客户端', 'link': './deployments/clients.html' },
                  { 'name': '告警', 'link': './deployments/alerts.html' },
                  { 'name': '日志', 'link': './deployments/logs.html' },
                ],
            },
            {
              'name': '财务管理',
              'subMenus':
                [
                  { 'name': '账单概览', 'link': './billing/overview.html' },
                  { 'name': '发票', 'link': './billing/invoices.html' },
                ],
            },
          ],
      },
      {
        'iconName': 'guide',
        'title': '开发指南',
        'menus':
          [
            {
              'name': '常规',
              'subMenus':
                [
                  {
                    'name': 'TLS/SSL 设置',
                    'link': './deployments/tls_ssl.html',
                  },
                  {
                    'name': 'VPC 对等连接设置',
                    'link': './deployments/vpc_peering.html',
                  },
                  {
                    'name': '绑定域名',
                    'link': './faq/normal_b.html#如何绑定域名',
                  },
                  {
                    'name': '伸缩部署规格',
                    'link': './faq/deploy.html#如何伸缩部署规格',
                  },
                ],
            },
            {
              'name': '终端开发',
              'subMenus':
                [
                  {
                    'name': '客户端/应用接入指引',
                    'link': './connect_to_deployments/overview.html',
                  },
                  {
                    'name': 'SDK 下载',
                    'link': './connect_to_deployments/overview.html#第三方-SDK-推荐',
                  },
                ],
            },
            {
              'name': '云端开发',
              'subMenus':
                [
                  {
                    'name': '数据集成',
                    'link': './data_integration/introduction.html',
                  },
                  { 'name': 'API', 'link': './api/introduction.html' },
                ],
            },
          ],
      },
      {
        'iconName': 'faq',
        'title': '常见问题',
        'menus':
          [
            {
              'subMenus':
                [
                  {
                    'name': '支持哪些云平台？',
                    'link': './faq/normal_a.html#emqx-cloud支持哪些云平台',
                  },
                  {
                    'name': '支持哪些协议连接？',
                    'link': './faq/normal_b.html#支持哪些协议连接',
                  },
                  {
                    'name': '如何与自己现有的系统对接？',
                    'link': './faq/normal_b.html#如何与自己现有的系统对接',
                  },
                  {
                    'name': '连接失败有哪几类原因？',
                    'link': './faq/deploy.html#连接失败有哪几类原因',
                  },
                  {
                    'name': '如何充值？',
                    'link': './faq/billing.html#如何充值',
                  },
                  {
                    'name': '如何获取发票？',
                    'link': './faq/billing.html#如何获取发票',
                  },
                ],
            },
          ],
      },
    ],
}
---

<CloudOverview />
