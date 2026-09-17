import React from "react";
import { Link } from "react-router-dom";
import { profile } from "../content/profile";
import { useSeoMeta } from "../hooks/useSeoMeta";
export default function Terms() {
  useSeoMeta({ title: "Terms & Conditions", description: `Terms & Conditions for ${profile.name}.`, path: "/terms" });
  return <main className="personal-placeholder">
    <Link to="/">Back to {profile.name}</Link>
    <h1>Terms & Conditions</h1>
    <p>[Add your terms & conditions here before publishing.]</p>
    <p>This page is a placeholder for {profile.name}'s portfolio.</p>
  </main>;
}
