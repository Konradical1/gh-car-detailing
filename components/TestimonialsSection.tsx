import { Star } from "lucide-react"

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

export default function TestimonialsSection() {
  return (
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
  )
} 