import React from 'react';

// Using direct SVG paths ensures logos NEVER fail to load or get blocked
const PARTNERS = [
  {
    name: 'Envato',
    svg: (
      <svg className="h-7 fill-current text-gray-700" viewBox="0 0 120 30">
        <path d="M15 5c-5 0-9 4-9 9 0 7 9 16 9 16s9-9 9-16c0-5-4-9-9-9zm0 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
        <text x="32" y="20" className="font-bold text-xl fill-current">envato</text>
      </svg>
    ),
  },
  {
    name: 'Dribbble',
    svg: (
      <svg className="h-7 fill-current text-gray-700" viewBox="0 0 140 30">
        <text x="5" y="22" className="font-bold text-2xl tracking-tighter italic fill-current">dribbble</text>
      </svg>
    ),
  },
  {
    name: 'Behance',
    highlighted: true,
    svg: (
      <svg className="h-7 fill-current text-gray-900" viewBox="0 0 140 30">
        <text x="5" y="22" className="font-extrabold text-2xl tracking-tight fill-current">Bēhance</text>
      </svg>
    ),
  },
  {
    name: 'Slack',
    svg: (
      <svg className="h-7 fill-current text-gray-700" viewBox="0 0 120 30">
        <text x="5" y="22" className="font-black text-2xl fill-current"># slack</text>
      </svg>
    ),
  },
  {
    name: 'Udemy',
    svg: (
      <svg className="h-7 fill-current text-gray-700" viewBox="0 0 120 30">
        <text x="5" y="22" className="font-bold text-2xl fill-current text-[#A435F0]">ûdemy</text>
      </svg>
    ),
  },
];

export default function PartnersSlider() {
  const doublePartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="bg-[#EFEFF7] py-12 max-w-7xl mx-auto font-['Plus_Jakarta_Sans'] overflow-hidden mb-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#2B2B36] tracking-tight">
            Trusted by our awesome partners
          </h2>
        </div>

        {/* Continuous Slider Wrapper */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient Fades for Left & Right Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Animated Track */}
          <div className="flex w-max gap-6 animate-marquee">
            {doublePartners.map((partner, index) => (
              <div
                key={index}
                className={`flex items-center justify-center h-20 px-8 rounded-2xl min-w-[160px] transition-all ${
                  partner.highlighted
                    ? 'bg-white shadow-md border border-gray-100'
                    : 'bg-gray-50 opacity-70 hover:opacity-100'
                }`}
              >
                {partner.svg}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}