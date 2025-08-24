import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import { defaultMetadata } from "@/constants/metadata.constant";

export const metadata = defaultMetadata;

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
    </>
  );
}
