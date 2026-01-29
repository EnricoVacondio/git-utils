import { Command } from "commander"
import readConfig from "@git-utils/config"
import commitCommand from "@git-utils/commit"

const commander = new Command("gtu").name("Git Utility CLI").description("A CLI tool for various Git utilities.")

commander
  .command("commit")
  .description("Create a commit with a structured message")
  .action(() => {
    const config = readConfig()
    commitCommand(config)
  })

commander.parse(process.argv)
