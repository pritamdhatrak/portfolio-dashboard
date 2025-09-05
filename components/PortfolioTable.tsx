import React from 'react'
import { PortfolioData } from '@/types/portfolio'
import SectorGroup from './SectorGroup'
import { formatCurrency, getGainLossColor } from '@/utils/formatters'

interface PortfolioTableProps {
  portfolioData: PortfolioData
  lastUpdate: Date
}

export default function PortfolioTable({ portfolioData, lastUpdate }: PortfolioTableProps) {
  const gainLossColor = getGainLossColor(portfolioData.totalGainLoss)
  
  return (
    <div className="w-full">
      {/* Summary Cards - Mobile Friendly */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Investment</p>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{formatCurrency(portfolioData.totalInvestment)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Present Value</p>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{formatCurrency(portfolioData.totalPresentValue)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Gain/Loss</p>
          <p className={`text-xl md:text-2xl font-bold ${gainLossColor}`}>
            {formatCurrency(portfolioData.totalGainLoss)}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Portfolio Holdings</h2>
        <div className="text-xs md:text-sm text-gray-500">
          Last Updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Particulars</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Purchase Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Qty</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Investment</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Portfolio %</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">NSE/BSE</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">CMP</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Present Value</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Gain/Loss</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">P/E Ratio</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Latest Earnings</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {portfolioData.sectors.map(sector => (
              <SectorGroup key={sector.sector} sectorData={sector} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {portfolioData.sectors.map(sector => (
          <div key={sector.sector} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 border-b">
              <h3 className="font-semibold text-gray-900">{sector.sector}</h3>
              <p className="text-sm text-gray-600">{sector.stocks.length} stocks</p>
            </div>
            <div className="divide-y divide-gray-200">
              {sector.stocks.map(stock => (
                <div key={stock.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{stock.particulars}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{stock.exchange}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Investment:</span>
                      <span className="ml-1 font-medium">{formatCurrency(stock.investment)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">CMP:</span>
                      <span className="ml-1 font-medium">{formatCurrency(stock.cmp)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Present Value:</span>
                      <span className="ml-1 font-medium">{formatCurrency(stock.presentValue)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Gain/Loss:</span>
                      <span className={`ml-1 font-medium ${getGainLossColor(stock.gainLoss)}`}>
                        {formatCurrency(stock.gainLoss)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
