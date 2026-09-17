// Replace each placeholder with your own project. Leave unknown URLs empty.
export const projects = [1, 2, 3, 4].map((number) => ({
  slug: `project-${number}`,
  title: `[Project ${String(number).padStart(2, "0")} title]`,
  filename: `project-${number}.app`,
  description: "[Describe the project, the problem it solves, and your contribution.]",
  details: "[Add your responsibilities, implementation details, and verified results.]",
  link: "",
  demo: "",
  tech: ["Your technology", "Your framework"],
  image: `/placeholders/project-${number}.svg`,
  accordionItems: [{ title: "[Implementation detail]", content: "[Describe your implementation.]" }],
}));
export default projects;
