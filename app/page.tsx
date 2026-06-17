import Link from "next/link";
import { jlptLevels, levelDescriptions } from "./data/kanjiData";
import { levelThemes } from "./data/levelThemes";
import { wordLevelCounts } from "./data/levelWords";

export default function Home() {
  const totalWords = Object.values(wordLevelCounts).reduce(
    (sum, count) => sum + count,
    0,
  );

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fffbeb_0%,#fff7ed_48%,#f8fafc_100%)] text-stone-950">
      <header className="border-b border-stone-300/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="text-xl font-black">
            Kanji Library
          </Link>
          <nav className="flex flex-wrap gap-2">
            <Link
              href="/learn"
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-900 transition hover:bg-stone-100"
            >
              Levels
            </Link>
            <Link
              href="/words"
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-900 transition hover:bg-stone-100"
            >
              Words
            </Link>
            <Link
              href="/search"
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-900 transition hover:bg-stone-100"
            >
              Search
            </Link>
            <Link
              href="/practice?level=N5"
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-900 transition hover:bg-stone-100"
            >
              Practice
            </Link>
            <Link
              href="/quiz?mode=word-reading&level=N5"
              className="rounded-lg bg-stone-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-stone-800"
            >
              Quiz
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-wide text-red-800">
            Japanese and Burmese kanji study
          </p>
          <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">
            Choose your JLPT level
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">
            Start with one level, then study kanji flashcards, chapter word
            banks, readings, English meanings, Burmese meanings, and quizzes.
          </p>
        </div>

        <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
          <div className="rounded-lg border border-stone-300/70 bg-white/80 p-3 shadow-sm">
            <div className="text-2xl font-black">{totalWords}</div>
            <div className="text-xs font-bold uppercase tracking-wide text-stone-500">
              words
            </div>
          </div>
          <div className="rounded-lg border border-stone-300/70 bg-white/80 p-3 shadow-sm">
            <div className="text-2xl font-black">5</div>
            <div className="text-xs font-bold uppercase tracking-wide text-stone-500">
              levels
            </div>
          </div>
          <div className="rounded-lg border border-stone-300/70 bg-white/80 p-3 shadow-sm">
            <div className="text-2xl font-black">日 / မြန်</div>
            <div className="text-xs font-bold uppercase tracking-wide text-stone-500">
              meanings
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <Link
            href="/learn?level=N5"
            className="rounded-lg border border-stone-300/70 bg-white/86 p-5 shadow-sm transition hover:border-stone-500 hover:shadow-md"
          >
            <div className="text-xl font-black">Kanji Flashcards</div>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Flip cards with kanji, onyomi, kunyomi, English, Myanmar, and
              example words.
            </p>
          </Link>
          <Link
            href="/words"
            className="rounded-lg border border-stone-300/70 bg-white/86 p-5 shadow-sm transition hover:border-stone-500 hover:shadow-md"
          >
            <div className="text-xl font-black">Kanji Words Bank</div>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Browse every level, chapter, main kanji group, reading, and
              Burmese meaning.
            </p>
          </Link>
          <Link
            href="/practice?level=N5"
            className="rounded-lg border border-stone-300/70 bg-white/86 p-5 shadow-sm transition hover:border-stone-500 hover:shadow-md"
          >
            <div className="text-xl font-black">Input Practice</div>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Type meanings, onyomi, and kunyomi from memory before checking
              the answer.
            </p>
          </Link>
        </div>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-red-800">
                Start Here
              </p>
              <h2 className="mt-1 text-2xl font-black">Select A Level</h2>
            </div>
            <Link
              href="/learn"
              className="rounded-lg border border-stone-300 bg-white/86 px-4 py-2 text-sm font-bold text-stone-900 transition hover:bg-stone-100"
            >
              Level page
            </Link>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-5">
            {jlptLevels.map((level) => (
              <article
                key={level}
                className={`rounded-lg border p-4 transition hover:shadow-md ${levelThemes[level].panel} ${levelThemes[level].hoverBorder}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-2xl font-black">{level}</div>
                    <div className={`mt-1 text-sm font-semibold ${levelThemes[level].accentText}`}>
                      {wordLevelCounts[level]} words
                    </div>
                  </div>
                  <span className={`rounded-md px-2 py-1 text-xs font-bold ${levelThemes[level].badge}`}>
                    JLPT
                  </span>
                </div>
                <p className="mt-3 min-h-24 text-sm leading-6 text-stone-600">
                  {levelDescriptions[level]}
                </p>
                <div className="mt-4 grid gap-2">
                  <Link
                    href={`/learn?level=${level}`}
                    className={`rounded-lg px-3 py-2 text-center text-sm font-bold transition ${levelThemes[level].primaryButton}`}
                  >
                    Flashcards
                  </Link>
                  <Link
                    href={`/words?level=${level}`}
                    className={`rounded-lg border px-3 py-2 text-center text-sm font-bold transition ${levelThemes[level].outlineButton}`}
                  >
                    Words
                  </Link>
                  <Link
                    href={`/quiz?mode=word-reading&level=${level}`}
                    className={`rounded-lg border px-3 py-2 text-center text-sm font-bold transition ${levelThemes[level].outlineButton}`}
                  >
                    Quiz
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
