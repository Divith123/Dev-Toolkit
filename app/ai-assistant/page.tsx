"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CodeHighlight } from "@/components/code-highlight"
import { Copy, Send, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIAssistant() {
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I'm your AI coding assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const generateAIResponse = (query: string): string => {
    // This is a simplified example - in a real app, you'd use an actual AI service
    if (query.toLowerCase().includes("react") || query.toLowerCase().includes("component")) {
      return `Here's a simple React component example:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
\`\`\`

This component creates a simple counter with increment and decrement buttons. It uses the useState hook to manage the counter state.`
    }

    if (query.toLowerCase().includes("api") || query.toLowerCase().includes("fetch")) {
      return `Here's an example of how to fetch data from an API in JavaScript:

\`\`\`javascript
// Using fetch API with async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching user data failed:', error);
    throw error;
  }
}

// Usage
fetchUserData(123)
  .then(user => {
    console.log('User data:', user);
  })
  .catch(error => {
    console.error('Error:', error);
  });
\`\`\`

This function uses the Fetch API with async/await syntax to make a request to an API endpoint. It includes proper error handling and returns the parsed JSON data.`
    }

    if (query.toLowerCase().includes("debug") || query.toLowerCase().includes("error")) {
      return `Here are some common debugging techniques for JavaScript code:

1. **Use console.log statements**
   \`\`\`javascript
   function troubleshootFunction(data) {
     console.log('Input data:', data);
     const result = processData(data);
     console.log('Processed result:', result);
     return result;
   }
   \`\`\`

2. **Use the debugger statement**
   \`\`\`javascript
   function complexFunction(input) {
     let result = [];
     for (let i = 0; i < input.length; i++) {
       debugger; // Execution will pause here in browser dev tools
       result.push(input[i] * 2);
     }
     return result;
   }
   \`\`\`

3. **Check for common errors:**
   - Undefined variables
   - Typos in variable or function names
   - Missing parentheses or brackets
   - Type errors (e.g., treating a string as a number)
   - Asynchronous code issues (forgetting await, not handling promises)

Would you like me to help debug a specific issue you're facing?`
    }

    return `I'd be happy to help with your coding question! Could you provide more details about what you're working on? I can assist with:

- Writing or reviewing code
- Explaining programming concepts
- Debugging issues
- Suggesting best practices
- Providing code examples

Just let me know what you need!`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const renderMessageContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <p key={`text-${lastIndex}`} className="whitespace-pre-wrap">
            {content.substring(lastIndex, match.index)}
          </p>,
        )
      }

      // Add code block
      const language = match[1] || "javascript"
      const code = match[2]
      parts.push(
        <div key={`code-${match.index}`} className="relative my-4">
          <CodeHighlight code={code} language={language} />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm"
            onClick={() => copyToClipboard(code)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>,
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text after last code block
    if (lastIndex < content.length) {
      parts.push(
        <p key={`text-${lastIndex}`} className="whitespace-pre-wrap">
          {content.substring(lastIndex)}
        </p>,
      )
    }

    return parts.length > 0 ? parts : <p className="whitespace-pre-wrap">{content}</p>
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground mt-2">Get coding help and suggestions from our AI assistant</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Chat with AI Assistant</CardTitle>
              <CardDescription>Ask coding questions, get explanations, or request code examples</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] overflow-y-auto border rounded-md p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className="flex-shrink-0">
                        {message.role === "assistant" ? (
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <Sparkles className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar>
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      <div
                        className={`mx-2 px-4 py-2 rounded-lg ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="space-y-2">
                          {renderMessageContent(message.content)}
                          <div
                            className={`text-xs ${
                              message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                            } flex justify-between items-center`}
                          >
                            <span>
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {message.role === "assistant" && (
                              <div className="flex space-x-2 ml-4">
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex flex-row">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Sparkles className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="mx-2 px-4 py-2 rounded-lg bg-muted">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Ask a coding question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 min-h-[60px]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                  />
                  <Button type="submit" disabled={!input.trim() || isTyping} className="self-end h-[60px]">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
              </form>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suggested Topics</CardTitle>
              <CardDescription>Common coding questions to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setInput("How do I create a React component with state?")}
                >
                  <div>
                    <p className="font-medium">React Components</p>
                    <p className="text-xs text-muted-foreground">How to create a React component with state</p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setInput("How do I fetch data from an API in JavaScript?")}
                >
                  <div>
                    <p className="font-medium">API Requests</p>
                    <p className="text-xs text-muted-foreground">Fetching data from APIs with JavaScript</p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setInput("How do I debug JavaScript errors?")}
                >
                  <div>
                    <p className="font-medium">Debugging</p>
                    <p className="text-xs text-muted-foreground">Techniques for debugging JavaScript code</p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setInput("What are JavaScript promises and async/await?")}
                >
                  <div>
                    <p className="font-medium">Async JavaScript</p>
                    <p className="text-xs text-muted-foreground">Understanding promises and async/await</p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setInput("How do I optimize my website performance?")}
                >
                  <div>
                    <p className="font-medium">Performance</p>
                    <p className="text-xs text-muted-foreground">Tips for optimizing website performance</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

