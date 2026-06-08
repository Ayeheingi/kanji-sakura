import Link from "next/link";
import { notFound } from "next/navigation";
import { kanjiData } from "@/app/data/kanjiData";

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

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/learn" className="font-bold text-stone-950">
            Back to Learn
          </Link>
          <Link
            href={`/quiz?level=${kanji.level}`}
            className="rounded-lg bg-stone-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-stone-800"
          >
            Quiz {kanji.level}
          </Link>
        </nav>

        <section className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            <div className="flex h-56 items-center justify-center rounded-lg bg-rose-50 font-serif text-9xl text-rose-700">
              {kanji.kanji}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-rose-100 px-2.5 py-1 text-sm font-bold text-rose-700">
                  {kanji.level}
                </span>
                <span className="text-sm text-stone-500">
                  {kanji.stroke} strokes
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-black text-stone-950">
                {kanji.meaning}
              </h1>
              <p className="mt-3 text-stone-600">{kanji.hint}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-stone-100 p-4">
                  <div className="text-sm font-bold text-stone-500">Onyomi</div>
                  <div className="mt-1 text-lg font-bold text-stone-950">
                    {kanji.onyomi.length ? kanji.onyomi.join(", ") : "none"}
                  </div>
                </div>
                <div className="rounded-lg bg-stone-100 p-4">
                  <div className="text-sm font-bold text-stone-500">Kunyomi</div>
                  <div className="mt-1 text-lg font-bold text-stone-950">
                    {kanji.kunyomi.length ? kanji.kunyomi.join(", ") : "none"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-black text-stone-950">Vocabulary</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {kanji.examples.map((example) => (
              <div
                key={example.word}
                className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm"
              >
                <div className="text-2xl font-black text-stone-950">
                  {example.word}
                </div>
                <div className="mt-1 text-rose-700">{example.reading}</div>
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
