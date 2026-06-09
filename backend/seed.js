const mongoose = require('mongoose');
require('dotenv').config();
const { Student, Faculty, Department, Course, Notice } = require('./models');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing
  await Promise.all([
    Student.deleteMany({}),
    Faculty.deleteMany({}),
    Department.deleteMany({}),
    Course.deleteMany({}),
    Notice.deleteMany({})
  ]);

  await Department.insertMany([
    { code: 'CSE', name: 'Computer Science & Engineering' },
    { code: 'ECE', name: 'Electronics & Communication Eng.' },
    { code: 'ME', name: 'Mechanical Engineering' },
    { code: 'CE', name: 'Civil Engineering' }
  ]);

  await Faculty.insertMany([
    { id: 'FAC-101', name: 'Dr. Suresh Kumar', dept: 'CSE', subject: 'Database Management Systems', email: 'suresh@edumanage.com', phone: '+91 98765 11111', password: 'faculty123' },
    { id: 'FAC-102', name: 'Dr. Priya Nair', dept: 'CSE', subject: 'Web Technologies', email: 'priya@edumanage.com', phone: '+91 98765 22222', password: 'priya123' },
    { id: 'FAC-103', name: 'Prof. Radhika Sen', dept: 'CSE', subject: 'Operating Systems', email: 'radhika@edumanage.com', phone: '+91 98765 33333', password: 'radhika123' },
    { id: 'FAC-104', name: 'Dr. Amit Patel', dept: 'CSE', subject: 'Design & Analysis of Algorithms', email: 'amit@edumanage.com', phone: '+91 98765 44444', password: 'amit123' },
    { id: 'FAC-105', name: 'Prof. Kavitha Devi', dept: 'CSE', subject: 'Engineering Mathematics IV', email: 'kavitha@edumanage.com', phone: '+91 98765 55555', password: 'kavitha123' }
  ]);

  await Student.insertMany([
    { id: 'STD-1001', name: 'Danushkumar', rollNo: '2024CSE1042', dept: 'CSE', year: '2', semester: 4, email: 'danushkumar@edumanage.com', phone: '+91 98765 43210', attendance: 86, password: 'danu123' },
    { id: 'STD-1002', name: 'Akash', rollNo: '2024CSE1055', dept: 'CSE', year: '2', semester: 4, email: 'akash@edumanage.com', phone: '+91 98765 55551', attendance: 76, password: 'akash123' },
    { id: 'STD-1003', name: 'Dhushyanthan', rollNo: '2024CSE1089', dept: 'CSE', year: '2', semester: 4, email: 'dhushyanthan@edumanage.com', phone: '+91 98765 66662', attendance: 67, password: 'dhushy123' },
    { id: 'STD-1004', name: 'Nithish', rollNo: '2024CSE1102', dept: 'CSE', year: '2', semester: 4, email: 'nithish@edumanage.com', phone: '+91 98765 77773', attendance: 95, password: 'nithish123' },
    { id: 'STD-1005', name: 'Harini', rollNo: '2024CSE1115', dept: 'ECE', year: '2', semester: 4, email: 'harini@edumanage.com', phone: '+91 98765 88884', attendance: 82, password: 'harini123' },
    { id: 'STD-1006', name: 'Ganesh', rollNo: '2024CSE1128', dept: 'ME', year: '2', semester: 4, email: 'ganesh@edumanage.com', phone: '+91 98765 99995', attendance: 88, password: 'ganesh123' }
  ]);

  await Course.insertMany([
    { code: 'CS201', name: 'Database Management Systems', credits: 4, dept: 'CSE', prof: 'Dr. Suresh Kumar' },
    { code: 'CS202', name: 'Operating Systems', credits: 4, dept: 'CSE', prof: 'Prof. Radhika Sen' },
    { code: 'CS203', name: 'Design & Analysis of Algorithms', credits: 4, dept: 'CSE', prof: 'Dr. Amit Patel' },
    { code: 'MA204', name: 'Engineering Mathematics IV', credits: 3, dept: 'CSE', prof: 'Prof. Kavitha Devi' },
    { code: 'CS205', name: 'Web Technologies', credits: 3, dept: 'CSE', prof: 'Dr. Priya Nair' }
  ]);

  await Notice.insertMany([
    { id: 'not-1', category: 'urgent', date: 'May 26, 2026', title: 'End Semester Examination Schedule', desc: 'The End Semester Examinations for B.Tech Semester 4 will commence from June 15, 2026.' },
    { id: 'not-2', category: 'academic', date: 'May 24, 2026', title: 'Pre-Registration for Semester 5 Electives', desc: 'Pre-registration portals for Sem 5 department electives will open on June 1.' },
    { id: 'not-3', category: 'event', date: 'May 22, 2026', title: 'Annual Technical Fest - TechStorm 2026', desc: 'Registrations are officially open for TechStorm 2026, scheduled from June 10-12.' }
  ]);

  console.log('Database seeded successfully!');
  await mongoose.disconnect();
};

seed().catch(console.error);
