"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Users, TrendingUp, BookOpen, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function StudentDashboard() {
  // Mock data for demonstration
  const studentInfo = {
    name: "Alex Johnson",
    studentId: "CS2024001",
    semester: "Fall 2024",
    overallAttendance: 87,
  }

  const todayClasses = [
    { id: 1, name: "Data Structures", time: "09:00 AM", room: "CS-101", status: "present" },
    { id: 2, name: "Database Systems", time: "11:00 AM", room: "CS-205", status: "upcoming" },
    { id: 3, name: "Software Engineering", time: "02:00 PM", room: "CS-301", status: "upcoming" },
    { id: 4, name: "Computer Networks", time: "04:00 PM", room: "CS-401", status: "upcoming" },
  ]

  const recentAttendance = [
    { subject: "Data Structures", attendance: 92, total: 25, present: 23 },
    { subject: "Database Systems", attendance: 88, total: 24, present: 21 },
    { subject: "Software Engineering", attendance: 85, total: 20, present: 17 },
    { subject: "Computer Networks", attendance: 82, total: 22, present: 18 },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "absent":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "upcoming":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return (
          <Badge variant="default" className="bg-primary">
            Present
          </Badge>
        )
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-balance">Welcome back, {studentInfo.name}</h1>
            <p className="text-muted-foreground">
              Student ID: {studentInfo.studentId} • {studentInfo.semester}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold text-primary">{studentInfo.overallAttendance}%</span>
            <span className="text-sm text-muted-foreground">Overall Attendance</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayClasses.length}</div>
              <p className="text-xs text-muted-foreground">
                {todayClasses.filter((c) => c.status === "present").length} attended
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18/20</div>
              <p className="text-xs text-muted-foreground">Classes attended</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentAttendance.length}</div>
              <p className="text-xs text-muted-foreground">Enrolled courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Goal</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Minimum required</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Your classes for today, {new Date().toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(classItem.status)}
                    <div>
                      <p className="font-medium">{classItem.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {classItem.time} • {classItem.room}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(classItem.status)}
                </div>
              ))}
              <Button className="w-full mt-4">View Full Schedule</Button>
            </CardContent>
          </Card>

          {/* Attendance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Attendance Overview
              </CardTitle>
              <CardDescription>Your attendance percentage by subject</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAttendance.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{subject.subject}</span>
                    <span className="text-sm text-muted-foreground">
                      {subject.present}/{subject.total} ({subject.attendance}%)
                    </span>
                  </div>
                  <Progress value={subject.attendance} className="h-2" />
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View Detailed Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-4 flex flex-col items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                <span>Mark Attendance</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <BookOpen className="h-6 w-6" />
                <span>View All Subjects</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <TrendingUp className="h-6 w-6" />
                <span>Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
