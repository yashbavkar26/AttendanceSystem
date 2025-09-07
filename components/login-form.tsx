"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, Lock, User, GraduationCap } from "lucide-react"

export function LoginForm() {
  const [userType, setUserType] = useState<"student" | "teacher">("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - in real app, this would authenticate with backend
    console.log("Login attempt:", { email, password, userType })
    // Redirect to dashboard
    window.location.href = "/"
  }

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Logo and Title */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Calendar className="h-6 w-6" />
          </div>
        </div>
        <h1 className="text-2xl font-bold">AttendanceTracker</h1>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>

      {/* User Type Selection */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={userType === "student" ? "default" : "outline"}
          className={`flex-1 ${userType !== "student" ? "bg-transparent" : ""}`}
          onClick={() => setUserType("student")}
        >
          <User className="h-4 w-4 mr-2" />
          Student
        </Button>
        <Button
          type="button"
          variant={userType === "teacher" ? "default" : "outline"}
          className={`flex-1 ${userType !== "teacher" ? "bg-transparent" : ""}`}
          onClick={() => setUserType("teacher")}
        >
          <GraduationCap className="h-4 w-4 mr-2" />
          Teacher
        </Button>
      </div>

      {/* Login Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Sign In
            <Badge variant="secondary">{userType === "student" ? "Student" : "Teacher"}</Badge>
          </CardTitle>
          <CardDescription>
            Enter your credentials to access the {userType === "student" ? "student" : "teacher"} portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={userType === "student" ? "student@university.edu" : "professor@university.edu"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign In as {userType === "student" ? "Student" : "Teacher"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Demo Credentials */}
      <Card className="bg-muted/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Demo Credentials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <p className="font-medium">Student:</p>
            <p className="text-muted-foreground">alex.johnson@university.edu / student123</p>
          </div>
          <div>
            <p className="font-medium">Teacher:</p>
            <p className="text-muted-foreground">sarah.wilson@university.edu / teacher123</p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>© 2024 University Management System</p>
        <p>Need help? Contact IT Support</p>
      </div>
    </div>
  )
}
