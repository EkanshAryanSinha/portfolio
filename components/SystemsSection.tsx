"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const terminalLines = [
  { delay: 0, text: "$ uvicorn main:app --host 0.0.0.0 --port 8000", color: "#00d4ff" },
  { delay: 600, text: "INFO:     Started server process [12847]", color: "#64748b" },
  { delay: 1000, text: "INFO:     Application startup complete.", color: "#34d399" },
  { delay: 1600, text: "$ POST /api/v1/sync-data HTTP/1.1", color: "#00d4ff" },
  { delay: 2100, text: 'INFO:     {"status": "ok", "records": 2847}', color: "#64748b" },
  { delay: 2600, text: "INFO:     200 OK  12ms", color: "#34d399" },
  { delay: 3200, text: "$ python run_index_strategy.py --underlying VIX", color: "#00d4ff" },
  { delay: 3700, text: "Loading config: volatility_strategy.yaml", color: "#64748b" },
  { delay: 4200, text: "Portfolio generated: 847 positions cached", color: "#a78bfa" },
  { delay: 4700, text: "Validation: PASSED (0 anomalies)", color: "#34d399" },
  { delay: 5200, text: "$ _", color: "#00d4ff" },
];

function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    setActive(true);
    terminalLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay + 400);
    });
  }, [inView]);

  return (
    <div
      ref={ref}
      className="glass-card-dark rounded-2xl overflow-hidden border border-white/5 relative scanlines"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/3 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="font-mono text-xs text-slate-600 ml-2">ekansh@portfolio ~ backend</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-xs leading-6 min-h-[280px]">
        {terminalLines.map((line, i) => (
          <div
            key={i}
            className="transition-opacity duration-300"
            style={{ opacity: visibleLines.includes(i) ? 1 : 0 }}
          >
            <span style={{ color: line.color }}>{line.text}</span>
            {i === terminalLines.length - 1 && visibleLines.includes(i) && (
              <span className="cursor-blink text-cyan-electric">█</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const codeSnippet = `@app.post("/api/v1/mock/{endpoint}")
async def mock_response(
    endpoint: str,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """
    FastAPI mock microservice — reduces test
    setup effort by 40% for backend teams.
    """
    config = await db.get_mock_config(endpoint)
    log_request(request, config)

    return JSONResponse(
        content=config.response_template,
        status_code=config.status_code,
        headers={"X-Mock": "true"}
    )`;

const systemPillars = [
  { label: "Backend APIs", desc: "FastAPI, REST, mock services", icon: "⚡", color: "#00d4ff" },
  { label: "Data Sync", desc: "Hierarchical data pipelines", icon: "🔄", color: "#22d3ee" },
  { label: "Logging & Validation", desc: "Structured logs, error handling", icon: "📋", color: "#34d399" },
  { label: "Multithreading", desc: "Concurrency, IPC, semaphores", icon: "⚙️", color: "#a78bfa" },
  { label: "DSA / LeetCode", desc: "500+ problems, top global rank", icon: "🏆", color: "#f59e0b" },
  { label: "OS Concepts", desc: "Processes, scheduling, memory", icon: "🖥️", color: "#818cf8" },
];

export default function SystemsSection() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="systems" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-radial from-cyan-electric/4 via-transparent to-transparent pointer-events-none" />

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
            Engineering Depth
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="text-slate-100">Code &</span>{" "}
            <span className="gradient-text">Systems</span>
          </h2>
          <p className="text-slate-500 text-sm">
            From backend APIs to OS-level concurrency — depth across the stack.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-slate-300 mb-4 font-mono">
              <span className="text-cyan-electric">&gt;</span> Live Terminal
            </h3>
            <Terminal />
          </motion.div>

          {/* Code snippet */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-slate-300 mb-4 font-mono">
              <span className="text-cyan-electric">&gt;</span> FastAPI Microservice
            </h3>
            <div className="glass-card-dark rounded-2xl overflow-hidden border border-white/5 relative">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-xs text-slate-600">mock_api.py</span>
                <span className="text-[10px] text-cyan-electric/50 font-mono">Python</span>
              </div>

              <pre className="p-4 font-mono text-[11px] leading-5 overflow-x-auto text-slate-300">
                <code>
                  {codeSnippet.split("\n").map((line, i) => {
                    const highlighted = line
                      .replace(/(\"[^\"]*\")/g, '<span style="color:#34d399">$1</span>')
                      .replace(/(@app\.post|async def|await|return|Depends)/g, '<span style="color:#818cf8">$1</span>')
                      .replace(/(#[^\n]*)/g, '<span style="color:#475569">$1</span>');
                    return (
                      <span key={i} className="block">
                        <span className="text-slate-700 select-none mr-3 text-[10px]">
                          {String(i + 1).padStart(2, " ")}
                        </span>
                        <span dangerouslySetInnerHTML={{ __html: highlighted }} />
                      </span>
                    );
                  })}
                </code>
              </pre>
            </div>
          </motion.div>
        </div>

        {/* System architecture pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {systemPillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-4 border border-white/5 hover:border-white/10 text-center group transition-all duration-300"
              style={{
                ["--hover-glow" as string]: `${pillar.color}20`,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                style={{ backgroundColor: `${pillar.color}12` }}
              >
                <span className="text-base">{pillar.icon}</span>
              </div>
              <div
                className="text-xs font-semibold mb-1"
                style={{ color: pillar.color }}
              >
                {pillar.label}
              </div>
              <div className="text-[10px] text-slate-600 leading-tight">{pillar.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
