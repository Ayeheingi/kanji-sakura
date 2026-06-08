"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { n1MeaningCoverage, n1Words } from "../data/n1Words";

const pageSize = 120;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export default function WordsPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const filteredWords = useMemo(() => {
    const value = normalize(query);

    if (!value) {
      return n1Words;
    }

    return n1Words.filter(
      (item) =>
        normalize(item.word).includes(value) ||
        normalize(item.reading).includes(value) ||
        normalize(item.meaning).includes(value),
    );
  }, [query]);
  const totalPages = Math.max(1, Math.ceil(filteredWords.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const visibleWords = filteredWords.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize,
  );

  return (
    <main className="fresh-page min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/learn?level=N1" className="font-bold text-stone-950">
            Back to N1
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/quiz?mode=n1-reading"
              className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-bold text-stone-800 transition hover:bg-stone-100"
            >
              Reading Quiz
            </Link>
            <Link
              href="/quiz?mode=n1-meaning"
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
            >
              Meaning Quiz
            </Link>
          </div>
        </nav>

        <header className="mt-8">
          <p className="text-sm font-bold uppercase tracking-wide text-teal-700">
            N1 Word Bank
          </p>
          <h1 className="mt-2 text-4xl font-black text-stone-950 md:text-5xl">
            {n1Words.length} kanji words
          </h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            {n1MeaningCoverage.matched} words include English meanings from
            JMdict; the rest are kept in the deck with readings.
          </p>
        </header>

        <section className="fresh-panel mt-6 rounded-lg border p-4">
          <label htmlFor="word-search" className="text-sm font-bold text-stone-700">
            Search by kanji, reading, or meaning
          </label>
          <input
            id="word-search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
            }}
            className="mt-2 w-full rounded-lg border border-teal-200 bg-white/90 px-4 py-3 text-stone-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            placeholder="Search the word bank"
          />
          <p className="mt-2 text-sm text-stone-500">
            Showing {filteredWords.length} of {n1Words.length}
          </p>
        </section>

        <section className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-stone-600">
            Page {currentPage + 1} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={() => setPage((value) => Math.max(0, value - 1))}
              className="rounded-lg border border-teal-200 bg-white/80 px-4 py-2 text-sm font-bold text-teal-900 transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages - 1}
              onClick={() =>
                setPage((value) => Math.min(totalPages - 1, value + 1))
              }
              className="rounded-lg border border-teal-200 bg-white/80 px-4 py-2 text-sm font-bold text-teal-900 transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleWords.map((item) => (
            <Link
              key={`${item.word}-${item.reading}-${item.id}`}
              href={`/words/${item.id}`}
              className="fresh-panel rounded-lg border p-4 transition hover:border-teal-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-stone-950">
                    {item.word}
                  </h2>
                  <p className="mt-1 text-lg font-semibold text-teal-700">
                    {item.reading}
                  </p>
                </div>
                <span className="rounded-md bg-teal-50 px-2 py-1 text-xs font-bold text-teal-700">
                  p.{item.sourcePage}
                </span>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">
                {item.meaning}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
