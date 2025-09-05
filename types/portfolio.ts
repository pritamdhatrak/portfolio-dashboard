export interface Stock {
  id: string
  particulars: string
  purchasePrice: number
  quantity: number
  investment: number
  portfolioPercent: number
  exchange: string
  sector: string
  cmp: number
  presentValue: number
  gainLoss: number
  gainLossPercent: number
  peRatio: number | null
  latestEarnings: string | null
}

export interface SectorData {
  sector: string
  totalInvestment: number
  totalPresentValue: number
  totalGainLoss: number
  stocks: Stock[]
}

export interface PortfolioData {
  stocks: Stock[]
  sectors: SectorData[]
  totalInvestment: number
  totalPresentValue: number
  totalGainLoss: number
}
