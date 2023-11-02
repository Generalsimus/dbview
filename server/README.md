


```
openssl genpkey -algorithm RSA -out key.pem -aes256
```



```
openssl req -new -key key.pem -x509 -days 365 -out cert.pem
```



```
openssl rsa -in key.pem -out key.pem
```
