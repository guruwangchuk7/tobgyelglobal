import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import {
  Plane,
  Hotel,
  Car,
  Ticket,
  Bus,
  ExternalLink,
  Phone,
  Mail,
  Utensils,
  AlertTriangle,
  Lock,
  BedDouble,
  BedSingle,
  Sparkles,
  CheckCircle2,
  PackageX,
  Shield,
} from "lucide-react";

export const metadata = {
  title: "Plan Your Visit | Tobgyel Global Expos",
  description: "Travel guide, visa requirements, hotel accommodations at Zeebar Resort Samtse, transport shuttles, and exhibitor goods storage information for attending Tobgyel Global Expos in Bhutan.",
};

export default function VisitPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-[#03142A] font-sans">
      <Header />

      {/* Sub-hero Banner */}
      <section className="bg-[#03142A] text-white py-12 sm:py-16 relative overflow-hidden border-b border-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ backgroundImage: `url('/zeebar-resort.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03142A] via-[#03142A]/90 to-transparent z-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-3 z-10">
          <span className="block text-xs font-extrabold tracking-widest text-[#EAA500] uppercase">
            Travel &amp; Hospitality Guide
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Plan Your Visit
          </h1>
          <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl font-medium leading-relaxed pt-1">
            Everything you need to know about traveling to Bhutan, securing entry visas, booking partner hotels, and navigating Phuentsholing &amp; Thimphu.
          </p>
        </div>
      </section>

      <main className="flex-1 py-10 sm:py-16 space-y-12 sm:space-y-16">
        
        {/* 1. OFFICIAL SPONSORED HOTEL — ZEEBAR RESORT (SAMTSE) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-left">
            
            {/* Header Badge Strip */}
            <div className="bg-[#03142A] px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#EAA500] text-[#03142A] rounded-lg">
                  <Hotel className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#EAA500] block">
                    Official Sponsored Hospitality Partner
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    Zeebar Resort — Samtse, Bhutan
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[#EAA500] text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3-Star Luxury Resort</span>
                </div>
                <a
                  href="https://zeebarresort.bt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EAA500] hover:bg-[#d49400] text-[#03142A] font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <span>zeebarresort.bt</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Resort Hero Feature */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center border-b border-slate-100">
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/9] group">
                  <img
                    src="/samtse-zeebar-top.png"
                    alt="Zeebar Resort Samtse Bhutan Exterior"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 sm:p-6">
                    <p className="text-white text-xs sm:text-sm font-semibold">
                      📍 Gawadrong (Allay Pakha), Samtse, Bhutan — Hilltop Resort with Outdoor Swimming Pool &amp; Mountain Views
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-[#03142A]">
                    Premier Accommodation for Expo Delegates
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Zeebar Resort is Samtse&apos;s first 3-star rated luxury resort, offering traditional Bhutanese architecture seamlessly blended with modern hospitality. Located on a peaceful hilltop overlooking Gawadrong and the Chamarchi border town.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#008E48] shrink-0" />
                    <span>Outdoor Swimming Pool &amp; Scenic Garden Terrace</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#008E48] shrink-0" />
                    <span>In-House Restaurant &amp; Glasshouse Lounge (Karaoke available)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#008E48] shrink-0" />
                    <span>Conference Hall, Business Library &amp; High-Speed Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#008E48] shrink-0" />
                    <span>Dedicated Expo Shuttle Pick-Up Point</span>
                  </div>
                </div>

                {/* Direct Contact */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600">
                  <a href="tel:+97577247777" className="inline-flex items-center gap-1.5 hover:text-[#EAA500] transition-colors">
                    <Phone className="w-3.5 h-3.5 text-[#EAA500]" />
                    <span>+975 77247777 / 5 365 930</span>
                  </a>
                  <a href="mailto:zeebarresort@gmail.com" className="inline-flex items-center gap-1.5 hover:text-[#EAA500] transition-colors">
                    <Mail className="w-3.5 h-3.5 text-[#EAA500]" />
                    <span>zeebarresort@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Official Website CTA Bar */}
            <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-black text-[#03142A]">
                  Reserve Your Stay at Zeebar Resort
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Direct bookings, room availability, special event delegate rates, and room reservations via official portal.
                </p>
              </div>
              <a
                href="https://zeebarresort.bt/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#03142A] hover:bg-[#EAA500] hover:text-[#03142A] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <span>Visit zeebarresort.bt</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* In-House Restaurant & Food Curry Showcase */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] group">
                  <img
                    src="/zeebar-curry-dining.jpg"
                    alt="Zeebar Resort Dining & Bhutanese Curry"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#EAA500] text-[#03142A] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5" /> Gourmet Dining
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-[#EAA500] block">
                  In-House Restaurant &amp; Cuisine
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#03142A]">
                  Authentic Bhutanese Curries &amp; International Dining
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Zeebar Resort features an acclaimed multi-cuisine restaurant serving traditional Bhutanese delicacies (including organic chili &amp; cheese curries like Ema Datshi and spicy chicken/beef curries with Bhutanese red rice), as well as Indian gravy curries, Chinese, and Continental menus.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-700">
                  <div className="p-3 bg-slate-100 rounded-xl">
                    <span className="block text-[#03142A] font-black">Bhutanese Curry Feast</span>
                    <span className="text-[11px] text-slate-500 font-normal">Ema Datshi, Kewa Datshi &amp; Local Red Rice</span>
                  </div>
                  <div className="p-3 bg-slate-100 rounded-xl">
                    <span className="block text-[#03142A] font-black">Multi-Cuisine Menu</span>
                    <span className="text-[11px] text-slate-500 font-normal">Indian Gravies, Chinese Wok &amp; Breakfast</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* 2. TRANSPORT & SHUTTLE SERVICES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-wider text-[#03142A] uppercase font-sans">
              Bus &amp; Transport Services
            </h2>
            <div className="w-12 h-1 bg-[#EAA500] mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
              Seamless transportation, shuttle bus schedules, and private travel options for delegates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Official Expo Shuttle Bus */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-left hover:shadow-md transition-all">
              <div className="p-3 bg-[#03142A] text-[#EAA500] rounded-xl w-fit">
                <Bus className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#03142A]">
                Expo Delegate Shuttle Bus
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Complimentary timed shuttle bus service connecting Zeebar Resort, Samtse Town Center, Phuentsholing border plaza, and the main Expo ground halls throughout the event days.
              </p>
              <div className="pt-2 border-t border-slate-100 text-xs font-bold text-slate-500 space-y-1">
                <div>• Schedule: Every 30 mins (7:30 AM – 9:30 PM)</div>
                <div>• Pick-Up Point: Zeebar Resort Main Lobby</div>
              </div>
            </div>

            {/* Card 2: Airport Transfers */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-left hover:shadow-md transition-all">
              <div className="p-3 bg-[#03142A] text-[#EAA500] rounded-xl w-fit">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#03142A]">
                Paro Airport Pick-Up &amp; Transfer
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Dedicated airport transfer shuttles operating between Paro International Airport (PBH) and hotel partner locations in Phuentsholing and Samtse upon advance flight registration.
              </p>
              <div className="pt-2 border-t border-slate-100 text-xs font-bold text-slate-500 space-y-1">
                <div>• Drukair &amp; Bhutan Airlines Flight Sync</div>
                <div>• Luggage Handling &amp; Delegate Assistance</div>
              </div>
            </div>

            {/* Card 3: Private Taxi & Rental Cars */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-left hover:shadow-md transition-all">
              <div className="p-3 bg-[#03142A] text-[#EAA500] rounded-xl w-fit">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#03142A]">
                Private Chauffeur &amp; Taxi Service
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Chauffeur-driven SUVs, mini-coasters, and licensed taxis available for private B2B site visits, delegation tours, and custom itinerary travel across Bhutan.
              </p>
              <div className="pt-2 border-t border-slate-100 text-xs font-bold text-slate-500 space-y-1">
                <div>• 24/7 On-Call Concierge Desk</div>
                <div>• Licensed Bhutanese Drivers</div>
              </div>
            </div>

          </div>
        </section>


        {/* 3. GOODS CLEARANCE, FREIGHT & PORT STORAGE SECURITY (STATUS: CURRENTLY UNAVAILABLE) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-red-200 shadow-xl overflow-hidden text-left">
            
            {/* Red / Warning Header */}
            <div className="bg-red-950 px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 text-white border-b border-red-900">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-600 text-white rounded-lg">
                  <PackageX className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-red-400 block">
                    Goods &amp; Cargo Freight Facility Notice
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Port Goods Storage Facility
                  </h2>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-md animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                <span>Status: Currently Unavailable</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
              
              {/* Photo of Port with Overlay */}
              <div className="lg:col-span-6 space-y-3">
                <div className="relative rounded-2xl overflow-hidden border-2 border-red-300 shadow-lg aspect-[16/9] group">
                  <img
                    src="/port-goods-storage.jpg"
                    alt="Dry Port Goods Storage Container Facility"
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark Red Warning Overlay */}
                  <div className="absolute inset-0 bg-red-950/80 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="p-3 bg-red-600/90 text-white rounded-full shadow-lg">
                      <Lock className="w-8 h-8" />
                    </div>
                    <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
                      Currently Unavailable
                    </span>
                    <p className="text-red-100 text-xs font-semibold max-w-sm leading-relaxed">
                      Dry Port Container Yard &amp; Cargo Bays are temporarily closed for public exhibitor storage due to security maintenance and capacity limits.
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-red-600 font-bold text-center">
                  ⚠️ Port storage facilities in Samtse &amp; Phuentsholing are currently full / unavailable.
                </p>
              </div>

              {/* Notice & Instructions */}
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-black text-[#03142A] flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    Important Exhibitor Cargo &amp; Storage Guidelines
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Please take note that the official dry port container storage facility and off-site warehouse bays are <strong className="text-red-600">currently unavailable</strong> for advance storage. All registered exhibitors and sponsors carrying display products, machinery, or booth materials must adhere to the following direct delivery protocols:
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                  <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                    <span className="font-extrabold text-amber-900 block flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      Direct Stall Unloading Protocol
                    </span>
                    <p className="text-amber-800 text-xs leading-relaxed">
                      Exhibitors must bring cargo trucks directly to the Expo Hall loading docks during official booth setup hours (8:00 AM – 8:00 PM prior to opening day).
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-extrabold text-[#03142A] block">
                      Customs EX-04 Declaration Assistance
                    </span>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Customs declaration forms (Form EX-04) for duty-free display samples will be processed at the border checkpoint with direct transit clearance to the venue.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* 4. POST-EVENT BHUTAN GUIDED TOUR PACKAGES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-gradient-to-br from-[#03142A] via-[#071F3D] to-[#03142A] text-white rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl space-y-8 relative overflow-hidden">
            
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#EAA500]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
              <div className="space-y-2 max-w-2xl text-left">
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
                  Explore Bhutan After the Event
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  After the events, if willing to tour in Bhutan, we can arrange for sightseeing and guided tours within Bhutan under custom packages. Experience majestic Himalayan dzongs, sacred monasteries, pristine alpine valleys, and authentic cultural hospitality.
                </p>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl border border-amber-400/30 text-center shrink-0 backdrop-blur-sm">
                <span className="text-[10px] font-black text-[#EAA500] uppercase tracking-widest block">CUSTOM ARRANGEMENTS</span>
                <span className="text-sm font-extrabold text-white block mt-0.5">All-Inclusive Tour Packages</span>
              </div>
            </div>

            {/* Tour Package Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 text-left">
              
              {/* Package 1 */}
              <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-700/80 space-y-4 hover:border-[#EAA500]/60 transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-end">
                    <span className="text-xs text-slate-400 font-semibold">Paro &amp; Thimphu</span>
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-[#EAA500] transition-colors">
                    Himalayan Cultural Heritage Tour
                  </h3>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    Visit iconic landmarks including the sacred Taktsang (Tiger&apos;s Nest Monastery), Buddha Dordenma Statue, Punakha Dzong, and authentic Bhutanese cultural shows.
                  </p>
                  <div className="space-y-1.5 pt-2 text-xs text-slate-400 font-medium border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008E48] shrink-0" />
                      <span>Tiger&apos;s Nest Hike &amp; Hot Stone Bath</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008E48] shrink-0" />
                      <span>Licensed English-Speaking Guide &amp; SUV</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">Customizable Itinerary</span>
                  <span className="font-extrabold text-[#EAA500]">Full Package</span>
                </div>
              </div>

              {/* Package 2 */}
              <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-700/80 space-y-4 hover:border-[#EAA500]/60 transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-end">
                    <span className="text-xs text-slate-400 font-semibold">Phobjikha &amp; Punakha</span>
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-[#EAA500] transition-colors">
                    Alpine Valleys &amp; Wildlife Excursion
                  </h3>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    Explore the breathtaking glacial valleys of Phobjikha, Dochula Pass Himalayan panorama (108 chortens), organic farm visits, and birdwatching sanctuaries.
                  </p>
                  <div className="space-y-1.5 pt-2 text-xs text-slate-400 font-medium border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008E48] shrink-0" />
                      <span>Dochula Pass View &amp; Crane Center</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008E48] shrink-0" />
                      <span>Luxury Eco-Lodge Accommodations</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">Scenic Nature Focus</span>
                  <span className="font-extrabold text-[#EAA500]">Full Package</span>
                </div>
              </div>

              {/* Package 3 */}
              <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-700/80 space-y-4 hover:border-[#EAA500]/60 transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-end">
                    <span className="text-xs text-slate-400 font-semibold">All Bhutan Regions</span>
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-[#EAA500] transition-colors">
                    Custom VIP Delegation Tour Package
                  </h3>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    Designed for international trade delegates, corporate sponsors, and VIP visitors. Includes flexible dates, private chauffeur service, SDF visa processing, and curated site visits.
                  </p>
                  <div className="space-y-1.5 pt-2 text-xs text-slate-400 font-medium border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008E48] shrink-0" />
                      <span>SDF Visa &amp; Permit Handling Included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008E48] shrink-0" />
                      <span>Private Chauffeur &amp; Executive Transport</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">Bespoke Itinerary</span>
                  <span className="font-extrabold text-[#EAA500]">VIP Service</span>
                </div>
              </div>

            </div>

            {/* Tour Inquiry Bar */}
            <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 relative z-10">
              <div className="space-y-1 text-left">
                <h4 className="text-base font-black text-white">
                  Interested in Arranging a Bhutan Tour Package?
                </h4>
                <p className="text-xs text-slate-400 font-medium">
                  Contact our concierge team to customize your travel dates, group size, hotel tier, and sightseeing itinerary.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="mailto:info@tobgyelglobalexpos.com?subject=Inquiry%20for%20Post-Expo%20Bhutan%20Tour%20Package"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#EAA500] hover:bg-[#d49400] text-[#03142A] font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  <span>Inquire Tour Packages</span>
                </a>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all border border-slate-700">
                  <Phone className="w-4 h-4 text-[#EAA500]" />
                  <a href="tel:+97517933882" className="hover:text-[#EAA500] transition-colors">+975 17933882</a>
                  <span className="text-slate-500">/</span>
                  <a href="tel:+97577933882" className="hover:text-[#EAA500] transition-colors">+975 77933882</a>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* VISITOR ENTRY PASS CTA */}
        <section className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#03142A] text-white p-8 sm:p-12 rounded-3xl space-y-5 border border-slate-800 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide">
              Ready to Attend Tobgyel Global Expos?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Register now for your official trade visitor badge and entry pass to access all exhibition halls, B2B seminars, and cultural showcases.
            </p>
            <div className="pt-2">
              <Link
                href="/register/visitor"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#008E48] hover:bg-[#00773d] active:bg-[#006031] text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-xl active:scale-[0.99]"
              >
                <Ticket className="w-4 h-4" />
                <span>Get Free Visitor Entry Pass</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

