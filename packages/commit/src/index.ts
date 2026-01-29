import { z } from "zod"
import { ConfigFileSchema, COMMIT_TYPES_DESCRIPTION } from "@git-utils/config"
import { input, select } from "@inquirer/prompts"
import simpleGit from "simple-git"
import chalk from "chalk"

export default async function (config: z.infer<typeof ConfigFileSchema>) {
  const stagedFiles = await simpleGit(config.baseDir).diff(["--cached", "--name-only"])
  if (!stagedFiles) {
    console.warn(chalk.bgYellow("⚠️ No files are staged for commit. Please stage your changes before creating a commit."))
    return
  }

  const commitType = await select({
    message: "Select the type of commit:",
    choices: config.commit.allowedCommitTypes.map((type) => ({
      value: type,
      name: `${type} - ${COMMIT_TYPES_DESCRIPTION[type] || "No description available."}`,
    })),
  })

  const commitTitle = await input({
    message: "Enter the commit title:",
    validate: (value) => {
      if (value.length === 0) {
        return "Commit title cannot be empty."
      }
      return true
    },
  })

  const commitContentDescription = await input({
    message: "Enter the commit description (optional):",
  })

  let jiraTicket: string | null = null
  if (config.commit.hasJiraTicket) {
    jiraTicket = await input({
      message: "Enter the JIRA ticket:",
      validate: (value) => {
        const regex = new RegExp(config.commit.jiraTicketPattern)
        if (!regex.test(value)) {
          return `JIRA ticket must match the pattern: ${config.commit.jiraTicketPattern}`
        }
        return true
      },
    })
  }

  let fullCommitMessage = `${commitType}: ${commitTitle}`
  if (commitContentDescription) fullCommitMessage += `\n\n--\n${commitContentDescription}--\n`
  if (jiraTicket) fullCommitMessage += `\nJIRA Ref: ${jiraTicket}`

  try {
    await simpleGit(config.baseDir).commit(fullCommitMessage, undefined)
  } catch (error) {
    throw new Error(`Failed to create commit: ${(error as Error).message}`)
  }
}
