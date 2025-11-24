export type CoursePb = {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
};

export type CourseMono = {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy: number;
  rateSell: number;
};

export type Courses = {
  pbUsdBuy: number | null;
  monoUsdBuy: number | null;
};

export type FeesTypes = {
  name: "payoneer" | "bankTransfer";
  fixed: number;
  percentage?: number;
}