"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-navy-900" />,
});

const TYPING_WORDS = [
  "Python",
  "FastAPI",
  "Derivatives",
  "Options Greeks",
  "Backend Systems",
  "Black-Scholes",
  "Quant Analytics",
  "Data Structures",
  "Volatility",
  "REST APIs",
];

function useTypingAnimation(words: string[], speed = 80, pause = 1400) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    setDisplayed(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  const typingText = useTypingAnimation(TYPING_WORDS);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-900"
    >
      {/* 3D Particle background */}
      <ParticleBackground />

      {/* Gradient orbs */}
      <div
        className="orb absolute w-[600px] h-[600px] bg-cyan-electric/20 -top-40 -left-40 pointer-events-none"
        style={{ animationDelay: "0s" }}
        aria-hidden="true"
      />
      <div
        className="orb absolute w-[500px] h-[500px] bg-indigo-electric/20 -bottom-20 -right-20 pointer-events-none"
        style={{ animationDelay: "3s" }}
        aria-hidden="true"
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan-electric animate-pulse" />
            <span className="font-mono text-xs text-cyan-electric/80 tracking-widest uppercase">
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
          >
            <span className="gradient-text">Ekansh</span>
            <br />
            <span className="text-slate-100">Aryan Sinha</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl font-medium text-slate-300 mb-3"
          >
            Software Developer{" "}
            <span className="text-cyan-electric font-mono">×</span>{" "}
            Quantitative Analyst
          </motion.p>

          {/* Typing animation */}
          <motion.div
            variants={itemVariants}
            className="h-8 flex items-center justify-center mb-6"
          >
            <span className="font-mono text-base sm:text-lg text-slate-400">
              {"// "}
              <span className="text-cyan-electric">{typingText}</span>
              <span className="cursor-blink text-cyan-electric">|</span>
            </span>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed mb-10"
          >
            Final-year <span className="text-slate-200">B.E. Electronics & Communication Engineering</span> and{" "}
            <span className="text-slate-200">MSc Economics</span> student at{" "}
            <span className="text-cyan-electric">BITS Pilani, Hyderabad Campus</span>, building across backend
            systems, Python automation, derivatives analytics, and quantitative finance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#career-tracks"
              className="group relative px-6 py-2.5 rounded border border-cyan-electric/60 text-cyan-electric text-sm font-medium overflow-hidden transition-all duration-300 hover:border-cyan-electric hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            >
              <span className="absolute inset-0 bg-cyan-electric/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">SDE Profile</span>
            </a>
            <a
              href="#career-tracks"
              className="group relative px-6 py-2.5 rounded border border-indigo-electric/60 text-indigo-300 text-sm font-medium overflow-hidden transition-all duration-300 hover:border-indigo-electric hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              <span className="absolute inset-0 bg-indigo-electric/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">Quant Profile</span>
            </a>
            <a
              href="#resume"
              className="group px-6 py-2.5 rounded bg-gradient-to-r from-cyan-electric/20 to-indigo-electric/20 border border-white/10 text-slate-200 text-sm font-medium hover:from-cyan-electric/30 hover:to-indigo-electric/30 transition-all duration-300"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 rounded text-slate-400 text-sm hover:text-slate-200 transition-colors duration-200 underline underline-offset-4 decoration-slate-600 hover:decoration-cyan-electric"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {[
              { value: "500+", label: "LeetCode Solved" },
              { value: "#654", label: "Global Contest Rank" },
              { value: "2+", label: "Internships" },
              { value: "7+", label: "Projects" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          ref={scrollRef}
        >
          <span className="text-xs text-slate-600 font-mono tracking-widest">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-600 to-transparent relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-electric animate-[slideDown_1.5s_ease-in-out_infinite]" />
          </div>
        </motion.div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-900 pointer-events-none z-[1]"
        aria-hidden="true"
      />
    </section>
  );
}
