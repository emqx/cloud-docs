# Configure TLS/SSL

::: tip Note
This feature is only available for the Dedicated plan.
:::

EMQX Cloud Dedicated deployment recommends customized certificate validation and provides both one-way/two-way TLS/SSL. This section introduces the certification validation, including instructions on how to configure the TSL/SSL protocol in your deployment and test if the configuration is successful.

The following table provides an overview of different requirements for certifications in one-way and two-way authentication modes. 

| Certification Mode     | Self-signed Certificate | Server Certificate | Certificate Chain | Private Key | Client CA Certificate |
| ---------------------- | ------------------------------- | ------------------ | ----------------- | ----------- | --------------------- |
| One-way Authentication | Yes                             | Required          | Required         | Required   | Not required         |
| Two-way Authentication | Yes                             | Required          | Required         | Required   | Required             |

## Certificate Requirements

- The certificate must specify the encryption algorithm and key size. EMQX Cloud supports the following algorithms:

  - 1024 bit RSA (RSA_1024)
  - 2048 bit RSA (RSA_2048)
  - 256 bit ECDSA (ECC) 
  - 384 bit ECDSA (ECC) 

- Certificate (including certificate chain, if applicable): The EMQX Cloud supports uploading certificates in **x509** format. **Please merge your certificate (.crt or .pem) and any related certificate chain files into one file and upload it**. If your certificate is issued by a certificate authority, it is important to include the certificate chain to ensure that it is correctly recognized.
- The certificate must be valid. The certificate cannot be imported within **60 days** before the beginning and end of the validity period.

- The certificate, private key and certificate chain must use **PEM encoding**.

- The private key must be password-less.

- The private key support PKCS#1 and PKCS#8.

- The encryption algorithm of the certificate must match the encryption algorithm of the signing CA. For example, if the key type of the signing CA is RSA, the key type of the certificate must also be RSA.

- Format description:

  - Certificate format

  ```bash
  -----BEGIN CERTIFICATE-----
  Base64–encoded certificate
  -----END CERTIFICATE----- 
  ```

  - Private key format

  ```bash
  -----BEGIN (RSA/EC) PRIVATE KEY-----
  Base64–encoded private key
  -----END (RSA/EC) PRIVATE KEY----- 
  ```

## Configure One-Way TLS/SSL

The following instructions guide you to configure one-way TLS/SSL in [EMQX Cloud Console](<https://cloud-intl.emqx.com/console>) and test the client connection with TLS/SSL configured. You can also watch [One-Way TLS/SSL Tutorial](https://www.youtube.com/embed/kkb1D4lXbFo/?autoplay=1&null) for each step of the setup.

1. Login to the EMQX Cloud Console.
2. On your deployment **Overview** page, click the **+TLS/SSL configuration** button to configure the certificate. You can upload the file or fill in the certificate contents directly.
    - **TLS/SSL type**: Choose one-way (only the client verifies the server-side certificate).
    - **Certificate body**: Custom server-side certificate.(Including certificate chain, which is provided by a third-party organization when issuing the certificate.)
    - **Certificate private key**: Private secret key.
3. After filling in all the fields, click **Confirm**. On your deployment overview page, you should see the certificate information in **TLS/SSL Config**.


### Test One-Way TLS with MQTTX Client

Before testing, make sure that you have created authentication information, refer to [Certification and Authentication](./auth_dedicated.md). You can use [MQTTX Client](https://mqttx.app/) to connect to EMQX Cloud and test the TLS/SSL configuration. 

1. In MQTTX Client, create a new connection.

   In the **General** section, fill in the information as follows:

   - **Name**: Type the name of the connection. 
   - **Client ID**: The client ID is randomly generated. You can click the refresh button to regenerate the id.
   - **Host**: Select the protocol from the drop-down list and fill in the deployed connection address and port.
     - If you use MQTT over TLS, select ports `mqtts://` and `8883`.
     - If you use WebSocket over TLS, select ports `wss://` and `8084`.

   - **Username** and **Password**: Type the authentication information you have created.
   - **SSL/TLS**: Click the toggle switch to enable SSL/TLS.
   - **SSL Secure**: Click the toggle switch to enable SSL Secure.
   - **Certificate**: Select the certification as needed.
     - If it is a certificate certified by CA authority, click **CA signed server**.
     - If it is self-signed certificate, click **Self signed** to provide self-signed server-side CA certificate. For information on how to create self-signed TSL/SSL certificate, see [Create Self-Signed TSL/SSL Certificate](#create-self-signed-tsl-ssl-certificate).

2. Click **Connect**. 

![mqttx_tls](./_assets/mqttx_tls.png)

## Configure Two-Way TLS/SSL

The following instructions guide you to configure two-way TLS/SSL in [EMQX Cloud Console](<https://cloud-intl.emqx.com/console>) and test the client connection with TLS/SSL configured. You can also watch [Two-Way TLS/SSL Tutorial](https://www.youtube.com/embed/VzygGJXgVI4/?autoplay=1&null) for each step of the setup.

1. Login to the EMQX Cloud Console.
2. On your deployment **Overview** page, click the **+TLS/SSL configuration** button to configure the certificate. You can upload the file or fill in the certificate contents directly.
    - **TLS/SSL type**: Select two-way (client and server verify each other's certificates).
    - **Certificate body**: Custom server-side certificate.(Including certificate chain, which is provided by a third-party organization when issuing the certificate.)
    - **Certificate private key**: Private secret key.
    - **Client CA**: When choosing two-way, you need to provide the client CA certificate.
3. After filling in all the fields, click on **Confirm**. On your deployment overview page, you should see the certificate information in **TLS/SSL Config**.



### Test Two-Way TLS with MQTTX Client

Before testing, make sure that you have created authentication information, refer to [Certification and Authentication](./auth_dedicated.md). You can use [MQTTX Client](https://mqttx.app/) to connect to EMQX Cloud and test the TLS/SSL configuration. 

1. In MQTTX Client, create a new connection.

   In the **General** section, fill in the information as follows:

   - **Name**: Type the name of the connection. 
   - **Client ID**: The client ID is randomly generated. You can click the refresh button to regenerate the id.
   - **Host**: Select the protocol from the drop-down list and fill in the deployed connection address and port.
     - If you use MQTT over TLS, select ports `mqtts://` and `8883`.
     - If you use WebSocket over TLS, select ports `wss://` and `8084`.

   - **Username** and **Password**: Type the authentication information you have created.
   - **SSL/TLS**: Click the toggle switch to enable SSL/TLS.
   - **SSL Secure**: Click the toggle switch to enable SSL Secure.
   - **Certificate**: Select the certification as needed.
     - If it is a server-side CA certified by CA authority, click **Self signed** and fill in the certificate in **CA File** field. For information on how to create self-signed TSL/SSL certificate, see [Create Self-Signed TSL/SSL Certificate](#create-self-signed-tsl-ssl-certificate).
     - If it is self-signed server-side certificate, click **Self signed** to provide self-signed server-side CA certificate. 
     - Two-way TLS also needs to fill in the client certificate file and client key file.

2. Click **Connect**. 

![mqttx_tls](./_assets/mqttx_tls_shuang.png)


## Delete Certificate

Deleting the certificate will disconnect the client from `8883` and `8084`. Make sure that the deletion does not affect your business.

1. Login to the [EMQX Cloud Console](<https://cloud-intl.emqx.com/console>).
2. Click the delete icon for the certificate in the **TLS/SSL Config** section.
3. Click **OK** in the dialog to complete the deletion.

## Create Self-Signed TSL/SSL Certificate

The following instructions guide you to create self-signed TSL/SSL certificates. You can also watch [Create a self-signed TLS/SSL certificate tutorial](https://www.youtube.com/embed/kYL0pQ0GC3k/?autoplay=1&null) for each step of the setup.

::: tip Prerequisite

Make sure you have installed [OpenSSL](https://www.openssl.org/).

:::

### Generate Server-Side CA Certificate

You can use the following statement to generate a server-side CA certificate. You should adjust `subj` to actual use.

```bash
openssl req \
    -new \
    -newkey rsa:2048 \
    -days 365 \
    -nodes \
    -x509 \
    -subj "/C=CN/O=EMQ Technologies Co., Ltd/CN=EMQ CA" \
    -keyout server-ca.key \
    -out server-ca.crt
```

### Create a Server-Side Certificate

1. Generate server-side secret key `server.key`.

```bash
openssl genrsa -out server.key 2048
```

2. Create `openssl.cnf` file. Replace the IP.1 or DNS.1 address with your deployment address.

```
cat << EOF > ./openssl.cnf
[policy_match]
countryName             = match
stateOrProvinceName     = optional
organizationName        = optional
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional

[req]
default_bits       = 2048
distinguished_name = req_distinguished_name
req_extensions     = req_ext
x509_extensions    = v3_req
prompt             = no

[req_distinguished_name]
commonName          = Server

[req_ext]
subjectAltName = @alt_names

[v3_req]
subjectAltName = @alt_names

[alt_names]
# EMQX Cloud deployment connections address
# IP.1 = <IP Connect Address>
DNS.1 = <Domain Connect Address>
EOF
```

3. Generate the server-side certificate request file `server.csr`.

```bash
openssl req -new -key server.key -config openssl.cnf -out server.csr
```

4. Sign the server-side certificate with a CA certificate `server.crt`.

```bash
openssl x509 -req \
    -days 365 \
    -sha256 \
    -in server.csr \
    -CA server-ca.crt \
    -CAkey server-ca.key \
    -CAcreateserial -out server.crt \
    -extensions v3_req -extfile openssl.cnf
```

5. View server-side certificate information.

```bash
openssl x509 -noout -text -in server.crt
```

6. Verify the certificate.

```bash
openssl verify -CAfile server-ca.crt server.crt
```

### Create a Client Certificate

For two-way authentication, you need to generate the client CA certificate first. 

#### Generate Client CA Certificate

You can use the following statement to generate a client CA certificate. You should adjust `subj` to actual use.

```bash
openssl req \
    -new \
    -newkey rsa:2048 \
    -days 365 \
    -nodes \
    -x509 \
    -subj "/C=CN/O=EMQ Technologies Co., Ltd/CN=EMQ CA" \
    -keyout client-ca.key \
    -out client-ca.crt
```

1. Generate client-side secret key `client.key`.

```bash
openssl genrsa -out client.key 2048
```

2. Generate the client-side certificate request file `client.csr`.

```bash
openssl req -new -key client.key -out client.csr -subj "/CN=Client"
```

3. Sign the client-side certificate with a CA certificate `client.crt`.

```bash
openssl x509 -req -days 365 -sha256 -in client.csr -CA client-ca.crt -CAkey client-ca.key -CAcreateserial -out client.crt
```

4. View client-side certificate information.

```bash
openssl x509 -noout -text -in client.crt
```

5. Verify the certificate.

```bash
openssl verify -CAfile client-ca.crt client.crt
```

## FAQ

1. The certificate contains several certificates
  
   Purchased certificates contain intermediate certificates, which open the certificate in text form, and multiple certificates in the order of User Certificate - Intermediate Certificate - Root Certificate. Generally, a certificate contains a user certificate and several intermediate certificates, you need to separate the user certificate from the intermediate certificate and fill in the certificate chain with the intermediate certificate.

   ```bash
   -----BEGIN CERTIFICATE-----
   
   User Certificate
   
   -----END CERTIFICATE-----
   
   -----BEGIN CERTIFICATE-----
   
   Intermediate Certificate
   
   -----END CERTIFICATE-----
   
   -----BEGIN CERTIFICATE-----
   
   Root Certificate
   
   -----END CERTIFICATE-----
   ```

2. Lack of certificate chain
  
    Certificate chain completion: https://myssl.com/chain_download.html
