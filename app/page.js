"use client";

import { useEffect, useState } from "react";
import VideoIntro from "@/components/VideoIntro/VideoIntro";
import styles from "./page.module.css";

/* ── Content ─────────────────────────────────────────── */

const FLYHOMES_LOGO = "data:image/png;base64,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";
const SECONDWIND_LOGO = "data:image/png;base64,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";


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
    logo: SECONDWIND_LOGO, mono: "SW",
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
    logo: FLYHOMES_LOGO, mono: "FLY",
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
    logo: FLYHOMES_LOGO, mono: "FLY",
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
    logo: FLYHOMES_LOGO, mono: "FLY",
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
    logo: FLYHOMES_LOGO, mono: "FLY",
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
  { group: "Certifications", chips: ["Product Roadmapping (PRC™)", "Product Prioritization (PPC™)", "Gen AI for Product Managers", "Agile PM with Jira Cloud (LinkedIn)", "Six Sigma", "SQL Certified", "MS Excel Advanced"] },
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
  {
    text: "Monisha is one of my most memorable colleagues, and I reflected on that when we got together after a while, having lived many lives since leaving Flyhomes. We had joined around the same time and saw each other grow with the company. My success depended heavily on her success, and soon enough, her team grew to cover the most significant scalable endeavor. Monisha demonstrates what it's like to work towards career expansion at a startup and become one of the most trustworthy individuals you've worked with cross-functionally. Monisha worked across critical operations that were lifelines for real estate advisors and essential to convert a real estate contract into a done deal. Her life continues to grow in various directions, as she also educates others while pursuing her MBA. I'd work with her again, if I could. She's truly inspiring.",
    initials: "MM", name: "Mehar Mira",
    role: "Sales | Strategy | Storytelling · worked with Monisha at Flyhomes",
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
              <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/Monisha_Sood_Resume.pdf`} target="_blank" rel="noreferrer">Resume PDF</a>
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
