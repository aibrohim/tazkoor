export enum Colors {
  muted = "muted",
  primary = "primary",
  pink = "pink",
  success = "success",
  red = "red"
}

export enum ColorValues {
  muted = "#F5F5F5",
  primary = "#FBBE01",
  pink = "#FB617D"
}

export enum Weights {
  regular = 400,
  medium = 500,
  semiBold = 600,
  bold = 700,
}

export interface Language {
  id: number;
  abbreviation: string;
  icon: string;
  title: string;
}

export interface Book {
  isLoading?: boolean;
  id: number;
  title: string;
  language_native: Language;
  language_translate: Language;
  themes_count: number | string | null;
  words_count: number | string | null;
}

export interface Theme {
  id: number;
  title: string;
  words_count?: string;
}

export enum WordRelationType {
  Book = "book",
  Theme = "theme"
}

export enum GameTypes {
  Card = "card",
  Test = "test"
}

export interface Word {
  id: number;
  book: Number;
  partsofspeech: Number;
  theme: Number | null;
  title: string;
  title_translate: string;
}

export interface WordResult extends Word {
  seconds: number;
  isTrue: boolean;
}