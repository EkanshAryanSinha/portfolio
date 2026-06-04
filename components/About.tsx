"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "500+", label: "LeetCode Problems", sub: "Across DSA topics" },
  { value: "#654", label: "Global Rank", sub: "LeetCode Weekly Contest" },
  { value: "BITS Pilani", label: "Institution", sub: "Hyderabad Campus" },
  { value: "SDE + Quant", label: "Profile", sub: "Dual-track engineer" },
];

const techBadges = [
  "Python", "C++", "SQL", "FastAPI", "REST APIs",
  "Options & Derivatives", "Black-Scholes", "NumPy", "Pandas", "GSAP", "Docker",
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const statRef = useRef(null);
  const statInView = useInView(statRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-700/20 to-navy-900 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div ref={ref}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs text-cyan-electric/60 tracking-widest uppercase mb-3"
            >
              About Me
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold mb-6"
            >
              <span className="text-slate-100">Where</span>{" "}
              <span className="gradient-text">Code Meets Markets</span>
            </motion.h2>

            {[
              `I'm a final-year B.E. Electronics & Communication Engineering and MSc Economics student at BITS Pilani, Hyderabad Campus — a dual-degree profile that's rare by design.`,
              `My work spans backend engineering (FastAPI microservices, data sync workflows, logging pipelines) and quantitative finance (options strategy development, volatility modeling, index calculation workflows). I've interned at Nykaa as an SDE and at MerQube as a Quant Analyst.`,
              `I enjoy building systems that connect code, data, markets, and mathematical reasoning — and I'm equally at home reading option payoff diagrams and designing database schemas.`,
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4"
              >
                {text}
              </motion.p>
            ))}

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {techBadges.map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.55 + i * 0.04 }}
                  className="tag-pill text-[11px]"
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Stats */}
          <div ref={statRef}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={statInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                  className="glass-card rounded-xl p-5 border border-white/5 hover:border-cyan-electric/20 transition-all duration-300 group"
                >
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1 group-hover:scale-105 transition-transform duration-300 origin-left">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-slate-300 mb-0.5">{stat.label}</div>
                  <div className="text-[11px] text-slate-600">{stat.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Education card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={statInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-4 glass-card rounded-xl p-5 border border-cyan-electric/10 hover:border-cyan-electric/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-electric/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-electric text-lg">🎓</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1">BITS Pilani, Hyderabad</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    B.E. Electronics & Communication Engineering<br />
                    MSc Economics (Dual Degree)<br />
                    <span className="text-cyan-electric/70">Final Year · 2025–26</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Internship pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={statInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-4 flex gap-3 flex-wrap"
            >
              {[
                { name: "MerQube", role: "Quant Analyst Intern", color: "indigo" },
                { name: "Nykaa", role: "SDE Intern", color: "cyan" },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`glass-card rounded-lg px-4 py-2.5 border flex-1 min-w-[140px] ${
                    item.color === "cyan"
                      ? "border-cyan-electric/15 hover:border-cyan-electric/40"
                      : "border-indigo-electric/15 hover:border-indigo-electric/40"
                  } transition-colors duration-300`}
                >
                  <div className="text-sm font-semibold text-slate-200">{item.name}</div>
                  <div className={`text-[11px] ${item.color === "cyan" ? "text-cyan-electric/70" : "text-indigo-300/70"}`}>
                    {item.role}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
