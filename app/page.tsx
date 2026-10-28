import type { Metadata } from "next";
import Journey from "@/components/sections/journey";
import Hero from "@/components/sections/hero";
import Profile from "@/components/sections/profile";
import Capabilities from "@/components/sections/capabilities";
import Missions from "@/components/sections/missions";
import Process from "@/components/sections/process";
import FieldNotes from "@/components/sections/field-notes";
import SecureChannel from "@/components/sections/contact";
import HomeStructuredData from "@/components/structured-data";
export const metadata: Metadata = {
  title: { absolute: "Abdulhaq.it — Software Engineer & IT Geek" },
  alternates: { canonical: "/" },
};
export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <main id="main-content">
        <Hero />
        <Journey />
        <Profile />
        <Capabilities />
        <Missions />
        <Process />
        <FieldNotes />
        <SecureChannel />
      </main>
    </>
  );
}
