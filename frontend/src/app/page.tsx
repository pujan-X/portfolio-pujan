"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { GithubActivity } from "@/components/sections/GithubActivity";
import { Contact } from "@/components/sections/Contact";

const PageLoader = dynamic(
  () => import("@/components/ui/PageLoader").then(m => m.PageLoader),
  { ssr: false }
);

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [skipLoader, setSkipLoader] = useState(false);

  useEffect(() => {
    // If already shown this session, skip loader immediately
    const shown = sessionStorage.getItem("loader-shown");
    if (shown) {
      setLoaderDone(true);
      setSkipLoader(true);
    }
  }, []);

  return (
    <>
      {!skipLoader && (
        <PageLoader onComplete={() => setLoaderDone(true)} />
      )}

      {/* Main content with generous vertical rhythm */}
      <div
        className="flex flex-col"
        style={{
          opacity: loaderDone || skipLoader ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {/* Hero takes full viewport */}
        <Hero />

        {/* Remaining sections with generous spacing */}
        <div className="flex flex-col gap-32 md:gap-48 py-24 md:py-32">
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <GithubActivity />
          <Contact />
        </div>
      </div>
    </>
  );
}
