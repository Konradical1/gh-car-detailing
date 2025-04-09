'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const steps = [
  { id: 'personal', label: 'Contact Info' },
  { id: 'address', label: 'Address' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'vehicle', label: 'Vehicle' },
  { id: 'service', label: 'Service' },
  { id: 'review', label: 'Review' },
]

export default function BookingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const currentStep = steps.findIndex(step => pathname.includes(step.id)) + 1

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 mt-8">
            <h1 className="text-4xl font-bold text-center mb-2">Book Your Appointment</h1>
            <p className="text-gray-600 text-center">Complete the steps below to schedule your service</p>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    index + 1 <= currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="mt-2 text-sm font-medium">{step.label}</span>
                </div>
              ))}
              {/* Progress Bar */}
              <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 -z-10">
                <div 
                  className="h-full bg-black transition-all duration-300" 
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-xl p-8 animate-fade-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 