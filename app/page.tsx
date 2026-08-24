import Header from "./components/Header";
import Hero from "./components/Hero";
import UpcomingEvents from "./components/UpcomingEvents";
import ProductsAds from "./components/ProductsAds";
import InfoHub from "./components/InfoHub";
import Partners from "./components/Partners";
import NewsUpdates from "./components/NewsUpdates";
import Footer from "./components/Footer";

export const metadata = {
  title: "Tobgyel Global Expos | Bhutan's Gateway to International Trade & Events",
  description: "Connecting global businesses, investors, innovators, and communities through world-class exhibitions and events in Bhutan.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-slate-900 overflow-x-hidden selection:bg-[#e5a000] selection:text-slate-950">
      <Header />
      <main className="flex-1">
        <Hero />
        <UpcomingEvents from="home" />
        <ProductsAds />
        <InfoHub />
        <Partners />
        <NewsUpdates from="home" />
      </main>
      <Footer />
    </div>
  );
}
