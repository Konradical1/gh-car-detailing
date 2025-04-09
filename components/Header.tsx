"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Prices', href: '/prices' },
  { name: 'Blog', href: '/blog' },
  { name: 'Booking', href: '/booking' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBookingClick = async () => {
    try {
      await fetch('/api/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'bookingClick' }),
      })
    } catch (error) {
      console.error('Error tracking booking click:', error)
    }
  }

  return (
    <header className={`bg-white shadow-md fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          GH<span className="text-accent">.</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm uppercase tracking-wider hover:text-accent transition-colors ${
                item.name === 'Booking' ? 'font-bold' : ''
              }`}
              onClick={item.name === 'Booking' ? handleBookingClick : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="text-accent w-6 h-6" /> : <Menu className="text-accent w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-3 px-2 text-sm uppercase tracking-wider hover:bg-gray-50 rounded-md transition-colors ${
                    item.name === 'Booking' ? 'font-bold text-accent' : ''
                  }`}
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (item.name === 'Booking') {
                      handleBookingClick()
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

