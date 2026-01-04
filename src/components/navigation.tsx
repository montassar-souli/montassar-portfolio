"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useNavigation } from "@/contexts/NavigationContext";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const { activeItem, setActiveItem } = useNavigation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setClickedItem(href);
    setActiveItem(href);
    
    // Reset clicked animation after delay
    setTimeout(() => {
      setClickedItem(null);
    }, 600);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${scrolled
      ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100"
      : "bg-white shadow-md"
      }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex items-center justify-end md:justify-between h-16 lg:h-20">
          <div className="flex-shrink-0 hidden md:block">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/portfolio_logo-2.png"
                alt="Montassar Portfolio Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 group ${activeItem === item.href
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                    }`}
                >
                  {item.name}
                  
                  {/* Animated underline */}
                  <motion.span 
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: activeItem === item.href || clickedItem === item.href ? 1 : 0 
                    }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0, 0.2, 1],
                      delay: clickedItem === item.href ? 0.1 : 0
                    }}
                    style={{ transformOrigin: 'left center' }}
                  />
                  
                  {/* Hover underline (fallback for non-clicked hovers) */}
                  <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${activeItem !== item.href && clickedItem !== item.href ? "scale-x-0 group-hover:scale-x-100" : "scale-x-0"
                    }`} />
                  
                  {/* Animated background */}
                  <motion.span 
                    className="absolute inset-0 rounded-full bg-blue-50 -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: clickedItem === item.href ? 1 : 0,
                      scale: clickedItem === item.href ? 1 : 0.8
                    }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                  
                  {/* Hover background (fallback) */}
                  <span className="absolute inset-0 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute top-1.5 left-0 w-full h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`} />
                <span className={`absolute top-3 left-0 w-full h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : ""
                  }`} />
                <span className={`absolute top-4.5 left-0 w-full h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 h-full w-full max-w-sm bg-white z-50 md:hidden shadow-2xl"
          >
            <div className="p-6">
              {/* Mobile menu header */}
              <div className="flex items-center justify-end">
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <RxCross1 className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Mobile menu items */}
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        handleNavClick(item.href);
                        closeMenu();
                      }}
                      className={`block px-6 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${activeItem === item.href
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 scale-105"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                    >
                      <span className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-4 transition-all duration-300 ${activeItem === item.href ? "bg-blue-600" : "bg-gray-300"
                          }`} />
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile menu footer */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="text-center text-sm text-gray-500">
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}