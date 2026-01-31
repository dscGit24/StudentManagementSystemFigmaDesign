import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, DollarSign, TrendingUp, TrendingDown, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockPayments = [
  { id: 1, rollNo: 'STU001', name: 'Emma Wilson', class: 'Grade 10-A', totalFee: 10000, paid: 10000, pending: 0, status: 'Paid', lastPayment: '2024-11-01' },
  { id: 2, rollNo: 'STU002', name: 'Michael Chen', class: 'Grade 11-B', totalFee: 12000, paid: 9000, pending: 3000, status: 'Partial', lastPayment: '2024-10-15' },
  { id: 3, rollNo: 'STU003', name: 'Sarah Johnson', class: 'Grade 12-A', totalFee: 15000, paid: 15000, pending: 0, status: 'Paid', lastPayment: '2024-10-28' },
  { id: 4, rollNo: 'STU004', name: 'James Brown', class: 'Grade 10-B', totalFee: 10000, paid: 5000, pending: 5000, status: 'Partial', lastPayment: '2024-09-20' },
  { id: 5, rollNo: 'STU005', name: 'Emily Davis', class: 'Grade 11-A', totalFee: 12000, paid: 0, pending: 12000, status: 'Pending', lastPayment: '-' },
];

const revenueData = [
  { month: 'Jan', revenue: 125000, expenses: 85000 },
  { month: 'Feb', revenue: 132000, expenses: 88000 },
  { month: 'Mar', revenue: 128000, expenses: 86000 },
  { month: 'Apr', revenue: 145000, expenses: 92000 },
  { month: 'May', revenue: 138000, expenses: 89000 },
  { month: 'Jun', revenue: 152000, expenses: 95000 },
];

export function Finance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || payment.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.paid, 0);
  const totalPending = mockPayments.reduce((sum, p) => sum + p.pending, 0);
  const totalExpected = mockPayments.reduce((sum, p) => sum + p.totalFee, 0);
  const collectionRate = ((totalRevenue / totalExpected) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-1">Finance & Fees</h1>
          <p className="text-slate-600">Manage student fees and financial records</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Financial Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">${totalRevenue.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-600">Pending Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-orange-600">${totalPending.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
              <TrendingDown className="h-3 w-3" />
              3 students overdue
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-600">Collection Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-green-600">{collectionRate}%</div>
            <p className="text-xs text-slate-600 mt-1">Above target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-600">Expected Total</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">${totalExpected.toLocaleString()}</div>
            <p className="text-xs text-slate-600 mt-1">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment Records */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by name or roll number..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Status:</span>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Total Fee</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.rollNo}</TableCell>
                  <TableCell className="text-slate-900">{payment.name}</TableCell>
                  <TableCell>{payment.class}</TableCell>
                  <TableCell>${payment.totalFee.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600">${payment.paid.toLocaleString()}</TableCell>
                  <TableCell className={payment.pending > 0 ? 'text-orange-600' : 'text-slate-900'}>
                    ${payment.pending.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === 'Paid'
                          ? 'default'
                          : payment.status === 'Partial'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.lastPayment}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      {payment.pending > 0 && (
                        <Button variant="default" size="sm">Collect</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
