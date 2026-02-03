import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Check, X } from 'lucide-react';
import { format } from 'date-fns';

const mockAttendance = [
  { id: 1, rollNo: 'STU001', name: 'Emma Wilson', class: 'Grade 10-A', status: 'present', time: '09:15 AM' },
  { id: 2, rollNo: 'STU002', name: 'Michael Chen', class: 'Grade 10-A', status: 'present', time: '09:10 AM' },
  { id: 3, rollNo: 'STU003', name: 'Sarah Johnson', class: 'Grade 10-A', status: 'absent', time: '-' },
  { id: 4, rollNo: 'STU004', name: 'James Brown', class: 'Grade 10-A', status: 'present', time: '09:20 AM' },
  { id: 5, rollNo: 'STU005', name: 'Emily Davis', class: 'Grade 10-A', status: 'late', time: '09:45 AM' },
  { id: 6, rollNo: 'STU006', name: 'David Martinez', class: 'Grade 10-A', status: 'present', time: '09:12 AM' },
  { id: 7, rollNo: 'STU007', name: 'Sophia Lee', class: 'Grade 10-A', status: 'present', time: '09:08 AM' },
  { id: 8, rollNo: 'STU008', name: 'Daniel Garcia', class: 'Grade 10-A', status: 'absent', time: '-' },
];

export function Attendance() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState('10a');
  const [attendanceData, setAttendanceData] = useState(mockAttendance);

  const toggleAttendance = (id: number, status: 'present' | 'absent' | 'late') => {
    setAttendanceData(attendanceData.map(record =>
      record.id === id ? { ...record, status } : record
    ));
  };

  const presentCount = attendanceData.filter(r => r.status === 'present').length;
  const absentCount = attendanceData.filter(r => r.status === 'absent').length;
  const lateCount = attendanceData.filter(r => r.status === 'late').length;
  const attendanceRate = ((presentCount + lateCount) / attendanceData.length * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900 mb-1">Attendance</h1>
        <p className="text-slate-600">Track and manage student attendance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-800">{attendanceData.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-400">{presentCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-red-400">{absentCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-400">{attendanceRate}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Class:</span>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10a">Grade 10-A</SelectItem>
                  <SelectItem value="10b">Grade 10-B</SelectItem>
                  <SelectItem value="11a">Grade 11-A</SelectItem>
                  <SelectItem value="11b">Grade 11-B</SelectItem>
                  <SelectItem value="12a">Grade 12-A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Date:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-60 justify-start gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {format(date, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="ml-auto">
              <Button>Save Attendance</Button>
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
                <TableHead>Check-in Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.rollNo}</TableCell>
                  <TableCell className="text-slate-900">{record.name}</TableCell>
                  <TableCell>{record.class}</TableCell>
                  <TableCell>{record.time}</TableCell>
                  <TableCell>
                    <Badge className="p-2"
                      variant={
                        record.status === 'present'
                          ? 'default'
                          : record.status === 'absent'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={record.status === 'present' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleAttendance(record.id, 'present')}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={record.status === 'absent' ? 'destructive' : 'outline'}
                        size="sm"
                        onClick={() => toggleAttendance(record.id, 'absent')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={record.status === 'late' ? 'secondary' : 'outline'}
                        size="sm"
                        onClick={() => toggleAttendance(record.id, 'late')}
                      >
                        Late
                      </Button>
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
