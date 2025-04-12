'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="p-4 md:px-12 lg:mx-[105px] flex items-center justify-between shadow-md mt-6 relative z-50 bg-white">
      {/* Logo */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={40}
          className="object-contain"
        />

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:flex items-center gap-10 text-base lg:text-lg font-medium text-gray-700">
        <Link href="/home" className="hover:text-red-600 transition">Home</Link>
        <a href="#services" className="hover:text-red-600 transition">Services</a>
        <Link href="/features" className="hover:text-red-600 transition">Features</Link>
        <a href="#testi" className="hover:text-red-600 transition">Testimonials</a>
      </nav>

      {/* CTA Button (Desktop) */}
      <div className="hidden md:flex">
        <button className="w-[160px] lg:w-[201px] h-[44px] lg:h-[49px] rounded-full bg-[#CF2121] text-white font-bold text-sm lg:text-lg hover:bg-red-700 transition">
          Get a Demo
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white shadow-lg p-6 md:hidden z-40">
          <ul className="flex flex-col gap-4 text-gray-800 text-base font-medium">
            <li><Link href="/home" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            <li><a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a></li>
            <li><Link href="/features" onClick={() => setIsMobileMenuOpen(false)}>Features</Link></li>
            <li><a href="#testi" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a></li>
          </ul>
          <button
            className="w-full mt-4 bg-[#CF2121] text-white font-bold py-3 rounded-full text-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get a Demo
          </button>
        </div>
      )}
    </header>
  );
}
