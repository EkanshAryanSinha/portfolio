"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCounter(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

const achievements = [
  {
    icon: "⚡",
    stat: 500,
    suffix: "+",
    label: "LeetCode Problems",
    desc: "Solved across Data Structures, Dynamic Programming, Graphs, Trees, and Sliding Window — consistent practice over 2 years.",
    color: "#00d4ff",
  },
  {
    icon: "🏆",
    stat: 654,
    prefix: "#",
    label: "Global Contest Rank",
    desc: "Ranked #654 globally out of 34,000+ participants in a LeetCode Weekly Contest — top 2% performance.",
    color: "#f59e0b",
  },
  {
    icon: "🤖",
    stat: 3,
    suffix: " Courses",
    label: "ML Specialization",
    desc: "Completed Andrew Ng's Machine Learning Specialization (DeepLearning.AI) — supervised, unsupervised, and neural networks.",
    color: "#818cf8",
  },
  {
    icon: "☁️",
    stat: 1,
    suffix: " Cert",
    label: "Google Cloud",
    desc: "Completed Google Cloud Fundamentals: Core Infrastructure — cloud computing, storage, networking, and virtual machines.",
    color: "#34d399",
  },
  {
    icon: "🎓",
    stat: 1000,
    suffix: "+",
    label: "Events Managed",
    desc: "Management Head, DoRA, BITS Pilani Hyderabad — organized recreational events attended by 1,000+ students.",
    color: "#a78bfa",
  },
];

const AchievementCard = ({
  ach,
  index,
}: {
  ach: (typeof achievements)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCounter(ach.stat, 1600, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/10 group transition-all duration-300 flex flex-col"
      style={{ perspective: "600px" }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 flex-shrink-0"
        style={{
          backgroundColor: `${ach.color}12`,
          border: `1px solid ${ach.color}20`,
          boxShadow: `0 0 20px ${ach.color}10`,
        }}
      >
        {ach.icon}
      </div>

      {/* Counter */}
      <div className="mb-1">
        <span className="text-3xl font-bold" style={{ color: ach.color }}>
          {ach.prefix || ""}{count.toLocaleString()}{ach.suffix || ""}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-slate-200 mb-2">{ach.label}</h3>
      <p className="text-xs text-slate-500 leading-relaxed flex-1">{ach.desc}</p>

      {/* Bottom accent */}
      <div
        className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(to right, ${ach.color}, transparent)` }}
      />
    </motion.div>
  );
};

export default function Achievements() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="achievements" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/30 to-navy-900 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-xs text-cyan-electric/60 tracking-widest uppercase mb-3">
            Milestones
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Achievements</span>{" "}
            <span className="text-slate-100">& Certifications</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {achievements.map((ach, i) => (
            <AchievementCard key={ach.label} ach={ach} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
