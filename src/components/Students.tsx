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
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const mockStudents = [
  { id: 1, name: 'Emma Wilson', email: 'emma.w@school.edu', rollNo: 'STU001', class: 'Grade 10-A', department: 'Science', status: 'Active', phone: '+1-234-567-8901', dob: '2008-05-15', address: '123 Main St, City' },
  { id: 2, name: 'Michael Chen', email: 'michael.c@school.edu', rollNo: 'STU002', class: 'Grade 11-B', department: 'Commerce', status: 'Active', phone: '+1-234-567-8902', dob: '2007-08-22', address: '456 Oak Ave, City' },
  { id: 3, name: 'Sarah Johnson', email: 'sarah.j@school.edu', rollNo: 'STU003', class: 'Grade 12-A', department: 'Engineering', status: 'Active', phone: '+1-234-567-8903', dob: '2006-12-10', address: '789 Pine Rd, City' },
  { id: 4, name: 'James Brown', email: 'james.b@school.edu', rollNo: 'STU004', class: 'Grade 10-B', department: 'Arts', status: 'Active', phone: '+1-234-567-8904', dob: '2008-03-18', address: '321 Elm St, City' },
  { id: 5, name: 'Emily Davis', email: 'emily.d@school.edu', rollNo: 'STU005', class: 'Grade 11-A', department: 'Science', status: 'Inactive', phone: '+1-234-567-8905', dob: '2007-11-05', address: '654 Maple Dr, City' },
];

export function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof mockStudents[0] | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-1">Students</h1>
          <p className="text-slate-600">Manage student information and records</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="student@school.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNo">Roll Number</Label>
                <Input id="rollNo" placeholder="STU001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1-234-567-8900" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter full address" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by name, roll number or email..."
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
                <TableHead>Student</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-slate-900">{student.name}</div>
                        <div className="text-sm text-slate-600">{student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>
                    <Badge className="p-2" variant={student.status === 'Active' ? 'default' : 'secondary'}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(student)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Student Details</DialogTitle>
                          </DialogHeader>
                          {selectedStudent && (
                            <Tabs defaultValue="personal">
                              <TabsList>
                                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                <TabsTrigger value="academic">Academic</TabsTrigger>
                                <TabsTrigger value="financial">Financial</TabsTrigger>
                              </TabsList>
                              <TabsContent value="personal" className="space-y-4 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-slate-600">Full Name</p>
                                    <p className="text-slate-900">{selectedStudent.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-600">Email</p>
                                    <p className="text-slate-900">{selectedStudent.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-600">Roll Number</p>
                                    <p className="text-slate-900">{selectedStudent.rollNo}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-600">Phone</p>
                                    <p className="text-slate-900">{selectedStudent.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-600">Date of Birth</p>
                                    <p className="text-slate-900">{selectedStudent.dob}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-600">Status</p>
                                    <Badge variant={selectedStudent.status === 'Active' ? 'default' : 'secondary'}>
                                      {selectedStudent.status}
                                    </Badge>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-sm text-slate-600">Address</p>
                                    <p className="text-slate-900">{selectedStudent.address}</p>
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="academic" className="space-y-4 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-slate-600">Class</p>
                                    <p className="text-slate-900">{selectedStudent.class}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-600">Department</p>
                                    <p className="text-slate-900">{selectedStudent.department}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-600">GPA</p>
                                    <p className="text-slate-900">3.8</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-600">Attendance Rate</p>
                                    <p className="text-slate-900">94%</p>
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="financial" className="space-y-4 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-slate-600">Total Fees</p>
                                    <p className="text-slate-900">$10,000</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-600">Paid</p>
                                    <p className="text-slate-900">$7,500</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-600">Pending</p>
                                    <p className="text-slate-900">$2,500</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-600">Status</p>
                                    <Badge variant="default">Partially Paid</Badge>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-wine" />
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
