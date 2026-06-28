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
