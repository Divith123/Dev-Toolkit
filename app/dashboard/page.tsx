"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CodeHighlight } from "@/components/code-highlight"
import {
  ArrowRight,
  Clock,
  Star,
  History,
  Bookmark,
  Code,
  FileCode,
  Database,
  Bug,
  Zap,
  FileText,
  Share2,
  Sparkles,
  GitBranch,
} from "lucide-react"

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const recentItems = [
    {
      id: 1,
      title: "User Authentication API",
      type: "API Docs",
      date: "2 hours ago",
      icon: <FileText className="h-4 w-4" />,
      href: "/api-docs-generator",
      preview: `# User Authentication API

## Endpoints

### POST \`/api/auth/login\`

#### Description

Authenticates a user and returns a JWT token

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| email | string | User's email address |
| password | string | User's password |`,
    },
    {
      id: 2,
      title: "Database Query Optimization",
      type: "SQL Generator",
      date: "Yesterday",
      icon: <Database className="h-4 w-4" />,
      href: "/sql-generator",
      preview: `SELECT u.id, u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC
LIMIT 100;`,
    },
    {
      id: 3,
      title: "User Service Tests",
      type: "Test Generator",
      date: "3 days ago",
      icon: <FileCode className="h-4 w-4" />,
      href: "/test-generator",
      preview: `import { expect, test, describe } from 'vitest';
import { UserService } from '../services/UserService';

describe('UserService tests', () => {
  test('should create a new user', async () => {
    const userService = new UserService();
    const newUser = await userService.createUser({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    
    expect(newUser).toBeDefined();
    expect(newUser.id).toBeDefined();
    expect(newUser.name).toBe('Test User');
    expect(newUser.email).toBe('test@example.com');
  });
});`,
    },
  ]

  const savedItems = [
    {
      id: 4,
      title: "E-commerce API",
      type: "API Docs",
      date: "1 week ago",
      icon: <FileText className="h-4 w-4" />,
      href: "/api-docs-generator",
      preview: `# E-commerce API

## Endpoints

### GET \`/api/products\`

#### Description

Returns a list of products

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| category | string | Filter by category |
| limit | number | Maximum number of items to return |`,
    },
    {
      id: 5,
      title: "Authentication Flow",
      type: "Bug Debugger",
      date: "2 weeks ago",
      icon: <Bug className="h-4 w-4" />,
      href: "/bug-debugger",
      preview: `function login(email, password) {
  // Fixed: Added input validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  // Fixed: Added proper error handling
  try {
    const user = authenticateUser(email, password);
    return generateToken(user);
  } catch (error) {
    console.error('Authentication failed:', error);
    throw new Error('Invalid credentials');
  }
}`,
    },
  ]

  const tools = [
    {
      title: "Test Generator",
      description: "Generate comprehensive test cases",
      icon: <FileCode className="h-5 w-5" />,
      href: "/test-generator",
      color: "bg-blue-500/10 dark:bg-blue-500/20",
    },
    {
      title: "Code Converter",
      description: "Convert between languages",
      icon: <Code className="h-5 w-5" />,
      href: "/code-converter",
      color: "bg-green-500/10 dark:bg-green-500/20",
    },
    {
      title: "API Docs",
      description: "Generate API documentation",
      icon: <FileText className="h-5 w-5" />,
      href: "/api-docs-generator",
      color: "bg-purple-500/10 dark:bg-purple-500/20",
    },
    {
      title: "SQL Generator",
      description: "Generate SQL queries",
      icon: <Database className="h-5 w-5" />,
      href: "/sql-generator",
      color: "bg-amber-500/10 dark:bg-amber-500/20",
    },
    {
      title: "Bug Debugger",
      description: "Find and fix bugs",
      icon: <Bug className="h-5 w-5" />,
      href: "/bug-debugger",
      color: "bg-red-500/10 dark:bg-red-500/20",
    },
    {
      title: "Performance",
      description: "Optimize code performance",
      icon: <Zap className="h-5 w-5" />,
      href: "/performance-analyzer",
      color: "bg-cyan-500/10 dark:bg-cyan-500/20",
    },
    {
      title: "Code Sharing",
      description: "Share code with others",
      icon: <Share2 className="h-5 w-5" />,
      href: "/code-sharing",
      color: "bg-pink-500/10 dark:bg-pink-500/20",
    },
    {
      title: "AI Assistant",
      description: "Get coding help",
      icon: <Sparkles className="h-5 w-5" />,
      href: "/ai-assistant",
      color: "bg-indigo-500/10 dark:bg-indigo-500/20",
    },
    {
      title: "Git Helper",
      description: "Git commit and PR help",
      icon: <GitBranch className="h-5 w-5" />,
      href: "/git-helper",
      color: "bg-emerald-500/10 dark:bg-emerald-500/20",
    },
  ]

  const filteredRecentItems = recentItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredSavedItems = savedItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and access your favorite tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>Continue where you left off or start a new project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search your projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {tools.map((tool, index) => (
                    <Link key={index} href={tool.href}>
                      <div
                        className={`p-4 rounded-lg border ${tool.color} hover:shadow-md transition-all flex flex-col space-y-2 h-full`}
                      >
                        <div className="p-2 rounded-full bg-background w-fit">{tool.icon}</div>
                        <div>
                          <h3 className="font-medium">{tool.title}</h3>
                          <p className="text-xs text-muted-foreground">{tool.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
              <CardDescription>Your activity overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Recent Activity</span>
                  </div>
                  <span className="text-sm font-medium">12 items</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Saved Items</span>
                  </div>
                  <span className="text-sm font-medium">5 items</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <History className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Tools Used</span>
                  </div>
                  <span className="text-sm font-medium">9 tools</span>
                </div>

                <div className="pt-4">
                  <div className="text-sm font-medium mb-2">Most Used Tools</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">SQL Generator</span>
                      <div className="w-2/3 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Test Generator</span>
                      <div className="w-2/3 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Bug Debugger</span>
                      <div className="w-2/3 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="space-y-4">
            {filteredRecentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecentItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          <div className="p-1 rounded-md bg-primary/10">{item.icon}</div>
                          <div>
                            <CardTitle className="text-base">{item.title}</CardTitle>
                            <CardDescription>{item.type}</CardDescription>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="h-32 overflow-hidden">
                        <CodeHighlight
                          code={item.preview}
                          language={item.type === "SQL Generator" ? "sql" : "javascript"}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-xs text-muted-foreground">{item.date}</div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={item.href}>
                          Continue <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <History className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No recent items found</h3>
                <p className="text-muted-foreground mt-2">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : "Start using our tools to see your recent activity"}
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="saved" className="space-y-4">
            {filteredSavedItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSavedItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          <div className="p-1 rounded-md bg-primary/10">{item.icon}</div>
                          <div>
                            <CardTitle className="text-base">{item.title}</CardTitle>
                            <CardDescription>{item.type}</CardDescription>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-4 w-4 text-primary" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="h-32 overflow-hidden">
                        <CodeHighlight
                          code={item.preview}
                          language={item.type === "SQL Generator" ? "sql" : "javascript"}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-xs text-muted-foreground">Saved {item.date}</div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={item.href}>
                          Open <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No saved items found</h3>
                <p className="text-muted-foreground mt-2">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : "Bookmark your favorite tools and projects to find them here"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

