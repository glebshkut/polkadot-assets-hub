"use client"

import { useState } from "react"
import Image from "next/image"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

interface PairCardProps {
  pair: string
  price: number
  priceChange: number
  chartData: number[]
  liquidity: number
  volume: number
  onCardClick: () => void
}

export default function PairCard({
  pair,
  price,
  priceChange,
  chartData,
  liquidity,
  volume,
  onCardClick,
}: PairCardProps) {
  const [token1, token2] = pair.split("/")
  const [isHovered, setIsHovered] = useState(false)

  const formatNumber = (num: number) => {
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`
    return `$${num.toFixed(2)}`
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      tooltip: {
        enabled: isHovered,
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context: any) => `Price: $${context.parsed.y.toFixed(4)}`,
        },
      },
    },
    elements: {
      point: { radius: 0 },
      line: { tension: 0.4 },
    },
  }

  const chartData_processed = {
    labels: Array.from({ length: 24 }, (_, i) => i.toString()),
    datasets: [
      {
        data: chartData,
        borderColor: priceChange >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)",
        borderWidth: isHovered ? 2 : 1,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 60)
          gradient.addColorStop(0, priceChange >= 0 ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)")
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
          return gradient
        },
      },
    ],
  }

  return (
    <div
      className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <Image src={`/placeholder.svg?text=${token1}`} alt={token1} width={24} height={24} className="rounded-full" />
          <Image src={`/placeholder.svg?text=${token2}`} alt={token2} width={24} height={24} className="rounded-full" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{pair}</span>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900 dark:text-white font-mono">${price.toFixed(4)}</div>
          <div className={`text-sm font-semibold ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
            {priceChange >= 0 ? "+" : ""}
            {priceChange.toFixed(2)}%{priceChange >= 0 ? "↑" : "↓"}
          </div>
        </div>
      </div>
      <div className="h-[60px] mb-2">
        <Line data={chartData_processed} options={chartOptions} />
      </div>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 font-mono">
        <div>TVL: {formatNumber(liquidity)}</div>
        <div>24h Vol: {formatNumber(volume)}</div>
      </div>
    </div>
  )
}

