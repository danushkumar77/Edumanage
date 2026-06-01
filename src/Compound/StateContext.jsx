import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

export const useAppState = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  // 1. Initial State Definition (exact schema as defined in login.html / dashboard.js)
  const defaultState = {
    profile: {
      name: "Danushkumar",
      rollNo: "2024CSE1042",
      semester: "4",
      program: "B.Tech Computer Science & Eng.",
      section: "A",
      phone: "+91 98765 43210",
      email: "danushkumar@edumanage.com",
      dob: "2004-08-12",
      address: "123, Dynamic Heights, Tech City, Bangalore, 560001",
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
    notices: [
      { id: "not-1", category: "urgent", date: "May 26, 2026", title: "End Semester Examination Schedule", desc: "The End Semester Examinations for B.Tech Semester 4 will commence from June 15, 2026. Detailed schedules will be shared shortly. Ensure all pending dues are cleared before June 5 to generate Hall Tickets." },
      { id: "not-2", category: "academic", date: "May 24, 2026", title: "Pre-Registration for Semester 5 Electives", desc: "Pre-registration portals for Sem 5 department electives (Artificial Intelligence, Cryptography, Mobile App Dev) will open on June 1. Seats are allotted on a first-come, first-served basis." },
      { id: "not-3", category: "event", date: "May 22, 2026", title: "Annual Technical Fest - TechStorm 2026", desc: "Registrations are officially open for TechStorm 2026, scheduled from June 10-12. Features include Hackathons, Robot Wars, and Code-in-the-Dark. Cash prizes up to ₹1,50,000!" },
      { id: "not-4", category: "exam", date: "May 20, 2026", title: "Revision / Remedial Classes Schedule", desc: "Special doubt-clearing sessions for Mathematics IV (MA204) and Operating Systems (CS202) are scheduled for Saturdays in Room 402, 10 AM onwards. Attendance is optional but highly recommended." }
    ],
    departments: [
      { code: "CSE", name: "Computer Science & Engineering" },
      { code: "ECE", name: "Electronics & Communication Eng." },
      { code: "ME", name: "Mechanical Engineering" },
      { code: "CE", name: "Civil Engineering" }
    ],
    allCourses: [
      { code: "CS201", name: "Database Management Systems", credits: 4, dept: "CSE", prof: "Dr. Suresh Kumar" },
      { code: "CS202", name: "Operating Systems", credits: 4, dept: "CSE", prof: "Prof. Radhika Sen" },
      { code: "CS203", name: "Design & Analysis of Algorithms", credits: 4, dept: "CSE", prof: "Dr. Amit Patel" },
      { code: "MA204", name: "Engineering Mathematics IV", credits: 3, dept: "CSE", prof: "Prof. Kavitha Devi" },
      { code: "CS205", name: "Web Technologies", credits: 3, dept: "CSE", prof: "Dr. Priya Nair" }
    ],
    faculties: [
      { id: "FAC-101", name: "Dr. Suresh Kumar", dept: "CSE", subject: "Database Management Systems", email: "suresh@edumanage.com", phone: "+91 98765 11111", password: "faculty123" },
      { id: "FAC-102", name: "Dr. Priya Nair", dept: "CSE", subject: "Web Technologies", email: "priya@edumanage.com", phone: "+91 98765 22222", password: "priya123" },
      { id: "FAC-103", name: "Prof. Radhika Sen", dept: "CSE", subject: "Operating Systems", email: "radhika@edumanage.com", phone: "+91 98765 33333", password: "radhika123" },
      { id: "FAC-104", name: "Dr. Amit Patel", dept: "CSE", subject: "Design & Analysis of Algorithms", email: "amit@edumanage.com", phone: "+91 98765 44444", password: "amit123" },
      { id: "FAC-105", name: "Prof. Kavitha Devi", dept: "CSE", subject: "Engineering Mathematics IV", email: "kavitha@edumanage.com", phone: "+91 98765 55555", password: "kavitha123" }
    ],
    allStudents: [
      { id: "STD-1001", name: "Danushkumar", rollNo: "2024CSE1042", dept: "CSE", year: "2", semester: 4, email: "danushkumar@edumanage.com", phone: "+91 98765 43210", attendance: 86, password: "danu123" },
      { id: "STD-1002", name: "Akash", rollNo: "2024CSE1055", dept: "CSE", year: "2", semester: 4, email: "akash@edumanage.com", phone: "+91 98765 55551", attendance: 76, password: "akash123" },
      { id: "STD-1003", name: "Dhushyanthan", rollNo: "2024CSE1089", dept: "CSE", year: "2", semester: 4, email: "dhushyanthan@edumanage.com", phone: "+91 98765 66662", attendance: 67, password: "dhushy123" },
      { id: "STD-1004", name: "Nithish", rollNo: "2024CSE1102", dept: "CSE", year: "2", semester: 4, email: "nithish@edumanage.com", phone: "+91 98765 77773", attendance: 95, password: "nithish123" },
      { id: "STD-1005", name: "Harini", rollNo: "2024CSE1115", dept: "ECE", year: "2", semester: 4, email: "harini@edumanage.com", phone: "+91 98765 88884", attendance: 82, password: "harini123" },
      { id: "STD-1006", name: "Ganesh", rollNo: "2024CSE1128", dept: "ME", year: "2", semester: 4, email: "ganesh@edumanage.com", phone: "+91 98765 99995", attendance: 88, password: "ganesh123" }
    ],
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

  // State initialization
  const [appState, setAppState] = useState(() => {
    try {
      const stored = localStorage.getItem('edumanage_state');
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Robustness: ensure that we merge parsed with defaultState in case of missing keys
        // or outdated schema from legacy versions of the app.
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
            // Keep user's custom records if present
            migratedState[key] = parsed[key];
          }
        });

        if (needsMigration) {
          console.warn("EduManage local database schema is incomplete or corrupted. Automatically repairing and migrating...");
          localStorage.setItem('edumanage_state', JSON.stringify(migratedState));
          return migratedState;
        }

        return parsed;
      }
    } catch (err) {
      console.error("Error reading edumanage_state from localStorage:", err);
    }
    localStorage.setItem('edumanage_state', JSON.stringify(defaultState));
    return defaultState;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error("Error reading currentUser from localStorage:", err);
    }
    return null;
  });

  // Keep state in sync with current user changes
  useEffect(() => {
    if (currentUser && currentUser.role === 'student' && currentUser.email) {
      const studentDbRecord = appState.allStudents ? appState.allStudents.find(s => s.email && s.email.toLowerCase() === currentUser.email.toLowerCase()) : null;
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

  // Helper function to update state and persist
  const saveState = (newState) => {
    setAppState(newState);
    localStorage.setItem('edumanage_state', JSON.stringify(newState));
  };

  // System Reseed Database
  const reseedDatabase = () => {
    localStorage.removeItem('edumanage_state');
    saveState(defaultState);
  };

  // User Authentication Actions
  const login = (role, email, password) => {
    if (!email || !password) {
      return { success: false, message: 'Please enter both email and password.' };
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (role === 'admin') {
      if ((cleanEmail === 'admin@edumanage.com' || cleanEmail === 'admin@edumanage') && (cleanPassword === 'admin@1' || cleanPassword === 'admin123')) {
        const user = { role: 'admin', email: 'admin@edumanage.com', name: 'ERP Administrator' };
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true };
      }
      return { success: false, message: 'Invalid Admin credentials!' };
    } else if (role === 'faculty') {
      const faculties = Array.isArray(appState?.faculties) ? appState.faculties : defaultState.faculties;
      const fac = faculties.find(f => f.email && f.email.toLowerCase() === cleanEmail);
      if (fac && cleanPassword === fac.password) {
        const user = { role: 'faculty', email: fac.email, name: fac.name };
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true };
      }
      return { success: false, message: 'Invalid Faculty credentials!' };
    } else {
      // student
      const allStudents = Array.isArray(appState?.allStudents) ? appState.allStudents : defaultState.allStudents;
      const std = allStudents.find(s => s.email && s.email.toLowerCase() === cleanEmail);
      if (std && cleanPassword === std.password) {
        const user = { role: 'student', email: std.email, name: std.name };
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true };
      }
      return { success: false, message: 'Invalid Student credentials!' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const signup = (name, email, phone, password) => {
    const signupData = { name, email, phone, password };
    localStorage.setItem('signupData', JSON.stringify(signupData));
  };

  const submitApplication = (appData) => {
    localStorage.setItem('applicationData', JSON.stringify(appData));
  };

  // Logger Helper
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
    const nextLogs = [newLog, ...targetState.activityLogs];
    return {
      ...targetState,
      activityLogs: nextLogs
    };
  };

  // Student Actions
  const updateProfile = (profileForm) => {
    const nextState = {
      ...appState,
      profile: {
        ...appState.profile,
        ...profileForm
      }
    };
    
    // Sync back to student list
    if (nextState.allStudents) {
      const idx = nextState.allStudents.findIndex(s => s.rollNo === nextState.profile.rollNo);
      if (idx !== -1) {
        nextState.allStudents[idx] = {
          ...nextState.allStudents[idx],
          name: profileForm.name,
          email: profileForm.email,
          phone: profileForm.phone
        };
      }
    }

    const stateWithLog = logActivity(`Updated personal settings profile for ${profileForm.name}`, 'success', nextState);
    saveState(stateWithLog);
  };

  const submitAssignment = (assignmentId, fileName) => {
    const nextAssignments = appState.assignments.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          status: 'Submitted',
          submissionDate: new Date().toISOString().split('T')[0],
          submittedFileName: fileName
        };
      }
      return a;
    });

    const nextState = {
      ...appState,
      assignments: nextAssignments
    };

    const target = appState.assignments.find(a => a.id === assignmentId);
    const stateWithLog = logActivity(`Uploaded deliverable file (${fileName}) for assignment: ${target?.title}`, 'success', nextState);
    saveState(stateWithLog);
  };

  const payFees = (invoiceId) => {
    const todayStr = new Date().toISOString().split('T')[0];
    let ledgers = [...appState.fees.ledgers];
    let transactions = [...appState.fees.transactions];

    if (invoiceId === 'all') {
      const pending = ledgers.filter(l => l.status === 'Pending');
      pending.forEach(l => {
        l.status = 'Paid';
        transactions.unshift({
          id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
          title: l.title,
          amount: l.amount,
          date: todayStr,
          method: 'Card Checkout'
        });
      });
    } else {
      const idx = ledgers.findIndex(l => l.id === invoiceId);
      if (idx !== -1) {
        ledgers[idx].status = 'Paid';
        transactions.unshift({
          id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
          title: ledgers[idx].title,
          amount: ledgers[idx].amount,
          date: todayStr,
          method: 'Card Checkout'
        });
      }
    }

    const nextState = {
      ...appState,
      fees: { ledgers, transactions }
    };

    const stateWithLog = logActivity(
      invoiceId === 'all' ? 'Cleared all pending invoice fees' : 'Successfully paid invoice particulars receipt', 
      'success', 
      nextState
    );
    saveState(stateWithLog);
  };

  // Faculty & Admin Actions: Grading
  const gradeAssignment = (assignmentId, score, grade, remarks) => {
    let nextAssignments = appState.assignments.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          status: 'Graded',
          awardedScore: score,
          awardedGrade: grade,
          teacherComments: remarks
        };
      }
      return a;
    });

    const targetAssign = appState.assignments.find(a => a.id === assignmentId);
    let nextGrades = { ...appState.grades };

    if (targetAssign) {
      const gradeIdx = nextGrades.details.findIndex(g => g.code === targetAssign.code);
      if (gradeIdx !== -1) {
        nextGrades.details[gradeIdx] = {
          ...nextGrades.details[gradeIdx],
          endTerm: grade,
          gp: grade === 'O' ? 10 : grade === 'A+' ? 10 : grade === 'A' ? 9 : grade === 'B+' ? 8 : grade === 'B' ? 7 : 6
        };

        const totalGPs = nextGrades.details.reduce((sum, item) => sum + item.gp, 0);
        const avgGP = (totalGPs / nextGrades.details.length).toFixed(2);
        nextGrades.semesterGpas = [...nextGrades.semesterGpas];
        nextGrades.semesterGpas[3] = parseFloat(avgGP);
      }
    }

    const nextState = {
      ...appState,
      assignments: nextAssignments,
      grades: nextGrades
    };

    const stateWithLog = logActivity(`Awarded end-term grade (${grade}) to Danushkumar for ${targetAssign?.code}`, 'success', nextState);
    saveState(stateWithLog);
  };

  // Faculty Actions: Attendance Adjustments
  const adjustAttendance = (courseCode, rollNo, markPresent) => {
    let nextAttendanceDb = { ...appState.attendanceDb };
    let students = nextAttendanceDb[courseCode] ? [...nextAttendanceDb[courseCode]] : [];
    
    const idx = students.findIndex(s => s.rollNo === rollNo);
    if (idx !== -1) {
      const s = { ...students[idx] };
      if (markPresent) {
        s.attended += 1;
        s.conducted += 1;
      } else {
        s.conducted += 1;
      }
      students[idx] = s;
      nextAttendanceDb[courseCode] = students;
    }

    // Sync global attendance pct
    let totalAttended = 0;
    let totalConducted = 0;
    Object.keys(nextAttendanceDb).forEach(cCode => {
      const match = nextAttendanceDb[cCode].find(st => st.rollNo === rollNo);
      if (match) {
        totalAttended += match.attended;
        totalConducted += match.conducted;
      }
    });

    const newPct = totalConducted > 0 ? Math.round((totalAttended / totalConducted) * 100) : 80;
    let nextAllStudents = appState.allStudents.map(s => {
      if (s.rollNo === rollNo) {
        return { ...s, attendance: newPct };
      }
      return s;
    });

    // If active logged-in student is Danushkumar, sync legacy courses model
    let nextCourses = [...appState.courses];
    if (rollNo === '2024CSE1042') {
      nextCourses = nextCourses.map(c => {
        if (c.code === courseCode) {
          const match = students.find(st => st.rollNo === rollNo);
          return {
            ...c,
            conducted: match.conducted,
            attended: match.attended
          };
        }
        return c;
      });
    }

    const nextState = {
      ...appState,
      attendanceDb: nextAttendanceDb,
      allStudents: nextAllStudents,
      courses: nextCourses
    };

    const targetStudent = appState.allStudents.find(s => s.rollNo === rollNo);
    const stateWithLog = logActivity(
      `Updated attendance mark roll call for ${targetStudent?.name} in ${courseCode}`, 
      'info', 
      nextState
    );
    saveState(stateWithLog);
  };

  const addLectureSession = (courseCode) => {
    let nextAttendanceDb = { ...appState.attendanceDb };
    let students = nextAttendanceDb[courseCode] ? [...nextAttendanceDb[courseCode]] : [];

    students = students.map(s => {
      const nextStudent = { ...s, conducted: s.conducted + 1 };
      
      // Sync global registry records
      let totalAttended = nextStudent.attended;
      let totalConducted = nextStudent.conducted;

      Object.keys(nextAttendanceDb).forEach(cCode => {
        if (cCode !== courseCode) {
          const match = nextAttendanceDb[cCode].find(st => st.rollNo === s.rollNo);
          if (match) {
            totalAttended += match.attended;
            totalConducted += match.conducted;
          }
        }
      });

      const newPct = totalConducted > 0 ? Math.round((totalAttended / totalConducted) * 100) : 80;
      
      // Update global allStudents array
      appState.allStudents = appState.allStudents.map(std => {
        if (std.rollNo === s.rollNo) {
          return { ...std, attendance: newPct };
        }
        return std;
      });

      return nextStudent;
    });

    nextAttendanceDb[courseCode] = students;

    // Sync legacy courses conducted classes for student Danushkumar
    let nextCourses = appState.courses.map(c => {
      if (c.code === courseCode) {
        const match = students.find(st => st.rollNo === '2024CSE1042');
        return {
          ...c,
          conducted: match ? match.conducted : c.conducted + 1
        };
      }
      return c;
    });

    const nextState = {
      ...appState,
      attendanceDb: nextAttendanceDb,
      courses: nextCourses
    };

    const stateWithLog = logActivity(`Added new lecture rollup call session to syllabus syllabus ${courseCode}`, 'success', nextState);
    saveState(stateWithLog);
  };

  // Administrator Actions
  const registerStudent = (studentData) => {
    let nextAllStudents = [...appState.allStudents];
    let nextLogs = [...appState.activityLogs];

    if (studentData.id) {
      // Modify
      nextAllStudents = nextAllStudents.map(s => {
        if (s.id === studentData.id) {
          return { ...s, ...studentData };
        }
        return s;
      });
      const nextState = logActivity(`Modified profile credentials for student registry ${studentData.name}`, 'success', {
        ...appState,
        allStudents: nextAllStudents
      });
      saveState(nextState);
    } else {
      // Register
      const newId = `STD-${Math.floor(1000 + Math.random() * 9000)}`;
      const newStudent = {
        id: newId,
        password: `${studentData.name.toLowerCase().split(' ')[0]}123`,
        ...studentData
      };
      nextAllStudents.push(newStudent);

      // Seed student registers in course registries
      let nextAttendanceDb = { ...appState.attendanceDb };
      Object.keys(nextAttendanceDb).forEach(cCode => {
        nextAttendanceDb[cCode].push({
          rollNo: studentData.rollNo,
          name: studentData.name,
          dept: studentData.dept,
          attended: Math.round(30 * (studentData.attendance / 100)),
          conducted: 30
        });
      });

      const nextState = logActivity(`Registered new student profile: ${studentData.name}`, 'success', {
        ...appState,
        allStudents: nextAllStudents,
        attendanceDb: nextAttendanceDb
      });
      saveState(nextState);
    }
  };

  const removeStudent = (studentId) => {
    const student = appState.allStudents.find(s => s.id === studentId);
    if (!student) return;

    const nextAllStudents = appState.allStudents.filter(s => s.id !== studentId);
    
    // Clear from attendance logs
    let nextAttendanceDb = { ...appState.attendanceDb };
    Object.keys(nextAttendanceDb).forEach(cCode => {
      nextAttendanceDb[cCode] = nextAttendanceDb[cCode].filter(s => s.rollNo !== student.rollNo);
    });

    const nextState = {
      ...appState,
      allStudents: nextAllStudents,
      attendanceDb: nextAttendanceDb
    };

    const stateWithLog = logActivity(`Removed student registration: ${student.name}`, 'danger', nextState);
    saveState(stateWithLog);
  };

  const registerFaculty = (facultyData) => {
    let nextFaculties = [...appState.faculties];

    if (facultyData.id) {
      // Modify
      nextFaculties = nextFaculties.map(f => {
        if (f.id === facultyData.id) {
          return { ...f, ...facultyData };
        }
        return f;
      });
      const nextState = logActivity(`Updated Professor coursework details: ${facultyData.name}`, 'info', {
        ...appState,
        faculties: nextFaculties
      });
      saveState(nextState);
    } else {
      // Register
      const newId = `FAC-${Math.floor(100 + Math.random() * 900)}`;
      const newFac = {
        id: newId,
        password: `faculty123`,
        ...facultyData
      };
      nextFaculties.push(newFac);
      const nextState = logActivity(`Appointed new Senior Professor: ${facultyData.name}`, 'success', {
        ...appState,
        faculties: nextFaculties
      });
      saveState(nextState);
    }
  };

  const removeFaculty = (facultyId) => {
    const fac = appState.faculties.find(f => f.id === facultyId);
    if (!fac) return;

    const nextFac = appState.faculties.filter(f => f.id !== facultyId);
    const nextState = {
      ...appState,
      faculties: nextFac
    };

    const stateWithLog = logActivity(`Removed Professor credentials: ${fac.name}`, 'danger', nextState);
    saveState(stateWithLog);
  };

  const registerDept = (deptData) => {
    const exists = appState.departments.some(d => d.code === deptData.code.toUpperCase());
    if (exists) return { success: false, message: 'Department code already exists!' };

    const nextState = {
      ...appState,
      departments: [...appState.departments, { code: deptData.code.toUpperCase(), name: deptData.name }]
    };

    const stateWithLog = logActivity(`Created Department branch: ${deptData.name} (${deptData.code.toUpperCase()})`, 'success', nextState);
    saveState(stateWithLog);
    return { success: true };
  };

  const removeDept = (code) => {
    const dept = appState.departments.find(d => d.code === code);
    if (!dept) return;

    const nextState = {
      ...appState,
      departments: appState.departments.filter(d => d.code !== code)
    };

    const stateWithLog = logActivity(`Deleted department branch: ${dept.name}`, 'danger', nextState);
    saveState(stateWithLog);
  };

  const registerCourse = (courseData) => {
    const exists = appState.allCourses.some(c => c.code === courseData.code.toUpperCase());
    if (exists) return { success: false, message: 'Course code already exists!' };

    const newCrs = {
      code: courseData.code.toUpperCase(),
      name: courseData.name,
      credits: parseInt(courseData.credits, 10),
      dept: courseData.dept,
      prof: courseData.prof
    };

    let nextAttendanceDb = { ...appState.attendanceDb };
    // Initialize student registers in the course attendance db
    nextAttendanceDb[newCrs.code] = appState.allStudents.map(s => ({
      rollNo: s.rollNo,
      name: s.name,
      dept: s.dept,
      attended: 35,
      conducted: 40
    }));

    const nextState = {
      ...appState,
      allCourses: [...appState.allCourses, newCrs],
      attendanceDb: nextAttendanceDb
    };

    const stateWithLog = logActivity(`Added academic course syllabus: ${courseData.name} (${courseData.code.toUpperCase()})`, 'success', nextState);
    saveState(stateWithLog);
    return { success: true };
  };

  const removeCourse = (code) => {
    const course = appState.allCourses.find(c => c.code === code);
    if (!course) return;

    const nextCourses = appState.allCourses.filter(c => c.code !== code);
    let nextAttendanceDb = { ...appState.attendanceDb };
    delete nextAttendanceDb[code];

    const nextState = {
      ...appState,
      allCourses: nextCourses,
      attendanceDb: nextAttendanceDb
    };

    const stateWithLog = logActivity(`Removed Course syllabus: ${course.name}`, 'danger', nextState);
    saveState(stateWithLog);
  };

  // Notices Announcement
  const postNotice = (noticeData) => {
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newNotice = {
      id: `not-${Math.floor(1000 + Math.random() * 9000)}`,
      category: noticeData.category,
      date: todayStr,
      title: noticeData.title,
      desc: noticeData.desc
    };

    const nextState = {
      ...appState,
      notices: [newNotice, ...appState.notices]
    };

    const stateWithLog = logActivity(`Broadcasted campus announcement circular: ${noticeData.title}`, 'info', nextState);
    saveState(stateWithLog);
  };

  const deleteNotice = (noticeId) => {
    const notice = appState.notices.find(n => n.id === noticeId);
    if (!notice) return;

    const nextState = {
      ...appState,
      notices: appState.notices.filter(n => n.id !== noticeId)
    };

    const stateWithLog = logActivity(`Removed announcement circular: ${notice.title}`, 'danger', nextState);
    saveState(stateWithLog);
  };

  return (
    <StateContext.Provider value={{
      appState,
      currentUser,
      login,
      logout,
      signup,
      submitApplication,
      updateProfile,
      submitAssignment,
      payFees,
      gradeAssignment,
      adjustAttendance,
      addLectureSession,
      registerStudent,
      removeStudent,
      registerFaculty,
      removeFaculty,
      registerDept,
      removeDept,
      registerCourse,
      removeCourse,
      postNotice,
      deleteNotice,
      reseedDatabase
    }}>
      {children}
    </StateContext.Provider>
  );
};
