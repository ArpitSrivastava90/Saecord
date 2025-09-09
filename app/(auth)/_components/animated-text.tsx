"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export const EncryptionText = ({
  text,
  duration = 900, // ~1–1.3s
}: {
  text: string;
  duration?: number;
}) => {
  const [displayed, setDisplayed] = useState("");
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  useEffect(() => {
    const animate = () => {
      const locked = new Set<number>();
      const totalLocks = Math.floor(text.length * 0.6); // only ~60% scramble
      const stepTime = duration / totalLocks;

      const scramble = setInterval(() => {
        if (locked.size >= totalLocks) {
          clearInterval(scramble);
          setDisplayed(text);
          return;
        }

        locked.add(Math.floor(Math.random() * text.length));
        setDisplayed(
          text
            .split("")
            .map((c, i) =>
              locked.has(i)
                ? c
                : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("")
        );
      }, stepTime);
    };

    animate();
    const loop = setInterval(animate, duration + 9000); // repeat every ~5s
    return () => clearInterval(loop);
  }, [text, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {displayed}
    </motion.span>
  );
};
