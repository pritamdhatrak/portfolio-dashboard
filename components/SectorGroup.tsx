import React, { useState } from 'react'
import { SectorData } from '@/types/portfolio'
import StockRow from './StockRow'
import { formatCurrency, getGainLossColor, getGainLossBgColor } from '@/utils/formatters'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface SectorGroupProps {
  sectorData: SectorData
}

export default function SectorGroup({ sectorData }: SectorGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const gainLossColor = getGainLossColor(sectorData.totalGainLoss)
  const gainLossBgColor = getGainLossBgColor(sectorData.totalGainLoss)
  
  return (
    <>
      <tr 
        className={`${gainLossBgColor} cursor-pointer hover:opacity-90 transition-opacity`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td colSpan={11} className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isExpanded ? (
                <ChevronDownIcon className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              )}
              <span className="font-semibold text-gray-900">{sectorData.sector}</span>
              <span className="text-sm text-gray-600">({sectorData.stocks.length} stocks)</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <span className="text-gray-600">
                Investment: <span className="font-medium text-gray-900">{formatCurrency(sectorData.totalInvestment)}</span>
              </span>
              <span className="text-gray-600">
                Present Value: <span className="font-medium text-gray-900">{formatCurrency(sectorData.totalPresentValue)}</span>
              </span>
              <span className="text-gray-600">
                Gain/Loss: <span className={`font-medium ${gainLossColor}`}>{formatCurrency(sectorData.totalGainLoss)}</span>
              </span>
            </div>
          </div>
        </td>
      </tr>
      {isExpanded && sectorData.stocks.map(stock => (
        <StockRow key={stock.id} stock={stock} />
      ))}
    </>
  )
}
