import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Search, Plus, Mail, Phone } from 'lucide-react';

const mockTeachers = [
  { id: 1, name: 'Dr. Sarah Anderson', email: 'sarah.a@school.edu', phone: '+1-234-567-8901', department: 'Science', subject: 'Mathematics', experience: '12 years', status: 'Active', courses: 3 },
  { id: 2, name: 'Dr. Robert Smith', email: 'robert.s@school.edu', phone: '+1-234-567-8902', department: 'Science', subject: 'Physics', experience: '15 years', status: 'Active', courses: 2 },
  { id: 3, name: 'Prof. Emily Johnson', email: 'emily.j@school.edu', phone: '+1-234-567-8903', department: 'Arts', subject: 'History', experience: '10 years', status: 'Active', courses: 4 },
  { id: 4, name: 'Dr. Michael Chen', email: 'michael.c@school.edu', phone: '+1-234-567-8904', department: 'Commerce', subject: 'Economics', experience: '8 years', status: 'Active', courses: 3 },
  { id: 5, name: 'Prof. James Wilson', email: 'james.w@school.edu', phone: '+1-234-567-8905', department: 'Engineering', subject: 'Computer Science', experience: '14 years', status: 'Active', courses: 5 },
  { id: 6, name: 'Dr. Lisa Brown', email: 'lisa.b@school.edu', phone: '+1-234-567-8906', department: 'Arts', subject: 'English', experience: '9 years', status: 'On Leave', courses: 2 },
];

export function Teachers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredTeachers = mockTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-1">Teachers</h1>
          <p className="text-slate-600">Manage teaching staff and their assignments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="teacherName">Full Name</Label>
                <Input id="teacherName" placeholder="Dr. John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="teacher@school.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1-234-567-8900" />
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
                <Label htmlFor="subject">Primary Subject</Label>
                <Input id="subject" placeholder="Mathematics" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input id="experience" placeholder="10 years" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="qualification">Qualifications</Label>
                <Input id="qualification" placeholder="Ph.D. in Mathematics" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Teacher</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Total Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{mockTeachers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-600">
              {mockTeachers.filter(t => t.status === 'Active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-600">
              {mockTeachers.reduce((sum, t) => sum + t.courses, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Avg. Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">11.3 years</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by name, email or subject..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-slate-900">{teacher.name}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-xs text-slate-600">
                            <Mail className="h-3 w-3" />
                            {teacher.email}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-600">
                            <Phone className="h-3 w-3" />
                            {teacher.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{teacher.department}</Badge>
                  </TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.experience}</TableCell>
                  <TableCell>{teacher.courses} courses</TableCell>
                  <TableCell>
                    <Badge variant={teacher.status === 'Active' ? 'default' : 'secondary'}>
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="default" size="sm">Edit</Button>
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
