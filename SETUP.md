# GMO KLine MCP Server - セットアップガイド

## 必要な環境

- **Node.js**: v18.0.0以上
- **pnpm**: v8.0.0以上(または npm/yarn)
- **OS**: macOS, Linux, Windows

## インストール手順

### 1. アーカイブの展開

```bash
# アーカイブをダウンロードした場所で実行
tar -xzf gmo-kline-mcp.tar.gz
cd gmo-kline-mcp
```

### 2. 依存パッケージのインストール

```bash
# pnpmを使用する場合
pnpm install

# npmを使用する場合
npm install

# yarnを使用する場合
yarn install
```

### 3. 動作確認

```bash
# ツール一覧の確認
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node index.js

# 簡単なテスト
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get_klines","arguments":{"symbol":"USD_JPY","priceType":"ASK","interval":"1day","date":"2024"}}}' | node index.js 2>/dev/null
```

正常に動作すれば、KLineデータが返されます。

## MCPクライアントへの登録

### Claude Desktop

1. Claude Desktopの設定ファイルを開く:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. 以下の設定を追加:

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

**注意**: `/absolute/path/to/`を実際のパスに置き換えてください。

3. Claude Desktopを再起動

### Cursor

1. プロジェクトルートに`.cursor`ディレクトリを作成(存在しない場合)
2. `.cursor/mcp.json`ファイルを作成または編集:

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

3. Cursorを再起動

### その他のMCPクライアント

MCPプロトコルをサポートする他のクライアントでも、同様の設定方法で使用できます。
基本的には以下の情報を設定します:

- **command**: `node`
- **args**: `["/path/to/gmo-kline-mcp/index.js"]`

## パスの確認方法

現在のディレクトリの絶対パスを確認:

```bash
# macOS/Linux
cd gmo-kline-mcp && pwd

# Windows (PowerShell)
cd gmo-kline-mcp; pwd

# Windows (Command Prompt)
cd gmo-kline-mcp && cd
```

出力された絶対パスに`/index.js`(Windows: `\index.js`)を追加して設定ファイルに記載します。

## トラブルシューティング

### Node.jsがインストールされていない

```bash
# Node.jsのバージョン確認
node --version

# インストールされていない場合
# macOS (Homebrew)
brew install node

# Ubuntu/Debian
sudo apt update && sudo apt install nodejs npm

# Windows
# https://nodejs.org/ からインストーラーをダウンロード
```

### pnpmがインストールされていない

```bash
# npmを使用してpnpmをインストール
npm install -g pnpm

# または、npmで直接依存パッケージをインストール
npm install
```

### MCPクライアントでツールが表示されない

1. 設定ファイルのJSON形式が正しいか確認(カンマ、括弧の位置など)
2. パスが絶対パスになっているか確認(相対パスは使用できません)
3. `index.js`ファイルが実行可能か確認:
   ```bash
   chmod +x /path/to/gmo-kline-mcp/index.js
   ```
4. MCPクライアントのログを確認(エラーメッセージが表示されている場合)

### 依存パッケージのインストールエラー

```bash
# キャッシュをクリアして再インストール
rm -rf node_modules pnpm-lock.yaml
pnpm install

# または
rm -rf node_modules package-lock.json
npm install
```

## アップデート方法

新しいバージョンがリリースされた場合:

1. 既存のディレクトリをバックアップ
2. 新しいアーカイブをダウンロード
3. 展開して依存パッケージを再インストール
4. MCPクライアントの設定ファイルのパスを更新(必要に応じて)
5. MCPクライアントを再起動

## アンインストール方法

1. MCPクライアントの設定ファイルから`gmo-kline`の設定を削除
2. MCPクライアントを再起動
3. `gmo-kline-mcp`ディレクトリを削除

```bash
rm -rf /path/to/gmo-kline-mcp
```

## サポート

問題が発生した場合は、以下のファイルを確認してください:

- `README.md`: プロジェクトの概要と基本的な使用方法
- `USAGE_EXAMPLES.md`: 実用的な使用例
- `TEST_RESULTS.md`: テスト結果と動作確認内容

## セキュリティに関する注意

- このMCPサーバーはパブリックAPIのみを使用しており、認証情報は不要です
- APIキーやシークレットキーを設定する必要はありません
- インターネット接続が必要です(GMOコインAPIへのアクセスのため)

