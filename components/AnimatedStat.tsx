'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedStatProps {
  value: number
  label: string
  icon: React.ReactNode
}

export function AnimatedStat({ value, label, icon }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-600">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayValue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-3xl font-bold text-primary"
        >
          {displayValue.toLocaleString()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
} 