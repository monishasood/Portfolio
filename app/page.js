import VideoIntro from "@/components/VideoIntro/VideoIntro";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <VideoIntro />

      {/* ── Next section (scroll target) ─────────────── */}
      <section id="work" className={styles.work}>
        <p className={styles.eyebrow}>Case Studies</p>
        <h2 className={styles.workTitle}>
          Products built from <em>zero.</em>
        </h2>
        <div className={styles.grid}>
          <article className={styles.card}>
            <span className={styles.cardMeta}>SecondWind Pro · 2025</span>
            <h3>NIL Valuation Platform</h3>
            <p>
              0→1 launch of an AI-powered NIL marketplace serving 500+ D1
              athletes — $500K+ in fundraising unlocked, 70% of manual work
              automated away.
            </p>
          </article>
          <article className={styles.card}>
            <span className={styles.cardMeta}>Flexera · MBA Capstone</span>
            <h3>AI Win/Loss Analytics</h3>
            <p>
              Predictive win/loss dashboard for revenue teams, validated
              through 12 customer discovery interviews and a demo-ready Figma
              prototype.
            </p>
          </article>
          <article className={styles.card}>
            <span className={styles.cardMeta}>Flyhomes · 2023–24</span>
            <h3>Sales Compensation Overhaul</h3>
            <p>
              Redesigned variable compensation for 200+ agents with zero
              downtime — $48M in cost savings and a 17% CSAT lift.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
