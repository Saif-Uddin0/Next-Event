import Image from "next/image";
import HeroSection from "./Home/HeroSection";
import UpcomingEventsSection from "./Home/UpcomingEventsSection";
import FeaturesSection from "./Home/FeautersSection";
import Testpo from "./Home/Testpo";
import CreateEvent from "./Home/CreateEvent";
import TopEvents from "./Home/TopEvents";

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
        <TopEvents></TopEvents>
      </div>
      <div>
        <Testpo></Testpo>
      </div>
      <div>
        <UpcomingEventsSection></UpcomingEventsSection>
      </div>
      <div>
        <CreateEvent></CreateEvent>
      </div>
    </div>
  );
}
