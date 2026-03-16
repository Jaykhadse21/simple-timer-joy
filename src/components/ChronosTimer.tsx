import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ControlButton from "./ControlButton";

const ChronosTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const displayValue = seconds.toString().padStart(1, "0");

  return (
    <div className="min-h-svh bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <span className="label-text">Chronos / Precision-1</span>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors",
                isActive
                  ? "bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.6)] animate-pulse"
                  : "bg-border"
              )}
            />
            <span className="label-text">
              {isActive ? "Running" : "Idle"}
            </span>
          </div>
        </div>

        {/* Display */}
        <div className="relative mb-12 py-10 rounded-xl overflow-hidden flex flex-col items-center justify-center"
             style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(hsl(var(--border)) 0.5px, transparent 0.5px)",
              backgroundSize: "12px 12px",
            }}
          />
          <span className="label-text mb-2 font-mono-display tracking-widest">
            Elapsed Seconds
          </span>
          <div className="text-8xl font-mono-display font-medium tracking-tighter text-foreground">
            {displayValue}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-4">
          <ControlButton
            onClick={toggle}
            variant={isActive ? "stop" : "start"}
            label={isActive ? "Stop" : "Start"}
          />
          <ControlButton onClick={reset} variant="secondary" label="Reset" />
          <div className="flex items-center justify-center border border-border rounded-lg opacity-20">
            <span className="text-[10px] font-mono-display text-foreground">V1.0.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChronosTimer;
