# TLS/SSL Configuration for BYOC plan

EMQX Cloud BYOC Plan provides SSL and TLS encryption protocols to establish secure and encrypted communication channels, protecting data confidentiality during transit. This document outlines the process of configuring and utilizing TSL/SSL protocol on one-way authentication mode, ensuring secure communication within your MQTT ecosystem.

## One-Way Authentication Overview

One-way authentication ensures that the server (EMQX MQTT broker) presents a valid certificate to clients (devices or applications) during the TLS/SSL handshake. Clients verify the authenticity of the server by checking the presented certificate against a trusted Certificate Authority (CA).

In the BYOC plan, only certificates signed by a trusted CA are accepted. This enhances security and prevents unauthorized access to your MQTT clusters.

## Certificate Requirements

To configure TLS/SSL for your BYOC deployment, ensure the following components are combined into a single PEM file:

1. **Server Certificate**: This certificate, issued by a trusted Certificate Authority (CA), enables the EMQX MQTT broker to establish secure connections with clients.

2. **Certificate Chain**: Include the complete chain of certificates leading up to the trusted root CA certificate. This allows client devices to verify the server certificate's authenticity.

3. **Private Key**: The private key associated with the server certificate is essential for decrypting communication between clients and the EMQX MQTT broker.

## Additional Certificate Guidelines

When preparing your certificate for TLS/SSL configuration, consider the following guidelines:

- Certificates must specify encryption algorithms and key sizes. EMQX Cloud supports 1024-bit RSA (RSA_1024) and 2048-bit RSA (RSA_2048) algorithms.

- Certificates must adhere to the SSL/TLS X.509 version 3 standard. They should contain the public key, fully qualified domain name (FQDN) or IP address of the website, and publisher information.

- Certificates can be self-signed using your private key or the issuing CA's private key. If signed by a CA, the certificate chain must be included during import.

- Certificates must be valid and cannot be imported within **30 days** before their validity period's start or end.

- Ensure certificates, private keys, and certificate chains use **PEM encoding**.

- Private keys must be password-less and support PKCS#1 and PKCS#8.

- The certificate's encryption algorithm must match the signing CA's encryption algorithm. For instance, if the signing CA uses RSA, the certificate's key type should also be RSA.

These guidelines ensure the proper configuration and secure deployment of TLS/SSL for your BYOC environment.

## Creating the PEM File

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

## Using the PEM File in "byoc create" Command

Before the execution of the `./byoc create` command to deploy your BYOC environment, you need to provide the PEM file containing the server certificate, certificate chain, and private key. This PEM file is crucial for enabling secure one-way authentication between your MQTT clients and the EMQX MQTT broker.

Ensure you have the PEM file ready and easily accessible before initiating the `./byoc create` command.