import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose;

    const configure = () => {
      dispose?.();
      dispose = undefined;
      if (preference.matches) return;

      // Drive smooth scrolling and scroll animations on the same ticker.
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        anchors: true,
        autoRaf: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const handleVisibility = () => {
        if (document.hidden) lenis.stop();
        else lenis.start();
      };
      document.addEventListener("visibilitychange", handleVisibility);

      dispose = () => {
        document.removeEventListener("visibilitychange", handleVisibility);
        gsap.ticker.remove(tick);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
      };
    };

    configure();
    preference.addEventListener("change", configure);

    return () => {
      preference.removeEventListener("change", configure);
      dispose?.();
    };
  }, []);

  return <>{children}</>;
}
