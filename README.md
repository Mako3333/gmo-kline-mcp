# GMO KLine MCP Server

GMOコイン外国為替FXのKLine(ローソク足)データ取得APIをMCP(Model Context Protocol)サーバーとして提供します。

## 概要

このMCPサーバーは、GMOコインの外国為替FXパブリックAPIのKLine取得機能をラップし、AIアシスタントやその他のMCPクライアントから簡単に利用できるようにします。

## 機能

- **get_klines**: 指定した銘柄、価格タイプ、時間軸、日付のローソク足データを取得

## インストール

```bash
# 依存パッケージのインストール
pnpm install
```

## 使用方法

### MCP CLIでのテスト

```bash
# MCPサーバーの起動とツール一覧の確認
manus-mcp-cli list-tools /home/ubuntu/gmo-kline-mcp/index.js

# ツールの実行例
manus-mcp-cli call-tool /home/ubuntu/gmo-kline-mcp/index.js get_klines \
  '{"symbol":"USD_JPY","priceType":"ASK","interval":"1min","date":"20231028"}'
```

### Claude DesktopやCursorでの設定

`claude_desktop_config.json` または `mcp.json` に以下の設定を追加します:

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

## ツール仕様

### get_klines

GMOコイン外国為替FXのKLine(ローソク足)データを取得します。

#### パラメータ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| symbol | string | ✓ | 取扱銘柄 (例: USD_JPY, EUR_JPY, GBP_JPY, AUD_JPY, NZD_JPY, CAD_JPY, CHF_JPY, EUR_USD, GBP_USD, AUD_USD) |
| priceType | string | ✓ | 価格タイプ: BID(売値) または ASK(買値) |
| interval | string | ✓ | 時間軸: 1min, 5min, 10min, 15min, 30min, 1hour, 4hour, 8hour, 12hour, 1day, 1week, 1month |
| date | string | ✓ | 日付: YYYYMMDD形式(1min～1hourの場合、20231028以降) または YYYY形式(4hour以上の場合) |

#### レスポンス

KLineデータの配列を返します。各KLineデータには以下のフィールドが含まれます:

- `openTime`: 開始時刻のunixタイムスタンプ(ミリ秒)
- `open`: 始値
- `high`: 高値
- `low`: 安値
- `close`: 終値

#### 使用例

```javascript
// 2023年10月28日のUSD/JPYの1分足ASK価格を取得
{
  "symbol": "USD_JPY",
  "priceType": "ASK",
  "interval": "1min",
  "date": "20231028"
}

// 2023年のEUR/JPYの日足BID価格を取得
{
  "symbol": "EUR_JPY",
  "priceType": "BID",
  "interval": "1day",
  "date": "2023"
}
```

## API仕様

このMCPサーバーは以下のGMOコインAPIを使用しています:

- **エンドポイント**: `https://forex-api.coin.z.com/public/v1/klines`
- **メソッド**: GET
- **認証**: 不要(パブリックAPI)

詳細は[GMOコイン外国為替FX APIドキュメント](https://api.coin.z.com/fxdocs/#klines)を参照してください。

## 注意事項

- このサーバーはパブリックAPIのみを使用しており、認証は不要です
- APIの利用制限については、GMOコインの公式ドキュメントを確認してください
- `date`パラメータのフォーマットは`interval`によって異なります:
  - 1min～1hour: YYYYMMDD形式(20231028以降)
  - 4hour以上: YYYY形式(取扱開始年以降)

## ライセンス

MIT

