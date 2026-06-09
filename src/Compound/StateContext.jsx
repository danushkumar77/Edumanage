import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();
export const useAppState = () => useContext(StateContext);

const API = 'https://edumanage-backend-5y5v.onrender.com/api';

export const StateProvider = ({ children }) => {
  const defaultState = {
    profile: {
      name: "Danushkumar", rollNo: "2024CSE1042", semester: "4",
      program: "B.Tech Computer Science & Eng.", section: "A",
      phone: "+91 98765 43210", email: "danushkumar@edumanage.com",
      dob: "2004-08-12", address: "123, Dynamic Heights, Tech City, Bangalore, 560001",
      emergencyContact: "+91 98765 43219 (Mother)"
    },
    courses: [
      { code: "CS201", title: "Database Management Systems", prof: "Dr. Suresh Kumar", credits: 4, conducted: 42, attended: 36, progress: 75 },
      { code: "CS202", title: "Operating Systems", prof: "Prof. Radhika Sen", credits: 4, conducted: 40, attended: 29, progress: 68 },
      { code: "CS203", title: "Design & Analysis of Algorithms", prof: "Dr. Amit Patel", credits: 4, conducted: 44, attended: 40, progress: 85 },
      { code: "MA204", title: "Engineering Mathematics IV", prof: "Prof. Kavitha Devi", credits: 3, conducted: 35, attended: 28, progress: 60 },
      { code: "CS205", title: "Web Technologies", prof: "Dr. Priya Nair", credits: 3, conducted: 38, attended: 36, progress: 90 }
    ],
    assignments: [
      { id: "assign-1", code: "CS203", title: "Dynamic Programming Assignment", deadline: "2026-06-03", points: 100, status: "Pending" },
      { id: "assign-2", code: "CS205", title: "CSS Layouts and Responsive Flexbox", deadline: "2026-06-08", points: 50, status: "Pending" },
      { id: "assign-3", code: "CS201", title: "SQL Queries & Relational Algebra Lab", deadline: "2026-05-24", points: 100, status: "Submitted", submissionDate: "2026-05-23", submittedFileName: "lab3_rel_alg.pdf" }
    ],
    grades: {
      semesterGpas: [8.4, 8.7, 8.9, 9.1],
      classAverage: 7.8,
      details: [
        { code: "CS201", title: "Database Management Systems", midTerm: "A", endTerm: "A+", gp: 9 },
        { code: "CS202", title: "Operating Systems", midTerm: "B", endTerm: "A", gp: 8 },
        { code: "CS203", title: "Design & Analysis of Algorithms", midTerm: "A+", endTerm: "A+", gp: 10 },
        { code: "MA204", title: "Engineering Mathematics IV", midTerm: "B+", endTerm: "B", gp: 7 },
        { code: "CS205", title: "Web Technologies", midTerm: "A+", endTerm: "O", gp: 10 }
      ]
    },
    fees: {
      ledgers: [
        { id: "fee-1", title: "Tuition Fees (Sem 4)", amount: 75000, status: "Paid" },
        { id: "fee-2", title: "Lab & Consumables Fees (Sem 4)", amount: 15000, status: "Paid" },
        { id: "fee-3", title: "Hostel & Mess Charges", amount: 45000, status: "Pending" },
        { id: "fee-4", title: "Central Library Access Fee", amount: 5000, status: "Pending" },
        { id: "fee-5", title: "Exam Fees (Sem 4)", amount: 3000, status: "Paid" }
      ],
      transactions: [
        { id: "TXN-9021", title: "Tuition Fees (Sem 4)", amount: 75000, date: "2026-02-10", method: "UPI / Net Banking" },
        { id: "TXN-9045", title: "Lab & Consumables Fees (Sem 4)", amount: 15000, date: "2026-02-12", method: "Debit Card" },
        { id: "TXN-9118", title: "Exam Fees (Sem 4)", amount: 3000, date: "2026-04-18", method: "Credit Card" }
      ]
    },
    notices: [],
    departments: [],
    allCourses: [],
    faculties: [],
    allStudents: [],
    activityLogs: [
      { id: "act-1", task: "ERP Console Setup Executed", user: "Admin AD-901", date: "May 30, 2026", type: "success" },
      { id: "act-2", task: "Loaded Central Registry Databases", user: "Admin AD-901", date: "May 30, 2026", type: "info" }
    ],
    attendanceDb: {
      "CS201": [
        { rollNo: "2024CSE1042", name: "Danushkumar", dept: "CSE", attended: 36, conducted: 42 },
        { rollNo: "2024CSE1055", name: "Akash", dept: "CSE", attended: 32, conducted: 42 },
        { rollNo: "2024CSE1089", name: "Dhushyanthan", dept: "CSE", attended: 26, conducted: 42 },
        { rollNo: "2024CSE1102", name: "Nithish", dept: "CSE", attended: 40, conducted: 42 }
      ],
      "CS202": [
        { rollNo: "2024CSE1042", name: "Danushkumar", dept: "CSE", attended: 29, conducted: 40 },
        { rollNo: "2024CSE1055", name: "Akash", dept: "CSE", attended: 30, conducted: 40 },
        { rollNo: "2024CSE1089", name: "Dhushyanthan", dept: "CSE", attended: 28, conducted: 40 },
        { rollNo: "2024CSE1102", name: "Nithish", dept: "CSE", attended: 38, conducted: 40 }
      ],
      "CS203": [
        { rollNo: "2024CSE1042", name: "Danushkumar", dept: "CSE", attended: 40, conducted: 44 },
        { rollNo: "2024CSE1055", name: "Akash", dept: "CSE", attended: 30, conducted: 44 },
        { rollNo: "2024CSE1089", name: "Dhushyanthan", dept: "CSE", attended: 25, conducted: 44 },
        { rollNo: "2024CSE1102", name: "Nithish", dept: "CSE", attended: 42, conducted: 44 }
      ],
      "MA204": [
        { rollNo: "2024CSE1042", name: "Danushkumar", dept: "CSE", attended: 28, conducted: 35 },
        { rollNo: "2024CSE1055", name: "Akash", dept: "CSE", attended: 26, conducted: 35 },
        { rollNo: "2024CSE1089", name: "Dhushyanthan", dept: "CSE", attended: 24, conducted: 35 },
        { rollNo: "2024CSE1102", name: "Nithish", dept: "CSE", attended: 33, conducted: 35 }
      ],
      "CS205": [
        { rollNo: "2024CSE1042", name: "Danushkumar", dept: "CSE", attended: 36, conducted: 38 },
        { rollNo: "2024CSE1055", name: "Akash", dept: "CSE", attended: 32, conducted: 38 },
        { rollNo: "2024CSE1089", name: "Dhushyanthan", dept: "CSE", attended: 29, conducted: 38 },
        { rollNo: "2024CSE1102", name: "Nithish", dept: "CSE", attended: 37, conducted: 38 }
      ]
    }
  };

  const [appState, setAppState] = useState(() => {
    try {
      const stored = localStorage.getItem('edumanage_state');
      if (stored) {
        const parsed = JSON.parse(stored);
        let needsMigration = false;
        const migratedState = { ...defaultState };
        Object.keys(defaultState).forEach(key => {
          if (parsed[key] === undefined || parsed[key] === null) {
            needsMigration = true;
          } else if (typeof defaultState[key] !== typeof parsed[key]) {
            needsMigration = true;
          } else if (Array.isArray(defaultState[key]) && !Array.isArray(parsed[key])) {
            needsMigration = true;
          } else {
            migratedState[key] = parsed[key];
          }
        });
        if (needsMigration) {
          localStorage.setItem('edumanage_state', JSON.stringify(migratedState));
          return migratedState;
        }
        return parsed;
      }
    } catch (err) {
      console.error("Error reading edumanage_state:", err);
    }
    localStorage.setItem('edumanage_state', JSON.stringify(defaultState));
    return defaultState;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      if (stored) return JSON.parse(stored);
    } catch (err) {}
    return null;
  });

  // Load MongoDB data into appState when admin is logged in or on mount
  useEffect(() => {
    const loadFromDB = async () => {
      try {
        const [students, faculties, departments, courses, notices] = await Promise.all([
          fetch(`${API}/students`).then(r => r.json()),
          fetch(`${API}/faculty`).then(r => r.json()),
          fetch(`${API}/departments`).then(r => r.json()),
          fetch(`${API}/courses`).then(r => r.json()),
          fetch(`${API}/notices`).then(r => r.json())
        ]);

        setAppState(prev => {
          const next = {
            ...prev,
            allStudents: Array.isArray(students) ? students : prev.allStudents,
            faculties: Array.isArray(faculties) ? faculties : prev.faculties,
            departments: Array.isArray(departments) ? departments : prev.departments,
            allCourses: Array.isArray(courses) ? courses : prev.allCourses,
            notices: Array.isArray(notices) ? notices : prev.notices
          };
          localStorage.setItem('edumanage_state', JSON.stringify(next));
          return next;
        });

        // Also check for latest application notification
        const latestApp = await fetch(`${API}/application/latest`).then(r => r.json()).catch(() => null);
        if (latestApp && latestApp.studentName) {
          setAppState(prev => {
            const next = {
              ...prev,
              adminNotification: prev.adminNotification || `New student "${latestApp.studentName}" submitted their Admission Application (Dept: ${latestApp.department}).`,
              lastApplication: latestApp
            };
            localStorage.setItem('edumanage_state', JSON.stringify(next));
            return next;
          });
        }
      } catch (err) {
        console.warn('Backend not reachable, using local state:', err.message);
      }
    };
    loadFromDB();
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.role === 'student' && currentUser.email) {
      const studentDbRecord = appState.allStudents?.find(s => s.email?.toLowerCase() === currentUser.email.toLowerCase());
      if (studentDbRecord) {
        setAppState(prev => {
          const updated = {
            ...prev,
            profile: {
              ...prev.profile,
              name: studentDbRecord.name,
              rollNo: studentDbRecord.rollNo,
              semester: studentDbRecord.semester || "4",
              program: studentDbRecord.dept === "CSE" ? "B.Tech Computer Science & Eng." : "B.Tech Engineering",
              phone: studentDbRecord.phone || "+91 98765 43210",
              email: studentDbRecord.email,
            }
          };
          if (Array.isArray(updated.courses)) {
            updated.courses.forEach(c => {
              c.conducted = 40;
              c.attended = Math.round(40 * ((studentDbRecord.attendance || 80) / 100));
            });
          }
          localStorage.setItem('edumanage_state', JSON.stringify(updated));
          return updated;
        });
      }
    }
  }, [currentUser]);

  const saveState = (newState) => {
    setAppState(newState);
    localStorage.setItem('edumanage_state', JSON.stringify(newState));
  };

  const reseedDatabase = () => {
    localStorage.removeItem('edumanage_state');
    saveState(defaultState);
  };

  // ─── AUTH ───────────────────────────────────────────────────────────────────

  const login = async (role, email, password) => {
    if (!email || !password) return { success: false, message: 'Please enter both email and password.' };
    const cleanEmail = email.trim().toLowerCase();
    const cleanPwd = password.trim();

    const localAuth = () => {
      if (role === 'admin') {
        const admins = [
          { email: 'admin@edumanage.com', passwords: ['admin@1', 'admin123'], name: 'Danushkumar' },
          { email: 'admin@edumanage', passwords: ['admin@1', 'admin123'], name: 'Danushkumar' },
          { email: 'suryasekar626@edumanage.com', passwords: ['surya@123'], name: 'Suryasekar' }
        ];
        const admin = admins.find(a => a.email === cleanEmail && a.passwords.includes(cleanPwd));
        if (admin) {
          const user = { role: 'admin', email: admin.email, name: admin.name };
          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return { success: true };
        }
        return { success: false, message: 'Invalid Admin credentials!' };
      } else if (role === 'faculty') {
        const fac = appState.faculties.find(f => f.email?.toLowerCase() === cleanEmail);
        if (fac && cleanPwd === fac.password) {
          const user = { role: 'faculty', email: fac.email, name: fac.name };
          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return { success: true };
        }
        return { success: false, message: 'Invalid Faculty credentials!' };
      } else {
        const std = appState.allStudents.find(s => s.email?.toLowerCase() === cleanEmail);
        if (std && cleanPwd === std.password) {
          const user = { role: 'student', email: std.email, name: std.name };
          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return { success: true };
        }
        return { success: false, message: 'Invalid Student credentials!' };
      }
    };

    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentUser(data.user);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        return { success: true };
      }
      // API returned error — still try local fallback before giving up
      return localAuth();
    } catch (err) {
      // Network error — backend is down, use local fallback
      return localAuth();
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const signup = async (name, email, phone, password) => {
    localStorage.setItem('signupData', JSON.stringify({ name, email, phone, password }));
    try {
      await fetch(`${API}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
    } catch (err) {
      console.warn('Signup API not reachable, saved to localStorage only');
    }
  };

  const submitApplication = async (appData) => {
    localStorage.setItem('applicationData', JSON.stringify(appData));

    let password = 'student123';
    let signupPhone = appData.parentMobile;
    try {
      const storedSignup = localStorage.getItem('signupData');
      if (storedSignup) {
        const signupObj = JSON.parse(storedSignup);
        if (signupObj.password) password = signupObj.password;
        if (signupObj.phone) signupPhone = signupObj.phone;
      }
    } catch (e) {}

    try {
      const res = await fetch(`${API}/application`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...appData, signupPassword: password, signupPhone })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Refresh students from DB
        const students = await fetch(`${API}/students`).then(r => r.json());
        const nextState = {
          ...appState,
          allStudents: Array.isArray(students) ? students : appState.allStudents,
          adminNotification: data.notification,
          lastApplication: appData
        };
        saveState(logActivity(`Registered student from Admission Application: ${appData.studentName}`, 'success', nextState));
        return;
      }
    } catch (err) {
      console.warn('Application API not reachable, using local fallback');
    }

    // Local fallback
    const newStudent = {
      id: `STD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: appData.studentName,
      rollNo: appData.registerNumber,
      dept: appData.department,
      year: appData.year.includes('1') ? '1' : appData.year.includes('2') ? '2' : appData.year.includes('3') ? '3' : '4',
      semester: appData.year.includes('1') ? 1 : appData.year.includes('2') ? 3 : appData.year.includes('3') ? 5 : 7,
      email: appData.applicationEmail,
      phone: signupPhone,
      attendance: 100,
      password
    };
    const nextAllStudents = [...appState.allStudents];
    const existsIdx = nextAllStudents.findIndex(s => s.email?.toLowerCase() === appData.applicationEmail.toLowerCase());
    if (existsIdx !== -1) {
      nextAllStudents[existsIdx] = { ...nextAllStudents[existsIdx], ...newStudent };
    } else {
      nextAllStudents.push(newStudent);
    }
    let nextAttendanceDb = { ...appState.attendanceDb };
    Object.keys(nextAttendanceDb).forEach(cCode => {
      const hasStudent = nextAttendanceDb[cCode].some(s => s.rollNo === newStudent.rollNo);
      if (!hasStudent) {
        nextAttendanceDb[cCode].push({ rollNo: newStudent.rollNo, name: newStudent.name, dept: newStudent.dept, attended: 0, conducted: 0 });
      }
    });
    const nextState = logActivity(`Registered student from Admission Application: ${newStudent.name}`, 'success', {
      ...appState,
      allStudents: nextAllStudents,
      attendanceDb: nextAttendanceDb,
      adminNotification: `New student "${newStudent.name}" has successfully registered and submitted their Admission Application form.`,
      lastApplication: appData
    });
    saveState(nextState);
  };

  const clearNotification = () => {
    saveState({ ...appState, adminNotification: null });
  };

  const logActivity = (task, type = 'info', updatedState) => {
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newLog = {
      id: `act-${Math.floor(1000 + Math.random() * 9000)}`,
      task,
      user: currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : "System",
      date: todayStr,
      type
    };
    const targetState = updatedState || appState;
    return { ...targetState, activityLogs: [newLog, ...targetState.activityLogs] };
  };

  // ─── STUDENT ACTIONS ────────────────────────────────────────────────────────

  const updateProfile = (profileForm) => {
    const nextState = { ...appState, profile: { ...appState.profile, ...profileForm } };
    if (nextState.allStudents) {
      const idx = nextState.allStudents.findIndex(s => s.rollNo === nextState.profile.rollNo);
      if (idx !== -1) {
        nextState.allStudents[idx] = { ...nextState.allStudents[idx], name: profileForm.name, email: profileForm.email, phone: profileForm.phone };
      }
    }
    saveState(logActivity(`Updated personal settings profile for ${profileForm.name}`, 'success', nextState));
  };

  const submitAssignment = (assignmentId, fileName) => {
    const nextAssignments = appState.assignments.map(a =>
      a.id === assignmentId ? { ...a, status: 'Submitted', submissionDate: new Date().toISOString().split('T')[0], submittedFileName: fileName } : a
    );
    const target = appState.assignments.find(a => a.id === assignmentId);
    saveState(logActivity(`Uploaded deliverable file (${fileName}) for assignment: ${target?.title}`, 'success', { ...appState, assignments: nextAssignments }));
  };

  const payFees = (invoiceId) => {
    const todayStr = new Date().toISOString().split('T')[0];
    let ledgers = [...appState.fees.ledgers];
    let transactions = [...appState.fees.transactions];
    if (invoiceId === 'all') {
      ledgers.filter(l => l.status === 'Pending').forEach(l => {
        l.status = 'Paid';
        transactions.unshift({ id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`, title: l.title, amount: l.amount, date: todayStr, method: 'Card Checkout' });
      });
    } else {
      const idx = ledgers.findIndex(l => l.id === invoiceId);
      if (idx !== -1) {
        ledgers[idx].status = 'Paid';
        transactions.unshift({ id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`, title: ledgers[idx].title, amount: ledgers[idx].amount, date: todayStr, method: 'Card Checkout' });
      }
    }
    saveState(logActivity(invoiceId === 'all' ? 'Cleared all pending invoice fees' : 'Successfully paid invoice particulars receipt', 'success', { ...appState, fees: { ledgers, transactions } }));
  };

  const gradeAssignment = (assignmentId, score, grade, remarks) => {
    const nextAssignments = appState.assignments.map(a =>
      a.id === assignmentId ? { ...a, status: 'Graded', awardedScore: score, awardedGrade: grade, teacherComments: remarks } : a
    );
    const targetAssign = appState.assignments.find(a => a.id === assignmentId);
    let nextGrades = { ...appState.grades };
    if (targetAssign) {
      const gradeIdx = nextGrades.details.findIndex(g => g.code === targetAssign.code);
      if (gradeIdx !== -1) {
        nextGrades.details[gradeIdx] = { ...nextGrades.details[gradeIdx], endTerm: grade, gp: grade === 'O' ? 10 : grade === 'A+' ? 10 : grade === 'A' ? 9 : grade === 'B+' ? 8 : grade === 'B' ? 7 : 6 };
        const totalGPs = nextGrades.details.reduce((sum, item) => sum + item.gp, 0);
        nextGrades.semesterGpas = [...nextGrades.semesterGpas];
        nextGrades.semesterGpas[3] = parseFloat((totalGPs / nextGrades.details.length).toFixed(2));
      }
    }
    saveState(logActivity(`Awarded end-term grade (${grade}) to Danushkumar for ${targetAssign?.code}`, 'success', { ...appState, assignments: nextAssignments, grades: nextGrades }));
  };

  const adjustAttendance = (courseCode, rollNo, markPresent) => {
    let nextAttendanceDb = { ...appState.attendanceDb };
    let students = nextAttendanceDb[courseCode] ? [...nextAttendanceDb[courseCode]] : [];
    const idx = students.findIndex(s => s.rollNo === rollNo);
    if (idx !== -1) {
      const s = { ...students[idx] };
      if (markPresent) { s.attended += 1; s.conducted += 1; } else { s.conducted += 1; }
      students[idx] = s;
      nextAttendanceDb[courseCode] = students;
    }
    let totalAttended = 0, totalConducted = 0;
    Object.keys(nextAttendanceDb).forEach(cCode => {
      const match = nextAttendanceDb[cCode].find(st => st.rollNo === rollNo);
      if (match) { totalAttended += match.attended; totalConducted += match.conducted; }
    });
    const newPct = totalConducted > 0 ? Math.round((totalAttended / totalConducted) * 100) : 80;
    const nextAllStudents = appState.allStudents.map(s => s.rollNo === rollNo ? { ...s, attendance: newPct } : s);
    let nextCourses = [...appState.courses];
    if (rollNo === '2024CSE1042') {
      nextCourses = nextCourses.map(c => {
        if (c.code === courseCode) {
          const match = students.find(st => st.rollNo === rollNo);
          return { ...c, conducted: match.conducted, attended: match.attended };
        }
        return c;
      });
    }
    const targetStudent = appState.allStudents.find(s => s.rollNo === rollNo);
    saveState(logActivity(`Updated attendance mark roll call for ${targetStudent?.name} in ${courseCode}`, 'info', { ...appState, attendanceDb: nextAttendanceDb, allStudents: nextAllStudents, courses: nextCourses }));
  };

  const addLectureSession = (courseCode) => {
    let nextAttendanceDb = { ...appState.attendanceDb };
    let students = nextAttendanceDb[courseCode] ? [...nextAttendanceDb[courseCode]] : [];
    students = students.map(s => {
      const nextStudent = { ...s, conducted: s.conducted + 1 };
      let totalAttended = nextStudent.attended, totalConducted = nextStudent.conducted;
      Object.keys(nextAttendanceDb).forEach(cCode => {
        if (cCode !== courseCode) {
          const match = nextAttendanceDb[cCode].find(st => st.rollNo === s.rollNo);
          if (match) { totalAttended += match.attended; totalConducted += match.conducted; }
        }
      });
      const newPct = totalConducted > 0 ? Math.round((totalAttended / totalConducted) * 100) : 80;
      appState.allStudents = appState.allStudents.map(std => std.rollNo === s.rollNo ? { ...std, attendance: newPct } : std);
      return nextStudent;
    });
    nextAttendanceDb[courseCode] = students;
    let nextCourses = appState.courses.map(c => {
      if (c.code === courseCode) {
        const match = students.find(st => st.rollNo === '2024CSE1042');
        return { ...c, conducted: match ? match.conducted : c.conducted + 1 };
      }
      return c;
    });
    saveState(logActivity(`Added new lecture rollup call session to syllabus ${courseCode}`, 'success', { ...appState, attendanceDb: nextAttendanceDb, courses: nextCourses }));
  };

  // ─── ADMIN ACTIONS ──────────────────────────────────────────────────────────

  const registerStudent = async (studentData) => {
    try {
      const res = await fetch(`${API}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
      const saved = await res.json();
      const students = await fetch(`${API}/students`).then(r => r.json());
      const msg = studentData.id ? `Modified profile credentials for student registry ${studentData.name}` : `Registered new student profile: ${studentData.name}`;
      saveState(logActivity(msg, 'success', { ...appState, allStudents: Array.isArray(students) ? students : appState.allStudents }));
    } catch (err) {
      // Local fallback
      let nextAllStudents = [...appState.allStudents];
      if (studentData.id) {
        nextAllStudents = nextAllStudents.map(s => s.id === studentData.id ? { ...s, ...studentData } : s);
      } else {
        nextAllStudents.push({ id: `STD-${Math.floor(1000 + Math.random() * 9000)}`, password: `${studentData.name.toLowerCase().split(' ')[0]}123`, ...studentData });
      }
      saveState(logActivity(`Registered/updated student: ${studentData.name}`, 'success', { ...appState, allStudents: nextAllStudents }));
    }
  };

  const removeStudent = async (studentId) => {
    const student = appState.allStudents.find(s => s.id === studentId);
    if (!student) return;
    try {
      await fetch(`${API}/students/${studentId}`, { method: 'DELETE' });
    } catch (err) {}
    const nextAllStudents = appState.allStudents.filter(s => s.id !== studentId);
    let nextAttendanceDb = { ...appState.attendanceDb };
    Object.keys(nextAttendanceDb).forEach(cCode => {
      nextAttendanceDb[cCode] = nextAttendanceDb[cCode].filter(s => s.rollNo !== student.rollNo);
    });
    saveState(logActivity(`Removed student registration: ${student.name}`, 'danger', { ...appState, allStudents: nextAllStudents, attendanceDb: nextAttendanceDb }));
  };

  const registerFaculty = async (facultyData) => {
    try {
      const res = await fetch(`${API}/faculty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facultyData)
      });
      const faculties = await fetch(`${API}/faculty`).then(r => r.json());
      const msg = facultyData.id ? `Updated Professor coursework details: ${facultyData.name}` : `Appointed new Senior Professor: ${facultyData.name}`;
      saveState(logActivity(msg, 'info', { ...appState, faculties: Array.isArray(faculties) ? faculties : appState.faculties }));
    } catch (err) {
      let nextFaculties = [...appState.faculties];
      if (facultyData.id) {
        nextFaculties = nextFaculties.map(f => f.id === facultyData.id ? { ...f, ...facultyData } : f);
      } else {
        nextFaculties.push({ id: `FAC-${Math.floor(100 + Math.random() * 900)}`, password: 'faculty123', ...facultyData });
      }
      saveState(logActivity(`Registered/updated faculty: ${facultyData.name}`, 'info', { ...appState, faculties: nextFaculties }));
    }
  };

  const removeFaculty = async (facultyId) => {
    const fac = appState.faculties.find(f => f.id === facultyId);
    if (!fac) return;
    try {
      await fetch(`${API}/faculty/${facultyId}`, { method: 'DELETE' });
    } catch (err) {}
    saveState(logActivity(`Removed Professor credentials: ${fac.name}`, 'danger', { ...appState, faculties: appState.faculties.filter(f => f.id !== facultyId) }));
  };

  const registerDept = async (deptData) => {
    const exists = appState.departments.some(d => d.code === deptData.code.toUpperCase());
    if (exists) return { success: false, message: 'Department code already exists!' };
    try {
      const res = await fetch(`${API}/departments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deptData)
      });
      if (!res.ok) {
        const err = await res.json();
        return { success: false, message: err.message };
      }
      const depts = await fetch(`${API}/departments`).then(r => r.json());
      saveState(logActivity(`Created Department branch: ${deptData.name}`, 'success', { ...appState, departments: Array.isArray(depts) ? depts : appState.departments }));
    } catch (err) {
      saveState(logActivity(`Created Department branch: ${deptData.name}`, 'success', { ...appState, departments: [...appState.departments, { code: deptData.code.toUpperCase(), name: deptData.name }] }));
    }
    return { success: true };
  };

  const removeDept = async (code) => {
    const dept = appState.departments.find(d => d.code === code);
    if (!dept) return;
    try {
      await fetch(`${API}/departments/${code}`, { method: 'DELETE' });
    } catch (err) {}
    saveState(logActivity(`Deleted department branch: ${dept.name}`, 'danger', { ...appState, departments: appState.departments.filter(d => d.code !== code) }));
  };

  const registerCourse = async (courseData) => {
    const exists = appState.allCourses.some(c => c.code === courseData.code.toUpperCase());
    if (exists) return { success: false, message: 'Course code already exists!' };
    try {
      const res = await fetch(`${API}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
      });
      if (!res.ok) {
        const err = await res.json();
        return { success: false, message: err.message };
      }
      const courses = await fetch(`${API}/courses`).then(r => r.json());
      saveState(logActivity(`Added academic course syllabus: ${courseData.name}`, 'success', { ...appState, allCourses: Array.isArray(courses) ? courses : appState.allCourses }));
    } catch (err) {
      const newCrs = { code: courseData.code.toUpperCase(), name: courseData.name, credits: parseInt(courseData.credits, 10), dept: courseData.dept, prof: courseData.prof };
      saveState(logActivity(`Added academic course syllabus: ${courseData.name}`, 'success', { ...appState, allCourses: [...appState.allCourses, newCrs] }));
    }
    return { success: true };
  };

  const removeCourse = async (code) => {
    const course = appState.allCourses.find(c => c.code === code);
    if (!course) return;
    try {
      await fetch(`${API}/courses/${code}`, { method: 'DELETE' });
    } catch (err) {}
    let nextAttendanceDb = { ...appState.attendanceDb };
    delete nextAttendanceDb[code];
    saveState(logActivity(`Removed Course syllabus: ${course.name}`, 'danger', { ...appState, allCourses: appState.allCourses.filter(c => c.code !== code), attendanceDb: nextAttendanceDb }));
  };

  const postNotice = async (noticeData) => {
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    try {
      const res = await fetch(`${API}/notices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noticeData)
      });
      const saved = await res.json();
      const notices = await fetch(`${API}/notices`).then(r => r.json());
      saveState(logActivity(`Broadcasted campus announcement circular: ${noticeData.title}`, 'info', { ...appState, notices: Array.isArray(notices) ? notices : appState.notices }));
    } catch (err) {
      const newNotice = { id: `not-${Math.floor(1000 + Math.random() * 9000)}`, category: noticeData.category, date: todayStr, title: noticeData.title, desc: noticeData.desc };
      saveState(logActivity(`Broadcasted campus announcement circular: ${noticeData.title}`, 'info', { ...appState, notices: [newNotice, ...appState.notices] }));
    }
  };

  const deleteNotice = async (noticeId) => {
    const notice = appState.notices.find(n => n.id === noticeId);
    if (!notice) return;
    try {
      await fetch(`${API}/notices/${noticeId}`, { method: 'DELETE' });
    } catch (err) {}
    saveState(logActivity(`Removed announcement circular: ${notice.title}`, 'danger', { ...appState, notices: appState.notices.filter(n => n.id !== noticeId) }));
  };

  return (
    <StateContext.Provider value={{
      appState, currentUser, login, logout, signup, submitApplication,
      updateProfile, submitAssignment, payFees, gradeAssignment,
      adjustAttendance, addLectureSession, registerStudent, removeStudent,
      registerFaculty, removeFaculty, registerDept, removeDept,
      registerCourse, removeCourse, postNotice, deleteNotice,
      clearNotification, reseedDatabase
    }}>
      {children}
    </StateContext.Provider>
  );
};
