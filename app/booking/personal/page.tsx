'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Phone, Mail } from 'lucide-react'

export default function PersonalInfo() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store the data in localStorage for now (in a real app, you'd use a state management solution)
    localStorage.setItem('bookingData', JSON.stringify(formData))
    router.push('/booking/address')
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Your Information</h2>
      <p className="text-gray-600 mb-8">Please provide your contact details so we can reach you about your appointment.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="animate-fade-in delay-100">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              autoComplete="name"
            />
          </div>
        </div>
        
        <div className="animate-fade-in delay-200">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="(123) 456-7890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              autoComplete="tel"
            />
          </div>
        </div>
        
        <div className="animate-fade-in delay-300">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="pt-6 animate-fade-in delay-400">
          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
          >
            Continue to Address
          </button>
        </div>
      </form>
    </div>
  )
} 