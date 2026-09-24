import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { ArrowUpRight, BarChart3, Bell, BriefcaseBusiness, Check, ChevronDown, CircleHelp, FileText, LayoutDashboard, LockKeyhole, Menu, Plus, Search, Settings2, Sparkles, UploadCloud, Users, X } from 'lucide-react'
import './App.css'

const trendData = [
  { name: 'Mon', score: 54 }, { name: 'Tue', score: 58 }, { name: 'Wed', score: 63 },
  { name: 'Thu', score: 61 }, { name: 'Fri', score: 69 }, { name: 'Sat', score: 76 }, { name: 'Sun', score: 82 },
]
const recentAnalyses = [
  { role: 'Senior Product Designer', company: 'Notion', score: 92, time: '2m ago', color: 'peach' },
  { role: 'Product Marketing Manager', company: 'Linear', score: 78, time: '1h ago', color: 'lilac' },
  { role: 'Growth Lead', company: 'Vercel', score: 64, time: 'Yesterday', color: 'mint' },
]
const matchingSkills = ['Product strategy', 'User research', 'Figma', 'Design systems', 'Prototyping']
const missingSkills = ['SQL', 'Experimentation']

function App() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [fileName, setFileName] = useState('Maya_Thompson_Resume.pdf')
  const [jobText, setJobText] = useState('We are looking for a Senior Product Designer to shape the next generation of collaborative tools. You will lead discovery, translate complex problems into simple experiences, and partner closely with engineering and product.')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const fileInput = useRef(null)
  const handleFile = (event) => { const file = event.target.files?.[0]; if (file) setFileName(file.name) }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-row"><div className="brand-mark"><Sparkles size={16} /></div><span className="brand-name">matchwise</span><button className="icon-button mobile-close" onClick={() => setIsMenuOpen(false)} aria-label="Close menu"><X size={18} /></button></div>
        <div className="workspace-switcher"><div className="avatar avatar-coral">MT</div><div><strong>Maya Thompson</strong><span>Personal workspace</span></div><ChevronDown size={15} /></div>
        <nav className="nav-list"><span className="nav-label">Workspace</span>
          {[[LayoutDashboard, 'Overview'], [FileText, 'My analyses'], [BarChart3, 'Insights'], [Users, 'Job tracker']].map(([Icon, label]) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label); setIsMenuOpen(false) }}><Icon size={17} /><span>{label}</span>{label === 'My analyses' && <span className="nav-count">8</span>}</button>)}
          <span className="nav-label nav-label-spaced">Account</span>
          {[[Settings2, 'Settings'], [CircleHelp, 'Help center']].map(([Icon, label]) => <button key={label} className="nav-item" onClick={() => setActiveNav(label)}><Icon size={17} /><span>{label}</span></button>)}
        </nav>
        <div className="sidebar-footer"><div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={15} /></div><strong>Unlock your edge</strong><p>Get deeper insights and unlimited analyses.</p><button>Explore Pro <ArrowUpRight size={14} /></button></div><div className="security-note"><LockKeyhole size={14} /><span>Your data is private & encrypted</span></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="icon-button mobile-menu" onClick={() => setIsMenuOpen(true)} aria-label="Open menu"><Menu size={19} /></button><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>{activeNav}</strong></div><div className="topbar-actions"><button className="icon-button" aria-label="Search"><Search size={18} /></button><button className="icon-button notification" aria-label="Notifications"><Bell size={18} /><i /></button><div className="avatar avatar-coral top-avatar">MT</div></div></header>
        <motion.div className="page-wrap" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
          <section className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> Monday, October 21, 2024</div><h1>Good morning, Maya <span>✦</span></h1><p>Turn every application into a more confident next step.</p></div><button className="outline-button"><Plus size={17} /> New analysis</button></section>
          <section className="hero-grid">
            <motion.div className="analysis-card" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1 }}><div className="card-kicker"><span className="kicker-icon"><Sparkles size={15} /></span><span>New match analysis</span><span className="kicker-line" /></div><h2>Find where you<br /><em>stand out.</em></h2><p className="analysis-intro">Compare your experience against any role and see exactly what makes you a strong fit.</p><div className="analysis-steps"><div className="upload-zone" onClick={() => fileInput.current?.click()}><input ref={fileInput} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} /><div className="upload-icon"><UploadCloud size={21} /></div><div><strong>{fileName}</strong><span>PDF · 1.2 MB · Ready to scan</span></div><Check className="success-check" size={17} /></div><div className="job-input-wrap"><div className="input-label"><BriefcaseBusiness size={14} /> Job description</div><textarea value={jobText} onChange={(event) => setJobText(event.target.value)} rows="3" /><span className="char-count">{jobText.length} / 5,000</span></div></div><button className="primary-button analyze-button"><Sparkles size={16} /> Analyze my match <ArrowUpRight size={16} /></button><div className="privacy-line"><LockKeyhole size={13} /> Your resume is never shared with employers</div></motion.div>
            <motion.div className="score-card" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .2 }}><div className="card-header"><div><span className="section-label">Latest match score</span><h3>Senior Product Designer</h3></div><button className="more-button">•••</button></div><div className="score-orbit"><div className="score-ring"><div className="score-number">82<span>%</span></div><span>Strong match</span></div><div className="orbit-dot dot-one" /><div className="orbit-dot dot-two" /></div><div className="score-meta"><div><strong>+12%</strong><span>vs. last analysis</span></div><div><strong>7 / 9</strong><span>key skills found</span></div></div><button className="text-button">View full report <ArrowUpRight size={15} /></button></motion.div>
          </section>
          <section className="metrics-row"><div className="metric-card"><div className="metric-top"><span className="metric-icon mint-icon"><FileText size={16} /></span><span className="trend positive">+18% <ArrowUpRight size={12} /></span></div><strong>12</strong><span>Analyses this month</span></div><div className="metric-card"><div className="metric-top"><span className="metric-icon peach-icon"><BriefcaseBusiness size={16} /></span><span className="trend positive">+4 <ArrowUpRight size={12} /></span></div><strong>8</strong><span>Roles in progress</span></div><div className="metric-card chart-metric"><div className="metric-top"><span className="metric-icon lilac-icon"><BarChart3 size={16} /></span><span className="trend positive">+9.4% <ArrowUpRight size={12} /></span></div><strong>74%</strong><span>Average match score</span><div className="mini-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trendData}><defs><linearGradient id="miniFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b9a6eb" stopOpacity=".36" /><stop offset="100%" stopColor="#b9a6eb" stopOpacity="0" /></linearGradient></defs><Area type="monotone" dataKey="score" stroke="#9f8adf" strokeWidth={2} fill="url(#miniFill)" /></AreaChart></ResponsiveContainer></div></div></section>
          <section className="lower-grid"><div className="panel trend-panel"><div className="panel-heading"><div><span className="section-label">Your momentum</span><h3>Match score over time</h3></div><button className="select-button">Last 7 days <ChevronDown size={14} /></button></div><div className="big-trend"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}><defs><linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#cfbdf7" stopOpacity=".4" /><stop offset="100%" stopColor="#cfbdf7" stopOpacity="0" /></linearGradient></defs><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#98939a', fontSize: 11 }} /><Tooltip contentStyle={{ background: '#252229', border: 0, borderRadius: 8, color: '#fff' }} /><Area type="monotone" dataKey="score" stroke="#ad96e8" strokeWidth={2.5} fill="url(#trendFill)" /></AreaChart></ResponsiveContainer></div></div><div className="panel skills-panel"><div className="panel-heading"><div><span className="section-label">Latest report</span><h3>Skill breakdown</h3></div><button className="more-button">•••</button></div><div className="skill-group"><span className="skill-title matched"><Check size={13} /> Matching</span><div className="skill-chips">{matchingSkills.map((skill) => <span key={skill} className="skill-chip">{skill}</span>)}</div></div><div className="skill-group"><span className="skill-title missing"><X size={13} /> Worth highlighting</span><div className="skill-chips">{missingSkills.map((skill) => <span key={skill} className="skill-chip missing-chip">{skill}</span>)}</div></div><button className="text-button report-button">Open detailed report <ArrowUpRight size={15} /></button></div></section>
          <section className="recent-section"><div className="section-heading"><div><span className="section-label">Keep going</span><h3>Recent analyses</h3></div><button className="text-button">View all <ArrowUpRight size={15} /></button></div><div className="recent-list">{recentAnalyses.map((analysis) => <div className="recent-item" key={analysis.role}><div className={`company-mark ${analysis.color}`}>{analysis.company[0]}</div><div className="recent-role"><strong>{analysis.role}</strong><span>{analysis.company} · {analysis.time}</span></div><div className="recent-score"><div className="score-bar"><span style={{ width: `${analysis.score}%` }} /></div><strong>{analysis.score}%</strong></div><button className="arrow-button" aria-label={`Open ${analysis.role}`}><ArrowUpRight size={16} /></button></div>)}</div></section>
        </motion.div>
      </main>
    </div>
  )
}
export default App
