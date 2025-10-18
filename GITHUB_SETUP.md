# GitHubリポジトリ公開手順

このドキュメントでは、GMO KLine MCPサーバーをGitHubに公開する手順を説明します。

## 📋 事前準備

### 必要なもの
- GitHubアカウント
- Gitがインストールされていること
- プロジェクトファイル一式

### Gitのインストール確認

```bash
git --version
```

インストールされていない場合は、[Git公式サイト](https://git-scm.com/)からダウンロードしてください。

## 🚀 公開手順

### ステップ1: URLの更新

以下のファイル内の`yourusername`を実際のGitHubユーザー名に置き換えてください。

**更新が必要なファイル:**
1. `package.json`
   ```json
   "repository": {
     "type": "git",
     "url": "git+https://github.com/yourusername/gmo-kline-mcp.git"
   }
   ```

2. `README_GITHUB.md`
   - バッジのURL
   - リンクのURL

3. `CHANGELOG.md`
   - リリースのURL

4. `CONTRIBUTING.md`
   - IssuesのURL

### ステップ2: README.mdの置き換え

GitHub用の詳細なREADMEを使用する場合:

```bash
# 元のREADME.mdをバックアップ
mv README.md README_ORIGINAL.md

# GitHub用READMEを使用
mv README_GITHUB.md README.md
```

または、両方を保持する場合は`README_GITHUB.md`をそのまま使用してください。

### ステップ3: Gitリポジトリの初期化

#### 自動初期化（推奨）

**Linux/macOS:**
```bash
cd /path/to/gmo-kline-mcp
./scripts/init-github.sh
```

**Windows:**
```cmd
cd C:\path\to\gmo-kline-mcp
scripts\init-github.bat
```

#### 手動初期化

```bash
# Gitリポジトリの初期化
git init

# デフォルトブランチをmainに設定
git branch -M main

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "feat: initial commit

- Add MCP server implementation for GMO Coin FX KLine API
- Add comprehensive documentation
- Add GitHub workflows and templates
- Add LICENSE and CONTRIBUTING guidelines"
```

### ステップ4: GitHubでリポジトリを作成

1. [GitHub](https://github.com/)にログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ情報を入力:
   - **Repository name**: `gmo-kline-mcp`
   - **Description**: `MCP server for GMO Coin FX KLine API`
   - **Public** を選択
   - **Initialize this repository with:** は何もチェックしない（既にローカルで初期化済み）
4. 「Create repository」をクリック

### ステップ5: リモートリポジトリの追加とプッシュ

GitHubで表示される指示に従うか、以下のコマンドを実行:

```bash
# リモートリポジトリを追加
git remote add origin https://github.com/yourusername/gmo-kline-mcp.git

# プッシュ
git push -u origin main
```

### ステップ6: リポジトリの設定

GitHubのリポジトリページで以下を設定:

#### 1. Aboutセクションの設定
- Description: `MCP server for GMO Coin FX KLine API`
- Website: （あれば）
- Topics: `mcp`, `gmo-coin`, `forex`, `kline`, `api`, `nodejs`

#### 2. Issuesの有効化
- Settings → Features → Issues にチェック

#### 3. GitHub Actionsの確認
- Actions タブで CI ワークフローが実行されていることを確認

#### 4. Branchプロテクションの設定（任意）
- Settings → Branches → Add branch protection rule
- Branch name pattern: `main`
- 推奨設定:
  - ✓ Require a pull request before merging
  - ✓ Require status checks to pass before merging

## 📝 公開後の確認事項

### 1. CIの動作確認
- Actions タブでワークフローが正常に実行されているか確認
- エラーがある場合は修正してプッシュ

### 2. READMEの表示確認
- リポジトリのトップページでREADMEが正しく表示されているか確認
- バッジが正しく表示されているか確認

### 3. ドキュメントの確認
- すべてのリンクが正しく機能しているか確認
- 画像やコードブロックが正しく表示されているか確認

## 🎉 公開完了後

### リリースの作成

初回リリース（v1.0.0）を作成:

1. Releases → Create a new release
2. Tag version: `v1.0.0`
3. Release title: `v1.0.0 - Initial Release`
4. Description: CHANGELOG.mdの内容をコピー
5. 「Publish release」をクリック

### 配布用アーカイブの添付

リリースに`gmo-kline-mcp.tar.gz`を添付することで、ユーザーが簡単にダウンロードできます。

### 宣伝（任意）

- SNSでの告知
- 関連コミュニティでの紹介
- Awesome MCPリストへの追加申請

## 🔄 継続的な更新

### 新機能の追加

```bash
# 新しいブランチを作成
git checkout -b feature/new-feature

# 変更を加える
# ...

# コミット
git add .
git commit -m "feat: add new feature"

# プッシュ
git push origin feature/new-feature

# GitHubでPull Requestを作成
```

### バグ修正

```bash
# バグ修正用ブランチを作成
git checkout -b fix/bug-description

# 修正を加える
# ...

# コミット
git add .
git commit -m "fix: fix bug description"

# プッシュ
git push origin fix/bug-description

# GitHubでPull Requestを作成
```

### バージョンアップ

1. `package.json`のバージョンを更新
2. `CHANGELOG.md`を更新
3. コミットしてプッシュ
4. 新しいリリースを作成

## ⚠️ 注意事項

### 機密情報の確認

プッシュ前に以下を確認してください:

- APIキーやシークレットが含まれていないか
- 個人情報が含まれていないか
- `.gitignore`が正しく設定されているか

### ライセンスの確認

- MIT Licenseの内容を確認
- 必要に応じてCopyright年を更新

## 🆘 トラブルシューティング

### プッシュできない

```bash
# リモートの最新状態を取得
git fetch origin

# マージ
git merge origin/main

# 再度プッシュ
git push origin main
```

### 間違ったファイルをコミットした

```bash
# 直前のコミットを取り消し（変更は保持）
git reset --soft HEAD^

# ファイルを修正
# ...

# 再度コミット
git add .
git commit -m "fix: correct commit"
```

### .gitignoreが効かない

```bash
# キャッシュをクリア
git rm -r --cached .
git add .
git commit -m "fix: update .gitignore"
```

## 📚 参考資料

- [GitHub Docs](https://docs.github.com/)
- [Git Book](https://git-scm.com/book/ja/v2)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

---

質問や問題がある場合は、Issuesで報告してください。

