'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Shield, Clock, Car, Sun, Droplets, Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface BookingData {
  fullName: string
  phone: string
  email: string
  date?: string
  time?: string
  vehicleMake?: string
  vehicleModel?: string
  service?: string
}

const services = [
  {
    id: 'basic',
    title: 'Basic Detail',
    description: 'Full interior and exterior detail',
    duration: '1-2 hours',
    price: '$179',
    icon: Car,
    features: [
      'Interior vacuum and wipe down',
      'Exterior hand wash',
      'Tire and wheel cleaning',
      'Window cleaning',
      'Air freshener'
    ]
  },
  {
    id: 'deluxe',
    title: 'Deluxe Detail',
    description: 'Full interior and exterior detail + full wax job',
    duration: '2-3 hours',
    price: '$319',
    icon: Sparkles,
    features: [
      'All Basic Detail services',
      'Interior deep cleaning',
      'Full wax job',
      'Tire dressing',
      'Air freshener'
    ]
  },
  {
    id: 'premium',
    title: 'Premium Detail',
    description: 'Full interior and exterior detail + 5 year ceramic coat',
    duration: '3-4 hours',
    price: '$499',
    icon: Droplets,
    features: [
      'All Deluxe Detail services',
      'Paint decontamination',
      '5 year ceramic coating',
      'Interior protectant',
      'Air freshener'
    ]
  },
  {
    id: 'ceramic',
    title: 'Ceramic Coat',
    description: '5 year ceramic coating application',
    duration: '4 hours',
    price: '$399',
    icon: Shield,
    features: [
      'Paint decontamination',
      'Paint correction',
      '5 year ceramic coating',
      'Wheel ceramic coating',
      'Glass ceramic coating'
    ]
  },
  {
    id: 'buff',
    title: 'Buff and Polish',
    description: 'Full buff and polish of whole exterior',
    duration: '5 hours',
    price: '$399',
    icon: Car,
    features: [
      'Paint decontamination',
      'Paint correction',
      'Multi-stage polishing',
      'Paint sealant',
      'Final wax protection'
    ]
  }
]

export default function ServiceSelection() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState('')
  const [bookingData, setBookingData] = useState<BookingData>({
    fullName: '',
    phone: '',
    email: '',
  })

  useEffect(() => {
    // Load existing booking data
    const data = localStorage.getItem('bookingData')
    if (data) {
      setBookingData(JSON.parse(data))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedService) return

    const updatedData = {
      ...bookingData,
      service: selectedService,
    }
    
    localStorage.setItem('bookingData', JSON.stringify(updatedData))
    router.push('/booking/review')
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="mb-6">Choose Your Service</h1>
        <p className="text-lg text-gray-600 mb-12">
          Select the detailing service that best fits your needs.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                selectedService === service.id
                  ? 'border-accent bg-accent/5 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <div className="p-4 md:p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${selectedService === service.id ? 'bg-accent text-white' : 'bg-accent/10 text-accent'}`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">{service.duration}</span>
                      <span className="font-semibold text-accent">{service.price}</span>
                    </div>
                  </div>
                </div>
                
                {selectedService === service.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t"
                  >
                    <h4 className="text-sm mb-2">What's Included:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <Check className="w-4 h-4 text-accent mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!selectedService}
            className={`py-2.5 md:py-3 px-6 md:px-8 rounded-md transition-colors duration-300 text-sm md:text-base font-medium ${
              selectedService
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