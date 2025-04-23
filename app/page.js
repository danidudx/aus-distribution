import {
  Hero,
  Logos,
  Environments,
  Services,
  HowItWorks,
  Choosing,
  Team,
  Review,
  Faq,
} from "@/components";

export const metadata = {
  title: "AusiWipe - Professional Cleaning Services",
  description:
    "Professional cleaning services in Australia. Book your home, office, or commercial space cleaning with AusiWipe for a spotless environment.",
  keywords:
    "cleaning services, home cleaning, office cleaning, commercial cleaning, Australia cleaning services.",
  openGraph: {
    title: "AusiWipe - Professional Cleaning Services",
    description:
      "Professional cleaning services in Australia. Book your home, office, or commercial space cleaning.",
    type: "website",
    locale: "en_AU",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Logos />
      <Environments />
      <Services />
      <HowItWorks />
      <Choosing />
      <Review />
      <Team />
      <Faq />
    </main>
  );
}
