"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { skillsData } from "@/data/skills";
import { Sparkles, RefreshCw, Compass, Play, Pause, Flame } from "lucide-react";

export function SkillsSandbox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [gravityMode, setGravityMode] = useState<"earth" | "zero" | "inverted">("earth");
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const {
      Engine,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
      Body,
    } = Matter;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 0.8, scale: 0.001 },
    });
    engineRef.current = engine;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = containerRef.current.clientWidth);
    let height = (canvas.height = 420);

    // Filter featured skills for the physics world
    const sandboxSkills = skillsData.filter((s) => s.featuredInSandbox);

    // Wall thickness
    const wallThickness = 60;
    let floor = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width + 200,
      wallThickness,
      { isStatic: true, friction: 0.4, restitution: 0.2 }
    );
    let ceiling = Bodies.rectangle(
      width / 2,
      -wallThickness / 2,
      width + 200,
      wallThickness,
      { isStatic: true }
    );
    let leftWall = Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height * 2,
      { isStatic: true }
    );
    let rightWall = Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height * 2,
      { isStatic: true }
    );

    Composite.add(engine.world, [floor, ceiling, leftWall, rightWall]);

    // Create pill bodies for each skill
    const skillBodies: Array<{
      body: Matter.Body;
      name: string;
      color: string;
      category: string;
      width: number;
      height: number;
    }> = [];

    sandboxSkills.forEach((skill, index) => {
      const textWidth = Math.max(90, skill.name.length * 9.5 + 34);
      const pillHeight = 38;
      const x = (index * 70) % (width - 160) + 80;
      const y = Math.floor(index / 5) * -50 - 30;

      const body = Bodies.rectangle(x, y, textWidth, pillHeight, {
        chamfer: { radius: 19 },
        restitution: 0.65,
        friction: 0.15,
        frictionAir: 0.012,
        density: 0.002,
        label: skill.name,
      });

      Body.setAngle(body, (Math.random() - 0.5) * 0.4);

      skillBodies.push({
        body,
        name: skill.name,
        color: skill.color,
        category: skill.category,
        width: textWidth,
        height: pillHeight,
      });

      Composite.add(engine.world, body);
    });

    // Add mouse & touch interaction
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    // Track active hovered or dragged item
    Events.on(mouseConstraint, "startdrag", (event: any) => {
      if (event?.body) {
        setActiveItem(event.body.label);
      } else if (mouseConstraint.body) {
        setActiveItem(mouseConstraint.body.label);
      }
    });

    Events.on(mouseConstraint, "enddrag", () => {
      setActiveItem(null);
    });

    // Custom Canvas Render Loop with Visibility Optimization
    let animationFrameId: number;
    let isVisible = true;

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw all skill bodies
      for (const item of skillBodies) {
        const { body, name, color, width: bWidth, height: bHeight } = item;
        const { x, y } = body.position;
        const angle = body.angle;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        const isHovered = activeItem === name;
        const radius = bHeight / 2;

        // Draw pill background
        ctx.beginPath();
        ctx.roundRect(-bWidth / 2, -bHeight / 2, bWidth, bHeight, radius);

        // Fill with glass gradient
        if (isHovered) {
          ctx.fillStyle = "rgba(14, 165, 233, 0.35)";
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2;
          ctx.shadowColor = "#00f2fe";
          ctx.shadowBlur = 16;
        } else {
          ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.lineWidth = 1;
          ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.stroke();

        // Reset shadow for text
        ctx.shadowBlur = 0;

        // Colored status dot
        ctx.beginPath();
        ctx.arc(-bWidth / 2 + 15, 0, 4, 0, Math.PI * 2);
        ctx.fillStyle = color || "#00f2fe";
        ctx.fill();

        // Skill text label
        ctx.fillStyle = isHovered ? "#ffffff" : "#e2e8f0";
        ctx.font = '600 12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(name, -bWidth / 2 + 25, 0);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Start Runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Pause physics & rendering when off-screen to prevent CPU lag
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            render();
          }
        });
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    render();

    // Window resize handler
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = 420;

      // Reposition walls
      Body.setPosition(floor, { x: width / 2, y: height + wallThickness / 2 });
      Body.setPosition(ceiling, { x: width / 2, y: -wallThickness / 2 });
      Body.setPosition(leftWall, { x: -wallThickness / 2, y: height / 2 });
      Body.setPosition(rightWall, { x: width + wallThickness / 2, y: height / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  // Sandbox Controls
  const handleReset = () => {
    if (!engineRef.current || !canvasRef.current) return;
    const engine = engineRef.current;
    const width = canvasRef.current.width;

    const bodies = Matter.Composite.allBodies(engine.world).filter((b) => !b.isStatic);
    bodies.forEach((body, idx) => {
      const x = (idx * 70) % (width - 160) + 80;
      const y = Math.floor(idx / 5) * -40 - 20;
      Matter.Body.setPosition(body, { x, y });
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: Math.random() * 2 });
      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.4);
    });
  };

  const handleScatter = () => {
    if (!engineRef.current) return;
    const bodies = Matter.Composite.allBodies(engineRef.current.world).filter((b) => !b.isStatic);
    bodies.forEach((body) => {
      Matter.Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.08,
        y: -(Math.random() * 0.1 + 0.05),
      });
    });
  };

  const toggleGravity = () => {
    if (!engineRef.current) return;
    if (gravityMode === "earth") {
      engineRef.current.gravity.y = 0;
      engineRef.current.gravity.x = 0;
      setGravityMode("zero");
    } else if (gravityMode === "zero") {
      engineRef.current.gravity.y = -0.5;
      setGravityMode("inverted");
    } else {
      engineRef.current.gravity.y = 0.8;
      setGravityMode("earth");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#060a17]/90 backdrop-blur-xl overflow-hidden shadow-2xl relative">
      {/* Sandbox Header / Controls Bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02] gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
            Matter.js 2D Physics Sandbox
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
            Click &amp; Toss Badges
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleGravity}
            suppressHydrationWarning
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            title="Cycle Gravity (Normal / Zero-G / Inverted)"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              Gravity:{" "}
              {gravityMode === "earth"
                ? "1.0G (Normal)"
                : gravityMode === "zero"
                ? "0.0G (Drift)"
                : "-0.5G (Float)"}
            </span>
          </button>

          <button
            onClick={handleScatter}
            suppressHydrationWarning
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            title="Scatter physics bodies"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Scatter</span>
          </button>

          <button
            onClick={handleReset}
            suppressHydrationWarning
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            title="Reset simulation"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400 hover:rotate-180 transition-transform duration-500" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Physics Canvas Area */}
      <div ref={containerRef} className="relative w-full h-[420px] select-none touch-none">
        <canvas ref={canvasRef} className="block w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Ambient bottom instructions */}
        <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-slate-400 pointer-events-none">
          <span>RIGID-BODY DYNAMICS ENABLED</span>
          <span>{isMobile ? "DRAG WITH TOUCH" : "DRAG & THROW WITH CURSOR"}</span>
        </div>
      </div>
    </div>
  );
}
