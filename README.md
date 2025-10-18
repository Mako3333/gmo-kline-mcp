# GMO KLine MCP Server

[![CI](https://github.com/Mako3333/gmo-kline-mcp/workflows/CI/badge.svg)](https://github.com/Mako3333/gmo-kline-mcp/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![npm](https://img.shields.io/npm/v/gmo-kline-mcp.svg)](https://www.npmjs.com/package/gmo-kline-mcp)

GMOコイン外国為替FXのKLine(ローソク足)データ取得APIをModel Context Protocol(MCP)サーバーとして提供します。Claude Desktop、CursorなどのMCPクライアントから簡単に為替レートのヒストリカルデータを取得できます。

## 📋 目次

- [特徴](#特徴)
- [クイックスタートnpx](#-クイックスタートnpx)
- [インストール](#インストール)
- [使用方法](#使用方法)
- [対応環境](#対応環境)
- [ドキュメント](#ドキュメント)
- [貢献](#貢献)
- [ライセンス](#ライセンス)

## ✨ 特徴

このMCPサーバーは、GMOコインの外国為替FXパブリックAPIをラップし、AIアシスタントから簡単に利用できるようにします。

**主な機能:**

- **認証不要**: パブリックAPIのため、APIキーやシークレットキーは不要です
- **複数銘柄対応**: USD_JPY、EUR_JPY、GBP_JPY、AUD_JPY、NZD_JPY、CAD_JPY、CHF_JPY、EUR_USD、GBP_USD、AUD_USDの10通貨ペアに対応
- **複数時間軸対応**: 1分足から月足まで12種類の時間軸(1min, 5min, 10min, 15min, 30min, 1hour, 4hour, 8hour, 12hour, 1day, 1week, 1month)をサポート
- **BID/ASK選択**: 売値(BID)と買値(ASK)の両方を取得可能
- **ヒストリカルデータ**: 過去のローソク足データを日付指定で取得
- **パラメータバリデーション**: 適切なエラーメッセージによる入力検証
- **クロスプラットフォーム**: Windows、macOS、Linuxで動作

## ⚡ クイックスタート(npx)

ローカルにクローンせず、npxで直接実行できます。

- ツール一覧を取得（bash/zsh）
  - `echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | npx -y gmo-kline-mcp`
- ツール一覧を取得（PowerShell）
  - `$j='{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'; $j | & npx -y gmo-kline-mcp`

Claude Desktop 登録（推奨）
- `command`: `npx`
- `args`: `["-y", "gmo-kline-mcp"]`

既存手順（クローンして使う）を利用する場合は次の「インストール」を参照してください。

## 🚀 インストール

### 前提条件

- Node.js 18.0.0以上
- pnpm、npm、またはyarn

### 手順

```bash
# リポジトリのクローン
git clone https://github.com/Mako3333/gmo-kline-mcp.git
cd gmo-kline-mcp

# 依存パッケージのインストール
pnpm install
# または
npm install
```

## 📖 使用方法

### MCPクライアントへの登録

#### 推奨: npxでの登録（macOS/Linux/Windows共通）

```json
{
  "mcpServers": {
    "gmo-kline": {
      "command": "npx",
      "args": ["-y", "gmo-kline-mcp"]
    }
  }
}
```

#### Claude Desktop

設定ファイル(`claude_desktop_config.json`)に以下を追加:

**macOS/Linux:**
```json
{
  "mcpServers": {
    "gmo-kline": {
      "command": "node",
      "args": ["/absolute/path/to/gmo-kline-mcp/index.js"]
    }
  }
}
```

**Windows:**
```json
{
  "mcpServers": {
    "gmo-kline": {
      "command": "node",
      "args": ["C:/path/to/gmo-kline-mcp/index.js"]
    }
  }
}
```

#### Cursor

プロジェクトルートの`.cursor/mcp.json`に以下を追加:

```json
{
  "mcpServers": {
    "gmo-kline": {
      "command": "node",
      "args": ["/absolute/path/to/gmo-kline-mcp/index.js"]
    }
  }
}
```

### 使用例

AIアシスタントに以下のようなプロンプトを送信すると、自動的に`get_klines`ツールが呼び出されます。

**例1: 日足データの取得**
```
USD/JPYの2025年の日足ASK価格データを取得して、最高値と最安値を教えてください。
```

**例2: 1分足データの取得**
```
2025年10月17日のEUR/JPYの1分足BID価格データを取得してください。
```

**例3: 複数銘柄の比較**
```
USD/JPYとEUR/JPYの2024年の日足データを取得して、どちらがより変動が大きかったか比較してください。
```

### コマンドラインからの直接実行

```bash
# ツール一覧の確認
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node index.js

# KLineデータの取得
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get_klines","arguments":{"symbol":"USD_JPY","priceType":"ASK","interval":"1day","date":"2024"}}}' | node index.js 2>/dev/null
```

#### npxでの直接実行

- bash/zsh:
  - `echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | npx -y gmo-kline-mcp`
- PowerShell:
  - `"$j='{""jsonrpc"": ""2.0"", ""id"": 1, ""method"": ""tools/list"", ""params"": {}}'; $j | & npx -y gmo-kline-mcp"`

PowerShellの注意: パイプ先を実行する際は呼び出し演算子 `&` を付けてください。

## 🛠️ ツール仕様

### get_klines

GMOコイン外国為替FXのKLine(ローソク足)データを取得します。

#### パラメータ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| symbol | string | ✓ | 取扱銘柄。以下の10通貨ペアのみ: USD_JPY, EUR_JPY, GBP_JPY, AUD_JPY, NZD_JPY, CAD_JPY, CHF_JPY, EUR_USD, GBP_USD, AUD_USD |
| priceType | string | ✓ | 価格タイプ: BID(売値) または ASK(買値) |
| interval | string | ✓ | 時間軸: 1min, 5min, 10min, 15min, 30min, 1hour, 4hour, 8hour, 12hour, 1day, 1week, 1month |
| date | string | ✓ | 日付。1hourまで(1min〜1hour)はYYYYMMDD、4hour以上(4hour〜1month)はYYYY |

#### 日付指定ルール（重要）

- 1min, 5min, 10min, 15min, 30min, 1hour → `YYYYMMDD` 例: `20241028`
- 4hour, 8hour, 12hour, 1day, 1week, 1month → `YYYY` 例: `2024`
- 形式自体はどちらも受け付けますが、サーバー側で interval に応じた整合性チェックを行い、不一致の場合はエラーを返します。

#### レスポンス

KLineデータの配列を返します。各データには以下のフィールドが含まれます。

- `openTime`: 開始時刻のunixタイムスタンプ(ミリ秒)
- `open`: 始値
- `high`: 高値
- `low`: 安値
- `close`: 終値

## 💻 対応環境

このMCPサーバーは以下の環境でテスト済みです。

- **OS**: Windows 11, macOS 14, Ubuntu 22.04
- **Node.js**: v18.x, v20.x, v22.x
- **MCPクライアント**: Claude Desktop, Cursor

## 📚 ドキュメント

詳細なドキュメントは以下のファイルを参照してください。

- [SETUP.md](SETUP.md) - インストールとセットアップの詳細手順
- [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md) - 実用的な使用例とベストプラクティス
- [TEST_RESULTS.md](TEST_RESULTS.md) - テスト結果レポート
- [CONTRIBUTING.md](CONTRIBUTING.md) - 貢献ガイドライン
- [CHANGELOG.md](CHANGELOG.md) - 変更履歴

## 🤝 貢献

貢献を歓迎します！バグ報告、機能リクエスト、プルリクエストなど、どんな形でも構いません。

詳細は[CONTRIBUTING.md](CONTRIBUTING.md)を参照してください。

### 貢献者

このプロジェクトに貢献してくださったすべての方に感謝します。

## 📄 ライセンス

このプロジェクトはMIT Licenseの下でライセンスされています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🔗 関連リンク

- [GMOコイン外国為替FX APIドキュメント](https://api.coin.z.com/fxdocs/)
- [Model Context Protocol 仕様](https://modelcontextprotocol.io/)
- [MCP SDK](https://github.com/modelcontextprotocol/sdk)

## ⚠️ 免責事項

このプロジェクトはGMOコイン株式会社とは関係ありません。公開されているパブリックAPIを利用した非公式のツールです。

使用は自己責任でお願いします。取引の判断や投資の意思決定には、必ず専門家に相談してください。

## 📞 サポート

問題が発生した場合は、[Issues](https://github.com/Mako3333/gmo-kline-mcp/issues)で報告してください。

---

Made with ❤️ by the community
