'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { format, parseISO, startOfDay, addDays } from 'date-fns'

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface DayAvailability {
  date: string;
  isBooked: boolean;
  timeSlots: TimeSlot[];
}

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

export default function Schedule() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  })
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [availabilityData, setAvailabilityData] = useState<DayAvailability[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [serviceDuration, setServiceDuration] = useState(0)

  // Fetch availability data
  useEffect(() => {
    const fetchAvailabilityData = async () => {
      try {
        const response = await fetch('/api/availability');
        if (!response.ok) {
          throw new Error('Failed to fetch availability data');
        }
        const data = await response.json();
        setAvailabilityData(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load availability data');
        setIsLoading(false);
        console.error(err);
      }
    };

    fetchAvailabilityData();
  }, []);

  useEffect(() => {
    // Load existing booking data
    const data = localStorage.getItem('bookingData')
    if (data) {
      const parsedData = JSON.parse(data)
      setBookingData(parsedData)
      if (parsedData.date) setSelectedDate(parsedData.date)
      if (parsedData.time) setSelectedTime(parsedData.time)
      
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

  const handleDateSelect = (date: string) => {
    // Add one day to compensate for timezone offset
    const selectedDateObj = new Date(date);
    selectedDateObj.setDate(selectedDateObj.getDate() + 1);
    setSelectedDate(format(selectedDateObj, 'yyyy-MM-dd'));
    setSelectedTime(''); // Reset time when date changes
  }

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    if (timeSlot.isBooked) return;
    
    // Store only the start time
    setSelectedTime(timeSlot.startTime);
    
    // Calculate end time based on service duration
    const startHour = parseInt(timeSlot.startTime.split(':')[0]);
    const isPM = timeSlot.startTime.includes('PM');
    let endHour = startHour + serviceDuration;
    
    // Adjust for PM/AM
    if (isPM && endHour > 12) {
      endHour -= 12;
    }
    
    // Format end time
    const endTime = `${endHour}:00 ${isPM ? 'PM' : 'AM'}`;
    
    // Update booking data
    const updatedData = {
      ...bookingData,
      date: selectedDate,
      time: timeSlot.startTime,
      endTime: endTime,
    }
    
    localStorage.setItem('bookingData', JSON.stringify(updatedData))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return

    const updatedData = {
      ...bookingData,
      date: selectedDate,
      time: selectedTime,
    }
    
    localStorage.setItem('bookingData', JSON.stringify(updatedData))
    router.push('/booking/vehicle')
  }

  // Calendar helpers
  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateAvailable = (date: Date) => {
    // Check if the date is in the availability data and not booked
    const dateString = format(date, 'yyyy-MM-dd')
    const dayData = availabilityData.find(day => day.date === dateString)
    
    // If the date is not in the data, it's available
    if (!dayData) return true
    
    // If the date is in the data but not booked, it's available
    return !dayData.isBooked
  }

  const isToday = (date: Date) => {
    const today = startOfDay(new Date())
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear()
  }

  const isSelected = (date: Date) => {
    if (!selectedDate) return false
    const dateString = format(date, 'yyyy-MM-dd')
    return dateString === selectedDate
  }

  const formatDate = (date: Date) => {
    return format(date, 'EEEE, MMMM d, yyyy')
  }

  const prevMonth = () => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentMonth(newDate)
  }

  const nextMonth = () => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentMonth(newDate)
  }

  // Get available time slots for the selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return []
    
    const dayData = availabilityData.find(day => day.date === selectedDate)
    
    // If the date is not in the data, show all time slots as available
    if (!dayData) {
      return [
        { id: '1', startTime: '9:00 AM', endTime: '10:00 AM', isBooked: false },
        { id: '2', startTime: '10:00 AM', endTime: '11:00 AM', isBooked: false },
        { id: '3', startTime: '11:00 AM', endTime: '12:00 PM', isBooked: false },
        { id: '4', startTime: '12:00 PM', endTime: '1:00 PM', isBooked: false },
        { id: '5', startTime: '1:00 PM', endTime: '2:00 PM', isBooked: false },
        { id: '6', startTime: '2:00 PM', endTime: '3:00 PM', isBooked: false },
        { id: '7', startTime: '3:00 PM', endTime: '4:00 PM', isBooked: false },
        { id: '8', startTime: '4:00 PM', endTime: '5:00 PM', isBooked: false }
      ]
    }
    
    // If the date is in the data, use its time slots
    return dayData.timeSlots
  }

  // Generate calendar days
  const renderCalendarDays = () => {
    const days = []
    const totalDays = daysInMonth(currentMonth)
    const firstDay = firstDayOfMonth(currentMonth)
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 w-12 flex items-center justify-center"></div>)
    }
    
    // Add cells for each day of the month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      const dateString = format(date, 'yyyy-MM-dd')
      const available = isDateAvailable(date)
      const today = isToday(date)
      const selected = isSelected(date)
      
      days.push(
        <div 
          key={i} 
          className={`h-12 w-12 flex items-center justify-center rounded-full cursor-pointer transition-all ${
            available 
              ? selected 
                ? 'bg-accent text-white' 
                : today 
                  ? 'border-2 border-accent text-accent' 
                  : 'hover:bg-accent/10'
              : 'text-gray-300 cursor-not-allowed'
          }`}
          onClick={() => available && handleDateSelect(dateString)}
        >
          {i}
        </div>
      )
    }
    
    return days
  }

  // Format the selected date for display
  const formattedSelectedDate = selectedDate 
    ? format(addDays(new Date(selectedDate), 1), 'EEEE, MMMM d, yyyy') 
    : '';

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-8 animate-slide-in">Schedule Your Appointment</h2>
      <p className="text-gray-600 mb-10 animate-slide-in animate-delay-100">Select a date and time for your appointment.</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="animate-scale-in">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex space-x-2">
                <button 
                  type="button" 
                  onClick={prevMonth}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  type="button" 
                  onClick={nextMonth}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>
          </div>
          
          {selectedDate && (
            <div className="mt-4 text-sm text-gray-600">
              Selected: {formattedSelectedDate}
            </div>
          )}
        </div>
        
        {selectedDate && (
          <div className="animate-scale-in animate-delay-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {getAvailableTimeSlots().map((timeSlot) => (
                <button
                  key={timeSlot.id}
                  type="button"
                  className={`p-3 rounded-md border text-center transition-all ${
                    selectedTime === timeSlot.startTime
                      ? 'bg-accent text-white border-accent'
                      : timeSlot.isBooked
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'border-gray-200 hover:border-accent hover:bg-accent/5'
                  }`}
                  onClick={() => handleTimeSelect(timeSlot)}
                  disabled={timeSlot.isBooked}
                >
                  {timeSlot.startTime}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => router.push('/booking/service')}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          
          <button
            type="submit"
            disabled={!selectedDate || !selectedTime}
            className={`px-6 py-2 rounded-md transition-colors ${
              selectedDate && selectedTime
                ? 'bg-accent text-white hover:bg-accent/90'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  )
} 