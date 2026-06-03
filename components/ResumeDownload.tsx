"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const resumes = [
  {
    title: "Software Development Engineer",
    subtitle: "Backend · Systems · DSA · FastAPI",
    file: "/resumes/Ekansh_Aryan_Sinha_SDE_Resume.pdf",
    viewFile: "/resumes/Ekansh_Aryan_Sinha_SDE_Resume.pdf",
    color: "#00d4ff",
    icon: "💻",
    tags: ["FastAPI", "Python", "C++", "Java", "DSA", "Microservices"],
    highlight: "SDE Fresher | Backend Specialist",
  },
  {
    title: "Quantitative Analyst",
    subtitle: "Derivatives · Options · Risk Modeling",
    file: "/resumes/Ekansh_Aryan_Sinha_Quantitative_Analyst_Resume.pdf",
    viewFile: "/resumes/Ekansh_Aryan_Sinha_Quantitative_Analyst_Resume.pdf",
    color: "#818cf8",
    icon: "📊",
    tags: ["Black-Scholes", "VaR", "CAPM", "Greeks", "ARIMA-GARCH", "Python"],
    highlight: "Quant Analyst Fresher | Derivatives Focus",
  },
];

export default function ResumeDownload() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="resume" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/20 to-navy-900 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs text-cyan-electric/60 tracking-widest uppercase mb-3">
            Downloads
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="text-slate-100">Get My</span>{" "}
            <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-slate-500 text-sm">
            Two tailored resumes — pick the one that fits the role.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {resumes.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card rounded-2xl p-7 border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col"
              style={{
                ["--accent" as string]: r.color,
              }}
            >
              {/* Icon + title */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    backgroundColor: `${r.color}12`,
                    border: `1px solid ${r.color}25`,
                  }}
                >
                  {r.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{r.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{r.subtitle}</p>
                </div>
              </div>

              {/* Highlight */}
              <div
                className="text-xs font-mono mb-4 px-3 py-1.5 rounded border"
                style={{
                  color: `${r.color}cc`,
                  borderColor: `${r.color}20`,
                  backgroundColor: `${r.color}08`,
                }}
              >
                {r.highlight}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6 flex-1">
                {r.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-3 py-1 rounded-md border font-medium whitespace-nowrap"
                    style={{
                      color: `${r.color}90`,
                      borderColor: `${r.color}25`,
                      backgroundColor: `${r.color}08`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <a
                  href={r.file}
                  download
                  className="flex-1 py-2.5 rounded-lg text-xs font-semibold text-center transition-all duration-200 border"
                  style={{
                    borderColor: r.color,
                    color: r.color,
                    backgroundColor: `${r.color}12`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${r.color}22`;
                    e.currentTarget.style.boxShadow = `0 0 20px ${r.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${r.color}12`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  ↓ Download
                </a>
                <a
                  href={r.viewFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg text-xs font-semibold text-center text-slate-400 hover:text-slate-200 transition-colors duration-200 border border-white/8 hover:border-white/15"
                >
                  ↗ View PDF
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-xs text-slate-600 mt-8 font-mono"
        >
          {"// "} Open to SDE Fresher, Quant Analyst Fresher, and Quant Developer opportunities.
        </motion.p>
      </div>
    </section>
  );
}
