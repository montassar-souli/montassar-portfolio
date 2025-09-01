'use client'

import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight, FaCode, FaHeart } from "react-icons/fa"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function Footer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "montassar.souli@example.com",
      href: "mailto:montassar.souli@example.com",
      color: "text-blue-600"
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+216 XX XXX XXX",
      href: "tel:+216XXXXXXX",
      color: "text-green-600"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Tunisia",
      href: "#",
      color: "text-purple-600"
    }
  ]

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/montassar-souli",
      icon: FaGithub,
      color: "hover:bg-gray-900 hover:text-white",
      followers: "50+"
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/montassar-souli",
      icon: FaLinkedin,
      color: "hover:bg-blue-600 hover:text-white",
      followers: "500+"
    }
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Resume", href: "/resume.pdf" }
  ]

  const services = [
    "Full Stack Development",
    "React & Next.js Apps",
    "Backend APIs",
    "Database Design",
    "UI/UX Implementation"
  ]

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 mb-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <FaCode className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Montassar Souli</h3>
                    <p className="text-blue-400 text-sm">Full Stack Developer</p>
                  </div>
                </motion.div>

                <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                  Passionate about creating exceptional digital experiences with modern technologies.
                  I help businesses build scalable web applications that drive real results.
                </p>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Start a Project</span>
                    <FaArrowRight className="text-sm" />
                  </Link>
                </motion.div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={contact.href}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
                    >
                      <div className={`p-2 rounded-lg bg-gray-800 ${contact.color} group-hover:scale-110 transition-transform`}>
                        <contact.icon className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">{contact.label}</p>
                        <p className="font-medium">{contact.value}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <nav className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-6 text-white">Services</h4>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">{service}</span>
                  </motion.div>
                ))}
              </div>

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 p-4 bg-green-900/30 border border-green-500/30 rounded-xl"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-semibold">Available for new projects</span>
                </div>
                <p className="text-green-300 text-xs mt-1">Typically responds within 24 hours</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="py-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div>
              <h4 className="text-lg font-semibold mb-4">Let&apos;s Connect</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 p-4 bg-gray-800 rounded-xl border border-gray-700 transition-all duration-300 ${social.color} group`}
                    >
                      <social.icon className="text-xl" />
                      <div className="text-left">
                        <p className="font-semibold text-sm">{social.name}</p>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300">{social.followers} connections</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-4">Get notified about new projects and articles</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
          className="py-6 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>© {mounted ? new Date().getFullYear() : '2024'} Montassar Souli. Crafted with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <FaHeart className="text-red-500 mx-1" />
              </motion.div>
              <span>and lots of coffee ☕</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <span>Made in Tunisia 🇹🇳</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}