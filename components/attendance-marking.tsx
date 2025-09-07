"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Clock,
  Users,
  UserCheck,
  UserX,
  Search,
  Save,
  QrCode,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
} from "lucide-react"

type AttendanceStatus = "present" | "absent" | "late" | "excused"

interface Student {
  id: string
  name: string
  studentId: string
  email: string
  avatar?: string
  status: AttendanceStatus
}

export function AttendanceMarking() {
  const [selectedClass, setSelectedClass] = useState("cs101")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Alex Johnson",
      studentId: "CS2024001",
      email: "alex.johnson@university.edu",
      status: "present",
    },
    {
      id: "2",
      name: "Sarah Chen",
      studentId: "CS2024002",
      email: "sarah.chen@university.edu",
      status: "present",
    },
    {
      id: "3",
      name: "Michael Rodriguez",
      studentId: "CS2024003",
      email: "michael.rodriguez@university.edu",
      status: "absent",
    },
    {
      id: "4",
      name: "Emily Davis",
      studentId: "CS2024004",
      email: "emily.davis@university.edu",
      status: "late",
    },
    {
      id: "5",
      name: "David Kim",
      studentId: "CS2024005",
      email: "david.kim@university.edu",
      status: "present",
    },
    {
      id: "6",
      name: "Jessica Wilson",
      studentId: "CS2024006",
      email: "jessica.wilson@university.edu",
      status: "excused",
    },
  ])

  const classes = [
    {
      id: "cs101",
      name: "Data Structures",
      code: "CS 101",
      schedule: "Mon, Wed, Fri 9:00 AM",
      room: "CS-101",
    },
    {
      id: "cs205",
      name: "Database Systems",
      code: "CS 205",
      schedule: "Tue, Thu 11:00 AM",
      room: "CS-205",
    },
    {
      id: "cs301",
      name: "Software Engineering",
      code: "CS 301",
      schedule: "Mon, Wed 2:00 PM",
      room: "CS-301",
    },
  ]

  const currentClass = classes.find((c) => c.id === selectedClass)
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const updateStudentStatus = (studentId: string, status: AttendanceStatus) => {
    setStudents((prev) => prev.map((student) => (student.id === studentId ? { ...student, status } : student)))
  }

  const markAllPresent = () => {
    setStudents((prev) => prev.map((student) => ({ ...student, status: "present" as AttendanceStatus })))
  }

  const markAllAbsent = () => {
    setStudents((prev) => prev.map((student) => ({ ...student, status: "absent" as AttendanceStatus })))
  }

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "absent":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "late":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "excused":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return <Badge className="bg-primary">Present</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      case "late":
        return <Badge className="bg-yellow-500">Late</Badge>
      case "excused":
        return <Badge className="bg-blue-500">Excused</Badge>
    }
  }

  const attendanceStats = {
    present: students.filter((s) => s.status === "present").length,
    absent: students.filter((s) => s.status === "absent").length,
    late: students.filter((s) => s.status === "late").length,
    excused: students.filter((s) => s.status === "excused").length,
    total: students.length,
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-balance">Mark Attendance</h1>
            <p className="text-muted-foreground">Record student attendance for your classes</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <QrCode className="h-4 w-4" />
              QR Code
            </Button>
            <Button className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Attendance
            </Button>
          </div>
        </div>

        {/* Class and Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Class Information</CardTitle>
            <CardDescription>Select the class and date for attendance marking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class-select">Select Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((classItem) => (
                      <SelectItem key={classItem.id} value={classItem.id}>
                        {classItem.name} ({classItem.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-select">Date</Label>
                <Input
                  id="date-select"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>

            {currentClass && (
              <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-muted">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{currentClass.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{currentClass.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{students.length} students</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Attendance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{attendanceStats.present}</p>
                  <p className="text-xs text-muted-foreground">Present</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">{attendanceStats.absent}</p>
                  <p className="text-xs text-muted-foreground">Absent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{attendanceStats.late}</p>
                  <p className="text-xs text-muted-foreground">Late</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{attendanceStats.excused}</p>
                  <p className="text-xs text-muted-foreground">Excused</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{attendanceStats.total}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={markAllPresent} className="bg-transparent">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Mark All Present
                </Button>
                <Button variant="outline" size="sm" onClick={markAllAbsent} className="bg-transparent">
                  <UserX className="h-4 w-4 mr-2" />
                  Mark All Absent
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance</CardTitle>
            <CardDescription>Mark attendance for each student</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
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
                      <p className="text-sm text-muted-foreground">{student.studentId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(student.status)}
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant={student.status === "present" ? "default" : "outline"}
                        onClick={() => updateStudentStatus(student.id, "present")}
                        className={student.status !== "present" ? "bg-transparent" : ""}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={student.status === "late" ? "default" : "outline"}
                        onClick={() => updateStudentStatus(student.id, "late")}
                        className={student.status !== "late" ? "bg-transparent" : ""}
                      >
                        <Clock className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={student.status === "excused" ? "default" : "outline"}
                        onClick={() => updateStudentStatus(student.id, "excused")}
                        className={student.status !== "excused" ? "bg-transparent" : ""}
                      >
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={student.status === "absent" ? "destructive" : "outline"}
                        onClick={() => updateStudentStatus(student.id, "absent")}
                        className={student.status !== "absent" ? "bg-transparent" : ""}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
