import Products from '@/components/Products'
import HeroSection from '@/components/HeroSection'
import Promotions from '@/components/Promotions'
import DifferentFromOthers from '@/components/DifferentFromOthers'
import NewsLetter from '@/components/NewsLetter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="' flex flex-col space-y-24 ">
      <HeroSection />
      <Promotions />
      <Products />
      <DifferentFromOthers />
      <NewsLetter/>
      <Footer/>
    </main>
  );
}
