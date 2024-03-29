# Upgrade Policy

This page introduces the strategies for console upgrades, EMQX upgrades, and deprecations in EMQX Platform.

## Console Upgrades

Console upgrades involve all aspects of the EMQX Platform console, including functionality, interface, and user experience, apart from EMQX upgrades and deprecations.

### Potential User Impact
- Minimal: Functionality upgrades will consider user data security and compatibility, resulting in a minor impact on user operations.
- None: If a new feature is introduced and not utilized by users, there will be no impact.

### Examples
- Support for new payment methods.
- Adding new monitoring metrics to the Metrics.
- Adding new regions.

### Frequency
Every two weeks.

### Communication before the change
Sometimes communicated: Communication may include email notifications, updated documents, and release notes, and/or communication from sales and customer operations.

### Upgrade Approach
EMQX Platform conducts the upgrade.


## EMQX Deployment Upgrades

EMQX deployment upgrades include version upgrades for all deployed products.

### Potential User Impact
- Large: EMQX version upgrades or significant updates may cause temporary disconnection of connected devices, requiring client-side support for automatic reconnection.
- Minimal: Minor EMQX upgrades primarily aim to fix potential bugs and are generally applied through hot-fix, causing no impact on the device side.
- None: EMQX security patches and similar updates have no impact on connected devices.

### Examples
- Serverless support for bulk import of authentication data via the console.
- Upgrades to EMQX deployment versions.
- Changes to API URI.

### Frequency
- Serverless feature upgrades typically occur every few months.

- EMQX deployment version upgrades are recommended every 1.5 to 2 years. 

  ::: warning 

  EMQX Platform provides support for a specific EMQX version for a maximum of 2 years. 

  :::


### Communication before the change
Confirmation and notification of upgrades, including details of the scope and impact, are provided to users 90 days before the upgrade. The upgrade time is negotiated.


### Upgrade Approach
Upgrade timing may vary based on user versions and business requirements. EMQX Platform coordinates with customers to schedule upgrades, aiming to avoid high-risk periods. However, EMQX Platform retains the final authority for upgrades.


## Deprecations
Deprecations refer to the removal of any feature that users may have been utilizing in EMQX Platform.


### Potential User Impact
- Large: The removal of a feature that users actively use can significantly impact their operations.
- None: If a feature is not being used, its removal has no impact.

### Examples
- Deletion of a specific API URI.
- Removal of a value-added service.

### Frequency
Rarely occurs.

### Communication before the change
Confirmation and notification of discontinued features are provided to users 90 days before the removal, informing them about the scope and impact. This may be done through email notifications, updated documents, and articles.


### Upgrade Approach
EMQX Platform conducts the upgrade.

