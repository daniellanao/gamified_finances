export type TheorySlide = {
  slide_id: number;
  type: "theory";
  title: string;
  content: string;
  image: string;
};

export type QuestionSlide = {
  slide_id: number;
  type: "question";
  title: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
};

export type LevelSlide = TheorySlide | QuestionSlide;

export type LevelData = {
  level_id: string;
  /** Maps to `useJourneyProgress().level` (1–5 journey stages) */
  journey_level: number;
  /** Coins granted when a question slide is answered correctly */
  coins_per_correct?: number;
  title: string;
  description?: string;
  slides: LevelSlide[];
};
