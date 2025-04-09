import Image from "next/image"

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
]

export default function Gallery() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8 text-center text-accent">Our Work</h1>
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
    </div>
  )
}

