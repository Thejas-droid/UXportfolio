import React from "react";

// Keep unconfigured destinations visible without linking to fake accounts.
export default function ProfileLink({ href, children, placeholder, className, ...props }) {
  if (!href || href === "#") {
    return <span className={className} role="link" aria-disabled="true" title={placeholder || "Coming soon"} aria-label={props["aria-label"]}>{children}</span>;
  }
  return <a href={href} className={className} {...props}>{children}</a>;
}
