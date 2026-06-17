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
import { levelThemes } from "../data/levelThemes";
import {
  wordLevels,
  wordsByLevel,
  type LevelWord,
  type WordLevel,
} from "../data/levelWords";

type Mode =
  | "meaning"
  | "onyomi"
  | "kunyomi"
  | "word"
  | "word-reading"
  | "word-meaning"
  | "n1-reading"
  | "n1-meaning";

const modes: { value: Mode; label: string }[] = [
  { value: "meaning", label: "Meaning" },
  { value: "onyomi", label: "Onyomi" },
  { value: "kunyomi", label: "Kunyomi" },
  { value: "word", label: "Vocabulary" },
  { value: "word-reading", label: "Word Readings" },
  { value: "word-meaning", label: "Word Meanings" },
];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function meaningMatches(answer: string, word: LevelWord) {
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
    return "Type the meaning.";
  }

  if (mode === "word") {
    return "Type one example word, reading, or meaning.";
  }

  if (mode === "word-reading" || mode === "n1-reading") {
    return "Type the hiragana reading.";
  }

  if (mode === "word-meaning" || mode === "n1-meaning") {
    return "Type one meaning.";
  }

  return `Type one ${mode} reading.`;
}

function getInitialMode(mode: string | null): Mode {
  if (mode === "n1-reading") {
    return "word-reading";
  }

  if (mode === "n1-meaning") {
    return "word-meaning";
  }

  return modes.some((item) => item.value === mode) ? (mode as Mode) : "meaning";
}

function WordQuizCard({
  word,
  cardClassName,
}: {
  word: LevelWord;
  cardClassName: string;
}) {
  return (
    <div className={`flex h-56 items-center justify-center rounded-lg p-4 text-center text-5xl font-black leading-tight ${cardClassName}`}>
      {word.word}
    </div>
  );
}

function KanjiQuizCard({
  kanji,
  cardClassName,
}: {
  kanji: Kanji;
  cardClassName: string;
}) {
  return (
    <div className={`flex h-56 items-center justify-center rounded-lg font-serif text-9xl ${cardClassName}`}>
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
  const wordLevel: WordLevel =
    level !== "ALL" && wordLevels.includes(level as WordLevel)
      ? (level as WordLevel)
      : "N5";
  const wordItems = wordsByLevel[wordLevel];
  const activeLevel =
    level !== "ALL" && jlptLevels.includes(level as JLPTLevel)
      ? (level as JLPTLevel)
      : wordLevel;
  const theme = levelThemes[activeLevel];
  const isWordMode =
    mode === "word-reading" ||
    mode === "word-meaning" ||
    mode === "n1-reading" ||
    mode === "n1-meaning";
  const currentKanji = kanjiItems[index % kanjiItems.length];
  const currentWord = wordItems[index % wordItems.length];
  const totalCards = isWordMode ? wordItems.length : kanjiItems.length;
  const correct =
    mode === "word-reading" || mode === "n1-reading"
      ? normalize(answer) === normalize(currentWord.reading)
      : mode === "word-meaning" || mode === "n1-meaning"
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
    <main className={`min-h-screen ${theme.page}`}>
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
          <p className={`text-sm font-bold uppercase tracking-wide ${theme.accentText}`}>
            Quiz
          </p>
          <h1 className={`mt-2 text-4xl font-black md:text-5xl ${theme.text}`}>
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
                  level === item
                    ? levelThemes[item === "ALL" ? activeLevel : (item as JLPTLevel)].primaryButton
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

        <section className={`mt-8 rounded-lg border p-6 ${theme.panel}`}>
          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            {isWordMode ? (
              <WordQuizCard word={currentWord} cardClassName={theme.soft} />
            ) : (
              <KanjiQuizCard kanji={currentKanji} cardClassName={theme.soft} />
            )}

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-md px-2.5 py-1 text-sm font-bold ${theme.badge}`}>
                  {isWordMode ? `${wordLevel} Words` : currentKanji.level}
                </span>
                <span className="text-sm text-stone-500">
                  Card {index + 1} of {totalCards}
                </span>
              </div>

              <h2 className={`mt-4 text-2xl font-black ${theme.text}`}>
                {questionText(mode)}
              </h2>
              <p className="mt-2 text-stone-600">
                {isWordMode
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
                className={`mt-5 w-full rounded-lg border border-stone-300 px-4 py-3 text-lg text-stone-950 outline-none transition ${theme.focus}`}
                placeholder={
                  mode === "word-reading" || mode === "n1-reading"
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
                        mode === "word-reading" || mode === "n1-reading"
                          ? currentWord.reading
                          : mode === "word-meaning" || mode === "n1-meaning"
                            ? currentWord.meaning
                            : expectedKanjiAnswer(currentKanji, mode)
                      }`}
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={check}
                  className={`rounded-lg px-5 py-3 font-bold transition ${theme.primaryButton}`}
                >
                  Check
                </button>
                <button
                  type="button"
                  onClick={next}
                  className={`rounded-lg border px-5 py-3 font-bold transition ${theme.outlineButton}`}
                >
                  Next
                </button>
                {isWordMode ? (
                  <Link
                    href={`/words/${currentWord.slug}`}
                    className={`rounded-lg border px-5 py-3 font-bold transition ${theme.outlineButton}`}
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
        <main className={`min-h-screen ${levelThemes.N5.page}`}>
          <div className="mx-auto max-w-5xl px-6 py-8">
            <div className={`rounded-lg border p-6 ${levelThemes.N5.panel}`}>
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
