import dynamic from "next/dynamic";
import type { Metadata } from "next";
import HomeStructuredData from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Abdulrasheed Olabanji builds secure, scalable products using Next.js, React Native, AI, and modern engineering practices.",
  alternates: {
    canonical: "/",
  },
};

const Hero = dynamic(() => import("@/components/hero"));
const About = dynamic(() => import("@/components/about"));
const Skills = dynamic(() => import("@/components/skills"));
const SkillSection = dynamic(() => import("@/components/skillSection"));
const Projects = dynamic(() => import("@/components/projects"));
const Blog = dynamic(() => import("@/components/blog"));
const Contact = dynamic(() => import("@/components/contact"));

export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <SkillSection />
        <Projects />
        <Blog />
        {/* <Contact /> */}
      </main>
    </>
  );
}
