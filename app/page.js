'use client';
import { useMemo, useState } from 'react';

const calls = [
  { id: 'CL-1048', company: 'NMC Sewage Division', contact: 'Priya Deshmukh', service: 'STP Ozonation AMC', value: '₹4,85,000', stage: 'Quote due', owner: 'Aditi', age: 'Today' },
  { id: 'CL-1047', company: 'City Garden Hotel', contact: 'R. Kapoor', service: 'Water treatment upgrade', value: '₹2,10,000', stage: 'Site visit', owner: 'Alvin', age: 'Yesterday' },
  { id: 'CL-1046', company: 'Maha Metro Depot', contact: 'V. Nair', service: 'Odour control system', value: '₹8,70,000', stage: 'Qualified', owner: 'Amar', age: '29 Aug' },
];
const tasks = [
  { title: 'Meet NMC Site 03 supervisor', assignee: 'Alvin', due: 'Today, 4:30 PM', tag: 'Client visit', state: 'In progress' },
  { title: 'Prepare CL-1048 quotation', assignee: 'Aditi', due: 'Tomorrow', tag: 'Quotation', state: 'To do' },
  { title: 'Approve Site 01 travel expense', assignee: 'Admin', due: 'Today', tag: 'Approval', state: 'Needs approval' },
];
const sites = [
  ['NMC Site 01', 'STP, Bhandewadi', 'Amar · Alvin', '₹18,450', 'On track'],
  ['NMC Site 02', 'STP, Nara', 'Amar · Rahul', '₹9,280', 'On track'],
  ['NMC Site 03', 'STP, Manish Nagar', 'Alvin · Rahul', '₹31,650', 'Action needed'],
  ['NMC Site 04', 'STP, Hudkeshwar', 'Amar · Aditi', '₹12,100', 'On track'],
];
const nav = [
  ['Overview', '◈'], ['Client calls', '◌'], ['Tasks', '✓'], ['Sites', '⌂'], ['Expenses', '₹'], ['Tenders', '▣'], ['Invoices', '▤'], ['Reports', '◫']
];

function Badge({ children, type = 'neutral' }) { return <span className={`badge ${type}`}>{children}</span>; }

export default function Home() {
  const [active, setActive] = useState('Overview');
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');
  const [taskList, setTaskList] = useState(tasks);
  const [query, setQuery] = useState('');
  const visibleCalls = useMemo(() => calls.filter(c => `${c.company} ${c.service} ${c.id}`.toLowerCase().includes(query.toLowerCase())), [query]);
  function notify(message) { setToast(message); setTimeout(() => setToast(''), 2800); }
  function addTask(e) { e.preventDefault(); const data = new FormData(e.currentTarget); setTaskList([{ title: data.get('title'), assignee: data.get('assignee'), due: data.get('due'), tag: 'New task', state: 'To do' }, ...taskList]); setModal(null); notify('Task assigned and WhatsApp notification queued.'); }
  const title = active === 'Overview' ? 'Good morning, Anil' : active;

  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brandmark">KH</div><div><strong>KH Ozonator</strong><small>Operations hub</small></div></div>
      <div className="company-switch"><span className="mini-logo">K</span><span>KH Ozonator Pvt. Ltd.</span><b>⌄</b></div>
      <nav>{nav.map(([label, icon]) => <button key={label} className={active === label ? 'nav active' : 'nav'} onClick={() => setActive(label)}><i>{icon}</i>{label}{label === 'Tasks' && <em>3</em>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help">? <span>Need help?</span></div><div className="profile"><div className="avatar admin">AN</div><div><b>Anil N.</b><small>Admin · Owner</small></div><span>⌄</span></div></div>
    </aside>
    <section className="content">
      <header><div><p className="eyebrow">Tuesday, 02 September 2026</p><h1>{title}</h1></div><div className="header-actions"><button className="icon-button">⌕</button><button className="icon-button bell">♧<span></span></button><button className="primary" onClick={() => setModal('task')}>+ Create task</button></div></header>
      <div className="notice"><span className="whatsapp">◔</span><div><b>WhatsApp is connected</b><small>Updates and payment reminders will be sent automatically.</small></div><button onClick={() => notify('WhatsApp configuration is ready for this prototype.')}>Manage</button></div>
      {active === 'Overview' ? <>
        <section className="metrics">
          <div className="metric"><span className="metric-icon blue">◌</span><div><small>Open client calls</small><b>12</b><p className="up">↑ 3 this week</p></div></div>
          <div className="metric"><span className="metric-icon orange">✓</span><div><small>Tasks due today</small><b>8</b><p>3 need your review</p></div></div>
          <div className="metric"><span className="metric-icon green">₹</span><div><small>Pending approvals</small><b>₹1.24L</b><p>7 expense requests</p></div></div>
          <div className="metric"><span className="metric-icon purple">▣</span><div><small>Active sites</small><b>10</b><p>2 need attention</p></div></div>
        </section>
        <div className="grid two"><section className="panel"><div className="panel-head"><div><h2>Priority tasks</h2><p>Keep work moving today</p></div><button className="text-button" onClick={() => setActive('Tasks')}>View all →</button></div><div className="task-list">{taskList.slice(0,3).map((t, i) => <article className="task" key={i}><button className="checkbox" onClick={() => notify(`Marked “${t.title}” as complete.`)}></button><div className="task-copy"><b>{t.title}</b><span>{t.assignee} · {t.due}</span></div><Badge type={t.state === 'Needs approval' ? 'amber' : t.state === 'In progress' ? 'blue' : 'neutral'}>{t.state}</Badge></article>)}</div></section>
        <section className="panel pipeline"><div className="panel-head"><div><h2>Call pipeline</h2><p>This month · ₹24.3L potential</p></div><button className="text-button" onClick={() => setActive('Client calls')}>Open calls →</button></div><div className="funnel"><div style={{width:'100%'}}><span>New</span><b>18</b></div><div style={{width:'82%'}}><span>Qualified</span><b>12</b></div><div style={{width:'62%'}}><span>Quotation</span><b>7</b></div><div style={{width:'43%'}}><span>Won</span><b>4</b></div></div></section></div>
        <section className="panel wide-panel"><div className="panel-head"><div><h2>Active site operations</h2><p>Live snapshot across NMC projects</p></div><button className="text-button" onClick={() => setActive('Sites')}>All sites →</button></div><div className="site-grid">{sites.map(([name, location, people, cost, status]) => <article className="site-card" key={name}><div className="site-title"><span className="site-icon">⌂</span><div><b>{name}</b><small>{location}</small></div><Badge type={status === 'Action needed' ? 'red' : 'green'}>{status}</Badge></div><div className="site-data"><span>Assigned <b>{people}</b></span><span>Expenses <b>{cost}</b></span></div><div className="progress"><i style={{width: status === 'Action needed' ? '48%' : '76%'}}></i></div></article>)}</div></section>
      </> : <ModuleView active={active} calls={visibleCalls} query={query} setQuery={setQuery} setModal={setModal} notify={notify} />}
    </section>
    {modal === 'task' && <div className="overlay" onMouseDown={() => setModal(null)}><form className="modal" onSubmit={addTask} onMouseDown={e => e.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">TASK ASSIGNMENT</p><h2>Create a task</h2></div><button type="button" className="close" onClick={() => setModal(null)}>×</button></div><label>Task title<input name="title" required placeholder="e.g. Visit NMC Site 03" /></label><label>Assign to<select name="assignee" defaultValue="Alvin"><option>Alvin</option><option>Amar</option><option>Rahul</option><option>Aditi</option></select></label><label>Due date & time<input name="due" required defaultValue="Tomorrow, 11:00 AM" /></label><div className="modal-actions"><button type="button" className="secondary" onClick={() => setModal(null)}>Cancel</button><button className="primary">Assign task</button></div></form></div>}
    {toast && <div className="toast">✓ {toast}</div>}
  </main>;
}

function ModuleView({ active, calls, query, setQuery, setModal, notify }) {
  if (active === 'Client calls') return <section className="panel module"><div className="panel-head"><div><p className="eyebrow">LEADS & QUOTATIONS</p><h2>Client calls</h2><p>Capture calls, send quotations, convert to projects.</p></div><button className="primary" onClick={() => notify('New client call form opened in the production workflow.')}>+ Add call</button></div><input className="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search client, call ID or service…" /><div className="table"><div className="row table-head"><span>Call</span><span>Service</span><span>Value</span><span>Owner</span><span>Status</span></div>{calls.map(c => <div className="row" key={c.id}><div><b>{c.company}</b><small>{c.id} · {c.contact}</small></div><span>{c.service}</span><b>{c.value}</b><span>{c.owner}</span><Badge type={c.stage === 'Quote due' ? 'amber' : 'blue'}>{c.stage}</Badge></div>)}</div></section>;
  const descriptions = { Tasks: 'Assign work, capture site-visit outcomes, files, date/time and forward it to the next owner.', Sites: 'Manage 10 active NMC sites, employee assignments and site-wise work details.', Expenses: 'Submit paid or unpaid expenses. Admin and accountant approval controls payment release.', Tenders: 'Upload tender documents, build BOQs from Excel, send vendor inquiries and generate PDF/Excel quotations.', Invoices: 'Create invoices, monitor dues and send automated payment reminders.', Reports: 'Track project progress, spend, receivables and team execution.' };
  return <section className="panel module empty"><p className="eyebrow">{active.toUpperCase()}</p><h2>{active} workspace</h2><p>{descriptions[active]}</p><div className="workflow"><span>1. Create</span><i></i><span>2. Assign</span><i></i><span>3. Track</span><i></i><span>4. Approve</span></div><button className="primary" onClick={() => active === 'Tasks' ? setModal('task') : notify(`${active} workflow is ready to configure.`)}>+ Start {active === 'Tasks' ? 'task' : active.slice(0,-1)}</button></section>;
}
