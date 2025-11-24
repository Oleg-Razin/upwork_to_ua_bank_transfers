import { NextResponse } from 'next/server';
import type { CoursePb, CourseMono } from '@/app/types/courses';

const ISO_USD = 840;
const ISO_UAH = 980;

async function getPbCourse(): Promise<number | null> {
  try {
    const res = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11', {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Upwork Calculator)',
      },
    });
    
    if (!res.ok) {
      throw new Error(`PrivatBank API error: ${res.status}`);
    }
    
    const data = (await res.json()) as Array<CoursePb>;
    const course = data.find(course => course.ccy === 'USD')?.buy;
    return course ? Number(course) : null;
  } catch (error) {
    console.error('Failed to fetch PrivatBank course:', error);
    return null;
  }
}

async function getMonoCourse(): Promise<number | null> {
  try {
    const res = await fetch('https://api.monobank.ua/bank/currency', {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Upwork Calculator)',
      },
    });
    
    if (!res.ok) {
      throw new Error(`MonoBank API error: ${res.status}`);
    }
    
    const data = (await res.json()) as Array<CourseMono>;
    const course = data.find(course =>
      (course.currencyCodeA === ISO_USD && course.currencyCodeB === ISO_UAH)
    );
    return course?.rateBuy || null;
  } catch (error) {
    console.error('Failed to fetch MonoBank course:', error);
    return null;
  }
}

export async function GET() {
  try {
    // Fetch both rates in parallel
    const [pbRate, monoRate] = await Promise.allSettled([
      getPbCourse(),
      getMonoCourse()
    ]);

    const result = {
      pbUsdBuy: pbRate.status === 'fulfilled' ? pbRate.value : null,
      monoUsdBuy: monoRate.status === 'fulfilled' ? monoRate.value : null,
      timestamp: new Date().toISOString(),
    };

    // Set CORS headers
    const response = NextResponse.json(result);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Exchange rates API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch exchange rates',
        pbUsdBuy: null,
        monoUsdBuy: null,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}