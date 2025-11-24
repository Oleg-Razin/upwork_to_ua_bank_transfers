import type { Courses } from "../types/courses";

export async function getExchangeRates(): Promise<Courses> {
  try {
    const res = await fetch('/api/exchange-rates', {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    const data = await res.json();
    return {
      pbUsdBuy: data.pbUsdBuy,
      monoUsdBuy: data.monoUsdBuy,
    };
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return {
      pbUsdBuy: null,
      monoUsdBuy: null,
    };
  }
}

// Keep individual functions for backward compatibility
export async function getPbCourse(): Promise<number | null> {
  const rates = await getExchangeRates();
  return rates.pbUsdBuy;
}

export async function getMonoCourse(): Promise<number | null> {
  const rates = await getExchangeRates();
  return rates.monoUsdBuy;
}