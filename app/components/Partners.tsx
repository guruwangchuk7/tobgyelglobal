"use client";

export default function Partners() {
  const govtPartners = [
    {
      name: "Royal Government of Bhutan",
      image: "/partners/Royal_Government_of_Bhutan.jpg",
    },
    {
      name: "Ministry in Industry, Commerce & Employment",
      image: "/partners/MoICE.jpg",
    },
    {
      name: "Department of Tourism",
      image: "/partners/toursimlogo.png",
    },
    {
      name: "Phuentsholing Thromde",
      image: "/partners/pheuntsholing.png",
    },
    {
      name: "Bhutan Chamber of Commerce & Industry",
      image: "/partners/department_of_chamber.jpg",
    },
  ];

  const corpPartners = [
    { name: "TATA", image: "/partners/Tata.svg", scale: "scale-[1.3] sm:scale-[1.8]" },
    { name: "DHI", image: "/partners/dhi.png", scale: "scale-100" },
    { name: "Bank of Bhutan", image: "/partners/Bank_of_Bhutan_highres.webp", scale: "scale-100" },
    { name: "Drukair", image: "/partners/Drukair.png", scale: "scale-[1.4] sm:scale-[2.0]" },
  ];

  return (
    <section id="partners" className="py-12 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-[#03142A] uppercase font-sans">
            Our Partners
          </h2>
          <div className="w-16 h-1 bg-[#EAA500] mx-auto rounded-full" />
        </div>

        {/* 1. Government Partners */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xs sm:text-sm font-black tracking-widest text-[#03142A] uppercase">
              Government Partners
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-8 items-center justify-items-center">
            {govtPartners.map((p, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center text-center space-y-2 cursor-pointer w-full p-3.5 sm:p-0 rounded-xl bg-slate-50/80 sm:bg-transparent border border-slate-200/60 sm:border-none ${
                  idx === 4 ? "col-span-2 sm:col-span-1 max-w-[220px] sm:max-w-none" : ""
                }`}
              >
                <div className="w-full h-16 sm:h-20 lg:h-24 flex items-center justify-center p-1">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>

                <p className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                  {p.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="w-full border-t border-slate-200/80" />

        {/* 2. Corporate Partners */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xs sm:text-sm font-black tracking-widest text-[#0A4D8C] uppercase">
              Corporate Partners
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8 items-center justify-items-center">
            {corpPartners.map((cp, idx) => (
              <div 
                key={idx} 
                className="w-full h-20 sm:h-16 lg:h-20 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50/80 sm:bg-transparent border border-slate-200/60 sm:border-none cursor-pointer"
              >
                <img 
                  src={cp.image} 
                  alt={cp.name} 
                  className={`max-h-10 sm:max-h-12 lg:max-h-14 w-auto object-contain mix-blend-multiply transition-transform ${cp.scale}`}
                />
                <span className="text-[10px] font-semibold text-slate-500 mt-1 sm:hidden">
                  {cp.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
