import Link from "next/link"
import { ArrowRight, Sparkles, Shield, Clock } from "lucide-react"

const services = [
  { 
    title: "Interior Detailing", 
    icon: Sparkles,
    description: "Full interior service including vacuum, sanitizing, window cleaning, shampooing and leather treatment (as needed)"
  },
  { 
    title: "Exterior Detailing", 
    icon: Shield,
    description: "Full exterior wash including paint decontamination, paint shampooing, rim and tire dressing. Add wax for additional fee"
  },
  { 
    title: "Ceramic Coating", 
    icon: Clock,
    description: "5 year ceramic coat, includes a complementary wash. Buffing/Polishing available for additional cost"
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 container mx-auto px-4">
      <h2 className="text-4xl font-milner mb-12 text-center">Our Signature Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="border p-8 rounded-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <service.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h3 className="text-2xl font-milner mb-4">{service.title}</h3>
            <p className="mb-4 text-gray-600">
              {service.description}
            </p>
            <Link href="/prices" className="text-accent font-semibold hover:underline inline-flex items-center">
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
} 