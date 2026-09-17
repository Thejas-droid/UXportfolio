import React from "react";
import { profile, emailHref } from "../../content/profile";
import { projects } from "../../content/projects";
import { timeline } from "../../content/timeline";
import { skills } from "../../content/skills";
import ProfileLink from "../ProfileLink";

const REGISTRY = {
  help: () => ({ output: <p>Commands: {Object.keys(REGISTRY).join(", ")}</p> }),
  whoami: () => ({ output: <p>{profile.name} — {profile.role}</p> }),
  about: () => ({ output: <div><p>{profile.bio}</p><p>{profile.about}</p><p>{profile.company} · {profile.location}</p></div> }),
  projects: () => ({ output: <div>{projects.map(p => <p key={p.slug}>{p.title}: {p.description}</p>)}</div>, navigate: "/projects" }),
  timeline: () => ({ output: <div>{timeline.map(t => <p key={t.title}>{t.year}: {t.title}</p>)}</div>, navigate: "/timeline" }),
  skills: () => ({ output: <div>{skills.map(s => <p key={s.name}>{s.name}</p>)}</div> }),
  contact: () => ({ output: <ProfileLink href={emailHref}>{profile.email || "Contact details coming soon"}</ProfileLink>, navigate: "/contact" }),
  resume: () => ({ output: <ProfileLink href={profile.resumeUrl} download>{profile.resumeUrl ? "Download resume" : "Resume coming soon"}</ProfileLink>, ...(profile.resumeUrl ? { download: profile.resumeUrl } : {}) }),
  "sudo hire-me": () => ({ output: <p>{profile.availability} — visit Contact to get in touch.</p>, navigate: "/contact" }),
  clear: () => ({ clear: true, output: null }),
  exit: () => ({ output: <p>You can close this terminal or continue exploring.</p> }),
  pwd: () => ({ output: <p>/home/thejas/portfolio</p> }),
  date: () => ({ output: <p>{new Date().toString()}</p> }),
  ls: () => REGISTRY.projects(),
  man: () => ({ output: <p>{profile.name} — {profile.role}. Type help to explore.</p> }),
};
export const COMMAND_NAMES = Object.keys(REGISTRY);
export function executeCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (REGISTRY[cmd]) return REGISTRY[cmd]();
  if (cmd.startsWith("echo ")) return { output: <p>{raw.slice(5)}</p> };
  return { output: <p>{raw}: command not found. Type help for available commands.</p> };
}
