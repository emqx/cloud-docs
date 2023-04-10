# Configure TLS/SSL

::: warning Note
This feature is only available for the professional plan
:::

EMQX Cloud **Professional Deployment** recommends customized certificate validation and provides both one-way/two-way TLS/SSL.

| Certification Mode     | Self-signed certificate | Server certificate | Certificate chain | Private key | Client CA certificate |
| ---------------------- | ------------------------------- | ------------------ | ----------------- | ----------- | --------------------- |
| one-way Authentication | Yes                             | required           | required          | required    | not required          |
| two-way Authentication | Yes                             | required           | required          | required    | required              |

## Certificate Requirements

- The certificate must specify the encryption algorithm and key size. EMQX Cloud supports the following algorithms:

  - 1024 bit RSA (RSA_1024)
  - 2048 bit RSA (RSA_2048)

- The certificate must be an SSL/TLS X.509 version 3 certificate. It must contain the public key, the fully qualified domain (FQDN) or IP address of the website, and information about the publisher. The certificate can be self-signed by your private key or the private key of the issuing CA. If the certificate is signed by a CA, the certificate chain must be included when importing the certificate.

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

  - The certificate chain format

  ```bash
  -----BEGIN CERTIFICATE-----
  Base64–encoded certificate
  -----END CERTIFICATE----- 
  ```

  - Private key format

  ```bash
  -----BEGIN (RSA) PRIVATE KEY-----
  Base64–encoded private key
  -----END (RSA) PRIVATE KEY----- 
  ```

## One-way TLS/SSL configuration

1. Login to the [EMQX Cloud Console](<https://cloud-intl.emqx.com/console>).
2. Go to the deployment overview and click on the `+TLS/SSL configuration` button to configure the certificate contents, you can upload the file or fill in the certificate content directly.
    - TLS/SSL type: choose one-way (only the client verifies the server-side certificate).
    - Certificate body: custom server-side certificate
    - Certificate chain: certificate chain, usually provided by the third-party organization when issuing the certificate, if it is missing you can go to [Certificate Chain Complement](https://myssl.com/chain_download.html) to complete it.
    - Certificate private key: Private secret key.
3. After filling in the form, click on `Confirm`.


![tls](./_assets/tls.png)

### Testing One-way TLS with MQTT X

Before testing, make sure that you have created authentication information, refer to [Certification and Authentication](./auth_dedicated.md), you can connect and test using [MQTTX](<https://mqttx.app/>). In this tutorial we will use MQTTX for testing:

- To create a new connection, enter the Name, Client ID is randomly generated
- Select Host and fill in the deployed connection address and port
  - If you use MQTT over TLS, select ports `mqtts://` and `8883`
  - If you use WebSocket over TLS, select ports `wss://` and `8084`
- Enter the authentication information you have created: username and password
- Select true on SSL/TLS
- Certificate selection
  + If it is a certificate certified by CA authority, click "CA signed server".
  + If it is self-signed certificate, click "Self signed" to provide self-signed server-side CA certificate.
- Click on `Connect`

![mqttx_tls](./_assets/mqttx_tls.png)


View [One-Way TLS/SSL Tutorial](https://www.youtube.com/embed/kkb1D4lXbFo/?autoplay=1&null) for each step of the setup.

## Two-way TLS/SSL configuration

1. Login to the [EMQX Cloud Console](<https://cloud-intl.emqx.com/console>).
2. Go to the deployment overview and click on the `+TLS/SSL configuration` button to configure the certificate contents, you can upload the file or fill in the certificate content directly.
    - TLS/SSL type: select two-way (client and server verify each other's certificates).
    - Certificate body: custom server-side certificate
    - Certificate chain: certificate chain, usually provided by the third-party organization when issuing the certificate, if it is missing you can go to [Certificate Chain Complement](https://myssl.com/chain_download.html) to complete it.
    - Certificate private key: Private secret key.
    - Client CA: When choosing two-way, you need to provide the client CA certificate.
3. After filling in the form, click on `Confirm`.

![tls](./_assets/tls_two.png)


### Testing Two-way TLS with MQTT X

Before testing, make sure that you have created authentication information, refer to [Certification and Authentication](./auth_dedicated.md), you can connect and test using [MQTTX](<https://mqttx.app/>). In this tutorial we will use MQTTX for testing:

- To create a new connection, enter the Name, Client ID is randomly generated
- Select Host and fill in the deployed connection address and port
  - If you use MQTT over TLS, select ports `mqtts://` and `8883`
  - If you use WebSocket over TLS, select ports `wss://` and `8084`
- Enter the authentication information you have created: username and password
- Select true on SSL/TLS
- Certificate selection
  + If it is a server-side CA certified by CA authority, click "Self signed" and fill in the certificate in CA File.
  + If it is self-signed server-side certificate, click "Self signed" to provide self-signed server-side CA certificate.
  + Two-way TLS also needs to fill in the client certificate file and client key file.
- Click on `Connect`

![mqttx_tls](./_assets/mqttx_tls_shuang.png)

View [Two-Way TLS/SSL Tutorial](https://www.youtube.com/embed/VzygGJXgVI4/?autoplay=1&null) for each step of the setup.


## Delete the Certificate

Deleting the certificate will disconnect the client from `8883` and `8084`, please ensure that this does not affect your business.

1. Login to the [EMQX Cloud Console](<https://cloud-intl.emqx.com/console>).
2. To access the deployment details, click on the delete button for the certificate in the `TLS/SSL Configuration` section.
3. Click on "OK" in the dialog to complete the deletion.

## Creating Self-Signed TSL/SSL Certificate

Make sure you have installed [OpenSSL](https://www.openssl.org/) first.


### Generation of Server CA certificate

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

You should adjust `subj` to actual use.

### Creating a Server Certificate

1. Generate server-side secret key `server.key`

```bash
openssl genrsa -out server.key 2048
```

2. Create `openssl.cnf` file

Replace the IP.1 or DNS.1 address with your deployment address

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

3. Generate the server-side certificate request file `server.csr`

```bash
openssl req -new -key server.key -config openssl.cnf -out server.csr
```

4. Sign the server-side certificate with a CA certificate `server.crt`

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

5. View server-side certificate information
  
```bash
openssl x509 -noout -text -in server.crt
```

6. Verify the certificate

```bash
openssl verify -CAfile server-ca.crt server.crt
```

### Creating a client Certificate

For two-way authentication, you will need to generate the client CA certificate first

#### Generate client CA certificate

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

You should adjust `subj` to actual use.

1. Generate client-side secret key `client.key`

```bash
openssl genrsa -out client.key 2048
```

2. Generate the client-side certificate request file `client.csr`

```bash
openssl req -new -key client.key -out client.csr -subj "/CN=Client"
```

3. Sign the client-side certificate with a CA certificate `client.crt`

```bash
openssl x509 -req -days 365 -sha256 -in client.csr -CA client-ca.crt -CAkey client-ca.key -CAcreateserial -out client.crt
```

4. View client-side certificate information

```bash
openssl x509 -noout -text -in client.crt
```

5. Verify the certificate

```bash
openssl verify -CAfile client-ca.crt client.crt
```


View [Create a self-signed TLS/SSL certificate tutorial](https://www.youtube.com/embed/kYL0pQ0GC3k/?autoplay=1&null) for each step of the setup.


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
