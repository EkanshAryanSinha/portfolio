"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    category: "Programming Languages",
    color: "#00d4ff",
    skills: [
      { name: "Python", desc: "Primary language for backend, automation, and quant workflows" },
      { name: "C++", desc: "Systems programming, OOP design, concurrency" },
      { name: "JavaScript", desc: "Web interfaces and tooling" },
      { name: "SQL", desc: "Relational schema design, complex queries, stored procedures" },
    ],
  },
  {
    category: "Backend Development",
    color: "#22d3ee",
    skills: [
      { name: "FastAPI", desc: "Built mock API microservices and REST endpoints" },
      { name: "REST APIs", desc: "Design and implementation of RESTful API architectures" },
      { name: "Microservices", desc: "Modular backend services with independent deployment" },
      { name: "Backend Testing", desc: "Test workflows, mock services, data validation" },
    ],
  },
  {
    category: "Quantitative Finance",
    color: "#818cf8",
    skills: [
      { name: "Options & Derivatives", desc: "Strategy design, payoff analysis, hedging" },
      { name: "Black-Scholes", desc: "Theoretical pricing model for options" },
      { name: "Greeks", desc: "Delta, Gamma, Vega, Theta sensitivity analysis" },
      { name: "Implied Volatility", desc: "Extraction from market prices, vol surfaces" },
      { name: "VaR", desc: "Value at Risk simulation at multiple confidence levels" },
      { name: "CAPM", desc: "Capital Asset Pricing Model for beta estimation" },
      { name: "ARIMA-GARCH", desc: "Time series forecasting for returns and volatility" },
    ],
  },
  {
    category: "CS Fundamentals",
    color: "#34d399",
    skills: [
      { name: "Data Structures", desc: "Arrays, trees, graphs, heaps, tries" },
      { name: "Algorithms", desc: "500+ LeetCode problems, contest ranking #654 global" },
      { name: "OS & Multithreading", desc: "Concurrency, IPC, semaphores, message queues" },
      { name: "DBMS", desc: "Transactions, ACID, normalization, indexing" },
      { name: "TCP/IP & HTTP", desc: "Network protocols underpinning API communication" },
    ],
  },
  {
    category: "Data & Analytics",
    color: "#f59e0b",
    skills: [
      { name: "NumPy", desc: "Numerical computing for financial calculations" },
      { name: "Pandas", desc: "Data manipulation, market data processing" },
      { name: "EDA", desc: "Exploratory data analysis and visualization" },
      { name: "Python Automation", desc: "Config-driven workflow automation" },
    ],
  },
  {
    category: "Tools & Platforms",
    color: "#a78bfa",
    skills: [
      { name: "Git", desc: "Version control and collaboration" },
      { name: "Docker", desc: "Containerized development environments" },
      { name: "Postman", desc: "API testing and documentation" },
      { name: "Jupyter", desc: "Interactive quant notebooks and analysis" },
      { name: "Excel", desc: "Financial modeling and options analysis" },
    ],
  },
];

const SkillTag = ({
  skill,
  color,
  delay,
}: {
  skill: { name: string; desc: string };
  color: string;
  delay: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      viewport={{ once: true }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="px-3 py-1.5 rounded-lg border cursor-default text-xs font-medium transition-all duration-200"
        style={{
          borderColor: hovered ? color : `${color}30`,
          backgroundColor: hovered ? `${color}15` : `${color}08`,
          color: hovered ? color : `${color}aa`,
          boxShadow: hovered ? `0 0 16px ${color}30` : "none",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        {skill.name}
      </div>

      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 w-48 glass-card rounded-lg p-2.5 border pointer-events-none"
          style={{ borderColor: `${color}30` }}
        >
          <p className="text-[11px] text-slate-400 text-center leading-relaxed">{skill.desc}</p>
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
            style={{ borderTopColor: `${color}20` }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default function SkillsGalaxy() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  const filtered = activeGroup
    ? skillGroups.filter((g) => g.category === activeGroup)
    : skillGroups;

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-radial from-cyan-electric/3 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs text-cyan-electric/60 tracking-widest uppercase mb-3">
            Technical Skills
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills</span>{" "}
            <span className="text-slate-100">Galaxy</span>
          </h2>
          <p className="text-slate-500 text-sm">Hover any skill for context. Filter by category.</p>
        </motion.div>

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <button
            onClick={() => setActiveGroup(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
              activeGroup === null
                ? "border-cyan-electric bg-cyan-electric/15 text-cyan-electric"
                : "border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300"
            }`}
          >
            All
          </button>
          {skillGroups.map((g) => (
            <button
              key={g.category}
              onClick={() => setActiveGroup(activeGroup === g.category ? null : g.category)}
              className="px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200"
              style={{
                borderColor:
                  activeGroup === g.category ? g.color : "rgba(255,255,255,0.08)",
                backgroundColor:
                  activeGroup === g.category ? `${g.color}15` : "transparent",
                color: activeGroup === g.category ? g.color : "#64748b",
              }}
            >
              {g.category}
            </button>
          ))}
        </motion.div>

        {/* Skill groups */}
        <div className="space-y-8">
          {filtered.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: gi * 0.05 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: group.color, boxShadow: `0 0 8px ${group.color}` }}
                />
                <h3
                  className="text-sm font-semibold"
                  style={{ color: group.color }}
                >
                  {group.category}
                </h3>
                <div className="flex-1 h-px" style={{ backgroundColor: `${group.color}15` }} />
                <span className="text-xs text-slate-600">{group.skills.length} skills</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <SkillTag
                    key={skill.name}
                    skill={skill}
                    color={group.color}
                    delay={si * 0.04}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
