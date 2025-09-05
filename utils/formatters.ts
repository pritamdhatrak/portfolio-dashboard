export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-IN').format(value)
}

export const getGainLossColor = (value: number): string => {
  if (value > 0) return 'text-green-600'
  if (value < 0) return 'text-red-600'
  return 'text-gray-600'
}

export const getGainLossBgColor = (value: number): string => {
  if (value > 0) return 'bg-green-50'
  if (value < 0) return 'bg-red-50'
  return 'bg-gray-50'
}
