import Link from "next/link"
import { ArrowRight } from "lucide-react"
import VideoBackground from "./VideoBackground"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <VideoBackground />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Premium Auto Detailing
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Experience the finest auto detailing services in Cincinnati. We bring out the best in your vehicle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-6">
          <Link
            href="/booking"
            className="bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-accent/90 transition-colors inline-flex items-center justify-center"
          >
            Book Now <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link
            href="/prices"
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  )
} 