# TLS/SSL Configuration for BYOC Plan

To protect the confidentiality of data transmission within your MQTT ecosystem, EMQX Cloud BYOC Plan supports establishing secure and encrypted communication channels using SSL and TLS encryption protocols. This page introduces how to enable TSL/SSL communication on a one-way authentication mode by preparing the certificate to create a Privacy Enhanced Mail (PEM) file.

## One-Way Authentication Mode

One-way authentication ensures that the server (EMQX MQTT broker) presents a valid certificate to clients (devices or applications) during the TLS/SSL handshake. Clients verify the authenticity of the server by checking the presented certificate against a trusted Certificate Authority (CA).

In the BYOC plan, only certificates signed by a trusted CA are accepted. This enhances security and prevents unauthorized access to your MQTT clusters.

## Required Certificate Components

To configure TLS/SSL for your BYOC deployment, you need to prepare a single PEM file that contains the following components. This PEM file is crucial for enabling secure one-way authentication between your MQTT clients and the EMQX MQTT broker. 

1. **Server Certificate**: Issued by a trusted Certificate Authority (CA), this certificate enables the EMQX MQTT broker to establish secure connections with clients.

2. **Certificate Chain**: Include the complete chain of certificates leading up to the trusted root CA certificate. This allows client devices to verify the server certificate's authenticity.

3. **Private Key**: The private key associated with the server certificate is essential for decrypting communication between clients and the EMQX MQTT broker.

## Certificate Format and Standard Guidelines

When preparing your certificate for TLS/SSL configuration, consider the following guidelines:

- Certificates must specify encryption algorithms and key sizes. EMQX Cloud supports 1024-bit RSA (RSA_1024) and 2048-bit RSA (RSA_2048) algorithms.

- Certificates must adhere to the SSL/TLS X.509 version 3 standard. They should contain the public key, the fully qualified domain name (FQDN) or IP address of the website, and publisher information.

- Certificates can be self-signed using your private key or the issuing CA's private key. If signed by a CA, the certificate chain must be included when importing the certificate.

- Certificates must be valid and should not be imported within **30 days** prior to the start or conclusion of their validity period.

- Certificates, private keys, and certificate chains must use **PEM encoding**.

- Private keys must be passwordless and support PKCS#1 and PKCS#8.

- The certificate's encryption algorithm must match the signing CA's encryption algorithm. For instance, if the signing CA uses RSA, the certificate's key type should also be RSA.

These guidelines ensure the proper configuration and secure deployment of TLS/SSL for your BYOC environment.

## Create PEM File

To create the required PEM file, follow these steps:

1. Open a text editor.
2. Copy the content of the server certificate and paste it into the editor.
3. Copy the content of the certificate chain and paste it below the server certificate.
4. Copy the content of the private key and paste it below the certificate chain.

The resulting PEM file should have the following structure:

```txt
-----BEGIN CERTIFICATE-----
Base64–encoded Server Certificate Content
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
Base64–encoded Certificate Chain Content
-----END CERTIFICATE-----
-----BEGIN RSA PRIVATE KEY-----
Base64–encoded Private Key Content
-----END RSA PRIVATE KEY-----
```

## Use PEM File in "byoc create" Command

Ensure you have the PEM file ready and easily accessible before initiating the `./byoc create` command. When using the `./byoc create` command to deploy your BYOC environment, you need to specify the absolute path where the PEM file is located in the parameter `--sslCertPath`. For more information on how to configure the parameter, see [Run Deployment](../create/byoc.md#run-deployment).

