import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import z from "zod"
import { ConfigFileSchema } from "./options"
import { parse } from "yaml"

export enum AllowedConfigFileName {
  JSON = "git-utils.config.json",
  YAML = "git-utils.config.yaml",
  YML = "git-utils.config.yml",
}

export function readConfigFile(customPath?: string) {
  let isJson = false
  let isYaml = false

  const configFileList = customPath ? [customPath] : Object.values(AllowedConfigFileName)

  for (const fileName of configFileList) {
    if (existsSync(path.join(process.cwd(), fileName))) {
      return {
        fileContent: readFileSync(path.join(process.cwd(), fileName), "utf-8"),
        isJson: fileName.endsWith(".json"),
        isYaml: fileName.endsWith(".yaml") || fileName.endsWith(".yml"),
      } as const
    }
  }

  return {
    isJson,
    isYaml,
    fileContent: null,
  } as const
}

export function parseConfigFile(args: { isJson: boolean; isYaml: boolean; fileContent: string | null }) {
  let content: z.infer<typeof ConfigFileSchema> = ConfigFileSchema.parse({})

  if (args.isYaml && args.fileContent) {
    const parsedYaml = parse(args.fileContent)
    content = ConfigFileSchema.parse(parsedYaml)
    return content
  }

  if (args.isJson && args.fileContent) {
    const parsedJson = JSON.parse(args.fileContent)
    content = ConfigFileSchema.parse(parsedJson)
    return content
  }

  return content
}
