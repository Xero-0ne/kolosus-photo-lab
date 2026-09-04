'use client';

import { useEffect, useState } from 'react';
import {
  AudioWaveform,
  Bot,
  Check,
  ChevronDown,
  Code2,
  Download,
  Gamepad2,
  Mail,
  MapPin,
  Menu,
  Network,
  Radio,
  Server,
  ShieldCheck,
  TicketCheck,
  X,
} from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const email = 'xeroone000@gmail.com';

const metrics = [
  { value: '4,000', label: 'networked devices' },
  { value: '24', label: 'active sites' },
  { value: '98%+', label: 'fleet availability' },
  { value: '1-2h', label: 'critical response' },
];

const strengths = [
  {
    icon: Network,
    title: 'Network operations',
    text: 'MikroTik routing, managed switching, VLANs, static addressing, PoE and point-to-point wireless.',
    tone: 'teal',
  },
  {
    icon: TicketCheck,
    title: 'Service delivery',
    text: 'SLA ownership, technician dispatch, ticket triage, escalation paths and 24/7 critical support.',
    tone: 'amber',
  },
  {
    icon: ShieldCheck,
    title: 'Security systems',
    text: 'Hikvision IP camera estates, HikCentral, recording servers, access control and power resilience.',
    tone: 'coral',
  },
  {
    icon: Bot,
    title: 'AI and automation',
    text: 'Python reporting, workflow automation, AI-assisted diagnosis and a deployed internal chatbot agent.',
    tone: 'blue',
  },
];

const experience = [
  {
    company: 'Archetor',
    location: 'Centurion, Gauteng',
    role: 'CCTV Administrator',
    period: '2023 - Present',
    summary:
      'Owns the day-to-day reliability of a distributed security and access-control estate spanning three provinces.',
    highlights: [
      'Administers approximately 4,000 IP cameras and supporting access-control infrastructure across 24 residential estates.',
      'Maintains independent site networks with MikroTik routing, managed switching, VLAN segmentation, static IPs and wireless links.',
      'Coordinates technicians and prioritises faults across the full portfolio while delivering two new estates into live monitoring.',
      'Owns delivery against a contractual SLA, including 1-2 hour response requirements and 24/7 standby for critical incidents.',
      'Reports directly to senior client leadership, translating recurring faults and remediation into clear operational decisions.',
      'Automates internal reporting and fault tracking with Python and AI tooling.',
    ],
  },
  {
    company: 'Nova Life',
    location: 'Gauteng',
    role: 'Outbound Sales Consultant',
    period: '2022 - 2023',
    summary:
      'Built calm, persuasive phone communication through a high-volume, full-cycle telephonic sales role.',
    highlights: [
      'Worked approximately 200 outbound calls per day against allocated lead lists.',
      'Qualified prospects, presented products, handled objections and closed sales end to end.',
    ],
  },
  {
    company: 'Dynamic Distributors',
    location: 'Gauteng',
    role: 'Production Supervisor',
    period: '2015 - 2021',
    summary:
      'Led a production team through daily output targets, assembly quality and packaging operations.',
    highlights: [
      'Supervised a team of 9-12 producing PVC electrical supplies.',
      'Held accountability for daily production output and quality control across a six-year tenure.',
    ],
  },
  {
    company: 'Look & Listen',
    location: 'Gauteng',
    role: 'Retail Sales Assistant (part-time)',
    period: '2013 - 2014',
    summary:
      'Delivered floor sales and customer support in a specialist retail environment.',
    highlights: [],
  },
];

const projects = [
  {
    icon: Bot,
    index: '01',
    title: 'Internal AI agent',
    text: 'Built a company chatbot and agent on the open-source Odysseus framework, turning AI into a practical internal support tool.',
    tags: ['AI agents', 'Internal tooling', 'Deployment'],
  },
  {
    icon: Gamepad2,
    index: '02',
    title: 'Independent game development',
    text: 'Three years building a multiplayer game in Godot single-handedly, including the complete artwork and release planning.',
    tags: ['Godot', 'Multiplayer', 'Digital art'],
  },
  {
    icon: AudioWaveform,
    index: '03',
    title: 'Audio software',
    text: 'Designs and refines guitar amplifier simulations and audio plugins for personal use with a view to public release.',
    tags: ['Audio plugins', 'Simulation', 'Prototyping'],
  },
  {
    icon: Code2,
    index: '04',
    title: 'Developer tooling',
    text: 'Creates browser-based image and game-asset utilities alongside Python automation for operational reporting.',
    tags: ['Python', 'Web tools', 'Automation'],
  },
];

const skillGroups = [
  {
    label: 'Networks',
    skills: ['MikroTik', 'VLANs', 'Managed switching', 'Subnetting', 'PoE', 'Point-to-point wireless'],
  },
  {
    label: 'Systems',
    skills: ['Hikvision IP CCTV', 'HikCentral VMS', 'Recording servers', 'Access control', 'UPS backup'],
  },
  {
    label: 'Operations',
    skills: ['Freshdesk', 'SLA management', 'Fault isolation', 'Vendor escalation', 'Team coordination'],
  },
  {
    label: 'Build',
    skills: ['Python', 'AI workflows', 'Godot', 'Browser tools', 'Audio software'],
  },
];

const navItems = [
  { href: '#profile', label: 'Profile' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const remaining = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(remaining > 0 ? (window.scrollY / remaining) * 100 : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Kyle Bloxam, back to top">
          <span className="brand-mark">KB</span>
          <span className="brand-copy">
            <strong>Kyle Bloxam</strong>
            <small>Network / Support / Sales</small>
          </span>
        </a>

        <nav className={cn('site-nav', menuOpen && 'is-open')} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="nav-contact" href={`mailto:${email}`} onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>

        <Button
          className="menu-button"
          variant="outline"
          size="icon"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <div className="availability"><span /> Available for remote opportunities</div>
          <p className="eyebrow">Network operations / Technical support</p>
          <h1>Kyle<br />Bloxam</h1>
          <p className="hero-lead">
            I keep distributed technical systems online and make complex faults understandable to the people who need to act.
          </p>
          <div className="hero-actions">
            <a
              className={cn(buttonVariants({ size: 'lg' }), 'primary-action')}
              href="/Kyle_Bloxam_CV.pdf"
              download
            >
              <Download data-icon="inline-start" />
              Download CV
            </a>
            <a
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'secondary-action')}
              href={`mailto:${email}`}
            >
              <Mail data-icon="inline-start" />
              Email Kyle
            </a>
          </div>
          <div className="hero-meta">
            <span><MapPin /> Krugersdorp, South Africa</span>
            <span><Radio /> GMT+2 / Remote-ready</span>
          </div>
        </div>

        <div className="network-stage" aria-label="Operational footprint: 24 sites across three provinces">
          <div className="network-card">
            <div className="network-card-head">
              <div>
                <span className="card-kicker">Operational footprint</span>
                <strong>Network overview</strong>
              </div>
              <span className="live-state"><i /> Active</span>
            </div>

            <div className="network-canvas">
              <div className="network-orbit orbit-one" />
              <div className="network-orbit orbit-two" />
              <div className="network-core">
                <Server />
                <span>Core</span>
              </div>
              {Array.from({ length: 24 }, (_, index) => (
                <span
                  key={index}
                  className={`site-node node-${index + 1}`}
                  title={`Site ${String(index + 1).padStart(2, '0')}`}
                />
              ))}
            </div>

            <div className="network-legend">
              <span><i className="legend-teal" /> Gauteng</span>
              <span><i className="legend-amber" /> KwaZulu-Natal</span>
              <span><i className="legend-coral" /> Western Cape</span>
            </div>
            <div className="availability-row">
              <span>Fleet availability</span>
              <div className="availability-track"><i /></div>
              <strong>98%+</strong>
            </div>
          </div>
          <div className="stage-note note-top">24 sites</div>
          <div className="stage-note note-bottom">4,000 endpoints</div>
        </div>
      </section>

      <section className="metrics-band" aria-label="Career highlights">
        <div className="section-shell metrics-grid">
          {metrics.map((metric) => (
            <div className="metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section section-shell" id="profile">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Profile</p>
            <h2>Technical depth.<br />Commercial clarity.</h2>
          </div>
          <p>
            A hands-on technical support specialist and network administrator with frontline sales experience, practical leadership and a builder&apos;s instinct for automation.
          </p>
        </div>

        <div className="strength-grid">
          {strengths.map(({ icon: Icon, title, text, tone }) => (
            <article className={`strength-card tone-${tone}`} key={title}>
              <div className="icon-box"><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section experience-section" id="experience">
        <div className="section-shell">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">02 / Experience</p>
              <h2>Built through ownership.</h2>
            </div>
            <p>From production leadership and sales to multi-site technical operations.</p>
          </div>

          <div className="timeline">
            {experience.map((item, index) => (
              <details className="timeline-item" key={item.company} defaultOpen={index === 0}>
                <summary>
                  <span className="timeline-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="timeline-title">
                    <strong>{item.company}</strong>
                    <small>{item.role}</small>
                  </span>
                  <span className="timeline-place">{item.location}</span>
                  <span className="timeline-period">{item.period}</span>
                  <span className="timeline-toggle"><ChevronDown /></span>
                </summary>
                <div className="timeline-detail">
                  <p className="experience-summary">{item.summary}</p>
                  {item.highlights.length > 0 && (
                    <ul>
                      {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section section-shell" id="projects">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">03 / Technical projects</p>
            <h2>Learning by building.</h2>
          </div>
          <p>Independent projects that turn curiosity into working software.</p>
        </div>

        <div className="project-grid">
          {projects.map(({ icon: Icon, index, title, text, tags }) => (
            <article className="project-card" key={title}>
              <div className="project-head">
                <span>{index}</span>
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="tag-row">
                {tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section skills-section" id="skills">
        <div className="section-shell skills-layout">
          <div className="skills-intro">
            <p className="eyebrow">04 / Skills and credentials</p>
            <h2>Useful across the whole incident.</h2>
            <p>
              Kyle can trace a problem from endpoint to network to power, then coordinate the fix and explain the outcome clearly.
            </p>
          </div>

          <div className="skill-stack">
            {skillGroups.map((group) => (
              <div className="skill-row" key={group.label}>
                <h3>{group.label}</h3>
                <div>
                  {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-shell credentials-grid">
          <article className="credential-panel">
            <span className="panel-label">Credentials</span>
            <ul>
              <li><Check /> Hikvision Certified Training</li>
              <li><Check /> PSIRA Registered, Grades E, D and C</li>
              <li><Check /> National Senior Certificate</li>
              <li><Check /> Continuously self-taught in networking and software development</li>
            </ul>
          </article>
          <article className="credential-panel readiness-panel">
            <span className="panel-label">Remote readiness</span>
            <p>Available for a fixed 09:00-17:00 GMT-8 shift.</p>
            <div className="readiness-list">
              <span><i /> Dedicated quiet office</span>
              <span><i /> High-speed fibre</span>
              <span><i /> UPS power backup</span>
              <span><i /> After-hours experienced</span>
            </div>
          </article>
        </div>
      </section>

      <section className="contact-section section-shell" id="contact">
        <div className="contact-panel">
          <div>
            <p className="eyebrow">Start a conversation</p>
            <h2>Need someone who can own the problem end to end?</h2>
          </div>
          <div className="contact-actions">
            <a className={cn(buttonVariants({ size: 'lg' }), 'primary-action')} href={`mailto:${email}`}>
              <Mail /> Email Kyle
            </a>
            <Button className="copy-button" variant="outline" size="lg" onClick={copyEmail}>
              {copied ? <Check /> : <Code2 />}
              {copied ? 'Copied' : 'Copy email'}
            </Button>
          </div>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <p>Kyle Bloxam / Technical Support & Network Operations</p>
        <p>Krugersdorp, Gauteng, South Africa</p>
      </footer>

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email address copied to clipboard.' : ''}
      </span>
    </main>
  );
}
