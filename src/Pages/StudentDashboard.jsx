import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Compound/Navbar';
import Footer from '../Compound/Footer';
import { useAppState } from '../Compound/StateContext';
import '../Asset/CSS/style.css';
import '../Asset/CSS/dashboard.css';

export default function StudentDashboard() {
  const { appState, currentUser, updateProfile, submitAssignment, payFees } = useAppState();
  const navigate = useNavigate();

  // Tab control state
  const [activeTab, setActiveTab] = useState('overview');

  // Modals state
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitCourseCode, setSubmitCourseCode] = useState('');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');
  const [evalComments, setEvalComments] = useState('');

  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentInvoiceId, setPaymentInvoiceId] = useState('');
  const [paymentTitle, setPaymentTitle] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: '', email: '', phone: '', dob: '', address: '', emergencyContact: ''
  });

  // Toast state
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Sync profile form once state hydrates
  useEffect(() => {
    if (appState && appState.profile) {
      setProfileForm({
        name: appState.profile.name,
        email: appState.profile.email,
        phone: appState.profile.phone,
        dob: appState.profile.dob || '2004-08-12',
        address: appState.profile.address,
        emergencyContact: appState.profile.emergencyContact
      });
    }
  }, [appState]);

  // Auth Guard
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') {
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

  // Helper date calculations
  const getDaysLeft = (dateStr) => {
    const target = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = target - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Metrics calculations
  const courses = appState.courses || [];
  const totalAttended = courses.reduce((sum, c) => sum + c.attended, 0);
  const totalConducted = courses.reduce((sum, c) => sum + c.conducted, 0);
  const attendanceAvg = totalConducted > 0 ? ((totalAttended / totalConducted) * 100).toFixed(1) : '80.0';

  const pendingAssign = (appState.assignments || []).filter(a => a.status === 'Pending');
  const dueAssignmentsCount = pendingAssign.length;

  const outstandingFeesTotal = (appState.fees?.ledgers || [])
    .filter(f => f.status === 'Pending')
    .reduce((sum, f) => sum + f.amount, 0);

  const semesterGpas = appState.grades?.semesterGpas || [];
  const latestGpa = semesterGpas.length > 0 ? semesterGpas[semesterGpas.length - 1] : '9.1';
  const cumulativeCgpa = semesterGpas.length > 0 
    ? (semesterGpas.reduce((sum, g) => sum + g, 0) / semesterGpas.length).toFixed(2) 
    : '9.05';

  // Modal open handlers
  const openSubmitModal = (courseCode) => {
    const assigns = appState.assignments.filter(a => a.code === courseCode && a.status === 'Pending');
    if (assigns.length === 0) {
      triggerToast(`No pending coursework assignments found for ${courseCode}!`);
      return;
    }
    setSubmitCourseCode(courseCode);
    setSelectedAssignmentId(assigns[0].id);
    setShowSubmitModal(true);
  };

  const openPaymentModal = (id, title, amount) => {
    setPaymentInvoiceId(id);
    setPaymentTitle(title);
    setPaymentAmount(amount);
    setShowPayModal(true);
  };

  const openPayAllModal = () => {
    const pendingLedgers = appState.fees.ledgers.filter(l => l.status === 'Pending');
    const totalAmt = pendingLedgers.reduce((sum, l) => sum + l.amount, 0);
    if (totalAmt === 0) {
      triggerToast('No outstanding invoices are pending!');
      return;
    }
    setPaymentInvoiceId('all');
    setPaymentTitle('All Pending Academic Fees');
    setPaymentAmount(totalAmt);
    setShowPayModal(true);
  };

  // Submit operations
  const handleSubmitAssignmentForm = (e) => {
    e.preventDefault();
    if (!uploadFileName) {
      alert('Please select a file to upload.');
      return;
    }
    submitAssignment(selectedAssignmentId, uploadFileName);
    setShowSubmitModal(false);
    setUploadFileName('');
    setEvalComments('');
    triggerToast(`Successfully uploaded assignment deliverable: ${uploadFileName}!`);
  };


  const handlePayFeesForm = (e) => {
    e.preventDefault();
    if (cardDetails.number.replace(/\s+/g, '').length < 13) {
      alert('Please specify a valid payment card.');
      return;
    }
    payFees(paymentInvoiceId);
    setShowPayModal(false);
    setCardDetails({ number: '', expiry: '', cvv: '', name: '' });
    triggerToast(
      paymentInvoiceId === 'all' 
        ? 'All outstanding academic fee ledger accounts cleared successfully!' 
        : `Paid ₹${paymentAmount.toLocaleString('en-IN')} successfully for ${paymentTitle}!`
    );
  };

  const handleProfileFormSubmit = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    triggerToast('Account credentials saved successfully to cloud profiles!');
  };

  // Fake syllabus downloader
  const downloadSyllabus = (code) => {
    triggerToast(`Downloading syllabus for ${code}...`);
    setTimeout(() => {
      const blob = new Blob([`Syllabus for ${code} - EduManage System`], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Syllabus_${code}.txt`;
      link.click();
    }, 800);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        
        {/* Welcome Banner block */}
        <div className="student-welcome-banner">
          <div>
            <h2>Welcome Back, <span id="student-welcome-name">{appState.profile.name.split(' ')[0]}</span>!</h2>
            <p>Course: <span id="student-welcome-program">{appState.profile.program}</span> &bull; Roll Number: <span id="student-welcome-roll">{appState.profile.rollNo}</span></p>
          </div>
          
          <div className="student-banner-stats">
            <div className="banner-stat-box">
              <h4 id="stat-gpa">{latestGpa}</h4>
              <p>Current GPA</p>
            </div>
            <div className="banner-stat-box">
              <h4 id="stat-attendance">{attendanceAvg}%</h4>
              <p>Attendance Avg</p>
            </div>
            <div className="banner-stat-box">
              <h4 id="stat-assignments">{dueAssignmentsCount}</h4>
              <p>Due Tasks</p>
            </div>
            <div className="banner-stat-box">
              <h4 id="stat-fees">₹{outstandingFeesTotal.toLocaleString('en-IN')}</h4>
              <p>Due Fees</p>
            </div>
          </div>
        </div>

        {/* Dashboard Sub-Navigation Tabs deck */}
        <div className="dash-nav-pills">
          <button className={`dash-pill-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}><i className="fa-solid fa-house"></i> Overview</button>
          <button className={`dash-pill-btn ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}><i className="fa-solid fa-book-open"></i> Courses & Attendance</button>
          <button className={`dash-pill-btn ${activeTab === 'grades' ? 'active' : ''}`} onClick={() => setActiveTab('grades')}><i className="fa-solid fa-chart-simple"></i> Grades & Exams</button>
          <button className={`dash-pill-btn ${activeTab === 'fees' ? 'active' : ''}`} onClick={() => setActiveTab('fees')}><i className="fa-solid fa-wallet"></i> Fees Account</button>
          <button className={`dash-pill-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}><i className="fa-solid fa-user-gear"></i> Profile Settings</button>
        </div>

        {/* Dynamic Panels */}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="dash-pane active" id="pane-overview">
            <div className="row">
              {/* Left: Recent Bulletin Alerts */}
              <div className="col-12 col-md-7 mb-4">
                <div className="dash-card h-100">
                  <div className="dash-card-title"><i class="fa-solid fa-bullhorn"></i> Official Announcements</div>
                  <div className="bulletin-list" id="bulletin-board-container">
                    {appState.notices.map((notice) => {
                      const isUrgent = notice.category === 'urgent';
                      return (
                        <div key={notice.id} className={`bulletin-item ${isUrgent ? 'urgent' : ''}`}>
                          <div className="bulletin-meta">
                            <span className={`dash-badge ${isUrgent ? 'dash-badge-danger' : 'dash-badge-warning'}`}>
                              {notice.category.toUpperCase()}
                            </span>
                            <span>{notice.date}</span>
                          </div>
                          <h5 style={{ fontWeight: 'bold', marginTop: '6px', fontSize: '14px', marginBottom: '4px' }}>
                            {notice.title}
                          </h5>
                          <p style={{ fontSize: '13px', color: 'var(--dash-muted)', margin: 0 }}>
                            {notice.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Deadlines Timeline */}
              <div className="col-12 col-md-5 mb-4">
                <div className="dash-card h-100">
                  <div className="dash-card-title"><i className="fa-solid fa-hourglass-half"></i> Pending Assignments</div>
                  <div className="bulletin-list" id="overview-deadlines-container">
                    {pendingAssign.length === 0 ? (
                      <div className="text-center py-4" style={{ color: 'var(--dash-muted)' }}>
                        <i className="fa-solid fa-circle-check" style={{ fontSize: '32px', color: 'var(--dash-success)', marginBottom: '8px' }}></i>
                        <p style={{ fontWeight: 'bold', fontSize: '14px', margin: 0 }}>All caught up! No due tasks.</p>
                      </div>
                    ) : (
                      pendingAssign.map((a) => {
                        const days = getDaysLeft(a.deadline);
                        let badgeClass = 'dash-badge-success';
                        if (days <= 3) badgeClass = 'dash-badge-danger';
                        else if (days <= 7) badgeClass = 'dash-badge-warning';

                        return (
                          <div key={a.id} className="bulletin-item" style={{ borderLeftColor: 'var(--dash-primary)' }}>
                            <div className="bulletin-meta">
                              <span className={`dash-badge ${badgeClass}`}>
                                {days <= 0 ? 'Due Today' : `In ${days} Days`}
                              </span>
                              <span>Deadline: {a.deadline}</span>
                            </div>
                            <h5 style={{ fontWeight: 'bold', marginTop: '6px', fontSize: '14px', marginBottom: '4px' }}>{a.title}</h5>
                            <p style={{ fontSize: '13px', color: 'var(--dash-muted)', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span>Code: {a.code} &bull; Weight: {a.points} pts</span>
                              <button className="dash-btn-sm" onClick={() => openSubmitModal(a.code)}>
                                <i className="fa-solid fa-cloud-arrow-up"></i> Submit
                              </button>
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COURSES & ATTENDANCE */}
        {activeTab === 'courses' && (
          <div className="dash-pane active" id="pane-courses">
            <div className="dash-card">
              <div className="dash-card-title"><i className="fa-solid fa-book"></i> Enrolled Curriculum Subjects</div>
              <div className="table-responsive">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Course Title</th>
                      <th>Faculty</th>
                      <th>Credits</th>
                      <th>Classes Info</th>
                      <th>Attendance %</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c) => {
                      const pct = c.conducted > 0 ? ((c.attended / c.conducted) * 100).toFixed(0) : '100';
                      let attBadge = 'dash-badge-success';
                      if (parseInt(pct) < 75) attBadge = 'dash-badge-danger';
                      else if (parseInt(pct) < 85) attBadge = 'dash-badge-warning';

                      return (
                        <tr key={c.code}>
                          <td><strong>{c.code}</strong></td>
                          <td>{c.title}</td>
                          <td>{c.prof}</td>
                          <td>{c.credits} Credits</td>
                          <td>{c.attended} / {c.conducted} lectures</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span className={`dash-badge ${attBadge}`}>{pct}%</span>
                              <div className="dash-progress-track" style={{ width: '50px', marginBottom: 0 }}>
                                <div className="dash-progress-fill" style={{ width: `${pct}%`, background: parseInt(pct) < 75 ? 'var(--dash-danger)' : 'var(--dash-primary)' }}></div>
                              </div>
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button className="dash-btn-outline-sm" onClick={() => downloadSyllabus(c.code)} title="Download Syllabus File">
                                <i className="fa-solid fa-download"></i>
                              </button>
                              <button className="dash-btn-sm" onClick={() => openSubmitModal(c.code)}>
                                <i className="fa-solid fa-cloud-arrow-up"></i> Submit
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

        {/* TAB 3: GRADES & EXAMS */}
        {activeTab === 'grades' && (
          <div className="dash-pane active" id="pane-grades">
            <div className="row">
              {/* Left Details Table */}
              <div className="col-12 col-md-8 mb-4">
                <div className="dash-card h-100">
                  <div className="dash-card-title"><i className="fa-solid fa-medal"></i> Semester 4 Ledger</div>
                  <div className="table-responsive">
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Course Subject Title</th>
                          <th>Mid-Term</th>
                          <th>End-Term</th>
                          <th>Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appState.grades.details.map((g) => {
                          let badgeClass = 'dash-badge-success';
                          if (g.endTerm === 'B' || g.endTerm === 'C' || g.endTerm === 'N/A') badgeClass = 'dash-badge-warning';

                          return (
                            <tr key={g.code}>
                              <td><strong>{g.code}</strong></td>
                              <td>{g.title}</td>
                              <td>{g.midTerm}</td>
                              <td><span className={`dash-badge ${badgeClass}`}>{g.endTerm}</span></td>
                              <td><strong>{g.gp} / 10</strong></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Sem GPA Overview */}
              <div className="col-12 col-md-4 mb-4">
                <div className="dash-card h-100">
                  <div className="dash-card-title"><i className="fa-solid fa-award"></i> GPA Progression</div>
                  <div className="bulletin-list">
                    <div className="bulletin-item" style={{ borderLeftColor: 'var(--dash-success)' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '13px', color: 'var(--dash-muted)' }}>Cumulative CGPA</div>
                      <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--dash-primary)', marginTop: '4px' }}>
                        {cumulativeCgpa} / 10.00
                      </div>
                    </div>
                    {semesterGpas.map((gpa, index) => (
                      <div key={index} className="bulletin-item" style={{ borderLeftColor: index === 3 ? 'var(--dash-success)' : 'var(--dash-primary)' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '13px', color: 'var(--dash-muted)' }}>Semester {index + 1} GPA</div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '4px' }}>{gpa.toFixed(2)} / 10.00</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FEES LEDGER */}
        {activeTab === 'fees' && (
          <div className="dash-pane active" id="pane-fees">
            <div className="row">
              {/* Left Invoices */}
              <div className="col-12 col-md-6 mb-4">
                <div className="dash-card h-100">
                  <div className="dash-card-title"><i className="fa-solid fa-file-invoice-dollar"></i> Outstanding Payments</div>
                  <div id="fees-invoice-container">
                    {appState.fees.ledgers.map((l) => {
                      const isPaid = l.status === 'Paid';
                      return (
                        <div key={l.id} className="ledger-item d-flex justify-content-between align-items-center py-3 border-bottom">
                          <div>
                            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{l.title}</div>
                            <div style={{ fontSize: '12px', color: 'var(--dash-muted)', marginTop: '3px' }}>
                              ₹{l.amount.toLocaleString('en-IN')} &bull;{' '}
                              <span className={`dash-badge ${isPaid ? 'dash-badge-success' : 'dash-badge-danger'}`}>
                                {l.status.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div>
                            {!isPaid && (
                              <button className="dash-btn-sm" onClick={() => openPaymentModal(l.id, l.title, l.amount)}>
                                <i className="fa-solid fa-credit-card"></i> Pay
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {outstandingFeesTotal > 0 && (
                    <div className="text-end mt-4">
                      <button className="btn btn-primary" onClick={openPayAllModal} style={{ background: '#0026ff', border: 'none', padding: '10px 20px', fontWeight: 'bold' }}>
                        <i className="fa-solid fa-credit-card"></i> Pay Outstanding Dues
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Transactions */}
              <div className="col-12 col-md-6 mb-4">
                <div className="dash-card h-100">
                  <div className="dash-card-title"><i className="fa-solid fa-clock-rotate-left"></i> Transaction Statements</div>
                  <div className="table-responsive">
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>Receipt ID</th>
                          <th>Item Particulars</th>
                          <th>Amount</th>
                          <th>Date Paid</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appState.fees.transactions.length === 0 ? (
                          <tr><td colSpan="5" className="text-center text-muted">No past receipts.</td></tr>
                        ) : (
                          appState.fees.transactions.map((t) => (
                            <tr key={t.id}>
                              <td><strong>#{t.id}</strong></td>
                              <td>{t.title}</td>
                              <td>₹{t.amount.toLocaleString('en-IN')}</td>
                              <td>{t.date}</td>
                              <td><span className="dash-badge dash-badge-success">Success</span></td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <div className="dash-pane active" id="pane-profile">
            <div className="dash-card">
              <div className="dash-card-title"><i className="fa-solid fa-user-pen"></i> Update Personal Account Details</div>
              <form onSubmit={handleProfileFormSubmit}>
                <div className="profile-grid">
                  <div className="profile-group">
                    <label htmlFor="prof-name">Full Student Name</label>
                    <input 
                      type="text" 
                      id="prof-name" 
                      value={profileForm.name}
                      onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="profile-group">
                    <label htmlFor="prof-email">Institutional Email</label>
                    <input 
                      type="email" 
                      id="prof-email" 
                      value={profileForm.email}
                      onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="profile-group">
                    <label htmlFor="prof-phone">Contact Phone Number</label>
                    <input 
                      type="text" 
                      id="prof-phone" 
                      value={profileForm.phone}
                      onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="profile-group">
                    <label htmlFor="prof-dob">Date of Birth</label>
                    <input 
                      type="date" 
                      id="prof-dob" 
                      value={profileForm.dob}
                      onChange={e => setProfileForm({ ...profileForm, dob: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="profile-group" style={{ gridColumn: 'span 2' }}>
                    <label htmlFor="prof-address">Residential Mailing Address</label>
                    <textarea 
                      id="prof-address" 
                      value={profileForm.address}
                      onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                      required 
                      style={{ height: '80px' }}
                    ></textarea>
                  </div>
                  <div className="profile-group" style={{ gridColumn: 'span 2' }}>
                    <label htmlFor="prof-emergency">Emergency Contact (Name & Phone)</label>
                    <input 
                      type="text" 
                      id="prof-emergency" 
                      value={profileForm.emergencyContact}
                      onChange={e => setProfileForm({ ...profileForm, emergencyContact: e.target.value })}
                      required 
                    />
                  </div>
                </div>
                <div className="text-end mt-4">
                  <button type="submit" className="btn btn-primary" style={{ background: '#0026ff', border: 'none', padding: '10px 24px', fontWeight: 'bold' }}>
                    <i className="fa-solid fa-cloud-arrow-up"></i> Save Profile Settings
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

      {/* MODAL 1: ASSIGNMENT SUBMIT OVERLAY */}
      {showSubmitModal && (
        <div className="dash-modal-overlay active" id="modal-submit-assign">
          <div className="dash-modal-box">
            <div className="dash-modal-header">
              <h3>{submitCourseCode}: Course Assignment Upload</h3>
              <button className="dash-modal-close" onClick={() => setShowSubmitModal(false)} aria-label="Close dialog">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleSubmitAssignmentForm}>
              <div className="profile-group">
                <label htmlFor="select-assign-task" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>
                  Select Target Assignment
                </label>
                <select 
                  id="select-assign-task" 
                  value={selectedAssignmentId}
                  onChange={e => setSelectedAssignmentId(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--dash-border)', borderRadius: '6px', background: '#fff' }}
                >
                  {appState.assignments
                    .filter(a => a.code === submitCourseCode && a.status === 'Pending')
                    .map(a => (
                      <option key={a.id} value={a.id}>{a.title} (Due: {a.deadline})</option>
                    ))
                  }
                </select>
              </div>
              <div className="profile-group mt-3">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '13px', color: 'var(--dash-muted)' }}>
                  Upload Assignment File (PDF, ZIP, DOCX)
                </label>
                <div 
                  style={{
                    border: '2px dashed var(--dash-primary)',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center',
                    background: '#f8fafc',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => document.getElementById('assignment-file-picker').click()}
                  onMouseOver={e => e.currentTarget.style.background = '#eef2ff'}
                  onMouseOut={e => e.currentTarget.style.background = '#f8fafc'}
                >
                  <input 
                    type="file" 
                    id="assignment-file-picker" 
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadFileName(e.target.files[0].name);
                      }
                    }}
                    required 
                    style={{ display: 'none' }}
                  />
                  <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '32px', color: 'var(--dash-primary)', marginBottom: '8px' }}></i>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: 'var(--dash-text)' }}>
                    {uploadFileName ? 'Change Selected File' : 'Click to Browse File'}
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: 'var(--dash-muted)' }}>
                    Supports: PDF, ZIP, DOCX up to 10MB
                  </p>
                </div>
                {uploadFileName && (
                  <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--dash-success)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fa-solid fa-file-circle-check" style={{ fontSize: '14px' }}></i> Ready to upload: <span style={{ textDecoration: 'underline' }}>{uploadFileName}</span>
                  </div>
                )}
              </div>

              <div className="profile-group mt-3">
                <label htmlFor="textarea-assign-notes" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>
                  Evaluation Comments
                </label>
                <textarea 
                  id="textarea-assign-notes" 
                  placeholder="Remarks for evaluator..." 
                  value={evalComments}
                  onChange={e => setEvalComments(e.target.value)}
                  style={{ width: '100%', height: '60px', padding: '8px', border: '1px solid var(--dash-border)', borderRadius: '6px' }}
                ></textarea>
              </div>
              <div className="dash-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="dash-btn-outline-sm btn-modal-cancel" onClick={() => setShowSubmitModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="dash-btn-sm">
                  Upload & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: FEES PAYMENT OVERLAY */}
      {showPayModal && (
        <div className="dash-modal-overlay active" id="modal-pay-fees">
          <div className="dash-modal-box">
            <div className="dash-modal-header">
              <h3>Process Secure Payment</h3>
              <button className="dash-modal-close" onClick={() => setShowPayModal(false)} aria-label="Close dialog">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handlePayFeesForm}>
              <div style={{ background: 'var(--dash-bg)', padding: '15px', borderRadius: '8px', border: '1px solid var(--dash-border)', marginBottom: '15px' }}>
                <div style={{ fontSize: '12px', color: 'var(--dash-muted)' }}>Outstanding: {paymentTitle}</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--dash-primary)', marginTop: '4px' }}>
                  ₹{paymentAmount.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="profile-group">
                <label htmlFor="card-num" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>
                  Credit / Debit Card Number
                </label>
                <input 
                  type="text" 
                  id="card-num" 
                  placeholder="4532 8888 8888 8888" 
                  value={cardDetails.number}
                  onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                  required 
                  maxLength={19}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--dash-border)', borderRadius: '6px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <div className="profile-group" style={{ flex: 2 }}>
                  <label htmlFor="card-expiry" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>
                    Expiry Date
                  </label>
                  <input 
                    type="text" 
                    id="card-expiry" 
                    placeholder="MM/YY" 
                    value={cardDetails.expiry}
                    onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    required 
                    maxLength={5}
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--dash-border)', borderRadius: '6px' }}
                  />
                </div>
                <div className="profile-group" style={{ flex: 1 }}>
                  <label htmlFor="card-cvv" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>
                    CVV
                  </label>
                  <input 
                    type="password" 
                    id="card-cvv" 
                    placeholder="123" 
                    value={cardDetails.cvv}
                    onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    required 
                    maxLength={3}
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--dash-border)', borderRadius: '6px' }}
                  />
                </div>
              </div>
              <div className="profile-group mt-3">
                <label htmlFor="card-name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '13px' }}>
                  Cardholder Full Name
                </label>
                <input 
                  type="text" 
                  id="card-name" 
                  placeholder="Danushkumar VS" 
                  value={cardDetails.name}
                  onChange={e => setCardDetails({ ...cardDetails, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--dash-border)', borderRadius: '6px' }}
                />
              </div>
              <div className="dash-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="dash-btn-outline-sm btn-modal-cancel" onClick={() => setShowPayModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="dash-btn-sm">
                  Confirm Payment
                </button>
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
