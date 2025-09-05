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
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-8">
          <div>
            <p className="text-sm text-gray-600">Total Investment</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(portfolioData.totalInvestment)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Present Value</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(portfolioData.totalPresentValue)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Gain/Loss</p>
            <p className={`text-2xl font-bold ${gainLossColor}`}>
              {formatCurrency(portfolioData.totalGainLoss)}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Last Updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>
      
      <div className="overflow-x-auto shadow-md rounded-lg">
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
    </div>
  )
}
