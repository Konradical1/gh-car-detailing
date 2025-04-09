'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { format, addHours, parseISO } from 'date-fns'

export default function TimeSelection() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [serviceDuration, setServiceDuration] = useState(0)

  useEffect(() => {
    // Load booking data from localStorage
    const bookingData = localStorage.getItem('bookingData')
    if (bookingData) {
      const data = JSON.parse(bookingData)
      setSelectedDate(data.date || '')
      
      // Get service duration based on selected service
      const service = data.service
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

  useEffect(() => {
    if (selectedDate) {
      // Generate available times for the selected date
      const times = []
      const startHour = 9 // 9 AM
      const endHour = 17 // 5 PM
      
      for (let hour = startHour; hour < endHour; hour++) {
        // Check if this time slot would fit within business hours
        const endTime = addHours(new Date(`${selectedDate}T${hour}:00:00`), serviceDuration)
        const endHourValue = endTime.getHours()
        
        // Only add time slots that would complete before closing time
        if (endHourValue <= endHour) {
          const timeString = `${hour}:00`
          times.push(timeString)
        }
      }
      
      setAvailableTimes(times)
    }
  }, [selectedDate, serviceDuration])

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    
    // Calculate end time based on service duration
    const startDateTime = new Date(`${selectedDate}T${time}`)
    const endDateTime = addHours(startDateTime, serviceDuration)
    const endTime = format(endDateTime, 'h:mm a')
    
    // Update booking data in localStorage
    const bookingData = localStorage.getItem('bookingData')
    if (bookingData) {
      const data = JSON.parse(bookingData)
      data.time = time
      data.endTime = endTime
      localStorage.setItem('bookingData', JSON.stringify(data))
    }
    
    // Navigate to the next step
    router.push('/booking/contact')
  }

  const formatTimeDisplay = (time: string) => {
    const [hours] = time.split(':')
    const hour = parseInt(hours)
    return hour < 12 ? `${hour}:00 AM` : `${hour === 12 ? 12 : hour - 12}:00 PM`
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="mb-6">Select Your Time</h1>
        <p className="text-lg text-gray-600 mb-12">
          Choose a convenient time for your appointment. Your service will take approximately {serviceDuration} hours.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="mb-4">Selected Date: {selectedDate ? format(parseISO(selectedDate), 'MMMM d, yyyy') : 'No date selected'}</h2>
          
          {selectedDate && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableTimes.map((time, index) => (
                <motion.button
                  key={time}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-md border text-center transition-all ${
                    selectedTime === time
                      ? 'bg-accent text-white border-accent'
                      : 'border-gray-200 hover:border-accent hover:bg-accent/5'
                  }`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {formatTimeDisplay(time)}
                </motion.button>
              ))}
            </div>
          )}
          
          {selectedDate && availableTimes.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No available time slots for this date. Please select a different date.
            </p>
          )}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => router.push('/booking/date')}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          
          <button
            onClick={() => router.push('/booking/contact')}
            disabled={!selectedTime}
            className={`px-6 py-2 rounded-md transition-colors ${
              selectedTime
                ? 'bg-accent text-white hover:bg-accent/90'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
} 