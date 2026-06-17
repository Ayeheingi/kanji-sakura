import Link from "next/link";
import { notFound } from "next/navigation";
import { kanjiData } from "@/app/data/kanjiData";
import { levelThemes } from "@/app/data/levelThemes";
import { allLevelWords } from "@/app/data/levelWords";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return kanjiData.map((item) => ({
    id: String(item.id),
  }));
}

export default async function KanjiDetailPage({ params }: Props) {
  const { id } = await params;
  const kanji = kanjiData.find((item) => item.id === Number(id));

  if (!kanji) {
    notFound();
  }

  const theme = levelThemes[kanji.level];
  const mainWords = [
    ...allLevelWords.filter((word) => word.sourceKanji === kanji.kanji),
    ...allLevelWords.filter(
      (word) => word.sourceKanji !== kanji.kanji && word.word.includes(kanji.kanji),
    ),
  ].slice(0, 18);

  return (
    <main className={`min-h-screen ${theme.page}`}>
      <div className="mx-auto max-w-4xl px-6 py-8">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/learn" className="font-bold text-stone-950">
            Back to Learn
          </Link>
          <Link
            href={`/quiz?level=${kanji.level}`}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${theme.primaryButton}`}
          >
            Quiz {kanji.level}
          </Link>
        </nav>

        <section className={`mt-8 rounded-lg border p-6 ${theme.panel}`}>
          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            <div className={`flex h-56 items-center justify-center rounded-lg font-serif text-9xl ${theme.soft}`}>
              {kanji.kanji}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-md px-2.5 py-1 text-sm font-bold ${theme.badge}`}>
                  {kanji.level}
                </span>
                <span className="text-sm text-stone-500">
                  {kanji.stroke} strokes
                </span>
              </div>
              <h1 className={`mt-4 text-4xl font-black ${theme.text}`}>
                {kanji.meaning}
              </h1>
              <p className="mt-3 text-stone-600">{kanji.hint}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className={`rounded-lg p-4 ${theme.soft}`}>
                  <div className="text-sm font-bold text-stone-500">Onyomi</div>
                  <div className="mt-1 text-lg font-bold text-stone-950">
                    {kanji.onyomi.length ? kanji.onyomi.join(", ") : "none"}
                  </div>
                </div>
                <div className={`rounded-lg p-4 ${theme.softAlt}`}>
                  <div className="text-sm font-bold text-stone-500">Kunyomi</div>
                  <div className="mt-1 text-lg font-bold text-stone-950">
                    {kanji.kunyomi.length ? kanji.kunyomi.join(", ") : "none"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {mainWords.length ? (
          <section className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className={`text-xl font-black ${theme.text}`}>Main Words</h2>
              <Link
                href={`/words?level=${kanji.level}`}
                className={`rounded-lg border px-3 py-2 text-sm font-bold transition ${theme.outlineButton}`}
              >
                Browse {kanji.level}
              </Link>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {mainWords.map((word) => (
                <Link
                  key={word.slug}
                  href={`/words/${word.slug}`}
                  className={`rounded-lg border p-4 transition hover:shadow-md ${theme.panel} ${theme.hoverBorder}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-2xl font-black text-stone-950">
                        {word.word}
                      </div>
                      <div className={`mt-1 font-bold ${theme.accentText}`}>
                        {word.reading || "reading practice"}
                      </div>
                    </div>
                    {word.chapter ? (
                      <span className={`rounded-md px-2 py-1 text-xs font-bold ${theme.badge}`}>
                        ch.{word.chapter}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">
                    {word.meaning}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-6">
          <h2 className={`text-xl font-black ${theme.text}`}>Vocabulary</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {kanji.examples.map((example) => (
              <div
                key={example.word}
                className={`rounded-lg border p-4 shadow-sm ${theme.panel}`}
              >
                <div className="text-2xl font-black text-stone-950">
                  {example.word}
                </div>
                <div className={`mt-1 ${theme.accentText}`}>{example.reading}</div>
                <div className="mt-2 text-sm text-stone-600">
                  {example.meaning}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
