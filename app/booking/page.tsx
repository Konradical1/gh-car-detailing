'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BookingPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the personal page
    router.push('/booking/personal')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to booking form...</h1>
        <p className="text-gray-600">Please wait while we redirect you to the booking form.</p>
      </div>
    </div>
  )
} 