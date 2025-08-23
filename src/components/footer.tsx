import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                MS
              </div>
              <span className="font-semibold text-gray-900">Montassar Souli</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Full-stack developer passionate about creating exceptional digital experiences
              with modern technologies and clean, scalable code.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/projects" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Projects
              </Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Let's Connect</h3>
            <div className="flex items-center space-x-4">
              <Link
                href="mailto:montassar.souli@example.com"
                className="text-gray-500 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                title="Send Email"
              >
                <FaEnvelope className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
              <Link
                href="https://linkedin.com/in/montassar-souli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                title="LinkedIn Profile"
              >
                <FaLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/montassar-souli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                title="GitHub Profile"
              >
                <FaGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
            <p className="text-xs text-gray-500">
              Available for freelance opportunities
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1">
              © {currentYear} Montassar Souli. Made with
              <FaHeart className="h-3 w-3 text-red-500" />
              using Next.js & Tailwind CSS
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}