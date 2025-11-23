import Image from "next/image";
import HeroSection from "./Home/HeroSection";
import UpcomingEventsSection from "./Home/UpcomingEventsSection";
import FeaturesSection from "./Home/FeautersSection";

export default function Home() {
  return (
    <div>
      <div>
        <HeroSection></HeroSection>
      </div>
      <div>
        <FeaturesSection></FeaturesSection>
      </div>
      <div>
        <UpcomingEventsSection></UpcomingEventsSection>
      </div>
    </div>
  );
}
