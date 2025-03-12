"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Play, Database } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SQLGenerator() {
  const [naturalLanguage, setNaturalLanguage] = useState<string>("")
  const [schema, setSchema] = useState<string>("")
  const [generatedSQL, setGeneratedSQL] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [showSchema, setShowSchema] = useState<boolean>(false)

  // Example function to generate SQL using existing Node.js modules
  const generateSQL = async () => {
    setIsGenerating(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // This would use modules like node-sql-parser in a real implementation
    const sql = generateSampleSQL(naturalLanguage, schema)
    setGeneratedSQL(sql)
    setIsGenerating(false)
  }

  const generateSampleSQL = (query: string, schema: string) => {
    // This is a simplified example - in a real app, you'd use actual NLP and SQL parsing
    if (!query.trim()) return ""

    // Simple pattern matching for common query types
    if (query.match(/users|customers/i) && query.match(/last|recent|past/i) && query.match(/30 days/i)) {
      return `SELECT * FROM users
WHERE registration_date >= CURRENT_DATE - INTERVAL '30 days';`
    }

    if (query.match(/products/i) && query.match(/price/i) && query.match(/between/i)) {
      return `SELECT * FROM products
WHERE price BETWEEN 10 AND 50
ORDER BY price ASC;`
    }

    if (query.match(/orders/i) && query.match(/total/i) && query.match(/customer/i)) {
      return `SELECT 
  c.customer_id,
  c.name,
  COUNT(o.order_id) AS total_orders,
  SUM(o.amount) AS total_spent
FROM 
  customers c
JOIN 
  orders o ON c.customer_id = o.customer_id
GROUP BY 
  c.customer_id, c.name
ORDER BY 
  total_spent DESC;`
    }

    if (query.match(/average|avg/i) && query.match(/rating|score/i)) {
      return `SELECT 
  p.product_id,
  p.name,
  AVG(r.rating) AS average_rating,
  COUNT(r.review_id) AS review_count
FROM 
  products p
LEFT JOIN 
  reviews r ON p.product_id = r.product_id
GROUP BY 
  p.product_id, p.name
HAVING 
  COUNT(r.review_id) >= 5
ORDER BY 
  average_rating DESC;`
    }

    // Default response for other queries
    return `SELECT * FROM table_name
WHERE condition = 'value'
ORDER BY column_name;`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSQL)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SQL Query Generator</h1>
          <p className="text-muted-foreground mt-2">Convert natural language descriptions into SQL queries</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Natural Language Input</CardTitle>
              <CardDescription>Describe what data you want to retrieve</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="natural-language">Your Query</Label>
                  <Textarea
                    id="natural-language"
                    placeholder="Example: Find all users who registered in the last 30 days"
                    className="h-32"
                    value={naturalLanguage}
                    onChange={(e) => setNaturalLanguage(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="show-schema" checked={showSchema} onCheckedChange={setShowSchema} />
                  <Label htmlFor="show-schema">Include database schema (optional)</Label>
                </div>

                {showSchema && (
                  <div>
                    <Label htmlFor="schema">Database Schema</Label>
                    <Textarea
                      id="schema"
                      placeholder="Example: 
users (id, name, email, registration_date)
orders (id, user_id, amount, order_date)"
                      className="h-32 font-mono text-sm"
                      value={schema}
                      onChange={(e) => setSchema(e.target.value)}
                    />
                  </div>
                )}

                <Button onClick={generateSQL} disabled={!naturalLanguage.trim() || isGenerating} className="w-full">
                  {isGenerating ? "Generating..." : "Generate SQL"}
                  {!isGenerating && <Play className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated SQL Query</CardTitle>
              <CardDescription>SQL query based on your description</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="query">
                <TabsList className="mb-4">
                  <TabsTrigger value="query">Query</TabsTrigger>
                  <TabsTrigger value="explanation">Explanation</TabsTrigger>
                </TabsList>
                <TabsContent value="query" className="space-y-4">
                  <div className="relative">
                    <pre className="font-mono text-sm p-4 rounded-md bg-muted overflow-auto max-h-[300px]">
                      {generatedSQL || "Generated SQL will appear here..."}
                    </pre>
                    {generatedSQL && (
                      <div className="absolute top-2 right-2">
                        <Button size="icon" variant="outline" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy to clipboard</span>
                        </Button>
                      </div>
                    )}
                  </div>

                  {generatedSQL && (
                    <div className="flex justify-center">
                      <Button variant="outline" className="w-full">
                        <Database className="mr-2 h-4 w-4" />
                        Execute Query (Demo)
                      </Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="explanation">
                  {generatedSQL ? (
                    <div className="p-4 rounded-md bg-muted">
                      <h3 className="font-medium mb-2">Query Explanation</h3>
                      <p className="text-sm">
                        {naturalLanguage.includes("30 days")
                          ? "This query selects all users who registered within the last 30 days. It uses the CURRENT_DATE function and subtracts an interval of 30 days to find recent registrations."
                          : naturalLanguage.includes("price")
                            ? "This query selects products with prices between $10 and $50, ordered from lowest to highest price."
                            : naturalLanguage.includes("orders")
                              ? "This query joins the customers and orders tables to calculate the total number of orders and amount spent by each customer, sorted by highest spenders first."
                              : naturalLanguage.includes("rating")
                                ? "This query calculates the average rating for each product that has at least 5 reviews, ordered by highest rated products first."
                                : "This is a basic query structure that you can customize for your specific needs."}
                      </p>
                      <h3 className="font-medium mt-4 mb-2">Performance Considerations</h3>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Consider adding indexes on frequently queried columns</li>
                        <li>For large datasets, limit the results or add pagination</li>
                        <li>Use appropriate JOIN types (INNER, LEFT, etc.) based on your data requirements</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="p-4 rounded-md bg-muted text-center text-muted-foreground">
                      Generate a query to see its explanation
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

