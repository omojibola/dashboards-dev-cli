'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader } from '@/components/dashboard-header';
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  CreditCard,
  TrendingUp,
  Users,
  Activity,
  AlertCircle,
} from 'lucide-react';
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const metrics = [
  {
    title: 'Total Revenue',
    value: '$2,847,392',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Active Accounts',
    value: '14,892',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Transaction Volume',
    value: '$18.2M',
    change: '+15.3%',
    trend: 'up',
    icon: CreditCard,
  },
  {
    title: 'Processing Rate',
    value: '99.7%',
    change: '-0.1%',
    trend: 'down',
    icon: Activity,
  },
];

const recentTransactions = [
  {
    id: 'TXN-001',
    amount: '$12,450.00',
    status: 'completed',
    merchant: 'TechCorp Solutions',
    time: '2 minutes ago',
  },
  {
    id: 'TXN-002',
    amount: '$8,920.50',
    status: 'pending',
    merchant: 'Global Retail Inc',
    time: '5 minutes ago',
  },
  {
    id: 'TXN-003',
    amount: '$3,275.25',
    status: 'completed',
    merchant: 'Digital Services Ltd',
    time: '12 minutes ago',
  },
  {
    id: 'TXN-004',
    amount: '$15,680.00',
    status: 'failed',
    merchant: 'Enterprise Corp',
    time: '18 minutes ago',
  },
];

const alerts = [
  {
    type: 'warning',
    message: 'Unusual transaction pattern detected in Region A',
    time: '15 minutes ago',
  },
  {
    type: 'info',
    message: 'Monthly compliance report is ready for review',
    time: '1 hour ago',
  },
  {
    type: 'error',
    message: 'Payment gateway timeout in EU region',
    time: '2 hours ago',
  },
];

const revenueData = [
  { month: 'Jan', revenue: 2400000, transactions: 1200 },
  { month: 'Feb', revenue: 2100000, transactions: 1100 },
  { month: 'Mar', revenue: 2800000, transactions: 1400 },
  { month: 'Apr', revenue: 2600000, transactions: 1300 },
  { month: 'May', revenue: 3200000, transactions: 1600 },
  { month: 'Jun', revenue: 2847392, transactions: 1489 },
];

const transactionVolumeData = [
  { day: 'Mon', volume: 15.2 },
  { day: 'Tue', volume: 18.7 },
  { day: 'Wed', volume: 16.3 },
  { day: 'Thu', volume: 21.1 },
  { day: 'Fri', volume: 19.8 },
  { day: 'Sat', volume: 12.4 },
  { day: 'Sun', volume: 14.6 },
];

export default function FintechOverview() {
  return (
    <div className='space-y-6 px-10 py-10'>
      <DashboardHeader
        title='Fintech Overview'
        description='Monitor your financial operations and key metrics'
      >
        <Button className='bg-primary text-primary-foreground hover:bg-primary/90'>
          <TrendingUp className='h-4 w-4 mr-2' />
          View Analytics
        </Button>
      </DashboardHeader>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                {metric.title}
              </CardTitle>
              <metric.icon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{metric.value}</div>
              <div className='flex items-center text-xs text-muted-foreground'>
                {metric.trend === 'up' ? (
                  <ArrowUpRight className='h-3 w-3 text-black mr-1' />
                ) : (
                  <ArrowDownRight className='h-3 w-3 text-black mr-1' />
                )}
                <span className='text-black'>{metric.change}</span>
                <span className='ml-1'>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>
              Monthly revenue over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: 'Revenue',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className='h-[200px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={revenueData}>
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='hsl(var(--border))'
                  />
                  <XAxis
                    dataKey='month'
                    stroke='hsl(var(--muted-foreground))'
                  />
                  <YAxis stroke='hsl(var(--muted-foreground))' />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type='monotone'
                    dataKey='revenue'
                    stroke='var(--color-chart-1)'
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-chart-1)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Transaction Volume</CardTitle>
            <CardDescription>
              Daily transaction volume in millions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                volume: {
                  label: 'Volume (M)',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className='h-[200px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={transactionVolumeData}>
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='hsl(var(--border))'
                  />
                  <XAxis dataKey='day' stroke='hsl(var(--muted-foreground))' />
                  <YAxis stroke='hsl(var(--muted-foreground))' />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey='volume'
                    fill='var(--color-chart-1)'
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Latest payment processing activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className='flex items-center justify-between p-3 rounded-lg border border-border'
                >
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>
                        {transaction.merchant}
                      </span>
                      <Badge
                        variant={
                          transaction.status === 'completed'
                            ? 'default'
                            : transaction.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className='text-xs'
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      {transaction.id} • {transaction.time}
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='font-semibold'>{transaction.amount}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant='outline' className='w-full mt-4 bg-transparent'>
              View All Transactions
            </Button>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>
              Important notifications and system status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className='flex items-start gap-3 p-3 rounded-lg border border-border'
                >
                  <AlertCircle
                    className={`h-4 w-4 mt-0.5 ${
                      alert.type === 'error'
                        ? 'text-destructive'
                        : alert.type === 'warning'
                        ? 'text-orange-500'
                        : 'text-blue-500'
                    }`}
                  />
                  <div className='flex-1'>
                    <p className='text-sm'>{alert.message}</p>
                    <p className='text-xs text-muted-foreground mt-1'>
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant='outline' className='w-full mt-4 bg-transparent'>
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Button
              variant='outline'
              className='h-auto p-4 flex flex-col items-center gap-2 bg-transparent'
            >
              <CreditCard className='h-6 w-6' />
              <span>Process Payment</span>
            </Button>
            <Button
              variant='outline'
              className='h-auto p-4 flex flex-col items-center gap-2 bg-transparent'
            >
              <TrendingUp className='h-6 w-6' />
              <span>Generate Report</span>
            </Button>
            <Button
              variant='outline'
              className='h-auto p-4 flex flex-col items-center gap-2 bg-transparent'
            >
              <Users className='h-6 w-6' />
              <span>Manage Accounts</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
