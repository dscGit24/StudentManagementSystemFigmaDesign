import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, BookOpen, DollarSign, UserCheck } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const attendanceData = [
  { name: 'Mon', present: 245, absent: 15 },
  { name: 'Tue', present: 250, absent: 10 },
  { name: 'Wed', present: 238, absent: 22 },
  { name: 'Thu', present: 255, absent: 5 },
  { name: 'Fri', present: 248, absent: 12 },
];

const enrollmentData = [
  { month: 'Jan', students: 220 },
  { month: 'Feb', students: 235 },
  { month: 'Mar', students: 242 },
  { month: 'Apr', students: 250 },
  { month: 'May', students: 260 },
];

const departmentData = [
  { name: 'Science', value: 85 },
  { name: 'Arts', value: 75 },
  { name: 'Commerce', value: 60 },
  { name: 'Engineering', value: 40 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900 mb-1">Dashboard</h1>
        <p className="text-slate-600">Welcome to your student management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-600">Total Students</CardTitle>
            <Users className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">260</div>
            <p className="text-xs text-slate-600 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-600">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">45</div>
            <p className="text-xs text-slate-600 mt-1">8 new this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-600">Attendance Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">95.4%</div>
            <p className="text-xs text-slate-600 mt-1">+2.3% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-600">Revenue (Monthly)</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">$125,400</div>
            <p className="text-xs text-slate-600 mt-1">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#10b981" name="Present" />
                <Bar dataKey="absent" fill="#ef4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Students by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                <div className="flex-1">
                  <p className="text-sm text-slate-900">New student enrolled</p>
                  <p className="text-xs text-slate-600">Sarah Johnson - Computer Science</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-green-600 mt-2" />
                <div className="flex-1">
                  <p className="text-sm text-slate-900">Course completed</p>
                  <p className="text-xs text-slate-600">Advanced Mathematics - Grade 12</p>
                  <p className="text-xs text-slate-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-yellow-600 mt-2" />
                <div className="flex-1">
                  <p className="text-sm text-slate-900">Fee payment received</p>
                  <p className="text-xs text-slate-600">Michael Chen - $2,500</p>
                  <p className="text-xs text-slate-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-purple-600 mt-2" />
                <div className="flex-1">
                  <p className="text-sm text-slate-900">New teacher added</p>
                  <p className="text-xs text-slate-600">Dr. Robert Smith - Physics</p>
                  <p className="text-xs text-slate-500">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
