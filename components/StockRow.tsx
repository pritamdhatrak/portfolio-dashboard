import React from 'react'
import { Stock } from '@/types/portfolio'
import { formatCurrency, formatPercent, getGainLossColor } from '@/utils/formatters'

interface StockRowProps {
  stock: Stock
}

export default function StockRow({ stock }: StockRowProps) {
  const gainLossColor = getGainLossColor(stock.gainLoss)
  
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{stock.particulars}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatCurrency(stock.purchasePrice)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{stock.quantity}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatCurrency(stock.investment)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatPercent(stock.portfolioPercent)}</td>
      <td className="px-4 py-3 text-sm font-medium text-blue-600">{stock.exchange}</td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(stock.cmp)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatCurrency(stock.presentValue)}</td>
      <td className={`px-4 py-3 text-sm font-medium ${gainLossColor}`}>
        {formatCurrency(stock.gainLoss)}
        <span className="text-xs ml-1">({formatPercent(stock.gainLossPercent)})</span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{stock.peRatio?.toFixed(2) || 'N/A'}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{stock.latestEarnings || 'N/A'}</td>
    </tr>
  )
}
