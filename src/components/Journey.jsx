import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { BookOpen, GraduationCap, Code2, PenTool, Layers, Scan } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "../content/timeline";
import "./Journey.css";

gsap.registerPlugin(ScrollTrigger);

const beats = [...timeline].reverse();
const icons = { bachelor: BookOpen, master: GraduationCap, developer: Code2, zoople: PenTool, voxen: Layers, jaldee: Scan };
const ease = [0.16, 1, 0.3, 1];
const shapes = [
  "60% 40% 50% 50% / 40% 50% 50% 60%",
  "40% 60% 70% 30% / 50% 40% 60% 50%",
  "70% 30% 40% 60% / 60% 70% 30% 40%",
  "30% 70% 60% 40% / 40% 30% 70% 60%",
  "50% 50% 30% 70% / 70% 60% 40% 30%",
  "60% 40% 50% 50% / 40% 50% 50% 60%",
];

function JourneyArtwork({ entry, index, active }) {
  const ref = useRef(null);
  const bounds = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "200px" });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const moving = active && inView && !reduced;
  const duration = 18 + index * 2;
  const Icon = icons[entry.id];

  const reset = () => {
    bounds.current = null;
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (reduced) {
      x.set(0);
      y.set(0);
    }
  }, [reduced, x, y]);

  return (
    <motion.div
      ref={ref}
      className={`journey__artwork journey__artwork--${entry.type}`}
      aria-hidden="true"
      style={{ x: reduced ? 0 : sx, y: reduced ? 0 : sy }}
      onPointerEnter={(event) => {
        if (!reduced && event.pointerType === "mouse") bounds.current = ref.current.getBoundingClientRect();
      }}
      onPointerMove={(event) => {
        if (reduced || !bounds.current || event.pointerType !== "mouse") return;
        const rect = bounds.current;
        x.set((event.clientX - rect.left - rect.width / 2) * 0.2);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.2);
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <motion.div
        className="journey__artwork-mask"
        animate={moving ? { rotate: [0, 360], borderRadius: shapes } : { rotate: 0, borderRadius: shapes[0] }}
        transition={moving ? { repeat: Infinity, duration, ease: "linear" } : { duration: 0 }}
      >
        <motion.div
          className="journey__artwork-face"
          animate={moving ? { rotate: [360, 0] } : { rotate: 0 }}
          transition={moving ? { repeat: Infinity, duration, ease: "linear" } : { duration: 0 }}
        >
          {/* <span className="journey__artwork-ring" /> */}
          <Icon strokeWidth={1.1} />
          {/* <span className="journey__artwork-caption">{entry.artworkLabel}</span> */}
          {/* <span className="journey__artwork-number">{String(index + 1).padStart(2, "0")}</span> */}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Journey() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const markerRef = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(sectionRef, { margin: "200px" });
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const active = !reduced && inView && pageVisible;

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useLayoutEffect(() => {
    if (reduced) return;
    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 75%",
          end: "bottom 85%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(progressRef.current, { scaleY: 0 }, { scaleY: 1, ease: "none", force3D: true }, 0)
        // Translate instead of changing top so scrolling doesn't trigger layout.
        // Recalculate the travel distance when ScrollTrigger refreshes on resize.
        .fromTo(markerRef.current, { y: 0 }, {
          y: () => trackRef.current.offsetHeight,
          ease: "none",
          force3D: true,
        }, 0);
    }, sectionRef);
    return () => context.revert();
  }, [reduced]);

  return (
    <section className="journey" id="timeline" ref={sectionRef} aria-labelledby="journey-heading">
      <div className="section-wrap">
        <header className="journey__header" data-reveal="title">
          <p className="journey__eyebrow">/Experience & education</p>
          <h2 id="journey-heading">My Journey</h2>
          <p className="journey__intro">From computer applications to thoughtful digital products. The learning, people, and work that shape how I design.</p>
        </header>

        <div className="journey__track" ref={trackRef}>
          <div className="journey__rail" aria-hidden="true">
            <div className="journey__progress" ref={progressRef} />
          </div>
          <div className="journey__marker" ref={markerRef} aria-hidden="true">
            <div className="journey__marker-hover">
              <motion.div
                className="journey__marker-core"
                animate={active ? { rotate: [0, 360], borderRadius: shapes } : { rotate: 0, borderRadius: shapes[0] }}
                transition={active ? { repeat: Infinity, duration: 4, ease: "linear" } : { duration: 0 }}
              />
            </div>
          </div>

          <ol className="journey__entries">
            {beats.map((entry, index) => (
              <motion.li
                key={entry.id}
                className="journey__entry"
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={reduced ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: reduced ? 0 : 0.9, ease, delay: reduced ? 0 : 0.1 }}
              >
                <article className="journey__copy">
                  <div className="journey__meta">
                    <span>{entry.period}</span>
                    <span className="journey__meta-line" aria-hidden="true" />
                    <span className="journey__type">{entry.type === "education" ? "Education" : "Experience"}</span>
                  </div>
                  <h3>{entry.title}</h3>
                  <p className="journey__organization">{entry.organization}<span>{entry.location}</span></p>
                  {entry.summary && <p className="journey__description">{entry.summary}</p>}
                  <ul className="journey__tags" aria-label="Focus areas">
                    {entry.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </article>
                <JourneyArtwork entry={entry} index={index} active={active} />
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
