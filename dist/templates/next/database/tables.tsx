'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Database,
  Users,
  FileText,
  ShoppingCart,
  CreditCard,
  Calendar,
  Activity,
} from 'lucide-react';

interface DatabaseTable {
  id: string;
  name: string;
  schema: string;
  rows: number;
  size: string;
  lastModified: string;
  status: 'active' | 'inactive' | 'migrating';
  type: 'table' | 'view';
  icon: any;
}

const tables: DatabaseTable[] = [
  {
    id: '1',
    name: 'users',
    schema: 'public',
    rows: 15420,
    size: '2.3 MB',
    lastModified: '2 hours ago',
    status: 'active',
    type: 'table',
    icon: Users,
  },
  {
    id: '2',
    name: 'products',
    schema: 'public',
    rows: 8934,
    size: '5.7 MB',
    lastModified: '4 hours ago',
    status: 'active',
    type: 'table',
    icon: ShoppingCart,
  },
  {
    id: '3',
    name: 'orders',
    schema: 'public',
    rows: 45231,
    size: '12.4 MB',
    lastModified: '1 hour ago',
    status: 'active',
    type: 'table',
    icon: FileText,
  },
  {
    id: '4',
    name: 'payments',
    schema: 'public',
    rows: 23456,
    size: '8.9 MB',
    lastModified: '3 hours ago',
    status: 'active',
    type: 'table',
    icon: CreditCard,
  },
  {
    id: '5',
    name: 'user_sessions',
    schema: 'auth',
    rows: 89234,
    size: '15.2 MB',
    lastModified: '30 minutes ago',
    status: 'active',
    type: 'table',
    icon: Activity,
  },
  {
    id: '6',
    name: 'events_log',
    schema: 'analytics',
    rows: 234567,
    size: '45.8 MB',
    lastModified: '1 hour ago',
    status: 'migrating',
    type: 'table',
    icon: Calendar,
  },
  {
    id: '7',
    name: 'user_analytics_view',
    schema: 'analytics',
    rows: 15420,
    size: 'Virtual',
    lastModified: '6 hours ago',
    status: 'active',
    type: 'view',
    icon: Users,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'inactive':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'migrating':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function DatabaseTables() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchema, setSelectedSchema] = useState('all');

  const filteredTables = tables.filter((table) => {
    const matchesSearch = table.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSchema =
      selectedSchema === 'all' || table.schema === selectedSchema;
    return matchesSearch && matchesSchema;
  });

  const schemas = [
    'all',
    ...Array.from(new Set(tables.map((table) => table.schema))),
  ];

  return (
    <div className='space-y-6 px-10 py-10'>
      <PageHeader
        title='Database Tables'
        description='Manage your database tables, views, and schemas'
      />

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Tables</CardTitle>
            <Database className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>6</div>
            <p className='text-xs text-muted-foreground'>+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Rows</CardTitle>
            <FileText className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>426.8K</div>
            <p className='text-xs text-muted-foreground'>
              +12.5% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Database Size</CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>90.3 MB</div>
            <p className='text-xs text-muted-foreground'>
              +5.2% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Views</CardTitle>
            <Eye className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1</div>
            <p className='text-xs text-muted-foreground'>No change</p>
          </CardContent>
        </Card>
      </div>

      {/* Tables Management */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Tables & Views</CardTitle>
              <CardDescription>
                Manage your database tables and views
              </CardDescription>
            </div>
            <div className='flex items-center gap-2'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size='sm'>
                    <Plus className='h-4 w-4 mr-2' />
                    New Table
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Table</DialogTitle>
                    <DialogDescription>
                      Create a new table in your database with custom schema.
                    </DialogDescription>
                  </DialogHeader>
                  <div className='space-y-4 py-4'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Table Name</label>
                      <Input placeholder='Enter table name' />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Schema</label>
                      <Input placeholder='public' />
                    </div>
                    <div className='flex justify-end gap-2'>
                      <Button variant='outline'>Cancel</Button>
                      <Button>Create Table</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant='outline' size='sm'>
                <Upload className='h-4 w-4 mr-2' />
                Import
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className='flex items-center gap-4 mb-6'>
            <div className='relative flex-1 max-w-sm'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search tables...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10'
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  Schema: {selectedSchema === 'all' ? 'All' : selectedSchema}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {schemas.map((schema) => (
                  <DropdownMenuItem
                    key={schema}
                    onClick={() => setSelectedSchema(schema)}
                  >
                    {schema === 'all' ? 'All Schemas' : schema}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tables List */}
          <div className='border rounded-lg'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Schema</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Rows</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className='w-[50px]'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTables.map((table) => {
                  const IconComponent = table.icon;
                  return (
                    <TableRow key={table.id}>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <IconComponent className='h-4 w-4 text-muted-foreground' />
                          <span className='font-medium'>{table.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant='outline'>{table.schema}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            table.type === 'table' ? 'default' : 'secondary'
                          }
                        >
                          {table.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{table.rows.toLocaleString()}</TableCell>
                      <TableCell>{table.size}</TableCell>
                      <TableCell>
                        <Badge
                          variant='outline'
                          className={getStatusColor(table.status)}
                        >
                          {table.status}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-muted-foreground'>
                        {table.lastModified}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='sm'>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem>
                              <Eye className='h-4 w-4 mr-2' />
                              View Data
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className='h-4 w-4 mr-2' />
                              Edit Schema
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className='h-4 w-4 mr-2' />
                              Export
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-red-600'>
                              <Trash2 className='h-4 w-4 mr-2' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
