import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Search, Plus, BookOpen, Users, Clock } from 'lucide-react';

const mockCourses = [
  { id: 1, name: 'Advanced Mathematics', code: 'MATH301', department: 'Science', teacher: 'Dr. Sarah Anderson', students: 32, duration: '12 weeks', status: 'Active', description: 'Advanced calculus and algebra' },
  { id: 2, name: 'Physics Lab', code: 'PHY201', department: 'Science', teacher: 'Dr. Robert Smith', students: 28, duration: '10 weeks', status: 'Active', description: 'Practical physics experiments' },
  { id: 3, name: 'World History', code: 'HIST101', department: 'Arts', teacher: 'Prof. Emily Johnson', students: 45, duration: '14 weeks', status: 'Active', description: 'Comprehensive world history' },
  { id: 4, name: 'Business Economics', code: 'ECON202', department: 'Commerce', teacher: 'Dr. Michael Chen', students: 38, duration: '12 weeks', status: 'Active', description: 'Economic principles and applications' },
  { id: 5, name: 'Computer Programming', code: 'CS101', department: 'Engineering', teacher: 'Prof. James Wilson', students: 42, duration: '16 weeks', status: 'Active', description: 'Introduction to programming' },
  { id: 6, name: 'English Literature', code: 'ENG301', department: 'Arts', teacher: 'Dr. Lisa Brown', students: 35, duration: '12 weeks', status: 'Completed', description: 'Classic and modern literature' },
];

export function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredCourses = mockCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-1">Courses</h1>
          <p className="text-slate-600">Manage courses and curriculum</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name</Label>
                <Input id="courseName" placeholder="Enter course name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseCode">Course Code</Label>
                <Input id="courseCode" placeholder="MATH301" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher">Assign Teacher</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher1">Dr. Sarah Anderson</SelectItem>
                    <SelectItem value="teacher2">Dr. Robert Smith</SelectItem>
                    <SelectItem value="teacher3">Prof. Emily Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="12 weeks" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStudents">Max Students</Label>
                <Input id="maxStudents" type="number" placeholder="40" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter course description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search courses by name, code or teacher..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900">{course.name}</CardTitle>
                    <p className="text-sm text-slate-600">{course.code}</p>
                  </div>
                </div>
                <Badge variant={course.status === 'Active' ? 'default' : 'secondary'}>
                  {course.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">{course.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{course.students} students enrolled</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{course.duration}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm text-slate-600">Teacher</p>
                <p className="text-slate-900">{course.teacher}</p>
              </div>

              <div className="pt-2">
                <p className="text-sm text-slate-600">Department</p>
                <Badge variant="outline">{course.department}</Badge>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                <Button variant="default" size="sm" className="flex-1">Manage</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
