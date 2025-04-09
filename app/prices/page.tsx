import React from 'react'
import { Car, Shield, Sparkles, Droplets, Crown, Wand2, Check } from 'lucide-react'
import Link from 'next/link'

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
    icon: Crown,
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
    icon: Wand2,
    features: [
      'Paint decontamination',
      'Paint correction',
      'Multi-stage polishing',
      'Paint sealant',
      'Final wax protection'
    ]
  }
]

export default function Prices() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-8 text-center text-accent">Our Services & Pricing</h1>
      <p className="text-gray-600 mb-8 md:mb-12 text-center max-w-2xl mx-auto px-4">
        We offer a range of detailing services to keep your vehicle looking its best. All our services use premium products and techniques to ensure the highest quality results.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-primary">
                  {React.createElement(service.icon, { className: "w-7 h-7 md:w-8 md:h-8" })}
                </div>
                <h3 className="text-lg md:text-xl font-semibold">{service.title}</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base">{service.description}</p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-xl md:text-2xl font-bold text-accent">{service.price}</span>
                <span className="text-gray-500 text-sm md:text-base">• {service.duration}</span>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-sm md:text-base mb-2">What's Included:</h4>
                <ul className="space-y-1 md:space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm md:text-base">
                      <Check className="w-4 h-4 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="p-4 md:p-6 pt-0 bg-gray-50">
              <Link 
                href="/booking/service" 
                className="block w-full py-2.5 md:py-3 px-4 rounded-md bg-accent text-white text-center hover:bg-accent/90 transition-all hover:scale-[1.02] text-sm md:text-base font-medium"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 md:mt-16 bg-gray-50 rounded-lg p-6 md:p-8 text-center">
        <h2 className="text-xl md:text-2xl font-sprintura mb-3 md:mb-4">Need a Custom Package?</h2>
        <p className="text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
          We understand that every vehicle is unique. Contact us to discuss your specific needs and we'll create a custom detailing package just for you.
        </p>
        <Link 
          href="/contact" 
          className="inline-block py-2.5 md:py-3 px-5 md:px-6 rounded-md bg-accent text-white hover:bg-accent/90 transition-all hover:scale-[1.02] text-sm md:text-base font-medium"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}

