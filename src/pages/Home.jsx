import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { projects } from "../content/projects";
import Journey from "../components/Journey";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { profile, emailHref, seoDescription } from "../content/profile";
import ProfileLink from "../components/ProfileLink";
import "./HomePage.css";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1];
const NAV_TRANSITION = { duration: 0.58, ease: EASE };

const routeSections = {
  "/about": "about",
  "/timeline": "timeline",
  "/projects": "works",
  "/contact": "contact",
};

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#works" },
  { label: "Contact", href: "#contact" },
];

const contactLinks = [
  { label: "GitHub", href: profile.socials.github, Icon: Github },
  { label: "Instagram", href: profile.socials.instagram, Icon: Instagram },
  { label: "LinkedIn", href: profile.socials.linkedin, Icon: Linkedin },
  { label: "Email", href: emailHref, Icon: Mail },
];


const clean = (value = "") =>
  String(value)
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\s+/g, " ")
    .trim();

function RollingText({ children }) {
  const letters = Array.from(String(children));
  const renderLetters = (line) => (
    <span className={`rolling-text__line rolling-text__line--${line}`} aria-hidden="true">
      {letters.map((letter, index) => (
        <span className="rolling-text__char" style={{ "--char-index": index }} key={`${line}-${letter}-${index}`}>
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  );

  return (
    <span className="rolling-text" aria-label={children}>
      {renderLetters("top")}
      {renderLetters("bottom")}
    </span>
  );
}

function CtaArrow() {
  return (
    <span className="mp-arrow" aria-hidden="true">
      <ArrowUpRight size={28} />
      <ArrowUpRight size={28} />
    </span>
  );
}

function SocialIconLink({ href, label, Icon }) {
  return (
    <ProfileLink
      className="contact__social-link"
      href={href}
      target={href?.startsWith("mailto:") ? undefined : "_blank"}
      rel={href?.startsWith("mailto:") ? undefined : "noreferrer"}
      aria-label={href ? label : `${label} (coming soon)`}
    >
      <span className="contact__social-icon" aria-hidden="true"><Icon size={22} strokeWidth={2} /></span>
      <span className="contact__social-icon" aria-hidden="true"><Icon size={22} strokeWidth={2} /></span>
    </ProfileLink>
  );
}

function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="mp-nav"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
    >
      <motion.nav
        className="mp-nav__panel"
        animate={{ height: open ? 259 : 60 }}
        transition={NAV_TRANSITION}
        aria-label="Primary navigation"
      >
        <div className="mp-nav__top">
          <a className="mp-nav__brand" href="#home" onClick={() => setOpen(false)}>
            {profile.name}
          </a>
          <button
            type="button"
            className="mp-nav__toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <motion.span animate={open ? "open" : "closed"} variants={{ closed: { x: -6, rotate: 0, width: 4, height: 4, borderRadius: 8 }, open: { x: 0, rotate: 45, width: 16, height: 2, borderRadius: 2 } }} transition={{ duration: 0.5, ease: EASE }} />
            <motion.span animate={open ? "open" : "closed"} variants={{ closed: { opacity: 1, width: 4, height: 4, borderRadius: 8 }, open: { opacity: 1, y: 20, width: 4, height: 4, borderRadius: 8 } }} transition={{ duration: 0.5, ease: EASE }} />
            <motion.span animate={open ? "open" : "closed"} variants={{ closed: { x: 6, rotate: 0, width: 4, height: 4, borderRadius: 8 }, open: { x: 0, rotate: -45, width: 16, height: 2, borderRadius: 2 } }} transition={{ duration: 0.5, ease: EASE }} />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="mp-nav__menu"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } } }}
            >
              {navLinks.slice(1).map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { x: -20 }, show: { x: 0, transition: { duration: 0.28, ease: EASE } } }}
                >
                  <RollingText>{link.label}</RollingText>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}

function HeroBio() {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const faceRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current || !cardRef.current || !faceRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, {
        scale: 0.5,
        rotateY: -180,
        transformPerspective: 1200,
        transformOrigin: "bottom center",
      });
      gsap.set(faceRef.current, { opacity: 0.966 });
      gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "+=1200",
          scrub: 0.5,
        },
      })
        .to(cardRef.current, { scale: 1, rotateY: 0, ease: "none" }, 0)
        .to(faceRef.current, { opacity: 1, ease: "none" }, 0);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-bio" id="home" ref={wrapRef}>
      <div className="hero-bio__sticky" aria-hidden="true">
        <div className="avatar-anchor">
          <div className="avatar-card" ref={cardRef}>
            <div className="avatar-card__face avatar-card__face--back">
              <img src={profile.portrait} alt="" />
            </div>
            <div className="avatar-card__face avatar-card__face--front" ref={faceRef}>
              <img src={profile.portrait} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-bio__text-layer">
        <motion.div
          className="hero-screen section-wrap"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } } }}
        >
          <motion.img src="/template/hero-star.png" alt="" className="hero-screen__star" variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }} />
          <motion.h1 variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}>
            {profile.heroLines.map((line) => <span key={line}>{line}</span>)}
          </motion.h1>
          <motion.img src="/template/hero-bolt.png" alt="" className="hero-screen__bolt" variants={{ hidden: { opacity: 0, y: 30, rotate: 16 }, show: { opacity: 1, y: 0, rotate: 16, transition: { duration: 0.8, ease: EASE } } }} />
          <div className="hero-screen__meta">
            <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55, ease: EASE }}>{"\u00A9"}{new Date().getFullYear()}</motion.span>
            <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.62, ease: EASE }}>{profile.name.toUpperCase()}</motion.span>
          </div>
        </motion.div>

        <div className="bio-screen section-wrap" id="about">
          <div className="bio-screen__left">
            <h2>Hey!</h2>
            <p>
              {profile.bio}
            </p>
          </div>
          <div className="bio-screen__right">
            <p>
              {profile.about}
            </p>
            <a className="mp-pill mp-pill-dark" href="#contact">
              Get Started
              <CtaArrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteSection() {
  const text = profile.statement;
  const words = text.split(" ");
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const range = ref.current.offsetHeight - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, range > 0 ? -rect.top / range : 0)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const filled = progress * words.length;

  return (
    <section className="quote-section" ref={ref}>
      <div className="quote-section__sticky">
        <p>
          {words.map((word, index) => {
            const alpha = Math.min(1, Math.max(0.1, filled - index + 0.5));
            return (
              <span key={`${word}-${index}`} style={{ color: `rgba(17,17,17,${alpha})` }}>
                {word}{index < words.length - 1 ? " " : ""}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Services() {
  const services = profile.services;

  return (
    <section className="services" id="services">
      <div className="section-wrap">
        <h2 data-reveal="title">Services</h2>
        <div className="service-list" data-reveal-stagger="rows">
          {services.map((service) => (
            <div className="service-row" key={service.title}>
              <h3>{service.title}</h3>
              <div>
                {service.tags.map((tag, index) => (
                  <span key={tag}>{index > 0 && <i>/</i>}{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const featured = projects.slice(0, 4);
  return (
    <section className="works" id="works">
      <div className="section-wrap">
        <div className="section-title-row" data-reveal="split">
          <h2>Featured Projects</h2>
          <a className="mp-pill mp-pill-light" href="#works">
            View All Work
            <CtaArrow />
          </a>
        </div>
        <div className="works-grid" data-reveal-stagger="cards">
          {featured.map((project) => (
            <ProfileLink className="work-card" key={project.slug} href={project.demo || project.link} target={project.demo || project.link ? "_blank" : undefined} rel={project.demo || project.link ? "noreferrer" : undefined}>
              <div className="work-card__image">
                <img src={project.image} alt={`${clean(project.title)} preview`} loading="lazy" />
              </div>
              <h3>{clean(project.title)}</h3>
              <p>{project.tech.slice(0, 3).map(clean).join(" / ")}</p>
            </ProfileLink>
          ))}
        </div>
      </div>
    </section>
  );
}


function TemplateLibrary() {
  const templates = profile.templates;

  return (
    <section className="templates" id="templates">
      <div className="section-wrap templates__grid">
        <div className="templates__copy" data-reveal="title">
          <span>/Template archive</span>
          <h2>Website Templates</h2>
          <p>[Add a description of your templates, experiments, or other work.]</p>

        </div>
        <div className="templates__list" data-reveal-stagger="templates">
          {templates.map((template, index) => (
            <ProfileLink key={template.name} href={template.href} target="_blank" rel="noreferrer">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{template.name.replaceAll("-", " ")}</strong>
              <ArrowUpRight size={22} aria-hidden="true" />
            </ProfileLink>
          ))}
        </div>
      </div>
    </section>
  );
}
function Testimonials() {
  const proof = profile.testimonials;

  return (
    <section className="testimonials">
      <div className="section-wrap">
        <h2 data-reveal="title">Testimonials</h2>
        <div className="testimonial-grid" data-reveal-stagger="proof">
          {proof.map((item) => (
            <figure key={item.name}>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <span>{item.name.slice(0, 1)}</span>
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    const subject = `[${profile.name}] Portfolio inquiry from ${name}`;
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    setStatus("sending");

    if (!accessKey && !profile.email) {
      setStatus("unavailable");
      return;
    }

    if (!accessKey) {
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("draft");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("access_key", accessKey);
      payload.append("name", name);
      payload.append("email", email);
      payload.append("subject", subject);
      payload.append("message", message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Delivery failed");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const submitLabel = {
    idle: "Submit",
    unavailable: "Contact coming soon",
    sending: "Sending",
    success: "Sent",
    draft: "Email Draft",
    error: "Retry",
  }[status];

  return (
    <section className="contact" id="contact">
      <div className="section-wrap contact__grid" data-reveal-stagger="contact">
        <div className="contact__intro">
          <div>
            <h2>{"Let\u2019s talk."}</h2>
            <p>Have a project in mind? Get in touch with {profile.firstName}.</p>
          </div>
          <div className="contact__socials" aria-label="Social links">
            {contactLinks.map(({ label, href, Icon }) => (
              <SocialIconLink key={label} href={href} label={label} Icon={Icon} />
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Name<input name="name" placeholder="Enter your name" required /></label>
          <label>Email<input name="email" type="email" placeholder="Enter your email" required /></label>
          <label>Your Project<textarea name="message" rows={4} placeholder="Tell me about your project" required /></label>
          <button type="submit" disabled={status === "sending" || (!profile.email && !import.meta.env.VITE_WEB3FORMS_KEY)}><RollingText>{!profile.email && !import.meta.env.VITE_WEB3FORMS_KEY ? "Contact coming soon" : submitLabel}</RollingText></button>
          {!profile.email && !import.meta.env.VITE_WEB3FORMS_KEY && <p className="contact__status" role="status">Contact details coming soon.</p>}
          {status !== "idle" && status !== "sending" && (
            <div className={`contact__status contact__status--${status}`} role="status">
              {status === "unavailable" && "Contact details coming soon. Your message has not been sent."}
              {status === "success" && "Message sent."}
              {status === "draft" && "Email draft opened."}
              {status === "error" && "Delivery failed. Try again or use the email link."}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
function SiteFooter() {
  return (
    <footer className="footer">
      <div className="section-wrap footer__grid" data-reveal-stagger="footer">
        <h2>{profile.footerTagline}</h2>
        <div>
          <p>/Quick links</p>
          <div className="footer__links">
            {navLinks.map((link) => <a key={link.href} href={link.href}><RollingText>{link.label === "Projects" ? "Works" : link.label}</RollingText></a>)}
          </div>
        </div>
        <div className="footer__contact">
          <p>/Contact</p>
          <ProfileLink className="footer__mail" href={emailHref}>{profile.email || profile.emailPlaceholder}</ProfileLink>
          <div className="footer__actions">
            <ProfileLink className="footer__resume" href={profile.resumeUrl} download>
              <RollingText>{profile.resumeUrl ? "Resume" : "Resume coming soon"}</RollingText>
              <span className="footer__action-icon" aria-hidden="true"><Download size={15} /></span>
            </ProfileLink>
            <a className="footer__external" href="#templates">
              <RollingText>Templates</RollingText>
              <span className="footer__action-icon" aria-hidden="true"><ArrowUpRight size={15} /></span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer__wordmark" data-reveal="wordmark" aria-hidden="true">{profile.firstName.toUpperCase()}</div>
    </footer>
  );
}
function Home() {
  const location = useLocation();

  useSeoMeta({
    title: profile.name,
    description: seoDescription,
    path: location.pathname,
  });

  useEffect(() => {
    if (location.hash) return;
    const target = routeSections[location.pathname];
    if (!target) return;
    window.requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ block: "start" }));
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const singleFrom = {
        title: { autoAlpha: 0, y: 38, filter: "blur(8px)" },
        split: { autoAlpha: 0, y: 24, filter: "blur(6px)" },
        wordmark: { autoAlpha: 0, y: 86, filter: "blur(10px)" },
      };

      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        const type = element.dataset.reveal || "title";
        gsap.fromTo(
          element,
          singleFrom[type] || singleFrom.title,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: type === "wordmark" ? 1 : 0.82,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const groupFrom = {
        rows: { autoAlpha: 0, x: -28, filter: "blur(4px)" },
        cards: { autoAlpha: 0, y: 44, scale: 0.985, filter: "blur(7px)" },
        proof: { autoAlpha: 0, y: 30, scale: 0.98, filter: "blur(6px)" },
        contact: { autoAlpha: 0, y: 42, filter: "blur(8px)" },
        footer: { autoAlpha: 0, y: 34, filter: "blur(6px)" },
        templates: { autoAlpha: 0, y: 22, filter: "blur(5px)" },
      };

      gsap.utils.toArray("[data-reveal-stagger]").forEach((group) => {
        const type = group.dataset.revealStagger || "cards";
        const children = group.querySelectorAll(":scope > *");
        if (!children.length) return;

        gsap.fromTo(
          children,
          groupFrom[type] || groupFrom.cards,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: type === "rows" ? 0.72 : 0.86,
            ease: "power3.out",
            stagger: type === "contact" ? 0.14 : 0.085,
            scrollTrigger: {
              trigger: group,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <SiteNav />
      <main>
        <HeroBio />
        <QuoteSection />
        <Services />
        <Projects />
        {/* <TemplateLibrary /> */}
        {/* <Testimonials /> */}
        <Journey />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

export default Home;
