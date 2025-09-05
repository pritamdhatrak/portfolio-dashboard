import { Stock } from '@/types/portfolio'

interface StockApiResponse {
  symbol: string
  cmp: number
  peRatio: number | null
  latestEarnings: string | null
}

const initialPortfolio: Omit<Stock, 'cmp' | 'presentValue' | 'gainLoss' | 'gainLossPercent' | 'peRatio' | 'latestEarnings'>[] = [
  { id: '1', particulars: 'HDFC Bank', purchasePrice: 1450, quantity: 50, investment: 72500, portfolioPercent: 0, exchange: 'HDFCBANK', sector: 'Banking' },
  { id: '2', particulars: 'Reliance Industries', purchasePrice: 2300, quantity: 30, investment: 69000, portfolioPercent: 0, exchange: 'RELIANCE', sector: 'Energy' },
  { id: '3', particulars: 'TCS', purchasePrice: 3200, quantity: 25, investment: 80000, portfolioPercent: 0, exchange: 'TCS', sector: 'Technology' },
  { id: '4', particulars: 'Infosys', purchasePrice: 1400, quantity: 40, investment: 56000, portfolioPercent: 0, exchange: 'INFY', sector: 'Technology' },
  { id: '5', particulars: 'ICICI Bank', purchasePrice: 920, quantity: 60, investment: 55200, portfolioPercent: 0, exchange: 'ICICIBANK', sector: 'Banking' },
  { id: '6', particulars: 'Wipro', purchasePrice: 450, quantity: 100, investment: 45000, portfolioPercent: 0, exchange: 'WIPRO', sector: 'Technology' },
  { id: '7', particulars: 'Asian Paints', purchasePrice: 3100, quantity: 20, investment: 62000, portfolioPercent: 0, exchange: 'ASIANPAINT', sector: 'Consumer' },
  { id: '8', particulars: 'Maruti Suzuki', purchasePrice: 8500, quantity: 10, investment: 85000, portfolioPercent: 0, exchange: 'MARUTI', sector: 'Automobile' },
]

export async function fetchPortfolioData(): Promise<Stock[]> {
  try {
    const response = await fetch('/api/stocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        symbols: initialPortfolio.map(s => s.exchange) 
      })
    })
    
    if (!response.ok) throw new Error('Failed to fetch stock data')
    
    const stockData: StockApiResponse[] = await response.json()
    const totalInvestment = initialPortfolio.reduce((sum, stock) => sum + stock.investment, 0)
    
    return initialPortfolio.map(stock => {
      const data = stockData.find((d) => d.symbol === stock.exchange) || {} as StockApiResponse
      const cmp = data.cmp || (stock.purchasePrice * (1 + (Math.random() - 0.5) * 0.4))
      const presentValue = cmp * stock.quantity
      const gainLoss = presentValue - stock.investment
      const gainLossPercent = (gainLoss / stock.investment) * 100
      const portfolioPercent = (stock.investment / totalInvestment) * 100
      
      return {
        ...stock,
        cmp,
        presentValue,
        gainLoss,
        gainLossPercent,
        portfolioPercent,
        peRatio: data.peRatio || null,
        latestEarnings: data.latestEarnings || null
      }
    })
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    
    const totalInvestment = initialPortfolio.reduce((sum, stock) => sum + stock.investment, 0)
    
    return initialPortfolio.map(stock => {
      const cmp = stock.purchasePrice * (1 + (Math.random() - 0.5) * 0.4)
      const presentValue = cmp * stock.quantity
      const gainLoss = presentValue - stock.investment
      const gainLossPercent = (gainLoss / stock.investment) * 100
      const portfolioPercent = (stock.investment / totalInvestment) * 100
      
      return {
        ...stock,
        cmp,
        presentValue,
        gainLoss,
        gainLossPercent,
        portfolioPercent,
        peRatio: Math.random() * 30 + 10,
        latestEarnings: `Q3 2024: ₹${(Math.random() * 100 + 10).toFixed(2)}`
      }
    })
  }
}
