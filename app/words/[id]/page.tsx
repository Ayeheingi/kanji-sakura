import Link from "next/link";
import { notFound } from "next/navigation";
import { kanjiData } from "@/app/data/kanjiData";
import { n1Words } from "@/app/data/n1Words";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return n1Words.map((item) => ({
    id: String(item.id),
  }));
}

export default async function WordDetailPage({ params }: Props) {
  const { id } = await params;
  const word = n1Words.find((item) => item.id === Number(id));

  if (!word) {
    notFound();
  }

  const previous = n1Words[word.id - 2];
  const next = n1Words[word.id];
  const kanjiCharacters = Array.from(new Set(Array.from(word.word))).filter(
    (character) => /[\u4e00-\u9fff\u3005]/.test(character),
  );
  const relatedWords = n1Words
    .filter(
      (item) =>
        item.id !== word.id &&
        kanjiCharacters.some((character) => item.word.includes(character)),
    )
    .slice(0, 8);

  return (
    <main className="fresh-page min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/words" className="font-bold text-stone-950">
            Back to Words
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/quiz?mode=n1-reading"
              className="rounded-lg border border-teal-200 bg-white/80 px-4 py-2 text-sm font-bold text-teal-900 transition hover:bg-teal-50"
            >
              Reading Quiz
            </Link>
            <Link
              href="/quiz?mode=n1-meaning"
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
            >
              Meaning Quiz
            </Link>
          </div>
        </nav>

        <section className="fresh-panel mt-8 rounded-lg border p-6">
          <div className="grid gap-6 md:grid-cols-[260px_1fr]">
            <div className="flex min-h-56 items-center justify-center rounded-lg bg-teal-50 p-5 text-center text-6xl font-black leading-tight text-teal-700">
              {word.word}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-teal-100 px-2.5 py-1 text-sm font-bold text-teal-700">
                  N1 Word #{word.id}
                </span>
                <span className="text-sm text-stone-500">
                  page{word.sourcePage}
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-black text-stone-950">
                {word.reading}
              </h1>
              <p className="mt-3 text-lg leading-8 text-stone-700">
                {word.meaning}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-teal-50 p-4">
                  <div className="text-sm font-bold text-stone-500">Word</div>
                  <div className="mt-1 text-2xl font-black text-stone-950">
                    {word.word}
                  </div>
                </div>
                <div className="rounded-lg bg-sky-50 p-4">
                  <div className="text-sm font-bold text-stone-500">Reading</div>
                  <div className="mt-1 text-2xl font-black text-stone-950">
                    {word.reading}
                  </div>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4 sm:col-span-2">
                  <div className="text-sm font-bold text-stone-500">Meaning</div>
                  <div className="mt-1 text-lg font-bold text-stone-950">
                    {word.meaning}
                  </div>
                </div>
              </div>

              {word.dictionaryForm ? (
                <p className="mt-3 text-sm text-stone-500">
                  Dictionary form: {word.dictionaryForm} ({word.dictionaryReading})
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-black text-stone-950">Kanji In This Word</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {kanjiCharacters.map((character) => {
              const matchingKanji = kanjiData.find(
                (item) => item.kanji === character,
              );

              if (matchingKanji) {
                return (
                  <Link
                    key={character}
                    href={`/kanji/${matchingKanji.id}`}
                    className="fresh-panel rounded-lg border p-4 transition hover:border-teal-300 hover:shadow-md"
                  >
                    <div className="font-serif text-5xl font-black text-stone-950">
                      {character}
                    </div>
                    <div className="mt-3 text-lg font-bold text-stone-950">
                      {matchingKanji.meaning}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-teal-700">
                      {matchingKanji.level}
                    </div>
                  </Link>
                );
              }

              return (
                <div
                  key={character}
                  className="fresh-panel rounded-lg border p-4"
                >
                  <div className="font-serif text-5xl font-black text-stone-950">
                    {character}
                  </div>
                  <div className="mt-3 text-lg font-bold text-stone-950">
                    N1 word character
                  </div>
                  <div className="mt-1 text-sm font-semibold text-teal-700">
                    Basic character only
                  </div>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    This character appears in the word bank, but a full kanji
                    detail card has not been added yet.
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-black text-stone-950">Related Vocabulary</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {relatedWords.map((item) => (
              <Link
                key={item.id}
                href={`/words/${item.id}`}
                className="fresh-panel rounded-lg border p-4 transition hover:border-teal-300 hover:shadow-md"
              >
                <div className="text-2xl font-black text-stone-950">
                  {item.word}
                </div>
                <div className="mt-1 font-semibold text-teal-700">
                  {item.reading}
                </div>
                <div className="mt-2 line-clamp-2 text-sm text-stone-600">
                  {item.meaning}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-black text-stone-950">Practice</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Link
              href="/quiz?mode=n1-reading"
              className="fresh-panel rounded-lg border p-4 transition hover:border-teal-300 hover:shadow-md"
            >
              <div className="text-2xl font-black text-stone-950">
                Reading Quiz
              </div>
              <div className="mt-1 text-teal-700">Type {word.reading}</div>
              <div className="mt-2 text-sm text-stone-600">
                Test hiragana readings from the full N1 word bank.
              </div>
            </Link>
            <Link
              href="/quiz?mode=n1-meaning"
              className="fresh-panel rounded-lg border p-4 transition hover:border-teal-300 hover:shadow-md"
            >
              <div className="text-2xl font-black text-stone-950">
                Meaning Quiz
              </div>
              <div className="mt-1 text-teal-700">Type the English meaning</div>
              <div className="mt-2 text-sm text-stone-600">
                Practice kanji word meanings with typed answers.
              </div>
            </Link>
          </div>
        </section>

        <section className="mt-5 flex flex-wrap justify-between gap-3">
          {previous ? (
            <Link
              href={`/words/${previous.id}`}
              className="rounded-lg border border-teal-200 bg-white/80 px-4 py-3 font-bold text-teal-900 transition hover:bg-teal-50"
            >
              Previous
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/words/${next.id}`}
              className="rounded-lg border border-teal-200 bg-white/80 px-4 py-3 font-bold text-teal-900 transition hover:bg-teal-50"
            >
              Next
            </Link>
          ) : null}
        </section>
      </div>
    </main>
  );
}
