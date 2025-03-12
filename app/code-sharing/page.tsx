"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CodeHighlight } from "@/components/code-highlight"
import { Copy, Share2, Download, LinkIcon, Check, Globe, Lock, Users } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function CodeSharing() {
  const [code, setCode] = useState<string>("")
  const [language, setLanguage] = useState<string>("javascript")
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [visibility, setVisibility] = useState<string>("private")
  const [expiresAfter, setExpiresAfter] = useState<string>("never")
  const [isPasswordProtected, setIsPasswordProtected] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [isShared, setIsShared] = useState<boolean>(false)
  const [shareLink, setShareLink] = useState<string>("")
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const handleShare = () => {
    // Generate a random share ID
    const shareId = Math.random().toString(36).substring(2, 15)
    const generatedLink = `https://devtoolkit.com/share/${shareId}`
    setShareLink(generatedLink)
    setIsShared(true)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const downloadCode = () => {
    const element = document.createElement("a")
    const fileExtension =
      language === "javascript"
        ? "js"
        : language === "python"
          ? "py"
          : language === "html"
            ? "html"
            : language === "css"
              ? "css"
              : language === "sql"
                ? "sql"
                : "txt"
    const file = new Blob([code], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${title || "shared-code"}.${fileExtension}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const recentShares = [
    {
      id: "abc123",
      title: "Authentication Flow",
      language: "javascript",
      date: "2 days ago",
      views: 24,
      visibility: "public",
      link: "https://devtoolkit.com/share/abc123",
      preview: `function authenticate(email, password) {
  return fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(response => {
    if (!response.ok) throw new Error('Authentication failed');
    return response.json();
  })
  .then(data => {
    localStorage.setItem('token', data.token);
    return data.user;
  });
}`,
    },
    {
      id: "def456",
      title: "Database Query",
      language: "sql",
      date: "1 week ago",
      views: 12,
      visibility: "private",
      link: "https://devtoolkit.com/share/def456",
      preview: `SELECT 
  u.id, 
  u.name, 
  u.email,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent
FROM 
  users u
LEFT JOIN 
  orders o ON u.id = o.user_id
WHERE 
  u.status = 'active'
GROUP BY 
  u.id, u.name, u.email
HAVING 
  COUNT(o.id) > 0
ORDER BY 
  total_spent DESC
LIMIT 100;`,
    },
    {
      id: "ghi789",
      title: "React Component",
      language: "javascript",
      date: "2 weeks ago",
      views: 56,
      visibility: "public",
      link: "https://devtoolkit.com/share/ghi789",
      preview: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch user');
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}`,
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Code Sharing</h1>
          <p className="text-muted-foreground mt-2">Share your code snippets with others securely</p>
        </div>

        <Tabs defaultValue="share">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="share">Share Code</TabsTrigger>
            <TabsTrigger value="history">Sharing History</TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="space-y-6">
            {isShared ? (
              <Card className="border-green-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-full bg-green-500/10">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <CardTitle>Code Shared Successfully!</CardTitle>
                  </div>
                  <CardDescription>Your code has been shared. Use the link below to access it.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="share-link">Share Link</Label>
                      <div className="flex mt-1.5">
                        <Input id="share-link" value={shareLink} readOnly className="rounded-r-none" />
                        <Button
                          onClick={copyToClipboard}
                          className="rounded-l-none"
                          variant={isCopied ? "outline" : "default"}
                        >
                          {isCopied ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="font-medium">{title || "Untitled Code"}</h3>
                          <p className="text-sm text-muted-foreground">{description || "No description provided"}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {visibility === "public" ? (
                            <Globe className="h-4 w-4 text-muted-foreground" />
                          ) : visibility === "unlisted" ? (
                            <LinkIcon className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-xs capitalize">{visibility}</span>
                        </div>
                      </div>
                      <div className="h-48 overflow-hidden">
                        <CodeHighlight code={code} language={language} />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button variant="outline" onClick={() => setIsShared(false)}>
                        Share Another
                      </Button>
                      <Button variant="outline" onClick={downloadCode}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Code</CardTitle>
                    <CardDescription>Paste the code you want to share</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                            <SelectItem value="css">CSS</SelectItem>
                            <SelectItem value="sql">SQL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="code">Code</Label>
                        <Textarea
                          id="code"
                          placeholder="Paste your code here..."
                          className="font-mono h-64"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Share Settings</CardTitle>
                    <CardDescription>Configure how you want to share your code</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title (optional)</Label>
                        <Input
                          id="title"
                          placeholder="Give your code a title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description (optional)</Label>
                        <Textarea
                          id="description"
                          placeholder="Add a description for your code"
                          className="h-20"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="visibility">Visibility</Label>
                        <Select value={visibility} onValueChange={setVisibility}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 mr-2" />
                                <div>
                                  <span>Public</span>
                                  <span className="text-xs block text-muted-foreground">
                                    Anyone with the link can view
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="unlisted">
                              <div className="flex items-center">
                                <LinkIcon className="h-4 w-4 mr-2" />
                                <div>
                                  <span>Unlisted</span>
                                  <span className="text-xs block text-muted-foreground">
                                    Only people with the link can view
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="private">
                              <div className="flex items-center">
                                <Lock className="h-4 w-4 mr-2" />
                                <div>
                                  <span>Private</span>
                                  <span className="text-xs block text-muted-foreground">Only you can view</span>
                                </div>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="expires">Expires After</Label>
                        <Select value={expiresAfter} onValueChange={setExpiresAfter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select expiration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="never">Never</SelectItem>
                            <SelectItem value="1day">1 Day</SelectItem>
                            <SelectItem value="7days">7 Days</SelectItem>
                            <SelectItem value="30days">30 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="password-protection"
                          checked={isPasswordProtected}
                          onCheckedChange={setIsPasswordProtected}
                        />
                        <Label htmlFor="password-protection">Password Protection</Label>
                      </div>

                      {isPasswordProtected && (
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleShare} disabled={!code.trim()} className="w-full">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Code
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Recently Shared Code</h2>

              {recentShares.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentShares.map((share) => (
                    <Card key={share.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{share.title}</CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <span className="capitalize">{share.language}</span>
                              <span>•</span>
                              <span>{share.date}</span>
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            {share.visibility === "public" ? (
                              <Globe className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs">{share.views}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="h-32 overflow-hidden">
                          <CodeHighlight code={share.preview} language={share.language} />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(share.link)
                          }}
                        >
                          <Copy className="mr-2 h-3 w-3" />
                          Copy Link
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={share.link} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Share2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No shared code yet</h3>
                  <p className="text-muted-foreground mt-2">Share your first code snippet to see it here</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

