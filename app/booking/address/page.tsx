'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin } from 'lucide-react'

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

export default function AddressInfo() {
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
        address: parsedData.address || '',
      })
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate required fields
    if (!bookingData.address) {
      setError('Please provide your address')
      return
    }

    // Save to localStorage
    localStorage.setItem('bookingData', JSON.stringify(bookingData))
    router.push('/booking/schedule')
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6">Service Address</h1>
          <p className="text-lg text-gray-600 mb-12">
            Please provide the address where you would like the service to be performed.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 md:p-8">
          <div className="space-y-6">
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
                  rows={4}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="Enter your complete address including street, city, state, and zip code"
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Please provide a detailed address where our service will be performed.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/booking/personal')}
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
        </form>
      </div>
    </div>
  )
} 