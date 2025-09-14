'use client';

import { PageHeader } from '@/components/page-header';
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
import {
  Table,
  Users,
  Activity,
  HardDrive,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Settings,
  RefreshCw,
} from 'lucide-react';

export function DatabaseOverview() {
  return (
    <div className='space-y-6 px-10 py-10'>
      <PageHeader
        title='Database Overview'
        description='Monitor your database performance, connections, and usage'
        actions={
          <div className='flex gap-2'>
            <Button variant='outline' size='sm'>
              <RefreshCw className='h-4 w-4 mr-2' />
              Refresh
            </Button>
            <Button size='sm'>
              <Plus className='h-4 w-4 mr-2' />
              New Table
            </Button>
          </div>
        }
      />

      {/* Database Status Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Tables</CardTitle>
            <Table className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>24</div>
            <p className='text-xs text-muted-foreground'>+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Active Connections
            </CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>156</div>
            <p className='text-xs text-muted-foreground'>Peak: 203 today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Storage Used</CardTitle>
            <HardDrive className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2.4 GB</div>
            <p className='text-xs text-muted-foreground'>of 10 GB allocated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Query Performance
            </CardTitle>
            <Zap className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12ms</div>
            <p className='text-xs text-muted-foreground'>avg response time</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Database Health */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='h-5 w-5' />
              Database Health
            </CardTitle>
            <CardDescription>Current system status and alerts</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='h-4 w-4 text-green-500' />
                <span className='text-sm'>Connection Pool</span>
              </div>
              <Badge
                variant='outline'
                className='text-green-700 border-green-200'
              >
                Healthy
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='h-4 w-4 text-green-500' />
                <span className='text-sm'>Backup Status</span>
              </div>
              <Badge
                variant='outline'
                className='text-green-700 border-green-200'
              >
                Up to date
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <AlertTriangle className='h-4 w-4 text-yellow-500' />
                <span className='text-sm'>Index Optimization</span>
              </div>
              <Badge
                variant='outline'
                className='text-yellow-700 border-yellow-200'
              >
                Needs attention
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='h-4 w-4 text-green-500' />
                <span className='text-sm'>Security Scan</span>
              </div>
              <Badge
                variant='outline'
                className='text-green-700 border-green-200'
              >
                Passed
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Resource Usage */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Activity className='h-5 w-5' />
              Resource Usage
            </CardTitle>
            <CardDescription>
              Current database resource consumption
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span>CPU Usage</span>
                <span>34%</span>
              </div>
              <Progress value={34} className='h-2' />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span>Memory Usage</span>
                <span>67%</span>
              </div>
              <Progress value={67} className='h-2' />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span>Storage Usage</span>
                <span>24%</span>
              </div>
              <Progress value={24} className='h-2' />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span>Network I/O</span>
                <span>12%</span>
              </div>
              <Progress value={12} className='h-2' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Clock className='h-5 w-5' />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest database operations and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center gap-3 text-sm'>
                <div className='w-2 h-2 bg-green-500 rounded-full' />
                <span className='flex-1'>Table 'users' backup completed</span>
                <span className='text-muted-foreground'>2 min ago</span>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <div className='w-2 h-2 bg-blue-500 rounded-full' />
                <span className='flex-1'>
                  New index created on 'orders.customer_id'
                </span>
                <span className='text-muted-foreground'>15 min ago</span>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <div className='w-2 h-2 bg-yellow-500 rounded-full' />
                <span className='flex-1'>
                  Slow query detected in analytics table
                </span>
                <span className='text-muted-foreground'>1 hour ago</span>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <div className='w-2 h-2 bg-green-500 rounded-full' />
                <span className='flex-1'>Connection pool optimized</span>
                <span className='text-muted-foreground'>3 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Settings className='h-5 w-5' />
              Quick Actions
            </CardTitle>
            <CardDescription>Common database management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-3'>
              <Button
                variant='outline'
                className='h-auto p-4 flex flex-col items-center gap-2 bg-transparent'
              >
                <Table className='h-5 w-5' />
                <span className='text-sm'>Create Table</span>
              </Button>
              <Button
                variant='outline'
                className='h-auto p-4 flex flex-col items-center gap-2 bg-transparent'
              >
                <Users className='h-5 w-5' />
                <span className='text-sm'>Manage Users</span>
              </Button>
              <Button
                variant='outline'
                className='h-auto p-4 flex flex-col items-center gap-2 bg-transparent'
              >
                <Shield className='h-5 w-5' />
                <span className='text-sm'>Security Audit</span>
              </Button>
              <Button
                variant='outline'
                className='h-auto p-4 flex flex-col items-center gap-2 bg-transparent'
              >
                <HardDrive className='h-5 w-5' />
                <span className='text-sm'>Backup Now</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
