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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { PageHeader } from '@/components/page-header';
import {
  Plus,
  Search,
  Mail,
  Trash2,
  UserPlus,
  Users,
  MoreHorizontal,
  Filter,
  Star,
  Building2,
  Phone,
  MapPin,
} from 'lucide-react';

const mockContacts = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    company: 'TechCorp Inc.',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    avatar: '/avatars/user-01.png',
    isHighValue: true,
    status: 'Active',
    lastContact: '2 days ago',
    dealValue: '$45,000',
    tags: ['Enterprise', 'Decision Maker'],
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'm.chen@innovate.io',
    company: 'Innovate Solutions',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    avatar: '/avatars/user-01.png',
    isHighValue: false,
    status: 'Prospect',
    lastContact: '1 week ago',
    dealValue: '$12,000',
    tags: ['Startup', 'Technical'],
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.r@globalfinance.com',
    company: 'Global Finance Ltd.',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, IL',
    avatar: '/avatars/user-01.png',
    isHighValue: true,
    status: 'Customer',
    lastContact: 'Yesterday',
    dealValue: '$78,000',
    tags: ['Finance', 'Long-term'],
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david@startupventure.com',
    company: 'Startup Venture',
    phone: '+1 (555) 321-0987',
    location: 'Austin, TX',
    avatar: '/avatars/user-01.png',
    isHighValue: false,
    status: 'Lead',
    lastContact: '3 days ago',
    dealValue: '$8,500',
    tags: ['Startup', 'Growth'],
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    email: 'lisa.thompson@enterprise.org',
    company: 'Enterprise Solutions',
    phone: '+1 (555) 654-3210',
    location: 'Boston, MA',
    avatar: '/avatars/user-01.png',
    isHighValue: true,
    status: 'Active',
    lastContact: 'Today',
    dealValue: '$125,000',
    tags: ['Enterprise', 'Strategic'],
  },
];

export function CrmContacts() {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredContacts = mockContacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'All' || contact.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectContact = (contactId: number) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    setSelectedContacts(
      selectedContacts.length === filteredContacts.length
        ? []
        : filteredContacts.map((contact) => contact.id)
    );
  };

  return (
    <div className='space-y-6'>
      <PageHeader
        title='CRM Contacts'
        description='Manage your customer relationships and contacts'
      >
        <Button>
          <Plus className='h-4 w-4 mr-2' />
          Add Contact
        </Button>
      </PageHeader>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='text-sm font-medium'>
              Total Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2,847</div>
            <p className='text-xs text-muted-foreground'>+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-sm font-medium'>
              Active Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,234</div>
            <p className='text-xs text-muted-foreground'>+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-sm font-medium'>
              New This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>156</div>
            <p className='text-xs text-muted-foreground'>
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <CardTitle>Contact Directory</CardTitle>
              <CardDescription>
                {selectedContacts.length > 0
                  ? `${selectedContacts.length} contact${
                      selectedContacts.length > 1 ? 's' : ''
                    } selected`
                  : `${filteredContacts.length} contacts`}
              </CardDescription>
            </div>

            {/* Bulk actions */}
            {selectedContacts.length > 0 && (
              <div className='flex gap-2'>
                <Button variant='outline' size='sm'>
                  <Mail className='h-4 w-4 mr-2' />
                  Send Email
                </Button>
                <Button variant='outline' size='sm'>
                  <UserPlus className='h-4 w-4 mr-2' />
                  Add to Group
                </Button>
                <Button variant='outline' size='sm'>
                  <Trash2 className='h-4 w-4 mr-2' />
                  Remove
                </Button>
              </div>
            )}
          </div>

          {/* Search and filter bar */}
          <div className='flex flex-col sm:flex-row gap-4 mt-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search contacts by name, email, or company...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10'
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                  <Filter className='h-4 w-4 mr-2' />
                  {filterStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus('All')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('Active')}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('Customer')}>
                  Customer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('Prospect')}>
                  Prospect
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('Lead')}>
                  Lead
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-12'>
                    <Checkbox
                      checked={
                        selectedContacts.length === filteredContacts.length &&
                        filteredContacts.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deal Value</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead className='w-12'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow
                    key={contact.id}
                    className={
                      selectedContacts.includes(contact.id) ? 'bg-muted' : ''
                    }
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={() => handleSelectContact(contact.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage
                            src={contact.avatar || '/placeholder.svg'}
                            alt={contact.name}
                          />
                          <AvatarFallback>
                            {contact.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='flex items-center gap-2'>
                            <div className='font-medium'>{contact.name}</div>
                            {contact.isHighValue && (
                              <Badge
                                variant='secondary'
                                className='bg-yellow-100 text-yellow-800'
                              >
                                <Star className='h-3 w-3 mr-1' />
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1'>
                        <Building2 className='h-3 w-3 text-muted-foreground' />
                        {contact.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1'>
                        <Mail className='h-3 w-3 text-muted-foreground' />
                        {contact.company}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1'>
                        <Phone className='h-3 w-3 text-muted-foreground' />
                        {contact.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-3 w-3 text-muted-foreground' />
                        {contact.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1'>
                        {contact.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant='outline'
                            className='text-xs'
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          contact.status === 'Customer' ? 'default' : 'outline'
                        }
                        className={
                          contact.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : contact.status === 'Customer'
                            ? 'bg-blue-100 text-blue-800'
                            : contact.status === 'Prospect'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className='font-medium text-green-600'>
                        {contact.dealValue}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='text-sm text-muted-foreground'>
                        {contact.lastContact}
                      </div>
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
                            <Mail className='h-4 w-4 mr-2' />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className='h-4 w-4 mr-2' />
                            Call Contact
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <UserPlus className='h-4 w-4 mr-2' />
                            Add to Group
                          </DropdownMenuItem>
                          <DropdownMenuItem className='text-red-600'>
                            <Trash2 className='h-4 w-4 mr-2' />
                            Delete Contact
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredContacts.length === 0 && (
            <div className='text-center py-8 text-muted-foreground'>
              <Users className='h-12 w-12 mx-auto mb-4 opacity-50' />
              <p>No contacts found matching your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
