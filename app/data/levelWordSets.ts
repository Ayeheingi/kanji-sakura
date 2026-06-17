import { wordLevelCounts } from "./levelWords";

export type WordSetLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export type WordSetSource = {
  level: WordSetLevel;
  title: string;
  fileName: string;
  status: "ready" | "starter";
  count: number;
  note: string;
};

export const wordSetSources: WordSetSource[] = [
  {
    level: "N5",
    title: "N5 Kanji Words",
    fileName: "Kanji Sakura N5 Collection",
    status: "ready",
    count: wordLevelCounts.N5,
    note: "Ready with N5 kanji flashcard words, grouped into 20-word chapters.",
  },
  {
    level: "N4",
    title: "N4 Kanji Words",
    fileName: "Kanji Sakura N4 Collection",
    status: "ready",
    count: wordLevelCounts.N4,
    note: "Ready with N4 kanji flashcard words, grouped into 20-word chapters.",
  },
  {
    level: "N3",
    title: "N3 Kanji Words",
    fileName: "Kanji Sakura N3 Collection",
    status: "ready",
    count: wordLevelCounts.N3,
    note: "Ready with chapter-based N3 kanji example words for your study library.",
  },
  {
    level: "N2",
    title: "N2 Kanji Words",
    fileName: "Kanji Sakura N2 Collection",
    status: "ready",
    count: wordLevelCounts.N2,
    note: "Ready with chapter-based N2 kanji example words for your study library.",
  },
  {
    level: "N1",
    title: "N1 Kanji Words",
    fileName: "Kanji Sakura N1 Collection",
    status: "ready",
    count: wordLevelCounts.N1,
    note: "Ready with chapter-based N1 kanji example words for your study library.",
  },
];
