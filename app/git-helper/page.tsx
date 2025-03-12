"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, GitCommit, GitPullRequest, Check, RefreshCw } from "lucide-react"
import { CodeHighlight } from "@/components/code-highlight"

export default function GitHelper() {
  const [commitTab, setCommitTab] = useState({
    changes: "",
    type: "feat",
    scope: "",
    message: "",
    generated: "",
    isGenerating: false,
    isCopied: false,
  })

  const [prTab, setPrTab] = useState({
    title: "",
    changes: "",
    context: "",
    generated: "",
    isGenerating: false,
    isCopied: false,
  })

  const generateCommitMessage = async () => {
    setCommitTab((prev) => ({ ...prev, isGenerating: true }))

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // This would use modules like simple-git in a real implementation
    let generatedMessage = ""

    if (commitTab.changes.trim()) {
      const type = commitTab.type
      const scope = commitTab.scope ? `(${commitTab.scope})` : ""

      // Generate a commit message based on the changes
      if (commitTab.changes.includes("add") || commitTab.changes.includes("new")) {
        generatedMessage = `${type}${scope}: add new feature`
      } else if (commitTab.changes.includes("fix") || commitTab.changes.includes("bug")) {
        generatedMessage = `${type}${scope}: fix issue with functionality`
      } else if (commitTab.changes.includes("refactor")) {
        generatedMessage = `${type}${scope}: refactor code for better readability`
      } else if (commitTab.changes.includes("test")) {
        generatedMessage = `${type}${scope}: add tests for functionality`
      } else if (commitTab.changes.includes("docs") || commitTab.changes.includes("documentation")) {
        generatedMessage = `${type}${scope}: update documentation`
      } else if (commitTab.changes.includes("style")) {
        generatedMessage = `${type}${scope}: improve styling and UI`
      } else if (commitTab.changes.includes("perf")) {
        generatedMessage = `${type}${scope}: improve performance`
      } else {
        // Default message based on the type
        switch (type) {
          case "feat":
            generatedMessage = `${type}${scope}: add new functionality`
            break
          case "fix":
            generatedMessage = `${type}${scope}: fix bug in implementation`
            break
          case "docs":
            generatedMessage = `${type}${scope}: update documentation`
            break
          case "style":
            generatedMessage = `${type}${scope}: improve code style`
            break
          case "refactor":
            generatedMessage = `${type}${scope}: refactor code structure`
            break
          case "test":
            generatedMessage = `${type}${scope}: add test coverage`
            break
          case "chore":
            generatedMessage = `${type}${scope}: update build process`
            break
          case "perf":
            generatedMessage = `${type}${scope}: improve performance`
            break
          default:
            generatedMessage = `${type}${scope}: update code`
        }
      }

      // Add more details based on the changes
      const lines = commitTab.changes.split("\n")
      if (lines.length > 1) {
        generatedMessage += "\n\n"
        for (let i = 0; i < Math.min(5, lines.length); i++) {
          if (lines[i].trim()) {
            generatedMessage += `- ${lines[i].trim()}\n`
          }
        }
      }
    } else if (commitTab.message.trim()) {
      // Use the provided message as a base
      const type = commitTab.type
      const scope = commitTab.scope ? `(${commitTab.scope})` : ""
      generatedMessage = `${type}${scope}: ${commitTab.message.trim()}`
    } else {
      generatedMessage = "Please provide changes or a commit message to generate a proper commit message."
    }

    setCommitTab((prev) => ({
      ...prev,
      generated: generatedMessage,
      isGenerating: false,
    }))
  }

  const generatePRDescription = async () => {
    setPrTab((prev) => ({ ...prev, isGenerating: true }))

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    let generatedPR = ""

    if (prTab.title.trim() || prTab.changes.trim()) {
      const title = prTab.title.trim() || "Feature Implementation"

      generatedPR = `# ${title}

## Description
${prTab.changes.trim() ? `This PR implements changes related to ${prTab.changes.trim().toLowerCase()}.` : "This PR implements new features and improvements."}

${prTab.context.trim() ? `## Context\n${prTab.context.trim()}` : ""}

## Changes
${
  prTab.changes.trim()
    ? prTab.changes
        .split("\n")
        .map((line) => (line.trim() ? `- ${line.trim()}` : ""))
        .join("\n")
    : "- Implemented new features\n- Fixed existing issues\n- Improved code quality"
}

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Screenshots
<!-- Add screenshots if applicable -->

## Checklist
- [ ] Code follows the project's coding standards
- [ ] Documentation has been updated
- [ ] Changes have been tested
- [ ] All tests are passing
- [ ] No new warnings or errors introduced

## Additional Notes
Please review and provide feedback.`
    } else {
      generatedPR = "Please provide a PR title or description of changes to generate a proper PR description."
    }

    setPrTab((prev) => ({
      ...prev,
      generated: generatedPR,
      isGenerating: false,
    }))
  }

  const copyToClipboard = (text: string, type: "commit" | "pr") => {
    navigator.clipboard.writeText(text)

    if (type === "commit") {
      setCommitTab((prev) => ({ ...prev, isCopied: true }))
      setTimeout(() => setCommitTab((prev) => ({ ...prev, isCopied: false })), 2000)
    } else {
      setPrTab((prev) => ({ ...prev, isCopied: true }))
      setTimeout(() => setPrTab((prev) => ({ ...prev, isCopied: false })), 2000)
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Git Helper</h1>
          <p className="text-muted-foreground mt-2">Generate commit messages and PR descriptions</p>
        </div>

        <Tabs defaultValue="commit">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="commit">Commit Messages</TabsTrigger>
            <TabsTrigger value="pr">PR Descriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="commit" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Commit Message</CardTitle>
                  <CardDescription>Create a conventional commit message based on your changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="commit-type">Commit Type</Label>
                      <Select
                        value={commitTab.type}
                        onValueChange={(value) => setCommitTab((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select commit type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feat">feat: New feature</SelectItem>
                          <SelectItem value="fix">fix: Bug fix</SelectItem>
                          <SelectItem value="docs">docs: Documentation change</SelectItem>
                          <SelectItem value="style">style: Code style change</SelectItem>
                          <SelectItem value="refactor">refactor: Code refactoring</SelectItem>
                          <SelectItem value="test">test: Adding tests</SelectItem>
                          <SelectItem value="chore">chore: Build process or tools</SelectItem>
                          <SelectItem value="perf">perf: Performance improvement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="commit-scope">Scope (optional)</Label>
                      <Input
                        id="commit-scope"
                        placeholder="e.g., auth, ui, api"
                        value={commitTab.scope}
                        onChange={(e) => setCommitTab((prev) => ({ ...prev, scope: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="commit-message">Commit Message (optional)</Label>
                      <Input
                        id="commit-message"
                        placeholder="Brief description of changes"
                        value={commitTab.message}
                        onChange={(e) => setCommitTab((prev) => ({ ...prev, message: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="commit-changes">Changes Description</Label>
                      <Textarea
                        id="commit-changes"
                        placeholder="Describe what changes you made..."
                        className="h-32"
                        value={commitTab.changes}
                        onChange={(e) => setCommitTab((prev) => ({ ...prev, changes: e.target.value }))}
                      />
                    </div>

                    <Button
                      onClick={generateCommitMessage}
                      disabled={commitTab.isGenerating || (!commitTab.changes.trim() && !commitTab.message.trim())}
                      className="w-full"
                    >
                      {commitTab.isGenerating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <GitCommit className="mr-2 h-4 w-4" />
                          Generate Commit Message
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generated Commit Message</CardTitle>
                  <CardDescription>Copy and use in your Git workflow</CardDescription>
                </CardHeader>
                <CardContent>
                  {commitTab.generated ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <CodeHighlight code={commitTab.generated} language="markdown" />
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm"
                          onClick={() => copyToClipboard(commitTab.generated, "commit")}
                        >
                          {commitTab.isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Git Command</h3>
                        <CodeHighlight
                          code={`git commit -m "${commitTab.generated.split("\n")[0]}"${
                            commitTab.generated.includes("\n\n")
                              ? ` -m "${commitTab.generated.split("\n\n")[1].replace(/\n/g, "\\n")}"`
                              : ""
                          }`}
                          language="bash"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <GitCommit className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Your generated commit message will appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Conventional Commits Guide</CardTitle>
                <CardDescription>Learn how to write better commit messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Conventional Commits is a specification for adding human and machine-readable meaning to commit
                    messages.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Format</h3>
                      <CodeHighlight
                        code={`<type>[optional scope]: <description>

[optional body]

[optional footer(s)]`}
                        language="markdown"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Types</h3>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <strong>feat:</strong> A new feature
                        </li>
                        <li>
                          <strong>fix:</strong> A bug fix
                        </li>
                        <li>
                          <strong>docs:</strong> Documentation changes
                        </li>
                        <li>
                          <strong>style:</strong> Code style changes (formatting, etc.)
                        </li>
                        <li>
                          <strong>refactor:</strong> Code changes that neither fix bugs nor add features
                        </li>
                        <li>
                          <strong>test:</strong> Adding or correcting tests
                        </li>
                        <li>
                          <strong>chore:</strong> Changes to the build process or tools
                        </li>
                        <li>
                          <strong>perf:</strong> Performance improvements
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Examples</h3>
                    <div className="space-y-2">
                      <CodeHighlight code={`feat(auth): add login functionality`} language="markdown" />
                      <CodeHighlight
                        code={`fix(api): resolve issue with data fetching

- Fix timeout error when API is slow
- Add retry mechanism
- Improve error handling`}
                        language="markdown"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pr" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate PR Description</CardTitle>
                  <CardDescription>Create a comprehensive pull request description</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pr-title">PR Title</Label>
                      <Input
                        id="pr-title"
                        placeholder="e.g., Add user authentication feature"
                        value={prTab.title}
                        onChange={(e) => setPrTab((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="pr-changes">Changes Description</Label>
                      <Textarea
                        id="pr-changes"
                        placeholder="List the changes you made..."
                        className="h-32"
                        value={prTab.changes}
                        onChange={(e) => setPrTab((prev) => ({ ...prev, changes: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="pr-context">Additional Context (optional)</Label>
                      <Textarea
                        id="pr-context"
                        placeholder="Provide any additional context or background information..."
                        className="h-24"
                        value={prTab.context}
                        onChange={(e) => setPrTab((prev) => ({ ...prev, context: e.target.value }))}
                      />
                    </div>

                    <Button
                      onClick={generatePRDescription}
                      disabled={prTab.isGenerating || (!prTab.title.trim() && !prTab.changes.trim())}
                      className="w-full"
                    >
                      {prTab.isGenerating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <GitPullRequest className="mr-2 h-4 w-4" />
                          Generate PR Description
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generated PR Description</CardTitle>
                  <CardDescription>Copy and use in your GitHub or GitLab pull request</CardDescription>
                </CardHeader>
                <CardContent>
                  {prTab.generated ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <CodeHighlight code={prTab.generated} language="markdown" />
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm"
                          onClick={() => copyToClipboard(prTab.generated, "pr")}
                        >
                          {prTab.isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <GitPullRequest className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Your generated PR description will appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>PR Best Practices</CardTitle>
                <CardDescription>Tips for creating effective pull requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    A good pull request description helps reviewers understand your changes and the reasoning behind
                    them.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Key Components</h3>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <strong>Title:</strong> Clear and concise summary
                        </li>
                        <li>
                          <strong>Description:</strong> What changes were made
                        </li>
                        <li>
                          <strong>Context:</strong> Why changes were made
                        </li>
                        <li>
                          <strong>Testing:</strong> How changes were tested
                        </li>
                        <li>
                          <strong>Screenshots:</strong> Visual changes (if applicable)
                        </li>
                        <li>
                          <strong>Checklist:</strong> Items to verify before merging
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Tips</h3>
                      <ul className="space-y-1 text-sm">
                        <li>Keep PRs focused on a single task</li>
                        <li>Link to related issues or tickets</li>
                        <li>Highlight any breaking changes</li>
                        <li>Mention dependencies or requirements</li>
                        <li>Request specific reviewers if needed</li>
                        <li>Use markdown for better formatting</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">PR Template Example</h3>
                    <CodeHighlight
                      code={`# Title

## Description
Brief description of what this PR does

## Related Issues
Fixes #123

## Changes
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Test case 1
- [ ] Test case 2

## Screenshots
<!-- Add screenshots if applicable -->

## Additional Notes
Any other information that would be useful to reviewers`}
                      language="markdown"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

