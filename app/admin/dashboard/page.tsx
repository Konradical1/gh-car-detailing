'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format, parseISO, addDays, startOfDay } from 'date-fns';
import { Users, Clock, MousePointerClick, CheckCircle } from 'lucide-react';
import Cookies from 'js-cookie';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { AnimatedStat } from '@/components/AnimatedStat';

// Define the data structure
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

interface WebsiteStats {
  pageViews: number;
  bookingClicks: number;
  completedBookings: number;
  avgLoadTime: number;
  lastUpdated: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [stats, setStats] = useState<WebsiteStats>({
    pageViews: 0,
    bookingClicks: 0,
    completedBookings: 0,
    avgLoadTime: 0,
    lastUpdated: new Date().toISOString()
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfDay(new Date()));
  const [availabilityData, setAvailabilityData] = useState<DayAvailability[]>([]);
  const [selectedDayData, setSelectedDayData] = useState<DayAvailability | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('admin_authenticated') === 'true';
      setIsAuthenticated(isAuth);
      if (isAuth) {
        fetchAvailability();
        fetchStats();
      }
    };

    checkAuth();
    // Set up polling for stats every 5 seconds
    const statsInterval = setInterval(fetchStats, 5000);
    return () => clearInterval(statsInterval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchAvailability = async () => {
    try {
      const response = await fetch('/api/availability');
      if (response.ok) {
        const data = await response.json();
        setAvailability(data);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  // Fetch availability data on component mount
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

  // Update selected day data when selected date changes
  useEffect(() => {
    if (selectedDate) {
      // Format the date in YYYY-MM-DD format for comparison
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const dayData = availabilityData.find((day: DayAvailability) => day.date === dateStr);
      setSelectedDayData(dayData || null);
    }
  }, [selectedDate, availabilityData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      fetchAvailability();
      fetchStats();
    } else {
      toast.error('Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Use start of day to avoid timezone issues
      setSelectedDate(startOfDay(date));
    } else {
      setSelectedDate(undefined);
    }
  };

  const toggleDateAvailability = async (date: Date) => {
    if (!date) return;
    
    // Format the date in YYYY-MM-DD format
    const dateStr = format(date, 'yyyy-MM-dd');
    const existingDay = availabilityData.find((day: DayAvailability) => day.date === dateStr);
    const isBooked = existingDay ? !existingDay.isBooked : true;
    
    try {
      const response = await fetch('/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: dateStr,
          isBooked,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update availability');
      }
      
      // Get the updated data from the response
      const updatedData = await response.json();
      setAvailabilityData(updatedData);
      
      // Update selected day data
      if (selectedDate && format(selectedDate, 'yyyy-MM-dd') === dateStr) {
        const updatedDayData = updatedData.find((day: DayAvailability) => day.date === dateStr);
        setSelectedDayData(updatedDayData || null);
      }
    } catch (err) {
      setError('Failed to update availability');
      console.error(err);
    }
  };

  const toggleTimeSlotAvailability = async (slotId: string) => {
    if (!selectedDate || !selectedDayData) return;
    
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const updatedTimeSlots = selectedDayData.timeSlots.map(slot => 
      slot.id === slotId ? { ...slot, isBooked: !slot.isBooked } : slot
    );
    
    try {
      const response = await fetch('/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: dateStr,
          timeSlots: updatedTimeSlots,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update time slots');
      }
      
      // Get the updated data from the response
      const updatedData = await response.json();
      setAvailabilityData(updatedData);
      
      // Update selected day data
      if (selectedDate && format(selectedDate, 'yyyy-MM-dd') === dateStr) {
        const updatedDayData = updatedData.find((day: DayAvailability) => day.date === dateStr);
        setSelectedDayData(updatedDayData || null);
      }
    } catch (err) {
      setError('Failed to update time slots');
      console.error(err);
    }
  };

  // Get booked dates for the calendar
  const bookedDates = availabilityData
    .filter(day => day.isBooked)
    .map(day => parseISO(day.date));

  // Format the selected date for display
  const formattedSelectedDate = selectedDate 
    ? format(selectedDate, 'EEEE, MMMM d, yyyy') 
    : '';

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedStat
            value={stats.pageViews}
            label="Total Page Views"
            icon={<Users className="w-6 h-6" />}
          />
          <AnimatedStat
            value={stats.bookingClicks}
            label="Booking Clicks"
            icon={<MousePointerClick className="w-6 h-6" />}
          />
          <AnimatedStat
            value={stats.completedBookings}
            label="Completed Bookings"
            icon={<CheckCircle className="w-6 h-6" />}
          />
          <AnimatedStat
            value={Math.round(stats.avgLoadTime * 100) / 100}
            label="Avg Load Time (ms)"
            icon={<Clock className="w-6 h-6" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Availability Calendar</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              modifiers={{
                booked: bookedDates,
              }}
              modifiersStyles={{
                booked: { backgroundColor: 'rgb(239 68 68)', color: 'white' },
              }}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Manage Availability</h2>
            {isLoading ? (
              <p>Loading availability data...</p>
            ) : selectedDate ? (
              <div className="space-y-4">
                <p className="text-lg">
                  Selected Date: {formattedSelectedDate}
                </p>
                <Button
                  onClick={() => toggleDateAvailability(selectedDate)}
                  className="w-full mb-6"
                  variant={selectedDayData?.isBooked ? 'destructive' : 'default'}
                >
                  {selectedDayData?.isBooked
                    ? 'Mark as Available'
                    : 'Mark as Booked'}
                </Button>

                <h3 className="text-lg font-medium mb-2">Time Slots</h3>
                <div className="space-y-2">
                  {selectedDayData?.timeSlots.length ? (
                    selectedDayData.timeSlots.map(slot => (
                      <div 
                        key={slot.id} 
                        className={`p-3 border rounded-md flex justify-between items-center ${
                          slot.isBooked ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                        }`}
                      >
                        <span>{slot.startTime} - {slot.endTime}</span>
                        <Button
                          onClick={() => toggleTimeSlotAvailability(slot.id)}
                          variant={slot.isBooked ? 'destructive' : 'default'}
                          size="sm"
                        >
                          {slot.isBooked ? 'Mark Available' : 'Mark Booked'}
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p>No time slots available for this date.</p>
                  )}
                </div>
              </div>
            ) : (
              <p>Select a date to manage availability.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 