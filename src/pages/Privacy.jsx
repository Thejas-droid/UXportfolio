import React from "react";
import { Link } from "react-router-dom";
import { profile } from "../content/profile";
import { useSeoMeta } from "../hooks/useSeoMeta";
export default function Privacy() {
  useSeoMeta({ title: "Privacy Policy", description: `Privacy Policy for ${profile.name}.`, path: "/privacy" });
  return <main className="personal-placeholder">
    <Link to="/">Back to {profile.name}</Link>
    <h1>Privacy Policy</h1>
    <p>[Add your privacy policy here before publishing.]</p>
    <p>This page is a placeholder for {profile.name}'s portfolio.</p>
  </main>;
}
