import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Compound/Navbar';
import Footer from '../Compound/Footer';
import { useAppState } from '../Compound/StateContext';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement 
} from 'chart.js';
import '../Asset/CSS/style.css';
import '../Asset/CSS/admin.css';
import developerImg from '../Asset/Images/developer.jpeg';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function AdminDashboard() {
  const { 
    appState, currentUser, registerStudent, removeStudent, registerFaculty, removeFaculty,
    registerDept, removeDept, registerCourse, removeCourse, postNotice, deleteNotice, reseedDatabase,
    clearNotification
  } = useAppState();
  
  const navigate = useNavigate();

  // Active Tab pane control state
  const [activePane, setActivePane] = useState('dash');

  // Search queries state
  const [studentSearch, setStudentSearch] = useState('');
  const [facultySearch, setFacultySearch] = useState('');

  // Theme state
  const [theme, setTheme] = useState('light');

  // Administrator Profile state
  const [adminProfile, setAdminProfile] = useState(() => {
    try {
      const currentEmail = JSON.parse(localStorage.getItem('currentUser'))?.email || 'admin@edumanage.com';
      const stored = localStorage.getItem(`admin_profile_${currentEmail}`);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    
    let defaultEmail = 'admin@edumanage.com';
    let defaultName = 'Danushkumar';
    try {
      const currentUserObj = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUserObj && currentUserObj.email) {
        defaultEmail = currentUserObj.email;
        defaultName = currentUserObj.name || (defaultEmail.includes('suryasekar') ? 'Suryasekar' : 'Danushkumar');
      }
    } catch (e) {}

    return {
      name: defaultName,
      email: defaultEmail,
      phone: '+91 99999 88888',
      office: 'Central ERP Command Center, Tech Block 1',
      role: 'Full Stack Developer'
    };
  });



  // Modals state
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [studentForm, setStudentForm] = useState({ id: '', name: '', rollNo: '', dept: '', year: '2', semester: 4, email: '', phone: '', attendance: 85 });

  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [facultyForm, setFacultyForm] = useState({ id: '', name: '', dept: '', subject: '', email: '', phone: '', password: '' });

  const [showDeptModal, setShowDeptModal] = useState(false);
  const [deptForm, setDeptForm] = useState({ code: '', name: '' });

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({ code: '', name: '', credits: 4, dept: '', prof: '' });

  const [showResultModal, setShowResultModal] = useState(false);
  const [resultForm, setResultForm] = useState({ rollNo: '2024CSE1042', courseCode: 'CS201', midTerm: 'A', endTerm: 'A+' });
  const [showAppModal, setShowAppModal] = useState(false);

  // Retrieve the application details, falling back to localStorage or mock fallback if missing
  const lastAppDetails = appState.lastApplication || (() => {
    try {
      const stored = localStorage.getItem('applicationData');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    // Complete fallback if both are missing to guarantee no crashes
    return {
      studentName: "Danushkumar",
      registerNumber: "2024CSE1042",
      department: "CSE",
      year: "2nd Year (Sem 4)",
      dob: "2004-08-12",
      gender: "Male",
      bloodGroup: "O+",
      nationality: "Indian",
      applicationEmail: "danushkumar@edumanage.com",
      address: "123, Dynamic Heights, Tech City, Bangalore, 560001",
      parentMobile: "+91 98765 43219",
      fatherName: "Suresh Kumar",
      fatherOccupation: "Engineer",
      fatherMobile: "+91 98765 11111",
      motherName: "Kavitha Devi",
      motherOccupation: "Homemaker",
      motherMobile: "+91 98765 55555"
    };
  })();

  // Notice circular state
  const [circularForm, setCircularForm] = useState({ subject: '', category: 'academic', desc: '' });

  // Reports state
  const [reportType, setReportType] = useState('students');
  const [reportFormat, setReportFormat] = useState('print');
  const [reportHTML, setReportHTML] = useState('');

  // System password state
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });

  // Toast state
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showToast, setShowToast] = useState(false);

  // Sync theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }, []);

  // Auth Guard
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser || !appState) return null;

  const triggerToast = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  // Metrics calculators
  const studentsCount = appState.allStudents?.length || 0;
  const facultyCount = appState.faculties?.length || 0;
  const deptsCount = appState.departments?.length || 0;
  const coursesCount = appState.allCourses?.length || 0;
  const globalAttSum = (appState.allStudents || []).reduce((sum, s) => sum + s.attendance, 0);
  const globalAttAvg = studentsCount > 0 ? (globalAttSum / studentsCount).toFixed(1) : '85.0';

  // Toggle Theme settings
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    triggerToast('Visual theme settings adjusted contextually!');
  };

  // Student CRUD triggers
  const openStudentOverlay = (id = '') => {
    if (id) {
      const s = appState.allStudents.find(st => st.id === id);
      if (s) {
        setStudentForm({ ...s });
      }
    } else {
      setStudentForm({ id: '', name: '', rollNo: '', dept: appState.departments[0]?.code || 'CSE', year: '2', semester: 4, email: '', phone: '', attendance: 85 });
    }
    setShowStudentModal(true);
  };

  const handleStudentFormSubmit = (e) => {
    e.preventDefault();
    registerStudent(studentForm);
    setShowStudentModal(false);
    triggerToast('Student database records updated successfully!');
  };

  const handleRemoveStudent = (id) => {
    const s = appState.allStudents.find(st => st.id === id);
    if (s && confirm(`Are you sure you want to remove Student ${s.name}?`)) {
      removeStudent(id);
      triggerToast(`Removed student ${s.name} from records.`, 'danger');
    }
  };

  // Faculty CRUD triggers
  const openFacultyOverlay = (id = '') => {
    if (id) {
      const f = appState.faculties.find(fa => fa.id === id);
      if (f) {
        setFacultyForm({ ...f, password: f.password || 'faculty123' });
      }
    } else {
      setFacultyForm({ id: '', name: '', dept: appState.departments[0]?.code || 'CSE', subject: appState.allCourses[0]?.name || 'Database Management Systems', email: '', phone: '', password: 'faculty123' });
    }
    setShowFacultyModal(true);
  };

  const handleFacultyFormSubmit = (e) => {
    e.preventDefault();
    registerFaculty(facultyForm);
    setShowFacultyModal(false);
    triggerToast('Faculty database records updated successfully!');
  };

  const handleRemoveFaculty = (id) => {
    const f = appState.faculties.find(fa => fa.id === id);
    if (f && confirm(`Are you sure you want to delete Professor ${f.name}?`)) {
      removeFaculty(id);
      triggerToast(`Removed Professor ${f.name} credentials.`, 'danger');
    }
  };

  // Departments CRUD
  const handleDeptFormSubmit = async (e) => {
    e.preventDefault();
    const res = await registerDept(deptForm);
    if (res.success) {
      setShowDeptModal(false);
      setDeptForm({ code: '', name: '' });
      triggerToast(`Configured department branch successfully.`);
    } else {
      alert(res.message);
    }
  };

  const handleRemoveDept = (code) => {
    const d = appState.departments.find(dp => dp.code === code);
    if (d && confirm(`Are you sure you want to delete department branch: ${d.name}?`)) {
      removeDept(code);
      triggerToast(`Removed department ${d.name}.`, 'danger');
    }
  };

  // Courses CRUD
  const openCourseOverlay = () => {
    setCourseForm({
      code: '',
      name: '',
      credits: 4,
      dept: appState.departments[0]?.code || 'CSE',
      prof: appState.faculties[0]?.name || 'Dr. Suresh Kumar'
    });
    setShowCourseModal(true);
  };

  const handleCourseFormSubmit = async (e) => {
    e.preventDefault();
    const res = await registerCourse(courseForm);
    if (res.success) {
      setShowCourseModal(false);
      triggerToast(`Added course syllabus successfully!`);
    } else {
      alert(res.message);
    }
  };

  const handleRemoveCourse = (code) => {
    const c = appState.allCourses.find(crs => crs.code === code);
    if (c && confirm(`Are you sure you want to remove course syllabus ${c.name}?`)) {
      removeCourse(code);
      triggerToast(`Removed course syllabus ${c.name}.`, 'danger');
    }
  };

  // Results publish CRUD
  const openResultOverlay = (courseCode) => {
    setResultForm({
      rollNo: appState.allStudents[0]?.rollNo || '2024CSE1042',
      courseCode: courseCode || appState.allCourses[0]?.code || 'CS201',
      midTerm: 'A',
      endTerm: 'A+'
    });
    setShowResultModal(true);
  };

  const handleResultFormSubmit = (e) => {
    e.preventDefault();
    const { rollNo, courseCode, midTerm, endTerm } = resultForm;
    let gp = 10;
    if (endTerm === 'A') gp = 9;
    else if (endTerm === 'B+') gp = 8;
    else if (endTerm === 'B') gp = 7;
    else if (endTerm === 'C') gp = 6;

    // Trigger update in Context
    const nextDetails = appState.grades.details.map(g => {
      if (g.code === courseCode && rollNo === "2024CSE1042") {
        return { ...g, midTerm, endTerm, gp };
      }
      return g;
    });

    const totalGPs = nextDetails.reduce((sum, item) => sum + item.gp, 0);
    const avgGP = (totalGPs / nextDetails.length).toFixed(2);
    appState.grades.details = nextDetails;
    appState.grades.semesterGpas[3] = parseFloat(avgGP);
    
    // Save to State
    appState.activityLogs.unshift({
      id: `act-${Math.floor(1000 + Math.random() * 9000)}`,
      task: `Uploaded midterm (${midTerm}) and final grade (${endTerm}) score for Danushkumar in ${courseCode}`,
      user: "Admin AD-901",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: 'success'
    });
    localStorage.setItem('edumanage_state', JSON.stringify(appState));

    setShowResultModal(false);
    triggerToast('Student scored scorecard published successfully!');
  };

  // Posting Circular announcements
  const handleNoticePostSubmit = (e) => {
    e.preventDefault();
    if (!circularForm.subject || !circularForm.desc) {
      alert('Please fill in both the circular subject title and details description fields.');
      return;
    }
    postNotice({
      title: circularForm.subject,
      category: circularForm.category,
      desc: circularForm.desc
    });
    setCircularForm({ subject: '', category: 'academic', desc: '' });
    triggerToast('Announcement circular published globally!');
  };

  const handleNoticeClear = (id) => {
    const notice = appState.notices.find(n => n.id === id);
    if (notice && confirm(`Delete circular announcement: ${notice.title}?`)) {
      deleteNotice(id);
      triggerToast('Circular announcement removed.');
    }
  };

  // Systems settings updates
  const handlePasswordFormSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.current !== 'admin@1') {
      triggerToast('Invalid current password details provided!', 'danger');
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      triggerToast('Confirmed passwords do not match!', 'danger');
      return;
    }
    triggerToast('System Admin password successfully updated!', 'success');
    setPasswordForm({ current: '', next: '', confirm: '' });
  };

  const handleAdminProfileSubmit = (e) => {
    e.preventDefault();
    const currentEmail = currentUser?.email || adminProfile.email || 'admin@edumanage.com';
    localStorage.setItem(`admin_profile_${currentEmail}`, JSON.stringify(adminProfile));
    triggerToast('Administrator profile settings saved successfully!');

    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };


  const handleSystemReseedTrigger = () => {
    if (confirm('Are you sure you want to clear system records and reseed to initial defaults?')) {
      reseedDatabase();
      triggerToast('System records successfully reseeded to initial defaults!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  // Reports Generation Engine
  const generateReports = () => {
    if (reportFormat === 'print') {
      let html = `<div style="background:#fff; color:#000; padding:25px; border-radius:8px; border:1px solid #ddd; font-family:Courier New, monospace;">`;
      html += `<div style="text-align:center; border-bottom:2px double #000; padding-bottom:15px; margin-bottom:20px;">`;
      html += `<h2 style="margin:0; font-weight:bold; font-size:20px;">EDUMANAGE COLLEGE ERP SYSTEM</h2>`;
      html += `<p style="margin:5px 0 0; font-size:12px;">Central Report &bull; Compiled: ${new Date().toLocaleString()}</p>`;
      html += `</div>`;

      if (reportType === 'students') {
        html += `<h4>OFFICIAL STUDENT REGISTRATION ROSTER</h4>`;
        html += `<table style="width:100%; border-collapse:collapse; margin-top:15px; font-size:12px;" border="1">`;
        html += `<thead><tr><th>ID</th><th>Name</th><th>Roll Number</th><th>Department</th><th>Attendance</th></tr></thead><tbody>`;
        appState.allStudents.forEach(s => {
          html += `<tr><td>${s.id}</td><td>${s.name}</td><td>${s.rollNo}</td><td>${s.dept}</td><td>${s.attendance}%</td></tr>`;
        });
        html += `</tbody></table>`;
      }
      else if (reportType === 'faculty') {
        html += `<h4>OFFICIAL FACULTY ROSTER</h4>`;
        html += `<table style="width:100%; border-collapse:collapse; margin-top:15px; font-size:12px;" border="1">`;
        html += `<thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Assigned Coursework</th><th>Phone</th></tr></thead><tbody>`;
        appState.faculties.forEach(f => {
          html += `<tr><td>${f.id}</td><td>${f.name}</td><td>${f.dept}</td><td>${f.subject}</td><td>${f.phone}</td></tr>`;
        });
        html += `</tbody></table>`;
      }
      else if (reportType === 'attendance') {
        html += `<h4>GLOBAL ATTENDANCE REGISTRIES</h4>`;
        html += `<table style="width:100%; border-collapse:collapse; margin-top:15px; font-size:12px;" border="1">`;
        html += `<thead><tr><th>Student Roll</th><th>Student Name</th><th>Course</th><th>Attendance %</th></tr></thead><tbody>`;
        appState.allStudents.forEach(s => {
          html += `<tr><td>${s.rollNo}</td><td>${s.name}</td><td>CS-Global</td><td>${s.attendance}%</td></tr>`;
        });
        html += `</tbody></table>`;
      }
      else if (reportType === 'results') {
        html += `<h4>ACADEMIC RESULTS TRANSLATION</h4>`;
        html += `<table style="width:100%; border-collapse:collapse; margin-top:15px; font-size:12px;" border="1">`;
        html += `<thead><tr><th>Roll Number</th><th>Subject Code</th><th>Midterm</th><th>Endterm Grade</th><th>Grade Points</th></tr></thead><tbody>`;
        appState.grades.details.forEach(g => {
          html += `<tr><td>2024CSE1042</td><td>${g.code}</td><td>${g.midTerm}</td><td>${g.endTerm}</td><td>${g.gp}/10</td></tr>`;
        });
        html += `</tbody></table>`;
      }
      else if (reportType === 'departments') {
        html += `<h4>DEPARTMENT BRANCH REGISTRIES</h4>`;
        html += `<table style="width:100%; border-collapse:collapse; margin-top:15px; font-size:12px;" border="1">`;
        html += `<thead><tr><th>Code</th><th>Department Name</th><th>Appointed Faculty</th></tr></thead><tbody>`;
        appState.departments.forEach(d => {
          const fCount = appState.faculties.filter(f => f.dept === d.code).length;
          html += `<tr><td>${d.code}</td><td>${d.name}</td><td>${fCount} Profs</td></tr>`;
        });
        html += `</tbody></table>`;
      }

      html += `<div style="margin-top:25px; text-align:right; font-size:11px;">End of Central Audit. Certified System Admin.</div>`;
      html += `</div>`;

      setReportHTML(html);
    } 
    else if (reportFormat === 'csv') {
      let csv = 'Student ID,Name,Roll Number,Department,Semester,Attendance\r\n';
      
      if (reportType === 'students') {
        appState.allStudents.forEach(s => {
          csv += `"${s.id}","${s.name}","${s.rollNo}","${s.dept}","${s.semester}","${s.attendance}%"\r\n`;
        });
      }
      else if (reportType === 'faculty') {
        csv = 'Faculty ID,Professor Name,Department,Subject,Email,Phone\r\n';
        appState.faculties.forEach(f => {
          csv += `"${f.id}","${f.name}","${f.dept}","${f.subject}","${f.email}","${f.phone}"\r\n`;
        });
      }
      else if (reportType === 'attendance') {
        csv = 'Roll Number,Student Name,Subject Code,Attendance Ratio\r\n';
        appState.allStudents.forEach(s => {
          csv += `"${s.rollNo}","${s.name}","CS-Global","${s.attendance}%"\r\n`;
        });
      }
      else if (reportType === 'results') {
        csv = 'Roll Number,Subject Code,Midterm,Endterm Grade,Grade Point\r\n';
        appState.grades.details.forEach(g => {
          csv += `"2024CSE1042","${g.code}","${g.midTerm}","${g.endTerm}","${g.gp}"\r\n`;
        });
      }
      else if (reportType === 'departments') {
        csv = 'Department Code,Department Name\r\n';
        appState.departments.forEach(d => {
          csv += `"${d.code}","${d.name}"\r\n`;
        });
      }

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `EduManage_${reportType}_Report.csv`;
      link.click();
      
      triggerToast('Raw CSV ledger sheet exported successfully!');
      setReportHTML(`
        <div class="text-center py-5 text-success">
          <i class="fa-solid fa-circle-check" style="font-size:32px; margin-bottom:10px;"></i>
          <p style="font-weight:bold; font-size:13px; margin:0;">EduManage_${reportType}_Report.csv generated and downloaded!</p>
        </div>
      `);
    }
  };

  // Chart Data setups
  const isDark = theme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#4b5563';
  const gridColor = isDark ? '#1e293b' : '#e5e7eb';
  const barColor = isDark ? '#3b82f6' : '#0026ff';

  const barChartData = {
    labels: ['DBMS', 'OS', 'Algorithms', 'Maths IV', 'Web Tech'],
    datasets: [{
      label: 'Average Attendance %',
      data: [86, 72, 92, 80, 95],
      backgroundColor: barColor,
      borderRadius: 6
    }]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: isDark ? '#1e293b' : '#0f172a' }
    },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: textColor } },
      y: { min: 0, max: 100, grid: { color: gridColor }, ticks: { color: textColor } }
    }
  };

  // Compute counts per department
  const cseCount = appState.allStudents.filter(s => s.dept === 'CSE').length;
  const eceCount = appState.allStudents.filter(s => s.dept === 'ECE').length;
  const meCount = appState.allStudents.filter(s => s.dept === 'ME').length;
  const ceCount = appState.allStudents.filter(s => s.dept === 'CE').length;

  const pieChartData = {
    labels: ['CSE', 'ECE', 'ME', 'CE'],
    datasets: [{
      data: [cseCount, eceCount || 1, meCount || 1, ceCount || 0],
      backgroundColor: ['#3b82f6', '#10b981', '#fbbf24', '#f87171'],
      borderWidth: isDark ? 2 : 1,
      borderColor: isDark ? '#131b2e' : '#fff'
    }]
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { color: textColor, font: { family: 'Outfit', weight: '600' } }
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-container">
        
        {/* Welcome Banner block */}
        <div className="admin-welcome-banner">
          <div>
            <h2>Welcome Back, <span id="admin-welcome-name">{adminProfile.name}</span>!</h2>
            <p>Role: <strong>{adminProfile.role}</strong> &bull; Console ID: <strong>AD-901</strong></p>
          </div>
          
          <div className="admin-banner-stats">
            <div className="banner-stat-box">
              <h4>{studentsCount}</h4>
              <p>Total Students</p>
            </div>
            <div className="banner-stat-box">
              <h4>{facultyCount}</h4>
              <p>Total Faculty</p>
            </div>
            <div className="banner-stat-box">
              <h4>{deptsCount}</h4>
              <p>Departments</p>
            </div>
            <div className="banner-stat-box">
              <h4>{coursesCount}</h4>
              <p>Total Courses</p>
            </div>
            <div className="banner-stat-box">
              <h4>{globalAttAvg}%</h4>
              <p>Att Average</p>
            </div>
          </div>
        </div>

        {/* Admin Notifications Banner */}
        {appState.adminNotification && (
          <div 
            className="admin-alert-banner" 
            style={{ background: '#e0e7ff', borderLeft: '6px solid #0026ff', padding: '15px 20px', borderRadius: '12px', margin: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0, 38, 255, 0.05)', cursor: 'pointer' }}
            onClick={() => setShowAppModal(true)}
            title="Click to view full application details"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>🔔</span>
              <div>
                <strong style={{ color: '#0026ff', fontSize: '14px', display: 'block', fontWeight: 'bold' }}>Admission Notification (Click to View Details)</strong>
                <span style={{ fontSize: '13px', color: '#1e293b' }}>{appState.adminNotification}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button 
                className="admin-btn"
                style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', fontWeight: 'bold' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAppModal(true);
                }}
              >
                View Details
              </button>
              <button 
                className="admin-btn-outline-sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  clearNotification();
                }}
                style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', fontWeight: 'bold', background: '#ffffff', color: '#0026ff', border: '1.5px solid #dbe2ff' }}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Theme and quit utility bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px' }}>
          <Link to="/"><button className="admin-btn" style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 'bold' }}><i className="fa-solid fa-right-from-bracket"></i> Quit ERP</button></Link>
        </div>

        {/* Horizontal Navigation Pills Deck */}
        <div className="admin-nav-pills" style={{ display: 'flex', gap: '8px', marginBottom: '25px', borderBottom: '2px solid var(--admin-border)', paddingBottom: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className={`admin-pill-btn ${activePane === 'dash' ? 'active' : ''}`} onClick={() => setActivePane('dash')}><i className="fa-solid fa-chart-line"></i> Dashboard</button>
          <button className={`admin-pill-btn ${activePane === 'students' ? 'active' : ''}`} onClick={() => setActivePane('students')}><i className="fa-solid fa-user-graduate"></i> Students</button>
          <button className={`admin-pill-btn ${activePane === 'faculty' ? 'active' : ''}`} onClick={() => setActivePane('faculty')}><i className="fa-solid fa-chalkboard-user"></i> Faculty</button>
          <button className={`admin-pill-btn ${activePane === 'departments' ? 'active' : ''}`} onClick={() => setActivePane('departments')}><i className="fa-solid fa-school"></i> Departments</button>
          <button className={`admin-pill-btn ${activePane === 'courses' ? 'active' : ''}`} onClick={() => setActivePane('courses')}><i className="fa-solid fa-book"></i> Courses</button>
          <button className={`admin-pill-btn ${activePane === 'attendance' ? 'active' : ''}`} onClick={() => setActivePane('attendance')}><i className="fa-solid fa-calendar-check"></i> Attendance</button>
          <button className={`admin-pill-btn ${activePane === 'results' ? 'active' : ''}`} onClick={() => setActivePane('results')}><i className="fa-solid fa-square-poll-vertical"></i> Results</button>
          <button className={`admin-pill-btn ${activePane === 'announcements' ? 'active' : ''}`} onClick={() => setActivePane('announcements')}><i className="fa-solid fa-bullhorn"></i> Announcements</button>
          <button className={`admin-pill-btn ${activePane === 'reports' ? 'active' : ''}`} onClick={() => setActivePane('reports')}><i className="fa-solid fa-print"></i> Reports</button>
          <button className={`admin-pill-btn ${activePane === 'profile' ? 'active' : ''}`} onClick={() => setActivePane('profile')}><i className="fa-solid fa-user-shield"></i> Profile</button>
          <button className={`admin-pill-btn ${activePane === 'settings' ? 'active' : ''}`} onClick={() => setActivePane('settings')}><i className="fa-solid fa-gears"></i> Settings</button>
        </div>

        {/* Central Panes */}

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activePane === 'dash' && (
          <div className="admin-pane active" id="pane-dash">


              {/* Chart widgets */}
              <div className="admin-charts-grid" style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '20px', margin: '20px 0' }}>
                <div className="admin-card" style={{ height: '320px' }}>
                  <h4 style={{ fontWeight: 'bold', fontSize: '15px', color: 'var(--admin-text)', marginBottom: '15px' }}>Subject-wise Attendance Ratios (%)</h4>
                  <div style={{ height: '240px', position: 'relative' }}>
                    <Bar data={barChartData} options={barChartOptions} />
                  </div>
                </div>
                <div className="admin-card" style={{ height: '320px' }}>
                  <h4 style={{ fontWeight: 'bold', fontSize: '15px', color: 'var(--admin-text)', marginBottom: '15px' }}>Student Distributions per Dept</h4>
                  <div style={{ height: '240px', position: 'relative' }}>
                    <Pie data={pieChartData} options={pieChartOptions} />
                  </div>
                </div>
              </div>

              {/* Logs */}
              <div className="admin-card">
                <div className="admin-card-header"><h4>System Audit Activity Log</h4></div>
                <div className="log-container" id="activity-log-container">
                  {appState.activityLogs.slice(0, 5).map(log => {
                    let logColor = '#0026ff';
                    if (log.type === 'success') logColor = '#10b981';
                    else if (log.type === 'danger') logColor = '#ef4444';
                    else if (log.type === 'warning') logColor = '#f59e0b';

                    return (
                      <div key={log.id} className="log-item" style={{ borderLeftColor: logColor }}>
                        <div style={{ fontWeight: 'bold' }}>{log.task}</div>
                        <div className="log-time">{log.date} &bull; Auth: {log.user}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENTS REGISTRY */}
          {activePane === 'students' && (
            <div className="admin-pane active" id="pane-students">
              <div className="admin-card">
                <div className="admin-card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <h4>Authorized Students Database Registry</h4>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="Search Students Roster..." 
                      value={studentSearch}
                      onChange={e => setStudentSearch(e.target.value)}
                      style={{ padding: '6px 12px', border: '1px solid var(--admin-border)', borderRadius: '4px', background: 'var(--admin-bg)', color: 'var(--admin-text)', fontSize: '13px' }}
                    />
                    <button className="admin-btn" onClick={() => openStudentOverlay()}><i className="fa-solid fa-user-plus"></i> Register Student</button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Roll Number</th>
                        <th>Department</th>
                        <th>Year & Sem</th>
                        <th>Email Address</th>
                        <th>Mobile Number</th>
                        <th>Attendance</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appState.allStudents
                        .filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.rollNo.toLowerCase().includes(studentSearch.toLowerCase()) || s.dept.toLowerCase().includes(studentSearch.toLowerCase()))
                        .map(s => (
                          <tr key={s.id}>
                            <td><strong>{s.id}</strong></td>
                            <td>{s.name}</td>
                            <td><strong>{s.rollNo}</strong></td>
                            <td>{s.dept}</td>
                            <td>Year {s.year} &bull; Sem {s.semester}</td>
                            <td>{s.email}</td>
                            <td>{s.phone}</td>
                            <td><strong>{s.attendance}%</strong></td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                <button className="admin-btn-outline-sm" onClick={() => openStudentOverlay(s.id)}><i className="fa-solid fa-pen-to-square"></i> Edit</button>
                                <button className="admin-btn-danger-sm" onClick={() => handleRemoveStudent(s.id)}><i className="fa-solid fa-trash"></i></button>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FACULTY ROSTER */}
          {activePane === 'faculty' && (
            <div className="admin-pane active" id="pane-faculty">
              <div className="admin-card">
                <div className="admin-card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <h4>Appointed Senior Professor Credentials</h4>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="Search Professor Roster..." 
                      value={facultySearch}
                      onChange={e => setFacultySearch(e.target.value)}
                      style={{ padding: '6px 12px', border: '1px solid var(--admin-border)', borderRadius: '4px', background: 'var(--admin-bg)', color: 'var(--admin-text)', fontSize: '13px' }}
                    />
                    <button className="admin-btn" onClick={() => openFacultyOverlay()}><i className="fa-solid fa-user-plus"></i> Appoint Professor</button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Faculty ID</th>
                        <th>Professor Name</th>
                        <th>Department</th>
                        <th>Assigned Subject</th>
                        <th>Email Address</th>
                        <th>Contact Number</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appState.faculties
                        .filter(f => f.name.toLowerCase().includes(facultySearch.toLowerCase()) || f.dept.toLowerCase().includes(facultySearch.toLowerCase()) || f.subject.toLowerCase().includes(facultySearch.toLowerCase()))
                        .map(f => (
                          <tr key={f.id}>
                            <td><strong>{f.id}</strong></td>
                            <td>{f.name}</td>
                            <td>{f.dept}</td>
                            <td><span className="admin-badge admin-badge-success">{f.subject}</span></td>
                            <td>{f.email}</td>
                            <td>{f.phone}</td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                <button className="admin-btn-outline-sm" onClick={() => openFacultyOverlay(f.id)}><i className="fa-solid fa-pen-to-square"></i> Assign</button>
                                <button className="admin-btn-danger-sm" onClick={() => handleRemoveFaculty(f.id)}><i className="fa-solid fa-trash"></i></button>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DEPARTMENTS */}
          {activePane === 'departments' && (
            <div className="admin-pane active" id="pane-departments">
              <div className="admin-card">
                <div className="admin-card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <h4>Department Branches</h4>
                  <button className="admin-btn" onClick={() => setShowDeptModal(true)}><i className="fa-solid fa-folder-plus"></i> Create Branch</button>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Branch Code</th>
                        <th>Department Name</th>
                        <th>Active Syllabi</th>
                        <th>Registered Students</th>
                        <th>Appointed Professors</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appState.departments.map(d => {
                        const studCount = appState.allStudents.filter(s => s.dept === d.code).length;
                        const facCount = appState.faculties.filter(f => f.dept === d.code).length;
                        const crsCount = appState.allCourses.filter(c => c.dept === d.code).length;

                        return (
                          <tr key={d.code}>
                            <td><strong>{d.code}</strong></td>
                            <td>{d.name}</td>
                            <td>{crsCount} active course syllabi</td>
                            <td>{studCount} students registered</td>
                            <td>{facCount} appointed faculty</td>
                            <td style={{ textAlign: 'right' }}>
                              <button className="admin-btn-danger-sm" onClick={() => handleRemoveDept(d.code)}><i className="fa-solid fa-trash"></i> Delete</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COURSE SYLLABI */}
          {activePane === 'courses' && (
            <div className="admin-pane active" id="pane-courses">
              <div className="admin-card">
                <div className="admin-card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <h4>Curriculum Course Syllabus</h4>
                  <button className="admin-btn" onClick={openCourseOverlay}><i className="fa-solid fa-plus"></i> Add Course</button>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Course Code</th>
                        <th>Course Title</th>
                        <th>Credits</th>
                        <th>Department Branch</th>
                        <th>Course Lecturer</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appState.allCourses.map(c => (
                        <tr key={c.code}>
                          <td><strong>{c.code}</strong></td>
                          <td>{c.name}</td>
                          <td>{c.credits} Credits</td>
                          <td>{c.dept}</td>
                          <td><span className="admin-badge admin-badge-success">{c.prof}</span></td>
                          <td style={{ textAlign: 'right' }}>
                            <button className="admin-btn-danger-sm" onClick={() => handleRemoveCourse(c.code)}><i className="fa-solid fa-trash"></i> Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ATTENDANCE AUDIT */}
          {activePane === 'attendance' && (
            <div className="admin-pane active" id="pane-attendance">
              <div className="row">
                {/* Low Attendance Alarms */}
                <div className="col-12 col-md-5 mb-4">
                  <div className="admin-card h-100" style={{ borderTop: '4px solid var(--admin-danger)' }}>
                    <div className="admin-card-header"><h4>Low Attendance Disqualification Warnings (&lt;75%)</h4></div>
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Student Roll</th>
                            <th>Name</th>
                            <th>Dept</th>
                            <th>Ratio</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appState.allStudents.filter(s => s.attendance < 75).map(s => (
                            <tr key={s.id}>
                              <td><strong>{s.rollNo}</strong></td>
                              <td>{s.name}</td>
                              <td>{s.dept}</td>
                              <td>{s.attendance}%</td>
                              <td><span className="admin-badge admin-badge-danger">Disqualified Warning</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Global logs */}
                <div className="col-12 col-md-7 mb-4">
                  <div className="admin-card h-100">
                    <div className="admin-card-header"><h4>Student Attendance Registries</h4></div>
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Student Roll</th>
                            <th>Student Name</th>
                            <th>Department</th>
                            <th>Course Load</th>
                            <th>Attendance Average</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appState.allStudents.map(s => {
                            let label = 'Regular';
                            let badge = 'admin-badge-success';
                            if (s.attendance < 75) {
                              label = 'Low Attendance';
                              badge = 'admin-badge-danger';
                            } else if (s.attendance < 85) {
                              label = 'Average';
                              badge = 'admin-badge-warning';
                            }

                            return (
                              <tr key={s.id}>
                                <td><strong>{s.rollNo}</strong></td>
                                <td>{s.name}</td>
                                <td>{s.dept}</td>
                                <td>CS-Global</td>
                                <td><strong>{s.attendance}%</strong></td>
                                <td><span className={`admin-badge ${badge}`}>{label}</span></td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: GRADES RESULTS PUBLICATION */}
          {activePane === 'results' && (
            <div className="admin-pane active" id="pane-results">
              <div className="admin-card">
                <div className="admin-card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <h4>Academic Grades Ledger Publication</h4>
                  <button className="admin-btn" onClick={() => openResultOverlay()}><i className="fa-solid fa-square-plus"></i> Upload Result Scorecard</button>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Roll Number</th>
                        <th>Student Name</th>
                        <th>Course Code</th>
                        <th>Midterm Grade</th>
                        <th>Endterm Grade</th>
                        <th>Grade Points</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appState.grades.details.map(g => (
                        <tr key={g.code}>
                          <td><strong>2024CSE1042</strong></td>
                          <td>Danushkumar</td>
                          <td><strong>{g.code}</strong></td>
                          <td>{g.midTerm}</td>
                          <td><span className="admin-badge admin-badge-success">{g.endTerm}</span></td>
                          <td><strong>{g.gp} / 10</strong></td>
                          <td style={{ textAlign: 'right' }}>
                            <button className="admin-btn-outline-sm" onClick={() => openResultOverlay(g.code)}><i className="fa-solid fa-pen-to-square"></i> Upload</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: CIRCULAR BROADCASTS */}
          {activePane === 'announcements' && (
            <div className="admin-pane active" id="pane-announcements">
              <div className="row">
                {/* Notice poster */}
                <div className="col-12 col-md-5 mb-4">
                  <div className="admin-card h-100">
                    <div className="admin-card-header"><h4>Broadcast Notice announcement</h4></div>
                    <form onSubmit={handleNoticePostSubmit}>
                      <div className="profile-group">
                        <label>Circular Subject Subj *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Campus Holiday circular"
                          value={circularForm.subject}
                          onChange={e => setCircularForm({ ...circularForm, subject: e.target.value })}
                          required 
                        />
                      </div>
                      <div className="profile-group mt-3">
                        <label>Notice Category Category *</label>
                        <select 
                          value={circularForm.category}
                          onChange={e => setCircularForm({ ...circularForm, category: e.target.value })}
                          required
                          style={{ width: '100%', padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                        >
                          <option value="academic">Academic Circular</option>
                          <option value="urgent">Urgent Notice</option>
                          <option value="exam">Examination Alert</option>
                          <option value="event">Campus Event</option>
                        </select>
                      </div>
                      <div className="profile-group mt-3">
                        <label>Detailed notice circular content *</label>
                        <textarea 
                          placeholder="Write announcement description here..."
                          value={circularForm.desc}
                          onChange={e => setCircularForm({ ...circularForm, desc: e.target.value })}
                          required
                          style={{ width: '100%', height: '100px', padding: '8px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                        />
                      </div>
                      <button className="admin-btn mt-4 w-100" type="submit"><i className="fa-solid fa-paper-plane"></i> Publish globally</button>
                    </form>
                  </div>
                </div>

                {/* Notice circular board */}
                <div className="col-12 col-md-7 mb-4">
                  <div className="admin-card h-100">
                    <div className="admin-card-header"><h4>Circular bulletin board</h4></div>
                    <div className="bulletin-list" id="admin-bulletin-list" style={{ overflowY: 'auto', maxHeight: '420px' }}>
                      {appState.notices.map(notice => {
                        const isUrgent = notice.category === 'urgent';
                        return (
                          <div key={notice.id} className={`bulletin-item ${isUrgent ? 'urgent' : ''}`}>
                            <div className="bulletin-meta">
                              <span className={`dash-badge ${isUrgent ? 'dash-badge-danger' : 'dash-badge-warning'}`}>{notice.category.toUpperCase()}</span>
                              <span>{notice.date}</span>
                            </div>
                            <h5 style={{ fontWeight: 'bold', marginTop: '6px', fontSize: '14px', marginBottom: '4px' }}>{notice.title}</h5>
                            <p style={{ fontSize: '13px', color: 'var(--admin-text-muted)', margin: 0 }}>{notice.desc}</p>
                            <div className="text-end mt-2">
                              <button className="admin-btn-danger-sm" onClick={() => handleNoticeClear(notice.id)}><i className="fa-solid fa-trash"></i> Clear notice</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: REPORTS GENERATOR */}
          {activePane === 'reports' && (
            <div className="admin-pane active" id="pane-reports">
              <div className="admin-card">
                <div className="admin-card-header"><h4>Centralized Reports Auditor</h4></div>
                <div className="row mt-2 g-3">
                  <div className="col-md-4">
                    <label style={{ display: 'block', fontWeight: 'bold', fontSize: '13px', marginBottom: '5px' }}>Roster Data Category:</label>
                    <select 
                      id="select-report-type" 
                      value={reportType}
                      onChange={e => setReportType(e.target.value)}
                      style={{ width: '100%', padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                    >
                      <option value="students">Registered Students List</option>
                      <option value="faculty">Faculty Roster List</option>
                      <option value="attendance">Student Attendance registers</option>
                      <option value="results">Academic Results scorecard</option>
                      <option value="departments">Department branches list</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label style={{ display: 'block', fontWeight: 'bold', fontSize: '13px', marginBottom: '5px' }}>Auditing Export Format:</label>
                    <select 
                      id="select-report-format" 
                      value={reportFormat}
                      onChange={e => setReportFormat(e.target.value)}
                      style={{ width: '100%', padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                    >
                      <option value="print">Show Printable Document Roster</option>
                      <option value="csv">Export Raw CSV ledger sheets</option>
                    </select>
                  </div>
                  <div className="col-md-4 d-flex align-items-end">
                    <button className="admin-btn w-100" id="btn-generate-report" onClick={generateReports} style={{ padding: '12px' }}>
                      <i className="fa-solid fa-spinner"></i> Generate official Report
                    </button>
                  </div>
                </div>

                <div className="mt-4" id="reports-printout-area">
                  {reportHTML ? (
                    <div dangerouslySetInnerHTML={{ __html: reportHTML }} />
                  ) : (
                    <div className="text-center py-5 text-muted">
                      <i className="fa-solid fa-file-invoice" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
                      <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Auditor Report view screen is empty. Select type and click Generate.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: PROFILE */}
          {activePane === 'profile' && (
            <div className="admin-pane active" id="pane-profile">
              <div className="admin-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px', marginBottom: '20px', justifyContent: 'center' }}>
                  <i className="fa-solid fa-user-shield" style={{ color: 'var(--admin-primary)', fontSize: '18px' }}></i>
                  <h4 style={{ margin: 0, fontWeight: 'bold', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Administrative Identity ID</h4>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <img 
                    src={developerImg} 
                    alt="Developer VS" 
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      border: '4px solid var(--admin-primary)',
                      objectFit: 'cover',
                      margin: '0 auto 15px',
                      display: 'block'
                    }}
                  />
                  <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--admin-text)', margin: '0 0 4px 0' }}>{adminProfile.name}</h2>
                  <p style={{ fontSize: '14px', color: 'var(--admin-text-muted)', margin: '0 0 12px 0', fontWeight: '500' }}>{adminProfile.role}</p>
                  <span className="admin-badge" style={{ backgroundColor: '#d1fae5', color: '#10b981', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                    Super Admin Role
                  </span>
                </div>

                <div className="table-responsive" style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '15px' }}>
                  <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--admin-border)' }}>
                        <td style={{ padding: '12px 0', fontWeight: '600', color: 'var(--admin-text-muted)' }}>Super Admin ID:</td>
                        <td style={{ padding: '12px 0', fontWeight: 'bold', color: 'var(--admin-text)', textAlign: 'right' }}>AD-901</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--admin-border)' }}>
                        <td style={{ padding: '12px 0', fontWeight: '600', color: 'var(--admin-text-muted)' }}>Central Email Account:</td>
                        <td style={{ padding: '12px 0', fontWeight: 'bold', color: 'var(--admin-text)', textAlign: 'right' }}>{adminProfile.email}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px 0', fontWeight: '600', color: 'var(--admin-text-muted)' }}>Contact Number:</td>
                        <td style={{ padding: '12px 0', fontWeight: 'bold', color: 'var(--admin-text)', textAlign: 'right' }}>{adminProfile.phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: SYSTEMS SETTINGS */}
          {activePane === 'settings' && (
            <div className="admin-pane active" id="pane-settings">
              
              {/* Administrator Profile Card */}
              <div className="admin-card mb-4">
                <div className="admin-card-header"><h4>Administrator Profile Information</h4></div>
                <form onSubmit={handleAdminProfileSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div className="profile-group">
                      <label>Principal Systems Administrator Name *</label>
                      <input 
                        type="text" 
                        value={adminProfile.name}
                        onChange={e => setAdminProfile({ ...adminProfile, name: e.target.value })}
                        required 
                        style={{ padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                      />
                    </div>
                    <div className="profile-group">
                      <label>Systems Role Heading *</label>
                      <input 
                        type="text" 
                        value={adminProfile.role}
                        onChange={e => setAdminProfile({ ...adminProfile, role: e.target.value })}
                        required 
                        style={{ padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                      />
                    </div>
                    <div className="profile-group">
                      <label>Support Contact Phone *</label>
                      <input 
                        type="text" 
                        value={adminProfile.phone}
                        onChange={e => setAdminProfile({ ...adminProfile, phone: e.target.value })}
                        required 
                        style={{ padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                      />
                    </div>
                    <div className="profile-group">
                      <label>Institutional Email Address *</label>
                      <input 
                        type="email" 
                        value={adminProfile.email}
                        onChange={e => setAdminProfile({ ...adminProfile, email: e.target.value })}
                        required 
                        style={{ padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                      />
                    </div>
                    <div className="profile-group" style={{ gridColumn: 'span 2' }}>
                      <label>Admin Control Office Location *</label>
                      <input 
                        type="text" 
                        value={adminProfile.office}
                        onChange={e => setAdminProfile({ ...adminProfile, office: e.target.value })}
                        required 
                        style={{ padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                      />
                    </div>
                  </div>
                  <div className="text-end mt-4">
                    <button className="admin-btn" type="submit">
                      <i className="fa-solid fa-cloud-arrow-up"></i> Save Profile Settings
                    </button>
                  </div>
                </form>
              </div>

              <div className="row">

                <div className="col-md-6 mb-4">
                  <div className="admin-card h-100">
                    <div className="admin-card-header"><h4>Update System Admin Password</h4></div>
                    <form onSubmit={handlePasswordFormSubmit}>
                      <div className="profile-group">
                        <label htmlFor="root-curr-pw">Current Password Details *</label>
                        <input 
                          type="password" 
                          id="root-curr-pw" 
                          value={passwordForm.current}
                          onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })}
                          required 
                        />
                      </div>
                      <div className="profile-group mt-3">
                        <label htmlFor="root-new-pw">New root Password *</label>
                        <input 
                          type="password" 
                          id="root-new-pw" 
                          value={passwordForm.next}
                          onChange={e => setPasswordForm({ ...passwordForm, next: e.target.value })}
                          required 
                        />
                      </div>
                      <div className="profile-group mt-3">
                        <label htmlFor="root-confirm-pw">Confirm new root password *</label>
                        <input 
                          type="password" 
                          id="root-confirm-pw" 
                          value={passwordForm.confirm}
                          onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                          required 
                        />
                      </div>
                      <button className="admin-btn mt-4 w-100" type="submit"><i className="fa-solid fa-cloud-arrow-up"></i> Modify root password</button>
                    </form>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="admin-card h-100" style={{ borderTop: '4px solid var(--admin-danger)' }}>
                    <div className="admin-card-header"><h4>Centralized DB Reseed System</h4></div>
                    <p style={{ color: 'var(--admin-text-muted)', fontSize: '13px', lineHeight: '1.7', marginTop: '10px' }}>
                      Reseeding the central databases clears all customized registrations, scorecards, notices, student roll-call rosters, and fee invoice statements in your browser local storage, restoring the ERP registers to the default initial mock configuration of founder Danushkumar VS.
                    </p>
                    <button className="admin-btn-danger mt-4 w-100" id="btn-reseed-database" onClick={handleSystemReseedTrigger} style={{ padding: '14px', fontSize: '14px', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-circle-radiation"></i> Clear Custom Database & Reseed Defaults
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Footer */}
          <div className="text-center py-4 mt-5" style={{ borderTop: '1px solid var(--admin-border)', fontSize: '13px', color: 'var(--admin-text-muted)' }}>
            <p>© {new Date().getFullYear()} EduManage ERP. All Rights Reserved. &bull; <strong>Founder & CEO: Danushkumar VS, Full Stack Developer</strong></p>
          </div>

        </div>


      {/* STUDENT REGISTRATION/EDIT MODAL */}
      {showStudentModal && (
        <div className="admin-modal-overlay active" id="modal-student">
          <div className="admin-modal-box" style={{ maxWidth: '550px' }}>
            <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 id="student-modal-title" style={{ fontWeight: 'bold', fontSize: '16px', color: '#0026ff' }}>
                {studentForm.id ? "Modify Student Profile" : "Register Student Profile"}
              </h3>
              <button className="admin-modal-close" onClick={() => setShowStudentModal(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <form onSubmit={handleStudentFormSubmit} style={{ marginTop: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="profile-group">
                  <label>Full Student Name *</label>
                  <input 
                    type="text" 
                    value={studentForm.name}
                    onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                    required 
                  />
                </div>
                <div className="profile-group">
                  <label>University Roll Number *</label>
                  <input 
                    type="text" 
                    value={studentForm.rollNo}
                    onChange={e => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                    required 
                  />
                </div>
                <div className="profile-group">
                  <label>Department Branch *</label>
                  <select 
                    value={studentForm.dept}
                    onChange={e => setStudentForm({ ...studentForm, dept: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                  >
                    {appState.departments.map(d => (
                      <option key={d.code} value={d.code}>{d.code}: {d.name}</option>
                    ))}
                  </select>
                </div>
                <div className="profile-group">
                  <label>Academic Year *</label>
                  <input 
                    type="text" 
                    value={studentForm.year}
                    onChange={e => setStudentForm({ ...studentForm, year: e.target.value })}
                    required 
                  />
                </div>
                <div className="profile-group">
                  <label>Current Semester *</label>
                  <input 
                    type="number" 
                    value={studentForm.semester}
                    onChange={e => setStudentForm({ ...studentForm, semester: parseInt(e.target.value, 10) })}
                    required 
                  />
                </div>
                <div className="profile-group">
                  <label>Institution Email Address *</label>
                  <input 
                    type="email" 
                    value={studentForm.email}
                    onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                    required 
                  />
                </div>
                <div className="profile-group">
                  <label>Mobile Number *</label>
                  <input 
                    type="text" 
                    value={studentForm.phone}
                    onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })}
                    required 
                  />
                </div>
                <div className="profile-group">
                  <label>Attendance Average (%) *</label>
                  <input 
                    type="number" 
                    value={studentForm.attendance}
                    onChange={e => setStudentForm({ ...studentForm, attendance: parseInt(e.target.value, 10) })}
                    required 
                  />
                </div>
              </div>
              <div className="admin-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="admin-btn-outline btn-modal-cancel" onClick={() => setShowStudentModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn">Save Registry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FACULTY APPOINT/EDIT MODAL */}
      {showFacultyModal && (
        <div className="admin-modal-overlay active" id="modal-faculty">
          <div className="admin-modal-box" style={{ maxWidth: '550px' }}>
            <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 id="faculty-modal-title" style={{ fontWeight: 'bold', fontSize: '16px', color: '#0026ff' }}>
                {facultyForm.id ? "Assign Course Work & Details" : "Appoint Professor"}
              </h3>
              <button className="admin-modal-close" onClick={() => setShowFacultyModal(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <form onSubmit={handleFacultyFormSubmit} style={{ marginTop: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="profile-group">
                  <label>Professor Name *</label>
                  <input 
                    type="text" 
                    value={facultyForm.name}
                    onChange={e => setFacultyForm({ ...facultyForm, name: e.target.value })}
                    required 
                  />
                </div>
                <div className="profile-group">
                  <label>Department *</label>
                  <select 
                    value={facultyForm.dept}
                    onChange={e => setFacultyForm({ ...facultyForm, dept: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                  >
                    {appState.departments.map(d => (
                      <option key={d.code} value={d.code}>{d.code}: {d.name}</option>
                    ))}
                  </select>
                </div>
                <div className="profile-group" style={{ gridColumn: 'span 2' }}>
                  <label>Assigned Subject Coursework *</label>
                  <input 
                    type="text" 
                    value={facultyForm.subject}
                    onChange={e => setFacultyForm({ ...facultyForm, subject: e.target.value })}
                    required 
                  />
                </div>
                <div className="profile-group">
                  <label>Institutional Email Address *</label>
                  <input 
                    type="email" 
                    value={facultyForm.email}
                    onChange={e => setFacultyForm({ ...facultyForm, email: e.target.value })}
                    required 
                  />
                </div>
                <div className="profile-group">
                  <label>Contact Phone Number *</label>
                  <input 
                    type="text" 
                    value={facultyForm.phone}
                    onChange={e => setFacultyForm({ ...facultyForm, phone: e.target.value })}
                    required 
                  />
                </div>
                <div className="profile-group">
                  <label>Portal Password *</label>
                  <input 
                    type="text" 
                    value={facultyForm.password || ''}
                    onChange={e => setFacultyForm({ ...facultyForm, password: e.target.value })}
                    required 
                  />
                </div>
              </div>
              <div className="admin-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="admin-btn-outline btn-modal-cancel" onClick={() => setShowFacultyModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn">Appoint professor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DEPARTMENT BRANCH CREATION MODAL */}
      {showDeptModal && (
        <div className="admin-modal-overlay active" id="modal-dept">
          <div className="admin-modal-box" style={{ maxWidth: '400px' }}>
            <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '16px', color: '#0026ff' }}>Configure Department Branch</h3>
              <button className="admin-modal-close" onClick={() => setShowDeptModal(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <form onSubmit={handleDeptFormSubmit} style={{ marginTop: '15px' }}>
              <div className="profile-group">
                <label>Department Code (Unique e.g. CSE) *</label>
                <input 
                  type="text" 
                  value={deptForm.code}
                  onChange={e => setDeptForm({ ...deptForm, code: e.target.value })}
                  required 
                  maxLength={5}
                />
              </div>
              <div className="profile-group mt-3">
                <label>Department Name Description *</label>
                <input 
                  type="text" 
                  value={deptForm.name}
                  onChange={e => setDeptForm({ ...deptForm, name: e.target.value })}
                  required 
                />
              </div>
              <div className="admin-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="admin-btn-outline btn-modal-cancel" onClick={() => setShowDeptModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn">Save Branch</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD COURSE MODAL */}
      {showCourseModal && (
        <div className="admin-modal-overlay active" id="modal-course">
          <div className="admin-modal-box" style={{ maxWidth: '450px' }}>
            <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '16px', color: '#0026ff' }}>Add Course Syllabus</h3>
              <button className="admin-modal-close" onClick={() => setShowCourseModal(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <form onSubmit={handleCourseFormSubmit} style={{ marginTop: '15px' }}>
              <div className="profile-group">
                <label>Course Code (Unique e.g. CS201) *</label>
                <input 
                  type="text" 
                  value={courseForm.code}
                  onChange={e => setCourseForm({ ...courseForm, code: e.target.value })}
                  required 
                />
              </div>
              <div className="profile-group mt-3">
                <label>Course Title *</label>
                <input 
                  type="text" 
                  value={courseForm.name}
                  onChange={e => setCourseForm({ ...courseForm, name: e.target.value })}
                  required 
                />
              </div>
              <div className="profile-group mt-3">
                <label>Credits count *</label>
                <input 
                  type="number" 
                  value={courseForm.credits}
                  onChange={e => setCourseForm({ ...courseForm, credits: parseInt(e.target.value, 10) })}
                  required 
                />
              </div>
              <div className="profile-group mt-3">
                <label>Department Branch *</label>
                <select 
                  value={courseForm.dept}
                  onChange={e => setCourseForm({ ...courseForm, dept: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                >
                  {appState.departments.map(d => (
                    <option key={d.code} value={d.code}>{d.code}: {d.name}</option>
                  ))}
                </select>
              </div>
              <div className="profile-group mt-3">
                <label>Assigned Lecturer *</label>
                <select 
                  value={courseForm.prof}
                  onChange={e => setCourseForm({ ...courseForm, prof: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                >
                  {appState.faculties.map(f => (
                    <option key={f.id} value={f.name}>{f.name} ({f.dept})</option>
                  ))}
                </select>
              </div>
              <div className="admin-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="admin-btn-outline btn-modal-cancel" onClick={() => setShowCourseModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn">Add Syllabus</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESULTS Publish SCORECARD MODAL */}
      {showResultModal && (
        <div className="admin-modal-overlay active" id="modal-result">
          <div className="admin-modal-box" style={{ maxWidth: '400px' }}>
            <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '16px', color: '#0026ff' }}>Publish Results Scorecard</h3>
              <button className="admin-modal-close" onClick={() => setShowResultModal(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <form onSubmit={handleResultFormSubmit} style={{ marginTop: '15px' }}>
              <div className="profile-group">
                <label>Student roll roll-call number *</label>
                <select 
                  value={resultForm.rollNo}
                  onChange={e => setResultForm({ ...resultForm, rollNo: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                >
                  {appState.allStudents.map(s => (
                    <option key={s.id} value={s.rollNo}>{s.name} ({s.rollNo})</option>
                  ))}
                </select>
              </div>
              <div className="profile-group mt-3">
                <label>Course Syllabus Code *</label>
                <select 
                  value={resultForm.courseCode}
                  onChange={e => setResultForm({ ...resultForm, courseCode: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                >
                  {appState.allCourses.map(c => (
                    <option key={c.code} value={c.code}>{c.code}: {c.name}</option>
                  ))}
                </select>
              </div>
              <div className="profile-group mt-3">
                <label>Midterm Marks *</label>
                <input 
                  type="text" 
                  value={resultForm.midTerm}
                  onChange={e => setResultForm({ ...resultForm, midTerm: e.target.value })}
                  required 
                />
              </div>
              <div className="profile-group mt-3">
                <label>Endterm Grade *</label>
                <select 
                  value={resultForm.endTerm}
                  onChange={e => setResultForm({ ...resultForm, endTerm: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}
                >
                  <option value="O">O (Outstanding)</option>
                  <option value="A+">A+ (Excellent)</option>
                  <option value="A">A (Very Good)</option>
                  <option value="B+">B+ (Good)</option>
                  <option value="B">B (Above Average)</option>
                  <option value="C">C (Average)</option>
                </select>
              </div>
              <div className="admin-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="admin-btn-outline btn-modal-cancel" onClick={() => setShowResultModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn">Publish Scorecard</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADMISSION APPLICATION DETAILS MODAL */}
      {showAppModal && lastAppDetails && (
        <div className="admin-modal-overlay active" id="modal-app-details" style={{ zIndex: 3000 }}>
          <div className="admin-modal-box" style={{ maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px' }}>
            <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px', color: '#0026ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-file-invoice"></i> Student Admission Application Details
              </h3>
              <button className="admin-modal-close" onClick={() => setShowAppModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#718096' }}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
              
              {/* Student Details */}
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '15px', color: '#0026ff', borderBottom: '1.5px solid #dbe2ff', paddingBottom: '5px', marginBottom: '10px' }}>
                  Student Personal Profile
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                  <div><strong>Full Name:</strong> {lastAppDetails.studentName}</div>
                  <div><strong>Register Number:</strong> {lastAppDetails.registerNumber}</div>
                  <div><strong>Department:</strong> {lastAppDetails.department}</div>
                  <div><strong>Academic Year:</strong> {lastAppDetails.year}</div>
                  <div><strong>Date of Birth:</strong> {lastAppDetails.dob}</div>
                  <div><strong>Gender:</strong> {lastAppDetails.gender}</div>
                  <div><strong>Blood Group:</strong> {lastAppDetails.bloodGroup}</div>
                  <div><strong>Nationality:</strong> {lastAppDetails.nationality}</div>
                  <div style={{ gridColumn: 'span 2' }}><strong>Email Address:</strong> {lastAppDetails.applicationEmail}</div>
                  <div style={{ gridColumn: 'span 2' }}><strong>Residential Address:</strong> {lastAppDetails.address}</div>
                  <div><strong>Parent Mobile:</strong> {lastAppDetails.parentMobile}</div>
                </div>
              </div>

              {/* Father Details */}
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '15px', color: '#0026ff', borderBottom: '1.5px solid #dbe2ff', paddingBottom: '5px', marginBottom: '10px' }}>
                  Father Particulars
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                  <div><strong>Father Name:</strong> {lastAppDetails.fatherName}</div>
                  <div><strong>Occupation:</strong> {lastAppDetails.fatherOccupation}</div>
                  <div style={{ gridColumn: 'span 2' }}><strong>Mobile Number:</strong> {lastAppDetails.fatherMobile}</div>
                </div>
              </div>

              {/* Mother Details */}
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '15px', color: '#0026ff', borderBottom: '1.5px solid #dbe2ff', paddingBottom: '5px', marginBottom: '10px' }}>
                  Mother Particulars
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                  <div><strong>Mother Name:</strong> {lastAppDetails.motherName}</div>
                  <div><strong>Occupation:</strong> {lastAppDetails.motherOccupation}</div>
                  <div style={{ gridColumn: 'span 2' }}><strong>Mobile Number:</strong> {lastAppDetails.motherMobile}</div>
                </div>
              </div>

              {/* Guardian Details */}
              {lastAppDetails.guardianName && (
                <div>
                  <h4 style={{ fontWeight: 'bold', fontSize: '15px', color: '#0026ff', borderBottom: '1.5px solid #dbe2ff', paddingBottom: '5px', marginBottom: '10px' }}>
                    Guardian Particulars (Optional)
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                    <div><strong>Guardian Name:</strong> {lastAppDetails.guardianName}</div>
                    <div><strong>Relationship:</strong> {lastAppDetails.relationship}</div>
                    <div style={{ gridColumn: 'span 2' }}><strong>Contact Number:</strong> {lastAppDetails.guardianMobile}</div>
                  </div>
                </div>
              )}

            </div>

            <div className="admin-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '25px', borderTop: '1px solid #e2e8f0', paddingTop: '15px' }}>
              <button 
                type="button" 
                className="admin-btn" 
                onClick={() => {
                  setShowAppModal(false);
                  clearNotification();
                }}
              >
                Accept & Dismiss Alert
              </button>
              <button 
                type="button" 
                className="admin-btn-outline" 
                onClick={() => setShowAppModal(false)}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TOAST NOTIFICATION */}
      <div className={`admin-toast ${showToast ? 'show' : ''} ${toastType}`} id="admin-toast-box">
        {toastMsg}
      </div>

    </>
  );
}
