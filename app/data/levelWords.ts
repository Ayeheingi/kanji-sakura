import type { N1Word } from "./n1Words";
import { n1MasterWordsBase } from "./n1KanjiMaster";
import { n2MasterWordsBase } from "./n2KanjiMaster";
import { n3MasterWordsBase } from "./n3KanjiMaster";
import { n4KanjiWordsBase } from "./n4Kanji";
import { n5KanjiWordsBase } from "./n5Kanji";

export type WordLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export type LevelWord = N1Word & {
  level: WordLevel;
  slug: string;
  sourceLabel: string;
  chapter?: number;
  sourceKanji?: string;
  sourceKanjiOnyomi?: string;
  sourceKanjiKunyomi?: string;
  sourceKanjiMeaning?: string;
  sourceKanjiMeaningMM?: string;
};

function createMasterWords(
  level: "N3" | "N2" | "N1",
  words: {
    word: string;
    reading: string;
    meanings: string[];
    chapter: number;
    sourceKanji: string;
    sourceKanjiOnyomi: string;
    sourceKanjiKunyomi: string;
    sourceKanjiMeaning: string;
    sourceKanjiMeaningMM: string;
  }[],
): LevelWord[] {
  return words.map((item, index) => ({
    id: index + 1,
    level,
    slug: `${level.toLowerCase()}-${index + 1}`,
    word: item.word,
    reading: item.reading,
    meaning: item.meanings.join("; "),
    meanings: item.meanings,
    partsOfSpeech: [],
    sourcePage: item.chapter,
    sourceLabel: `${level} Kanji Master chapter ${item.chapter}`,
    chapter: item.chapter,
    sourceKanji: item.sourceKanji,
    sourceKanjiOnyomi: item.sourceKanjiOnyomi,
    sourceKanjiKunyomi: item.sourceKanjiKunyomi,
    sourceKanjiMeaning: item.sourceKanjiMeaning,
    sourceKanjiMeaningMM: item.sourceKanjiMeaningMM,
  }));
}

function createKanjiWords(
  level: "N5" | "N4",
  words: {
    word: string;
    reading: string;
    meanings: string[];
    sourceKanji: string;
    sourceKanjiOnyomi: string;
    sourceKanjiKunyomi: string;
    sourceKanjiMeaning: string;
    sourceKanjiMeaningMM: string;
  }[],
): LevelWord[] {
  return words.map((item, index) => ({
    id: index + 1,
    level,
    slug: `${level.toLowerCase()}-${index + 1}`,
    word: item.word,
    reading: item.reading,
    meaning: item.meanings.join("; "),
    meanings: item.meanings,
    partsOfSpeech: [],
    sourcePage: Math.floor(index / 20) + 1,
    sourceLabel: `${level} Kanji flashcard chapter ${Math.floor(index / 20) + 1}`,
    chapter: Math.floor(index / 20) + 1,
    sourceKanji: item.sourceKanji,
    sourceKanjiOnyomi: item.sourceKanjiOnyomi,
    sourceKanjiKunyomi: item.sourceKanjiKunyomi,
    sourceKanjiMeaning: item.sourceKanjiMeaning,
    sourceKanjiMeaningMM: item.sourceKanjiMeaningMM,
  }));
}

export const n5Words = createKanjiWords("N5", n5KanjiWordsBase);
export const n4Words = createKanjiWords("N4", n4KanjiWordsBase);
export const n3Words = createMasterWords("N3", n3MasterWordsBase);
export const n2Words = createMasterWords("N2", n2MasterWordsBase);
export const n1LevelWords = createMasterWords("N1", n1MasterWordsBase);

export const wordsByLevel: Record<WordLevel, LevelWord[]> = {
  N5: n5Words,
  N4: n4Words,
  N3: n3Words,
  N2: n2Words,
  N1: n1LevelWords,
};

export const wordLevels: WordLevel[] = ["N5", "N4", "N3", "N2", "N1"];
export const allLevelWords = wordLevels.flatMap((level) => wordsByLevel[level]);

export const wordLevelCounts: Record<WordLevel, number> = {
  N5: n5Words.length,
  N4: n4Words.length,
  N3: n3Words.length,
  N2: n2Words.length,
  N1: n1LevelWords.length,
};

export function findLevelWord(slug: string) {
  return allLevelWords.find((item) => item.slug === slug);
}
