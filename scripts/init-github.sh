#!/bin/bash

# GMO KLine MCP Server - GitHub初期化スクリプト
# このスクリプトは、GitHubリポジトリを初期化し、最初のコミットを作成します

set -e

echo "==================================="
echo "GMO KLine MCP Server"
echo "GitHub Repository Initialization"
echo "==================================="
echo ""

# 現在のディレクトリを確認
if [ ! -f "package.json" ]; then
    echo "エラー: package.jsonが見つかりません。"
    echo "このスクリプトはプロジェクトルートで実行してください。"
    exit 1
fi

# Gitリポジトリの初期化
if [ ! -d ".git" ]; then
    echo "Gitリポジトリを初期化中..."
    git init
    echo "✓ Gitリポジトリを初期化しました"
else
    echo "✓ Gitリポジトリは既に初期化されています"
fi

# .gitignoreの確認
if [ -f ".gitignore" ]; then
    echo "✓ .gitignoreファイルが存在します"
else
    echo "警告: .gitignoreファイルが見つかりません"
fi

# デフォルトブランチをmainに設定
echo "デフォルトブランチをmainに設定中..."
git branch -M main
echo "✓ デフォルトブランチをmainに設定しました"

# ファイルをステージング
echo "ファイルをステージング中..."
git add .
echo "✓ ファイルをステージングしました"

# 初回コミット
echo "初回コミットを作成中..."
git commit -m "feat: initial commit

- Add MCP server implementation for GMO Coin FX KLine API
- Add comprehensive documentation
- Add GitHub workflows and templates
- Add LICENSE and CONTRIBUTING guidelines"
echo "✓ 初回コミットを作成しました"

echo ""
echo "==================================="
echo "初期化完了！"
echo "==================================="
echo ""
echo "次のステップ:"
echo "1. GitHubで新しいリポジトリを作成"
echo "2. リモートリポジトリを追加:"
echo "   git remote add origin https://github.com/yourusername/gmo-kline-mcp.git"
echo "3. プッシュ:"
echo "   git push -u origin main"
echo ""
echo "注意: package.jsonとREADME_GITHUB.mdのURLを実際のリポジトリURLに更新してください"
echo ""

