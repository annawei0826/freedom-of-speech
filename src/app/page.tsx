import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import ArticleSlider from '@/components/ArticleSlider';
import DataChart from '@/components/DataChart';
import RelatedReading from '@/components/RelatedReading';
import Footer from '@/components/Footer';

export const metadata = {
  title: '言論自由 - 全球新聞自由指數 | 今周刊數位專題',
  description: '深入探討言論自由在當代社會的意義、全球新聞自由現狀及未來發展方向。',
};

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Introduction />
      <ArticleSlider />
      <DataChart />
      <RelatedReading />
      <Footer />
    </>
  );
}