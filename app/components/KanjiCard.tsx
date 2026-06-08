import Link from "next/link";
import type { Kanji } from "../data/kanjiData";

type Props = {
  kanji: Kanji;
};

export default function KanjiCard({ kanji }: Props) {
  return (
    <Link
      href={`/kanji/${kanji.id}`}
      className="group block rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-rose-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="rounded-md bg-rose-100 px-2.5 py-1 font-semibold text-rose-700">
          {kanji.level}
        </span>
        <span className="text-stone-500">{kanji.stroke} strokes</span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-5">
        <span className="font-serif text-7xl leading-none text-stone-950 transition group-hover:text-rose-700">
          {kanji.kanji}
        </span>
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
    </Link>
  );
}
