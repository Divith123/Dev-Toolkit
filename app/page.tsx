import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, FileCode, Database, Bug, Zap, FileText, Share2, Sparkles, GitBranch } from "lucide-react"
import { CodeHighlight } from "@/components/code-highlight"
import { FeatureShowcase } from "@/components/feature-showcase"
import { HeroAnimation } from "@/components/hero-animation"

export default function Home() {
  const features = [
    {
      title: "Test Case Generator",
      description: "Generate comprehensive test cases based on function signatures",
      icon: <FileCode className="h-8 w-8 text-primary" />,
      href: "/test-generator",
      color: "bg-blue-500/10 dark:bg-blue-500/20",
    },
    {
      title: "Code Converter",
      description: "Convert code between programming languages while maintaining logic",
      icon: <Code className="h-8 w-8 text-primary" />,
      href: "/code-converter",
      color: "bg-green-500/10 dark:bg-green-500/20",
    },
    {
      title: "API Docs Generator",
      description: "Generate API documentation from backend code automatically",
      icon: <FileText className="h-8 w-8 text-primary" />,
      href: "/api-docs-generator",
      color: "bg-purple-500/10 dark:bg-purple-500/20",
    },
    {
      title: "SQL Query Generator",
      description: "Convert natural language descriptions into SQL queries",
      icon: <Database className="h-8 w-8 text-primary" />,
      href: "/sql-generator",
      color: "bg-amber-500/10 dark:bg-amber-500/20",
    },
    {
      title: "Bug Debugger",
      description: "Identify and explain code errors with assistance",
      icon: <Bug className="h-8 w-8 text-primary" />,
      href: "/bug-debugger",
      color: "bg-red-500/10 dark:bg-red-500/20",
    },
    {
      title: "Performance Analyzer",
      description: "Identify performance bottlenecks in your code",
      icon: <Zap className="h-8 w-8 text-primary" />,
      href: "/performance-analyzer",
      color: "bg-cyan-500/10 dark:bg-cyan-500/20",
    },
    {
      title: "Code Sharing",
      description: "Share your code and generated results with others",
      icon: <Share2 className="h-8 w-8 text-primary" />,
      href: "/code-sharing",
      color: "bg-pink-500/10 dark:bg-pink-500/20",
    },
    {
      title: "AI Assistant",
      description: "Get coding help and suggestions from our assistant",
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      href: "/ai-assistant",
      color: "bg-indigo-500/10 dark:bg-indigo-500/20",
    },
    {
      title: "Git Helper",
      description: "Generate commit messages and PR descriptions",
      icon: <GitBranch className="h-8 w-8 text-primary" />,
      href: "/git-helper",
      color: "bg-emerald-500/10 dark:bg-emerald-500/20",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Developer Productivity
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                AI-Powered Developer Toolkit
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
                Enhance your coding experience with intelligent tools powered by advanced algorithms. Build faster,
                debug smarter, and code better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                  <Link href="/test-generator">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#features">Explore Features</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-background bg-muted`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Trusted by 10,000+ developers</p>
              </div>
            </div>
            <div className="relative">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Features
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Developer Tools</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our toolkit provides intelligent solutions for common development challenges
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="transition-all hover:shadow-lg group overflow-hidden border-t-4"
                style={{ borderTopColor: feature.color.split(" ")[0].replace("/10", "") }}
              >
                <CardHeader className={`${feature.color} rounded-t-lg`}>
                  <div className="p-2 rounded-full bg-background/90 w-fit">{feature.icon}</div>
                  <CardTitle className="mt-4 group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Link href={feature.href}>
                      Try Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Live Demo
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">See It In Action</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Try a sample SQL query generation to see how our tools work
              </p>
            </div>
          </div>
          <div className="w-full max-w-4xl mx-auto">
            <FeatureShowcase />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Process
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our toolkit uses advanced algorithms to analyze and transform your code
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Input Your Code</h3>
              <p className="text-muted-foreground">Paste your code or describe what you need in natural language</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Processing</h3>
              <p className="text-muted-foreground">Our algorithms analyze your input and generate optimized results</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Results</h3>
              <p className="text-muted-foreground">Download, copy, or share your generated code and documentation</p>
            </div>
          </div>
        </div>
      </section>

    
      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Ready to Supercharge Your Development?
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-[600px] mb-6">
                Join thousands of developers who are saving time and writing better code with our toolkit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/test-generator">Get Started For Free</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
                >
                  <Link href="#features">Explore Features</Link>
                </Button>
              </div>
            </div>
            <div className="relative p-6 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1 text-xs text-center">terminal</div>
                </div>
                <CodeHighlight
                  code={`# Install our toolkit
npm install dev-toolkit

# Start using the tools
npx dev-toolkit

✨ AI-Powered Developer Toolkit is ready!
🚀 Access the web interface at http://localhost:3000`}
                  language="bash"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">AI-Powered Developer Toolkit</h3>
              <p className="text-sm text-muted-foreground">Enhancing developer productivity with intelligent tools</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Tools</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/test-generator" className="text-sm text-muted-foreground hover:text-foreground">
                    Test Generator
                  </Link>
                </li>
                <li>
                  <Link href="/code-converter" className="text-sm text-muted-foreground hover:text-foreground">
                    Code Converter
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs-generator" className="text-sm text-muted-foreground hover:text-foreground">
                    API Docs Generator
                  </Link>
                </li>
                <li>
                  <Link href="/sql-generator" className="text-sm text-muted-foreground hover:text-foreground">
                    SQL Generator
                  </Link>
                </li>
                <li>
                  <Link href="/bug-debugger" className="text-sm text-muted-foreground hover:text-foreground">
                    Bug Debugger
                  </Link>
                </li>
                <li>
                  <Link href="/performance-analyzer" className="text-sm text-muted-foreground hover:text-foreground">
                    Performance Analyzer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials" className="text-sm text-muted-foreground hover:text-foreground">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/github" className="text-sm text-muted-foreground hover:text-foreground">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-sm text-muted-foreground hover:text-foreground">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">support@devtoolkit.com</li>
                <li className="text-sm text-muted-foreground">Twitter: @devtoolkit</li>
                <li className="text-sm text-muted-foreground">123 Developer Way, San Francisco, CA</li>
              </ul>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 text-sm rounded-l-md border border-input bg-background"
                  />
                  <Button className="rounded-l-none">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} AI-Powered Developer Toolkit. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
  image,
}: { quote: string; author: string; role: string; company: string; image: string }) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-yellow-500"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            ))}
          </div>
          <p className="text-muted-foreground italic">"{quote}"</p>
          <div className="flex items-center space-x-3">
            <img src={image || "/placeholder.svg"} alt={author} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">{author}</p>
              <p className="text-sm text-muted-foreground">
                {role}, {company}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

