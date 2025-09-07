"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Home, BookOpen, Users, Calendar, BarChart3, Settings, LogOut, User, Bell, Menu, X } from "lucide-react"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Mock authentication
  const [userRole, setUserRole] = useState<"student" | "teacher">("teacher") // Mock user role
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Mock user data
  const user = {
    name: userRole === "teacher" ? "Dr. Sarah Wilson" : "Alex Johnson",
    email: userRole === "teacher" ? "sarah.wilson@university.edu" : "alex.johnson@university.edu",
    role: userRole === "teacher" ? "Professor" : "Student",
    avatar: "/placeholder.svg",
  }

  const teacherNavigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Classes", href: "/classes", icon: BookOpen },
    { name: "Attendance", href: "/attendance", icon: Calendar },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Students", href: "/students", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const studentNavigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "My Classes", href: "/classes", icon: BookOpen },
    { name: "Attendance", href: "/my-attendance", icon: Calendar },
    { name: "Reports", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const navigation = userRole === "teacher" ? teacherNavigation : studentNavigation

  if (!isAuthenticated) {
    return <div>{children}</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Calendar className="h-4 w-4" />
              </div>
              <span className="hidden font-bold sm:inline-block">AttendanceTracker</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  asChild
                  className={cn("flex items-center gap-2", !isActive && "bg-transparent")}
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              )
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Role Switcher (for demo) */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUserRole(userRole === "teacher" ? "student" : "teacher")}
              className="hidden sm:flex bg-transparent"
            >
              Switch to {userRole === "teacher" ? "Student" : "Teacher"}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    <Badge variant="secondary" className="w-fit">
                      {user.role}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsAuthenticated(false)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t md:hidden">
            <nav className="container px-4 py-4">
              <div className="grid gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Button
                      key={item.name}
                      variant={isActive ? "default" : "ghost"}
                      asChild
                      className={cn("justify-start gap-2", !isActive && "bg-transparent")}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href={item.href}>
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row md:py-4">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with AttendanceTracker. © 2024 University Management System.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">v1.0.0</Badge>
            <p className="text-xs text-muted-foreground">
              Current Role: <span className="font-medium">{user.role}</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
