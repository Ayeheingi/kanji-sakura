import Link from "next/link";
import type { Kanji } from "../data/kanjiData";
import { levelThemes } from "../data/levelThemes";
import type { LevelWord } from "../data/levelWords";

type Props = {
  kanji: Kanji;
  mainWords?: LevelWord[];
};

export default function KanjiCard({ kanji, mainWords = [] }: Props) {
  const theme = levelThemes[kanji.level];

  return (
    <article
      className={`group rounded-lg border p-5 transition hover:-translate-y-1 hover:shadow-md ${theme.panel} ${theme.hoverBorder}`}
    >
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className={`rounded-md px-2.5 py-1 font-semibold ${theme.badge}`}>
          {kanji.level}
        </span>
        <span className="text-stone-500">{kanji.stroke} strokes</span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-5">
        <Link
          href={`/kanji/${kanji.id}`}
          className={`font-serif text-7xl leading-none text-stone-950 transition ${theme.accentText}`}
        >
          {kanji.kanji}
        </Link>
        <span className="pb-2 text-right text-lg font-semibold text-stone-800">
          {kanji.meaning}
        </span>
      </div>

      <div className="mt-5 space-y-2 border-t border-stone-100 pt-4 text-sm text-stone-700">
        <p>
          <span className="font-semibold text-stone-950">On:</span>{" "}
          {kanji.onyomi.length ? kanji.onyomi.join(", ") : "none"}
        </p>
        <p>
          <span className="font-semibold text-stone-950">Kun:</span>{" "}
          {kanji.kunyomi.length ? kanji.kunyomi.join(", ") : "none"}
        </p>
      </div>

      {mainWords.length ? (
        <div className="mt-5 border-t border-stone-200/70 pt-4">
          <div className="text-sm font-black text-stone-950">Main Words</div>
          <div className="mt-3 grid gap-2">
            {mainWords.map((word) => (
              <Link
                key={word.slug}
                href={`/words/${word.slug}`}
                className={`rounded-lg border px-3 py-3 transition ${theme.soft} ${theme.hoverBorder}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block text-lg font-black leading-tight text-stone-950">
                      {word.word}
                    </span>
                    <span className={`mt-1 block text-sm font-bold ${theme.accentText}`}>
                      {word.reading || "reading practice"}
                    </span>
                  </span>
                  {word.chapter ? (
                    <span className="shrink-0 rounded-md bg-white/80 px-2 py-1 text-xs font-bold text-stone-500">
                      ch.{word.chapter}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-stone-700">
                  {word.meaning}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <Link
        href={`/kanji/${kanji.id}`}
        className={`mt-5 inline-flex rounded-lg border px-3 py-2 text-sm font-bold transition ${theme.outlineButton}`}
      >
        Kanji Detail
      </Link>
    </article>
  );
}
