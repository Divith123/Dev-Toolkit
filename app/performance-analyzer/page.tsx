"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Zap } from "lucide-react"

export default function PerformanceAnalyzer() {
  const [code, setCode] = useState<string>("")
  const [language, setLanguage] = useState<string>("javascript")
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)

  // Example function to analyze code performance using existing Node.js modules
  const analyzePerformance = async () => {
    setIsAnalyzing(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // This would use modules like acorn/esprima for parsing in a real implementation
    const result = generateSampleAnalysis(code, language)
    setAnalysisResult(result)
    setIsAnalyzing(false)
  }

  const generateSampleAnalysis = (code: string, language: string) => {
    // This is a simplified example - in a real app, you'd use actual parsing and analysis
    if (!code.trim()) return null

    const issues = []
    let optimizedCode = code
    let complexity = "O(n)"
    let executionTime = "~10ms"

    // Check for nested loops (O(n²) complexity)
    if (code.match(/for\s*$$[^)]*$$[^{]*{[^}]*for\s*$$[^)]*$$/)) {
      issues.push({
        type: "nested_loops",
        severity: "high",
        description: "Nested loops detected, which can lead to O(n²) time complexity",
        suggestion: "Consider using a more efficient algorithm or data structure to avoid nested iterations",
      })
      complexity = "O(n²)"
      executionTime = "~100ms"
    }

    // Check for array methods that might be inefficient
    if (code.match(/\.indexOf\(|\.lastIndexOf\(/)) {
      issues.push({
        type: "inefficient_search",
        severity: "medium",
        description: "Using indexOf/lastIndexOf for searching in arrays has O(n) complexity",
        suggestion: "Consider using a Set or Map for O(1) lookup time",
      })

      // Suggest optimization
      optimizedCode = optimizedCode.replace(
        /const\s+(\w+)\s*=\s*\[(.*?)\];([\s\S]*?)\.indexOf$$([^)]+)$$/g,
        "const $1 = [$2];\nconst $1Set = new Set($1);$3.has($4)",
      )
    }

    // Check for repeated calculations
    if (code.match(/(\w+$$[^)]*$$)[^;]*\1/)) {
      issues.push({
        type: "repeated_calculation",
        severity: "medium",
        description: "Same function call or calculation appears multiple times",
        suggestion: "Store the result in a variable to avoid redundant calculations",
      })

      // Suggest optimization (simplified)
      optimizedCode = optimizedCode.replace(
        /(\w+$$[^)]*$$)[^;]*\1/g,
        "const cachedResult = $1;\n// Use cachedResult instead of repeating the calculation",
      )
    }

    // Check for memory leaks in event listeners (JavaScript)
    if (language === "javascript" && code.match(/addEventListener\(/) && !code.match(/removeEventListener\(/)) {
      issues.push({
        type: "memory_leak",
        severity: "medium",
        description: "Event listener added without corresponding removal",
        suggestion: "Make sure to remove event listeners when they're no longer needed to prevent memory leaks",
      })

      // Suggest cleanup
      if (code.includes("function")) {
        optimizedCode +=
          "\n\n// Don't forget to clean up event listeners\nfunction cleanup() {\n  // Remove event listeners here\n  element.removeEventListener('event', handler);\n}"
      }
    }

    // Check for inefficient string concatenation in loops
    if (code.match(/for\s*$$[^)]*$$[^{]*{[^}]*\+=/)) {
      issues.push({
        type: "string_concatenation",
        severity: "low",
        description: "String concatenation in a loop can be inefficient",
        suggestion:
          language === "javascript"
            ? "Use array.join() instead of += for string concatenation in loops"
            : "Use a StringBuilder instead of += for string concatenation in loops",
      })

      // Suggest optimization for JavaScript
      if (language === "javascript") {
        optimizedCode = optimizedCode.replace(
          /let\s+(\w+)\s*=\s*['"](.*)['"];([\s\S]*?)for\s*$$[^)]*$$[^{]*{[^}]*\1\s*\+=/g,
          "const ${1}Parts = [];\n$3for (let i = 0; i < n; i++) {\n  ${1}Parts.push",
        )
        optimizedCode +=
          "\nconst result = resultParts.join(''); // Join at the end instead of concatenating in the loop"
      }
    }

    // Generate performance metrics
    const metrics = {
      timeComplexity: complexity,
      spaceComplexity: complexity === "O(n²)" ? "O(n)" : "O(1)",
      estimatedExecutionTime: executionTime,
      memoryUsage: complexity === "O(n²)" ? "High" : "Low",
      bottlenecks: issues.map((issue) => issue.type).join(", ") || "None detected",
    }

    return {
      issues,
      optimizedCode: issues.length > 0 ? optimizedCode : code,
      metrics,
      summary:
        issues.length > 0
          ? `Found ${issues.length} performance issue${issues.length === 1 ? "" : "s"} in your code.`
          : "No significant performance issues detected in your code.",
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Analyzer</h1>
          <p className="text-muted-foreground mt-2">Identify performance bottlenecks in your code</p>
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
                      ? "function findDuplicates(array) {\n  const duplicates = [];\n  for (let i = 0; i < array.length; i++) {\n    for (let j = i + 1; j < array.length; j++) {\n      if (array[i] === array[j]) {\n        duplicates.push(array[i]);\n      }\n    }\n  }\n  return duplicates;\n}"
                      : "def find_duplicates(array):\n    duplicates = []\n    for i in range(len(array)):\n        for j in range(i + 1, len(array)):\n            if array[i] == array[j]:\n                duplicates.append(array[i])\n    return duplicates"
                  }
                  className="font-mono h-64"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />

                <Button onClick={analyzePerformance} disabled={!code.trim() || isAnalyzing} className="w-full">
                  {isAnalyzing ? "Analyzing..." : "Analyze Performance"}
                  {!isAnalyzing && <Zap className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>Bottlenecks and optimization suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResult ? (
                <Tabs defaultValue="issues">
                  <TabsList className="mb-4">
                    <TabsTrigger value="issues">Issues</TabsTrigger>
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    <TabsTrigger value="optimized">Optimized Code</TabsTrigger>
                  </TabsList>

                  <TabsContent value="issues">
                    <div className="space-y-4">
                      <div className="p-4 rounded-md bg-muted">
                        <h3 className="font-medium mb-2">Summary</h3>
                        <p className="text-sm">{analysisResult.summary}</p>
                      </div>

                      {analysisResult.issues.length > 0 ? (
                        <div className="space-y-3">
                          {analysisResult.issues.map((issue: any, index: number) => (
                            <div key={index} className="p-3 rounded-md bg-muted">
                              <div className="flex items-start justify-between">
                                <div>
                                  <span
                                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                                      issue.severity === "high"
                                        ? "bg-destructive text-destructive-foreground"
                                        : issue.severity === "medium"
                                          ? "bg-warning text-warning-foreground"
                                          : "bg-primary/20 text-primary"
                                    } mb-2`}
                                  >
                                    {issue.severity} priority
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm font-medium">{issue.description}</p>
                              <p className="text-sm text-muted-foreground mt-2">
                                <strong>Suggestion:</strong> {issue.suggestion}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 rounded-md bg-muted text-center">
                          <p className="text-sm">No significant performance issues detected.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="metrics">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-md bg-muted">
                          <h3 className="text-sm font-medium mb-1">Time Complexity</h3>
                          <p className="text-2xl font-bold">{analysisResult.metrics.timeComplexity}</p>
                        </div>
                        <div className="p-4 rounded-md bg-muted">
                          <h3 className="text-sm font-medium mb-1">Space Complexity</h3>
                          <p className="text-2xl font-bold">{analysisResult.metrics.spaceComplexity}</p>
                        </div>
                        <div className="p-4 rounded-md bg-muted">
                          <h3 className="text-sm font-medium mb-1">Est. Execution Time</h3>
                          <p className="text-2xl font-bold">{analysisResult.metrics.estimatedExecutionTime}</p>
                        </div>
                        <div className="p-4 rounded-md bg-muted">
                          <h3 className="text-sm font-medium mb-1">Memory Usage</h3>
                          <p className="text-2xl font-bold">{analysisResult.metrics.memoryUsage}</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-md bg-muted">
                        <h3 className="text-sm font-medium mb-1">Main Bottlenecks</h3>
                        <p className="text-sm">{analysisResult.metrics.bottlenecks}</p>
                      </div>

                      <div className="p-4 rounded-md bg-muted">
                        <h3 className="text-sm font-medium mb-2">Performance Visualization</h3>
                        <div className="h-32 flex items-end space-x-2">
                          <div className="flex-1 bg-primary/20 h-8 relative">
                            <span className="absolute -top-6 left-0 text-xs">Current</span>
                            <span className="absolute top-2 left-2 text-xs font-medium">
                              {analysisResult.metrics.timeComplexity}
                            </span>
                          </div>
                          <div className="flex-1 bg-primary/60 h-4 relative">
                            <span className="absolute -top-6 left-0 text-xs">Optimized</span>
                            <span className="absolute top-0 left-2 text-xs font-medium">
                              {analysisResult.metrics.timeComplexity === "O(n²)" ? "O(n)" : "O(1)"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="optimized">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Optimized Code</h3>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(analysisResult.optimizedCode)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                      <pre className="font-mono text-sm p-4 rounded-md bg-muted overflow-auto max-h-[400px]">
                        {analysisResult.optimizedCode}
                      </pre>

                      {analysisResult.issues.length > 0 && (
                        <div className="mt-4 p-4 rounded-md bg-muted">
                          <h3 className="text-sm font-medium mb-2">Optimization Notes</h3>
                          <ul className="text-sm list-disc pl-5 space-y-1">
                            {analysisResult.issues.map((issue: any, index: number) => (
                              <li key={index}>{issue.suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Paste your code and click "Analyze Performance" to find bottlenecks
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

