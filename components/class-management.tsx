"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Search,
  Plus,
  MoreHorizontal,
  TrendingUp,
  UserCheck,
  BookOpen,
} from "lucide-react"

export function ClassManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("cs101")

  // Mock data for demonstration
  const classes = [
    {
      id: "cs101",
      name: "Data Structures",
      code: "CS 101",
      schedule: "Mon, Wed, Fri 9:00 AM",
      room: "CS-101",
      enrolled: 45,
      capacity: 50,
      attendance: 87,
      semester: "Fall 2024",
    },
    {
      id: "cs205",
      name: "Database Systems",
      code: "CS 205",
      schedule: "Tue, Thu 11:00 AM",
      room: "CS-205",
      enrolled: 38,
      capacity: 40,
      attendance: 92,
      semester: "Fall 2024",
    },
    {
      id: "cs301",
      name: "Software Engineering",
      code: "CS 301",
      schedule: "Mon, Wed 2:00 PM",
      room: "CS-301",
      enrolled: 32,
      capacity: 35,
      attendance: 85,
      semester: "Fall 2024",
    },
    {
      id: "cs401",
      name: "Computer Networks",
      code: "CS 401",
      schedule: "Tue, Thu 4:00 PM",
      room: "CS-401",
      enrolled: 28,
      capacity: 30,
      attendance: 89,
      semester: "Fall 2024",
    },
  ]

  const students = [
    {
      id: "1",
      name: "Alex Johnson",
      studentId: "CS2024001",
      email: "alex.johnson@university.edu",
      attendance: 95,
      totalClasses: 20,
      presentClasses: 19,
      avatar: "/student-avatar.png",
    },
    {
      id: "2",
      name: "Sarah Chen",
      studentId: "CS2024002",
      email: "sarah.chen@university.edu",
      attendance: 88,
      totalClasses: 20,
      presentClasses: 17,
      avatar: "/student-avatar.png",
    },
    {
      id: "3",
      name: "Michael Rodriguez",
      studentId: "CS2024003",
      email: "michael.rodriguez@university.edu",
      attendance: 92,
      totalClasses: 20,
      presentClasses: 18,
      avatar: "/student-avatar.png",
    },
    {
      id: "4",
      name: "Emily Davis",
      studentId: "CS2024004",
      email: "emily.davis@university.edu",
      attendance: 85,
      totalClasses: 20,
      presentClasses: 17,
      avatar: "/student-avatar.png",
    },
    {
      id: "5",
      name: "David Kim",
      studentId: "CS2024005",
      email: "david.kim@university.edu",
      attendance: 78,
      totalClasses: 20,
      presentClasses: 15,
      avatar: "/student-avatar.png",
    },
  ]

  const currentClass = classes.find((c) => c.id === selectedClass)
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getAttendanceBadge = (attendance: number) => {
    if (attendance >= 90) return <Badge className="bg-primary">Excellent</Badge>
    if (attendance >= 80) return <Badge variant="secondary">Good</Badge>
    if (attendance >= 70) return <Badge variant="outline">Average</Badge>
    return <Badge variant="destructive">Poor</Badge>
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-balance">Class Management</h1>
            <p className="text-muted-foreground">Manage your classes, students, and attendance records</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Class
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Class Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {classes.map((classItem) => (
                <Card
                  key={classItem.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedClass(classItem.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{classItem.name}</CardTitle>
                        <CardDescription>
                          {classItem.code} • {classItem.semester}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{classItem.attendance}% Avg</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{classItem.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{classItem.room}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {classItem.enrolled}/{classItem.capacity} students
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span>{classItem.attendance}% attendance</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Mark Attendance
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{classes.length}</div>
                  <p className="text-xs text-muted-foreground">Active courses</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{classes.reduce((sum, c) => sum + c.enrolled, 0)}</div>
                  <p className="text-xs text-muted-foreground">Enrolled students</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(classes.reduce((sum, c) => sum + c.attendance, 0) / classes.length)}%
                  </div>
                  <p className="text-xs text-muted-foreground">Across all classes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Week</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Classes scheduled</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            {/* Class Selector and Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {classes.map((classItem) => (
                  <Button
                    key={classItem.id}
                    variant={selectedClass === classItem.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedClass(classItem.id)}
                    className={selectedClass !== classItem.id ? "bg-transparent" : ""}
                  >
                    {classItem.code}
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Class Info */}
            {currentClass && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      {currentClass.name} ({currentClass.code})
                    </span>
                    <Badge variant="outline">{currentClass.enrolled} students</Badge>
                  </CardTitle>
                  <CardDescription>
                    {currentClass.schedule} • {currentClass.room} • {currentClass.semester}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            {/* Students List */}
            <Card>
              <CardHeader>
                <CardTitle>Student List</CardTitle>
                <CardDescription>{filteredStudents.length} students found</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {student.studentId} • {student.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{student.attendance}%</p>
                          <p className="text-xs text-muted-foreground">
                            {student.presentClasses}/{student.totalClasses} classes
                          </p>
                        </div>
                        {getAttendanceBadge(student.attendance)}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>Your class schedule for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                    <div key={day} className="space-y-2">
                      <h3 className="font-medium text-sm text-muted-foreground">{day}</h3>
                      <div className="space-y-2">
                        {classes
                          .filter((c) => c.schedule.includes(day.slice(0, 3)))
                          .map((classItem) => (
                            <div key={classItem.id} className="p-3 rounded-lg border bg-card">
                              <p className="font-medium text-sm">{classItem.name}</p>
                              <p className="text-xs text-muted-foreground">{classItem.room}</p>
                              <p className="text-xs text-muted-foreground">
                                {classItem.schedule.split(" ").slice(-2).join(" ")}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
