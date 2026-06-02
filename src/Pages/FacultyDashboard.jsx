import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Compound/Navbar';
import Footer from '../Compound/Footer';
import { useAppState } from '../Compound/StateContext';
import '../Asset/CSS/style.css';
import '../Asset/CSS/dashboard.css';

export default function FacultyDashboard() {
  const { 
    appState, currentUser, adjustAttendance, addLectureSession, gradeAssignment, postNotice 
  } = useAppState();
  const navigate = useNavigate();

  // Tab control state
  const [activeTab, setActiveTab] = useState('overview');

  // Search queries state
  const [studentSearch, setStudentSearch] = useState('');

  // Attendance filter state
  const [attendanceCourse, setAttendanceCourse] = useState('CS201');

  // Grading Modal state
  const [showGradingModal, setShowGradingModal] = useState(false);
  const [gradingAssignmentId, setGradingAssignmentId] = useState('');
  const [gradingSubjectName, setGradingSubjectName] = useState('');
  const [gradingAssignTitle, setGradingAssignTitle] = useState('');
  const [gradingMaxScore, setGradingMaxScore] = useState(100);
  const [gradingFileName, setGradingFileName] = useState('');
  
  const [evalMarks, setEvalMarks] = useState('');
  const [evalGrade, setEvalGrade] = useState('O');
  const [evalRemarks, setEvalRemarks] = useState('');

  // Notice form state
  const [noticeForm, setNoticeForm] = useState({ title: '', category: 'academic', desc: '' });

  // Toast state
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Auth Guard
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'faculty') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser || !appState) return null;

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  // Get Faculty identity info
  const facultyDbRecord = (appState.faculties || []).find(f => f.email?.toLowerCase() === currentUser.email?.toLowerCase());
  const facultyName = facultyDbRecord ? facultyDbRecord.name : currentUser.name || "Dr. Suresh Kumar";
  const facultyDept = facultyDbRecord ? facultyDbRecord.dept : "CSE";

  // Teaching stats computations
  let myCourseCodes = [];
  if (Array.isArray(appState.allCourses)) {
    myCourseCodes = appState.allCourses
      .filter(c => c.prof && c.prof.toLowerCase().includes(facultyName.split(' ').pop().toLowerCase()))
      .map(c => c.code);
  }
  if (myCourseCodes.length === 0) {
    myCourseCodes = ["CS201", "CS203"]; // fallback default
  }

  // Attendance and lecture totals
  let totalLecturesConducted = 0;
  myCourseCodes.forEach(code => {
    if (appState.attendanceDb && Array.isArray(appState.attendanceDb[code]) && appState.attendanceDb[code][0]) {
      totalLecturesConducted += appState.attendanceDb[code][0].conducted;
    }
  });

  const uniqueStudentsSet = new Set();
  myCourseCodes.forEach(code => {
    if (appState.attendanceDb && Array.isArray(appState.attendanceDb[code])) {
      appState.attendanceDb[code].forEach(s => {
        if (s && s.rollNo) uniqueStudentsSet.add(s.rollNo);
      });
    }
  });
  const enrolledStudentsCount = uniqueStudentsSet.size || 4;

  const ungradedSubmissions = (appState.assignments || []).filter(a => a.status === 'Submitted');
  const ungradedCount = ungradedSubmissions.length;

  // Sync attendanceCourse state to first course taught
  useEffect(() => {
    if (myCourseCodes.length > 0) {
      setAttendanceCourse(myCourseCodes[0]);
    }
  }, []);

  // Grading Drawer Handlers
  const openGradingModal = (id) => {
    const assign = appState.assignments.find(a => a.id === id);
    if (assign) {
      setGradingAssignmentId(id);
      setGradingSubjectName(assign.code);
      setGradingAssignTitle(assign.title);
      setGradingMaxScore(assign.points);
      setGradingFileName(assign.submittedFileName || 'solution.pdf');
      
      setEvalMarks('');
      setEvalGrade('O');
      setEvalRemarks('');
      setShowGradingModal(true);
    }
  };

  const handleGradingSubmit = (e) => {
    e.preventDefault();
    const parsedMarks = parseInt(evalMarks, 10);
    if (isNaN(parsedMarks) || parsedMarks < 0 || parsedMarks > gradingMaxScore) {
      alert(`Please award a valid score between 0 and ${gradingMaxScore}.`);
      return;
    }

    gradeAssignment(gradingAssignmentId, parsedMarks, evalGrade, evalRemarks);
    setShowGradingModal(false);
    triggerToast('Grades awarded and published successfully for Danushkumar!');
  };

  // Roll Call triggers
  const markRollCall = (rollNo, courseCode, present) => {
    adjustAttendance(courseCode, rollNo, present);
    triggerToast(`Attendance register updated for student (${courseCode}).`);
  };

  const handleAddLectureTrigger = () => {
    addLectureSession(attendanceCourse);
    triggerToast(`Added a new lecture session to ${attendanceCourse}. Conducted classes incremented!`);
  };

  // Notices broadcast submit
  const handleNoticeSubmit = (e) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.desc) {
      alert('Please fill in both the circular title and details description fields.');
      return;
    }
    postNotice(noticeForm);
    setNoticeForm({ title: '', category: 'academic', desc: '' });
    triggerToast('Circular announcement posted! It is now visible on student portals.');
  };

  const deptText = facultyDept === "CSE" ? "Computer Science & Engineering" : 
                   facultyDept === "ECE" ? "Electronics & Communication Eng." : 
                   facultyDept === "ME" ? "Mechanical Engineering" : "Civil Engineering";

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        
        {/* Welcome Banner block */}
        <div className="student-welcome-banner" style={{ background: 'linear-gradient(135deg, #0d1b2a, #1b263b)' }}>
          <div>
            <h2>Welcome Back, <span id="faculty-welcome-name">{facultyName}</span>!</h2>
            <p>Role: <strong>Senior Professor</strong> &bull; Department: <strong>{deptText}</strong></p>
          </div>
          
          <div className="student-banner-stats">
            <div className="banner-stat-box" style={{ borderLeftColor: '#ffd700' }}>
              <h4 id="stat-courses">{myCourseCodes.length}</h4>
              <p>Courses Teaching</p>
            </div>
            <div className="banner-stat-box" style={{ borderLeftColor: '#ffd700' }}>
              <h4 id="stat-students">{enrolledStudentsCount}</h4>
              <p>Enrolled Students</p>
            </div>
            <div className="banner-stat-box" style={{ borderLeftColor: '#ffd700' }}>
              <h4 id="stat-ungraded">{ungradedCount}</h4>
              <p>Ungraded Tasks</p>
            </div>
            <div className="banner-stat-box" style={{ borderLeftColor: '#ffd700' }}>
              <h4 id="stat-lectures">{totalLecturesConducted}</h4>
              <p>Total Lectures</p>
            </div>
          </div>
        </div>

        {/* Dashboard Sub-Navigation Tabs deck */}
        <div className="dash-nav-pills">
          <button className={`dash-pill-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}><i className="fa-solid fa-square-poll-vertical"></i> Overview</button>
          <button className={`dash-pill-btn ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}><i className="fa-solid fa-user-graduate"></i> Students</button>
          <button className={`dash-pill-btn ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}><i className="fa-solid fa-clipboard-user"></i> Attendance Registry</button>
          <button className={`dash-pill-btn ${activeTab === 'grading' ? 'active' : ''}`} onClick={() => setActiveTab('grading')}><i className="fa-solid fa-pen-ruler"></i> Grading Portal</button>
          <button className={`dash-pill-btn ${activeTab === 'notices' ? 'active' : ''}`} onClick={() => setActiveTab('notices')}><i className="fa-solid fa-bullhorn"></i> Publish Notice</button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="dash-pane active" id="pane-faculty-overview">
            <div className="row">
              {/* Left: Quick Grading Queue */}
              <div className="col-12 col-md-7 mb-4">
                <div className="dash-card h-100">
                  <div className="dash-card-title"><i className="fa-solid fa-hourglass-half"></i> Pending Grading Queue</div>
                  <div className="bulletin-list" id="overview-grading-queue">
                    {ungradedSubmissions.length === 0 ? (
                      <div className="text-center py-4" style={{ color: 'var(--dash-muted)' }}>
                        <i className="fa-solid fa-circle-check" style={{ fontSize: '32px', color: 'var(--dash-success)', marginBottom: '8px' }}></i>
                        <p style={{ fontWeight: 'bold', fontSize: '14px', margin: 0 }}>All student deliverables graded!</p>
                      </div>
                    ) : (
                      ungradedSubmissions.map((sub) => (
                        <div key={sub.id} className="bulletin-item" style={{ borderLeftColor: 'var(--dash-warning)' }}>
                          <div className="bulletin-meta">
                            <span className="dash-badge dash-badge-warning">SUBMITTED</span>
                            <span>Student: Danushkumar</span>
                          </div>
                          <h5 style={{ fontWeight: 'bold', marginTop: '6px', fontSize: '14px', marginBottom: '4px' }}>{sub.title}</h5>
                          <p style={{ fontSize: '13px', color: 'var(--dash-muted)', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Course: {sub.code} &bull; File: {sub.submittedFileName || 'deliverable.pdf'}</span>
                            <button className="dash-btn-sm" onClick={() => openGradingModal(sub.id)}>
                              <i className="fa-solid fa-square-check"></i> Grade
                            </button>
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Active Teaching Schedules */}
              <div className="col-12 col-md-5 mb-4">
                <div className="dash-card h-100">
                  <div className="dash-card-title"><i className="fa-solid fa-chalkboard-user"></i> Active Course Loads</div>
                  <div className="bulletin-list">
                    {appState.allCourses
                      .filter(c => c.prof && c.prof.toLowerCase().includes(facultyName.split(' ').pop().toLowerCase()))
                      .map((c, index) => (
                        <div key={c.code} className="bulletin-item" style={{ borderLeftColor: 'var(--dash-primary)' }}>
                          <div className="bulletin-meta">
                            <span className="dash-badge dash-badge-success">Semester 4</span>
                            <span>Credits: {c.credits}</span>
                          </div>
                          <h5 style={{ fontWeight: 'bold', marginTop: '6px', fontSize: '14px', marginBottom: '4px' }}>
                            {c.code}: {c.name}
                          </h5>
                          <p style={{ fontSize: '13px', color: 'var(--dash-muted)', margin: 0 }}>
                            {index === 0 ? 'Monday & Wednesday, 10:00 AM • Room 302' : 'Tuesday & Thursday, 11:30 AM • Room 405'}
                          </p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STUDENTS REGISTRY */}
        {activeTab === 'students' && (
          <div className="dash-pane active" id="pane-faculty-students">
            <div className="dash-card">
              <div className="dash-card-title d-flex justify-content-between align-items-center flex-wrap gap-2">
                <span><i className="fa-solid fa-user-graduate"></i> Enrolled Students Registry</span>
                <input 
                  type="text" 
                  placeholder="Search Enrolled Students..." 
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  style={{ padding: '6px 12px', border: '1px solid var(--dash-border)', borderRadius: '6px', fontSize: '13px', outline: 'none', width: '250px', background: 'white' }}
                />
              </div>
              <div className="table-responsive mt-3">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Roll Number</th>
                      <th>Department</th>
                      <th>Year & Sem</th>
                      <th>Email Address</th>
                      <th>Mobile Number</th>
                      <th>Global Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(appState.allStudents || [])
                      .filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.rollNo.toLowerCase().includes(studentSearch.toLowerCase()) || s.dept.toLowerCase().includes(studentSearch.toLowerCase()))
                      .map((s) => {
                        let badgeClass = 'dash-badge-success';
                        if (s.attendance < 75) badgeClass = 'dash-badge-danger';
                        else if (s.attendance < 85) badgeClass = 'dash-badge-warning';

                        return (
                          <tr key={s.id}>
                            <td><strong>{s.id}</strong></td>
                            <td>{s.name}</td>
                            <td><strong>{s.rollNo}</strong></td>
                            <td>{s.dept}</td>
                            <td>Year {s.year} &bull; Sem {s.semester}</td>
                            <td>{s.email}</td>
                            <td>{s.phone}</td>
                            <td><span className={`dash-badge ${badgeClass}`}>{s.attendance}%</span></td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ATTENDANCE REGISTRY */}
        {activeTab === 'attendance' && (
          <div className="dash-pane active" id="pane-faculty-attendance">
            <div className="dash-card">
              <div className="dash-card-title d-flex justify-content-between align-items-center flex-wrap gap-2">
                <span><i className="fa-solid fa-user-check"></i> Roll Call Attendance Manager</span>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <label htmlFor="select-attendance-course" style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--dash-muted)' }}>Course:</label>
                  <select 
                    id="select-attendance-course" 
                    value={attendanceCourse}
                    onChange={e => setAttendanceCourse(e.target.value)}
                    style={{ padding: '6px 12px', border: '1px solid var(--dash-border)', borderRadius: '4px', fontSize: '13px', outline: 'none', background: 'white', fontWeight: 'bold', color: 'var(--dash-primary)' }}
                  >
                    {appState.allCourses
                      .filter(c => c.prof && c.prof.toLowerCase().includes(facultyName.split(' ').pop().toLowerCase()))
                      .map(c => (
                        <option key={c.code} value={c.code}>{c.code}: {c.name}</option>
                      ))
                    }
                  </select>
                  <button className="dash-btn-sm" onClick={handleAddLectureTrigger}>
                    <i className="fa-solid fa-plus"></i> Add Lecture Session
                  </button>
                </div>
              </div>
              
              <div className="table-responsive mt-3">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Roll Number</th>
                      <th>Student Name</th>
                      <th>Department</th>
                      <th>Current Lectures Attended</th>
                      <th>Total Conducted</th>
                      <th>Attendance %</th>
                      <th style={{ textAlign: 'right' }}>Toggle Quick Roll-Call</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(appState.attendanceDb[attendanceCourse] || []).map((s) => {
                      const pct = s.conducted > 0 ? ((s.attended / s.conducted) * 100).toFixed(0) : '100';
                      let badgeClass = 'dash-badge-success';
                      if (parseInt(pct) < 75) badgeClass = 'dash-badge-danger';
                      else if (parseInt(pct) < 85) badgeClass = 'dash-badge-warning';

                      return (
                        <tr key={s.rollNo}>
                          <td><strong>{s.rollNo}</strong></td>
                          <td>{s.name}</td>
                          <td>{s.dept}</td>
                          <td>{s.attended} lectures</td>
                          <td>{s.conducted} lectures</td>
                          <td><span className={`dash-badge ${badgeClass}`}>{pct}%</span></td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button 
                                onClick={() => markRollCall(s.rollNo, attendanceCourse, true)} 
                                style={{ background: '#10b981', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 2px 6px rgba(16, 185, 129, 0.2)' }}
                                title="Mark student present"
                              >
                                <i className="fa-solid fa-circle-check"></i> Present
                              </button>
                              <button 
                                onClick={() => markRollCall(s.rollNo, attendanceCourse, false)} 
                                style={{ background: '#fee2e2', color: '#ef4444', border: '1.5px solid #fca5a5', padding: '5px 13px', borderRadius: '20px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s ease' }}
                                title="Mark student absent"
                              >
                                <i className="fa-solid fa-circle-xmark"></i> Absent
                              </button>
                            </div>
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

        {/* TAB 3: GRADING PORTAL */}
        {activeTab === 'grading' && (
          <div className="dash-pane active" id="pane-faculty-grading">
            <div className="dash-card">
              <div className="dash-card-title"><i className="fa-solid fa-clipboard-check"></i> Coursework Deliverables Evaluator</div>
              <div className="table-responsive">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Roll No</th>
                      <th>Student Name</th>
                      <th>Course</th>
                      <th>Assignment Title</th>
                      <th>Uploaded File</th>
                      <th>Uploaded Date</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appState.assignments.map((a) => {
                      const author = "Danushkumar";
                      const roll = "2024CSE1042";

                      const isSubmitted = a.status === 'Submitted';
                      let statusBadge = '<span class="dash-badge dash-badge-danger">PENDING</span>';
                      let actionBtn = <span style={{ fontSize: '12px', color: 'var(--dash-muted)', fontWeight: 'bold' }}>Awaiting Upload</span>;

                      if (isSubmitted) {
                        statusBadge = <span className="dash-badge dash-badge-warning">SUBMITTED</span>;
                        actionBtn = (
                          <button className="dash-btn-sm" onClick={() => openGradingModal(a.id)}>
                            <i className="fa-solid fa-pen-ruler"></i> Grade
                          </button>
                        );
                      } else if (a.status === 'Graded') {
                        statusBadge = <span className="dash-badge dash-badge-success">GRADED</span>;
                        actionBtn = (
                          <span className="text-success" style={{ fontWeight: 'bold', fontSize: '12px' }}>
                            <i className="fa-solid fa-circle-check"></i> Evaluated
                          </span>
                        );
                      }

                      return (
                        <tr key={a.id}>
                          <td><strong>{roll}</strong></td>
                          <td>{author}</td>
                          <td><strong>{a.code}</strong></td>
                          <td>{a.title}</td>
                          <td>
                            {a.submittedFileName ? (
                              <a href="#view" onClick={e => e.preventDefault()} style={{ color: 'var(--dash-primary)', fontWeight: 'bold', textDecoration: 'none' }}>
                                <i className="fa-solid fa-file-pdf"></i> {a.submittedFileName}
                              </a>
                            ) : 'N/A'}
                          </td>
                          <td>{a.submissionDate || 'N/A'}</td>
                          <td>{statusBadge}</td>
                          <td style={{ textAlign: 'right' }}>{actionBtn}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PUBLISH NOTICE */}
        {activeTab === 'notices' && (
          <div className="dash-pane active" id="pane-faculty-notices">
            <div className="dash-card">
              <div className="dash-card-title"><i className="fa-solid fa-bullhorn"></i> Publish New Campus Announcement</div>
              <form onSubmit={handleNoticeSubmit}>
                <div className="profile-grid">
                  <div className="profile-group" style={{ gridColumn: 'span 2' }}>
                    <label htmlFor="notice-title">Notice Title / Subject Heading</label>
                    <input 
                      type="text" 
                      id="notice-title" 
                      placeholder="e.g. End Semester Lab Exams Schedule" 
                      value={noticeForm.title}
                      onChange={e => setNoticeForm({ ...noticeForm, title: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="profile-group">
                    <label htmlFor="notice-category">Announcement Category</label>
                    <select 
                      id="notice-category" 
                      value={noticeForm.category}
                      onChange={e => setNoticeForm({ ...noticeForm, category: e.target.value })}
                      required 
                      style={{ padding: '10px', border: '1px solid var(--dash-border)', borderRadius: '6px', background: 'white' }}
                    >
                      <option value="academic">Academic Circular</option>
                      <option value="urgent">Urgent Notice</option>
                      <option value="exam">Examination Alert</option>
                      <option value="event">Campus Life & Technical Fest</option>
                    </select>
                  </div>
                  <div className="profile-group">
                    <label htmlFor="notice-publisher">Publisher Identification</label>
                    <input type="text" id="notice-publisher" value={`${facultyName} (Dept of ${facultyDept})`} disabled />
                  </div>
                  <div className="profile-group" style={{ gridColumn: 'span 2' }}>
                    <label htmlFor="notice-content">Detailed Circular Description</label>
                    <textarea 
                      id="notice-content" 
                      placeholder="Write detailed description of the campus alert..." 
                      value={noticeForm.desc}
                      onChange={e => setNoticeForm({ ...noticeForm, desc: e.target.value })}
                      required 
                      style={{ height: '120px' }}
                    ></textarea>
                  </div>
                </div>
                <div className="text-end mt-4">
                  <button type="submit" className="btn btn-primary" style={{ background: '#0026ff', border: 'none', padding: '10px 24px', fontWeight: 'bold' }}>
                    <i className="fa-solid fa-paper-plane"></i> Broadcast Notice Announcement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Dynamic Dashboard Footer */}
        <div className="text-center py-4 mt-5" style={{ borderTop: '1px solid var(--dash-border)', fontSize: '13px', color: 'var(--dash-muted)' }}>
          <p>© {new Date().getFullYear()} EduManage ERP. All Rights Reserved. &bull; <strong>Founder & CEO: Danushkumar VS, Full Stack Developer</strong></p>
        </div>

      </div>

      {/* EVALUATION GRADING MODAL */}
      {showGradingModal && (
        <div className="dash-modal-overlay active" id="modal-eval-grade">
          <div className="dash-modal-box">
            <div className="dash-modal-header">
              <h3>Assignment Submission Assessment</h3>
              <button className="dash-modal-close" onClick={() => setShowGradingModal(false)} aria-label="Close dialog">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleGradingSubmit}>
              <div style={{ background: 'var(--dash-bg)', padding: '15px', borderRadius: '8px', border: '1px solid var(--dash-border)', marginBottom: '15px', fontSize: '13px' }}>
                <div>Student Name: <strong>Danushkumar</strong></div>
                <div className="mt-1">Assignment: <strong>{gradingAssignTitle}</strong></div>
                <div className="mt-1">Attachment: <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--dash-primary)', textDecoration: 'none', fontWeight: 'bold' }}><i className="fa-solid fa-file-pdf"></i> {gradingFileName}</a></div>
                <div className="mt-1">Student Remarks: <span style={{ color: 'var(--dash-muted)' }}>No comments provided.</span></div>
              </div>

              <div className="profile-group">
                <label htmlFor="eval-marks" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>
                  Award Score Points (Max: <span>{gradingMaxScore}</span>)
                </label>
                <input 
                  type="number" 
                  id="eval-marks" 
                  min="0" 
                  max={gradingMaxScore} 
                  placeholder={`e.g. 92`} 
                  value={evalMarks}
                  onChange={e => setEvalMarks(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--dash-border)', borderRadius: '6px' }}
                />
              </div>
              
              <div className="profile-group mt-3">
                <label htmlFor="eval-grade" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>
                  Award Course Grade
                </label>
                <select 
                  id="eval-grade" 
                  value={evalGrade}
                  onChange={e => setEvalGrade(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--dash-border)', borderRadius: '6px', background: 'white', fontWeight: 'bold' }}
                >
                  <option value="O">O - Outstanding (10 GP)</option>
                  <option value="A+">A+ - Excellent (10 GP)</option>
                  <option value="A">A - Very Good (9 GP)</option>
                  <option value="B+">B+ - Good (8 GP)</option>
                  <option value="B">B - Above Average (7 GP)</option>
                  <option value="C">C - Average (6 GP)</option>
                </select>
              </div>

              <div className="profile-group mt-3">
                <label htmlFor="eval-remarks" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>
                  Feedback Comments
                </label>
                <textarea 
                  id="eval-remarks" 
                  placeholder="Provide feedback to the student..." 
                  value={evalRemarks}
                  onChange={e => setEvalRemarks(e.target.value)}
                  style={{ width: '100%', height: '60px', padding: '8px', border: '1px solid var(--dash-border)', borderRadius: '6px' }}
                ></textarea>
              </div>

              <div className="dash-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="dash-btn-outline-sm btn-modal-cancel" onClick={() => setShowGradingModal(false)}>Cancel</button>
                <button type="submit" className="dash-btn-sm">Submit Evaluation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING NOTIFICATION TOAST */}
      <div className={`dash-toast ${showToast ? 'show' : ''}`} id="dash-toast-container">
        {toastMsg}
      </div>

      <Footer />
    </>
  );
}
