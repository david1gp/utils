import { readFileSync, writeFileSync, readdirSync, statSync } from "fs"
import { join, relative, dirname } from "path"

const srcDir = join(process.cwd(), "src")

function getRelativePath(from: string, to: string): string {
  const fromDir = dirname(from)
  const relativePath = relative(fromDir, to)
  return relativePath.startsWith(".") ? relativePath : "./" + relativePath
}

function processFile(filePath: string) {
  let content = readFileSync(filePath, "utf-8")
  const originalContent = content
  
  const importRegex = /from\s+"~utils\/([^"]+)"/g
  content = content.replace(importRegex, (match, importPath) => {
    const targetPath = join(srcDir, importPath)
    const relativePath = getRelativePath(filePath, targetPath)
    return `from "${relativePath}"`
  })
  
  if (content !== originalContent) {
    writeFileSync(filePath, content, "utf-8")
    console.log(`Updated: ${filePath}`)
  }
}

function walkDir(dir: string) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      walkDir(fullPath)
    } else if (entry.endsWith(".ts") && !entry.endsWith(".d.ts") && !entry.endsWith(".test.ts") && !entry.endsWith(".cliTest.ts")) {
      processFile(fullPath)
    }
  }
}

walkDir(srcDir)
console.log("Done!")
