"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Users, Calendar, Download, Filter, BarChart3, PieChartIcon, FileText } from "lucide-react"

export function AnalyticsReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("semester")
  const [selectedClass, setSelectedClass] = useState("all")

  // Mock data for charts
  const attendanceTrends = [
    { week: "Week 1", attendance: 92, target: 85 },
    { week: "Week 2", attendance: 88, target: 85 },
    { week: "Week 3", attendance: 94, target: 85 },
    { week: "Week 4", attendance: 87, target: 85 },
    { week: "Week 5", attendance: 91, target: 85 },
    { week: "Week 6", attendance: 89, target: 85 },
    { week: "Week 7", attendance: 93, target: 85 },
    { week: "Week 8", attendance: 86, target: 85 },
  ]

  const classComparison = [
    { class: "CS 101", attendance: 92, students: 45 },
    { class: "CS 205", attendance: 88, students: 38 },
    { class: "CS 301", attendance: 85, students: 32 },
    { class: "CS 401", attendance: 89, students: 28 },
  ]

  const attendanceDistribution = [
    { name: "Excellent (90-100%)", value: 35, color: "#15803d" },
    { name: "Good (80-89%)", value: 28, color: "#84cc16" },
    { name: "Average (70-79%)", value: 20, color: "#f59e0b" },
    { name: "Poor (<70%)", value: 17, color: "#ef4444" },
  ]

  const monthlyData = [
    { month: "Jan", present: 1240, absent: 160, late: 80 },
    { month: "Feb", present: 1180, absent: 180, late: 90 },
    { month: "Mar", present: 1320, absent: 140, late: 70 },
    { month: "Apr", present: 1280, absent: 150, late: 85 },
    { month: "May", present: 1350, absent: 120, late: 60 },
  ]

  const topPerformers = [
    { name: "Alex Johnson", class: "CS 101", attendance: 98, streak: 15 },
    { name: "Sarah Chen", class: "CS 205", attendance: 96, streak: 12 },
    { name: "Michael Rodriguez", class: "CS 301", attendance: 95, streak: 18 },
    { name: "Emily Davis", class: "CS 401", attendance: 94, streak: 10 },
    { name: "David Kim", class: "CS 101", attendance: 93, streak: 8 },
  ]

  const classes = [
    { id: "all", name: "All Classes" },
    { id: "cs101", name: "CS 101 - Data Structures" },
    { id: "cs205", name: "CS 205 - Database Systems" },
    { id: "cs301", name: "CS 301 - Software Engineering" },
    { id: "cs401", name: "CS 401 - Computer Networks" },
  ]

  const overallStats = {
    totalStudents: 143,
    averageAttendance: 88.5,
    totalClasses: 1480,
    attendedClasses: 1310,
    improvement: 2.3,
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-balance">Analytics & Reports</h1>
            <p className="text-muted-foreground">Comprehensive attendance insights and performance metrics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="semester">This Semester</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((classItem) => (
                      <SelectItem key={classItem.id} value={classItem.id}>
                        {classItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Across all classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.averageAttendance}%</div>
              <div className="flex items-center text-xs text-primary">
                <TrendingUp className="h-3 w-3 mr-1" />+{overallStats.improvement}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes Held</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalClasses}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overallStats.attendedClasses}/{overallStats.totalClasses}
              </div>
              <p className="text-xs text-muted-foreground">Classes attended</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Attendance Trends
                  </CardTitle>
                  <CardDescription>Weekly attendance percentage over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={attendanceTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="attendance" stroke="var(--color-primary)" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="var(--color-muted-foreground)"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Monthly Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Overview
                  </CardTitle>
                  <CardDescription>Present, absent, and late statistics by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="present"
                        stackId="1"
                        stroke="var(--color-primary)"
                        fill="var(--color-primary)"
                      />
                      <Area
                        type="monotone"
                        dataKey="late"
                        stackId="1"
                        stroke="var(--color-secondary)"
                        fill="var(--color-secondary)"
                      />
                      <Area
                        type="monotone"
                        dataKey="absent"
                        stackId="1"
                        stroke="var(--color-destructive)"
                        fill="var(--color-destructive)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Class-wise Comparison
                </CardTitle>
                <CardDescription>Attendance rates across different classes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={classComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attendance" fill="var(--color-primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    Attendance Distribution
                  </CardTitle>
                  <CardDescription>Student distribution by attendance ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={attendanceDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {attendanceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribution Summary</CardTitle>
                  <CardDescription>Detailed breakdown of attendance ranges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {attendanceDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{item.value} students</span>
                        <p className="text-xs text-muted-foreground">
                          {((item.value / attendanceDistribution.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(
                            1,
                          )}
                          %
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Performers
                </CardTitle>
                <CardDescription>Students with highest attendance rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.class}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">{student.attendance}%</p>
                          <p className="text-xs text-muted-foreground">{student.streak} day streak</p>
                        </div>
                        <Badge className="bg-primary">Excellent</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Reports</CardTitle>
            <CardDescription>Export detailed reports for further analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <FileText className="h-6 w-6" />
                <span>Attendance Summary</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <BarChart3 className="h-6 w-6" />
                <span>Performance Report</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Users className="h-6 w-6" />
                <span>Student Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
