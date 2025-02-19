"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import PairCard from "@/components/PairCard"
import PairModal from "@/components/PairModal"
import { Search } from "lucide-react"

// Mock data for demonstration
const mockPairs = [
  {
    pair: "ETH/USDT",
    price: 1800.5678,
    priceChange: 2.45,
    chartData: Array.from({ length: 24 }, () => Math.random() * 100 + 1700),
    liquidity: 5000000,
    volume: 2000000,
  },
  {
    pair: "BTC/USDT",
    price: 30000.1234,
    priceChange: -1.23,
    chartData: Array.from({ length: 24 }, () => Math.random() * 1000 + 29500),
    liquidity: 10000000,
    volume: 5000000,
  },
  // Add more mock pairs here...
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPair, setSelectedPair] = useState<any>(null)

  const filteredPairs = mockPairs.filter((pair) => pair.pair.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search pairs..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            size={20}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPairs.map((pair) => (
            <PairCard key={pair.pair} {...pair} onCardClick={() => setSelectedPair(pair)} />
          ))}
        </div>
        {selectedPair && <PairModal pair={selectedPair} onClose={() => setSelectedPair(null)} />}
      </div>
    </Layout>
  )
}

