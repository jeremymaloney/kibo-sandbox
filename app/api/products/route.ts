import { NextResponse } from 'next/server';
import products from '@/data/products.json';

// This simulates a real API endpoint
export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({
    success: true,
    data: products
  });
}