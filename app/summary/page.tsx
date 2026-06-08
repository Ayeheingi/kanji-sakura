import Link from "next/link";
import {
  getKanjiByLevel,
  jlptLevels,
  levelDescriptions,
} from "../data/kanjiData";
import { n1WordCount } from "../data/n1Words";

export default function SummaryPage() {
  const total = getKanjiByLevel("ALL").length;

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="font-bold text-stone-950">
            Kanji Library
          </Link>
          <Link
            href="/quiz"
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
          >
            Start Quiz
          </Link>
        </nav>

        <header className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-rose-700">
            Summary
          </p>
          <h1 className="mt-2 text-4xl font-black text-stone-950">
            {total} kanji and {n1WordCount} N1 words ready
          </h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            The deck is grouped from N5 to N1 and now includes the complete N1
            word-reading bank from your PDF.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/words"
              className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-bold text-stone-800 transition hover:bg-stone-100"
            >
              Browse N1 Words
            </Link>
            <Link
              href="/quiz?mode=n1-reading"
              className="rounded-lg bg-stone-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-stone-800"
            >
              Quiz N1 Readings
            </Link>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-5">
          {jlptLevels.map((level) => (
            <Link
              key={level}
              href={`/learn?level=${level}`}
              className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition hover:border-rose-300 hover:shadow-md"
            >
              <div className="text-2xl font-black text-stone-950">{level}</div>
              <div className="mt-1 text-sm font-semibold text-rose-700">
                {getKanjiByLevel(level).length} kanji
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {levelDescriptions[level]}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
