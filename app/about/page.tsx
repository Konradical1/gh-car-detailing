import Image from "next/image"
import { CheckCircle, Award, Users, Clock } from "lucide-react"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-6 text-accent">About GH Car Detailing</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Elevating the art of auto detailing with precision, passion, and unparalleled attention to detail.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="GH Car Detailing team"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-accent">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2021, GH Car Detailing has been the go-to choice for luxury car owners seeking unparalleled
              detailing services. Our journey began with a passion for perfection and a commitment to elevating the
              standards of auto care.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-accent">Our Commitment</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At GH Car Detailing, we don't just clean cars – we rejuvenate them. Our team of expert detailers is
              dedicated to delivering a level of care and attention that goes beyond the ordinary, ensuring that every
              vehicle we touch leaves our facility looking and feeling brand new.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {[
          {
            icon: Award,
            title: "Expert Detailers",
            description: "Our team consists of certified professionals with years of experience."
          },
          {
            icon: Users,
            title: "Customer Focus",
            description: "We prioritize your satisfaction with personalized service and attention."
          },
          {
            icon: Clock,
            title: "Time Efficient",
            description: "Quick turnaround times without compromising on quality."
          },
          {
            icon: CheckCircle,
            title: "Quality Guaranteed",
            description: "100% satisfaction guaranteed on all our services."
          }
        ].map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <feature.icon className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* The GH Difference Section */}
      <div className="bg-gray-50 rounded-2xl p-12">
        <h2 className="text-3xl font-semibold mb-8 text-center text-accent">The GH Difference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ul className="space-y-4">
            {[
              "Meticulous attention to detail",
              "Use of premium, eco-friendly products",
              "State-of-the-art equipment and techniques",
              "Customized detailing plans",
              "Exceptional customer service",
            ].map((item, index) => (
              <li key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                <CheckCircle className="w-6 h-6 text-accent mr-3 flex-shrink-0" />
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
          <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Detailing process"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

