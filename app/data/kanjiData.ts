export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export type KanjiExample = {
  word: string;
  reading: string;
  meaning: string;
};

export type Kanji = {
  id: number;
  kanji: string;
  level: JLPTLevel;
  meaning: string;
  onyomi: string[];
  kunyomi: string[];
  stroke: number;
  hint: string;
  examples: KanjiExample[];
};

export const jlptLevels: JLPTLevel[] = ["N5", "N4", "N3", "N2", "N1"];

export const levelDescriptions: Record<JLPTLevel, string> = {
  N5: "First kanji for numbers, days, people, and simple nouns.",
  N4: "Daily-life kanji for directions, actions, feelings, and school.",
  N3: "Intermediate kanji for work, society, movement, and description.",
  N2: "Upper-intermediate kanji for news, essays, and abstract ideas.",
  N1: "Advanced kanji for formal writing, literature, and nuance.",
};

export const kanjiData: Kanji[] = [
  {
    id: 1,
    kanji: "一",
    level: "N5",
    meaning: "one",
    onyomi: ["イチ", "イツ"],
    kunyomi: ["ひと", "ひと.つ"],
    stroke: 1,
    hint: "The first and simplest number.",
    examples: [
      { word: "一つ", reading: "ひとつ", meaning: "one thing" },
      { word: "一月", reading: "いちがつ", meaning: "January" },
    ],
  },
  {
    id: 2,
    kanji: "二",
    level: "N5",
    meaning: "two",
    onyomi: ["ニ"],
    kunyomi: ["ふた", "ふた.つ"],
    stroke: 2,
    hint: "Two horizontal lines.",
    examples: [
      { word: "二人", reading: "ふたり", meaning: "two people" },
      { word: "二月", reading: "にがつ", meaning: "February" },
    ],
  },
  {
    id: 3,
    kanji: "日",
    level: "N5",
    meaning: "day, sun",
    onyomi: ["ニチ", "ジツ"],
    kunyomi: ["ひ", "か"],
    stroke: 4,
    hint: "A sun that became a square.",
    examples: [
      { word: "日本", reading: "にほん", meaning: "Japan" },
      { word: "日曜日", reading: "にちようび", meaning: "Sunday" },
    ],
  },
  {
    id: 4,
    kanji: "人",
    level: "N5",
    meaning: "person",
    onyomi: ["ジン", "ニン"],
    kunyomi: ["ひと"],
    stroke: 2,
    hint: "A person standing with two legs.",
    examples: [
      { word: "人", reading: "ひと", meaning: "person" },
      { word: "学生", reading: "がくせい", meaning: "student" },
    ],
  },
  {
    id: 5,
    kanji: "学",
    level: "N5",
    meaning: "study, learning",
    onyomi: ["ガク"],
    kunyomi: ["まな.ぶ"],
    stroke: 8,
    hint: "Learning under a roof.",
    examples: [
      { word: "学校", reading: "がっこう", meaning: "school" },
      { word: "大学", reading: "だいがく", meaning: "university" },
    ],
  },
  {
    id: 6,
    kanji: "会",
    level: "N4",
    meaning: "meet, association",
    onyomi: ["カイ", "エ"],
    kunyomi: ["あ.う"],
    stroke: 6,
    hint: "People coming together.",
    examples: [
      { word: "会社", reading: "かいしゃ", meaning: "company" },
      { word: "会う", reading: "あう", meaning: "to meet" },
    ],
  },
  {
    id: 7,
    kanji: "何",
    level: "N4",
    meaning: "what",
    onyomi: ["カ"],
    kunyomi: ["なに", "なん"],
    stroke: 7,
    hint: "The question word hiding in many phrases.",
    examples: [
      { word: "何時", reading: "なんじ", meaning: "what time" },
      { word: "何人", reading: "なんにん", meaning: "how many people" },
    ],
  },
  {
    id: 8,
    kanji: "言",
    level: "N4",
    meaning: "say, word",
    onyomi: ["ゲン", "ゴン"],
    kunyomi: ["い.う", "こと"],
    stroke: 7,
    hint: "A mouth with words stacked above it.",
    examples: [
      { word: "言う", reading: "いう", meaning: "to say" },
      { word: "言葉", reading: "ことば", meaning: "word, language" },
    ],
  },
  {
    id: 9,
    kanji: "思",
    level: "N4",
    meaning: "think",
    onyomi: ["シ"],
    kunyomi: ["おも.う"],
    stroke: 9,
    hint: "A field of thoughts over the heart.",
    examples: [
      { word: "思う", reading: "おもう", meaning: "to think" },
      { word: "思い出", reading: "おもいで", meaning: "memory" },
    ],
  },
  {
    id: 10,
    kanji: "歩",
    level: "N4",
    meaning: "walk",
    onyomi: ["ホ", "ブ"],
    kunyomi: ["ある.く", "あゆ.む"],
    stroke: 8,
    hint: "A footstep in motion.",
    examples: [
      { word: "歩く", reading: "あるく", meaning: "to walk" },
      { word: "徒歩", reading: "とほ", meaning: "walking" },
    ],
  },
  {
    id: 11,
    kanji: "働",
    level: "N3",
    meaning: "work",
    onyomi: ["ドウ"],
    kunyomi: ["はたら.く"],
    stroke: 13,
    hint: "A person moving with effort.",
    examples: [
      { word: "働く", reading: "はたらく", meaning: "to work" },
      { word: "労働", reading: "ろうどう", meaning: "labor" },
    ],
  },
  {
    id: 12,
    kanji: "感",
    level: "N3",
    meaning: "feeling, sense",
    onyomi: ["カン"],
    kunyomi: [],
    stroke: 13,
    hint: "Something reaches the heart.",
    examples: [
      { word: "感じる", reading: "かんじる", meaning: "to feel" },
      { word: "感謝", reading: "かんしゃ", meaning: "gratitude" },
    ],
  },
  {
    id: 13,
    kanji: "続",
    level: "N3",
    meaning: "continue",
    onyomi: ["ゾク"],
    kunyomi: ["つづ.く", "つづ.ける"],
    stroke: 13,
    hint: "Threads that keep going.",
    examples: [
      { word: "続く", reading: "つづく", meaning: "to continue" },
      { word: "連続", reading: "れんぞく", meaning: "continuation" },
    ],
  },
  {
    id: 14,
    kanji: "表",
    level: "N3",
    meaning: "surface, express",
    onyomi: ["ヒョウ"],
    kunyomi: ["おもて", "あらわ.す"],
    stroke: 8,
    hint: "What appears on the outside.",
    examples: [
      { word: "表", reading: "おもて", meaning: "front, surface" },
      { word: "発表", reading: "はっぴょう", meaning: "presentation" },
    ],
  },
  {
    id: 15,
    kanji: "調",
    level: "N3",
    meaning: "investigate, tune",
    onyomi: ["チョウ"],
    kunyomi: ["しら.べる", "ととの.う"],
    stroke: 15,
    hint: "Words arranged carefully.",
    examples: [
      { word: "調べる", reading: "しらべる", meaning: "to investigate" },
      { word: "調子", reading: "ちょうし", meaning: "condition, tone" },
    ],
  },
  {
    id: 16,
    kanji: "職",
    level: "N2",
    meaning: "job, profession",
    onyomi: ["ショク"],
    kunyomi: [],
    stroke: 18,
    hint: "A specialized role you listen and speak within.",
    examples: [
      { word: "職業", reading: "しょくぎょう", meaning: "occupation" },
      { word: "就職", reading: "しゅうしょく", meaning: "finding employment" },
    ],
  },
  {
    id: 17,
    kanji: "環",
    level: "N2",
    meaning: "ring, environment",
    onyomi: ["カン"],
    kunyomi: [],
    stroke: 17,
    hint: "Things connected in a circle.",
    examples: [
      { word: "環境", reading: "かんきょう", meaning: "environment" },
      { word: "循環", reading: "じゅんかん", meaning: "circulation" },
    ],
  },
  {
    id: 18,
    kanji: "認",
    level: "N2",
    meaning: "recognize, approve",
    onyomi: ["ニン"],
    kunyomi: ["みと.める"],
    stroke: 14,
    hint: "Words accepted by the heart.",
    examples: [
      { word: "認める", reading: "みとめる", meaning: "to recognize" },
      { word: "確認", reading: "かくにん", meaning: "confirmation" },
    ],
  },
  {
    id: 19,
    kanji: "責",
    level: "N2",
    meaning: "responsibility, blame",
    onyomi: ["セキ"],
    kunyomi: ["せ.める"],
    stroke: 11,
    hint: "A duty that has weight.",
    examples: [
      { word: "責任", reading: "せきにん", meaning: "responsibility" },
      { word: "責める", reading: "せめる", meaning: "to blame" },
    ],
  },
  {
    id: 20,
    kanji: "適",
    level: "N2",
    meaning: "suitable",
    onyomi: ["テキ"],
    kunyomi: ["かな.う"],
    stroke: 14,
    hint: "The right thing in the right place.",
    examples: [
      { word: "適切", reading: "てきせつ", meaning: "appropriate" },
      { word: "適当", reading: "てきとう", meaning: "suitable, casual" },
    ],
  },
  {
    id: 21,
    kanji: "繊",
    level: "N1",
    meaning: "fine, slender",
    onyomi: ["セン"],
    kunyomi: [],
    stroke: 17,
    hint: "Fine threads and delicate detail.",
    examples: [
      { word: "繊細", reading: "せんさい", meaning: "delicate" },
      { word: "繊維", reading: "せんい", meaning: "fiber" },
    ],
  },
  {
    id: 22,
    kanji: "麗",
    level: "N1",
    meaning: "lovely, beautiful",
    onyomi: ["レイ"],
    kunyomi: ["うるわ.しい"],
    stroke: 19,
    hint: "Beauty with formal elegance.",
    examples: [
      { word: "麗しい", reading: "うるわしい", meaning: "beautiful" },
      { word: "華麗", reading: "かれい", meaning: "splendid" },
    ],
  },
  {
    id: 23,
    kanji: "響",
    level: "N1",
    meaning: "echo, resound",
    onyomi: ["キョウ"],
    kunyomi: ["ひび.く"],
    stroke: 20,
    hint: "A sound that reaches outward.",
    examples: [
      { word: "響く", reading: "ひびく", meaning: "to echo" },
      { word: "影響", reading: "えいきょう", meaning: "influence" },
    ],
  },
  {
    id: 24,
    kanji: "躍",
    level: "N1",
    meaning: "leap, active",
    onyomi: ["ヤク"],
    kunyomi: ["おど.る"],
    stroke: 21,
    hint: "Movement that jumps forward.",
    examples: [
      { word: "活躍", reading: "かつやく", meaning: "active success" },
      { word: "飛躍", reading: "ひやく", meaning: "leap, progress" },
    ],
  },
  {
    id: 25,
    kanji: "譲",
    level: "N1",
    meaning: "transfer, yield",
    onyomi: ["ジョウ"],
    kunyomi: ["ゆず.る"],
    stroke: 20,
    hint: "Giving something over through words or agreement.",
    examples: [
      { word: "譲る", reading: "ゆずる", meaning: "to yield" },
      { word: "譲渡", reading: "じょうと", meaning: "transfer" },
    ],
  },
];

export function getKanjiByLevel(level: JLPTLevel | "ALL") {
  if (level === "ALL") {
    return kanjiData;
  }

  return kanjiData.filter((item) => item.level === level);
}

export function getLevelCounts() {
  return jlptLevels.map((level) => ({
    level,
    count: getKanjiByLevel(level).length,
  }));
}
