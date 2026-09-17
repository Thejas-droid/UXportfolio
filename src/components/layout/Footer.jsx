import React from "react";
import { Link } from "react-router-dom";
import { profile, emailHref } from "../../content/profile";
import ProfileLink from "../ProfileLink";
export default function Footer() {
  return <footer className="bevel-out mt-8 p-3 font-mono text-sm">
    <p>{profile.name} — {profile.role}</p>
    <p>© {new Date().getFullYear()} {profile.name}</p>
    <div className="flex gap-3"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link>
      <ProfileLink href={emailHref}>{profile.email || "Contact coming soon"}</ProfileLink>
    </div>
  </footer>;
}
