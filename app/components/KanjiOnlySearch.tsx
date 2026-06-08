"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Kanji } from "../data/kanjiData";
import type { N1Word } from "../data/n1Words";

type Props = {
  kanjiItems: Kanji[];
  wordItems: N1Word[];
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export default function KanjiOnlySearch({ kanjiItems, wordItems }: Props) {
  const [query, setQuery] = useState("");
  const value = normalize(query);

  const kanjiResults = useMemo(() => {
    if (!value) {
      return kanjiItems.slice(0, 10);
    }

    return kanjiItems
      .filter(
        (item) =>
          normalize(item.kanji).includes(value) ||
          normalize(item.meaning).includes(value) ||
          item.onyomi.some((reading) => normalize(reading).includes(value)) ||
          item.kunyomi.some((reading) => normalize(reading).includes(value)),
      )
      .slice(0, 10);
  }, [kanjiItems, value]);

  const wordResults = useMemo(() => {
    if (!value) {
      return wordItems.slice(0, 10);
    }

    return wordItems
      .filter(
        (item) =>
          normalize(item.word).includes(value) ||
          normalize(item.reading).includes(value) ||
          normalize(item.meaning).includes(value),
      )
      .slice(0, 10);
  }, [value, wordItems]);

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-rose-700">
            Kanji Search
          </p>
          <h2 className="mt-1 text-2xl font-black text-stone-950">
            Search kanji, reading, or meaning
          </h2>
        </div>
        <Link
          href="/quiz?mode=n1-meaning"
          className="rounded-lg bg-stone-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-stone-800"
        >
          Meaning Quiz
        </Link>
      </div>

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="mt-5 w-full rounded-lg border border-stone-300 px-4 py-4 text-lg text-stone-950 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
        placeholder="Search word, reading, or English meaning"
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-black text-stone-950">Kanji</h3>
            <span className="text-sm font-semibold text-stone-500">
              {kanjiResults.length} shown
            </span>
          </div>
          <div className="mt-3 grid gap-2">
            {kanjiResults.map((item) => (
              <Link
                key={item.id}
                href={`/kanji/${item.id}`}
                className="flex items-center gap-3 rounded-lg border border-stone-200 p-3 transition hover:border-rose-300 hover:bg-rose-50"
              >
                <span className="font-serif text-4xl font-black text-stone-950">
                  {item.kanji}
                </span>
                <span>
                  <span className="block font-bold text-stone-950">
                    {item.meaning}
                  </span>
                  <span className="block text-sm text-stone-500">
                    {item.level} - {item.onyomi.concat(item.kunyomi).join(", ")}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-black text-stone-950">Kanji Words</h3>
            <span className="text-sm font-semibold text-stone-500">
              {wordResults.length} shown
            </span>
          </div>
          <div className="mt-3 grid gap-2">
            {wordResults.map((item) => (
              <Link
                key={item.id}
                href={`/words/${item.id}`}
                className="rounded-lg border border-stone-200 p-3 transition hover:border-rose-300 hover:bg-rose-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block text-xl font-black text-stone-950">
                      {item.word}
                    </span>
                    <span className="block text-sm font-semibold text-rose-700">
                      {item.reading}
                    </span>
                  </span>
                  <span className="rounded-md bg-stone-100 px-2 py-1 text-xs font-bold text-stone-500">
                    p.{item.sourcePage}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-stone-600">
                  {item.meaning}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
