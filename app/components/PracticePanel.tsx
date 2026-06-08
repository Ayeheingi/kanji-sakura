"use client";

import { useMemo, useState } from "react";
import type { Kanji } from "../data/kanjiData";

type Props = {
  items: Kanji[];
};

type Field = "meaning" | "onyomi" | "kunyomi";

const fieldLabels: Record<Field, string> = {
  meaning: "Meaning",
  onyomi: "Onyomi",
  kunyomi: "Kunyomi",
};

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function matchesAnswer(input: string, kanji: Kanji, field: Field) {
  const value = normalize(input);

  if (!value) {
    return false;
  }

  if (field === "meaning") {
    return kanji.meaning
      .split(",")
      .map(normalize)
      .some((answer) => answer === value);
  }

  return kanji[field].map(normalize).some((answer) => answer === value);
}

export default function PracticePanel({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [field, setField] = useState<Field>("meaning");
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);

  const current = items[index] ?? items[0];
  const correct = current ? matchesAnswer(answer, current, field) : false;
  const expected = useMemo(() => {
    if (!current) {
      return "";
    }

    if (field === "meaning") {
      return current.meaning;
    }

    return current[field].length ? current[field].join(", ") : "none";
  }, [current, field]);

  if (!current) {
    return null;
  }

  function nextCard() {
    setIndex((value) => (value + 1) % items.length);
    setAnswer("");
    setChecked(false);
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-stone-950">Input Practice</h2>
          <p className="mt-1 text-sm text-stone-600">
            Type the answer and check yourself.
          </p>
        </div>

        <div className="flex rounded-lg border border-stone-200 bg-stone-50 p-1">
          {(["meaning", "onyomi", "kunyomi"] as Field[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setField(item);
                setAnswer("");
                setChecked(false);
              }}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                field === item
                  ? "bg-stone-950 text-white"
                  : "text-stone-700 hover:bg-white"
              }`}
            >
              {fieldLabels[item]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-[180px_1fr]">
        <div className="flex h-44 items-center justify-center rounded-lg bg-stone-100 font-serif text-8xl text-stone-950">
          {current.kanji}
        </div>

        <div className="flex flex-col justify-center">
          <label
            htmlFor="answer"
            className="text-sm font-semibold text-stone-700"
          >
            {fieldLabels[field]} for {current.kanji}
          </label>
          <input
            id="answer"
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
              setChecked(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setChecked(true);
              }
            }}
            className="mt-2 w-full rounded-lg border border-stone-300 px-4 py-3 text-lg text-stone-950 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
            placeholder={
              field === "meaning" ? "example: one" : "example: イチ or ひと.つ"
            }
          />

          {checked ? (
            <div
              className={`mt-3 rounded-lg px-4 py-3 text-sm font-semibold ${
                correct
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-800"
              }`}
            >
              {correct ? "Correct." : `Answer: ${expected}`}
            </div>
          ) : (
            <p className="mt-3 text-sm text-stone-500">{current.hint}</p>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setChecked(true)}
              className="rounded-lg bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700"
            >
              Check
            </button>
            <button
              type="button"
              onClick={nextCard}
              className="rounded-lg border border-stone-300 px-5 py-3 font-semibold text-stone-800 transition hover:bg-stone-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
