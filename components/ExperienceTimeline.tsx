"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    company: "MerQube",
    role: "Quantitative Analyst Intern",
    location: "Bangalore, India",
    duration: "Jan 2026 – Present",
    type: "quant",
    color: "indigo",
    icon: "📊",
    bullets: [
      "Designed and implemented options-based index strategy workflows in Python, using the VIX Index as an underlying and targeting volatility-driven return opportunities.",
      "Worked on end-to-end index development including strategy logic, portfolio generation, market-data-driven calculations, validation, debugging, and production-ready implementation.",
      "Optimized index calculation workflows by adding intermediate-result caching, portfolio persistence, and reusable configuration-driven components.",
      "Collaborated on reported issues by identifying root causes, clarifying requirements, and coordinating corrections across internal implementation and client-side inputs.",
    ],
    tags: ["Python", "Options", "VIX", "Index Strategy", "Volatility", "Portfolio", "Quant Finance"],
  },
  {
    company: "Nykaa",
    role: "Software Development Engineer Intern",
    location: "Bangalore, India",
    duration: "Jul 2025 – Dec 2025",
    type: "sde",
    color: "cyan",
    icon: "⚡",
    bullets: [
      "Built a FastAPI-based mock API microservice, reducing test setup effort by 40% and improving developer productivity for backend testing workflows.",
      "Developed data synchronization workflows for hierarchical datasets across backend modules, improving consistency, maintainability, and reliability of test data flows.",
      "Added structured logging, metrics, validation, and error-handling support to improve observability, debugging efficiency, and API workflow reliability.",
    ],
    tags: ["FastAPI", "Python", "Microservices", "REST APIs", "Data Sync", "Logging", "Backend"],
  },
];

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  const colorMap = {
    cyan: {
      dot: "bg-cyan-electric border-cyan-electric/30",
      icon: "bg-cyan-electric/10 text-cyan-electric",
      border: "border-cyan-electric/20 hover:border-cyan-electric/50",
      tag: "border-cyan-electric/20 bg-cyan-electric/8 text-cyan-electric/80",
      label: "text-cyan-electric",
      glow: "hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]",
    },
    indigo: {
      dot: "bg-indigo-electric border-indigo-300/30",
      icon: "bg-indigo-electric/10 text-indigo-300",
      border: "border-indigo-electric/20 hover:border-indigo-electric/50",
      tag: "border-indigo-electric/20 bg-indigo-electric/8 text-indigo-300/80",
      label: "text-indigo-300",
      glow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]",
    },
  };
  const c = colorMap[exp.color as "cyan" | "indigo"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative lg:w-[calc(50%-2.5rem)] ${isLeft ? "lg:mr-auto" : "lg:ml-auto"}`}
    >
      {/* Timeline dot (desktop) */}
      <div
        className={`hidden lg:block absolute top-6 ${isLeft ? "-right-[calc(2.5rem+4px)]" : "-left-[calc(2.5rem+4px)]"} w-3 h-3 rounded-full border-2 ${c.dot} shadow-lg`}
        style={{ boxShadow: exp.color === "cyan" ? "0 0 12px rgba(0,212,255,0.5)" : "0 0 12px rgba(99,102,241,0.5)" }}
      />

      <div
        className={`glass-card rounded-2xl p-6 border ${c.border} ${c.glow} transition-all duration-500`}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${c.icon}`}>
            <span>{exp.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-100">{exp.company}</h3>
                <p className={`text-sm font-medium ${c.label}`}>{exp.role}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs text-slate-500 font-mono">{exp.duration}</div>
                <div className="text-xs text-slate-600">{exp.location}</div>
              </div>
            </div>
          </div>
        </div>

        <ul className="space-y-2.5 mb-5">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
              <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${exp.color === "cyan" ? "bg-cyan-electric/60" : "bg-indigo-300/60"}`} />
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span key={tag} className="tag-pill text-[10px]" style={{ border: "1px solid" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-800/30 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs text-cyan-electric/60 tracking-widest uppercase mb-3">
            Work Experience
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold">
            <span className="text-slate-100">Where I've</span>{" "}
            <span className="gradient-text">Contributed</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4">
            Internship experience across quantitative finance and software engineering.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Animated timeline line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-electric via-indigo-electric to-cyan-electric"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-10 lg:gap-12">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>

          {/* Bottom cap */}
          <div className="hidden lg:flex justify-center mt-8">
            <div className="w-3 h-3 rounded-full border-2 border-slate-700 bg-navy-900" />
          </div>
        </div>
      </div>
    </section>
  );
}
