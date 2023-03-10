# Opendata with Trust

Opendata with Trust is a tool that enhances the reliability and trustworthiness of dataset by enabling verifiable authentication and validation of the data.

## install

```sh
deno install --allow-read --allow-write makeTrust.js
deno install --allow-read verifyTrust.js
```

## usage

```sh
makeTrust [fn] [publickey in Base16] [privateKey in Base16]
```
→ [fn].trust.json

```sh
verifyTrust [fn]
```

## test

```sh
cd test
openssl genpkey -algorithm ed25519 --out prikey.pem
openssl pkey -in prikey.pem -pubout > pubkey.pem
```
