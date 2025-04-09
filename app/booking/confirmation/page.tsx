'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Calendar, Clock, Car, Sparkles, ArrowRight, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

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

export default function Confirmation() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  })

  useEffect(() => {
    // Check if user came from the review page
    const referrer = document.referrer
    if (!referrer.includes('/booking/review')) {
      router.push('/')
      return
    }

    // Load booking data
    const data = localStorage.getItem('bookingData')
    if (data) {
      setBookingData(JSON.parse(data))
    }
  }, [router])

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified'
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy')
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-6">
          <Check className="w-10 h-10 text-accent" />
        </div>
        <h2 className="text-2xl font-bold mb-4 animate-slide-in">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-2 animate-slide-in animate-delay-100">Thank you for booking with GH Car Detailing.</p>
        <p className="text-gray-600 animate-slide-in animate-delay-200">We've sent a confirmation email with your appointment details.</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8 animate-scale-in">
        <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
              <Calendar className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-medium">Date & Time</p>
              <p className="text-sm text-gray-600">
                {formatDate(bookingData.date)} at {bookingData.time}
                {bookingData.endTime ? ` - ${bookingData.endTime}` : ''}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-medium">Service</p>
              <p className="text-sm text-gray-600">{bookingData.service || 'Not specified'}</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
              <Car className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-medium">Vehicle</p>
              <p className="text-sm text-gray-600">
                {bookingData.vehicleMake} {bookingData.vehicleModel}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
              <MapPin className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-medium">Service Location</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">{bookingData.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8 animate-scale-in animate-delay-100">
        <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
              <Calendar className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-medium">Check your email</p>
              <p className="text-sm text-gray-600">We've sent a confirmation email with your appointment details.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
              <Clock className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-medium">Prepare your vehicle</p>
              <p className="text-sm text-gray-600">Make sure your vehicle is ready for the detailing service.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
              <Car className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-medium">Arrive on time</p>
              <p className="text-sm text-gray-600">Please arrive at your scheduled appointment time.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8 animate-scale-in animate-delay-100">
        <h3 className="text-lg font-semibold mb-4">Need to make changes?</h3>
        <p className="text-gray-600 mb-4">If you need to reschedule or cancel your appointment, please contact us at least 24 hours before your scheduled time.</p>
        <div className="flex items-center text-accent font-medium">
          <Phone className="w-4 h-4 mr-2" />
          <span>(555) 123-4567</span>
        </div>
      </div>

      <div className="animate-fade-in animate-delay-200">
        <Link href="/" className="flex items-center justify-center text-accent font-medium hover:text-accent/80 transition-colors">
          Return to Homepage
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  )
} 