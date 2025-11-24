import { CoursePb, CourseMono } from "../types/courses";

const ISO_USD = 840;
const ISO_UAH = 980;

export async function getPbCourse(): Promise<number | undefined> {
  const res = await fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11`, {
    next: { revalidate: 60 },
  });
  const data = (await res.json()) as Array<CoursePb>;
  const course = data.find(course => course.ccy === 'USD')?.buy;
  return Number(course);
}

export async function getMonoCourse(): Promise<number | undefined> {
  const res = await fetch(`https://api.monobank.ua/bank/currency`, {
    next: { revalidate: 60 },
  });

  const data = (await res.json()) as Array<CourseMono>;
  const course = data.find(course =>
    (course.currencyCodeA === ISO_USD && course.currencyCodeB === ISO_UAH)
  );
  return course?.rateBuy;
}