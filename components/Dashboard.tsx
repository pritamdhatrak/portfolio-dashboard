import React, { useState, useEffect } from 'react'
import { PortfolioData } from '@/types/portfolio'
import { fetchPortfolioData } from '@/lib/stockService'
import { groupBySector } from '@/utils/calculations'
import PortfolioTable from './PortfolioTable'

export default function Dashboard() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const loadPortfolioData = async () => {
    try {
      setError(null)
      const stocks = await fetchPortfolioData()
      const sectors = groupBySector(stocks)
      
      const totalInvestment = stocks.reduce((sum, stock) => sum + stock.investment, 0)
      const totalPresentValue = stocks.reduce((sum, stock) => sum + stock.presentValue, 0)
      const totalGainLoss = totalPresentValue - totalInvestment
      
      setPortfolioData({
        stocks,
        sectors,
        totalInvestment,
        totalPresentValue,
        totalGainLoss
      })
      setLastUpdate(new Date())
    } catch (err) {
      setError('Failed to load portfolio data. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPortfolioData()
    
    const interval = setInterval(() => {
      loadPortfolioData()
    }, 15000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadPortfolioData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!portfolioData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Portfolio Dashboard</h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">Real-time portfolio tracking and analysis</p>
        </div>
        
        <PortfolioTable portfolioData={portfolioData} lastUpdate={lastUpdate} />
      </div>
    </div>
  )
}
