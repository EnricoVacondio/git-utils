import { z } from "zod"
import { COMMIT_TYPES } from "./defaults"

export const ChangelogConfigSchema = z.object({
  baseBranch: z
    .string()
    .default("<default-branch>")
    .describe("The base branch to compare changes against. <default-branch> by default."),
  changelogFile: z.string().default("CHANGELOG.md").describe("The changelog file to update. <baseDir>/CHANGELOG.md by default."),
  allowedBranchPatterns: z
    .array(z.string())
    .default(["*"])
    .describe("An array of glob patterns to filter which commits should be included in the changelog. Defaults to all branches."),
  allowedCommitTypes: z
    .array(z.string())
    .default(COMMIT_TYPES)
    .describe("An array of commit types to include in the changelog. Defaults to all types."),
})

export const CommitConfigSchema = z.object({
  allowedCommitTypes: z.array(z.string()).default(COMMIT_TYPES).describe("An array of allowed commit types."),
  //
  hasJiraTicket: z.boolean().default(false).describe("Whether commit messages should include a JIRA ticket."),
  jiraTicketPattern: z
    .string()
    .default("[A-Z]{2,}-\\d+")
    .describe("The regex pattern to validate JIRA tickets in commit messages."),
})

export const ConfigFileSchema = z.object({
  baseDir: z.string().default(".").describe("The base directory of the project. (Default to process.cwd())"),
  changelog: ChangelogConfigSchema.prefault({}).describe("Configuration options for changelog generation."),
  commit: CommitConfigSchema.prefault({}).describe("Configuration options for commit message generation."),
})
