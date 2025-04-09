'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Car, Search, Check } from 'lucide-react'

interface BookingData {
  fullName: string
  phone: string
  email: string
  date?: string
  time?: string
  vehicleMake?: string
  vehicleModel?: string
}

// Common vehicle makes and their models
const vehicleData = {
  'Acura': ['ILX', 'MDX', 'RDX', 'TLX', 'NSX'],
  'Audi': ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron'],
  'BMW': ['2 Series', '3 Series', '4 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7', 'i4', 'iX'],
  'Buick': ['Encore', 'Envision', 'Enclave', 'Regal'],
  'Cadillac': ['CT4', 'CT5', 'XT4', 'XT5', 'XT6', 'Escalade'],
  'Chevrolet': ['Malibu', 'Camaro', 'Corvette', 'Equinox', 'Tahoe', 'Silverado', 'Blazer', 'Traverse'],
  'Chrysler': ['300', 'Pacifica', 'Voyager'],
  'Dodge': ['Challenger', 'Charger', 'Durango', 'Grand Caravan'],
  'Ford': ['F-150', 'Explorer', 'Escape', 'Edge', 'Mustang', 'Bronco', 'Ranger', 'Expedition'],
  'GMC': ['Sierra', 'Acadia', 'Terrain', 'Yukon', 'Canyon'],
  'Honda': ['Accord', 'Civic', 'CR-V', 'HR-V', 'Pilot', 'Odyssey', 'Ridgeline'],
  'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona', 'Venue'],
  'Infiniti': ['Q50', 'Q60', 'QX50', 'QX55', 'QX60', 'QX80'],
  'Jeep': ['Cherokee', 'Compass', 'Grand Cherokee', 'Renegade', 'Wrangler', 'Gladiator'],
  'Kia': ['Forte', 'K5', 'Sorento', 'Sportage', 'Telluride', 'Soul', 'Seltos'],
  'Lexus': ['ES', 'IS', 'LS', 'LC', 'NX', 'RX', 'GX', 'LX', 'UX'],
  'Lincoln': ['Aviator', 'Corsair', 'Navigator', 'Nautilus'],
  'Mazda': ['Mazda3', 'Mazda6', 'CX-30', 'CX-5', 'CX-9', 'MX-30'],
  'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'EQS'],
  'Nissan': ['Altima', 'Maxima', 'Rogue', 'Murano', 'Pathfinder', 'Armada', 'Kicks', 'Frontier'],
  'Porsche': ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
  'Subaru': ['Impreza', 'Legacy', 'Outback', 'Forester', 'Crosstrek', 'Ascent', 'BRZ'],
  'Tesla': ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck'],
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', '4Runner', 'Tacoma', 'Tundra', 'Sienna', 'Prius'],
  'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'ID.4', 'Golf', 'Arteon'],
  'Volvo': ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90']
}

export default function VehicleSelection() {
  const router = useRouter()
  const [makeSearchTerm, setMakeSearchTerm] = useState('')
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [showMakeSuggestions, setShowMakeSuggestions] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData>({
    fullName: '',
    phone: '',
    email: '',
  })
  const makeInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load existing booking data
    const data = localStorage.getItem('bookingData')
    if (data) {
      setBookingData(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (makeInputRef.current && !makeInputRef.current.contains(event.target as Node)) {
        setShowMakeSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMakeSelect = (make: string) => {
    setSelectedMake(make)
    setMakeSearchTerm(make)
    setShowMakeSuggestions(false)
    setSelectedModel('') // Reset model when make changes
  }

  const handleModelSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMake) return

    const updatedData = {
      ...bookingData,
      vehicleMake: selectedMake,
      vehicleModel: selectedModel || undefined, // Only include if selected
    }
    
    localStorage.setItem('bookingData', JSON.stringify(updatedData))
    router.push('/booking/service')
  }

  const handleSkip = () => {
    // Store the current booking data without vehicle information
    localStorage.setItem('bookingData', JSON.stringify(bookingData))
    // Navigate to the service selection page
    router.push('/booking/service')
  }

  const filteredMakes = Object.keys(vehicleData).filter(make => 
    make.toLowerCase().includes(makeSearchTerm.toLowerCase())
  )

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-8 animate-slide-in">Select Your Vehicle</h2>
      <p className="text-gray-600 mb-10 animate-slide-in animate-delay-100">Choose your vehicle make and model.</p>

      <form onSubmit={handleSubmit} className="space-y-16">
        <div className="animate-scale-in">
          <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Make
          </label>
          <div className="relative" ref={makeInputRef}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-accent" />
            </div>
            <input
              type="text"
              id="make"
              required
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder="Type to search for a make (e.g., BMW, Toyota)"
              value={makeSearchTerm}
              onChange={(e) => {
                setMakeSearchTerm(e.target.value)
                setShowMakeSuggestions(true)
              }}
              onFocus={() => setShowMakeSuggestions(true)}
            />
            {showMakeSuggestions && makeSearchTerm && filteredMakes.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-auto animate-scale-in">
                {filteredMakes.slice(0, 3).map((make) => (
                  <div
                    key={make}
                    className="flex items-center justify-between px-4 py-4 hover:bg-gray-100 cursor-pointer hover-lift"
                    onClick={() => handleMakeSelect(make)}
                  >
                    <span>{make}</span>
                    <button
                      type="button"
                      className="text-accent hover:text-accent/80 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMakeSelect(make);
                      }}
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedMake && (
          <div className="animate-scale-in animate-delay-100">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Model
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Car className="h-5 w-5 text-accent" />
              </div>
              <select
                id="model"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none bg-white transition-all"
                value={selectedModel}
                onChange={handleModelSelect}
              >
                <option value="">Select your vehicle model</option>
                {vehicleData[selectedMake as keyof typeof vehicleData].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        )}

        <div className="animate-fade-in animate-delay-200">
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={!selectedMake}
              className={`w-full py-3 px-4 rounded-md transition-all ${
                selectedMake
                  ? 'bg-accent text-white hover:bg-accent/90 hover-scale'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Service Selection
            </button>
            
            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-3 px-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all hover-lift"
            >
              Skip Vehicle Selection
            </button>
          </div>
        </div>
      </form>
    </div>
  )
} 
