import Link from "next/link";
import KanjiOnlySearch from "./components/KanjiOnlySearch";
import {
  kanjiData,
  getLevelCounts,
  jlptLevels,
  levelDescriptions,
} from "./data/kanjiData";
import { n1WordCount, n1Words } from "./data/n1Words";

export default function Home() {
  const counts = getLevelCounts();

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid min-h-[72vh] max-w-6xl content-center gap-10 px-6 py-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-rose-700">
              Kanji study library
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-tight text-stone-950 md:text-7xl">
              Kanji Library
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
              Build your own kanji collection: search kanji, add word sets,
              review meanings, practice readings, and quiz what you learn.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/learn"
                className="rounded-lg bg-rose-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-rose-700"
              >
                Start Learning
              </Link>
              <Link
                href="/words"
                className="rounded-lg border border-stone-300 bg-white px-6 py-3 font-bold text-stone-900 transition hover:bg-stone-100"
              >
                Kanji Words
              </Link>
              <Link
                href="/quiz"
                className="rounded-lg border border-stone-300 bg-white px-6 py-3 font-bold text-stone-900 transition hover:bg-stone-100"
              >
                Take Quiz
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["学", "認", "感", "響"].map((kanji, index) => (
              <div
                key={kanji}
                className={`flex aspect-square items-center justify-center rounded-lg border font-serif text-7xl shadow-sm ${
                  index === 0
                    ? "border-rose-200 bg-rose-50 text-rose-700"
                    : "border-stone-200 bg-stone-100 text-stone-950"
                }`}
              >
                {kanji}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <KanjiOnlySearch kanjiItems={kanjiData} wordItems={n1Words} />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            href="/learn"
            className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:border-rose-300 hover:shadow-md"
          >
            <div className="text-xl font-black text-stone-950">Flashcards</div>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Review kanji cards by level with readings, meanings, and examples.
            </p>
          </Link>
          <Link
            href="/learn?level=N1"
            className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:border-rose-300 hover:shadow-md"
          >
            <div className="text-xl font-black text-stone-950">
              Input Practice
            </div>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Type meanings and readings from memory before checking answers.
            </p>
          </Link>
          <Link
            href="/quiz?mode=n1-reading"
            className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:border-rose-300 hover:shadow-md"
          >
            <div className="text-xl font-black text-stone-950">
              Reading Quiz
            </div>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Practice the complete N1 kanji word-reading bank.
            </p>
          </Link>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-black text-stone-950">
            JLPT Kanji Levels
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-5">
            {jlptLevels.map((level) => {
              const count =
                counts.find((item) => item.level === level)?.count ?? 0;

              return (
                <Link
                  key={level}
                  href={`/learn?level=${level}`}
                  className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition hover:border-rose-300 hover:shadow-md"
                >
                  <div className="text-2xl font-black text-stone-950">
                    {level}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-rose-700">
                    {level === "N1" ? `${n1WordCount} words` : `${count} kanji`}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {levelDescriptions[level]}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
