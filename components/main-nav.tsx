import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Menu, ChevronDown } from "lucide-react"
import { UserNav } from "@/components/user-nav"

export function MainNav() {
  const routes = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  const tools = [
    { href: "/test-generator", label: "Test Generator" },
    { href: "/code-converter", label: "Code Converter" },
    { href: "/api-docs-generator", label: "API Docs" },
    { href: "/sql-generator", label: "SQL Generator" },
    { href: "/bug-debugger", label: "Bug Debugger" },
    { href: "/performance-analyzer", label: "Performance Analyzer" },
    { href: "/code-sharing", label: "Code Sharing" },
    { href: "/ai-assistant", label: "AI Assistant" },
    { href: "/git-helper", label: "Git Helper" },
  ]

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-6 md:gap-10 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            DT
          </div>
          <span className="hidden font-bold sm:inline-block">DevToolkit</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {route.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="p-0 h-auto font-medium text-sm">
                Tools <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Developer Tools</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {tools.map((tool) => (
                  <DropdownMenuItem key={tool.href} asChild>
                    <Link href={tool.href}>{tool.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
            Pricing
          </Link>
          <Link href="/docs" className="text-sm font-medium transition-colors hover:text-primary">
            Docs
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex">
          <UserNav />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Navigation</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {routes.map((route) => (
              <DropdownMenuItem key={route.href} asChild>
                <Link href={route.href}>{route.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Tools</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {tools.map((tool) => (
              <DropdownMenuItem key={tool.href} asChild>
                <Link href={tool.href}>{tool.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/pricing">Pricing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/docs">Docs</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

