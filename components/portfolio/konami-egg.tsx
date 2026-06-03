"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function KonamiEgg() {
  const sequenceRef = useRef<string[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const seq = [...sequenceRef.current, event.key];
      if (seq.length > KONAMI_CODE.length) seq.shift();
      sequenceRef.current = seq;

      if (seq.join(",") === KONAMI_CODE.join(",")) {
        setShow(true);
        sequenceRef.current = [];
        setTimeout(() => setShow(false), 6000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6"
        >
          <div className="font-mono text-green-400 text-sm md:text-lg space-y-2 max-w-md">
            <p className="typing-animation">$ whoami</p>
            <p className="typing-animation delay-1">mahdi_hazrati</p>
            <p className="typing-animation delay-2">$ sudo make chai</p>
            <p className="typing-animation delay-3">Permission granted</p>
            <p className="typing-animation delay-4">
              $ echo &quot;You found the secret.&quot;
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
