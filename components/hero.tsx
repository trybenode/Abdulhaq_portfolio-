"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDay(now.toLocaleDateString("en-US", { weekday: "long" }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const downloadCV = () => {};

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="max-w-[700px] text-slate-300"
            >
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm">
                <span>{currentDay}</span> • <span>{currentTime}</span>
              </div>
              <h1 className="text-xl md:text-2xl lg:text-2xl font-bold mb-6 text-center">
                DESIGN • DEVELOP • AUTOMATE •SECURE • INSPIRE 
              </h1>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm font-bold tracking-tighter mb-4"
              >
                prototyping ideas | orchestrating AI | solving frontier Problem | Building the
                Impossible
              </motion.h4>

              <h1 className="text-xl md:text-3xl font-semibold mb-4">
                Hi, I'm Abdulrasheed Olabanji
              </h1>

              <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                IT Guy driven by a deep curiosity and a hands-on approach to
                technology. From writing software and integrating AI to
                tinkering with hardware, IoT, and digital systems—I build,
                break, and fix with purpose. I specialize in digital product
                development, AI integration, and cybersecurity, creating
                innovative solutions that solve real-world problems. As an early
                adopter and lifelong learner, I’m always exploring the edge of
                what's possible in tech.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link href="#contact">Get in Touch</Link>
              </Button>

              <a
                href="/AbdulhaqCv.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <Download size={16} />
                  Download CV
                </Button>
              </a>
            </div>
          </motion.div>

          <div className="relative aspect-square max-w-md mx-auto fade-in-5">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full opacity-10 blur-3xl" />
            <div className="relative overflow-hidden w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-full border-4 border-primary/20 shadow-xl">
              <Image
                src="/profile.JPG"
                alt="Abdulrasheed Olabanji"
                width={300}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link href="#about">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowDown />
              <span className="sr-only">Scroll down</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
