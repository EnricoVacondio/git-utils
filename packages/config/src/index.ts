import { parseConfigFile, readConfigFile } from "./config-parser"

export { COMMIT_TYPES, COMMIT_TYPES_DESCRIPTION } from "./defaults"
export { ConfigFileSchema } from "./options"

export default function () {
  const customConfigFilePath = process.argv.find((arg) => arg.startsWith("--config="))?.split("=")[1]
  const configFileContent = readConfigFile(customConfigFilePath)
  const parsedConfig = parseConfigFile(configFileContent)
  return parsedConfig
}
