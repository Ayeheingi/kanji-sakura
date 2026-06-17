import Link from "next/link";
import { notFound } from "next/navigation";
import { kanjiData } from "@/app/data/kanjiData";
import { levelThemes } from "@/app/data/levelThemes";
import { allLevelWords, findLevelWord, wordsByLevel } from "@/app/data/levelWords";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return allLevelWords.map((item) => ({
    id: item.slug,
  }));
}

export default async function WordDetailPage({ params }: Props) {
  const { id } = await params;
  const word = findLevelWord(id);

  if (!word) {
    notFound();
  }

  const levelWords = wordsByLevel[word.level];
  const theme = levelThemes[word.level];
  const wordIndex = levelWords.findIndex((item) => item.slug === word.slug);
  const previous = levelWords[wordIndex - 1];
  const next = levelWords[wordIndex + 1];
  const kanjiCharacters = Array.from(new Set(Array.from(word.word))).filter(
    (character) => /[\u4e00-\u9fff\u3005]/.test(character),
  );
  const relatedWords = levelWords
    .filter(
      (item) =>
        item.slug !== word.slug &&
        kanjiCharacters.some((character) => item.word.includes(character)),
    )
    .slice(0, 8);

  return (
    <main className={`min-h-screen ${theme.page}`}>
      <div className="mx-auto max-w-4xl px-6 py-8">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/words" className="font-bold text-stone-950">
            Back to Words
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/quiz?mode=word-reading&level=${word.level}`}
              className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${theme.outlineButton}`}
            >
              Reading Quiz
            </Link>
            <Link
              href={`/quiz?mode=word-meaning&level=${word.level}`}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${theme.primaryButton}`}
            >
              Meaning Quiz
            </Link>
          </div>
        </nav>

        <section className={`mt-8 rounded-lg border p-6 ${theme.panel}`}>
          <div className="grid gap-6 md:grid-cols-[260px_1fr]">
            <div className={`flex min-h-56 items-center justify-center rounded-lg p-5 text-center text-6xl font-black leading-tight ${theme.soft}`}>
              {word.word}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-md px-2.5 py-1 text-sm font-bold ${theme.badge}`}>
                  {word.level} Word #{word.id}
                </span>
                <span className="text-sm text-stone-500">
                  {word.sourceLabel}
                </span>
              </div>

              <h1 className={`mt-4 text-4xl font-black ${theme.text}`}>
                {word.reading}
              </h1>
              <p className="mt-3 text-lg leading-8 text-stone-700">
                {word.meaning}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className={`rounded-lg p-4 ${theme.soft}`}>
                  <div className="text-sm font-bold text-stone-500">Word</div>
                  <div className="mt-1 text-2xl font-black text-stone-950">
                    {word.word}
                  </div>
                </div>
                <div className={`rounded-lg p-4 ${theme.softAlt}`}>
                  <div className="text-sm font-bold text-stone-500">Reading</div>
                  <div className="mt-1 text-2xl font-black text-stone-950">
                    {word.reading}
                  </div>
                </div>
                <div className={`rounded-lg p-4 sm:col-span-2 ${theme.soft}`}>
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

              {word.sourceKanji ? (
                <div className="mt-4 overflow-hidden rounded-lg border border-yellow-300/70 bg-gradient-to-br from-yellow-50 via-white to-red-50">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-yellow-200/70 px-4 py-3">
                    <div>
                      <div className="text-sm font-black text-red-900">
                        မြန်မာအဓိပ္ပါယ်
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wide text-red-700">
                        {word.chapter
                          ? `${word.level} Kanji Master Chapter ${word.chapter}`
                          : `${word.level} Kanji Flashcard`}
                      </div>
                    </div>
                    <span className="rounded-md bg-red-700 px-3 py-1 text-xs font-bold text-white">
                      {word.sourceKanji}
                    </span>
                  </div>
                  <div className="grid gap-4 p-4 sm:grid-cols-[88px_1fr]">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-red-700 font-serif text-5xl font-black text-yellow-50 shadow-sm">
                      {word.sourceKanji}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-500">
                        Source Kanji Meaning
                      </div>
                      <div className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
                        <div className="rounded-md bg-white/70 px-3 py-2">
                          <span className="font-black text-stone-500">音: </span>
                          <span className="font-bold text-stone-800">
                            {word.sourceKanjiOnyomi || "none"}
                          </span>
                        </div>
                        <div className="rounded-md bg-white/70 px-3 py-2">
                          <span className="font-black text-stone-500">訓: </span>
                          <span className="font-bold text-stone-800">
                            {word.sourceKanjiKunyomi || "none"}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm leading-7 text-stone-700">
                        {word.sourceKanjiMeaning}
                      </p>
                      {word.sourceKanjiMeaningMM ? (
                        <p className="mt-2 text-lg font-bold leading-8 text-red-950">
                          {word.sourceKanjiMeaningMM}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className={`text-xl font-black ${theme.text}`}>Kanji In This Word</h2>
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
                    className={`rounded-lg border p-4 transition hover:shadow-md ${theme.panel} ${theme.hoverBorder}`}
                  >
                    <div className="font-serif text-5xl font-black text-stone-950">
                      {character}
                    </div>
                    <div className="mt-3 text-lg font-bold text-stone-950">
                      {matchingKanji.meaning}
                    </div>
                    <div className={`mt-1 text-sm font-semibold ${theme.accentText}`}>
                      {matchingKanji.level}
                    </div>
                  </Link>
                );
              }

              return (
                <div
                  key={character}
                    className={`rounded-lg border p-4 ${theme.panel}`}
                >
                  <div className="font-serif text-5xl font-black text-stone-950">
                    {character}
                  </div>
                  <div className="mt-3 text-lg font-bold text-stone-950">
                    {word.level} word character
                  </div>
                  <div className={`mt-1 text-sm font-semibold ${theme.accentText}`}>
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
          <h2 className={`text-xl font-black ${theme.text}`}>Related Vocabulary</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {relatedWords.map((item) => (
              <Link
                key={item.id}
                href={`/words/${item.slug}`}
                className={`rounded-lg border p-4 transition hover:shadow-md ${theme.panel} ${theme.hoverBorder}`}
              >
                <div className="text-2xl font-black text-stone-950">
                  {item.word}
                </div>
                <div className={`mt-1 font-semibold ${theme.accentText}`}>
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
          <h2 className={`text-xl font-black ${theme.text}`}>Practice</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/quiz?mode=word-reading&level=${word.level}`}
              className={`rounded-lg border p-4 transition hover:shadow-md ${theme.panel} ${theme.hoverBorder}`}
            >
              <div className="text-2xl font-black text-stone-950">
                Reading Quiz
              </div>
              <div className={`mt-1 ${theme.accentText}`}>Type {word.reading}</div>
              <div className="mt-2 text-sm text-stone-600">
                Test hiragana readings from the {word.level} word bank.
              </div>
            </Link>
            <Link
              href={`/quiz?mode=word-meaning&level=${word.level}`}
              className={`rounded-lg border p-4 transition hover:shadow-md ${theme.panel} ${theme.hoverBorder}`}
            >
              <div className="text-2xl font-black text-stone-950">
                Meaning Quiz
              </div>
              <div className={`mt-1 ${theme.accentText}`}>Type the meaning</div>
              <div className="mt-2 text-sm text-stone-600">
                Practice {word.level} kanji word meanings with typed answers.
              </div>
            </Link>
          </div>
        </section>

        <section className="mt-5 flex flex-wrap justify-between gap-3">
          {previous ? (
            <Link
              href={`/words/${previous.slug}`}
              className={`rounded-lg border px-4 py-3 font-bold transition ${theme.outlineButton}`}
            >
              Previous
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/words/${next.slug}`}
              className={`rounded-lg border px-4 py-3 font-bold transition ${theme.outlineButton}`}
            >
              Next
            </Link>
          ) : null}
        </section>
      </div>
    </main>
  );
}
