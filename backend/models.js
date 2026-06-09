const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true },
  phone: String,
  password: String
}, { timestamps: true });

const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  rollNo: String,
  dept: String,
  year: String,
  semester: Number,
  email: { type: String, lowercase: true },
  phone: String,
  attendance: { type: Number, default: 100 },
  password: String
}, { timestamps: true });

const facultySchema = new mongoose.Schema({
  id: String,
  name: String,
  dept: String,
  subject: String,
  email: { type: String, lowercase: true },
  phone: String,
  password: String
}, { timestamps: true });

const departmentSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  name: String
});

const courseSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  name: String,
  credits: Number,
  dept: String,
  prof: String
});

const noticeSchema = new mongoose.Schema({
  id: String,
  category: String,
  title: String,
  desc: String,
  date: String
}, { timestamps: true });

const applicationSchema = new mongoose.Schema({
  studentName: String,
  registerNumber: String,
  department: String,
  year: String,
  dob: String,
  gender: String,
  bloodGroup: String,
  nationality: String,
  applicationEmail: { type: String, lowercase: true },
  address: String,
  parentMobile: String,
  fatherName: String,
  fatherOccupation: String,
  fatherMobile: String,
  motherName: String,
  motherOccupation: String,
  motherMobile: String,
  guardianName: String,
  relationship: String,
  guardianMobile: String
}, { timestamps: true });

module.exports = {
  User: mongoose.model('User', userSchema),
  Student: mongoose.model('Student', studentSchema),
  Faculty: mongoose.model('Faculty', facultySchema),
  Department: mongoose.model('Department', departmentSchema),
  Course: mongoose.model('Course', courseSchema),
  Notice: mongoose.model('Notice', noticeSchema),
  Application: mongoose.model('Application', applicationSchema)
};
