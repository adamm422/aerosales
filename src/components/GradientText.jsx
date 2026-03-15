import { motion } from "motion/react";
import { useRef } from "react";

function GradientText({
  children,
  className = "",
  colors = ["#40ffaa", "#4079ff", "#40ffaa"],
  animationSpeed = 3,
  showBorder = false,
}) {
  const gradientRef = useRef(null);

  const gradientString = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {showBorder && (
        <div
          className="absolute inset-0 rounded-lg p-[2px] opacity-50"
          style={{
            background: gradientString,
            backgroundSize: "200% 100%",
            animation: `gradientShift ${animationSpeed}s linear infinite`,
          }}
        >
          <div className="w-full h-full bg-white rounded-md" />
        </div>
      )}
      <span
        ref={gradientRef}
        className="relative bg-clip-text text-transparent font-bold"
        style={{
          backgroundImage: gradientString,
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: `gradientShift ${animationSpeed}s linear infinite`,
        }}
      >
        {children}
      </span>
      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default GradientText;
