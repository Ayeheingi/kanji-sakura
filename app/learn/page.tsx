import Link from "next/link";
import { jlptLevels, levelDescriptions, type JLPTLevel } from "../data/kanjiData";
import { levelThemes } from "../data/levelThemes";
import {
  type LevelWord,
  wordLevels,
  wordsByLevel,
  type WordLevel,
} from "../data/levelWords";

type Props = {
  searchParams: Promise<{
    chapter?: string;
    level?: string;
  }>;
};

function getSelectedLevel(level?: string): JLPTLevel | "ALL" {
  if (level && jlptLevels.includes(level as JLPTLevel)) {
    return level as JLPTLevel;
  }

  return "ALL";
}

function isWordLevel(level: JLPTLevel | "ALL"): level is WordLevel {
  return wordLevels.includes(level as WordLevel);
}

function getSelectedChapter(chapter?: string) {
  if (!chapter) {
    return null;
  }

  const value = Number(chapter);
  return Number.isFinite(value) ? value : null;
}

function getKanjiWordGroups(words: LevelWord[]) {
  const groups = new Map<
    string,
    {
      kanji: string;
      meaning: string;
      meaningMM: string;
      onyomi: string;
      kunyomi: string;
      chapter?: number;
      words: LevelWord[];
    }
  >();

  for (const word of words) {
    const kanji = word.sourceKanji ?? word.word[0];

    if (!groups.has(kanji)) {
      groups.set(kanji, {
        kanji,
        meaning: word.sourceKanjiMeaning ?? "",
        meaningMM: word.sourceKanjiMeaningMM ?? "",
        onyomi: word.sourceKanjiOnyomi ?? "",
        kunyomi: word.sourceKanjiKunyomi ?? "",
        chapter: word.chapter,
        words: [],
      });
    }

    const group = groups.get(kanji);

    if (group && group.words.length < 4) {
      group.words.push(word);
    }
  }

  return Array.from(groups.values());
}

function getChapterGroups(words: LevelWord[]) {
  const kanjiGroups = getKanjiWordGroups(words);
  const chapterGroups = new Map<
    string,
    {
      chapter?: number;
      label: string;
      groups: ReturnType<typeof getKanjiWordGroups>;
    }
  >();

  for (const group of kanjiGroups) {
    const key = group.chapter ? String(group.chapter) : "word-bank";
    const label = group.chapter ? `Chapter ${group.chapter}` : "Kanji Words";

    if (!chapterGroups.has(key)) {
      chapterGroups.set(key, { chapter: group.chapter, label, groups: [] });
    }

    chapterGroups.get(key)?.groups.push(group);
  }

  return Array.from(chapterGroups.values());
}

export default async function LearnPage({ searchParams }: Props) {
  const params = await searchParams;
  const selectedLevel = getSelectedLevel(params.level);
  const selectedChapter = getSelectedChapter(params.chapter);
  const theme =
    selectedLevel === "ALL" ? levelThemes.N5 : levelThemes[selectedLevel];
  const wordItems = isWordLevel(selectedLevel)
    ? wordsByLevel[selectedLevel]
    : [];
  const wordSectionTitle =
    selectedLevel === "ALL"
      ? "JLPT Kanji Words Bank"
      : `${selectedLevel} Kanji Words Bank`;
  const chapterGroups = getChapterGroups(wordItems);
  const hasChapters = chapterGroups.some((chapter) => chapter.chapter);
  const visibleChapterGroups =
    selectedChapter && hasChapters
      ? chapterGroups.filter((chapter) => chapter.chapter === selectedChapter)
      : chapterGroups;
  const quizLevel = isWordLevel(selectedLevel) ? selectedLevel : "N5";

  return (
    <main className={`min-h-screen ${theme.page}`}>
      <div className="mx-auto max-w-6xl px-6 py-8">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="font-bold text-stone-950">
            Kanji Library
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/learn"
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-800 transition hover:bg-stone-100"
            >
              Levels
            </Link>
            <Link
              href={isWordLevel(selectedLevel) ? `/words?level=${selectedLevel}` : "/words"}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-800 transition hover:bg-stone-100"
            >
              Words
            </Link>
            <Link
              href={`/practice?level=${quizLevel}`}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-800 transition hover:bg-stone-100"
            >
              Practice
            </Link>
            <Link
              href="/search"
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-800 transition hover:bg-stone-100"
            >
              Search
            </Link>
            <Link
              href={`/quiz?mode=word-reading&level=${quizLevel}`}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${theme.primaryButton}`}
            >
              Quiz
            </Link>
          </div>
        </nav>

        <header className="mt-8">
          <p className={`text-sm font-bold uppercase tracking-wide ${theme.accentText}`}>
            Learn
          </p>
          <h1 className={`mt-2 text-4xl font-black md:text-5xl ${theme.text}`}>
            {selectedLevel === "ALL" ? "Choose JLPT Level" : `${selectedLevel} Kanji`}
          </h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            {selectedLevel === "ALL"
              ? "Select one level to study kanji by chapter with English and Myanmar meanings."
              : levelDescriptions[selectedLevel]}
          </p>
        </header>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/learn"
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              selectedLevel === "ALL"
                ? theme.primaryButton
                : "border border-stone-300 bg-white text-stone-800 hover:bg-stone-100"
            }`}
          >
            Choose Level
          </Link>
          {jlptLevels.map((level) => (
            <Link
              key={level}
              href={`/learn?level=${level}`}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                selectedLevel === level
                  ? levelThemes[level].primaryButton
                  : "border border-stone-300 bg-white text-stone-800 hover:bg-stone-100"
              }`}
            >
              {level}
            </Link>
          ))}
        </div>

        {selectedLevel === "ALL" ? (
          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {jlptLevels.map((level) => (
              <Link
                key={level}
                href={`/learn?level=${level}`}
                className={`rounded-lg border p-5 transition hover:shadow-md ${levelThemes[level].panel} ${levelThemes[level].hoverBorder}`}
              >
                <div className={`text-3xl font-black ${levelThemes[level].text}`}>
                  {level}
                </div>
                <div className={`mt-2 text-sm font-bold ${levelThemes[level].accentText}`}>
                  {wordsByLevel[level].length} words
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {levelDescriptions[level]}
                </p>
              </Link>
            ))}
          </section>
        ) : null}

        {wordItems.length ? (
          <section className={`mt-8 rounded-lg border p-5 ${theme.panel}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className={`text-2xl font-black ${theme.text}`}>
                  {wordSectionTitle}
                </h2>
                <p className="mt-1 text-stone-600">
                  {wordItems.length} Kanji Master words collected by main
                  kanji, with readings, English meanings, Myanmar meanings, and
                  detail pages.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={isWordLevel(selectedLevel) ? `/words?level=${selectedLevel}` : "/words"}
                  className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${theme.outlineButton}`}
                >
                  Browse Words
                </Link>
                <Link
                  href={`/quiz?mode=word-reading&level=${quizLevel}`}
                  className={`rounded-lg px-4 py-2 text-sm font-bold transition ${theme.primaryButton}`}
                >
                  Open Quiz
                </Link>
              </div>
            </div>

            {hasChapters && isWordLevel(selectedLevel) ? (
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={`/learn?level=${selectedLevel}`}
                  className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                    selectedChapter ? theme.outlineButton : theme.primaryButton
                  }`}
                >
                  All chapters
                </Link>
                {chapterGroups
                  .filter((chapter) => chapter.chapter)
                  .map((chapter) => (
                    <Link
                      key={chapter.label}
                      href={`/learn?level=${selectedLevel}&chapter=${chapter.chapter}`}
                      className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                        selectedChapter === chapter.chapter
                          ? theme.primaryButton
                          : theme.outlineButton
                      }`}
                    >
                      {chapter.label}
                    </Link>
                  ))}
              </div>
            ) : null}

            <div className="mt-5 space-y-6">
              {visibleChapterGroups.map((chapter) => (
                <section key={chapter.label}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className={`text-xl font-black ${theme.text}`}>
                      {chapter.label}
                    </h3>
                    <span className="text-sm font-bold text-stone-500">
                      {chapter.groups.length} kanji groups
                    </span>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {chapter.groups.map((group) => (
                      <article
                        key={`${group.kanji}-${group.chapter ?? "word-bank"}`}
                        className={`rounded-lg border p-4 ${theme.soft}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="font-serif text-5xl font-black text-stone-950">
                              {group.kanji}
                            </div>
                            <div>
                              <div className="grid gap-1 text-sm">
                                <div>
                                  <span className="font-black text-stone-500">音: </span>
                                  <span className="font-bold text-stone-800">
                                    {group.onyomi || "none"}
                                  </span>
                                </div>
                                <div>
                                  <span className="font-black text-stone-500">訓: </span>
                                  <span className="font-bold text-stone-800">
                                    {group.kunyomi || "none"}
                                  </span>
                                </div>
                                <div className="mt-2">
                                  <div className="text-xs font-black uppercase tracking-wide text-stone-500">
                                    English
                                  </div>
                                  <div className="font-bold text-stone-800">
                                    {group.meaning || "Kanji words"}
                                  </div>
                                </div>
                                {group.meaningMM ? (
                                  <div>
                                    <div className="text-xs font-black uppercase tracking-wide text-stone-500">
                                      Myanmar
                                    </div>
                                    <div className="font-semibold text-stone-700">
                                      {group.meaningMM}
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          {group.chapter ? (
                            <span className={`rounded-md px-2 py-1 text-xs font-bold ${theme.badge}`}>
                              ch.{group.chapter}
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-4 grid gap-2">
                          {group.words.map((word) => (
                            <Link
                              key={word.slug}
                              href={`/words/${word.slug}`}
                              className="rounded-md bg-white/70 px-3 py-2 transition hover:bg-white"
                            >
                              <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <span className="font-black text-stone-950">
                                  {word.word}
                                </span>
                                <span className={`text-sm font-bold ${theme.accentText}`}>
                                  {word.reading || "reading"}
                                </span>
                              </div>
                              <p className="mt-1 text-xs leading-5 text-stone-600">
                                {word.meaning}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
