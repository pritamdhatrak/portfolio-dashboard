import { NextRequest, NextResponse } from 'next/server'
import { fetchStockData } from '@/server/stockFetcher'

export async function POST(request: NextRequest) {
  try {
    const { symbols } = await request.json()
    
    if (!symbols || !Array.isArray(symbols)) {
      return NextResponse.json(
        { error: 'Invalid symbols provided' },
        { status: 400 }
      )
    }
    
    const stockData = await fetchStockData(symbols)
    
    return NextResponse.json(stockData)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
}
