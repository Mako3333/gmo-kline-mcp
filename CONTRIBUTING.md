# Contributing to GMO KLine MCP Server

まず、このプロジェクトへの貢献を検討していただき、ありがとうございます！

## 貢献方法

### バグ報告

バグを発見した場合は、[Issues](https://github.com/Mako3333/gmo-kline-mcp/issues)で報告してください。

**バグ報告に含めるべき情報**:
- バグの詳細な説明
- 再現手順
- 期待される動作
- 実際の動作
- 環境情報（OS、Node.jsバージョン、MCPクライアント等）
- エラーメッセージやログ（あれば）

### 機能リクエスト

新機能の提案も[Issues](https://github.com/Mako3333/gmo-kline-mcp/issues)で受け付けています。

**機能リクエストに含めるべき情報**:
- 機能の詳細な説明
- ユースケース
- 期待される動作
- 実装案（あれば）

### プルリクエスト

コードの改善や新機能の実装を行う場合は、以下の手順に従ってください。

#### 1. フォークとクローン

```bash
# リポジトリをフォーク後
git clone https://github.com/Mako3333/gmo-kline-mcp.git
cd gmo-kline-mcp
```

#### 2. ブランチの作成

```bash
git checkout -b feature/your-feature-name
# または
git checkout -b fix/your-bug-fix
```

#### 3. 依存関係のインストール

```bash
pnpm install
```

#### 4. 変更の実装

- コードスタイルを統一してください
- 適切なコメントを追加してください
- 必要に応じてドキュメントを更新してください

#### 5. テスト

変更が正しく動作することを確認してください。

```bash
# ツール一覧の確認
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node index.js

# 実際のAPI呼び出しテスト
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get_klines","arguments":{"symbol":"USD_JPY","priceType":"ASK","interval":"1day","date":"2024"}}}' | node index.js 2>/dev/null
```

#### 6. コミット

```bash
git add .
git commit -m "feat: add new feature" # または "fix: fix bug"
```

**コミットメッセージの規約**:
- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメントのみの変更
- `style:` コードの意味に影響しない変更（空白、フォーマット等）
- `refactor:` バグ修正や機能追加を伴わないコードの変更
- `test:` テストの追加や修正
- `chore:` ビルドプロセスやツールの変更

#### 7. プッシュ

```bash
git push origin feature/your-feature-name
```

#### 8. プルリクエストの作成

GitHubでプルリクエストを作成してください。

**プルリクエストに含めるべき情報**:
- 変更の概要
- 変更の理由
- テスト方法
- 関連するIssue（あれば）

## コーディング規約

### JavaScript/Node.js

- **インデント**: 2スペース
- **セミコロン**: 使用する
- **引用符**: シングルクォート（`'`）を優先
- **命名規則**:
  - 変数・関数: camelCase
  - 定数: UPPER_SNAKE_CASE
  - クラス: PascalCase

### コメント

- 複雑なロジックには説明コメントを追加
- 関数には目的を説明するコメントを追加
- TODOコメントは`// TODO: 説明`の形式で記述

### エラーハンドリング

- すべてのAPI呼び出しは適切にエラーハンドリングする
- ユーザーフレンドリーなエラーメッセージを提供する
- エラー時にサーバーがクラッシュしないようにする

## ドキュメント

コードの変更に伴い、以下のドキュメントも更新してください:

- `README.md`: 基本的な使用方法
- `USAGE_EXAMPLES.md`: 使用例
- `SETUP.md`: セットアップ手順（必要に応じて）

## ライセンス

このプロジェクトに貢献することで、あなたの貢献がMIT Licenseの下でライセンスされることに同意したものとみなされます。

## 質問

質問がある場合は、[Issues](https://github.com/Mako3333/gmo-kline-mcp/issues)で気軽に質問してください。

## 行動規範

### 私たちの約束

このプロジェクトでは、すべての参加者にとって安全で歓迎される環境を提供することを約束します。

### 期待される行動

- 他者を尊重する
- 建設的なフィードバックを提供する
- 異なる視点や経験を受け入れる
- コミュニティの最善の利益を優先する

### 許容されない行動

- ハラスメントや差別的な発言
- 個人攻撃や侮辱
- 他者のプライバシーの侵害
- その他、プロフェッショナルでない行為

## 謝辞

このプロジェクトへの貢献に感謝します！

