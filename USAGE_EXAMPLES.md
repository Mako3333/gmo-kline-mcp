# GMO KLine MCP Server - 使用例

## 目次
1. [基本的な使い方](#基本的な使い方)
2. [Claude Desktopでの設定](#claude-desktopでの設定)
3. [Cursorでの設定](#cursorでの設定)
4. [実用例](#実用例)
5. [トラブルシューティング](#トラブルシューティング)

## 基本的な使い方

### コマンドラインからの直接実行

MCPサーバーは標準入出力(stdio)を使用してJSON-RPCメッセージを処理します。

```bash
# ツール一覧の取得
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node /home/ubuntu/gmo-kline-mcp/index.js

# KLineデータの取得
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get_klines","arguments":{"symbol":"USD_JPY","priceType":"ASK","interval":"1day","date":"2024"}}}' | node /home/ubuntu/gmo-kline-mcp/index.js
```

## Claude Desktopでの設定

Claude Desktopの設定ファイル(`claude_desktop_config.json`)に以下を追加します:

### macOS/Linux
```json
{
  "mcpServers": {
    "gmo-kline": {
      "command": "node",
      "args": ["/home/ubuntu/gmo-kline-mcp/index.js"]
    }
  }
}
```

### Windows
```json
{
  "mcpServers": {
    "gmo-kline": {
      "command": "node",
      "args": ["C:\\path\\to\\gmo-kline-mcp\\index.js"]
    }
  }
}
```

設定後、Claude Desktopを再起動すると、`get_klines`ツールが使用可能になります。

## Cursorでの設定

Cursorの設定ファイル(`.cursor/mcp.json`)に以下を追加します:

```json
{
  "mcpServers": {
    "gmo-kline": {
      "command": "node",
      "args": ["/home/ubuntu/gmo-kline-mcp/index.js"]
    }
  }
}
```

## 実用例

### 例1: 最近の日足データを取得して分析

**プロンプト例**:
```
USD/JPYの2024年の日足ASK価格データを取得して、最高値と最安値を教えてください。
```

**MCPツール呼び出し**:
```json
{
  "symbol": "USD_JPY",
  "priceType": "ASK",
  "interval": "1day",
  "date": "2024"
}
```

### 例2: 特定日の1分足データを取得

**プロンプト例**:
```
2024年10月18日のEUR/JPYの1分足BID価格データを取得してください。
```

**MCPツール呼び出し**:
```json
{
  "symbol": "EUR_JPY",
  "priceType": "BID",
  "interval": "1min",
  "date": "20241018"
}
```

### 例3: 複数銘柄の比較分析

**プロンプト例**:
```
USD/JPYとEUR/JPYの2024年の日足データを取得して、どちらがより変動が大きかったか比較してください。
```

**MCPツール呼び出し(1回目)**:
```json
{
  "symbol": "USD_JPY",
  "priceType": "ASK",
  "interval": "1day",
  "date": "2024"
}
```

**MCPツール呼び出し(2回目)**:
```json
{
  "symbol": "EUR_JPY",
  "priceType": "ASK",
  "interval": "1day",
  "date": "2024"
}
```

### 例4: 週足データで長期トレンドを確認

**プロンプト例**:
```
GBP/USDの2024年の週足データを取得して、トレンドを分析してください。
```

**MCPツール呼び出し**:
```json
{
  "symbol": "GBP_USD",
  "priceType": "ASK",
  "interval": "1week",
  "date": "2024"
}
```

### 例5: 短期的な価格変動の分析

**プロンプト例**:
```
2024年10月18日のUSD/JPYの5分足データを取得して、その日の価格変動パターンを分析してください。
```

**MCPツール呼び出し**:
```json
{
  "symbol": "USD_JPY",
  "priceType": "ASK",
  "interval": "5min",
  "date": "20241018"
}
```

## 対応銘柄一覧

以下の銘柄がサポートされています:

- **クロス円**: USD_JPY, EUR_JPY, GBP_JPY, AUD_JPY, NZD_JPY, CAD_JPY, CHF_JPY
- **ドルストレート**: EUR_USD, GBP_USD, AUD_USD

## 時間軸(interval)の選択ガイド

| interval | 適用シーン | dateフォーマット |
|----------|-----------|-----------------|
| 1min | デイトレード、スキャルピング | YYYYMMDD |
| 5min | デイトレード | YYYYMMDD |
| 15min | デイトレード、スイング | YYYYMMDD |
| 1hour | スイングトレード | YYYYMMDD |
| 4hour | スイングトレード | YYYY |
| 1day | 中長期分析 | YYYY |
| 1week | 長期トレンド分析 | YYYY |
| 1month | 長期トレンド分析 | YYYY |

## トラブルシューティング

### エラー: "interval=1minの場合、dateはYYYYMMDD形式で指定してください"

**原因**: 短期間隔(1min～1hour)でYYYY形式のdateを指定している

**解決策**: dateを8桁のYYYYMMDD形式に変更してください
```json
{
  "date": "20241018"  // ✅ 正しい
  // "date": "2024"   // ❌ 間違い
}
```

### エラー: "interval=1dayの場合、dateはYYYY形式で指定してください"

**原因**: 長期間隔(4hour以上)でYYYYMMDD形式のdateを指定している

**解決策**: dateを4桁のYYYY形式に変更してください
```json
{
  "date": "2024"      // ✅ 正しい
  // "date": "20241018" // ❌ 間違い
}
```

### データが取得できない

**確認事項**:
1. インターネット接続を確認
2. GMOコインAPIが稼働中か確認(メンテナンス時間でないか)
3. 指定した日付が取扱開始日以降か確認(YYYYMMDD形式の場合は20231028以降)
4. 銘柄名のスペルが正しいか確認(USD_JPY、EUR_JPYなど)

### MCPクライアントでツールが表示されない

**確認事項**:
1. 設定ファイルのパスが正しいか確認
2. Node.jsがインストールされているか確認(`node --version`)
3. 依存パッケージがインストールされているか確認(`cd /path/to/gmo-kline-mcp && pnpm install`)
4. MCPクライアントを再起動

## パフォーマンスに関する注意

- 1分足データは1日あたり1440件のデータポイントが返されます
- 大量のデータを取得する場合は、レスポンス時間が長くなる可能性があります
- GMOコインAPIの利用制限に注意してください(詳細は公式ドキュメント参照)

## さらなる活用方法

### データの可視化
取得したKLineデータをPythonやJavaScriptで可視化することができます。

### 自動取引戦略のバックテスト
過去のKLineデータを使用して、取引戦略のバックテストが可能です。

### リアルタイム監視
定期的にデータを取得して、価格変動を監視するスクリプトを作成できます。

### 複数銘柄の相関分析
複数の銘柄のデータを取得して、相関関係を分析できます。

