import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#282834] border-t border-slate-200 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
          
          {/* Column 1: About */}
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[#FAFAFA] tracking-wide">About</h2>
            <ul className="space-y-2 text-[#6A6A75]">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Investors</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Find more on DevLearn</a></li>
            </ul>
          </div>

          {/* Column 2: Discover */}
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[#FAFAFA] tracking-wide">Discover DevLearn</h2>
            <ul className="space-y-2 text-[#6A6A75]">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Get the app</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Teach on DevLearn</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Plans and Pricing</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Affiliate</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Help and Support</a></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[#FAFAFA] tracking-wide">Legal & Accessibility</h2>
            <ul className="space-y-2 text-[#6A6A75]">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Accessibility statement</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Sitemap</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[#FAFAFA] tracking-wide">Contact Us</h2>
            <address className="not-italic space-y-2.5 text-[#6A6A75]">
              <div className="flex items-start gap-2 ">
                <svg className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Green Valley Rd, Portland</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+8801305140844" className="hover:text-blue-600 transition-colors">+880 1305 140844</a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:reactorbro722@gmail.com" className="hover:text-blue-600 transition-colors">reactorbro722@gmail.com</a>
              </div>
            </address>
          </div>

        </div>

        {/* Socials Links*/}
        <div className="pt-8 border-t border-[#494958]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div>
              © 2026 DevLearn Inc. All rights reserved.
            </div>
            <nav className="flex gap-6">
              <a href="#" className="hover:text-slate-900 transition-colors">Github</a>
              <a href="#" className="hover:text-slate-900 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Facebook</a>
            </nav>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
