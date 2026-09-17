// Edit your personal details here. Empty URLs keep links safely disabled.
export const profile = {
  name: "Sneha Sunil",
  firstName: "Sneha",
  role: "UI/UX Designer",
  heroLines: ["UI / UX", "Designer"],
  bio: "I'm Sneha Sunil, a Product-focused UX Designer.",
  about: "Product-focused UX Designer with hands-on experience designing user-centered digital products and solving user and business problems through thoughtful design. Experienced in translating product requirements into intuitive user flows, interfaces, and prototypes while collaborating with product and development teams. Proficient in Figma, with a strong interest in creating simple, scalable, and engaging product experiences.",
  statement: "I design products for people, not screens. Simple flows, thoughtful interactions, and clear experiences built around what users need and what makes the product better.",
  location: "Kerala, India",
  company: "[Your company or independent work]",
  availability: "[Your availability]",
  email: "snehasunilmm@gmail.com",
  emailPlaceholder: "snehasunilmm@gmail.com",
  socials: { github: "", linkedin: "https://www.linkedin.com/in/snehasunilmm", instagram: "", behance: "https://www.behance.net/snehasunilofficial" },
  repositoryUrl: "",
  siteUrl: "", // Your real https:// domain; never guess a username or domain.
  resumeUrl: "", // Put your PDF in public/ and set /Thejas-S-Resume.pdf here.
  portrait: "/placeholders/profile.png",
  personalImage: "/placeholders/personal.svg",
  socialImage: "/placeholders/social.svg",
  footerTagline: "[Add your personal tagline]",
  services: [
    { title: "Wireframing", tags: ["Figma", "Adobe XD"] },
    { title: "Prototyping", tags: ["Figma", "User Flows"] },
    { title: "User Research", tags: ["Usability Testing", "Feedback"] },
    { title: "Product Design", tags: ["Web", "Mobile"] },
  ],
  templates: [
    { name: "[Template or experiment 01]", href: "" },
    { name: "[Template or experiment 02]", href: "" },
    { name: "[Template or experiment 03]", href: "" },
  ],
  testimonials: [
    { quote: "[Add a real testimonial with permission.]", name: "[Client name 01]", role: "[Role / company]" },
    { quote: "[Add a real testimonial with permission.]", name: "[Client name 02]", role: "[Role / company]" },
    { quote: "[Add a real testimonial with permission.]", name: "[Client name 03]", role: "[Role / company]" },
    { quote: "[Add a real testimonial with permission.]", name: "[Client name 04]", role: "[Role / company]" },
  ],
};

export const emailHref = profile.email ? `mailto:${profile.email}` : undefined;
export const seoDescription = `${profile.name}`;
