import { Stock, SectorData } from '@/types/portfolio'

export const calculateInvestment = (purchasePrice: number, quantity: number): number => {
  return purchasePrice * quantity
}

export const calculatePresentValue = (cmp: number, quantity: number): number => {
  return cmp * quantity
}

export const calculateGainLoss = (presentValue: number, investment: number): number => {
  return presentValue - investment
}

export const calculateGainLossPercent = (gainLoss: number, investment: number): number => {
  if (investment === 0) return 0
  return (gainLoss / investment) * 100
}

export const calculatePortfolioPercent = (investment: number, totalInvestment: number): number => {
  if (totalInvestment === 0) return 0
  return (investment / totalInvestment) * 100
}

export const groupBySector = (stocks: Stock[]): SectorData[] => {
  const sectorMap = new Map<string, Stock[]>()
  
  stocks.forEach(stock => {
    const sector = stock.sector || 'Others'
    if (!sectorMap.has(sector)) {
      sectorMap.set(sector, [])
    }
    sectorMap.get(sector)!.push(stock)
  })
  
  const sectors: SectorData[] = []
  
  sectorMap.forEach((stocks, sector) => {
    const totalInvestment = stocks.reduce((sum, stock) => sum + stock.investment, 0)
    const totalPresentValue = stocks.reduce((sum, stock) => sum + stock.presentValue, 0)
    const totalGainLoss = totalPresentValue - totalInvestment
    
    sectors.push({
      sector,
      stocks,
      totalInvestment,
      totalPresentValue,
      totalGainLoss
    })
  })
  
  return sectors
}
