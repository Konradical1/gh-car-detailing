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
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">GH Car Detailing</h3>
            <p>Premium auto detailing services for discerning clients.</p>
          </div>
          <div className="w-full md:w-1/2">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>Phone: 513-448-9413</p>
            <p>Email: info@ghcardetailing.com</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-accent transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-6 h-6" />
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
          </div>
          <p>&copy; {new Date().getFullYear()} GH Car Detailing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

