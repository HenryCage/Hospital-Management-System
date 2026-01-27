import Header from './Header'
import HeroSection from './Hero';
import Stats from './StatsGrid';
import DashboardHeader from '../../dashboard/header';

export default function Body () {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-[1200px] mx-auto p-8 flex flex-col gap-8">
        <DashboardHeader name="Receptionist" />
        <HeroSection />
        <Stats />
      </div>
    </main>
  );
}