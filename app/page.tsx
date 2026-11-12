'use client';

import { useEffect, useState } from 'react';

type View = 'home' | 'experience' | 'projects' | 'skills' | 'learning' | 'contact';
const MENU: [View, string, string][] = [
  ['experience', 'Experience', 'Three companies, seven years'],
  ['projects', 'Projects', 'Work I delivered and labs I’m building'],
  ['skills', 'Skills', 'The tools I use every day'],
  ['learning', 'Learning plan', 'What I’m mastering next'],
  ['contact', 'Contact', 'Let’s talk about the role'],
];

const ROLES: { name: string; title: string; when: string; feats: [string, string][]; more: string[] }[] = [
  { name: 'PT. GLC Consulting', title: 'Assistant Supervisor IT', when: 'Oct 2021 to Nov 2026', feats: [
    ['Email forensics', 'Analysed email headers to catch suspicious messages that slipped past the spam filter, then tuned whitelists, blacklists and spam scores.'],
    ['Mail authentication', 'Verified SPF, DKIM and DMARC and fixed authentication and delivery failures.'],
    ['Client document access', 'Set access rights on SharePoint Online for staff and external clients.'],
    ['Mailbox archiving', 'Archived leavers’ mailboxes from cPanel and Outlook to PST and set up accounts for new hires.'],
    ['Team and SOP', 'Made sure the IT team followed company SOPs and wrote IT activity reports.'] ],
    more: ['Monitored, maintained and configured the company mail server and website hosting in cPanel.', 'Administered users and settings in the Microsoft 365 admin portal; configured Outlook Desktop and Office.', 'Designed new networks and troubleshot MikroTik; installed and maintained the PABX phone network.', 'Built and maintained the company catalog website in HTML, CSS and JavaScript.', 'Ran weekly backups; also handled CCTV, DVR and hardware.'] },
  { name: 'PT. Indomarco Prismatama', title: 'IT Support', when: 'Sep 2019 to Mar 2020', feats: [
    ['SQL and PostgreSQL', 'Repaired store databases remotely using SQL and PostgreSQL.'],
    ['Store data pulls', 'Pulled daily, monthly and yearly data from every store.'],
    ['Remote MikroTik', 'Fixed store network problems on MikroTik remotely.'] ],
    more: ['Solved software and network issues for stores remotely.'] },
  { name: 'BMS Computer', title: 'IT Technician', when: 'Mar 2020 to Oct 2021', feats: [
    ['Installations', 'Installed CCTV and configured DVRs.'],
    ['Custom PC builds', 'Assembled PCs to each customer’s requirements.'],
    ['Field support', 'Troubleshot hardware, software and network problems on site and remotely.'] ],
    more: [] },
];

const PROJECTS: [string, string, string, string][] = [
  ['Company catalog website', 'Built and maintained the company’s product catalog site.', 'HTML, CSS, JavaScript', 'Delivered at work'],
  ['Mail security setup', 'SPF, DKIM and DMARC checks, spam filtering and delivery troubleshooting for the company mail server.', 'Mail server, cPanel', 'Delivered at work'],
  ['Leaver mailbox archive', 'Archived the mailboxes of departing staff from cPanel and Outlook to PST and set up accounts for replacements.', 'cPanel, Outlook, PST', 'Delivered at work'],
  ['Store database repairs', 'Remote repairs of store databases and data pulls across every store.', 'SQL, PostgreSQL', 'Delivered at work'],
  ['Mail server on Linux', 'Postfix and Dovecot with SPF, DKIM and DMARC, built from scratch in a home lab.', 'Linux, Postfix', 'Next lab'],
  ['Onboarding automation', 'New-hire accounts and a server baseline automated with Ansible.', 'Ansible, Bash', 'Next lab'],
];

const HDR: { t: string; w: string; bad?: boolean }[] = [
  { t: 'From: "Accounts Team" <billing@acme-payments.example>', w: 'The display name can say anything. I look at the real domain and whether it matches the company it claims to be.' },
  { t: 'Reply-To: payments.helpdesk@mailbox-free.example', w: 'Replies would go to a different domain than the sender. A classic sign of impersonation.', bad: true },
  { t: 'Return-Path: <bounce@mailer-77.example>', w: 'The bounce address belongs to a third party, so the message did not leave the sender’s own mail server.', bad: true },
  { t: 'Received: from unknown (mailer-77.example [203.0.113.45])', w: 'I read the Received chain from the bottom up to find the real origin, then check that IP’s reputation.', bad: true },
  { t: 'Authentication-Results: spf=fail; dkim=none; dmarc=fail', w: 'SPF says this server may not send for the domain, DKIM has no signature, and DMARC fails. The strongest evidence here.', bad: true },
  { t: 'X-Spam-Score: 8.4', w: 'A high score. Patterns like this help me tune spam scores, whitelists and blacklists.', bad: true },
  { t: 'Subject: URGENT: invoice overdue, pay today', w: 'Urgency is pressure. It proves nothing alone, but it matters next to everything above.' },
];

const SKILLS: [string, string[]][] = [
  ['Mail and security', ['Mail server administration', 'SPF, DKIM, DMARC', 'Spam filtering', 'Email header analysis', 'cPanel hosting']],
  ['Microsoft 365', ['Admin portal', 'SharePoint Online', 'Outlook Desktop', 'Microsoft Office']],
  ['Network and voice', ['MikroTik', 'PABX', 'Remote network troubleshooting']],
  ['Data', ['SQL', 'PostgreSQL', 'Weekly backups', 'PST archiving']],
  ['Web and code', ['HTML', 'CSS', 'JavaScript', 'VB.Net']],
  ['Also', ['Fingerprint machines', 'CCTV and DVR', 'Hardware troubleshooting']],
];

const ROAD: { phase: string; goal: string; items: [string, string][] }[] = [
  { phase: 'Linux you can prove', goal: 'Run a server from the command line. Your 2020 training is the starting point.', items: [
    ['Users, permissions and sudo', 'Create users and groups and use sudo properly.'],
    ['Disks, LVM and systemd', 'Add a disk, extend a volume, write your own service unit.'],
    ['Bash scripting', 'Rewrite your weekly backup as a script with logs.'],
    ['Firewall and SSH hardening', 'ufw or nftables, key-only SSH, fail2ban.'],
    ['LPIC-1 or RHCSA', 'Pick one exam and book a date.'] ] },
  { phase: 'Your services, on Linux', goal: 'Rebuild what you already manage, to understand it from the inside.', items: [
    ['Postfix and Dovecot mail server', 'Send and receive mail with SPF, DKIM and DMARC set up by you.'],
    ['Nginx or Apache with HTTPS', 'Host this portfolio with a Let’s Encrypt certificate.'],
    ['DNS with BIND or Unbound', 'Run a local zone and understand MX, TXT and PTR records.'] ] },
  { phase: 'Databases', goal: 'Grow from using SQL to administering databases.', items: [
    ['PostgreSQL backup and restore', 'Use pg_dump and test a restore.'],
    ['Replication and monitoring', 'Set up a replica and watch its lag.'] ] },
  { phase: 'Automation', goal: 'Stop doing repeatable work by hand.', items: [
    ['Git', 'Keep every script in a repository.'],
    ['Ansible', 'Automate new-hire account setup and a server baseline.'],
    ['Docker and Compose', 'Containerise a web app and its database.'] ] },
  { phase: 'Visibility and virtualization', goal: 'Know about problems before users do.', items: [
    ['Zabbix or Prometheus with Grafana', 'Alert on disk, CPU and mail queue.'],
    ['Proxmox or VMware', 'Build a small lab with several VMs.'],
    ['Centralised logs', 'Ship logs to one place and search them.'] ] },
  { phase: 'Microsoft and cloud depth', goal: 'Turn Microsoft 365 experience into an engineering skill.', items: [
    ['PowerShell for Microsoft 365', 'Bulk-create users and audit SharePoint permissions.'],
    ['Entra ID, Exchange Online, Intune', 'Understand identity, mail flow and device management.'],
    ['AZ-104 or MS-102', 'Choose the exam that matches the job you want.'],
    ['Backup and recovery plan (3-2-1)', 'Write and run a restore test, not just a backup.'] ] },
  { phase: 'Network depth', goal: 'Go from configuring MikroTik to designing networks.', items: [
    ['VLANs and firewall rules', 'Segment staff, guests and servers on MikroTik.'],
    ['Site-to-site VPN with WireGuard', 'Connect two sites securely.'],
    ['MTCNA', 'MikroTik’s entry certification.'] ] },
];
const TOTAL = ROAD.reduce((n, p) => n + p.items.length, 0);

export default function Home() {
  const [view, setView] = useState<View>('home');
  const [role, setRole] = useState(0);
  const [pick, setPick] = useState(4);
  const [flags, setFlags] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem('ff-road'); if (s) setDone(JSON.parse(s)); } catch (e) { /* storage unavailable */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem('ff-road', JSON.stringify(done)); } catch (e) { /* storage unavailable */ }
  }, [done, ready]);

  const go = (v: View) => { setView(v); window.scrollTo(0, 0); };
  const count = ROAD.reduce((n, p) => n + p.items.filter(([t]) => done[t]).length, 0);
  const bad = HDR.filter((h) => h.bad).length;
  const R = ROLES[role];
  const copy = async () => {
    try { await navigator.clipboard.writeText('farhanfath26@gmail.com'); setCopied(true); } catch (e) { setCopied(false); }
  };

  return (
    <>
      <main className="ff">
        {view === 'home' ? (
          <div className="view">
            <section className="open">
              <div className="photo">
                <span>FF</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/farhan.jpg" alt="Farhan Fathurahman" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <h1>Farhan Fathurahman</h1>
              <p className="role">IT infrastructure, heading to system engineering</p>
              <p className="lead">Seven years in IT, the last five running mail, Microsoft 365, hosting and networks for a whole company. Pick a door below.</p>
              <p className="status"><i /> Open to System Engineer roles</p>
            </section>
            <nav className="menu" aria-label="Portfolio sections">
              {MENU.map(([v, t, d]) => (
                <button key={v} type="button" className="tile" onClick={() => go(v)}><b>{t}</b><span>{d}</span></button>
              ))}
            </nav>
          </div>
        ) : (
          <div className="view" key={view}>
            <div className="top">
              <button type="button" className="tab home" onClick={() => go('home')}>Home</button>
              {MENU.map(([v, t]) => (
                <button key={v} type="button" className={'tab' + (view === v ? ' on' : '')} onClick={() => go(v)}>{t}</button>
              ))}
            </div>

            {view === 'experience' && (
              <section>
                <h2>Experience</h2>
                <div className="seg" role="tablist">
                  {ROLES.map((r, i) => (
                    <button key={r.name} type="button" role="tab" aria-selected={role === i} className={'tab' + (role === i ? ' on' : '')} onClick={() => setRole(i)}>{r.name}</button>
                  ))}
                </div>
                <p className="when"><b>{R.title}</b> · {R.when}</p>
                <div className="grid">
                  {R.feats.map(([t, d], i) => (
                    <article key={t} className={'card c' + (i % 3)}><h3>{t}</h3><p>{d}</p></article>
                  ))}
                </div>
                {R.more.length > 0 && (
                  <div className="more"><h3>Also</h3><ul>{R.more.map((m) => <li key={m}>{m}</li>)}</ul></div>
                )}
                <p className="sub">Training: Linux Administration Batch IV at PT. IT Group Indonesia (July 2020, certificate of attendance).</p>
              </section>
            )}

            {view === 'projects' && (
              <section>
                <h2>Projects</h2>
                <p className="sub">Real work from my jobs, plus the labs I’m building next.</p>
                <div className="grid">
                  {PROJECTS.map(([n, d, t, s], i) => (
                    <article key={n} className={'card c' + (i % 3)}><h3>{n}</h3><p>{d}</p><p className="meta">{t} · {s}</p></article>
                  ))}
                </div>
                <h3 className="lh">Try it: read a suspicious email header</h3>
                <p className="sub">A made-up example of what I looked for when phishing got past the filter. Click a line.</p>
                <div className="lab">
                  <div className="mail">
                    {HDR.map((h, i) => (
                      <button key={i} type="button" className={'hl' + (pick === i ? ' on' : '') + (flags && h.bad ? ' bad' : '')} onClick={() => setPick(i)}>{h.t}</button>
                    ))}
                  </div>
                  <div className="why" aria-live="polite">
                    <h3>What I check {flags && HDR[pick].bad && <em>red flag</em>}</h3>
                    <p>{HDR[pick].w}</p>
                    <button className="btn alt" type="button" onClick={() => setFlags(!flags)}>{flags ? 'Hide red flags' : 'Show red flags'}</button>
                    {flags && <p className="verdict">{bad} red flags. My call: block the sender, warn staff, and blacklist the domain.</p>}
                  </div>
                </div>
              </section>
            )}

            {view === 'skills' && (
              <section>
                <h2>Skills</h2>
                <div className="grid">
                  {SKILLS.map(([g, list], i) => (
                    <article key={g} className={'card c' + (i % 3)}>
                      <h3>{g}</h3>
                      <ul className="chips">{list.map((s) => <li key={s}>{s}</li>)}</ul>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {view === 'learning' && (
              <section>
                <h2>Learning plan</h2>
                <p className="sub">What I’m mastering next, in order. Tick items as you finish them. Progress is saved in this browser.</p>
                <div className="prog"><div className="barx"><div style={{ width: (count / TOTAL) * 100 + '%' }} /></div><b>{count} of {TOTAL}</b></div>
                {ROAD.map((p) => (
                  <div key={p.phase} className="phase">
                    <h3>{p.phase}</h3>
                    <p className="goal">{p.goal}</p>
                    {p.items.map(([t, h]) => (
                      <label key={t} className={'it' + (done[t] ? ' ok' : '')}>
                        <input type="checkbox" checked={!!done[t]} onChange={() => setDone((d) => ({ ...d, [t]: !d[t] }))} />
                        <span><b>{t}</b><small>{h}</small></span>
                      </label>
                    ))}
                  </div>
                ))}
              </section>
            )}

            {view === 'contact' && (
              <section>
                <h2>Contact</h2>
                <p className="sub">Hiring for system engineering? I’d like to hear about the role. Email is the fastest way to reach me.</p>
                <div className="btns">
                  <a className="btn" href="mailto:farhanfath26@gmail.com">Email me</a>
                  <a className="btn alt" href="https://linkedin.com/in/frhnfathra26" target="_blank" rel="noreferrer">LinkedIn</a>
                  <button className="btn alt" type="button" onClick={copy}>{copied ? 'Copied' : 'Copy email'}</button>
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <style jsx global>{`
        :root{--bg:#fff6dc;--sf:#fff;--tx:#16130f;--mu:#5d5648;--ln:#16130f;--ink:#16130f;--sun:#ffd23f;--hot:#ff5a3c;--blue:#2447ff;--bt:#fff;--head:"Bahnschrift","Avenir Next Condensed","Arial Narrow",system-ui,sans-serif}
        @media (prefers-color-scheme:dark){:root{--bg:#17140f;--sf:#241f17;--tx:#fff3d6;--mu:#c9bd9f;--ln:#fff3d6;--blue:#8da0ff;--bt:#17140f}}
        body{margin:0;background:var(--bg)!important;color:var(--tx)!important;font:16px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
        .ff{max-width:940px;margin:0 auto;padding:24px 20px 80px}
        .ff :focus-visible{outline:3px solid var(--blue);outline-offset:3px}
        .ff h1,.ff h2,.ff h3{font-family:var(--head);font-weight:800;margin:0}
        @media (prefers-reduced-motion:no-preference){.view{animation:in .28s ease-out}}
        @keyframes in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .open{background:var(--sun);color:var(--ink);border:3px solid var(--ln);border-radius:20px;box-shadow:8px 8px 0 var(--ln);padding:44px 28px;margin-top:24px;display:grid;justify-items:start;gap:8px}
        .photo{position:relative;width:190px;height:190px;border-radius:50%;border:4px solid var(--ink);overflow:hidden;background:var(--hot);display:grid;place-items:center;font:800 3.2rem var(--head);box-shadow:6px 6px 0 var(--ink);margin-bottom:14px}
        .photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 15%}
        .ff h1{font-size:clamp(2.8rem,10vw,5.4rem);line-height:.95;letter-spacing:-.015em}
        .role{font:700 clamp(1.2rem,3.4vw,1.6rem) var(--head);margin:0}
        .lead{max-width:56ch;margin:6px 0 4px;font-size:1.08rem}
        .status{display:flex;gap:8px;align-items:center;font-weight:700;margin:0}
        .status i{width:12px;height:12px;border-radius:50%;background:var(--hot);border:2px solid var(--ink);display:inline-block}
        .menu{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:32px}
        .tile{text-align:left;font:inherit;cursor:pointer;background:var(--sf);color:var(--tx);border:3px solid var(--ln);border-radius:14px;padding:18px 20px;display:grid;gap:4px;box-shadow:5px 5px 0 var(--ln);transition:transform .12s,box-shadow .12s}
        .tile b{font:800 1.6rem var(--head)}
        .tile span{color:var(--mu)}
        .tile:hover{transform:translate(-3px,-3px);box-shadow:8px 8px 0 var(--ln)}
        .tile:nth-child(3n+1):hover{background:var(--sun);color:var(--ink)}.tile:nth-child(3n+2):hover{background:var(--hot);color:var(--ink)}.tile:nth-child(3n):hover{background:var(--blue);color:var(--bt)}
        .tile:hover span{color:inherit}
        .top,.seg{display:flex;gap:8px;flex-wrap:wrap}
        .top{margin-bottom:36px}
        .seg{margin:16px 0 14px}
        .tab{font:inherit;font-weight:700;font-size:.95rem;cursor:pointer;background:var(--sf);color:var(--tx);border:2px solid var(--ln);border-radius:999px;padding:6px 16px}
        .tab:hover{background:var(--sun);color:var(--ink)}
        .tab.on{background:var(--tx);color:var(--bg)}
        .tab.home{background:var(--hot);color:var(--ink);border-color:var(--ink)}
        .ff h2{font-size:clamp(2rem,6vw,3rem);line-height:1;margin-bottom:10px}
        .sub{color:var(--mu);max-width:62ch;margin:0 0 18px}
        .when{margin:0 0 18px}
        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:16px;margin-bottom:22px}
        .card{background:var(--sf);border:3px solid var(--ln);border-radius:14px;padding:0 0 16px;box-shadow:5px 5px 0 var(--ln);overflow:hidden}
        .card h3{padding:10px 18px;border-bottom:3px solid var(--ln);font-size:1.3rem;color:var(--ink)}
        .card.c0 h3{background:var(--sun)}.card.c1 h3{background:var(--hot)}.card.c2 h3{background:var(--blue);color:#fff}
        .card p{margin:12px 18px 0}
        .card .meta{color:var(--mu);font-size:.9rem}
        .chips{list-style:none;display:flex;gap:6px;flex-wrap:wrap;margin:12px 18px 0;padding:0}
        .chips li{border:2px solid var(--ln);border-radius:999px;padding:1px 12px;font-size:.92rem}
        .more{border:3px dashed var(--ln);border-radius:14px;padding:14px 20px;margin-bottom:22px}
        .more ul{margin:8px 0 0;padding-left:20px;list-style:disc}
        .more li{margin-bottom:4px}
        .btns{display:flex;gap:10px;flex-wrap:wrap}
        .btn{display:inline-block;font:inherit;font-weight:700;cursor:pointer;background:var(--blue);color:var(--bt);border:3px solid var(--ln);border-radius:10px;padding:10px 20px;text-decoration:none;box-shadow:4px 4px 0 var(--ln)}
        .btn.alt{background:var(--sf);color:var(--tx)}
        .btn:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--ln)}
        .lh{font-size:1.6rem;margin:36px 0 6px}
        .lab{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:16px;align-items:start}
        @media (max-width:760px){.lab{grid-template-columns:1fr}}
        .mail{background:var(--ink);border-radius:12px;padding:10px;display:grid;gap:4px;border:3px solid var(--ln)}
        .hl{text-align:left;background:none;border:0;border-left:4px solid transparent;color:#fff3d6;font:13px/1.5 ui-monospace,Consolas,Menlo,monospace;padding:8px 10px;border-radius:4px;cursor:pointer;overflow-wrap:anywhere}
        .hl:hover{background:rgba(255,255,255,.1)}
        .hl.on{background:rgba(255,255,255,.16);border-left-color:var(--sun)}
        .hl.bad{color:#ff9d88}
        .why{background:var(--sf);border:3px solid var(--ln);border-radius:12px;padding:16px 18px;display:grid;gap:12px;box-shadow:5px 5px 0 var(--ln)}
        .why p{margin:0}
        .why em{font:700 .8rem system-ui;font-style:normal;background:var(--hot);color:var(--ink);border-radius:4px;padding:1px 8px;margin-left:8px;vertical-align:middle}
        .verdict{font-weight:700;border-top:3px dashed var(--ln);padding-top:12px}
        .prog{display:flex;gap:14px;align-items:center;margin-bottom:24px}
        .barx{flex:1;height:16px;border:3px solid var(--ln);border-radius:10px;overflow:hidden;background:var(--sf)}
        .barx div{height:100%;background:var(--hot);transition:width .3s}
        .phase{margin-bottom:26px}
        .goal{color:var(--mu);margin:2px 0 10px}
        .it{display:flex;gap:12px;align-items:flex-start;background:var(--sf);border:2px solid var(--ln);border-radius:10px;padding:10px 14px;margin-bottom:8px;cursor:pointer}
        .it:hover{background:var(--sun);color:var(--ink)}
        .it:hover small{color:inherit}
        .it input{accent-color:var(--blue);width:18px;height:18px;margin-top:3px}
        .it.ok b{text-decoration:line-through}
        .it.ok{opacity:.65}
        .it span{display:grid}
        .it small{color:var(--mu);font-size:.9rem}
      `}</style>
    </>
  );
}
