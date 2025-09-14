'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  UserCheck,
  AlertTriangle,
  GraduationCap,
  Star,
  ChevronRight,
  Bell,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// Mock data for school management
const enrollmentData = [
  { month: 'Jan', students: 1200, target: 1250 },
  { month: 'Feb', students: 1180, target: 1250 },
  { month: 'Mar', students: 1220, target: 1250 },
  { month: 'Apr', students: 1240, target: 1250 },
  { month: 'May', students: 1260, target: 1250 },
  { month: 'Jun', students: 1280, target: 1250 },
];

const attendanceData = [
  { day: 'Mon', rate: 95 },
  { day: 'Tue', rate: 92 },
  { day: 'Wed', rate: 88 },
  { day: 'Thu', rate: 90 },
  { day: 'Fri', rate: 85 },
];

const gradeDistribution = [
  { grade: 'A', count: 180, color: '#22c55e' },
  { grade: 'B', count: 320, color: '#3b82f6' },
  { grade: 'C', count: 280, color: '#f59e0b' },
  { grade: 'D', count: 120, color: '#ef4444' },
  { grade: 'F', count: 50, color: '#6b7280' },
];

const recentActivities = [
  {
    id: 1,
    type: 'enrollment',
    message: 'New student enrolled in Grade 10',
    time: '2 hours ago',
    priority: 'normal',
  },
  {
    id: 2,
    type: 'alert',
    message: 'Low attendance in Math Class 3B',
    time: '4 hours ago',
    priority: 'high',
  },
  {
    id: 3,
    type: 'achievement',
    message: 'Science Department won regional competition',
    time: '1 day ago',
    priority: 'normal',
  },
  {
    id: 4,
    type: 'event',
    message: 'Parent-Teacher meeting scheduled for next week',
    time: '2 days ago',
    priority: 'normal',
  },
];

const topPerformers = [
  {
    name: 'Sarah Johnson',
    grade: '12th',
    gpa: 4.0,
    subjects: 'Mathematics, Physics',
  },
  {
    name: 'Michael Chen',
    grade: '11th',
    gpa: 3.95,
    subjects: 'Chemistry, Biology',
  },
  {
    name: 'Emma Davis',
    grade: '10th',
    gpa: 3.92,
    subjects: 'Literature, History',
  },
];

export function SchoolOverview() {
  return (
    <div className='space-y-6 px-10 py-10'>
      <PageHeader
        title='School Management Overview'
        description="Welcome back, Jibola! Here's your school performance dashboard"
      />

      {/* Key Metrics */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='border-l-4 border-l-blue-500'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Students
            </CardTitle>
            <Users className='h-4 w-4 text-blue-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-600'>1,280</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-600'>+2.4%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className='border-l-4 border-l-green-500'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Attendance Rate
            </CardTitle>
            <UserCheck className='h-4 w-4 text-green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>90.2%</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-red-600'>-1.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className='border-l-4 border-l-purple-500'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Active Courses
            </CardTitle>
            <BookOpen className='h-4 w-4 text-purple-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-purple-600'>48</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-600'>+3</span> new this semester
            </p>
          </CardContent>
        </Card>

        <Card className='border-l-4 border-l-orange-500'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Average GPA</CardTitle>
            <Award className='h-4 w-4 text-orange-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-orange-600'>3.42</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-600'>+0.08</span> from last term
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Student Enrollment Trends */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5 text-blue-500' />
              Student Enrollment Trends
            </CardTitle>
            <CardDescription>Monthly enrollment vs target</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                students: { label: 'Students', color: '#3b82f6' },
                target: { label: 'Target', color: '#e5e7eb' },
              }}
              className='h-[300px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey='target'
                    fill='var(--color-target)'
                    name='Target'
                  />
                  <Bar
                    dataKey='students'
                    fill='var(--color-students)'
                    name='Students'
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Clock className='h-5 w-5 text-green-500' />
              Weekly Attendance Rate
            </CardTitle>
            <CardDescription>Daily attendance percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                rate: { label: 'Attendance %', color: '#22c55e' },
              }}
              className='h-[300px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='day' />
                  <YAxis domain={[80, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type='monotone'
                    dataKey='rate'
                    stroke='var(--color-rate)'
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-rate)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <GraduationCap className='h-5 w-5 text-purple-500' />
              Grade Distribution
            </CardTitle>
            <CardDescription>Current semester grades</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: 'Students' },
              }}
              className='h-[250px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx='50%'
                    cy='50%'
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey='count'
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className='mt-4 space-y-2'>
              {gradeDistribution.map((grade) => (
                <div
                  key={grade.grade}
                  className='flex items-center justify-between text-sm'
                >
                  <div className='flex items-center gap-2'>
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: grade.color }}
                    />
                    <span>Grade {grade.grade}</span>
                  </div>
                  <span className='font-medium'>{grade.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Star className='h-5 w-5 text-yellow-500' />
              Top Performers
            </CardTitle>
            <CardDescription>Highest GPA students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {topPerformers.map((student, index) => (
                <div
                  key={student.name}
                  className='flex items-center gap-3 p-3 rounded-lg bg-muted/50'
                >
                  <div className='flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 font-bold text-sm'>
                    {index + 1}
                  </div>
                  <div className='flex-1'>
                    <p className='font-medium'>{student.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {student.grade} Grade
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {student.subjects}
                    </p>
                  </div>
                  <Badge
                    variant='secondary'
                    className='bg-yellow-100 text-yellow-700'
                  >
                    {student.gpa}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Bell className='h-5 w-5 text-blue-500' />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest school updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className='flex items-start gap-3 p-3 rounded-lg bg-muted/50'
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.priority === 'high'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  <div className='flex-1'>
                    <p className='text-sm font-medium'>{activity.message}</p>
                    <p className='text-xs text-muted-foreground'>
                      {activity.time}
                    </p>
                  </div>
                  {activity.priority === 'high' && (
                    <AlertTriangle className='h-4 w-4 text-red-500' />
                  )}
                </div>
              ))}
            </div>
            <Button variant='ghost' className='w-full mt-4 text-sm'>
              View All Activities
              <ChevronRight className='h-4 w-4 ml-1' />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common school management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-4'>
            <Button className='h-auto p-4 flex-col gap-2 bg-blue-500 hover:bg-blue-600'>
              <Users className='h-5 w-5' />
              <span className='text-sm'>Enroll Student</span>
            </Button>
            <Button
              variant='outline'
              className='h-auto p-4 flex-col gap-2 bg-transparent'
            >
              <Calendar className='h-5 w-5' />
              <span className='text-sm'>Schedule Class</span>
            </Button>
            <Button
              variant='outline'
              className='h-auto p-4 flex-col gap-2 bg-transparent'
            >
              <BookOpen className='h-5 w-5' />
              <span className='text-sm'>Add Course</span>
            </Button>
            <Button
              variant='outline'
              className='h-auto p-4 flex-col gap-2 bg-transparent'
            >
              <Award className='h-5 w-5' />
              <span className='text-sm'>Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
