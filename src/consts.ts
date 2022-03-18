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

export interface Book {
  id: number;
  title: string;
  language_native: {
    abbreviation: string;
    flag: string;
    id: number;
    name: string;
  };
  language_translate: {
    abbreviation: string;
    flag: string;
    id: number;
    name: string;
  };
  themes_count: number;
  words_count: number;
}

export interface Theme {
  id: number;
  title: string;
  words_count?: string;
}

export interface Language {
  id: number;
  abbreviation: string;
  icon: string;
  title: string;
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