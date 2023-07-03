# Stop and Delete Deployments

## Serverless

### Stop a Deployment

1. Go to the **Cloud Console**. Click on the deployment you want to **stop** to access the deployment overview page.
2. Click the **Stop** button and enter the name of the deployment in the pop-up box.
3. Click **Confirm** to stop the deployment.

::: warning
Stopping a deployment will disconnect devices from the deployment, but your data and connection address will be preserved.
:::

### Delete a Deployment

1. Go to the **Cloud Console**. Click on the deployment you want to **delete** to access the deployment overview page.
2. Click the **Delete** button and enter the name of the deployment in the pop-up box.
3. Click **Confirm** to stop the deployment .

::: warning
Deleting a deployment will disconnect devices from the deployment and remove all deployment data and configurations.
:::


## Dedicated

### Stop a Deployment
::: warning
After stopping the deployment, you will no longer be able to connect to it, but your data and connection address will be preserved. Please note that data retention fees will apply.
:::

Before stopping the deployment, please make sure that the deployment's status is **Running**.

1. Go to the **Cloud Console** and click on the deployment you wan t to **stop** to access the deployment overview page.
2. Click the **Stop** button and enter the name of the deployment in the pop-up box.
3. Click **Confirm** to stop the deployment .


### Delete a Deployment
::: warning
After deleting the deployment, you will no longer be able to connect to it, and all deployment data and configurations will be removed. The deployment billing will also be stopped.
:::

Before deleting the deployment, please make sure that the deployment's status is **Running**.

1. Go to the **Cloud Console** and click on the deployment you wan t to **delete** to access the deployment overview page.
2. Click the **Delete** button and enter the name of the deployment in the pop-up box.
3. Click **Confirm** to stop the deployment.


## BYOC

### Stop a Deployment
Currently, stopping a deployment is not supported through the UI. If you need to temporarily halt the EMQX MQTT service to save costs, you can stop the relevant virtual machine instances in your public cloud console. Please contact us through a [ticket](../feature/tickets.md) or [email](mailto:cloud-support@emqx.io) to temporarily turn off the alert & monitoring service for this deployment.

### Delete a Deployment
::: warning
Once you delete the deployment, you will no longer be able to connect to it, and all data and configurations associated with the deployment will be permanently deleted.
:::

::: tip
Before deleting the deployment, please ensure that the deployment's status is **Running**.

Make sure that all customized resources created by yourself after the deployment creation in the VPC of BYOC deployment have been deleted. Otherwise, the deployment deletion process will be failed.
:::

To begin the deletion process, access the console and navigate to the deployment you wish to delete. Go to the deployment details page and click on the **Delete** button. This will prompt the **Delete Deployment Guide** to appear, as shown in the following image:

![byoc_delete_deployment](./_assets/byoc_delete_deployment.png)

Prepare an Ubuntu 20.04 (AMD64) LTS environment with internet access and follow the steps and commands provided in the **Delete Deployment Guide** to initiate the deletion process.

::: tip
Copy the commands from the **Delete Deployment Guide** one by one and paste them into your Ubuntu command-line interface. These commands contain values provided in your settings page, as well as system-predefined information.
:::

Here is the deployment deletion process:
1. On the Ubuntu command line interface, user the command below to download the toolkit and save it to your Ubuntu directory.
```bash
wget https://cloudassets.emqx.com/en/byoc-deployments/1.1/delete-gcp-byoc-deployment.tar.gz
```

2. On the Ubuntu command line interface, unzip the downloaded toolkit and navigate to the unzipped folder directory.
```bash
tar -zxf delete-gcp-byoc-deployment.tar.gz && cd delete-gcp-byoc-deployment
```
3. Modify the value of the corresponding parameters according to the following command, and execute the command to delete.
```bash
./byoc delete \
     --platform gcp \
     --projectID <Your Project ID> \
     --authJSONPath <The absolute path of your Service Account JSON file> \
     --byocEndpoint https://cloud-intl.emqx.com \
     --byocKey abcdXXXXXXXXXX111
```

- `--projectID`: Enter your Google Cloud project ID. You can find it in the project selector at the top bar of Google Cloud Console.
- `--authJSONPath`: Enter the path to the JSON file for your [Google Cloud service account key](https://cloud.google.com/iam/docs/keys-create-delete#creating).

Do not modify the following three values that are automatically filled in when the deployment guide is generated in the console.

- `--platform` specifies the cloud provider.
- `--byocEndpoint` is the EMQX Cloud access address.
- `--byocKey` is the authentication key for BYOC deployment. The generated byocKey is valid for one hour, and should be executed as soon as possible after generating the script command.

After the command is executed, output the following content to indicate that the deployment has been successfully deleted.
```bash
Delete the deployment successfully!
```
