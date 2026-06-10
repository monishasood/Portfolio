"use client";

import { useEffect, useState } from "react";
import VideoIntro from "@/components/VideoIntro/VideoIntro";
import styles from "./page.module.css";

/* ── Content ─────────────────────────────────────────── */

const MARQUEE = [
  "Product Strategy", "AI/ML Products", "Zero-to-One Builds", "Data-Driven PM",
  "Cross-functional Leadership", "UW–Madison MBA '26", "Agile & Scrum",
  "Go-to-Market Strategy", "User Research", "OKR Frameworks",
];

const EXPERIENCE = [
  {
    period: "Jun 2025 – Present",
    role: "Product Manager – Strategic Partnerships",
    co: "SecondWind Pro",
    logo: null, mono: "SW",
    points: [
      "Led zero-to-one launch of NIL Platform MVP serving 500+ D1 athletes; drove 40% school adoption by owning the product roadmap and leading a cross-functional team of 8",
      "Unlocked $500K+ in fundraising by defining product vision and GTM strategy through stakeholder interviews with 30+ schools, prioritizing features using RICE framework",
      "Reduced manual tasks by 70% through Airtable/Zapier automation, scaling engagement across 100+ institutions and improving data accuracy by 25%",
    ],
    tags: ["0→1 Product", "RICE Framework", "GTM", "Airtable", "Zapier"],
  },
  {
    period: "Sep 2025 – Dec 2025 · MBA Capstone",
    role: "Product Manager – MBA Capstone",
    co: "Flexera",
    logo: "https://logo.clearbit.com/flexera.com", mono: "FLX",
    points: [
      "Built AI-powered win/loss analytics dashboard with predictive modeling, win rate trends, and funnel analysis",
      "Enabled revenue teams to identify loss drivers and improve deal forecasting accuracy through 12 customer discovery interviews and a validated Figma prototype",
    ],
    tags: ["AI Analytics", "Figma", "Predictive Modeling", "B2B SaaS"],
  },
  {
    period: "Aug 2024 – Present · Part-time",
    role: "Graduate Teaching Assistant – International Business",
    co: "University of Wisconsin–Madison, Wisconsin School of Business",
    logo: "https://logo.clearbit.com/wisc.edu", mono: "UW",
    points: [
      "Support instruction on technology advancement, privatization, deregulation, and globalization as forces shaping today's global business landscape",
      "Facilitate discussions and grade coursework for MBA students across international business strategy modules",
    ],
    tags: ["MBA", "International Business", "Teaching"],
  },
  {
    period: "Jun 2023 – Jun 2024",
    role: "Product Strategy (Sales Ops & Leadership)",
    co: "Flyhomes",
    logo: "https://logo.clearbit.com/flyhomes.com", mono: "FLY",
    points: [
      "Delivered $48MM savings by redesigning variable compensation strategy through market analysis, managing $600K/month payouts with 100% accuracy",
      "Improved team effectiveness by 28% and CSAT by 17% by building KPI dashboards for 60+ sales reps, enabling data-driven promotion decisions",
      "Scaled onboarding for 50+ sales associates by designing training programs and SOPs that accelerated ramp-up time and improved process adoption",
    ],
    tags: ["SQL", "KPI Dashboards", "Sales Ops", "Stakeholder Alignment"],
  },
  {
    period: "Apr 2022 – Jun 2023",
    role: "Associate Product Manager",
    co: "Flyhomes",
    logo: "https://logo.clearbit.com/flyhomes.com", mono: "FLY",
    points: [
      "Reduced SLA by 8% by leading full product lifecycle from discovery to launch, conducting user research and iterating on feedback to enhance UX",
      "Boosted customer satisfaction by 32% by spearheading cross-functional testing and sprint planning, using SQL-driven KPI dashboards to optimize delivery",
      "Accelerated product delivery by 20% by implementing agile workflows and defining milestone criteria, conducting retrospectives for continuous improvement",
    ],
    tags: ["Agile/Scrum", "JIRA", "SQL", "User Research", "UX"],
  },
  {
    period: "Jan 2021 – Mar 2022",
    role: "Senior Operations Associate",
    co: "Flyhomes",
    logo: "https://logo.clearbit.com/flyhomes.com", mono: "FLY",
    points: [
      "Generated $50K savings per transaction by developing data-driven home pricing strategies and analytical frameworks for market analysis",
      "Ensured operational excellence across 200+ closings by collaborating cross-functionally with lenders and internal teams for high customer satisfaction",
      "Improved team compliance by 78% by creating training programs and SOPs for 7 operations members",
    ],
    tags: ["Operations", "Data Analysis", "Process Improvement"],
  },
  {
    period: "Jun 2019 – Dec 2020",
    role: "Operations Associate",
    co: "Flyhomes",
    logo: "https://logo.clearbit.com/flyhomes.com", mono: "FLY",
    points: [
      "Enhanced workstream efficiency by 52% through streamlined processes and automation using Zapier, reducing operational dependencies",
      "Audited 500+ transactions to identify discrepancies and enhance accuracy, creating dashboards to monitor closed deals and ensure regulatory compliance",
    ],
    tags: ["Zapier", "Dashboards", "Compliance"],
  },
];

const PROJECTS = [
  {
    label: "SecondWind Pro · 2025",
    name: "NIL Valuation Platform",
    desc: "Led 0→1 build of an AI-powered marketplace connecting Division I athletes with NIL opportunities — from user research through MVP launch.",
    impact: "$500K+ raised in month 1 · 25+ athletes · 70% manual work cut",
    stack: ["0→1", "Airtable", "Zapier", "OKRs", "Agile"],
    img: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&q=80",
  },
  {
    label: "Flexera · MBA Capstone 2024–25",
    name: "AI Win/Loss Analytics",
    desc: "AI-driven competitive intelligence dashboard for Flexera's sales team, built from 12 customer discovery interviews through a validated Figma prototype.",
    impact: "12 interviews · Figma prototype · Full SOW delivered",
    stack: ["AI Analytics", "Figma", "JIRA", "B2B SaaS"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    label: "Personal Project · GitHub Pages",
    name: "FreshPlate — AI Food App",
    desc: "AI-powered food management platform using intelligent inventory tracking, expiry prediction, and personalized recipe suggestions to reduce household waste.",
    impact: "~30% food waste reduction · Live on GitHub Pages",
    stack: ["AI/ML", "React", "GitHub Pages"],
    img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80",
  },
  {
    label: "Flyhomes · Jun 2023 – Jun 2024",
    name: "Sales Compensation Overhaul",
    desc: "Transformed a broken compensation system for 200+ agents. Led data analysis, stakeholder alignment, and cross-functional migration with zero downtime.",
    impact: "$48M cost savings · 95% agent satisfaction · 17% CSAT gain",
    stack: ["SQL", "Data Analysis", "Change Mgmt"],
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
  },
  {
    label: "Flyhomes · Apr 2022 – Jun 2023",
    name: "Agile Transformation",
    desc: "Moved Flyhomes from waterfall to agile. Rolled out sprint rituals, SQL KPI dashboards, and cross-functional testing protocols that measurably lifted output.",
    impact: "68% efficiency gain · 32% CSAT increase · 8% SLA reduction",
    stack: ["Agile/Scrum", "JIRA", "SQL"],
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    label: "MBA Research · Sierra AI Startup",
    name: "Enterprise AI GTM Strategy",
    desc: "Go-to-market strategy and product positioning for Sierra, a VC-backed enterprise AI startup. Produced full competitive analysis, positioning framework, and exec deck.",
    impact: "Full GTM strategy · Competitive positioning · Exec deck",
    stack: ["AI/LLMs", "GTM", "Strategy", "Research"],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  },
];

const SKILLS = [
  { group: "Product Strategy", chips: ["Product Roadmapping", "Feature Prioritization (RICE)", "OKR Frameworks", "MVP Development", "GTM Strategy", "User Research", "Customer Discovery", "Competitive Analysis"] },
  { group: "Execution & Delivery", chips: ["Agile / Scrum", "Sprint Planning", "Cross-Functional Leadership", "Stakeholder Management", "A/B Testing", "Data-Driven Decision Making", "SOP Development", "Training Programs"] },
  { group: "Data & Analytics", chips: ["SQL", "Power BI", "Data Studio", "KPI Dashboards", "SAS", "R", "MS Excel Advanced", "Funnel Analysis"] },
  { group: "Certifications", chips: ["Product Roadmapping (PRC™)", "Product Prioritization (PPC™)", "Gen AI for Product Managers", "Six Sigma", "SQL Certified", "MS Excel Advanced"] },
];

const TOOLS = [
  { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "JIRA", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
  { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
  { name: "Confluence", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg" },
  { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "SAS", mono: "SAS" },
  { name: "Salesforce", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg" },
  { name: "Slack", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" },
  { name: "A/B Testing", mono: "AB" },
  { name: "Airtable", mono: "AT" },
  { name: "Zapier", mono: "ZP" },
  { name: "Amplitude", mono: "AM" },
  { name: "Mixpanel", mono: "MX" },
  { name: "Power BI", mono: "PB" },
  { name: "Tableau", mono: "TB" },
  { name: "Lucidchart", mono: "LC" },
  { name: "LLMs / RAG", mono: "AI" },
];

const RECS = [
  {
    text: "Monisha has been crushing it at the intersection of Second Wind's three core pillars — Tech, Athlete Representation, and University Consulting — seamlessly moving between them like a pro. She consistently turns out high-quality, detail-driven work, takes ownership without hesitation, and sets the bar for leadership and reliability.",
    initials: "LM", name: "Luke Mazur",
    role: "Second Wind: Solving Problems in NIL · managed Monisha directly",
  },
  {
    text: "Monisha is truly a powerhouse. Her work ethic and adaptability were remarkable. I have seen her take on multiple roles while helping build a startup from the ground up, always displaying a go-getter attitude. Her deep understanding of consumer pain points and knack for bringing innovative ideas make her a strong contender as a future product leader.",
    initials: "NM", name: "Navendu Mishra",
    role: "Product Management | Strategy | Agile Leadership · managed Monisha directly",
  },
  {
    text: "Monisha is an amazing talent — she's so fast to pick up new processes, curious, inquisitive and always finding new ways to improve existing systems. She excels in data and is a wizard with spreadsheets. Her ability to execute diverse project tasks showcases her analytical, problem-solving, and presentation skills. I highly recommend Monisha for her ability to deliver results and her positive impact on team dynamics.",
    initials: "JH", name: "Jennifer Horton",
    role: "Chief of Staff | GTM | Strategy & Operations · Flyhomes",
  },
  {
    text: "Monisha proactively engaged with me and other subject matter experts to gain a deep understanding of key customer pain points. She volunteered to join customer calls as a product representative — her involvement proved invaluable. Thanks to her proactive, results-driven approach, we successfully added three new features to our product roadmap.",
    initials: "TS", name: "Tushar Saroch",
    role: "Support Manager · worked with Monisha on the same team",
  },
  {
    text: "Monisha brings a unique blend of creativity and analytical thinking that consistently drives projects forward. Her collaborative approach and willingness to support teammates foster a positive and productive work environment. Her attention to detail and commitment to delivering high-quality results have been instrumental in our success.",
    initials: "RD", name: "Rohit Deshpande",
    role: "Operations Management | Program Management · managed Monisha directly",
  },
  {
    text: "Never seen anyone handle difficult situations or conversations as effortlessly as Monisha. Great at handling people, customers, and escalations. She is one of the few hardworking people I have met at Flyhomes who adapted and excelled at every job they were given and made it look flawless.",
    initials: "DS", name: "Deepak Sahu",
    role: "Just Work · worked with Monisha at Flyhomes",
  },
];

const AWARDS = [
  {
    icon: "★", title: "Most Trusted Partner",
    desc: "Honored for closing $10M+ in contracts and building exceptional client relationships at Flyhomes through transparent communication and delivery excellence.",
  },
  {
    icon: "◆", title: "Superstar of the Month",
    desc: "Awarded for a 30% productivity improvement and exceeding quarterly targets through process innovation and data-driven decision-making.",
  },
  {
    icon: "▲", title: "Product Impact Champion",
    desc: "Recognized for MVP launch that boosted platform engagement and reduced manual work by 70% through intelligent automation design.",
  },
];

const STATS = [
  { val: "6+", label: "Years in Product" },
  { val: "500+", label: "D1 Athletes Served" },
  { val: "$48MM", label: "Cost Savings Delivered", accent: true },
  { val: "$500K+", label: "Fundraising Unlocked" },
  { val: "70%", label: "Manual Work Reduced", accent: true },
  { val: "32%", label: "CSAT Improvement" },
];

/* ── Small components ────────────────────────────────── */

function Logo({ src, mono }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={styles.tLogo}>
      {src && !failed ? (
        <img src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        <span className={styles.tLogoMono}>{mono}</span>
      )}
    </span>
  );
}

function FlipCard({ p }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`${styles.flipWrap} ${styles.reveal}`}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      aria-pressed={flipped}
      aria-label={`${p.name} — click to flip`}
    >
      <div className={`${styles.flipInner} ${flipped ? styles.flipped : ""}`}>
        <div
          className={styles.flipFront}
          style={{ backgroundImage: `url('${p.img}')` }}
        >
          <span className={styles.flipScrim} aria-hidden="true" />
          <span className={styles.flipTitle}>{p.name}</span>
          <span className={styles.flipHint}>↻ click to reveal</span>
        </div>
        <div className={styles.flipBack}>
          <div>
            <p className={styles.pbLabel}>{p.label}</p>
            <h3 className={styles.pbName}>{p.name}</h3>
            <p className={styles.pbDesc}>{p.desc}</p>
            <p className={styles.pbImpact}>{p.impact}</p>
            <div className={styles.pbStack}>
              {p.stack.map((s) => (
                <span key={s} className={styles.pbPill}>{s}</span>
              ))}
            </div>
          </div>
          <span className={styles.pbBack}>↩ flip back</span>
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────── */

export default function Home() {
  /* Reveal-on-scroll */
  useEffect(() => {
    const els = document.querySelectorAll(`.${styles.reveal}`);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((el) => el.classList.add(styles.in));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      {/* ── Nav ─────────────────────────────────────── */}
      <nav className={styles.nav} aria-label="Primary">
        <a href="#" className={styles.navLogo}>
          M<span>.</span>Sood
        </a>
        <div className={styles.navLinks}>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Case Studies</a>
          <a href="#skills">Skills</a>
          <a href="#recommendations">Recommendations</a>
          <a href="#awards">Recognition</a>
          <a href="#contact" className={styles.navCta}>Open to Work</a>
        </div>
      </nav>

      {/* ── Cinematic video hero ────────────────────── */}
      <VideoIntro />

      <div id="work">
        {/* ── Marquee ─────────────────────────────────── */}
        <div className={styles.marqueeWrap} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className={styles.marqueeItem}>
                {m} <em>✦</em>
              </span>
            ))}
          </div>
        </div>

        {/* ── About ───────────────────────────────────── */}
        <section className={styles.section} id="about">
          <p className={`${styles.eyebrow} ${styles.reveal}`}>About</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>
            Building products at the intersection of <em>AI</em> and impact.
          </h2>
          <div className={styles.aboutGrid}>
            <div className={`${styles.aboutBody} ${styles.reveal}`}>
              <p>
                I&apos;m a product manager with <b>6+ years of experience</b> driving
                zero-to-one product development across real estate tech, NIL
                platforms, and enterprise B2B SaaS. I&apos;ve delivered{" "}
                <b>$50M+ in business value</b> and led initiatives that generated{" "}
                <b>$48M in cost savings</b> through data-driven strategy and
                cross-functional execution.
              </p>
              <p>
                Currently completing my <b>MBA at Wisconsin School of Business</b>,
                specializing in Technology Strategy &amp; Product Management. My
                focus is on <b>AI/ML-powered products</b> — from LLMs and RAG
                pipelines to generative AI stacks that create real user value.
              </p>
              <p>
                I believe great products come from deep user empathy, ruthless
                prioritization, and shipping fast to learn faster. I&apos;m actively
                exploring <b>PM roles starting May 2026</b> at AI-first companies
                where I can own end-to-end product decisions.
              </p>
              <div className={styles.pillars}>
                <div className={styles.pillar}>
                  <span className={styles.pillarIcon}>◉</span>
                  <span>
                    <strong>Start with the problem</strong>
                    User research before user stories — always.
                  </span>
                </div>
                <div className={styles.pillar}>
                  <span className={styles.pillarIcon}>◈</span>
                  <span>
                    <strong>Let data drive decisions</strong>
                    Dashboards, A/B tests, and clear metrics at every stage.
                  </span>
                </div>
                <div className={styles.pillar}>
                  <span className={styles.pillarIcon}>⚡</span>
                  <span>
                    <strong>Ship fast, learn faster</strong>
                    MVPs beat perfection. Iterate on real user behavior.
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.reveal}>
              <div className={styles.statsGrid}>
                {STATS.map((s) => (
                  <div key={s.label} className={styles.statBox}>
                    <span className={`${styles.statVal} ${s.accent ? styles.statAccent : ""}`}>
                      {s.val}
                    </span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Experience ──────────────────────────────── */}
        <section className={styles.section} id="experience">
          <p className={`${styles.eyebrow} ${styles.reveal}`}>Experience</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>
            Where I&apos;ve built things that <em>matter.</em>
          </h2>
          <div className={styles.timeline}>
            {EXPERIENCE.map((x) => (
              <article key={x.role + x.period} className={`${styles.tItem} ${styles.reveal}`}>
                <span className={styles.tDot} aria-hidden="true" />
                <header className={styles.tHeader}>
                  <Logo src={x.logo} mono={x.mono} />
                  <div>
                    <p className={styles.tPeriod}>{x.period}</p>
                    <h3 className={styles.tRole}>{x.role}</h3>
                    <p className={styles.tCo}>{x.co}</p>
                  </div>
                </header>
                <ul className={styles.tList}>
                  {x.points.map((pt, i) => <li key={i}>{pt}</li>)}
                </ul>
                <div className={styles.tTags}>
                  {x.tags.map((t) => <span key={t} className={styles.tTag}>{t}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Case studies ────────────────────────────── */}
        <section className={styles.section} id="projects">
          <p className={`${styles.eyebrow} ${styles.reveal}`}>Case Studies</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>
            Products built from <em>zero.</em>
          </h2>
          <div className={styles.projectsGrid}>
            {PROJECTS.map((p) => <FlipCard key={p.name} p={p} />)}
          </div>
        </section>

        {/* ── Skills ──────────────────────────────────── */}
        <section className={styles.section} id="skills">
          <p className={`${styles.eyebrow} ${styles.reveal}`}>Skills</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>
            What I bring to the <em>table.</em>
          </h2>
          <div className={styles.skillsGrid}>
            {SKILLS.map((g) => (
              <div key={g.group} className={styles.reveal}>
                <p className={styles.skGroup}>{g.group}</p>
                <div className={styles.skChips}>
                  {g.chips.map((c) => <span key={c} className={styles.skChip}>{c}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.toolsSection} ${styles.reveal}`}>
            <p className={styles.skGroup}>Tools &amp; Platforms</p>
            <div className={styles.toolsGrid}>
              {TOOLS.map((t) => (
                <div key={t.name} className={styles.toolCard}>
                  {t.img ? (
                    <img
                      src={t.img}
                      alt=""
                      style={t.invert ? { filter: "invert(1) brightness(0.85)" } : undefined}
                    />
                  ) : (
                    <span className={styles.toolMono}>{t.mono}</span>
                  )}
                  <span className={styles.toolName}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Recommendations ─────────────────────────── */}
        <section className={styles.section} id="recommendations">
          <p className={`${styles.eyebrow} ${styles.reveal}`}>Recommendations</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>
            What colleagues say about <em>me.</em>
          </h2>
          <div className={styles.recsGrid}>
            {RECS.map((r) => (
              <figure key={r.name} className={`${styles.recCard} ${styles.reveal}`}>
                <span className={styles.recMark} aria-hidden="true">&ldquo;</span>
                <blockquote className={styles.recText}>{r.text}</blockquote>
                <figcaption className={styles.recPerson}>
                  <span className={styles.recAvatar}>{r.initials}</span>
                  <span>
                    <span className={styles.recName}>{r.name}</span>
                    <span className={styles.recRole}>{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className={`${styles.recNote} ${styles.reveal}`}>
            View all recommendations on{" "}
            <a href="https://www.linkedin.com/in/monishasood07/" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </p>
        </section>

        {/* ── Awards ──────────────────────────────────── */}
        <section className={styles.section} id="awards">
          <p className={`${styles.eyebrow} ${styles.reveal}`}>Recognition</p>
          <h2 className={`${styles.title} ${styles.reveal}`}>
            Awards &amp; <em>impact.</em>
          </h2>
          <div className={styles.awardsGrid}>
            {AWARDS.map((a) => (
              <div key={a.title} className={`${styles.awardCard} ${styles.reveal}`}>
                <span className={styles.awardIcon}>{a.icon}</span>
                <h3 className={styles.awardTitle}>{a.title}</h3>
                <p className={styles.awardDesc}>{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────── */}
        <section className={`${styles.section} ${styles.contact}`} id="contact">
          <div className={styles.reveal}>
            <p className={styles.availBadge}>
              <span className={styles.availDot} aria-hidden="true" />
              Available May 2026
            </p>
            <h2 className={styles.contactBig}>
              Let&apos;s build <em>something great.</em>
            </h2>
            <p className={styles.contactSub}>
              I&apos;m actively exploring PM roles — especially at AI-first companies
              solving problems that matter. Open to full-time opportunities
              starting May 2026. H1B sponsorship considered.
            </p>
            <div className={styles.contactLinks}>
              <a href="mailto:monisha.sood@wisc.edu">monisha.sood@wisc.edu</a>
              <a href="https://www.linkedin.com/in/monishasood07/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://monishasood.github.io/Product-Manager/Monisha_Sood_Resume.pdf" target="_blank" rel="noreferrer">Resume PDF</a>
              <a href="tel:+16086587795">(608) 658-7795</a>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────── */}
        <footer className={styles.footer}>
          <strong>Monisha Sood</strong>
          <span>MBA &apos;26 · Wisconsin School of Business · Technology Strategy &amp; Product Management</span>
          <span>
            Built with intention ·{" "}
            <a href="https://monishasood.github.io/Product-Manager/" target="_blank" rel="noreferrer">
              monishasood.github.io
            </a>
          </span>
        </footer>
      </div>
    </main>
  );
}
