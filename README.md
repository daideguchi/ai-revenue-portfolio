# DD AI作品集

DDがAIと一緒に作った公開作品をまとめた、メインの作品集です。

作品、公開ページ、GitHub、提出状況、確認できる証拠を一か所に置いています。

## まず見るページ

メインサイト:

```text
https://ai-revenue-portfolio.vercel.app
```

GitHub Pages版:

```text
https://daideguchi.github.io/ai-revenue-portfolio/
```

GitHubリポジトリ:

```text
https://github.com/daideguchi/ai-revenue-portfolio
```

## これは何か

これは、DDがAIと何を作れるのかをすぐ見るための入口です。

ページでは、次のことが分かります。

- どんな作品を作っているか
- 誰の役に立つものか
- 実際に動く公開ページはどこか
- GitHubや画像など、あとから確認できるものは何か
- どの作品が提出済みで、どの作品が準備中か

## はじめて見る人へ

サイトは日本語が最初に表示されます。

迷ったら、上からこの順番で見てください。

1. 「まず見る」で全体をつかむ
2. 「公開した作品」で作品カードを見る
3. 気になる作品の「公開サイト」や「GitHub」を開く
4. 「見た目だけではありません」で確認できる証拠を見る

英語でも読みたい人は、画面右上の `EN` で切り替えできます。

## 30秒レビュー手順

忙しい人は、次の順番で見てください。

1. 上の一言と作品カードで、DDが何を作れる人かを見る
2. 気になる作品の `公開サイト` を1つ開く
3. GitHub、画像、デモ、検証コマンドで、作った証拠を見る
4. `提出済み`、`準備済み`、`待機中`、`検証中` の違いを確認し、過大な主張をしていないか見る

この作品集は、派手に見せるためのページではありません。

「何を作ったか」「どこで動くか」「何が確認済みか」を短時間で見るためのページです。

## 大事にしている考え

```text
人間が決める。AIが進める。
```

AIには実務を進めさせる。ただし、証拠、ルール、人間の確認、引き継ぎを必ず残す。

## 主な作品

画面上では、特に見てほしい `主なハッカソン作品` を4本の流れとして見せています。

それ以外にも、AI運用や証拠管理の公開デモを合わせて載せています。

| 作品 | 状態 | 確認できること |
| --- | --- | --- |
| AI時代の投稿管理 | 提出済み | Devvitアプリ、Gemini方針案、日本語画面 |
| 投資調査メモ作成 | 提出済み | 公開サイト、Gemini検証、音声つきデモ、Devpost |
| 造船所パズル解き | 準備済み | 公式チェッカー確認、1,051回検証、提出zip |
| Web調査の証拠整理 | 待機中 | 出典一覧、言える範囲、音声引き継ぎデモ |
| AI共存の効果確認 | 検証中 | Gemini検証、証拠の段階、言える範囲 |
| 公開準備OS | 提出済み | 公開準備セット、証拠一覧、Novus/Pendo確認 |
| AI運用の入口 | 公開デモ | 経路、切り替え、費用、リスク、承認、引き継ぎ |
| AI作業の記録 | 公開デモ | 作業の時系列、証拠、あとから追える記録 |
| AI作業の案件管理 | 公開デモ | 案件管理、承認、引き継ぎ |
| Gemini業務ナビ | 公開デモ | 道具の利用、費用、人間の承認 |
| 人とAIの引き継ぎ補助 | 公開デモ | 引き継ぎ項目、再開しやすい記録 |
| 証拠を見ながら事故調査 | 公開デモ | 証拠つきの説明、弱い断定のブロック |

## スクリーンショット

検証スクリプトを動かすと、最新の全体画像が作られます。

```text
media/portfolio-full.png
media/portfolio-mobile.png
```

![DD AI作品集](media/portfolio-full.png)

![DD AI作品集 モバイル表示](media/portfolio-mobile.png)

## 言語切り替え

画面右上から切り替えできます。

- 日本語
- English

日本語では、専門用語をできるだけ減らして、何を見ればいいか分かる言葉にしています。

## ローカルで見る

`index.html` を直接開くか、簡単なローカルサーバーで見られます。

```bash
python3 -m http.server 4177
```

そのあと、ここを開きます。

```text
http://127.0.0.1:4177/
```

## 動作確認

```bash
npm install
npm run verify
```

期待する結果:

```text
portfolio_verify_ok
```

検証では、次を確認します。

- 作品名が表示される
- 作品カードが10個以上ある
- 画像が10枚以上読み込まれる
- 日本語表示が動く
- 英語表示へ切り替えられる
- ハッカソン絞り込みが動く
- 新しい `media/portfolio-full.png` が作られる

本番のVercelも確認できます。

```bash
npm run verify:vercel
```

期待する結果:

```text
portfolio_verify_ok url=https://ai-revenue-portfolio.vercel.app
```

## 言える範囲

この作品集では、大きく見せすぎる表現を避けています。

公開アプリ、GitHub、デモ、画像、検証コマンド、提出パッケージにつながるものだけを載せています。

提出済み、準備中、検証中などの状態も、分かる範囲でそのまま書いています。

## 主なリンク

- GitHubプロフィール: https://github.com/daideguchi
- メインサイト: https://ai-revenue-portfolio.vercel.app
- GitHub Pages版: https://daideguchi.github.io/ai-revenue-portfolio/
- 投資調査メモ作成: https://daideguchi.github.io/investor-diligence-war-room/
- 造船所パズル解き: https://daideguchi.github.io/shipyard-solver-lab/
- Web調査の証拠整理: https://daideguchi.github.io/live-web-evidence-agent/
- AI共存の効果確認: https://daideguchi.github.io/coexistence-impact-engine/
- AI時代の投稿管理: https://github.com/daideguchi/coexistence-console
