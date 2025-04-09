import Image from "next/image"
import { CheckCircle } from "lucide-react"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-accent">About GH Car Detailing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[400px] md:h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="GH Car Detailing team"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg">
            Founded in 2021, GH Car Detailing has been the go-to choice for luxury car owners seeking unparalleled
            detailing services. Our journey began with a passion for perfection and a commitment to elevating the
            standards of auto care.
          </p>
          <h2 className="text-3xl font-semibold mb-4">Our Commitment</h2>
          <p className="text-lg">
            At GH Car Detailing, we don't just clean cars – we rejuvenate them. Our team of expert detailers is
            dedicated to delivering a level of care and attention that goes beyond the ordinary, ensuring that every
            vehicle we touch leaves our facility looking and feeling brand new.
          </p>
          <h2 className="text-3xl font-semibold mb-4">The GH Difference</h2>
          <ul className="space-y-2">
            {[
              "Meticulous attention to detail",
              "Use of premium, eco-friendly products",
              "State-of-the-art equipment and techniques",
              "Customized detailing plans",
              "Exceptional customer service",
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="w-6 h-6 text-accent mr-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

