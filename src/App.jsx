import React from 'react'
import CryptoTable from './components/CryptoTable'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className=" font-semibold text-gray-900 text-center text-red-400 text-2xl animate-pulse">
            REAL TIME CRYPTO PRICES TRACKER 
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto">
        <CryptoTable />
      </main>
    </div>
  )
}

export default App
