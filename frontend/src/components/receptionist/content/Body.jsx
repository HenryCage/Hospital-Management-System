import Header from './Header'
import HeroSection from './Hero';
import Stats from './StatsGrid';

export default function Body () {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-[1200px] mx-auto p-8 flex flex-col gap-8">
        <Header />
        <HeroSection />
        <Stats />
      </div>
    </main>
  );
}