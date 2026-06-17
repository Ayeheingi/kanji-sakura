# Kanji Sakura

Kanji Sakura is a JLPT kanji study app built with Next.js. It helps learners
study kanji, chapter word banks, readings, English meanings, Myanmar meanings,
typed practice, search, and quizzes.

## Features

- JLPT N5, N4, N3, N2, and N1 study levels
- Chapter-based kanji word banks
- English and Myanmar meanings
- Word detail pages
- Kanji detail pages
- Search page for kanji and vocabulary
- Input practice for meaning, onyomi, and kunyomi
- Reading and meaning quiz pages

## Main Pages

- `/` - home and level selection
- `/learn` - choose a JLPT level
- `/learn?level=N5` - chapter study for a selected level
- `/words` - word bank and search
- `/practice?level=N5` - typed input practice
- `/quiz?mode=word-reading&level=N5` - quiz practice
- `/search` - kanji and vocabulary search

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build

```bash
npm run build
```
