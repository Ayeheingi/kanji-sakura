"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import {
  getKanjiByLevel,
  jlptLevels,
  type JLPTLevel,
  type Kanji,
} from "../data/kanjiData";
import { n1Words, type N1Word } from "../data/n1Words";

type Mode =
  | "meaning"
  | "onyomi"
  | "kunyomi"
  | "word"
  | "n1-reading"
  | "n1-meaning";

const modes: { value: Mode; label: string }[] = [
  { value: "meaning", label: "Meaning" },
  { value: "onyomi", label: "Onyomi" },
  { value: "kunyomi", label: "Kunyomi" },
  { value: "word", label: "Vocabulary" },
  { value: "n1-reading", label: "N1 Readings" },
  { value: "n1-meaning", label: "N1 Meanings" },
];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function meaningMatches(answer: string, word: N1Word) {
  const value = normalize(answer);

  if (!value || word.meanings.length === 0) {
    return false;
  }

  return word.meanings.some((meaning) => {
    const normalizedMeaning = normalize(meaning);
    return normalizedMeaning === value || normalizedMeaning.includes(value);
  });
}

function isKanjiCorrect(answer: string, kanji: Kanji, mode: Mode) {
  const value = normalize(answer);

  if (!value) {
    return false;
  }

  if (mode === "meaning") {
    return kanji.meaning
      .split(",")
      .map(normalize)
      .some((item) => item === value);
  }

  if (mode === "word") {
    return kanji.examples.some(
      (example) =>
        normalize(example.word) === value ||
        normalize(example.reading) === value ||
        normalize(example.meaning) === value,
    );
  }

  if (mode === "onyomi" || mode === "kunyomi") {
    return kanji[mode].map(normalize).some((item) => item === value);
  }

  return false;
}

function expectedKanjiAnswer(kanji: Kanji, mode: Mode) {
  if (mode === "meaning") {
    return kanji.meaning;
  }

  if (mode === "word") {
    return kanji.examples
      .map((example) => `${example.word} (${example.reading}) - ${example.meaning}`)
      .join("; ");
  }

  if (mode === "onyomi" || mode === "kunyomi") {
    return kanji[mode].length ? kanji[mode].join(", ") : "none";
  }

  return "";
}

function questionText(mode: Mode) {
  if (mode === "meaning") {
    return "Type the English meaning.";
  }

  if (mode === "word") {
    return "Type one example word, reading, or meaning.";
  }

  if (mode === "n1-reading") {
    return "Type the hiragana reading.";
  }

  if (mode === "n1-meaning") {
    return "Type one English meaning.";
  }

  return `Type one ${mode} reading.`;
}

function getInitialMode(mode: string | null): Mode {
  return modes.some((item) => item.value === mode) ? (mode as Mode) : "meaning";
}

function WordQuizCard({ word }: { word: N1Word }) {
  return (
    <div className="flex h-56 items-center justify-center rounded-lg bg-rose-50 p-4 text-center text-5xl font-black leading-tight text-rose-700">
      {word.word}
    </div>
  );
}

function KanjiQuizCard({ kanji }: { kanji: Kanji }) {
  return (
    <div className="flex h-56 items-center justify-center rounded-lg bg-rose-50 font-serif text-9xl text-rose-700">
      {kanji.kanji}
    </div>
  );
}

function QuizContent() {
  const searchParams = useSearchParams();
  const initialLevel = searchParams.get("level");
  const [level, setLevel] = useState<JLPTLevel | "ALL">(
    initialLevel && jlptLevels.includes(initialLevel as JLPTLevel)
      ? (initialLevel as JLPTLevel)
      : "ALL",
  );
  const [mode, setMode] = useState<Mode>(getInitialMode(searchParams.get("mode")));
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const kanjiItems = useMemo(() => getKanjiByLevel(level), [level]);
  const isN1WordMode = mode === "n1-reading" || mode === "n1-meaning";
  const currentKanji = kanjiItems[index % kanjiItems.length];
  const currentWord = n1Words[index % n1Words.length];
  const totalCards = isN1WordMode ? n1Words.length : kanjiItems.length;
  const correct =
    mode === "n1-reading"
      ? normalize(answer) === normalize(currentWord.reading)
      : mode === "n1-meaning"
        ? meaningMatches(answer, currentWord)
        : isKanjiCorrect(answer, currentKanji, mode);

  function reset(nextLevel = level, nextMode = mode) {
    setLevel(nextLevel);
    setMode(nextMode);
    setIndex(0);
    setAnswer("");
    setChecked(false);
    setScore({ correct: 0, total: 0 });
  }

  function check() {
    if (checked) {
      return;
    }

    setChecked(true);
    setScore((value) => ({
      correct: value.correct + (correct ? 1 : 0),
      total: value.total + 1,
    }));
  }

  function next() {
    setIndex((value) => (value + 1) % totalCards);
    setAnswer("");
    setChecked(false);
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/learn" className="font-bold text-stone-950">
            Back to Learn
          </Link>
          <div className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-stone-800 shadow-sm">
            Score {score.correct}/{score.total}
          </div>
        </nav>

        <header className="mt-8">
          <p className="text-sm font-bold uppercase tracking-wide text-rose-700">
            Quiz
          </p>
          <h1 className="mt-2 text-4xl font-black text-stone-950 md:text-5xl">
            Test Your Kanji
          </h1>
        </header>

        <section className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr]">
          <div className="flex flex-wrap gap-2">
            {(["ALL", ...jlptLevels] as (JLPTLevel | "ALL")[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => reset(item, mode)}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                  level === item && !isN1WordMode
                    ? "bg-rose-600 text-white"
                    : "border border-stone-300 bg-white text-stone-800 hover:bg-stone-100"
                }`}
              >
                {item === "ALL" ? "All" : item}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 md:justify-end">
            {modes.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => reset(level, item.value)}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                  mode === item.value
                    ? "bg-stone-950 text-white"
                    : "border border-stone-300 bg-white text-stone-800 hover:bg-stone-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            {isN1WordMode ? (
              <WordQuizCard word={currentWord} />
            ) : (
              <KanjiQuizCard kanji={currentKanji} />
            )}

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-stone-100 px-2.5 py-1 text-sm font-bold text-stone-700">
                  {isN1WordMode ? "N1 Words" : currentKanji.level}
                </span>
                <span className="text-sm text-stone-500">
                  Card {index + 1} of {totalCards}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-black text-stone-950">
                {questionText(mode)}
              </h2>
              <p className="mt-2 text-stone-600">
                {isN1WordMode
                  ? `Reading: ${currentWord.reading}`
                  : currentKanji.hint}
              </p>

              <input
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                  setChecked(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    check();
                  }
                }}
                className="mt-5 w-full rounded-lg border border-stone-300 px-4 py-3 text-lg text-stone-950 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                placeholder={
                  mode === "n1-reading"
                    ? "Type the hiragana reading"
                    : "Type your answer"
                }
              />

              {checked ? (
                <div
                  className={`mt-4 rounded-lg px-4 py-3 text-sm font-semibold ${
                    correct
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-800"
                  }`}
                >
                  {correct
                    ? "Correct."
                    : `Answer: ${
                        mode === "n1-reading"
                          ? currentWord.reading
                          : mode === "n1-meaning"
                            ? currentWord.meaning
                            : expectedKanjiAnswer(currentKanji, mode)
                      }`}
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={check}
                  className="rounded-lg bg-rose-600 px-5 py-3 font-bold text-white transition hover:bg-rose-700"
                >
                  Check
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-lg border border-stone-300 px-5 py-3 font-bold text-stone-800 transition hover:bg-stone-100"
                >
                  Next
                </button>
                {isN1WordMode ? (
                  <Link
                    href={`/words/${currentWord.id}`}
                    className="rounded-lg border border-stone-300 px-5 py-3 font-bold text-stone-800 transition hover:bg-stone-100"
                  >
                    Detail
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-stone-50">
          <div className="mx-auto max-w-5xl px-6 py-8">
            <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
              Loading quiz...
            </div>
          </div>
        </main>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
