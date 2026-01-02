# Opendata with Trust

![Opendata with Trust Logo](./opendata-with-trust.png)

- "Opendata with Trust" is a tool that enhances the reliability and trustworthiness of dataset by enabling verifiable authentication and validation of the data.

- 「Opendata with Trust」は、データの検証可能な認証とバリデーションを可能にすることで、公開データセットの信頼性と信頼度を高めるツールです。

## install

```sh
deno install --global -f --allow-read --allow-write --allow-import=code4fukui.github.io makeTrust.js
deno install --global -f --allow-read --allow-import=code4fukui.github.io verifyTrust.js
```

## usage

```sh
makeTrust [fn] [privateKey in Base16]
```
→ [fn].trust.json

```sh
verifyTrust [fn]
```

## how to generate prikey

```sh
openssl genpkey -algorithm ed25519 --out prikey.pem
deno -A pem2keys.js prikey.pem
```

## test

```sh
cd test
deno test -A
```
