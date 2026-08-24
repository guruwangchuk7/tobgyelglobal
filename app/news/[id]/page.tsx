import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";
import Link from "next/link";
import { Calendar, UserCheck, Ticket } from "lucide-react";
import { notFound } from "next/navigation";

export const metadata = {
  title: "News Article | Tobgyel Global Expos",
  description: "Official press release and news update from Tobgyel Global Expos in Bhutan.",
};

const newsDatabase = [
  {
    id: "1",
    title: "BIN Trade Showcase 2027 Registration Now Open",
    date: "May 15, 2024",
    category: "Press Release | Trade & Commerce",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Official registration for the BIN Trade Showcase 2027 is officially open to domestic and international exhibitors.",
    content: [
      "Official registration for the BIN Trade Showcase 2027 is officially open to domestic and international exhibitors. The landmark trade fair will take place in Phuentsholing, Bhutan, bringing together over 300 participating enterprises across construction, green energy, technology, tourism, and organic agriculture.",
      "Exhibitors registering during the early-bird phase receive prime booth allocations inside the main pavilion, complimentary inclusion in the official exhibition catalog, and full access to our B2B matchmaking portal.",
      "The event is organized under the patronage of the Royal Government of Bhutan and supported by the Ministry of Industry, Commerce & Employment (MoICE). Delegates from India, Bangladesh, Nepal, Thailand, and East Asia are expected to participate.",
    ],
  },
  {
    id: "2",
    title: "New International Partnerships Announced",
    date: "May 10, 2024",
    category: "Global Alliances | Economic Growth",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Tobgyel Global Expos formalizes strategic alliances with regional chambers of commerce and international trade federations.",
    content: [
      "Tobgyel Global Expos has formalized strategic partnerships with regional commerce chambers, including the Bhutan Chamber of Commerce & Industry (BCCI) and South Asian trade federations.",
      "These bilateral agreements facilitate expedited visa processing for foreign delegates, tax exemption assistance for exhibition display samples, and dedicated transport logistics via Drukair and Bhutan Airlines.",
      "By establishing direct connections between international investors and domestic Bhutanese entrepreneurs, Tobgyel Global Expos continues to position Bhutan as a sustainable trade nexus in South Asia.",
    ],
  },
  {
    id: "3",
    title: "Bhutan: The Next Hub for Business & Investment",
    date: "May 5, 2024",
    category: "Market Insights | Investment",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Strategic trade infrastructure and eco-conscious policies position Bhutan as a prime destination for sustainable investments.",
    content: [
      "Positioned strategically at the crossroads of South and East Asia, Bhutan is rapidly expanding its sustainable trade infrastructure.",
      "With the visionary development of the Gelephu Mindful City Special Administrative Region (SAR) and the Phuentsholing dry port expansion, international investors have unprecedented access to renewable energy projects, organic agribusiness, eco-tourism, and digital technology ventures.",
      "Tobgyel Global Expos provides the ideal platform for foreign companies to gain first-mover advantage in Bhutan's high-growth green economy.",
    ],
  },
];

export function generateStaticParams() {
  return newsDatabase.map((item) => ({
    id: item.id,
  }));
}

export default async function NewsDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;
  const article = newsDatabase.find((n) => n.id === id);

  if (!article) {
    notFound();
  }

  const isFromHome = from === "home";
  const backHref = isFromHome ? "/#news" : "/news";
  const backText = isFromHome ? "Back to Home" : "Back to All News";

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <Header />

      {/* Hero Banner */}
      <section className="bg-[#03142A] text-white py-12 sm:py-16 relative overflow-hidden border-b border-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url('${article.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03142A] via-[#03142A]/90 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4 z-10">
          <BackButton fallbackHref={backHref} label={backText} />

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans leading-tight">
              {article.title}
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 font-medium pt-1 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#EAA500]" />
              <span>Published: {article.date}</span>
            </div>
            <span>•</span>
            <span>Official Press Release</span>
          </div>
        </div>
      </section>

      {/* Main Article Body */}
      <main className="flex-1 py-12 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-md space-y-6 text-left">
            <p className="text-base sm:text-lg font-bold text-[#03142A] leading-relaxed border-l-4 border-[#EAA500] pl-4">
              {article.excerpt}
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">Media &amp; Press Contact</p>
              <p>Tobgyel Global Expos Press Bureau • Phuentsholing, Bhutan</p>
              <p>Email: <a href="mailto:info@tobgyelglobalxpos.com" className="text-[#0A4D8C] font-semibold underline">info@tobgyelglobalxpos.com</a></p>
            </div>
          </div>

          {/* Registration CTAs Callout */}
          <div className="bg-[#03142A] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <h3 className="text-lg font-black uppercase text-white">Join Tobgyel Global Expos 2027</h3>
              <p className="text-xs text-slate-300">Book exhibition booth space or request visitor entry clearance.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/register/exhibitor"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#D49900] hover:bg-[#bd8800] text-white text-xs font-extrabold uppercase tracking-wider min-h-[44px]"
              >
                <UserCheck className="w-4 h-4" />
                <span>Register Exhibitor</span>
              </Link>
              <Link
                href="/register/visitor"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#008E48] hover:bg-[#00773d] text-white text-xs font-extrabold uppercase tracking-wider min-h-[44px]"
              >
                <Ticket className="w-4 h-4" />
                <span>Visitor Pass</span>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
