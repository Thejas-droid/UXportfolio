import React from "react";
import { Link } from "react-router-dom";
import { profile } from "../content/profile";
import { useSeoMeta } from "../hooks/useSeoMeta";
export default function Love() {
  useSeoMeta({ title: "Personal", description: `Personal page for ${profile.name}.`, path: "/love" });
  return <main className="personal-placeholder">
    <Link to="/">Back to {profile.name}</Link>
    <h1>[Your personal page]</h1>
    <img src={profile.personalImage} alt="Personal image placeholder" width="600" height="400" />
    <p>[Add your own personal message here.]</p>
  </main>;
}
