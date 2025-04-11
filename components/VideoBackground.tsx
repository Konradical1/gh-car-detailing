'use client'

import { useEffect, useState } from 'react'

export default function VideoBackground() {
  const [videoError, setVideoError] = useState(false)

  return (
    <div className="absolute inset-0 w-full h-full">
      {videoError ? (
        <img
          src="/path/to/your/image.png"
          alt="Detailing Tools"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoError(true)}
        >
          <source src="/videos/detailing-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
} 