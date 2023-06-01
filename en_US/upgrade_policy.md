# Upgrade Policy

This page introduces the strategies for platform upgrades, EMQX deployment upgrades, and discontinued features in EMQX Cloud.

## Console Upgrades

Console upgrades involve all aspects of the EMQX Cloud console, including functionality, interface, and user experience, apart from deployment upgrades and feature deprecation.

### Potential User Impact
- Minor Impact: Functionality upgrades will consider user data security and compatibility, resulting in a minor impact on user operations.
- No Impact: If a new feature is introduced and not utilized by users, there will be no impact.

### Examples
- Support for new payment methods
- Adding new deployment monitoring metrics to the Metrics page
- Adding new deployment regions

### Frequency
Every two weeks

### Notifications
Occasional notifications: Communication may include email notifications, updated documents, and articles, or communication with sales and customers.

### Upgrade Approach
EMQX Cloud conducts the upgrade.


## Deployment Upgrades

EMQX Cloud deployment upgrades include version upgrades for all deployed products.

### Potential User Impact
- Major Impact: EMQX version upgrades or significant updates may cause temporary disconnection of connected devices, requiring client-side support for automatic reconnection.
- Minor Impact: Minor EMQX upgrades primarily aim to fix potential bugs and are generally applied through hot updates, causing no impact on the device side.
- No Impact: EMQX security patches and similar updates have no impact on already connected devices.

### Examples
- Serverless support for bulk import of authentication data via the console
- Upgrades to EMQX deployment versions
- Changes to API request addresses

### Frequency
- Serverless feature upgrades typically occur every few months.

- EMQX deployment version upgrades are recommended every 1.5 to 2 years. 

  ::: warning 

  EMQX Cloud provides support for a specific EMQX version for a maximum of 2 years. 

  :::


### Notification
Confirmation and notification of upgrades, including details of the scope and impact, are provided to users 90 days before the upgrade. The upgrade time is negotiated.


### Upgrade Approach
Upgrade timing may vary based on user versions and business requirements. EMQX Cloud coordinates with customers to schedule upgrades, aiming to avoid high-risk periods. However, EMQX Cloud retains the final authority for upgrades.


## Discontinued Features
Discontinued features refer to the removal of any feature that users may have been utilizing in EMQX Cloud.


### Potential User Impact
- Major Impact: The removal of a feature that users actively use can significantly impact their operations.
- No Impact: If a feature is not being used, its removal has no impact.

### Examples
- Deletion of a specific API interface
- Removal of a value-added service

### Frequency
Rarely occurs

### Notifications
Confirmation and notification of discontinued features are provided to users 90 days before the removal, informing them about the scope and impact. This may be done through email notifications, updated documents, and articles.


### Upgrade Approach
EMQX Cloud conducts the upgrade.

