import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#9AB3A5] text-white py-8 mt-10">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Logo and About */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Trekkora</h2>
          <p className="text-sm">
            Discover, explore, and experience thrilling adventures with Trekkora. Your journey to the wild begins here.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/explore" className="hover:underline">Explore</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-gray-300"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-gray-300"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-gray-300"><FaTwitter size={20} /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-white/80">
        &copy; {new Date().getFullYear()} Trekkora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
