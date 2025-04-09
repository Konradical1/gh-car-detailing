'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Phone, Mail, MapPin } from 'lucide-react'

interface BookingData {
  fullName: string
  phone: string
  email: string
  address: string
  date?: string
  time?: string
  endTime?: string
  vehicleMake?: string
  vehicleModel?: string
  service?: string
}

export default function ContactInfo() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load existing booking data
    const data = localStorage.getItem('bookingData')
    if (data) {
      const parsedData = JSON.parse(data)
      setBookingData({
        ...parsedData,
        address: parsedData.address || '', // Ensure address is initialized
      })
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate required fields
    if (!bookingData.fullName || !bookingData.phone || !bookingData.email || !bookingData.address) {
      setError('Please fill in all required fields')
      return
    }

    // Save to localStorage
    localStorage.setItem('bookingData', JSON.stringify(bookingData))
    router.push('/booking/review')
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6">Contact Information</h1>
          <p className="text-lg text-gray-600 mb-12">
            Please provide your contact details so we can reach you about your appointment.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-white border rounded-lg p-6 md:p-8"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={bookingData.fullName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="(555) 123-4567"
                  required
                  autoComplete="tel"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="john@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Home Address *
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="address"
                  name="address"
                  value={bookingData.address}
                  onChange={handleChange}
                  rows={3}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="Enter your complete address"
                  required
                  autoComplete="street-address"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/booking/service')}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
            >
              Continue
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  )
} 