'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/page-header';
import {
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Coffee,
  Car,
  Home,
  Smartphone,
  Utensils,
} from 'lucide-react';
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
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

// Mock data for transactions and spending
const dailySpending = [
  { date: 'Mon', amount: 45.5, budget: 60 },
  { date: 'Tue', amount: 78.2, budget: 60 },
  { date: 'Wed', amount: 32.1, budget: 60 },
  { date: 'Thu', amount: 91.75, budget: 60 },
  { date: 'Fri', amount: 156.3, budget: 60 },
  { date: 'Sat', amount: 203.45, budget: 60 },
  { date: 'Sun', amount: 87.9, budget: 60 },
];

const monthlySpending = [
  { month: 'Jan', amount: 2340, budget: 2500 },
  { month: 'Feb', amount: 1890, budget: 2500 },
  { month: 'Mar', amount: 2670, budget: 2500 },
  { month: 'Apr', amount: 2120, budget: 2500 },
  { month: 'May', amount: 2890, budget: 2500 },
  { month: 'Jun', amount: 2450, budget: 2500 },
];

const categorySpending = [
  { name: 'Food & Dining', value: 890, color: '#ef4444', icon: Utensils },
  { name: 'Shopping', value: 650, color: '#f97316', icon: ShoppingCart },
  { name: 'Transportation', value: 420, color: '#eab308', icon: Car },
  { name: 'Entertainment', value: 320, color: '#22c55e', icon: Coffee },
  { name: 'Bills & Utilities', value: 780, color: '#3b82f6', icon: Home },
  { name: 'Technology', value: 290, color: '#8b5cf6', icon: Smartphone },
];

const recentTransactions = [
  {
    id: 1,
    merchant: 'Starbucks Coffee',
    amount: -12.45,
    category: 'Food & Dining',
    time: '2 hours ago',
    type: 'debit',
  },
  {
    id: 2,
    merchant: 'Salary Deposit',
    amount: 3500.0,
    category: 'Income',
    time: '1 day ago',
    type: 'credit',
  },
  {
    id: 3,
    merchant: 'Amazon Purchase',
    amount: -89.99,
    category: 'Shopping',
    time: '2 days ago',
    type: 'debit',
  },
  {
    id: 4,
    merchant: 'Uber Ride',
    amount: -18.5,
    category: 'Transportation',
    time: '3 days ago',
    type: 'debit',
  },
  {
    id: 5,
    merchant: 'Netflix Subscription',
    amount: -15.99,
    category: 'Entertainment',
    time: '5 days ago',
    type: 'debit',
  },
];

export function FintechTransactions() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const totalBalance = 12345.67;
  const monthlyTarget = 2500;
  const currentMonthSpent = 1847.32;
  const targetProgress = (currentMonthSpent / monthlyTarget) * 100;

  return (
    <div className='space-y-6 px-10 py-10'>
      <PageHeader
        title='Transactions'
        description='Track your spending, manage budgets, and analyze financial patterns'
      />

      {/* Account Balance Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='border-l-4 border-l-green-500'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Account Balance
            </CardTitle>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setBalanceVisible(!balanceVisible)}
              className='h-8 w-8 p-0'
            >
              {balanceVisible ? (
                <EyeOff className='h-4 w-4' />
              ) : (
                <Eye className='h-4 w-4' />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>
              {balanceVisible ? `$${totalBalance.toLocaleString()}` : '••••••'}
            </div>
            <p className='text-xs text-muted-foreground flex items-center mt-1'>
              <TrendingUp className='h-3 w-3 mr-1 text-green-500' />
              +2.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className='border-l-4 border-l-blue-500'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Monthly Target
            </CardTitle>
            <Target className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-600'>
              ${monthlyTarget.toLocaleString()}
            </div>
            <div className='mt-2'>
              <Progress value={targetProgress} className='h-2' />
              <p className='text-xs text-muted-foreground mt-1'>
                ${currentMonthSpent.toLocaleString()} spent (
                {targetProgress.toFixed(1)}%)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className='border-l-4 border-l-orange-500'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>This Month</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-orange-600'>
              ${currentMonthSpent.toLocaleString()}
            </div>
            <p className='text-xs text-muted-foreground flex items-center mt-1'>
              <TrendingDown className='h-3 w-3 mr-1 text-orange-500' />
              -8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className='border-l-4 border-l-purple-500'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Avg Daily</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-purple-600'>$95.20</div>
            <p className='text-xs text-muted-foreground flex items-center mt-1'>
              <TrendingUp className='h-3 w-3 mr-1 text-purple-500' />
              +12.3% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Spending Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
            <CardDescription>
              Daily and monthly spending patterns
            </CardDescription>
            <Tabs
              value={selectedPeriod}
              onValueChange={setSelectedPeriod}
              className='w-full'
            >
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='daily'>Daily</TabsTrigger>
                <TabsTrigger value='monthly'>Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                amount: { label: 'Spent', color: '#3b82f6' },
                budget: { label: 'Budget', color: '#e5e7eb' },
              }}
              className='h-[300px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                {selectedPeriod === 'daily' ? (
                  <BarChart data={dailySpending}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey='budget' fill='#e5e7eb' name='Budget' />
                    <Bar dataKey='amount' fill='#3b82f6' name='Spent' />
                  </BarChart>
                ) : (
                  <LineChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='month' />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type='monotone'
                      dataKey='amount'
                      stroke='#3b82f6'
                      strokeWidth={3}
                      name='Spent'
                    />
                    <Line
                      type='monotone'
                      dataKey='budget'
                      stroke='#e5e7eb'
                      strokeWidth={2}
                      strokeDasharray='5 5'
                      name='Budget'
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>This month's category breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                spending: { label: 'Amount', color: '#8b5cf6' },
              }}
              className='h-[300px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={categorySpending}
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey='value'
                  >
                    {categorySpending.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className='bg-background border rounded-lg p-3 shadow-lg'>
                            <div className='flex items-center gap-2'>
                              <data.icon
                                className='h-4 w-4'
                                style={{ color: data.color }}
                              />
                              <span className='font-medium'>{data.name}</span>
                            </div>
                            <p className='text-sm text-muted-foreground'>
                              ${data.value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Details and Recent Transactions */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Category Details */}
        <Card>
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
            <CardDescription>Detailed spending breakdown</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {categorySpending.map((category, index) => (
              <div
                key={index}
                className='flex items-center justify-between border-b-1 pb-1'
              >
                <div className='flex items-center gap-3'>
                  <div
                    className='w-3 h-3 rounded-full'
                    style={{ backgroundColor: category.color }}
                  />
                  <category.icon className='h-4 w-4 text-muted-foreground' />
                  <span className='text-sm font-medium'>{category.name}</span>
                </div>
                <div className='text-right'>
                  <div className='text-sm font-medium'>${category.value}</div>
                  <div className='text-xs text-muted-foreground'>
                    {(
                      (category.value /
                        categorySpending.reduce(
                          (sum, cat) => sum + cat.value,
                          0
                        )) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest account activity</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className='flex items-center justify-between border-b-1 pb-1'
              >
                <div className='flex items-center gap-3'>
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === 'credit'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {transaction.type === 'credit' ? (
                      <ArrowDownRight className='h-4 w-4' />
                    ) : (
                      <ArrowUpRight className='h-4 w-4' />
                    )}
                  </div>
                  <div>
                    <div className='text-sm font-medium'>
                      {transaction.merchant}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {transaction.time}
                    </div>
                  </div>
                </div>
                <div className='text-right'>
                  <div
                    className={`text-sm font-medium ${
                      transaction.type === 'credit'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'credit' ? '+' : ''}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </div>
                  <Badge variant='secondary' className='text-xs'>
                    {transaction.category}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
