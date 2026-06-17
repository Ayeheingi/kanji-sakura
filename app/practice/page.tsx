"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PracticePanel from "../components/PracticePanel";
import {
  getKanjiByLevel,
  jlptLevels,
  levelDescriptions,
  type JLPTLevel,
} from "../data/kanjiData";
import { levelThemes } from "../data/levelThemes";

function getSelectedLevel(level?: string): JLPTLevel {
  if (level && jlptLevels.includes(level as JLPTLevel)) {
    return level as JLPTLevel;
  }

  return "N5";
}

function PracticeContent() {
  const searchParams = useSearchParams();
  const selectedLevel = getSelectedLevel(searchParams.get("level") ?? undefined);
  const theme = levelThemes[selectedLevel];
  const items = getKanjiByLevel(selectedLevel);

  return (
    <main className={`min-h-screen ${theme.page}`}>
      <div className="mx-auto max-w-6xl px-6 py-8">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="font-bold text-stone-950">
            Kanji Library
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/learn?level=${selectedLevel}`}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-800 transition hover:bg-stone-100"
            >
              Learn
            </Link>
            <Link
              href={`/words?level=${selectedLevel}`}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-800 transition hover:bg-stone-100"
            >
              Words
            </Link>
            <Link
              href="/search"
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-800 transition hover:bg-stone-100"
            >
              Search
            </Link>
            <Link
              href={`/quiz?mode=word-reading&level=${selectedLevel}`}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${theme.primaryButton}`}
            >
              Quiz
            </Link>
          </div>
        </nav>

        <header className="mt-8">
          <p className={`text-sm font-bold uppercase tracking-wide ${theme.accentText}`}>
            Practice
          </p>
          <h1 className={`mt-2 text-4xl font-black md:text-5xl ${theme.text}`}>
            {selectedLevel} Practice Set
          </h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            Type meanings, onyomi, or kunyomi from memory. This is separate
            from the Learn page so study and quiz practice stay clear.
          </p>
        </header>

        <div className="mt-6 flex flex-wrap gap-2">
          {jlptLevels.map((level) => (
            <Link
              key={level}
              href={`/practice?level=${level}`}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                selectedLevel === level
                  ? levelThemes[level].primaryButton
                  : "border border-stone-300 bg-white text-stone-800 hover:bg-stone-100"
              }`}
            >
              {level}
            </Link>
          ))}
        </div>

        <section className="mt-8">
          <PracticePanel items={items} />
        </section>

        <section className={`mt-8 rounded-lg border p-5 ${theme.panel}`}>
          <h2 className={`text-xl font-black ${theme.text}`}>
            {selectedLevel} Study Links
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {levelDescriptions[selectedLevel]}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/learn?level=${selectedLevel}`}
              className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${theme.outlineButton}`}
            >
              Chapter Study
            </Link>
            <Link
              href={`/words?level=${selectedLevel}`}
              className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${theme.outlineButton}`}
            >
              Word Bank
            </Link>
            <Link
              href={`/quiz?mode=word-meaning&level=${selectedLevel}`}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${theme.primaryButton}`}
            >
              Meaning Quiz
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function PracticePage() {
  return (
    <Suspense>
      <PracticeContent />
    </Suspense>
  );
}
