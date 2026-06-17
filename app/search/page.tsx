import Link from "next/link";
import KanjiOnlySearch from "../components/KanjiOnlySearch";
import { kanjiData } from "../data/kanjiData";
import { allLevelWords } from "../data/levelWords";

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fffbeb_0%,#fff7ed_48%,#f8fafc_100%)]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="font-bold text-stone-950">
            Kanji Library
          </Link>
          <div className="flex flex-wrap gap-2">
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
          </div>
        </nav>

        <header className="mt-8">
          <p className="text-sm font-black uppercase tracking-wide text-red-800">
            Search
          </p>
          <h1 className="mt-2 text-4xl font-black text-stone-950 md:text-5xl">
            Find Kanji And Words
          </h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            Search kanji, readings, English meanings, and Burmese meanings.
          </p>
        </header>

        <div className="mt-8">
          <KanjiOnlySearch kanjiItems={kanjiData} wordItems={allLevelWords} />
        </div>
      </div>
    </main>
  );
}
