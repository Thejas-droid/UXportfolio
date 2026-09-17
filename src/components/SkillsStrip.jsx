import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  Component, Layers, MonitorSmartphone, MousePointer2, Palette,
  PanelsTopLeft, ScanSearch, UsersRound, Workflow,
} from "lucide-react";
import {
  SiAdobeillustrator, SiAdobephotoshop, SiAdobexd, SiCss3,
  SiFigma, SiHtml5, SiWordpress,
} from "react-icons/si";
import { skills } from "../content/skills";
import "./SkillsStrip.css";

const skillIcons = {
  Figma: SiFigma,
  "Adobe XD": SiAdobexd,
  Photoshop: SiAdobephotoshop,
  Illustrator: SiAdobeillustrator,
  WordPress: SiWordpress,
  Wireframing: PanelsTopLeft,
  Prototyping: Workflow,
  "User Research": UsersRound,
  "Product Design": Layers,
  "Interaction Design": MousePointer2,
  "Visual Design": Palette,
  "Usability Testing": ScanSearch,
  "Responsive Design": MonitorSmartphone,
  "Design Systems": Component,
  HTML: SiHtml5,
  CSS: SiCss3,
};

export default function SkillsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "100px" });
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return (
    <div className="skills-strip section-wrap" data-reveal="split" ref={ref}>
      <div
        className="skills-strip__viewport"
        role="region"
        aria-label="Skills"
        aria-description="Scrolling pauses on keyboard focus."
        tabIndex={0}
      >
        <div className={`skills-strip__track${inView && pageVisible ? " skills-strip__track--running" : ""}`}>
          {[0, 1].map((copy) => (
            <ul className="skills-strip__list" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {skills.map(({ name }) => {
                const Icon = skillIcons[name] || Component;
                return (
                  <li className="skills-strip__skill" key={name}>
                    <Icon aria-hidden="true" focusable="false" />
                    <span>{name}</span>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
