'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function StatsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    fetch('/api/stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'pageView'
      })
    }).catch(console.error)

    // Track load time
    if (window.performance) {
      const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart
      fetch('/api/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'loadTime',
          value: loadTime
        })
      }).catch(console.error)
    }
  }, [pathname])

  return null
} 