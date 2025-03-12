"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CodeHighlight } from "@/components/code-highlight"
import { ArrowRight, Play } from "lucide-react"

export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState<string>("sql")
  const [input, setInput] = useState<string>(
    "Find all users who registered in the last 30 days and have made at least 2 purchases",
  )
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let generatedResult = ""

    if (activeTab === "sql") {
      generatedResult = `SELECT u.* 
FROM users u
JOIN (
  SELECT user_id, COUNT(*) as purchase_count
  FROM purchases
  GROUP BY user_id
  HAVING COUNT(*) >= 2
) p ON u.id = p.user_id
WHERE u.registration_date >= CURRENT_DATE - INTERVAL '30 days'`
    } else if (activeTab === "test") {
      generatedResult = `import { expect, test, describe } from 'vitest';
import { getUsersWithPurchases } from './userService';

describe('getUsersWithPurchases tests', () => {
  test('should return users with at least 2 purchases', async () => {
    const result = await getUsersWithPurchases(2);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    
    // Check that each user has at least 2 purchases
    for (const user of result) {
      expect(user.purchases.length).toBeGreaterThanOrEqual(2);
    }
  });
  
  test('should only include users registered in last 30 days', async () => {
    const result = await getUsersWithPurchases(2);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    for (const user of result) {
      expect(new Date(user.registrationDate)).toBeGreaterThanOrEqual(thirtyDaysAgo);
    }
  });
});`
    } else if (activeTab === "debug") {
      generatedResult = `function getUsersWithPurchases(minPurchases) {
  // Error: Missing return statement
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  // Error: Incorrect variable name (users vs allUsers)
  const allUsers = fetchUsers();
  
  // Fixed: Added return statement and corrected variable name
  return allUsers.filter(user => {
    const registrationDate = new Date(user.registrationDate);
    return registrationDate >= thirtyDaysAgo && 
           user.purchases.length >= minPurchases;
  });
}`
    }

    setResult(generatedResult)
    setIsGenerating(false)
  }

  return (
    <Card className="shadow-lg border-2">
      <CardContent className="p-6">
        <Tabs defaultValue="sql" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="sql">SQL Generator</TabsTrigger>
              <TabsTrigger value="test">Test Generator</TabsTrigger>
              <TabsTrigger value="debug">Bug Debugger</TabsTrigger>
            </TabsList>
            <div className="text-xs text-muted-foreground">Try our most popular tools</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Input</h3>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe what you need..."
                className="h-40"
              />
              <Button onClick={handleGenerate} disabled={!input.trim() || isGenerating} className="w-full">
                {isGenerating
                  ? "Generating..."
                  : `Generate ${activeTab === "sql" ? "SQL" : activeTab === "test" ? "Tests" : "Debug"}`}
                {!isGenerating && <Play className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Result</h3>
              {result ? (
                <div className="relative">
                  <CodeHighlight code={result} language={activeTab === "sql" ? "sql" : "javascript"} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 border rounded-md bg-muted/50 text-muted-foreground">
                  Click "Generate" to see results
                </div>
              )}
            </div>
          </div>
        </Tabs>

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Try our full-featured tools for more advanced options</p>
            <Button variant="outline" asChild>
              <a
                href={`/${activeTab === "sql" ? "sql-generator" : activeTab === "test" ? "test-generator" : "bug-debugger"}`}
              >
                Try Full Version <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

