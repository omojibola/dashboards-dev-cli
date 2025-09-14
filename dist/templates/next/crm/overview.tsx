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
import { Progress } from '@/components/ui/progress';
import { PageHeader } from '@/components/page-header';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  Bot,
  Star,
  Phone,
  Mail,
  Calendar,
  Target,
} from 'lucide-react';

// Mock data for charts
const ticketVolumeData = [
  { month: 'Jan', tickets: 245, resolved: 220 },
  { month: 'Feb', tickets: 312, resolved: 298 },
  { month: 'Mar', tickets: 189, resolved: 175 },
  { month: 'Apr', tickets: 278, resolved: 265 },
  { month: 'May', tickets: 356, resolved: 340 },
  { month: 'Jun', tickets: 423, resolved: 410 },
];

const aiConfidenceData = [
  { name: 'High (90-100%)', value: 45, color: '#22c55e' },
  { name: 'Medium (70-89%)', value: 35, color: '#f59e0b' },
  { name: 'Low (50-69%)', value: 20, color: '#ef4444' },
];

const responseTimeData = [
  { day: 'Mon', avgTime: 2.3 },
  { day: 'Tue', avgTime: 1.8 },
  { day: 'Wed', avgTime: 2.1 },
  { day: 'Thu', avgTime: 1.9 },
  { day: 'Fri', avgTime: 2.5 },
  { day: 'Sat', avgTime: 3.2 },
  { day: 'Sun', avgTime: 2.8 },
];

const customerSatisfactionData = [
  { month: 'Jan', score: 4.2 },
  { month: 'Feb', score: 4.3 },
  { month: 'Mar', score: 4.1 },
  { month: 'Apr', score: 4.4 },
  { month: 'May', score: 4.5 },
  { month: 'Jun', score: 4.6 },
];

// Mock support tickets with AI confidence scores
const recentTickets = [
  {
    id: 'TK-001',
    subject: 'Payment processing issue',
    customer: 'John Smith',
    status: 'resolved',
    confidence: 95,
    aiResponse: 'Automated resolution applied',
    priority: 'high',
    created: '2 hours ago',
  },
  {
    id: 'TK-002',
    subject: 'Account login problems',
    customer: 'Sarah Johnson',
    status: 'in-progress',
    confidence: 78,
    aiResponse: 'Escalated to human agent',
    priority: 'medium',
    created: '4 hours ago',
  },
  {
    id: 'TK-003',
    subject: 'Feature request - dark mode',
    customer: 'Mike Chen',
    status: 'pending',
    confidence: 62,
    aiResponse: 'Requires product team review',
    priority: 'low',
    created: '6 hours ago',
  },
  {
    id: 'TK-004',
    subject: 'Billing inquiry',
    customer: 'Emma Wilson',
    status: 'resolved',
    confidence: 92,
    aiResponse: 'Automated billing explanation sent',
    priority: 'medium',
    created: '8 hours ago',
  },
];

const getConfidenceDotColor = (confidence: number) => {
  if (confidence >= 90) return 'bg-green-500';
  if (confidence >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'resolved':
      return 'default';
    case 'in-progress':
      return 'secondary';
    case 'pending':
      return 'outline';
    default:
      return 'outline';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'text-red-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
};

export function CrmOverview() {
  return (
    <div className='space-y-6 px-10 py-10'>
      <PageHeader
        title='CRM Overview'
        description='AI-powered customer relationship management dashboard'
      />

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Active Tickets
            </CardTitle>
            <MessageSquare className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>127</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-600'>↓ 12%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              AI Resolution Rate
            </CardTitle>
            <Bot className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>73%</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-600'>↑ 5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Avg Response Time
            </CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2.1h</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-600'>↓ 0.3h</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Customer Satisfaction
            </CardTitle>
            <Star className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>4.6/5</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-600'>↑ 0.2</span> this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Ticket Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ticket Volume & Resolution</CardTitle>
            <CardDescription>
              Monthly ticket trends and resolution rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                tickets: {
                  label: 'Total Tickets',
                  color: 'hsl(var(--chart-1))',
                },
                resolved: { label: 'Resolved', color: 'hsl(var(--chart-2))' },
              }}
              className='h-[300px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={ticketVolumeData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey='tickets' fill='var(--color-tickets)' />
                  <Bar dataKey='resolved' fill='var(--color-resolved)' />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* AI Confidence Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>AI Confidence Distribution</CardTitle>
            <CardDescription>
              Confidence levels of AI-generated responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: 'Percentage', color: 'hsl(var(--chart-1))' },
              }}
              className='h-[300px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={aiConfidenceData}
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey='value'
                  >
                    {aiConfidenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className='flex justify-center space-x-4 mt-4'>
              {aiConfidenceData.map((item, index) => (
                <div key={index} className='flex items-center space-x-2'>
                  <div
                    className={`w-3 h-3 rounded-full`}
                    style={{ backgroundColor: item.color }}
                  />
                  <span className='text-sm'>{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Response Time Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Average Response Time</CardTitle>
            <CardDescription>
              Daily response time trends (hours)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                avgTime: {
                  label: 'Avg Time (hours)',
                  color: 'hsl(var(--chart-3))',
                },
              }}
              className='h-[250px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='day' />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type='monotone'
                    dataKey='avgTime'
                    stroke='var(--color-avgTime)'
                    fill='var(--color-avgTime)'
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Customer Satisfaction Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction Score</CardTitle>
            <CardDescription>Monthly satisfaction ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                score: {
                  label: 'Satisfaction Score',
                  color: 'hsl(var(--chart-4))',
                },
              }}
              className='h-[250px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={customerSatisfactionData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis domain={[3.5, 5]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type='monotone'
                    dataKey='score'
                    stroke='var(--color-score)'
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-score)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Support Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Support Tickets</CardTitle>
          <CardDescription>
            Latest tickets with AI confidence scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className='flex items-center justify-between p-4 border rounded-lg'
              >
                <div className='flex items-center space-x-4'>
                  <div
                    className={`w-3 h-3 rounded-full ${getConfidenceDotColor(
                      ticket.confidence
                    )}`}
                  />
                  <div>
                    <div className='flex items-center space-x-2'>
                      <span className='font-medium'>{ticket.id}</span>
                      <Badge variant={getStatusBadgeVariant(ticket.status)}>
                        {ticket.status}
                      </Badge>
                      <span
                        className={`text-sm font-medium ${getPriorityColor(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {ticket.subject}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {ticket.customer} • {ticket.created}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-sm font-medium'>
                    {ticket.confidence}% confidence
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {ticket.aiResponse}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm'>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>AI Resolution</span>
                <span>73%</span>
              </div>
              <Progress value={73} className='h-2' />
              <div className='flex justify-between text-sm'>
                <span>Human Escalation</span>
                <span>27%</span>
              </div>
              <Progress value={27} className='h-2' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm'>Contact Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Mail className='h-4 w-4' />
                  <span className='text-sm'>Email</span>
                </div>
                <span className='text-sm font-medium'>45%</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <MessageSquare className='h-4 w-4' />
                  <span className='text-sm'>Chat</span>
                </div>
                <span className='text-sm font-medium'>35%</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Phone className='h-4 w-4' />
                  <span className='text-sm'>Phone</span>
                </div>
                <span className='text-sm font-medium'>20%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm'>Today's Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex items-center space-x-2'>
                <Target className='h-4 w-4 text-green-600' />
                <span className='text-sm'>Resolve 50 tickets</span>
              </div>
              <div className='flex items-center space-x-2'>
                <CheckCircle className='h-4 w-4 text-green-600' />
                <span className='text-sm'>Maintain 4.5+ rating</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Clock className='h-4 w-4 text-yellow-600' />
                <span className='text-sm'>Sub 2h response time</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm'>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <Button size='sm' className='w-full justify-start'>
                <Bot className='h-4 w-4 mr-2' />
                Train AI Model
              </Button>
              <Button
                size='sm'
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <Calendar className='h-4 w-4 mr-2' />
                Schedule Report
              </Button>
              <Button
                size='sm'
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <Users className='h-4 w-4 mr-2' />
                Manage Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
