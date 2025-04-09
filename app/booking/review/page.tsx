'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { format, addHours } from 'date-fns'
import { User, Phone, Mail, Calendar, Clock, Car, Sparkles, Check, MapPin } from 'lucide-react'

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

export default function ReviewBooking() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [serviceDuration, setServiceDuration] = useState(0)

  useEffect(() => {
    // Load existing booking data
    const data = localStorage.getItem('bookingData')
    if (data) {
      const parsedData = JSON.parse(data)
      setBookingData(parsedData)
      
      // Get service duration based on selected service
      const service = parsedData.service
      if (service) {
        switch (service) {
          case 'Basic Detail':
            setServiceDuration(2) // 1-2 hours, use 2 for safety
            break
          case 'Deluxe Detail':
            setServiceDuration(3) // 2-3 hours, use 3 for safety
            break
          case 'Premium Detail':
            setServiceDuration(4) // 3-4 hours, use 4 for safety
            break
          case 'Ceramic Coat':
            setServiceDuration(4) // 4 hours
            break
          case 'Buff and Polish':
            setServiceDuration(5) // 5 hours
            break
          default:
            setServiceDuration(2) // Default to 2 hours
        }
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Calculate end time if not already set
      if (bookingData.time && !bookingData.endTime) {
        try {
          // Parse the time string (e.g., "11:00 AM")
          const [time, period] = bookingData.time.split(' ')
          const [hours, minutes] = time.split(':')
          let hour = parseInt(hours)
          
          // Convert to 24-hour format
          if (period === 'PM' && hour !== 12) {
            hour += 12
          } else if (period === 'AM' && hour === 12) {
            hour = 0
          }
          
          // Create a date object for today with the parsed time
          const now = new Date()
          const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, parseInt(minutes))
          const endTime = addHours(startTime, serviceDuration)
          const formattedEndTime = format(endTime, 'h:mm a')
          
          const updatedData = {
            ...bookingData,
            endTime: formattedEndTime
          }
          
          setBookingData(updatedData)
          localStorage.setItem('bookingData', JSON.stringify(updatedData))
        } catch (error) {
          console.error('Error calculating end time:', error)
          // Continue with the submission even if end time calculation fails
        }
      }

      // Send email notification
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingData,
          timeRange: `${bookingData.time} - ${bookingData.endTime || calculateEndTime()}`,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send booking confirmation')
      }

      setIsSuccess(true)
      setTimeout(() => {
        router.push('/booking/confirmation')
      }, 2000)
    } catch (error) {
      console.error('Error submitting booking:', error)
      setError('Failed to submit booking. Please try again.')
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified'
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy')
  }

  const formatTimeDisplay = (time?: string) => {
    if (!time) return 'Not specified'
    return time
  }

  // Calculate end time for display
  const calculateEndTime = () => {
    if (!bookingData.time) return 'Not specified'
    
    if (bookingData.endTime) return bookingData.endTime
    
    try {
      // Parse the time string (e.g., "11:00 AM")
      const [time, period] = bookingData.time.split(' ')
      const [hours, minutes] = time.split(':')
      let hour = parseInt(hours)
      
      // Convert to 24-hour format
      if (period === 'PM' && hour !== 12) {
        hour += 12
      } else if (period === 'AM' && hour === 12) {
        hour = 0
      }
      
      // Create a date object for today with the parsed time
      const now = new Date()
      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, parseInt(minutes))
      const endTime = addHours(startTime, serviceDuration)
      
      return format(endTime, 'h:mm a')
    } catch (error) {
      console.error('Error calculating end time:', error)
      return 'Not specified'
    }
  }

  if (isSuccess) {
    return (
      <div className="animate-fade-in text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
          <Check className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-8">Your appointment has been successfully scheduled.</p>
        <p className="text-sm text-gray-500">Redirecting to confirmation page...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6">Review Your Booking</h1>
          <p className="text-lg text-gray-600 mb-12">
            Please review your booking details below before confirming.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="bg-white border rounded-lg p-6 md:p-8 mb-8">
          <h2 className="mb-6">Booking Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Service Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500">Service</p>
                  <p className="font-medium">{bookingData.service || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">
                    {formatDate(bookingData.date)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Time</p>
                  <p className="font-medium">
                    {bookingData.time ? `${formatTimeDisplay(bookingData.time)} - ${calculateEndTime()}` : 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Vehicle Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500">Make</p>
                  <p className="font-medium">{bookingData.vehicleMake || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Model</p>
                  <p className="font-medium">{bookingData.vehicleModel || 'Not specified'}</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium">{bookingData.fullName || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">{bookingData.phone || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{bookingData.email || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Address</p>
                  <p className="font-medium whitespace-pre-line">{bookingData.address || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => router.push('/booking/contact')}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Back
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-md transition-colors ${
              isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-accent text-white hover:bg-accent/90'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  )
} 