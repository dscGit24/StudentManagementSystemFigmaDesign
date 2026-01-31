import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Download, Upload } from 'lucide-react';
import { Progress } from './ui/progress';

const mockGrades = [
  { id: 1, rollNo: 'STU001', name: 'Emma Wilson', class: 'Grade 10-A', math: 92, science: 88, english: 95, history: 87, average: 90.5, grade: 'A+' },
  { id: 2, rollNo: 'STU002', name: 'Michael Chen', class: 'Grade 10-A', math: 85, science: 90, english: 82, history: 88, average: 86.3, grade: 'A' },
  { id: 3, rollNo: 'STU003', name: 'Sarah Johnson', class: 'Grade 10-A', math: 78, science: 82, english: 85, history: 80, average: 81.3, grade: 'B+' },
  { id: 4, rollNo: 'STU004', name: 'James Brown', class: 'Grade 10-A', math: 88, science: 85, english: 90, history: 92, average: 88.8, grade: 'A' },
  { id: 5, rollNo: 'STU005', name: 'Emily Davis', class: 'Grade 10-A', math: 95, science: 92, english: 88, history: 90, average: 91.3, grade: 'A+' },
];

export function Grades() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('10a');
  const [selectedSemester, setSelectedSemester] = useState('sem1');

  const filteredGrades = mockGrades.filter(grade =>
    grade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grade.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'default';
    if (grade === 'B+' || grade === 'B') return 'secondary';
    return 'destructive';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-1">Grades & Examinations</h1>
          <p className="text-slate-600">Manage student grades and examination results</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import Grades
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">87.6%</div>
            <Progress value={87.6} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">A+ Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-600">2 Students</div>
            <p className="text-xs text-slate-600 mt-1">40% of class</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Highest Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-600">95%</div>
            <p className="text-xs text-slate-600 mt-1">Emily Davis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-600">100%</div>
            <p className="text-xs text-slate-600 mt-1">All students passing</p>
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
              <span className="text-sm text-slate-600">Semester:</span>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sem1">Semester 1</SelectItem>
                  <SelectItem value="sem2">Semester 2</SelectItem>
                  <SelectItem value="final">Final Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by name or roll number..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Mathematics</TableHead>
                <TableHead>Science</TableHead>
                <TableHead>English</TableHead>
                <TableHead>History</TableHead>
                <TableHead>Average</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell className="text-slate-900">{student.name}</TableCell>
                  <TableCell>
                    <span className={student.math >= 90 ? 'text-green-600' : student.math >= 80 ? 'text-blue-600' : 'text-slate-900'}>
                      {student.math}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={student.science >= 90 ? 'text-green-600' : student.science >= 80 ? 'text-blue-600' : 'text-slate-900'}>
                      {student.science}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={student.english >= 90 ? 'text-green-600' : student.english >= 80 ? 'text-blue-600' : 'text-slate-900'}>
                      {student.english}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={student.history >= 90 ? 'text-green-600' : student.history >= 80 ? 'text-blue-600' : 'text-slate-900'}>
                      {student.history}%
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-900">
                    {student.average}%
                  </TableCell>
                  <TableCell>
                    <Badge variant={getGradeColor(student.grade)}>
                      {student.grade}
                    </Badge>
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
