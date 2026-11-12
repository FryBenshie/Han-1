import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <main className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Hero Section */}
        <section className="mb-20">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
            Farhan Fathurahman
          </h1>
          <h2 className="text-2xl font-medium text-blue-600 mb-6">
            System Engineer & IT Infrastructure Specialist
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Experienced IT professional specializing in infrastructure administration, email server hosting, 
            network configuration, and cloud collaboration. Proven track record in maintaining server uptime, 
            managing Microsoft 365 ecosystems, and ensuring robust network security.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="mailto:farhanfath26@gmail.com" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Contact Me
            </a>
            <a href="https://linkedin.com/in/frhnfathra26" target="_blank" rel="noreferrer" className="bg-slate-200 text-slate-800 px-6 py-3 rounded-lg font-medium hover:bg-slate-300 transition">
              LinkedIn
            </a>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold border-b-2 border-slate-200 pb-2 mb-6">Core Competencies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Server Administration', 'Microsoft 365 & SharePoint', 'Network Routing (MikroTik)', 'Email Security (SPF/DKIM/DMARC)', 'cPanel Hosting', 'Hardware & PABX', 'Database Management', 'Troubleshooting'].map((skill) => (
              <div key={skill} className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm text-center font-medium text-slate-700">
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold border-b-2 border-slate-200 pb-2 mb-6">Professional Experience</h3>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h4 className="text-xl font-bold text-slate-800">Assistant Supervisor IT</h4>
              <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full text-sm">Oct 2021 - Nov 2026</span>
            </div>
            <p className="text-slate-500 font-medium mb-4">PT. GLC Consulting</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-2">
              <li>Monitored, maintained, and configured enterprise email servers and cPanel hosting.</li>
              <li>Managed email authentication (SPF, DKIM, DMARC) and spam filtering to ensure secure communications.</li>
              <li>Administered Microsoft 365 services and cloud-based document collaboration via SharePoint Online.</li>
              <li>Configured and troubleshooted networking using MikroTik routers.</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h4 className="text-xl font-bold text-slate-800">IT Technician</h4>
              <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full text-sm">Mar 2020 - Oct 2021</span>
            </div>
            <p className="text-slate-500 font-medium mb-4">BMS Computer</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-2">
              <li>Installed CCTV systems and configured DVR operations.</li>
              <li>Performed mobile hardware/software troubleshooting and network repairs.</li>
              <li>Assembled PCs according to specific User requirements.</li>
            </ul>
          </div>
        </section>

      </main>
    </div>
  );
}