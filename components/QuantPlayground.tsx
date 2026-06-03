"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Payoff Curve SVG ─── */
function PayoffCurve() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      setT(((ts - start) / 3000) % 1);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const W = 320;
  const H = 180;
  const K = 160; // strike at x=160

  // Bull call spread payoff
  const payoff = (x: number) => {
    const S = (x / W) * 200 - 20; // S from -20 to 180
    const K1 = 80;
    const K2 = 120;
    const maxP = 20;
    const p = Math.max(0, Math.min(S - K1, maxP));
    return H / 2 - (p / maxP) * (H / 2 - 20);
  };

  // Build path
  const pts = Array.from({ length: 100 }, (_, i) => {
    const x = (i / 99) * W;
    const y = payoff(x);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");

  // Animated scanning line
  const scanX = t * W;

  return (
    <div>
      <h4 className="text-xs font-mono text-indigo-300/60 mb-3 uppercase tracking-widest">Option Payoff Curve</h4>
      <p className="text-[11px] text-slate-500 mb-3">Bull Call Spread — profit zone highlighted</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-lg overflow-hidden bg-navy-800/60">
        {/* Grid */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={0} y1={H * f} x2={W} y2={H * f} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
        ))}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={W * f} y1={0} x2={W * f} y2={H} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
        ))}

        {/* Zero line */}
        <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="4,4" />

        {/* Profit zone fill */}
        <path
          d={`M ${(80 / 200 + 0.1) * W} ${H / 2} L ${(120 / 200 + 0.1) * W} ${20} L ${W} ${20} L ${W} ${H / 2} Z`}
          fill="rgba(99,102,241,0.08)"
        />

        {/* Payoff path */}
        <path d={pts} fill="none" stroke="#818cf8" strokeWidth={2} strokeLinejoin="round" />

        {/* Strike markers */}
        {[80, 120].map((k) => {
          const x = ((k + 20) / 200) * W;
          return (
            <g key={k}>
              <line x1={x} y1={0} x2={x} y2={H} stroke="rgba(129,140,248,0.2)" strokeWidth={1} strokeDasharray="3,3" />
              <text x={x + 3} y={H - 6} fill="rgba(129,140,248,0.5)" fontSize={9} fontFamily="monospace">K{k === 80 ? "₁" : "₂"}</text>
            </g>
          );
        })}

        {/* Scanning line */}
        <line x1={scanX} y1={0} x2={scanX} y2={H} stroke="rgba(0,212,255,0.5)" strokeWidth={1} />
        <circle cx={scanX} cy={payoff(scanX)} r={3} fill="#00d4ff" />

        {/* Labels */}
        <text x={4} y={H - 6} fill="rgba(255,255,255,0.2)" fontSize={8} fontFamily="monospace">Loss</text>
        <text x={4} y={14} fill="rgba(255,255,255,0.2)" fontSize={8} fontFamily="monospace">Profit</text>
        <text x={W / 2 - 8} y={H - 6} fill="rgba(255,255,255,0.2)" fontSize={8} fontFamily="monospace">S(T)</text>
      </svg>
    </div>
  );
}

/* ─── Rolling Vol + VaR SVG ─── */
function VolatilityVaR() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let raf: number;
    const animate = () => {
      setOffset((o) => (o + 0.3) % 100);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const W = 320;
  const H = 180;
  const N = 80;

  const volPath = Array.from({ length: N }, (_, i) => {
    const x = (i / (N - 1)) * W;
    const phase = (i / N) * Math.PI * 4 + offset * 0.06;
    const y = H * 0.45 + Math.sin(phase) * 28 + Math.sin(phase * 2.3) * 14;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");

  const varY = H * 0.75;

  return (
    <div>
      <h4 className="text-xs font-mono text-cyan-electric/60 mb-3 uppercase tracking-widest">Volatility & VaR</h4>
      <p className="text-[11px] text-slate-500 mb-3">Rolling 30-day vol with 95% VaR threshold</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-lg overflow-hidden bg-navy-800/60">
        {/* Grid */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={0} y1={H * f} x2={W} y2={H * f} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
        ))}

        {/* Vol fill */}
        <path
          d={`${volPath} L ${W} ${H} L 0 ${H} Z`}
          fill="rgba(0,212,255,0.05)"
        />
        <path d={volPath} fill="none" stroke="#00d4ff" strokeWidth={2} />

        {/* VaR line */}
        <line x1={0} y1={varY} x2={W} y2={varY} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="6,3" />
        <text x={4} y={varY - 4} fill="rgba(239,68,68,0.7)" fontSize={9} fontFamily="monospace">95% VaR</text>

        {/* Breach zones */}
        {[0.18, 0.52, 0.83].map((f) => (
          <circle key={f} cx={W * f} cy={varY + 2} r={4} fill="rgba(239,68,68,0.4)" />
        ))}

        {/* Labels */}
        <text x={4} y={14} fill="rgba(0,212,255,0.5)" fontSize={9} fontFamily="monospace">σ(t)</text>
        <text x={W - 24} y={H - 6} fill="rgba(255,255,255,0.2)" fontSize={8} fontFamily="monospace">time</text>
      </svg>
    </div>
  );
}

/* ─── Greeks Sensitivity SVG ─── */
function GreeksSensitivity() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      setT(((ts - start) / 4000) % 1);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const W = 320;
  const H = 180;
  const N = 80;

  const greeks = [
    { name: "Δ Delta", color: "#00d4ff", freq: 1.5, amp: 0.4, offset: 0 },
    { name: "Γ Gamma", color: "#818cf8", freq: 2.5, amp: 0.25, offset: 0.5 },
    { name: "ν Vega", color: "#34d399", freq: 1.0, amp: 0.3, offset: 1.0 },
    { name: "θ Theta", color: "#f59e0b", freq: 0.8, amp: -0.2, offset: 1.5 },
  ];

  return (
    <div>
      <h4 className="text-xs font-mono text-indigo-300/60 mb-3 uppercase tracking-widest">Greeks Sensitivity</h4>
      <p className="text-[11px] text-slate-500 mb-3">Δ Delta · Γ Gamma · ν Vega · θ Theta</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-lg overflow-hidden bg-navy-800/60">
        {/* Grid */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={0} y1={H * f} x2={W} y2={H * f} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
        ))}

        {/* Zero line */}
        <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />

        {greeks.map((g) => {
          const pts = Array.from({ length: N }, (_, i) => {
            const x = (i / (N - 1)) * W;
            const phase = (i / N) * Math.PI * 4 * g.freq + t * Math.PI * 2 + g.offset;
            const y = H / 2 + Math.sin(phase) * H * g.amp;
            return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
          }).join(" ");

          return (
            <path key={g.name} d={pts} fill="none" stroke={g.color} strokeWidth={1.5} opacity={0.8} />
          );
        })}

        {/* Legend */}
        {greeks.map((g, i) => (
          <g key={g.name} transform={`translate(${i * 72 + 8}, ${H - 12})`}>
            <line x1={0} y1={-2} x2={16} y2={-2} stroke={g.color} strokeWidth={1.5} />
            <text x={20} y={1} fill={g.color} fontSize={8} fontFamily="monospace" opacity={0.8}>{g.name.split(" ")[0]}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function QuantPlayground() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="quant-playground" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-radial from-indigo-electric/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-xs text-indigo-300/60 tracking-widest uppercase mb-3">
            Interactive
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Quant</span>{" "}
            <span className="text-slate-100">Playground</span>
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Live animated visualizations of quantitative finance concepts I work with daily.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { component: <PayoffCurve />, label: "Options Strategy", delay: 0 },
            { component: <VolatilityVaR />, label: "Risk & Volatility", delay: 0.1 },
            { component: <GreeksSensitivity />, label: "Greeks Sensitivity", delay: 0.2 },
          ].map(({ component, label, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 border border-indigo-electric/15 hover:border-indigo-electric/35 transition-all duration-400"
            >
              {component}
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-xs text-slate-600 mt-8 font-mono"
        >
          {"// "}Illustrative animations — not connected to live market data.
          Real implementations built during MerQube internship.
        </motion.p>
      </div>
    </section>
  );
}
