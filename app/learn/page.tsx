import Link from "next/link";
import KanjiCard from "../components/KanjiCard";
import PracticePanel from "../components/PracticePanel";
import {
  getKanjiByLevel,
  jlptLevels,
  levelDescriptions,
  type JLPTLevel,
} from "../data/kanjiData";
import { n1WordCount, n1Words } from "../data/n1Words";

type Props = {
  searchParams: Promise<{
    level?: string;
  }>;
};

function getSelectedLevel(level?: string): JLPTLevel | "ALL" {
  if (level && jlptLevels.includes(level as JLPTLevel)) {
    return level as JLPTLevel;
  }

  return "ALL";
}

export default async function LearnPage({ searchParams }: Props) {
  const selectedLevel = getSelectedLevel((await searchParams).level);
  const items = getKanjiByLevel(selectedLevel);

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="font-bold text-stone-950">
            Kanji Library
          </Link>
          <Link
            href={`/quiz?level=${selectedLevel}`}
            className="rounded-lg bg-stone-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-stone-800"
          >
            Quiz This Set
          </Link>
        </nav>

        <header className="mt-8">
          <p className="text-sm font-bold uppercase tracking-wide text-rose-700">
            Learn
          </p>
          <h1 className="mt-2 text-4xl font-black text-stone-950 md:text-5xl">
            {selectedLevel === "ALL" ? "All JLPT Kanji" : `${selectedLevel} Kanji`}
          </h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            {selectedLevel === "ALL"
              ? "Move through N5, N4, N3, N2, and N1 in one combined deck."
              : levelDescriptions[selectedLevel]}
          </p>
        </header>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/learn"
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              selectedLevel === "ALL"
                ? "bg-rose-600 text-white"
                : "border border-stone-300 bg-white text-stone-800 hover:bg-stone-100"
            }`}
          >
            All
          </Link>
          {jlptLevels.map((level) => (
            <Link
              key={level}
              href={`/learn?level=${level}`}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                selectedLevel === level
                  ? "bg-rose-600 text-white"
                  : "border border-stone-300 bg-white text-stone-800 hover:bg-stone-100"
              }`}
            >
              {level}
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <PracticePanel items={items} />
        </div>

        {selectedLevel === "N1" || selectedLevel === "ALL" ? (
          <section className="mt-8 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black text-stone-950">
                  Complete N1 Word Bank
                </h2>
                <p className="mt-1 text-stone-600">
                  {n1WordCount} kanji words and readings from your N1 PDF.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/words"
                  className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-bold text-stone-800 transition hover:bg-stone-100"
                >
                  Browse Words
                </Link>
                <Link
                  href="/quiz?mode=n1-reading"
                  className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
                >
                  Quiz Readings
                </Link>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {n1Words.slice(0, 12).map((item) => (
                <div
                  key={`${item.word}-${item.reading}-${item.id}`}
                  className="rounded-lg bg-stone-100 p-3"
                >
                  <div className="font-bold text-stone-950">{item.word}</div>
                  <div className="mt-1 text-sm font-semibold text-rose-700">
                    {item.reading}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <KanjiCard key={item.id} kanji={item} />
          ))}
        </section>
      </div>
    </main>
  );
}
