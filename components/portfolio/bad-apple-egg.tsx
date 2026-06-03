"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  asciiFontSize,
  BAD_APPLE_PATHS,
  frameFromTime,
  loadBadAppleFrames,
} from "@/lib/bad-apple";

const TRIGGER = "badapple";

type PlayState = "idle" | "loading" | "ready" | "playing" | "error";

export function BadAppleEgg() {
  const bufferRef = useRef("");
  const [show, setShow] = useState(false);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState(0);

  const framesRef = useRef<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const displayRef = useRef<HTMLPreElement>(null);
  const rafRef = useRef<number>();
  const playingRef = useRef(false);

  const stopPlayback = useCallback(() => {
    playingRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  const close = useCallback(() => {
    stopPlayback();
    setShow(false);
    setPlayState("idle");
    setProgress(0);
    setErrorMsg("");
    document.body.style.overflow = "";
  }, [stopPlayback]);

  const renderLoop = useCallback(() => {
    const audio = audioRef.current;
    const display = displayRef.current;
    const frames = framesRef.current;

    if (!audio || !display || !frames.length || !playingRef.current) return;

    display.textContent = frameFromTime(frames, audio.currentTime);

    if (audio.duration && Number.isFinite(audio.duration)) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }

    if (!audio.paused && !audio.ended) {
      rafRef.current = requestAnimationFrame(renderLoop);
    }
  }, []);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !framesRef.current.length) return;

    try {
      audio.load();
      await audio.play();
      playingRef.current = true;
      setPlayState("playing");
      renderLoop();
    } catch {
      setPlayState("error");
      setErrorMsg("Could not play audio. Click Play to start.");
    }
  }, [renderLoop]);

  const prepareAndPlay = useCallback(async () => {
    setPlayState("loading");
    setErrorMsg("");

    try {
      framesRef.current = await loadBadAppleFrames();
      setPlayState("ready");
      await startPlayback();
    } catch (err) {
      setPlayState("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Failed to load Bad Apple. Run: npm run bad-apple:fetch"
      );
    }
  }, [startPlayback]);

  const open = useCallback(() => {
    setShow(true);
    bufferRef.current = "";
    document.body.style.overflow = "hidden";
    void prepareAndPlay();
  }, [prepareAndPlay]);

  const resizeDisplay = useCallback(() => {
    const display = displayRef.current;
    if (!display) return;
    const size = asciiFontSize(window.innerWidth, window.innerHeight);
    display.style.fontSize = `${size}px`;
  }, []);

  useEffect(() => {
    if (!show) return;
    resizeDisplay();
    window.addEventListener("resize", resizeDisplay);
    return () => window.removeEventListener("resize", resizeDisplay);
  }, [show, resizeDisplay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      stopPlayback();
      setTimeout(close, 800);
    };

    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [show, close, stopPlayback]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && show) {
        close();
        return;
      }

      if (show || event.key.length !== 1) return;

      bufferRef.current = (bufferRef.current + event.key.toLowerCase()).slice(
        -TRIGGER.length
      );
      if (bufferRef.current === TRIGGER) {
        open();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      stopPlayback();
    };
  }, [show, close, open, stopPlayback]);

  return (
    <>
      <audio
        ref={audioRef}
        src={BAD_APPLE_PATHS.audio}
        preload="auto"
        className="hidden"
      />

      <AnimatePresence>
        {show && (
          <motion.div
            role="dialog"
            aria-label="Bad Apple ASCII animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[110] flex flex-col overflow-hidden bg-black text-white"
            onClick={close}
          >
            <div className="bad-apple-scanlines pointer-events-none absolute inset-0 z-20" />

            <div
              className="relative z-30 flex shrink-0 items-center justify-between px-4 py-3 font-mono text-xs text-white/50 sm:px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <span>bad_apple.ascii @ 30fps</span>
              <div className="flex items-center gap-3">
                {playState === "error" && (
                  <button
                    type="button"
                    onClick={() => void prepareAndPlay()}
                    className="rounded border border-white/25 px-2 py-1 hover:bg-white/10"
                  >
                    Retry
                  </button>
                )}
                {(playState === "ready" || playState === "error") && (
                  <button
                    type="button"
                    onClick={() => void startPlayback()}
                    className="rounded border border-white/25 px-2 py-1 hover:bg-white/10"
                  >
                    Play
                  </button>
                )}
                <button
                  type="button"
                  onClick={close}
                  className="rounded border border-white/25 px-2 py-1 hover:bg-white/10"
                >
                  ESC · close
                </button>
              </div>
            </div>

            <div
              className="relative z-10 flex flex-1 flex-col items-center justify-center px-2 pb-4"
              onClick={(e) => e.stopPropagation()}
            >
              {playState === "loading" && (
                <p className="font-mono text-sm text-white/50 animate-pulse">
                  Loading frames & audio…
                </p>
              )}

              {playState === "error" && (
                <p className="max-w-md text-center font-mono text-sm text-red-300/90 px-4">
                  {errorMsg}
                </p>
              )}

              <pre
                ref={displayRef}
                className={`max-h-full max-w-full overflow-hidden whitespace-pre text-center font-mono leading-[1.1] text-white ${
                  playState === "loading" || playState === "error"
                    ? "opacity-0 h-0"
                    : "opacity-100"
                }`}
                aria-live="off"
              />
            </div>

            <div
              className="relative z-30 shrink-0 px-6 pb-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-2 h-1 max-w-lg overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-white/80 transition-[width] duration-150 linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center font-mono text-[10px] text-white/35 sm:text-xs">
                Type badapple · Assets: EmirXK/bad_apple (MIT) · ESC to exit
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
