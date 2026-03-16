import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "start" | "stop" | "secondary";

interface ControlButtonProps {
  onClick: () => void;
  label: string;
  variant: Variant;
}

const variantStyles: Record<Variant, string> = {
  start: "bg-primary text-primary-foreground hover:brightness-110",
  stop: "bg-destructive text-destructive-foreground hover:brightness-90",
  secondary: "bg-secondary text-secondary-foreground border border-border hover:text-foreground hover:bg-muted",
};

const ControlButton = ({ onClick, label, variant }: ControlButtonProps) => (
  <motion.button
    whileTap={{ scale: 0.96 }}
    onClick={onClick}
    className={cn(
      "h-14 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 cursor-pointer",
      "shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_4px_6px_-1px_rgba(0,0,0,0.2)]",
      variantStyles[variant]
    )}
  >
    {label}
  </motion.button>
);

export default ControlButton;
