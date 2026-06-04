"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const sdeSkills = [
  { label: "FastAPI & REST APIs", icon: "⚡" },
  { label: "C++ / Python", icon: "💻" },
  { label: "Backend Microservices", icon: "🔧" },
  { label: "Data Structures & Algorithms", icon: "🧮" },
  { label: "Operating Systems", icon: "⚙️" },
  { label: "DBMS & SQL", icon: "🗄️" },
  { label: "Multithreading & IPC", icon: "🔄" },
  { label: "500+ LeetCode Problems", icon: "🏆" },
];

const quantSkills = [
  { label: "Options & Derivatives", icon: "📈" },
  { label: "Black-Scholes Model", icon: "📐" },
  { label: "Delta, Gamma, Vega, Theta", icon: "🔬" },
  { label: "Implied Volatility", icon: "📊" },
  { label: "VaR & Risk Modeling", icon: "⚠️" },
  { label: "CAPM & ARIMA-GARCH", icon: "📉" },
  { label: "Python Financial Workflows", icon: "🐍" },
  { label: "Market-Data Analysis", icon: "💹" },
];

const sharedSkills = ["Python", "Data Analysis", "Problem Solving", "Systems Thinking"];

const TrackCard = ({
  title,
  subtitle,
  skills,
  color,
  direction,
  delay,
}: {
  title: string;
  subtitle: string;
  skills: { label: string; icon: string }[];
  color: "cyan" | "indigo";
  direction: "left" | "right";
  delay: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const colorMap = {
    cyan: {
      border: "border-cyan-electric/20 hover:border-cyan-electric/50",
      title: "text-cyan-electric",
      glow: "hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]",
      dot: "bg-cyan-electric",
      tag: "border-cyan-electric/20 bg-cyan-electric/8 text-cyan-electric/80",
      icon: "text-cyan-electric/60",
      header: "from-cyan-electric/10 to-transparent",
    },
    indigo: {
      border: "border-indigo-electric/20 hover:border-indigo-electric/50",
      title: "text-indigo-300",
      glow: "hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]",
      dot: "bg-indigo-electric",
      tag: "border-indigo-electric/20 bg-indigo-electric/8 text-indigo-300/80",
      icon: "text-indigo-300/60",
      header: "from-indigo-electric/10 to-transparent",
    },
  };

  const c = colorMap[color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`glass-card rounded-2xl p-6 sm:p-8 ${c.border} ${c.glow} transition-all duration-500 flex-1 min-w-0`}
    >
      {/* Header gradient */}
      <div className={`h-px w-full bg-gradient-to-r ${c.header} mb-6`} />

      <h3 className={`text-xl sm:text-2xl font-bold mb-1 ${c.title}`}>{title}</h3>
      <p className="text-xs text-slate-500 font-mono mb-6">{subtitle}</p>

      <ul className="space-y-3">
        {skills.map((skill) => (
          <li key={skill.label} className="flex items-center gap-3 group">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot} group-hover:scale-150 transition-transform duration-200`} />
            <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors duration-200">
              {skill.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-4 border-t border-white/5">
        <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest mb-3">Shared with other track</p>
        <div className="flex flex-wrap gap-2">
          {sharedSkills.map((s) => (
            <span key={s} className={`tag-pill ${c.tag}`} style={{ border: undefined }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function CareerTracks() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="career-tracks" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs text-cyan-electric/60 tracking-widest uppercase mb-3">
            Dual Career Profile
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold">
            <span className="gradient-text">Two Tracks.</span>{" "}
            <span className="text-slate-200">One Engineer.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto">
            I bridge software engineering and quantitative finance — bringing systems thinking and mathematical rigor to both domains.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <TrackCard
            title="Software Development"
            subtitle="// SDE Track"
            skills={sdeSkills}
            color="cyan"
            direction="left"
            delay={0}
          />

          {/* Connector (desktop) */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="hidden lg:flex flex-col items-center justify-center gap-3 flex-shrink-0 w-16"
          >
            <div className="flex-1 w-px bg-gradient-to-b from-cyan-electric/0 via-cyan-electric/30 to-indigo-electric/30" />
            <div className="w-8 h-8 rounded-full border border-white/10 bg-navy-700 flex items-center justify-center">
              <span className="text-xs">∩</span>
            </div>
            <div className="flex-1 w-px bg-gradient-to-b from-indigo-electric/30 via-indigo-electric/30 to-indigo-electric/0" />
          </motion.div>

          <TrackCard
            title="Quantitative Analysis"
            subtitle="// Quant Track"
            skills={quantSkills}
            color="indigo"
            direction="right"
            delay={0.15}
          />
        </div>

        {/* Intersection label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-electric" />
            <span className="text-xs text-slate-400">
              Unified by Python, Mathematical Thinking & Systems Design
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
