"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Users, Calendar, BarChart3, Settings, BookOpen } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Classes", href: "/classes", icon: BookOpen },
  { name: "Students", href: "/students", icon: Users },
  { name: "Attendance", href: "/attendance", icon: Calendar },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <Button
            key={item.name}
            variant={pathname === item.href ? "default" : "ghost"}
            asChild
            className={cn("flex items-center gap-2", pathname !== item.href && "bg-transparent")}
          >
            <Link href={item.href}>
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
