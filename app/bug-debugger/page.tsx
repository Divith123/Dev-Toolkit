"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Bug } from "lucide-react"

export default function BugDebugger() {
  const [code, setCode] = useState<string>("")
  const [language, setLanguage] = useState<string>("javascript")
  const [debugResult, setDebugResult] = useState<any>(null)
  const [isDebugging, setIsDebugging] = useState<boolean>(false)

  // Example function to debug code using existing Node.js modules
  const debugCode = async () => {
    setIsDebugging(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // This would use modules like eslint/esprima for parsing in a real implementation
    const result = generateSampleDebug(code, language)
    setDebugResult(result)
    setIsDebugging(false)
  }

  const generateSampleDebug = (code: string, language: string) => {
    // This is a simplified example - in a real app, you'd use actual parsing and linting
    if (!code.trim()) return null

    // Sample bugs to detect based on language
    if (language === "javascript") {
      const issues = []

      // Check for missing semicolons
      if (code.match(/\w+\s*\n\s*\w+/) && !code.match(/;\s*\n/)) {
        issues.push({
          line: 1,
          column: code.indexOf("\n"),
          message: "Missing semicolon",
          severity: "warning",
          fix: "Add semicolons at the end of statements",
        })
      }

      // Check for undefined variables
      const varDeclarations = code.match(/(?:var|let|const)\s+(\w+)/g) || []
      const declaredVars = varDeclarations.map((v) => v.replace(/(?:var|let|const)\s+/, ""))
      const usedVars = (code.match(/\b\w+\b/g) || []).filter(
        (v) =>
          !["var", "let", "const", "function", "if", "else", "return", "true", "false", "null", "undefined"].includes(
            v,
          ),
      )

      for (const variable of usedVars) {
        if (!declaredVars.includes(variable) && !["console", "log", "Math", "document", "window"].includes(variable)) {
          issues.push({
            line:
              code.indexOf(variable) > 0
                ? (code.substring(0, code.indexOf(variable)).match(/\n/g) || []).length + 1
                : 1,
            column: code.indexOf(variable) - (code.substring(0, code.indexOf(variable)).lastIndexOf("\n") + 1),
            message: `'${variable}' is not defined`,
            severity: "error",
            fix: `Declare '${variable}' with let, const, or var before using it`,
          })
        }
      }

      // Check for unreachable code
      if (
        code.includes("return") &&
        code.split("return")[1].includes(";") &&
        code.split("return")[1].split(";")[1].trim().length > 0
      ) {
        issues.push({
          line: (code.substring(0, code.indexOf("return")).match(/\n/g) || []).length + 1,
          column: code.indexOf("return") - (code.substring(0, code.indexOf("return")).lastIndexOf("\n") + 1),
          message: "Unreachable code after return statement",
          severity: "error",
          fix: "Remove code after the return statement or move it before the return",
        })
      }

      // Generate fixed code
      let fixedCode = code
      if (issues.length > 0) {
        // Apply simple fixes
        if (issues.some((i) => i.message.includes("semicolon"))) {
          fixedCode = fixedCode.replace(/(\w+)\s*\n/g, "$1;\n")
        }

        if (issues.some((i) => i.message.includes("not defined"))) {
          const undefinedVars = issues
            .filter((i) => i.message.includes("not defined"))
            .map((i) => i.message.match(/'([^']+)'/)[1])

          for (const variable of undefinedVars) {
            const regex = new RegExp(`\\b${variable}\\b(?!\\s*=)`, "g")
            const declaration = `let ${variable};\n`
            fixedCode = declaration + fixedCode.replace(regex, variable)
          }
        }

        if (issues.some((i) => i.message.includes("Unreachable code"))) {
          fixedCode = fixedCode.replace(/return(.*?);([\s\S]*)/g, (match, returnValue, unreachableCode) => {
            return `// Moved code from after return
${unreachableCode.trim()}
return${returnValue};`
          })
        }
      }

      return {
        issues,
        fixedCode: issues.length > 0 ? fixedCode : code,
        summary:
          issues.length > 0
            ? `Found ${issues.length} issue${issues.length === 1 ? "" : "s"} in your JavaScript code.`
            : "No issues found in your JavaScript code.",
      }
    } else if (language === "python") {
      const issues = []

      // Check for indentation issues
      const lines = code.split("\n")
      let expectedIndent = 0

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (line.trim() === "") continue

        const indent = line.search(/\S|$/)

        if (line.trim().endsWith(":")) {
          // Next line should be indented
          expectedIndent = indent + 4
        } else if (i > 0 && lines[i - 1].trim().endsWith(":") && indent !== expectedIndent) {
          issues.push({
            line: i + 1,
            column: 1,
            message: "Incorrect indentation",
            severity: "error",
            fix: `Use ${expectedIndent} spaces for indentation after a colon`,
          })
        }
      }

      // Check for missing self parameter in methods
      if (code.includes("class ")) {
        const methodMatches = code.match(/def\s+(\w+)\s*$$([^)]*)$$:/g) || []
        for (const method of methodMatches) {
          if (!method.includes("__init__") && !method.includes("self") && !method.includes("cls")) {
            issues.push({
              line: (code.substring(0, code.indexOf(method)).match(/\n/g) || []).length + 1,
              column: code.indexOf(method) - (code.substring(0, code.indexOf(method)).lastIndexOf("\n") + 1),
              message: "Method missing 'self' parameter",
              severity: "error",
              fix: "Add 'self' as the first parameter to instance methods",
            })
          }
        }
      }

      // Generate fixed code
      let fixedCode = code
      if (issues.length > 0) {
        // Apply simple fixes
        if (issues.some((i) => i.message.includes("indentation"))) {
          const lines = fixedCode.split("\n")
          for (let i = 1; i < lines.length; i++) {
            if (lines[i - 1].trim().endsWith(":") && lines[i].trim() !== "") {
              const currentIndent = lines[i - 1].search(/\S|$/)
              lines[i] = " ".repeat(currentIndent + 4) + lines[i].trim()
            }
          }
          fixedCode = lines.join("\n")
        }

        if (issues.some((i) => i.message.includes("'self'"))) {
          fixedCode = fixedCode.replace(/def\s+(\w+)\s*$$([^)]*)$$:/g, (match, name, params) => {
            if (!name.includes("__init__") && !params.includes("self") && !params.includes("cls")) {
              return `def ${name}(self${params.trim() ? ", " + params : ""}):`
            }
            return match
          })
        }
      }

      return {
        issues,
        fixedCode: issues.length > 0 ? fixedCode : code,
        summary:
          issues.length > 0
            ? `Found ${issues.length} issue${issues.length === 1 ? "" : "s"} in your Python code.`
            : "No issues found in your Python code.",
      }
    }

    return {
      issues: [],
      fixedCode: code,
      summary: "Code analysis not implemented for this language in the demo.",
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bug Debugger</h1>
          <p className="text-muted-foreground mt-2">Identify and explain code errors with assistance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Code</CardTitle>
              <CardDescription>Paste your code and select the language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  placeholder={
                    language === "javascript"
                      ? "function calculateSum(a, b) {\n  return a + b\n  console.log('This will never run')\n}"
                      : "def calculate_sum(a, b):\n    return a + b\n    print('This will never run')"
                  }
                  className="font-mono h-64"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />

                <Button onClick={debugCode} disabled={!code.trim() || isDebugging} className="w-full">
                  {isDebugging ? "Debugging..." : "Debug Code"}
                  {!isDebugging && <Bug className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Debug Results</CardTitle>
              <CardDescription>Issues found and suggested fixes</CardDescription>
            </CardHeader>
            <CardContent>
              {debugResult ? (
                <div className="space-y-6">
                  <div className="p-4 rounded-md bg-muted">
                    <h3 className="font-medium mb-2">Summary</h3>
                    <p className="text-sm">{debugResult.summary}</p>
                  </div>

                  {debugResult.issues.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Issues Found</h3>
                      <div className="space-y-2">
                        {debugResult.issues.map((issue: any, index: number) => (
                          <div key={index} className="p-3 rounded-md bg-muted">
                            <div className="flex items-start justify-between">
                              <div>
                                <span
                                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    issue.severity === "error"
                                      ? "bg-destructive text-destructive-foreground"
                                      : "bg-warning text-warning-foreground"
                                  } mb-2`}
                                >
                                  {issue.severity}
                                </span>
                                <p className="text-sm font-medium">
                                  Line {issue.line}, Column {issue.column}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm mt-1">{issue.message}</p>
                            <p className="text-sm text-muted-foreground mt-2">
                              <strong>Fix:</strong> {issue.fix}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Fixed Code</h3>
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(debugResult.fixedCode)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <pre className="font-mono text-sm p-4 rounded-md bg-muted overflow-auto max-h-[300px]">
                      {debugResult.fixedCode}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Bug className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Paste your code and click "Debug Code" to find and fix issues</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

