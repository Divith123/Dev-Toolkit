"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface CodeHighlightProps {
  code: string
  language: string
}

export function CodeHighlight({ code, language }: CodeHighlightProps) {
  const [highlighted, setHighlighted] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Simple syntax highlighting function
    const highlight = (code: string, language: string) => {
      // This is a simplified version - in a real app, you'd use a library like Prism or highlight.js
      let html = code

      if (language === "javascript" || language === "typescript" || language === "jsx" || language === "tsx") {
        // Highlight keywords
        html = html.replace(
          /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this)\b/g,
          '<span class="text-purple-500">$1</span>',
        )

        // Highlight strings
        html = html.replace(/(["'`])(.*?)\1/g, '<span class="text-green-500">$1$2$1</span>')

        // Highlight comments
        html = html.replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>')

        // Highlight numbers
        html = html.replace(/\b(\d+)\b/g, '<span class="text-blue-500">$1</span>')
      } else if (language === "python") {
        // Highlight keywords
        html = html.replace(
          /\b(def|class|import|from|return|if|elif|else|for|while|try|except|raise|with|as|in|not|and|or|True|False|None)\b/g,
          '<span class="text-purple-500">$1</span>',
        )

        // Highlight strings
        html = html.replace(/(["'`])(.*?)\1/g, '<span class="text-green-500">$1$2$1</span>')

        // Highlight comments
        html = html.replace(/(#.*)/g, '<span class="text-gray-500">$1</span>')

        // Highlight numbers
        html = html.replace(/\b(\d+)\b/g, '<span class="text-blue-500">$1</span>')
      } else if (language === "sql") {
        // Highlight keywords
        html = html.replace(
          /\b(SELECT|FROM|WHERE|JOIN|ON|GROUP BY|ORDER BY|HAVING|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER|AS|AND|OR|NOT|NULL|IS|IN|BETWEEN|LIKE|LIMIT|OFFSET|ASC|DESC)\b/gi,
          (match) => `<span class="text-purple-500">${match.toUpperCase()}</span>`,
        )

        // Highlight strings
        html = html.replace(/(["'`])(.*?)\1/g, '<span class="text-green-500">$1$2$1</span>')

        // Highlight comments
        html = html.replace(/(--.*)/g, '<span class="text-gray-500">$1</span>')

        // Highlight numbers
        html = html.replace(/\b(\d+)\b/g, '<span class="text-blue-500">$1</span>')
      } else if (language === "bash" || language === "shell") {
        // Highlight commands
        html = html.replace(/^\s*(\S+)/gm, '<span class="text-purple-500">$1</span>')

        // Highlight options
        html = html.replace(/(-\w+)/g, '<span class="text-blue-500">$1</span>')

        // Highlight strings
        html = html.replace(/(["'`])(.*?)\1/g, '<span class="text-green-500">$1$2$1</span>')

        // Highlight comments
        html = html.replace(/(#.*)/g, '<span class="text-gray-500">$1</span>')
      }

      return html
    }

    setHighlighted(highlight(code, language))
    setLoading(false)
  }, [code, language])

  if (loading) {
    return <Skeleton className="h-32 w-full" />
  }

  return (
    <pre className="font-mono text-sm p-4 rounded-md bg-muted overflow-auto max-h-[500px]">
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </pre>
  )
}

