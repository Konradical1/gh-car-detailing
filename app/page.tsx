'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, Shield, Clock, Users, Search, CheckCircle, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    comment: 'The best detailing service I\'ve ever used. My car looks brand new!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    comment: 'Professional, thorough, and attention to detail. Highly recommend!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Michael Brown',
    comment: 'They transformed my old car into looking like it just came off the lot.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Emily Davis',
    comment: 'Fast service and amazing results. Will definitely be coming back.',
    rating: 4,
  },
  {
    id: 5,
    name: 'David Wilson',
    comment: 'The ceramic coating they applied has protected my paint for months.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    comment: 'Friendly staff and exceptional service. My car has never looked better.',
    rating: 5,
  },
]

const galleryImages = [
  { 
    src: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    alt: "Before and after interior detailing" 
  },
  { 
    src: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    alt: "Exterior detailing result" 
  },
  { 
    src: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    alt: "Ceramic coating application" 
  },
  { 
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    alt: "Engine bay cleaning" 
  },
  { 
    src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    alt: "Wheel detailing" 
  },
  { 
    src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    alt: "Paint correction process" 
  },
  { 
    src: "/images/our-work/IMG_4468.jpeg", 
    alt: "Car Exterior" 
  },
  { 
    src: "/images/our-work/IMG_4470.jpeg", 
    alt: "Car Interior" 
  },
]

export default function Home() {
  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute w-[200%] h-full left-[-50%] z-0">
          <iframe
            src="https://www.youtube.com/embed/Hjnn6ec7fWM?autoplay=1&loop=1&playlist=Hjnn6ec7fWM&t=0&mute=1&playsinline=1&controls=0&showinfo=0&autohide=1&allowfullscreen=true&mode=transparent&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1&origin=http://localhost:3000"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="eager"
            style={{ 
              border: 'none',
              pointerEvents: 'none',
              transform: 'scale(1.5)',
              transformOrigin: 'center center'
            }}
            onError={(e) => {
              console.error('Video failed to load:', e);
              // You might want to show a fallback image or message here
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 text-center text-white">
          <h1 className="text-6xl font-sprintura mb-4 animate-fade-in">Elevate Your Ride</h1>
          <p className="text-xl mb-8 animate-fade-in delay-200">Experience Unparalleled Auto Detailing</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              className="bg-accent text-white px-8 py-3 rounded-md hover:bg-accent/90 transition-all hover-scale"
            >
              Get Started
            </Link>
            <button 
              onClick={() => {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-accent border border-accent px-8 py-3 rounded-md hover:bg-accent/10 transition-all hover-scale"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-milner mb-12 text-center">Our Signature Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
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
          ].map((service, index) => (
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

      <section className="py-20 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-milner mb-8 text-center text-accent">Why Choose GH Car Detailing?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Expert Technicians", 
                description: "Our team is highly trained and experienced.",
                icon: "Users"
              },
              { 
                title: "Premium Products", 
                description: "We use only the best detailing products available.",
                icon: "Sparkles"
              },
              { 
                title: "Attention to Detail", 
                description: "No spot is overlooked in our thorough process.",
                icon: "Search"
              },
              {
                title: "Satisfaction Guaranteed",
                description: "We're not happy until you're thrilled with the results.",
                icon: "CheckCircle"
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-300 p-6 rounded-lg hover:bg-gray-400 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  {item.icon === "Users" && <Users className="w-6 h-6 text-accent" />}
                  {item.icon === "Sparkles" && <Sparkles className="w-6 h-6 text-accent" />}
                  {item.icon === "Search" && <Search className="w-6 h-6 text-accent" />}
                  {item.icon === "CheckCircle" && <CheckCircle className="w-6 h-6 text-accent" />}
                </div>
                <h3 className="text-xl font-milner mb-2">{item.title}</h3>
                <p className="text-gray-800">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-milner mb-8 text-center text-accent">Our Work</h2>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Browse through our portfolio of completed detailing projects. Each image showcases our commitment to quality and attention to detail.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-all hover-lift">
              <div className="relative h-64">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-milner mb-8 text-center text-accent">What Our Clients Say</h2>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our detailing services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg border hover:shadow-lg transition-all hover-lift">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-accent' : 'text-gray-300'
                      }`}
                      fill={i < testimonial.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <p className="font-medium text-right">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12 mt-20">
          <h2 className="text-4xl font-milner mb-4">Ready to Transform Your Vehicle?</h2>
          <p className="text-xl mb-8">Book your appointment today and experience the GH difference.</p>
          <Link 
            href="/booking" 
            className="bg-accent text-white px-8 py-3 rounded-md hover:bg-accent/90 transition-all hover-scale"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

