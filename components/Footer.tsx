import Link from "next/link"
import { Instagram } from "lucide-react"

// Custom TikTok icon component with more accurate representation
const TikTokIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16.5 5.5C15.5 4.5 15 3 15 1.5h-3.5v12c0 1.5-1 2.5-2.5 2.5S6.5 15 6.5 13.5 7.5 11 9 11c0.5 0 1 0.2 1.5 0.5V9C10.5 8.5 10 8 9.5 8 8 8 6.5 9.5 6.5 11s1.5 3 3 3c1.5 0 2.5-1 2.5-2.5V7.5c1.5 0 3 0.5 4 1.5V5.5z" />
  </svg>
)

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold">GH Car Detailing</h3>
            <span className="text-gray-400">|</span>
            <p className="text-sm">Premium auto detailing services</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Phone:</span>
              <a href="tel:513-448-9413" className="text-sm hover:text-accent transition-colors">513-448-9413</a>
            </div>
            <span className="text-gray-400">|</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">Email:</span>
              <a href="mailto:info@ghcardetailing.com" className="text-sm hover:text-accent transition-colors">info@ghcardetailing.com</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-accent transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-accent transition-colors"
              aria-label="Follow us on TikTok"
            >
              <TikTokIcon />
            </a>
            <span className="text-gray-400">|</span>
            <p className="text-sm">&copy; {new Date().getFullYear()} GH Car Detailing</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

