import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AnalyticsDashboard() {
  return (
    <div className='p-6 grid gap-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Analytics</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>12,403</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>$72,150</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>98,761</p>
          </CardContent>
        </Card>
      </div>

      <div className='flex gap-3'>
        <Button>Download CSV</Button>
        <Button variant='secondary'>Share</Button>
      </div>
    </div>
  );
}
