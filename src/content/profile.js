// Portfolio content for Sneha Sunil.
export const profile = {
  name: "Sneha Sunil",
  firstName: "Sneha",
  role: "UI/UX Designer",
  heroLines: ["UI / UX", "Designer"],
  bio: "I'm Sneha Sunil, a Product-focused UX Designer.",
  aboutLead: "Thoughtful design. Everyday impact.",
  about: "I turn user needs and business goals into clear, intuitive digital experiences.",
  aboutDetail: "From user flows to polished Figma prototypes, I collaborate with product and development teams to make web and mobile products feel simple.",
  statement: "I design products for people, not screens. Simple flows, thoughtful interactions, and clear experiences built around what users need and what makes the product better.",
  location: "Kerala, India",
  email: "snehasunilmm@gmail.com",
  socials: { linkedin: "https://www.linkedin.com/in/snehasunilmm", instagram: "https://www.instagram.com/_____snehaaaa____?stkn=c2xydDFicnBhOG1z", behance: "https://www.behance.net/snehasunilofficial" },
  siteUrl: import.meta.env.VITE_SITE_URL || "",
  resumeUrl: "/resume/Sneha-Sunil-Resume.pdf",
  portrait: "/images/portrait.png",
  socialImage: "/images/social-preview.png",
  footerTagline: "A little thought. A better everyday.",
  services: [
    { title: "Wireframing", tags: ["Figma", "Adobe XD"] },
    { title: "Prototyping", tags: ["Figma", "User Flows"] },
    { title: "User Research", tags: ["Usability Testing", "Feedback"] },
    { title: "Product Design", tags: ["Web", "Mobile"] },
  ],

};

export const emailHref = profile.email ? `mailto:${profile.email}` : undefined;
export const seoDescription = "Sneha Sunil is a UI/UX designer in Kerala, creating thoughtful web and mobile experiences. Explore her projects, experience, and design skills.";
