const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { User, Student, Faculty, Department, Course, Notice, Application } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// ─── AUTH ────────────────────────────────────────────────────────────────────

// Signup
app.post('/api/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ message: 'Email already registered.' });
    const user = await User.create({ name, email, phone, password });
    res.json({ success: true, user: { name: user.name, email: user.email, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { role, email, password } = req.body;
  const cleanEmail = email.trim().toLowerCase();
  const cleanPwd = password.trim();

  try {
    if (role === 'admin') {
      const admins = [
        { email: 'admin@edumanage.com', passwords: ['admin@1', 'admin123'], name: 'Danushkumar' },
        { email: 'admin@edumanage', passwords: ['admin@1', 'admin123'], name: 'Danushkumar' },
        { email: 'suryasekar626@edumanage.com', passwords: ['surya@123'], name: 'Suryasekar' }
      ];
      const admin = admins.find(a => a.email === cleanEmail && a.passwords.includes(cleanPwd));
      if (admin) {
        return res.json({ success: true, user: { role: 'admin', email: admin.email, name: admin.name } });
      }
      return res.status(401).json({ message: 'Invalid Admin credentials!' });
    }

    if (role === 'faculty') {
      const fac = await Faculty.findOne({ email: cleanEmail });
      if (fac && cleanPwd === fac.password) {
        return res.json({ success: true, user: { role: 'faculty', email: fac.email, name: fac.name } });
      }
      return res.status(401).json({ message: 'Invalid Faculty credentials!' });
    }

    // student
    const std = await Student.findOne({ email: cleanEmail });
    if (std && cleanPwd === std.password) {
      return res.json({ success: true, user: { role: 'student', email: std.email, name: std.name } });
    }
    return res.status(401).json({ message: 'Invalid Student credentials!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── APPLICATION ─────────────────────────────────────────────────────────────

app.post('/api/application', async (req, res) => {
  const appData = req.body;
  try {
    // Save application record
    await Application.findOneAndUpdate(
      { applicationEmail: appData.applicationEmail.toLowerCase() },
      appData,
      { upsert: true, new: true }
    );

    // Get password from signup data (sent along)
    const password = appData.signupPassword || 'student123';
    const phone = appData.signupPhone || appData.parentMobile;

    // Determine year/semester from year string
    const yearStr = appData.year || '';
    const yearNum = yearStr.includes('1') ? '1' : yearStr.includes('2') ? '2' : yearStr.includes('3') ? '3' : '4';
    const semNum = yearStr.includes('1') ? 1 : yearStr.includes('2') ? 3 : yearStr.includes('3') ? 5 : 7;

    const newStudent = {
      id: `STD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: appData.studentName,
      rollNo: appData.registerNumber,
      dept: appData.department,
      year: yearNum,
      semester: semNum,
      email: appData.applicationEmail.toLowerCase(),
      phone,
      attendance: 100,
      password
    };

    await Student.findOneAndUpdate(
      { email: newStudent.email },
      newStudent,
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      notification: `New student "${appData.studentName}" submitted their Admission Application (Dept: ${appData.department}, Year: ${appData.year}).`,
      application: appData
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get latest application (for admin notification)
app.get('/api/application/latest', async (req, res) => {
  try {
    const latest = await Application.findOne().sort({ createdAt: -1 });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── ADMIN - STUDENTS ────────────────────────────────────────────────────────

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find({}, '-__v');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/students', async (req, res) => {
  const data = req.body;
  try {
    if (data.id) {
      // Update existing
      const updated = await Student.findOneAndUpdate({ id: data.id }, data, { new: true });
      return res.json(updated);
    }
    // Create new
    const newId = `STD-${Math.floor(1000 + Math.random() * 9000)}`;
    const student = await Student.create({
      id: newId,
      password: `${data.name.toLowerCase().split(' ')[0]}123`,
      ...data
    });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── ADMIN - FACULTY ─────────────────────────────────────────────────────────

app.get('/api/faculty', async (req, res) => {
  try {
    const faculties = await Faculty.find({}, '-__v');
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/faculty', async (req, res) => {
  const data = req.body;
  try {
    if (data.id) {
      const updated = await Faculty.findOneAndUpdate({ id: data.id }, data, { new: true });
      return res.json(updated);
    }
    const newId = `FAC-${Math.floor(100 + Math.random() * 900)}`;
    const fac = await Faculty.create({ id: newId, password: 'faculty123', ...data });
    res.json(fac);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/faculty/:id', async (req, res) => {
  try {
    await Faculty.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── ADMIN - DEPARTMENTS ─────────────────────────────────────────────────────

app.get('/api/departments', async (req, res) => {
  try {
    const depts = await Department.find({}, '-__v');
    res.json(depts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/departments', async (req, res) => {
  const { code, name } = req.body;
  try {
    const exists = await Department.findOne({ code: code.toUpperCase() });
    if (exists) return res.status(400).json({ message: 'Department code already exists!' });
    const dept = await Department.create({ code: code.toUpperCase(), name });
    res.json(dept);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/departments/:code', async (req, res) => {
  try {
    await Department.findOneAndDelete({ code: req.params.code });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── ADMIN - COURSES ─────────────────────────────────────────────────────────

app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find({}, '-__v');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/courses', async (req, res) => {
  const data = req.body;
  try {
    const exists = await Course.findOne({ code: data.code.toUpperCase() });
    if (exists) return res.status(400).json({ message: 'Course code already exists!' });
    const course = await Course.create({ ...data, code: data.code.toUpperCase(), credits: parseInt(data.credits, 10) });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/courses/:code', async (req, res) => {
  try {
    await Course.findOneAndDelete({ code: req.params.code });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── ADMIN - NOTICES ─────────────────────────────────────────────────────────

app.get('/api/notices', async (req, res) => {
  try {
    const notices = await Notice.find({}, '-__v').sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/notices', async (req, res) => {
  const { title, category, desc } = req.body;
  try {
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const notice = await Notice.create({
      id: `not-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      title,
      desc,
      date: todayStr
    });
    res.json(notice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/notices/:id', async (req, res) => {
  try {
    await Notice.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── START ───────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
