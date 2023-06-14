---
{
  'title': 'EMQX Cloud Overview',
  'description': 'EMQX Cloud is a fully managed MQTT 5.0 IoT cloud service. It can process a huge amount of data in real-time to and from connected IoT devices and applications.',
  'introduction': "EMQX Cloud is an MQTT middleware for the IoT from EMQ. As the world's first fully managed MQTT 5.0 cloud messaging service, EMQX Cloud provides a one-stop O&M colocation and a unique isolated environment for MQTT services. In the era of Internet of Everything, EMQX Cloud can help you quickly build industry applications and easily realize the collection, transmission, computation and persistence of IoT data.",
  'headers':
    [
      { 'title': 'Product Introduction', 'slug': 'product-introductione' },
      { 'title': 'Quick Start', 'slug': 'quick-start' },
      { 'title': 'Console Guide', 'slug': 'console-guide' },
      { 'title': 'Developer Guide', 'slug': 'developer-guide' },
      { 'title': 'FAQ', 'slug': 'faq' },
    ],
  'categoryList':
    [
      {
        'iconName': 'learn',
        'title': 'Product Introduction',
        'menus':
          [
            {
              'name': 'Introduction',
              'subMenus': [{ 'name': 'Overview', 'link': './overview.html' }],
            },
            {
              'name': 'Plan & Pricing',
              'subMenus':
                [
                  { 'name': 'Plans', 'link': './price/plans.html' },
                  { 'name': 'Pricing', 'link': './price/pricing.html' },
                ],
            },
          ],
      },
      {
        'iconName': 'started',
        'title': 'Quick Start',
        'menus':
          [
            {
              'name': 'Get Started',
              'subMenus':
                [
                  {
                    'name': 'Getting started introduction',
                    'link': './quick_start/introduction.html',
                  },
                  {
                    'name': 'Use MQTTX to connect to deployment',
                    'link': './connect_to_deployments/mqttx.html',
                  },
                ],
            },
            {
              'name': 'Create Deployment',
              'subMenus':
                [
                  {
                    'name': 'Create serverless deployment',
                    'link': './create/serverless.html',
                  },
                  {
                    'name': 'Create dedicated deployment',
                    'link': './create/dedicated.html',
                  },
                ],
            },
          ],
      },
      {
        'iconName': 'console',
        'title': 'Console Guide',
        'menus':
          [
            {
              'name': 'Projects and Users',
              'subMenus':
                [
                  {
                    'name': 'Project center',
                    'link': './feature/project_center.html',
                  },
                  { 'name': 'Project list', 'link': './feature/project.html' },
                  {
                    'name': 'Role & Authentication',
                    'link': './feature/role.html',
                  },
                  {
                    'name': 'Subaccount management',
                    'link': './feature/user.html',
                  },
                ],
            },
            {
              'name': 'DevOps and Monitors',
              'subMenus':
                [
                  { 'name': 'Monitors', 'link': './deployments/monitors.html' },
                  { 'name': 'Metrics', 'link': './deployments/metrics.html' },
                  { 'name': 'Logs', 'link': './deployments/logs.html' },
                  { 'name': 'Alerts', 'link': './deployments/alerts.html' },
                ],
            },
            {
              'name': 'Billing',
              'subMenus':
                [
                  {
                    'name': 'Billing overview',
                    'link': './billing/overview.html',
                  },
                  { 'name': 'Invoices', 'link': './billing/invoices.html' },
                ],
            },
          ],
      },
      {
        'iconName': 'guide',
        'title': 'Developer Guide',
        'menus':
          [
            {
              'name': 'Development',
              'subMenus':
                [
                  {
                    'name': 'TLS / SSL settings',
                    'link': './deployments/tls_ssl.html',
                  },
                  {
                    'name': 'VPC settings',
                    'link': './deployments/vpc_peering.html',
                  },
                  {
                    'name': 'Bind domain name',
                    'link': './faq/normal_b.html#how-to-bind-a-domain-name',
                  },
                  {
                    'name': 'Scale specifications',
                    'link': './faq/deploy.html#how-can-i-scale-deployment',
                  },
                ],
            },
            {
              'name': 'Terminal Development',
              'subMenus':
                [
                  {
                    'name': 'Client / Application access guidelines',
                    'link': './connect_to_deployments/overview.html',
                  },
                  {
                    'name': 'SDK Download',
                    'link': './connect_to_deployments/overview.html#Third-party-SDK-Recommendation',
                  },
                ],
            },
            {
              'name': 'Cloud Development',
              'subMenus':
                [
                  {
                    'name': 'Data integrations',
                    'link': './rule_engine/introduction.html',
                  },
                  { 'name': 'API', 'link': './api/api_overview.html' },
                ],
            },
          ],
      },
      {
        'iconName': 'faq',
        'title': 'FAQ',
        'menus':
          [
            {
              'subMenus':
                [
                  {
                    'name': 'Which platforms does EMQX Cloud support?',
                    'link': './faq/normal_a.html#which-platforms-does-emqx-cloud-support',
                  },
                  {
                    'name': 'Which protocol connections are supported?',
                    'link': './faq/normal_b.html#which-protocol-connections-are-supported',
                  },
                  {
                    'name': 'How to integrate with other systems?',
                    'link': './faq/normal_b.html#how-to-integrate-with-other-systems',
                  },
                  {
                    'name': 'What are the common causes for connection failure?',
                    'link': './faq/deploy.html#what-are-the-common-causes-for-connection-failure',
                  },
                  {
                    'name': 'How to top up?',
                    'link': './faq/billing.html#how-to-top-up',
                  },
                  {
                    'name': 'How do I download an invoice?',
                    'link': './faq/billing.html#how-do-i-download-an-invoice',
                  },
                ],
            },
          ],
      },
    ],
}
---

<CloudOverview />
