#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';

const GMO_API_ENDPOINT = 'https://forex-api.coin.z.com/public';

// MCPサーバーの作成
const server = new Server(
  {
    name: 'gmo-kline-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ツール一覧の提供
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_klines',
        description: 'GMOコイン外国為替FXのKLine(ローソク足)データを取得します。指定した銘柄、価格タイプ、時間軸、日付のローソク足データを返します。',
        inputSchema: {
          type: 'object',
          properties: {
            symbol: {
              type: 'string',
              description: '取扱銘柄 (例: USD_JPY, EUR_JPY, GBP_JPY, AUD_JPY, NZD_JPY, CAD_JPY, CHF_JPY, EUR_USD, GBP_USD, AUD_USD)',
            },
            priceType: {
              type: 'string',
              enum: ['BID', 'ASK'],
              description: '価格タイプ: BID(売値) または ASK(買値)',
            },
            interval: {
              type: 'string',
              enum: ['1min', '5min', '10min', '15min', '30min', '1hour', '4hour', '8hour', '12hour', '1day', '1week', '1month'],
              description: '時間軸: 1min, 5min, 10min, 15min, 30min, 1hour, 4hour, 8hour, 12hour, 1day, 1week, 1month',
            },
            date: {
              type: 'string',
              description: '日付: YYYYMMDD形式(1min～1hourの場合、20231028以降) または YYYY形式(4hour以上の場合)',
            },
          },
          required: ['symbol', 'priceType', 'interval', 'date'],
        },
      },
    ],
  };
});

// ツール実行の処理
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'get_klines') {
    const { symbol, priceType, interval, date } = request.params.arguments;

    // パラメータの検証
    if (!symbol || !priceType || !interval || !date) {
      return {
        content: [
          {
            type: 'text',
            text: 'エラー: すべてのパラメータ(symbol, priceType, interval, date)が必要です。',
          },
        ],
      };
    }

    // intervalとdateフォーマットの整合性チェック
    const shortIntervals = ['1min', '5min', '10min', '15min', '30min', '1hour'];
    const longIntervals = ['4hour', '8hour', '12hour', '1day', '1week', '1month'];
    
    if (shortIntervals.includes(interval) && !/^\d{8}$/.test(date)) {
      return {
        content: [
          {
            type: 'text',
            text: `エラー: interval=${interval}の場合、dateはYYYYMMDD形式(例: 20231028)で指定してください。`,
          },
        ],
      };
    }
    
    if (longIntervals.includes(interval) && !/^\d{4}$/.test(date)) {
      return {
        content: [
          {
            type: 'text',
            text: `エラー: interval=${interval}の場合、dateはYYYY形式(例: 2023)で指定してください。`,
          },
        ],
      };
    }

    try {
      // GMO APIへのリクエスト
      const path = `/v1/klines?symbol=${symbol}&priceType=${priceType}&interval=${interval}&date=${date}`;
      const response = await axios.get(GMO_API_ENDPOINT + path);

      // レスポンスの整形
      const data = response.data;
      
      if (data.status !== 0) {
        return {
          content: [
            {
              type: 'text',
              text: `APIエラー: ${JSON.stringify(data, null, 2)}`,
            },
          ],
        };
      }

      const klines = data.data;
      const summary = `取得成功: ${klines.length}件のKLineデータを取得しました。\n` +
                     `銘柄: ${symbol}, 価格タイプ: ${priceType}, 時間軸: ${interval}, 日付: ${date}\n` +
                     `レスポンス時刻: ${data.responsetime}`;

      return {
        content: [
          {
            type: 'text',
            text: summary + '\n\n' + JSON.stringify(klines, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `エラーが発生しました: ${error.message}\n${error.response?.data ? JSON.stringify(error.response.data, null, 2) : ''}`,
          },
        ],
      };
    }
  }

  return {
    content: [
      {
        type: 'text',
        text: `不明なツール: ${request.params.name}`,
      },
    ],
  };
});

// サーバーの起動
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('GMO KLine MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});

