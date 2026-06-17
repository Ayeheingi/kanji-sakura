"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { levelThemes } from "../data/levelThemes";
import type { LevelWord, WordLevel } from "../data/levelWords";

type Props = {
  level: WordLevel;
  words: LevelWord[];
};

type StudyMode = "flashcard" | "type" | "quiz";
type TypeField = "reading" | "meaning";

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function meaningMatches(answer: string, word: LevelWord) {
  const value = normalize(answer);

  if (!value) {
    return false;
  }

  return word.meanings.some((meaning) => {
    const normalizedMeaning = normalize(meaning);
    return normalizedMeaning === value || normalizedMeaning.includes(value);
  });
}

function makeOptions(words: LevelWord[], index: number) {
  const current = words[index % words.length];
  const options = [current];
  let step = 7;

  while (options.length < 4 && options.length < words.length) {
    const candidate = words[(index + step) % words.length];

    if (!options.some((item) => item.slug === candidate.slug)) {
      options.push(candidate);
    }

    step += 11;
  }

  return options.sort((a, b) => a.slug.localeCompare(b.slug));
}

export default function WordStudyPanel({ level, words }: Props) {
  const theme = levelThemes[level];
  const [mode, setMode] = useState<StudyMode>("flashcard");
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [typeField, setTypeField] = useState<TypeField>("reading");
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const current = words[index % words.length];
  const options = useMemo(() => makeOptions(words, index), [index, words]);
  const typedCorrect =
    typeField === "reading"
      ? normalize(answer) === normalize(current.reading)
      : meaningMatches(answer, current);
  const selectedCorrect = selected === current.slug;

  function resetForMode(nextMode: StudyMode) {
    setMode(nextMode);
    setShowBack(false);
    setAnswer("");
    setChecked(false);
    setSelected(null);
  }

  function next() {
    setIndex((value) => (value + 1) % words.length);
    setShowBack(false);
    setAnswer("");
    setChecked(false);
    setSelected(null);
  }

  function checkTypedAnswer() {
    if (checked) {
      return;
    }

    setChecked(true);
    setScore((value) => ({
      correct: value.correct + (typedCorrect ? 1 : 0),
      total: value.total + 1,
    }));
  }

  function chooseOption(slug: string) {
    if (selected) {
      return;
    }

    setSelected(slug);
    setScore((value) => ({
      correct: value.correct + (slug === current.slug ? 1 : 0),
      total: value.total + 1,
    }));
  }

  if (!current) {
    return null;
  }

  return (
    <section className={`rounded-lg border p-5 ${theme.panel}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className={`text-sm font-black uppercase tracking-wide ${theme.accentText}`}>
            Word Study
          </p>
          <h2 className={`mt-1 text-2xl font-black ${theme.text}`}>
            {level} practice set
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Flashcards, typed practice, and quiz-style review from the word bank.
          </p>
        </div>
        <div className="rounded-lg bg-white/80 px-4 py-2 text-sm font-bold text-stone-800 shadow-sm">
          Score {score.correct}/{score.total}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {([
          ["flashcard", "Flashcards"],
          ["type", "Type Practice"],
          ["quiz", "Quick Quiz"],
        ] as [StudyMode, string][]).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => resetForMode(value)}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              mode === value ? theme.primaryButton : theme.outlineButton
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[260px_1fr]">
        <button
          type="button"
          onClick={() => setShowBack((value) => !value)}
          className={`min-h-64 rounded-lg border p-5 text-center transition ${theme.soft} ${theme.hoverBorder}`}
        >
          <div className="text-xs font-bold uppercase tracking-wide text-stone-500">
            Card {index + 1} of {words.length}
          </div>
          <div className="mt-5 text-5xl font-black leading-tight text-stone-950">
            {current.word}
          </div>
          {showBack || mode !== "flashcard" ? (
            <div className="mt-5">
              <div className={`text-xl font-black ${theme.accentText}`}>
                {current.reading}
              </div>
              <p className="mt-3 text-sm leading-7 text-stone-700">
                {current.meaning}
              </p>
              {current.sourceKanji ? (
                <div className="mt-3 text-sm font-bold text-stone-500">
                  {current.sourceKanji} · {current.sourceKanjiMeaning}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mt-6 text-sm font-bold text-stone-500">
              Click to flip
            </div>
          )}
        </button>

        <div className="flex flex-col justify-center">
          {mode === "flashcard" ? (
            <div>
              <h3 className={`text-xl font-black ${theme.text}`}>
                Review the card
              </h3>
              <p className="mt-2 text-stone-600">
                Say the reading and meaning first, then flip the card to check.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowBack((value) => !value)}
                  className={`rounded-lg px-5 py-3 font-bold transition ${theme.primaryButton}`}
                >
                  {showBack ? "Hide Answer" : "Show Answer"}
                </button>
                <button
                  type="button"
                  onClick={next}
                  className={`rounded-lg border px-5 py-3 font-bold transition ${theme.outlineButton}`}
                >
                  Next Card
                </button>
                <Link
                  href={`/words/${current.slug}`}
                  className={`rounded-lg border px-5 py-3 font-bold transition ${theme.outlineButton}`}
                >
                  Detail
                </Link>
              </div>
            </div>
          ) : null}

          {mode === "type" ? (
            <div>
              <div className="flex flex-wrap gap-2">
                {([
                  ["reading", "Reading"],
                  ["meaning", "Meaning"],
                ] as [TypeField, string][]).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setTypeField(value);
                      setAnswer("");
                      setChecked(false);
                    }}
                    className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                      typeField === value ? theme.primaryButton : theme.outlineButton
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <label
                htmlFor="word-practice-answer"
                className="mt-5 block text-sm font-bold text-stone-700"
              >
                Type the {typeField}
              </label>
              <input
                id="word-practice-answer"
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                  setChecked(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    checkTypedAnswer();
                  }
                }}
                className={`mt-2 w-full rounded-lg border border-stone-300 bg-white/90 px-4 py-3 text-lg text-stone-950 outline-none transition ${theme.focus}`}
                placeholder={
                  typeField === "reading"
                    ? "Type hiragana reading"
                    : "Type English or Burmese meaning"
                }
              />
              {checked ? (
                <div
                  className={`mt-4 rounded-lg px-4 py-3 text-sm font-bold ${
                    typedCorrect
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-800"
                  }`}
                >
                  {typedCorrect
                    ? "Correct."
                    : `Answer: ${
                        typeField === "reading" ? current.reading : current.meaning
                      }`}
                </div>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={checkTypedAnswer}
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
              </div>
            </div>
          ) : null}

          {mode === "quiz" ? (
            <div>
              <h3 className={`text-xl font-black ${theme.text}`}>
                Choose the meaning
              </h3>
              <p className="mt-2 text-stone-600">
                Pick the correct English or Burmese meaning for this word.
              </p>
              <div className="mt-4 grid gap-2">
                {options.map((option) => {
                  const isSelected = selected === option.slug;
                  const isAnswer = current.slug === option.slug;

                  return (
                    <button
                      key={option.slug}
                      type="button"
                      onClick={() => chooseOption(option.slug)}
                      className={`rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${
                        selected
                          ? isAnswer
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : isSelected
                              ? "border-amber-300 bg-amber-50 text-amber-800"
                              : "border-stone-200 bg-white/70 text-stone-500"
                          : theme.outlineButton
                      }`}
                    >
                      {option.meaning}
                    </button>
                  );
                })}
              </div>
              {selected ? (
                <div
                  className={`mt-4 rounded-lg px-4 py-3 text-sm font-bold ${
                    selectedCorrect
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-800"
                  }`}
                >
                  {selectedCorrect ? "Correct." : `Answer: ${current.meaning}`}
                </div>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={next}
                  className={`rounded-lg px-5 py-3 font-bold transition ${theme.primaryButton}`}
                >
                  Next Question
                </button>
                <Link
                  href={`/quiz?mode=word-reading&level=${level}`}
                  className={`rounded-lg border px-5 py-3 font-bold transition ${theme.outlineButton}`}
                >
                  Full Quiz
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
