"use client";

import { useMemo, useState } from "react";
import { levelThemes } from "../data/levelThemes";
import type { WordLevel } from "../data/levelWords";

export type KanjiFlashcardItem = {
  kanji: string;
  onyomi: string;
  kunyomi: string;
  meaning: string;
  meaningMM: string;
  chapter?: number;
  examples: {
    word: string;
    reading: string;
    meaning: string;
  }[];
};

type Props = {
  items: KanjiFlashcardItem[];
  level: WordLevel;
};

export default function KanjiFlashcardPanel({ items, level }: Props) {
  const theme = levelThemes[level];
  const chapters = useMemo(
    () =>
      Array.from(
        new Set(items.map((item) => item.chapter).filter(Boolean)),
      ) as number[],
    [items],
  );
  const [chapter, setChapter] = useState<number | "ALL">("ALL");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const visibleItems = useMemo(
    () =>
      chapter === "ALL"
        ? items
        : items.filter((item) => item.chapter === chapter),
    [chapter, items],
  );
  const current = visibleItems[index % visibleItems.length];

  if (!current) {
    return null;
  }

  function chooseChapter(nextChapter: number | "ALL") {
    setChapter(nextChapter);
    setIndex(0);
    setFlipped(false);
  }

  function previous() {
    setIndex((value) =>
      value === 0 ? visibleItems.length - 1 : value - 1,
    );
    setFlipped(false);
  }

  function next() {
    setIndex((value) => (value + 1) % visibleItems.length);
    setFlipped(false);
  }

  return (
    <section className={`rounded-lg border p-5 ${theme.panel}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className={`text-sm font-black uppercase tracking-wide ${theme.accentText}`}>
            Kanji Flashcards
          </p>
          <h2 className={`mt-1 text-2xl font-black ${theme.text}`}>
            {level} flashcard mode
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Flip the card to review readings, meanings, and example words.
          </p>
        </div>
        <div className={`rounded-lg px-4 py-2 text-sm font-bold ${theme.badge}`}>
          {index + 1} / {visibleItems.length}
        </div>
      </div>

      {chapters.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => chooseChapter("ALL")}
            className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
              chapter === "ALL" ? theme.primaryButton : theme.outlineButton
            }`}
          >
            All
          </button>
          {chapters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => chooseChapter(item)}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                chapter === item ? theme.primaryButton : theme.outlineButton
              }`}
            >
              Chapter {item}
            </button>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setFlipped((value) => !value)}
        className={`mt-6 flex min-h-96 w-full flex-col items-center justify-center rounded-xl border p-6 text-center transition ${theme.soft} ${theme.hoverBorder}`}
      >
        {!flipped ? (
          <>
            <div className="text-xs font-black uppercase tracking-wide text-stone-500">
              {current.chapter ? `Chapter ${current.chapter}` : level}
            </div>
            <div className="mt-5 font-serif text-9xl font-black leading-none text-stone-950">
              {current.kanji}
            </div>
            <div className="mt-6 text-sm font-bold text-stone-500">
              Click to flip
            </div>
          </>
        ) : (
          <div className="w-full max-w-2xl text-left">
            <div className="text-center font-serif text-7xl font-black text-stone-950">
              {current.kanji}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-white/75 p-3">
                <div className="text-xs font-black uppercase tracking-wide text-stone-500">
                  音
                </div>
                <div className="mt-1 font-bold text-stone-950">
                  {current.onyomi || "none"}
                </div>
              </div>
              <div className="rounded-lg bg-white/75 p-3">
                <div className="text-xs font-black uppercase tracking-wide text-stone-500">
                  訓
                </div>
                <div className="mt-1 font-bold text-stone-950">
                  {current.kunyomi || "none"}
                </div>
              </div>
              <div className="rounded-lg bg-white/75 p-3">
                <div className="text-xs font-black uppercase tracking-wide text-stone-500">
                  English
                </div>
                <div className="mt-1 font-bold text-stone-950">
                  {current.meaning}
                </div>
              </div>
              <div className="rounded-lg bg-white/75 p-3">
                <div className="text-xs font-black uppercase tracking-wide text-stone-500">
                  Myanmar
                </div>
                <div className="mt-1 font-bold text-stone-950">
                  {current.meaningMM}
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {current.examples.map((example) => (
                <div key={`${example.word}-${example.reading}`} className="rounded-lg bg-white/75 p-3">
                  <div className="font-black text-stone-950">
                    {example.word}
                  </div>
                  <div className={`text-sm font-bold ${theme.accentText}`}>
                    {example.reading}
                  </div>
                  <div className="mt-1 text-sm text-stone-600">
                    {example.meaning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </button>

      <div className="mt-5 flex flex-wrap justify-between gap-3">
        <button
          type="button"
          onClick={previous}
          className={`rounded-lg border px-5 py-3 font-bold transition ${theme.outlineButton}`}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          className={`rounded-lg px-5 py-3 font-bold transition ${theme.primaryButton}`}
        >
          {flipped ? "Show Kanji" : "Show Answer"}
        </button>
        <button
          type="button"
          onClick={next}
          className={`rounded-lg border px-5 py-3 font-bold transition ${theme.outlineButton}`}
        >
          Next
        </button>
      </div>
    </section>
  );
}
