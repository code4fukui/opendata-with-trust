# Opendata with Trust

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

![Opendata with Trust Logo](./opendata-with-trust.png)


"Opendata with Trust" enhances the reliability of open datasets by enabling cryptographic verification of data integrity and authenticity. It uses digital signatures to create a verifiable link between a dataset and its publisher.

「Opendata with Trust」は、データの検証可能な認証とバリデーションを可能にすることで、公開データセットの信頼性と信頼度を高めるツールです。

## Features

- **Cryptographic Signing:** Uses Ed25519 digital signatures to ensure data integrity and authenticity.
- **Trust Metadata:** Generates a simple `.trust.json` file to accompany a dataset, containing the public key and signature.
- **CLI Tools:** Provides two simple Deno-based command-line tools, `makeTrust` for signing and `verifyTrust` for validation.
- **PEM Compatibility:** Includes a utility to convert standard Ed25519 PEM keys into the required format.

## How It Works

The process involves two main steps:

1.  **Signing:** A data publisher uses their private key to sign a dataset file (e.g., `data.csv`). This generates a corresponding metadata file, `data.csv.trust.json`, which contains the publisher's public key and the cryptographic signature.
2.  **Verifying:** A data consumer runs the verification tool on their copy of `data.csv`. The tool uses the public key in `data.csv.trust.json` to check the signature against the data file. A successful verification proves that the file is authentic (signed by the publisher) and has not been altered.

## Requirements

- [Deno](https://deno.land/)
- [OpenSSL](https://www.openssl.org/) (for key generation)

## Installation

Install the command-line tools globally using Deno:

```sh
deno install --global -f --allow-read --allow-write --allow-import=code4fukui.github.io makeTrust.js
deno install --global -f --allow-read --allow-import=code4fukui.github.io verifyTrust.js
```

## Usage Workflow