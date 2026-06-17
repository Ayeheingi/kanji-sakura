"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { wordSetSources } from "../data/levelWordSets";
import { levelThemes } from "../data/levelThemes";
import {
  wordLevels,
  wordsByLevel,
  type WordLevel,
} from "../data/levelWords";

const pageSize = 120;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function getInitialLevel(level: string | null): WordLevel {
  return wordLevels.includes(level as WordLevel) ? (level as WordLevel) : "N5";
}

export default function WordsPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<WordLevel>(
    getInitialLevel(
      typeof window === "undefined"
        ? null
        : new URLSearchParams(window.location.search).get("level"),
    ),
  );
  const [page, setPage] = useState(0);
  const selectedWords = wordsByLevel[level];
  const theme = levelThemes[level];

  const filteredWords = useMemo(() => {
    const value = normalize(query);

    if (!value) {
      return selectedWords;
    }

    return selectedWords.filter(
      (item) =>
        normalize(item.word).includes(value) ||
        normalize(item.reading).includes(value) ||
        normalize(item.meaning).includes(value),
    );
  }, [query, selectedWords]);
  const totalPages = Math.max(1, Math.ceil(filteredWords.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const visibleWords = filteredWords.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize,
  );

  return (
    <main className={`min-h-screen ${theme.page}`}>
      <div className="mx-auto max-w-6xl px-6 py-8">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/learn?level=N1" className="font-bold text-stone-950">
            Back to Learn
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/practice?level=${level}`}
              className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${theme.outlineButton}`}
            >
              Practice
            </Link>
            <Link
              href={`/quiz?mode=word-reading&level=${level}`}
              className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${theme.outlineButton}`}
            >
              Reading Quiz
            </Link>
            <Link
              href={`/quiz?mode=word-meaning&level=${level}`}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${theme.primaryButton}`}
            >
              Meaning Quiz
            </Link>
          </div>
        </nav>

        <header className="mt-8">
          <p className={`text-sm font-bold uppercase tracking-wide ${theme.accentText}`}>
            Kanji Word Banks
          </p>
          <h1 className={`mt-2 text-4xl font-black md:text-5xl ${theme.text}`}>
            JLPT level word sets
          </h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            Choose a level, search kanji words, open detail pages, and practice
            readings or meanings. N5 through N1 are organized as your Kanji
            Sakura word banks with English and Burmese meanings.
          </p>
        </header>

        <section className="mt-6 flex flex-wrap gap-2">
          {wordLevels.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setLevel(item);
                setPage(0);
                setQuery("");
              }}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                level === item
                  ? theme.primaryButton
                  : theme.outlineButton
              }`}
            >
              {item}
            </button>
          ))}
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {wordSetSources.map((source) => (
            <article
              key={source.level}
              className={`rounded-lg border p-4 ${levelThemes[source.level].panel}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-black text-stone-950">
                  {source.level}
                </h2>
                <span
                  className={`rounded-md px-2 py-1 text-xs font-bold ${
                    source.status === "ready"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-sky-100 text-sky-800"
                  }`}
                >
                  {source.status === "ready" ? "Ready" : "Starter"}
                </span>
              </div>
              <p className="mt-2 font-bold text-stone-900">{source.title}</p>
              <p className={`mt-1 text-sm ${levelThemes[source.level].accentText}`}>
                {source.count ? `${source.count} words` : "Waiting for import"}
              </p>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {source.note}
              </p>
              <p className="mt-3 text-xs font-semibold text-stone-500">
                {source.fileName}
              </p>
            </article>
          ))}
        </section>

        <section className={`mt-6 rounded-lg border p-4 ${theme.panel}`}>
          <label htmlFor="word-search" className="text-sm font-bold text-stone-700">
            Search {level} by kanji, reading, or meaning
          </label>
          <input
            id="word-search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
            }}
            className={`mt-2 w-full rounded-lg border bg-white/90 px-4 py-3 text-stone-950 outline-none transition ${theme.focus}`}
            placeholder="Search the word bank"
          />
          <p className="mt-2 text-sm text-stone-500">
            Showing {filteredWords.length} of {selectedWords.length}.
            {" English and Burmese meanings are ready."}
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
              className={`rounded-lg border px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${theme.outlineButton}`}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages - 1}
              onClick={() =>
                setPage((value) => Math.min(totalPages - 1, value + 1))
              }
              className={`rounded-lg border px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${theme.outlineButton}`}
            >
              Next
            </button>
          </div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleWords.map((item) => (
            <Link
              key={`${item.word}-${item.reading}-${item.id}`}
              href={`/words/${item.slug}`}
              className={`rounded-lg border p-4 transition hover:shadow-md ${theme.panel} ${theme.hoverBorder}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-stone-950">
                    {item.word}
                  </h2>
                  <p className={`mt-1 text-lg font-semibold ${theme.accentText}`}>
                    {item.reading}
                  </p>
                </div>
                <span className={`rounded-md px-2 py-1 text-xs font-bold ${theme.badge}`}>
                  {item.chapter ? `${item.level} ch.${item.chapter}` : item.level}
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
