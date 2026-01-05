import Navbar from "../components/homepage/Navbar"
import HeroSection from "../components/homepage/Hero"
import MissionSection from "../components/homepage/Mission"
import FeatureSection from "../components/homepage/Feature"
import ServicesSection from "../components/homepage/Services"
import ContactSection from "../components/homepage/Contact"
import Footer from "../components/homepage/Footer"

const Home = () => {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex justify-center py-5">
        <div className="w-full flex flex-col max-w-6xl px-4 sm:px-10">
          <HeroSection />
          <MissionSection />
          <FeatureSection />
          <ServicesSection />
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home