'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Calendar,
  Download,
  Filter,
  RefreshCw,
} from 'lucide-react';

const monthlyRevenue = [
  { month: 'Jan', revenue: 45000, target: 50000 },
  { month: 'Feb', revenue: 52000, target: 50000 },
  { month: 'Mar', revenue: 48000, target: 55000 },
  { month: 'Apr', revenue: 61000, target: 55000 },
  { month: 'May', revenue: 55000, target: 60000 },
  { month: 'Jun', revenue: 67000, target: 60000 },
];

const salesByRegion = [
  { name: 'North America', value: 45, color: '#000000' },
  { name: 'Europe', value: 30, color: '#404040' },
  { name: 'Asia Pacific', value: 20, color: '#808080' },
  { name: 'Others', value: 5, color: '#C0C0C0' },
];

const salesPerformance = [
  { name: 'John Smith', deals: 12, revenue: 145000, conversion: 85 },
  { name: 'Sarah Johnson', deals: 10, revenue: 132000, conversion: 78 },
  { name: 'Mike Chen', deals: 8, revenue: 98000, conversion: 72 },
  { name: 'Emily Davis', deals: 15, revenue: 187000, conversion: 90 },
  { name: 'Alex Wilson', deals: 6, revenue: 76000, conversion: 65 },
];

const pipelineData = [
  { stage: 'Lead', count: 150, value: 750000 },
  { stage: 'Qualified', count: 85, value: 680000 },
  { stage: 'Proposal', count: 45, value: 540000 },
  { stage: 'Negotiation', count: 25, value: 375000 },
  { stage: 'Closed Won', count: 18, value: 270000 },
];

const conversionTrend = [
  { month: 'Jan', rate: 22 },
  { month: 'Feb', rate: 25 },
  { month: 'Mar', rate: 28 },
  { month: 'Apr', rate: 32 },
  { month: 'May', rate: 29 },
  { month: 'Jun', rate: 35 },
];

export function SalesReports() {
  return (
    <div className='space-y-6 px-10 py-10'>
      <PageHeader
        title='Sales Reports'
        description='Comprehensive sales analytics and performance metrics'
        actions={
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm'>
              <Filter className='h-4 w-4 mr-2' />
              Filter
            </Button>
            <Button variant='outline' size='sm'>
              <Download className='h-4 w-4 mr-2' />
              Export
            </Button>
            <Button variant='outline' size='sm'>
              <RefreshCw className='h-4 w-4 mr-2' />
              Refresh
            </Button>
          </div>
        }
      />

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$328,000</div>
            <div className='flex items-center text-xs text-green-600'>
              <TrendingUp className='h-3 w-3 mr-1' />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Deals Closed</CardTitle>
            <Target className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>67</div>
            <div className='flex items-center text-xs text-green-600'>
              <TrendingUp className='h-3 w-3 mr-1' />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Conversion Rate
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>35%</div>
            <div className='flex items-center text-xs text-green-600'>
              <TrendingUp className='h-3 w-3 mr-1' />
              +3.1% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Avg Deal Size</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$4,896</div>
            <div className='flex items-center text-xs text-red-600'>
              <TrendingDown className='h-3 w-3 mr-1' />
              -2.3% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Target</CardTitle>
            <CardDescription>
              Monthly revenue performance against targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis dataKey='month' stroke='#666' />
                <YAxis stroke='#666' />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
                <Bar dataKey='revenue' fill='#000000' name='Revenue' />
                <Bar dataKey='target' fill='#808080' name='Target' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>
              Revenue distribution across regions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={salesByRegion}
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {salesByRegion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
          <CardDescription>Current pipeline stages and values</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={pipelineData} layout='horizontal'>
              <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
              <XAxis type='number' stroke='#666' />
              <YAxis dataKey='stage' type='category' stroke='#666' />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
                formatter={(value, name) => [
                  name === 'count'
                    ? `${value} deals`
                    : `$${value.toLocaleString()}`,
                  name === 'count' ? 'Deals' : 'Value',
                ]}
              />
              <Bar dataKey='count' fill='#404040' name='count' />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate Trend</CardTitle>
            <CardDescription>
              Monthly conversion rate performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={250}>
              <AreaChart data={conversionTrend}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis dataKey='month' stroke='#666' />
                <YAxis stroke='#666' />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  formatter={(value) => [`${value}%`, 'Conversion Rate']}
                />
                <Area
                  type='monotone'
                  dataKey='rate'
                  stroke='#000000'
                  fill='#000000'
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Sales team performance this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {salesPerformance.map((rep, index) => (
                <div
                  key={rep.name}
                  className='flex items-center justify-between p-3 border rounded-lg'
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium'>
                      {index + 1}
                    </div>
                    <div>
                      <p className='font-medium'>{rep.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {rep.deals} deals
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium'>
                      ${rep.revenue.toLocaleString()}
                    </p>
                    <div className='flex items-center gap-1'>
                      <Badge
                        variant={rep.conversion >= 80 ? 'default' : 'secondary'}
                        className='text-xs'
                      >
                        {rep.conversion}%
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
