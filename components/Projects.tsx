"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

type FilterType = "All" | "SDE" | "Quant" | "Data/ML";

const projects = [
  {
    title: "Quantitative Risk Modeling",
    subtitle: "CAPM, ARIMA-GARCH & VaR Simulation",
    type: "Quant" as FilterType,
    tags: ["Python", "R", "CAPM", "ARIMA-GARCH", "VaR"],
    desc: "Performed risk analysis on listed companies using CAPM for beta estimation and ARIMA-GARCH models for return and volatility forecasting. Implemented Python-based VaR simulation to estimate portfolio downside risk across confidence levels.",
    icon: "📉",
    accent: "#818cf8",
    micro: "📈 Rolling Vol + VaR",
  },
  {
    title: "Derivatives & Risk Management",
    subtitle: "Options Strategies and Hedging",
    type: "Quant" as FilterType,
    tags: ["Options", "Derivatives", "Excel", "Risk Management"],
    desc: "Designed and evaluated options strategies including Calendar Spread, Bear Put Spread, Iron Condor, and Butterfly Spread. Analyzed payoff behavior, risk-return tradeoffs, and hedging implications using market data and technical indicators.",
    icon: "⚖️",
    accent: "#6366f1",
    micro: "📊 Payoff Curves",
  },
  {
    title: "Impact of Bilateral Relations on M&A",
    subtitle: "Geopolitical Sentiment & Deal Outcomes",
    type: "Data/ML" as FilterType,
    tags: ["NLP", "VADER", "Sentiment Analysis", "Google News API", "Finance"],
    desc: "Built a sentiment-based proxy for bilateral relations using VADER NLP and news data to analyze geopolitical sentiment around M&A transactions and evaluate its relationship with investor confidence and deal outcomes.",
    icon: "🌐",
    accent: "#f59e0b",
    micro: "🔬 Sentiment Signals",
  },
  {
    title: "Online Food Delivery System",
    subtitle: "Relational & NoSQL Backend Architecture",
    type: "SDE" as FilterType,
    tags: ["SQL", "NoSQL", "Database Design", "ACID", "Backend"],
    desc: "Designed a backend relational schema with triggers, stored procedures, and ACID-compliant transactions for orders, payments, and deliveries. Added a complementary NoSQL model for read-heavy workloads.",
    icon: "🗄️",
    accent: "#00d4ff",
    micro: "> SELECT * FROM orders",
  },
  {
    title: "Time Table Builder",
    subtitle: "Concurrent Scheduling Engine in Java",
    type: "SDE" as FilterType,
    tags: ["Java", "OOP", "Multithreading", "Scheduling"],
    desc: "Developed a Java-based scheduling engine using object-oriented design, rule-based validation, slot allocation, automated CSV ingestion, and multithreading for conflict-free timetable generation.",
    icon: "🗓️",
    accent: "#22d3ee",
    micro: "> Thread pool: 8 workers",
  },
  {
    title: "Port Management System",
    subtitle: "Concurrent IPC with Message Queues",
    type: "SDE" as FilterType,
    tags: ["C", "Operating Systems", "Multithreading", "IPC", "Shared Memory"],
    desc: "Engineered a concurrent port management system using message queues and shared memory to coordinate scheduler and validator modules while preventing race conditions.",
    icon: "⚙️",
    accent: "#34d399",
    micro: "> MSG_QUEUE: active",
  },
  {
    title: "Chat Management & Moderation System",
    subtitle: "Real-time Concurrent Chat with POSIX IPC",
    type: "SDE" as FilterType,
    tags: ["C", "POSIX IPC", "Semaphores", "Synchronization"],
    desc: "Built a real-time chat system with user authorization, group-level moderation, message ordering guarantees, semaphore-based synchronization, and automated violation handling.",
    icon: "💬",
    accent: "#a78bfa",
    micro: "> sem_wait: granted",
  },
];

const FILTERS: FilterType[] = ["All", "SDE", "Quant", "Data/ML"];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const [tilted, setTilted] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilted({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      viewport={{ once: true, margin: "-60px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilted({ x: 0, y: 0 })}
      style={{
        transform: `perspective(800px) rotateX(${tilted.x}deg) rotateY(${tilted.y}deg)`,
        transition: "transform 0.3s ease",
      }}
      className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/10 flex flex-col h-full group cursor-default"
    >
      {/* Accent bar */}
      <div
        className="h-px w-full mb-5 opacity-60"
        style={{ background: `linear-gradient(to right, ${project.accent}, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
          style={{ backgroundColor: `${project.accent}15`, border: `1px solid ${project.accent}25` }}
        >
          {project.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-100 leading-tight">{project.title}</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">{project.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">{project.desc}</p>

      {/* Micro animation label */}
      <div
        className="mb-4 px-3 py-1.5 rounded font-mono text-[11px] border"
        style={{
          color: `${project.accent}aa`,
          borderColor: `${project.accent}20`,
          backgroundColor: `${project.accent}08`,
        }}
      >
        {project.micro}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded border font-medium"
            style={{
              color: `${project.accent}90`,
              borderColor: `${project.accent}25`,
              backgroundColor: `${project.accent}08`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Type badge */}
      <div className="absolute top-4 right-4">
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-mono font-medium"
          style={{ color: project.accent, backgroundColor: `${project.accent}12` }}
        >
          {project.type}
        </span>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [filter, setFilter] = useState<FilterType>("All");
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/20 to-navy-900 pointer-events-none" />

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
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="text-slate-100">Selected</span>{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-500 text-sm">Hover cards to tilt. Filter by domain.</p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-10 flex-wrap"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                filter === f
                  ? "border-cyan-electric bg-cyan-electric/15 text-cyan-electric"
                  : "border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 relative"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
