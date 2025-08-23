import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import { homePageMetadata } from "@/constants/metadata.constant";

export const metadata = homePageMetadata;

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
    </>
  );
}
