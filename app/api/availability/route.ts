import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

// Path to the data file
const dataFilePath = path.join(process.cwd(), 'data', 'availability.json');

// Ensure the data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
};

// Read the availability data
const readAvailabilityData = (): DayAvailability[] => {
  ensureDataDirectory();
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading availability data:', error);
    return [];
  }
};

// Write the availability data
const writeAvailabilityData = (data: DayAvailability[]) => {
  ensureDataDirectory();
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing availability data:', error);
    return false;
  }
};

// Default time slots for a day
const defaultTimeSlots: TimeSlot[] = [
  { id: '1', startTime: '09:00', endTime: '10:00', isBooked: false },
  { id: '2', startTime: '10:00', endTime: '11:00', isBooked: false },
  { id: '3', startTime: '11:00', endTime: '12:00', isBooked: false },
  { id: '4', startTime: '13:00', endTime: '14:00', isBooked: false },
  { id: '5', startTime: '14:00', endTime: '15:00', isBooked: false },
  { id: '6', startTime: '15:00', endTime: '16:00', isBooked: false },
  { id: '7', startTime: '16:00', endTime: '17:00', isBooked: false },
];

// GET handler to retrieve all availability data
export async function GET() {
  try {
    const data = readAvailabilityData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading availability data:', error);
    return NextResponse.json({ error: 'Failed to read availability data' }, { status: 500 });
  }
}

// POST handler to update availability data
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, isBooked, timeSlots } = body;
    
    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }
    
    const data = readAvailabilityData();
    const existingIndex = data.findIndex(day => day.date === date);
    
    if (existingIndex >= 0) {
      // Update existing day
      data[existingIndex] = {
        ...data[existingIndex],
        isBooked: isBooked !== undefined ? isBooked : data[existingIndex].isBooked,
        timeSlots: timeSlots || data[existingIndex].timeSlots,
      };
    } else {
      // Add new day
      data.push({
        date,
        isBooked: isBooked !== undefined ? isBooked : false,
        timeSlots: timeSlots || defaultTimeSlots,
      });
    }
    
    const success = writeAvailabilityData(data);
    if (!success) {
      return NextResponse.json({ error: 'Failed to write availability data' }, { status: 500 });
    }
    
    // Return the updated data for real-time updates
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating availability data:', error);
    return NextResponse.json({ error: 'Failed to update availability data' }, { status: 500 });
  }
}

// DELETE handler to remove a day's availability
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }
    
    const data = readAvailabilityData();
    const filteredData = data.filter(day => day.date !== date);
    
    const success = writeAvailabilityData(filteredData);
    if (!success) {
      return NextResponse.json({ error: 'Failed to write availability data' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting availability data:', error);
    return NextResponse.json({ error: 'Failed to delete availability data' }, { status: 500 });
  }
} 