@echo off
REM GMO KLine MCP Server - GitHub初期化スクリプト (Windows)
REM このスクリプトは、GitHubリポジトリを初期化し、最初のコミットを作成します

echo ===================================
echo GMO KLine MCP Server
echo GitHub Repository Initialization
echo ===================================
echo.

REM 現在のディレクトリを確認
if not exist "package.json" (
    echo エラー: package.jsonが見つかりません。
    echo このスクリプトはプロジェクトルートで実行してください。
    pause
    exit /b 1
)

REM Gitリポジトリの初期化
if not exist ".git" (
    echo Gitリポジトリを初期化中...
    git init
    echo ✓ Gitリポジトリを初期化しました
) else (
    echo ✓ Gitリポジトリは既に初期化されています
)

REM .gitignoreの確認
if exist ".gitignore" (
    echo ✓ .gitignoreファイルが存在します
) else (
    echo 警告: .gitignoreファイルが見つかりません
)

REM デフォルトブランチをmainに設定
echo デフォルトブランチをmainに設定中...
git branch -M main
echo ✓ デフォルトブランチをmainに設定しました

REM ファイルをステージング
echo ファイルをステージング中...
git add .
echo ✓ ファイルをステージングしました

REM 初回コミット
echo 初回コミットを作成中...
git commit -m "feat: initial commit" -m "" -m "- Add MCP server implementation for GMO Coin FX KLine API" -m "- Add comprehensive documentation" -m "- Add GitHub workflows and templates" -m "- Add LICENSE and CONTRIBUTING guidelines"
echo ✓ 初回コミットを作成しました

echo.
echo ===================================
echo 初期化完了！
echo ===================================
echo.
echo 次のステップ:
echo 1. GitHubで新しいリポジトリを作成
echo 2. リモートリポジトリを追加:
echo    git remote add origin https://github.com/Mako3333/gmo-kline-mcp.git
echo 3. プッシュ:
echo    git push -u origin main
echo.
echo 注意: package.jsonとREADME_GITHUB.mdのURLを実際のリポジトリURLに更新してください
echo.
pause

