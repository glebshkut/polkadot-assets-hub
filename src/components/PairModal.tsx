"use client"

import type React from "react"

import { useState } from "react"
import { X, Maximize2, Minimize2 } from "lucide-react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface PairModalProps {
  pair: {
    pair: string
    price: number
    priceChange: number
    chartData: number[]
    liquidity: number
    volume: number
  }
  onClose: () => void
}

export default function PairModal({ pair, onClose }: PairModalProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [simulatedAmount, setSimulatedAmount] = useState("")
  const [token1, token2] = pair.pair.split("/")

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { display: true },
      y: { display: true },
    },
  }

  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => i.toString()),
    datasets: [
      {
        label: "Price",
        data: pair.chartData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  const handleSimulation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSimulatedAmount(e.target.value)
    // Implement simulation logic here
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isFullScreen ? "p-0" : "p-4"}`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col ${isFullScreen ? "w-full h-full" : "w-11/12 max-w-6xl max-h-[90vh]"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{pair.pair} Details</h2>
          <div className="flex items-center space-x-2">
            {isFullScreen ? (
              <Minimize2
                className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsFullScreen(false)}
              />
            ) : (
              <Maximize2
                className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsFullScreen(true)}
              />
            )}
            <X
              className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={onClose}
            />
          </div>
        </div>
        <div className="flex-grow overflow-auto p-4 flex">
          <div className="w-[70%] pr-4">
            <div className="h-[80%] mb-4">
              <Line options={chartOptions} data={chartData} />
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pool Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                <div>Total Liquidity: ${pair.liquidity.toLocaleString()}</div>
                <div>24h Volume: ${pair.volume.toLocaleString()}</div>
                <div>Pool Share: 0.3%</div>
                <div>Fee Tier: 0.3%</div>
              </div>
            </div>
          </div>
          <div className="w-[30%] bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Price Impact Simulator</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="token1" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                  {token1} Amount
                </label>
                <input
                  type="number"
                  id="token1"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
                  value={simulatedAmount}
                  onChange={handleSimulation}
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label htmlFor="token2" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                  {token2} Amount
                </label>
                <input
                  type="number"
                  id="token2"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
                  placeholder="Simulated amount"
                  readOnly
                />
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p>Current Price: ${pair.price.toFixed(4)}</p>
                <p>Simulated Price: $0.00</p>
                <p>Price Impact: 0.00%</p>
              </div>
              <button className="w-full bg-primary dark:bg-primary-dark text-white py-2 rounded-md hover:bg-primary-dark dark:hover:bg-primary transition-colors">
                Reset Simulation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

