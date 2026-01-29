export const COMMIT_TYPES = ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore", "release", "bump"]

export const COMMIT_TYPES_DESCRIPTION: Record<string, string> = {
  feat: "A new feature",
  fix: "A bug fix",
  docs: "Documentation only changes",
  style: "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
  refactor: "A code change that neither fixes a bug nor adds a feature",
  perf: "A code change that improves performance",
  test: "Adding missing tests or correcting existing tests",
  chore: "Changes to the build process or auxiliary tools and libraries such as documentation generation",
  release: "Create a release commit",
  bump: "Version bump commit",
}
