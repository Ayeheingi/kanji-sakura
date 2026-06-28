# 🌸 Kanji Sakura

日本語学習者向けのJLPT漢字学習Webアプリケーションです。

Kanji Sakura is a JLPT kanji study app built with Next.js. It helps learners study kanji, chapter word banks, readings, English meanings, Myanmar meanings, typed practice, search, and quizzes.

---

## 概要 / Overview

Kanji Sakura は、JLPT N5〜N1レベルの漢字と語彙を学習するためのWebアプリケーションです。
英語とミャンマー語の意味表示、クイズ、検索、タイピング練習などを通して、効率よく学習できます。

---

## 主な機能 / Features

- JLPT N5, N4, N3, N2, N1 対応
- Chapter-based kanji word banks
- English and Myanmar meanings
- Word detail pages
- Kanji detail pages
- Search page for kanji and vocabulary
- Input practice for meaning, onyomi, and kunyomi
- Reading and meaning quiz pages

---

## 主なページ / Main Pages

- `/` - Home and level selection
- `/learn` - Choose a JLPT level
- `/learn?level=N5` - Chapter study
- `/words` - Word bank and search
- `/practice?level=N5` - Typing practice
- `/quiz?mode=word-reading&level=N5` - Quiz practice
- `/search` - Kanji and vocabulary search

---

## 使用技術 / Technologies

- Next.js
- React
- TypeScript
- CSS Modules
- Git / GitHub

---

## セットアップ方法 / Run Locally

```bash
npm install
npm run dev

使用技術 / Technologies

- Next.js
- React
- TypeScript
- CSS Modules
- Git
- GitHub

工夫した点 / Key Points

- JLPTレベルごとに漢字と単語を整理し、学習しやすい構成にしました。
- 英語とミャンマー語の両方に対応し、より多くの学習者が利用できるようにしました。
- シンプルで分かりやすいUIを意識して設計しました。
- 再利用可能なコンポーネントを作成し、保守性を向上させました。

苦労した点 / Challenges

- 大量の漢字・語彙データを整理することに苦労しました。
- クイズ機能や入力練習機能のロジック実装に時間がかかりました。
- TypeScriptの型定義を適切に設計することが難しかったです。
- 検索機能の実装と最適化に工夫が必要でした。

作者 / Author

Aye Theingi (エー ティイソギ)

沖縄ビジネス外語学院
Webプログラミングコース
