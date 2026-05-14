# Opendata with Trust

![Opendata with Trust Logo](./opendata-with-trust.png)

「Opendata with Trust」は、データの完全性と真正性の暗号学的な検証を可能にすることで、オープンデータセットの信頼性を高めます。デジタル署名を使用して、データセットと公開者の間に検証可能なリンクを作成します。

## 機能

- **暗号化署名:** Ed25519デジタル署名を使用して、データの完全性と真正性を確保します。
- **トラストメタデータ:** データセットに付随するシンプルな `.trust.json` ファイルを生成し、公開鍵と署名を含めます。
- **CLIツール:** Denoベースの2つのシンプルなコマンドラインツールを提供します。署名用の `makeTrust` と検証用の `verifyTrust` です。
- **PEM互換性:** 標準的なEd25519 PEM鍵を必要な形式に変換するユーティリティを含みます。

## 仕組み

プロセスは主に2つのステップから構成されます:

1. **署名:** データ公開者は自身の秘密鍵を使用してデータファイル（例: `data.csv`）に署名します。これにより、公開者の公開鍵と暗号化署名を含む対応するメタデータファイル `data.csv.trust.json` が生成されます。
2. **検証:** データ利用者は自身の `data.csv` のコピーに対して検証ツールを実行します。ツールは `data.csv.trust.json` 内の公開鍵を使用して、データファイルに対する署名を照合します。検証に成功すると、そのファイルが真正であり（公開者によって署名されている）、改ざんされていないことが証明されます。

## 要件

- [Deno](https://deno.land/)
- [OpenSSL](https://www.openssl.org/) （鍵生成用）

## インストール

Denoを使用してコマンドラインツールをグローバルにインストールします:

```sh
deno install --global -f --allow-read --allow-write --allow-import=code4fukui.github.io makeTrust.js
deno install --global -f --allow-read --allow-import=code4fukui.github.io verifyTrust.js
```

## 使用ワークフロー
