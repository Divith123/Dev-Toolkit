"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, ArrowRight } from "lucide-react"

export default function CodeConverter() {
  const [sourceCode, setSourceCode] = useState<string>("")
  const [sourceLanguage, setSourceLanguage] = useState<string>("javascript")
  const [targetLanguage, setTargetLanguage] = useState<string>("python")
  const [convertedCode, setConvertedCode] = useState<string>("")
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [explanation, setExplanation] = useState<string>("")

  // Example function to convert code using existing Node.js modules
  const convertCode = async () => {
    setIsConverting(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // This would use modules like babel/esprima for parsing in a real implementation
    const result = generateSampleConversion(sourceCode, sourceLanguage, targetLanguage)
    setConvertedCode(result.code)
    setExplanation(result.explanation)
    setIsConverting(false)
  }

  const generateSampleConversion = (code: string, fromLang: string, toLang: string) => {
    // This is a simplified example - in a real app, you'd use actual parsing and conversion
    if (!code.trim()) return { code: "", explanation: "" }

    let convertedCode = ""
    let explanation = ""

    if (fromLang === "javascript" && toLang === "python") {
      // Simple JS to Python conversion example
      convertedCode = code
        .replace(/const |let |var /g, "")
        .replace(/function\s+(\w+)\s*$$(.*?)$$\s*{/g, "def $1($2):")
        .replace(/{\s*\n/g, ":\n")
        .replace(/}/g, "")
        .replace(/;/g, "")
        .replace(/===|==/g, "==")
        .replace(/!==|!=/g, "!=")
        .replace(/\s+\+\s+/g, " + ")
        .replace(/\s+-\s+/g, " - ")
        .replace(/\s+\*\s+/g, " * ")
        .replace(/\s+\/\s+/g, " / ")
        .replace(/\s+%\s+/g, " % ")
        .replace(/\s+\*\*\s+/g, " ** ")
        .replace(/\s+>\s+/g, " > ")
        .replace(/\s+<\s+/g, " < ")
        .replace(/\s+>=\s+/g, " >= ")
        .replace(/\s+<=\s+/g, " <= ")
        .replace(/\s+&&\s+/g, " and ")
        .replace(/\s+\|\|\s+/g, " or ")
        .replace(/!/g, "not ")
        .replace(/true/g, "True")
        .replace(/false/g, "False")
        .replace(/null/g, "None")
        .replace(/undefined/g, "None")
        .replace(/console\.log\(/g, "print(")
        .replace(/return/g, "return")

      explanation = `
## JavaScript to Python Conversion

The conversion process involved the following transformations:

1. **Variable declarations**: Removed JavaScript keywords (const, let, var)
2. **Function declarations**: Changed from \`function name(params) {}\` to \`def name(params):\`
3. **Code blocks**: Replaced curly braces with Python's indentation-based blocks
4. **Semicolons**: Removed all semicolons as they're not used in Python
5. **Operators**: 
   - Equality operators (===, ==) → Python's ==
   - Inequality operators (!==, !=) → Python's !=
   - Logical operators (&&, ||, !) → Python's (and, or, not)
6. **Boolean values**: Changed true/false to True/False
7. **Null values**: Changed null/undefined to None
8. **Console output**: Changed console.log() to print()

Note: This is a basic conversion. Complex JavaScript features like closures, promises, or class inheritance might require manual adjustments.
      `
    } else if (fromLang === "python" && toLang === "javascript") {
      // Simple Python to JS conversion example
      convertedCode = code
        .replace(/def\s+(\w+)\s*$$(.*?)$$\s*:/g, "function $1($2) {")
        .replace(/:\s*\n/g, " {\n")
        .replace(/print\(/g, "console.log(")
        .replace(/True/g, "true")
        .replace(/False/g, "false")
        .replace(/None/g, "null")
        .replace(/and/g, "&&")
        .replace(/or/g, "||")
        .replace(/not /g, "!")
        .replace(/elif/g, "else if")

      // Add closing braces based on indentation
      const lines = convertedCode.split("\n")
      const indentLevel = 0
      const result = []

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const nextLine = i < lines.length - 1 ? lines[i + 1] : ""

        // Check for indentation changes
        const currentIndent = line.search(/\S|$/)
        const nextIndent = nextLine.search(/\S|$/)

        result.push(line)

        // If next line has less indentation, add closing braces
        if (nextIndent < currentIndent) {
          const bracesToAdd = Math.floor((currentIndent - nextIndent) / 4)
          for (let j = 0; j < bracesToAdd; j++) {
            result.push(" ".repeat(currentIndent - 4 * (j + 1)) + "}")
          }
        }
      }

      // Add final closing brace if needed
      if (indentLevel > 0) {
        result.push("}")
      }

      convertedCode = result.join("\n")

      explanation = `
## Python to JavaScript Conversion

The conversion process involved the following transformations:

1. **Function declarations**: Changed from \`def name(params):\` to \`function name(params) {}\`
2. **Code blocks**: Replaced Python's indentation-based blocks with curly braces
3. **Print statements**: Changed print() to console.log()
4. **Boolean values**: Changed True/False to true/false
5. **None values**: Changed None to null
6. **Logical operators**: Changed (and, or, not) to (&&, ||, !)
7. **Conditional statements**: Changed elif to else if

Note: This is a basic conversion. Complex Python features like list comprehensions, decorators, or context managers might require manual adjustments.
      `
    } else {
      convertedCode = code
      explanation = "Direct conversion between these languages is not implemented in this demo."
    }

    return { code: convertedCode, explanation }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(convertedCode)
  }

  const downloadCode = () => {
    const element = document.createElement("a")
    const fileExtension =
      targetLanguage === "javascript"
        ? "js"
        : targetLanguage === "python"
          ? "py"
          : targetLanguage === "java"
            ? "java"
            : "txt"
    const file = new Blob([convertedCode], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `converted.${fileExtension}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Code Converter</h1>
          <p className="text-muted-foreground mt-2">
            Convert code between programming languages while maintaining logic
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Source Code</CardTitle>
              <CardDescription>Paste your code and select the source language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Source Language" />
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
                    sourceLanguage === "javascript"
                      ? "function add(a, b) {\n  return a + b;\n}"
                      : "def add(a, b):\n    return a + b"
                  }
                  className="font-mono h-64"
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Converted Code</CardTitle>
              <CardDescription>Select the target language and convert your code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Target Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={convertCode}
                    disabled={!sourceCode.trim() || isConverting || sourceLanguage === targetLanguage}
                    className="flex-shrink-0"
                  >
                    {isConverting ? "Converting..." : "Convert"}
                    {!isConverting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>

                <div className="relative">
                  <Textarea
                    readOnly
                    className="font-mono h-64"
                    value={convertedCode}
                    placeholder="Converted code will appear here..."
                  />
                  {convertedCode && (
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Button size="icon" variant="outline" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy to clipboard</span>
                      </Button>
                      <Button size="icon" variant="outline" onClick={downloadCode}>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download code</span>
                      </Button>
                    </div>
                  )}
                </div>

                {explanation && (
                  <div className="mt-4 p-4 rounded-md bg-muted">
                    <h3 className="text-sm font-medium mb-2">Conversion Explanation</h3>
                    <div className="text-sm prose prose-sm max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, "<br/>") }} />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

