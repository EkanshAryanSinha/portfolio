"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "sekansharyan2003@gmail.com",
    href: "mailto:sekansharyan2003@gmail.com",
    icon: "✉",
    color: "#00d4ff",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ekansh-aryan-sinha-9295b1225",
    href: "https://www.linkedin.com/in/ekansh-aryan-sinha-9295b1225/",
    icon: "in",
    color: "#0ea5e9",
  },
  {
    label: "LeetCode",
    value: "leetcode.com/u/Neov_",
    href: "https://leetcode.com/u/Neov_/",
    icon: "⚡",
    color: "#f59e0b",
  },
  {
    label: "Location",
    value: "Bangalore, India",
    href: null,
    icon: "◉",
    color: "#34d399",
  },
];

export default function Contact() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send (replace with actual API call / Formspree / etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setSending(false);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background network effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="orb absolute w-[500px] h-[500px] bg-cyan-electric/10 -bottom-40 -left-40" />
        <div className="orb absolute w-[400px] h-[400px] bg-indigo-electric/10 -top-20 -right-20" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-xs text-cyan-electric/60 tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="text-slate-100">Let&apos;s</span>{" "}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Open to SDE Fresher, Quant Analyst Fresher, and Quant Developer opportunities.
            Let&apos;s build something great together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-mono">Available for opportunities</span>
            </div>

            {/* Contact links */}
            {CONTACT_LINKS.map((link) => (
              <div
                key={link.label}
                className="glass-card rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all duration-300 flex items-center gap-4"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    backgroundColor: `${link.color}12`,
                    border: `1px solid ${link.color}20`,
                    color: link.color,
                  }}
                >
                  {link.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-600 mb-0.5">{link.label}</div>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm text-slate-300 hover:text-cyan-electric transition-colors duration-200 truncate block"
                      style={{ color: link.color }}
                    >
                      {link.value}
                    </a>
                  ) : (
                    <span className="text-sm" style={{ color: link.color }}>{link.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Role interest cards */}
            <div className="pt-2">
              <p className="text-[11px] text-slate-600 font-mono mb-3">// Open to roles</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "SDE Fresher", color: "#00d4ff" },
                  { label: "Quant Analyst Fresher", color: "#818cf8" },
                  { label: "Quant Developer", color: "#34d399" },
                ].map((r) => (
                  <span
                    key={r.label}
                    className="text-xs px-3 py-1.5 rounded-full border font-medium"
                    style={{
                      color: r.color,
                      borderColor: `${r.color}30`,
                      backgroundColor: `${r.color}08`,
                    }}
                  >
                    {r.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-7 border border-white/5">
              {sent ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2">Message Sent!</h3>
                  <p className="text-sm text-slate-400">
                    Thank you for reaching out. I&apos;ll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 font-mono">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full bg-navy-900/80 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-700 focus:outline-none focus:border-cyan-electric/40 transition-colors duration-200"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 font-mono">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full bg-navy-900/80 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-700 focus:outline-none focus:border-cyan-electric/40 transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 font-mono">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full bg-navy-900/80 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-700 focus:outline-none focus:border-cyan-electric/40 transition-colors duration-200 resize-none"
                      placeholder="Hiring opportunity, collaboration, or just saying hello..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-300 border border-cyan-electric/50 text-cyan-electric hover:bg-cyan-electric/15 hover:border-cyan-electric hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/5 text-center"
        >
          <p className="text-slate-600 text-xs font-mono">
            Designed & built by{" "}
            <span className="text-cyan-electric">Ekansh Aryan Sinha</span>{" "}
            · BITS Pilani, Hyderabad · 2026
          </p>
          <p className="text-slate-700 text-[11px] mt-2">
            Open to SDE Fresher · Quant Analyst Fresher · Quant Developer
          </p>
        </motion.div>
      </div>
    </section>
  );
}
