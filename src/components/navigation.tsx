"use client";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div className="w-full h-fit bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-center p-4 relative text-black">
        {/* Mobile Toggle Button at end */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-fit ml-auto">
          {!isMenuOpen && <RxHamburgerMenu />}
        </button>
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className=" hover:text-blue-600 font-medium px-4 py-2">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 z-10 xl:hidden ${isMenuOpen ? 'opacity-30 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={closeMenu}
        />
        <div
          className={`fixed top-0 left-0 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out p-6
            w-full sm:w-2/5 md:shadow-2xl xl:hidden
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex justify-end items-center">
            <button onClick={() => setIsMenuOpen(false)} className=" hover:text-blue-600">
              <RxCross1 />
            </button>
          </div>
          <ul className="flex flex-col items-center sm:items-start flex-1 space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-blue-600 font-medium text-lg px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
