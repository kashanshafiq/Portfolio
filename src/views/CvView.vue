<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PageIntro from '../components/PageIntro.vue'
import { academicCv } from '../content/academicCv'

const navItems = [
  { id: 'personal-info', num: '01', label: 'Personal Information' },
  { id: 'work-experience', num: '02', label: 'Work Experience' },
  { id: 'education-background', num: '03', label: 'Education Background' },
  { id: 'research-projects', num: '04', label: 'Research Projects / Semester Projects' },
  { id: 'certifications', num: '05', label: 'Further Education / Online Courses & Certifications' },
  { id: 'professional-trainings', num: '06', label: 'Professional Trainings' },
  { id: 'conferences', num: '07', label: 'Conferences' },
  { id: 'languages', num: '08', label: 'Languages' },
  { id: 'extracurricular', num: '09', label: 'Extracurricular Activities' },
  { id: 'volunteer-activities', num: '10', label: 'Volunteer Activities' },
  { id: 'honors-awards', num: '11', label: 'Honors & Awards' },
]

const activeId = ref('personal-info')
let observer: IntersectionObserver | null = null

function scrollToSection(id: string) {
  activeId.value = id
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-15% 0px -70% 0px',
      threshold: 0,
    }
  )

  navItems.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el) observer?.observe(el)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="shell page-body cv-layout-wrapper">
    <PageIntro
      eyebrow="Academics / Comprehensive Curriculum Vitae"
      :title="academicCv.personalInfo.name"
      :description="`${academicCv.personalInfo.degreeSummary} · ${academicCv.personalInfo.title}`"
    >
      <div class="hero-actions">
        <RouterLink class="button primary" to="/#contact">
          Get in touch <span aria-hidden="true">↓</span>
        </RouterLink>
      </div>
    </PageIntro>

    <div class="cv-body-grid">
      <!-- Left Sticky Navigation Panel -->
      <aside class="cv-nav-panel no-print" aria-label="Curriculum Vitae section directory">
        <div class="nav-panel-sticky">
          <p class="panel-eyebrow">ACADEMIC PROFILE</p>
          <nav class="cv-toc-nav">
            <a
              v-for="item in navItems"
              :key="item.id"
              :href="`#${item.id}`"
              :class="['toc-link', { active: activeId === item.id }]"
              @click.prevent="scrollToSection(item.id)"
            >
              <span class="toc-num">{{ item.num }}</span>
              <span class="toc-label">{{ item.label }}</span>
            </a>
          </nav>
        </div>
      </aside>

      <!-- Main Profile Sections (Sequence follows reference image) -->
      <main class="cv-main-content">
        <!-- 1. Personal Information -->
        <section id="personal-info" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">01</span>
            <h2>Personal Information</h2>
          </div>
          <div class="card personal-card">
            <div class="personal-top-row">
              <div>
                <h3 class="person-name">{{ academicCv.personalInfo.name }}</h3>
                <p class="person-role">{{ academicCv.personalInfo.title }}</p>
                <p class="person-degree">{{ academicCv.personalInfo.degreeSummary }}</p>
              </div>
              <div class="personal-meta-list">
                <div>
                  <span class="meta-label">Location</span>
                  <span class="meta-val">{{ academicCv.personalInfo.location }}</span>
                </div>
                <div>
                  <span class="meta-label">Direct Email</span>
                  <a :href="`mailto:${academicCv.personalInfo.email}`" class="meta-val link-val">
                    {{ academicCv.personalInfo.email }} ↗
                  </a>
                </div>
                <div>
                  <span class="meta-label">LinkedIn</span>
                  <a
                    :href="academicCv.personalInfo.linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="meta-val link-val"
                  >
                    linkedin.com/in/kashan-shafiq ↗
                  </a>
                </div>
                <div>
                  <span class="meta-label">Institution</span>
                  <span class="meta-val">{{ academicCv.personalInfo.institution }}</span>
                </div>
              </div>
            </div>
            <p class="personal-summary-text">{{ academicCv.personalInfo.summary }}</p>
          </div>
        </section>

        <!-- 2. Work Experience -->
        <section id="work-experience" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">02</span>
            <h2>Work Experience</h2>
          </div>
          <p class="section-subtext">Professional practice, Scan-to-BIM modeling, high-rise tower management, and site engineering (newest to oldest).</p>

          <div class="timeline-list">
            <article
              v-for="job in academicCv.workExperience"
              :key="job.organization"
              class="card entry-card"
            >
              <div class="entry-header">
                <div>
                  <h3 class="entry-title">{{ job.role }}</h3>
                  <p class="entry-org">{{ job.organization }} · {{ job.location }}</p>
                </div>
                <span class="entry-period">{{ job.period }}</span>
              </div>
              <p class="entry-scope"><strong>Focus:</strong> {{ job.scope }}</p>
              <ul class="entry-bullets">
                <li v-for="resp in job.responsibilities" :key="resp">{{ resp }}</li>
              </ul>
              <div class="tag-list mini-tags">
                <span v-for="t in job.tools" :key="t" class="tag">{{ t }}</span>
              </div>
            </article>
          </div>
        </section>

        <!-- 3. Education Background -->
        <section id="education-background" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">03</span>
            <h2>Education Background</h2>
          </div>
          <p class="section-subtext">Undergraduate degree with top academic honors and foundational schooling.</p>

          <div class="timeline-list">
            <article
              v-for="edu in academicCv.education"
              :key="edu.degree"
              class="card entry-card"
            >
              <div class="entry-header">
                <div>
                  <h3 class="entry-title">{{ edu.degree }}</h3>
                  <p class="entry-org">{{ edu.institution }}</p>
                </div>
                <span class="entry-period">{{ edu.period }}</span>
              </div>
              <div v-if="edu.distinction" class="distinction-highlight">
                <span class="gold-badge" aria-hidden="true">★</span>
                <strong>{{ edu.distinction }}</strong>
              </div>
              <p v-if="edu.metrics" class="entry-metrics">{{ edu.metrics }}</p>
              <ul v-if="edu.highlights" class="entry-bullets">
                <li v-for="h in edu.highlights" :key="h">{{ h }}</li>
              </ul>
            </article>
          </div>
        </section>

        <!-- 4. Research Projects / Semester Projects -->
        <section id="research-projects" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">04</span>
            <h2>Research Projects / Semester Projects</h2>
          </div>
          <p class="section-subtext">Major capstone research, SSRN preprint publication, and comprehensive civil engineering design projects.</p>

          <!-- Featured Preprint -->
          <div class="card research-box">
            <div class="research-status-row">
              <span class="badge" style="margin-left: 0;">{{ academicCv.researchAndProjects.researchPreprint.venue }}</span>
              <span class="research-year-tag">{{ academicCv.researchAndProjects.researchPreprint.period }}</span>
            </div>
            <h3 class="research-heading">
              {{ academicCv.researchAndProjects.researchPreprint.title }}
            </h3>
            <p class="author-subline">
              {{ academicCv.researchAndProjects.researchPreprint.authors.join(' · ') }}
            </p>
            <p class="research-desc">
              {{ academicCv.researchAndProjects.researchPreprint.summary }}
            </p>
            <div class="research-actions">
              <RouterLink class="button" to="/research/bim-to-ar">
                Read research details ↗
              </RouterLink>
              <a
                class="text-link"
                :href="academicCv.researchAndProjects.researchPreprint.doi"
                target="_blank"
                rel="noopener noreferrer"
              >
                SSRN Preprint DOI ↗
              </a>
            </div>
          </div>

          <!-- Academic Semester Projects -->
          <h3 class="subsection-title">Major Semester Engineering Projects</h3>
          <div class="projects-cv-grid">
            <article
              v-for="p in academicCv.researchAndProjects.projects"
              :key="p.title"
              class="card mini-project-card"
            >
              <p class="eyebrow">{{ p.course }}</p>
              <h4>{{ p.title }}</h4>
              <p>{{ p.description }}</p>
              <div class="tag-list mini-tags">
                <span v-for="tool in p.tools" :key="tool" class="tag">{{ tool }}</span>
              </div>
            </article>
          </div>
        </section>

        <!-- 5. Further Education / Online Courses & Certifications -->
        <section id="certifications" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">05</span>
            <h2>Further Education / Online Courses &amp; Certifications</h2>
          </div>
          <p class="section-subtext">Specialized technical certifications, BIM credentials, and professional software qualifications.</p>

          <div class="cert-grid">
            <article
              v-for="cert in academicCv.certifications"
              :key="cert.title"
              class="card cert-card"
            >
              <div class="cert-header">
                <div>
                  <h4>{{ cert.title }}</h4>
                  <p class="cert-issuer">{{ cert.issuer }}</p>
                </div>
                <span class="cert-date">{{ cert.date }}</span>
              </div>
              <p class="cert-detail">{{ cert.detail }}</p>
              <p v-if="cert.credentialId" class="credential-id">
                <span>Credential:</span> {{ cert.credentialId }}
              </p>
            </article>
          </div>
        </section>

        <!-- 6. Professional Trainings -->
        <section id="professional-trainings" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">06</span>
            <h2>Professional Trainings</h2>
          </div>
          <p class="section-subtext">Continuing Professional Development (CPD) seminars accredited under Pakistan Engineering Council (PEC) guidelines and engineering workshops.</p>

          <h3 class="subsection-title">PEC-Accredited Continuing Professional Development (CPD) Seminars</h3>
          <div class="cpd-table-wrapper">
            <table class="cpd-table">
              <thead>
                <tr>
                  <th>Topic / Seminar Title</th>
                  <th>Keynote Speaker</th>
                  <th>Credit</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cpd in academicCv.professionalTrainings.cpdSeminars" :key="cpd.title">
                  <td class="cpd-title-cell">{{ cpd.title }}</td>
                  <td class="cpd-speaker-cell">{{ cpd.speaker }}</td>
                  <td class="cpd-point-cell"><span class="point-badge">{{ cpd.points }}</span></td>
                  <td class="cpd-date-cell">{{ cpd.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="subsection-title" style="margin-top: 36px;">Technical Workshops &amp; Webinars</h3>
          <div class="workshop-grid">
            <article
              v-for="ws in academicCv.professionalTrainings.workshops"
              :key="ws.title"
              class="card workshop-card"
            >
              <h4>{{ ws.title }}</h4>
              <p class="ws-org">{{ ws.organizer }}</p>
              <span class="ws-date">{{ ws.date }}</span>
            </article>
          </div>
        </section>

        <!-- 7. Conferences -->
        <section id="conferences" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">07</span>
            <h2>Conferences</h2>
          </div>
          <p class="section-subtext">Symposiums, academic-industry conventions, and engineering presentations.</p>

          <div class="timeline-list">
            <article
              v-for="conf in academicCv.conferences"
              :key="conf.title"
              class="card entry-card"
            >
              <div class="entry-header">
                <div>
                  <h3 class="entry-title">{{ conf.title }}</h3>
                  <p class="entry-org">{{ conf.organizer }}</p>
                </div>
                <span class="entry-period">{{ conf.date }}</span>
              </div>
              <p class="conf-role"><strong>Capacity:</strong> {{ conf.role }}</p>
              <p class="conf-detail">{{ conf.detail }}</p>
            </article>
          </div>
        </section>

        <!-- 8. Languages -->
        <section id="languages" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">08</span>
            <h2>Languages</h2>
          </div>
          <p class="section-subtext">Linguistic competencies and verified language immersion programs.</p>

          <div class="languages-grid">
            <article
              v-for="lang in academicCv.languages"
              :key="lang.language"
              class="card lang-card"
            >
              <div class="lang-top">
                <h3>{{ lang.language }}</h3>
                <span class="lang-pill">{{ lang.proficiency }}</span>
              </div>
              <p class="lang-note">{{ lang.note }}</p>
            </article>
          </div>
        </section>

        <!-- 9. Extracurricular Activities -->
        <section id="extracurricular" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">09</span>
            <h2>Extracurricular Activities</h2>
          </div>
          <p class="section-subtext">Global leadership fellowships, engineering competitions, hackathons, and design challenges.</p>

          <h3 class="subsection-title">Fellowships &amp; Global Leadership Programs</h3>
          <div class="fellowship-list">
            <article
              v-for="f in academicCv.extracurricular.fellowships"
              :key="f.title"
              class="card entry-card"
            >
              <div class="entry-header">
                <div>
                  <h3 class="entry-title">{{ f.title }}</h3>
                  <p class="entry-org">{{ f.organization }}</p>
                </div>
                <span class="entry-period">{{ f.period }}</span>
              </div>
              <p class="entry-scope">{{ f.detail }}</p>
            </article>
          </div>

          <h3 class="subsection-title" style="margin-top: 36px;">Engineering Competitions &amp; Hackathons</h3>
          <div class="competitions-grid">
            <article
              v-for="c in academicCv.extracurricular.competitions"
              :key="c.title"
              class="card comp-card"
            >
              <div class="comp-award-badge">{{ c.award }}</div>
              <h4>{{ c.title }}</h4>
              <p class="comp-org">{{ c.organizer }} · {{ c.date }}</p>
              <p class="comp-event">{{ c.event }}</p>
            </article>
          </div>
        </section>

        <!-- 10. Volunteer Activities -->
        <section id="volunteer-activities" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">10</span>
            <h2>Volunteer Activities</h2>
          </div>
          <p class="section-subtext">Community welfare service, educational mentoring, school mental well-being sessions, and open knowledge initiatives.</p>

          <div class="volunteer-grid">
            <article
              v-for="v in academicCv.volunteer"
              :key="v.title"
              class="card vol-card"
            >
              <div class="vol-header">
                <div>
                  <h4>{{ v.title }}</h4>
                  <p class="vol-role">{{ v.role }} · {{ v.organization }}</p>
                </div>
                <span class="vol-period">{{ v.period }}</span>
              </div>
              <p class="vol-detail">{{ v.detail }}</p>
            </article>
          </div>
        </section>

        <!-- 11. Honors & Awards -->
        <section id="honors-awards" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">11</span>
            <h2>Honors &amp; Awards</h2>
          </div>
          <p class="section-subtext">University gold medal, merit scholarships, semester distinctions, and competition prizes.</p>

          <div class="honors-list">
            <article
              v-for="award in academicCv.honorsAndAwards"
              :key="award.title"
              :class="['card honor-card', { 'honor-gold': award.category === 'Gold Medal' }]"
            >
              <div class="honor-header">
                <div class="honor-title-group">
                  <span v-if="award.category === 'Gold Medal'" class="gold-star" aria-hidden="true">★</span>
                  <span class="badge honor-cat-badge">{{ award.category }}</span>
                  <h3>{{ award.title }}</h3>
                </div>
                <span class="honor-period">{{ award.period }}</span>
              </div>
              <p class="honor-awarder"><strong>Conferred by:</strong> {{ award.awarder }}</p>
              <p class="honor-detail">{{ award.detail }}</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.cv-layout-wrapper {
  max-width: 1360px;
}

.cv-body-grid {
  display: grid;
  grid-template-columns: 290px 1fr;
  gap: 56px;
  align-items: start;
  margin-top: 48px;
}

/* Sticky Left Panel */
.cv-nav-panel {
  position: sticky;
  top: 86px;
  max-height: calc(100vh - 110px);
  overflow-y: auto;
  padding-right: 12px;
}

.nav-panel-sticky {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 22px 18px;
}

.panel-eyebrow {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line);
  font-weight: 600;
}

.cv-toc-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toc-link {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 2px;
  text-decoration: none;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.35;
  transition: all 140ms ease;
  border-left: 2px solid transparent;
}

.toc-num {
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--line-strong);
  flex-shrink: 0;
  margin-top: 1px;
}

.toc-label {
  flex-grow: 1;
}

.toc-link:hover {
  color: var(--text);
  background: rgba(174, 208, 196, 0.05);
}

.toc-link.active {
  color: #fff;
  background: rgba(174, 208, 196, 0.1);
  border-left-color: var(--accent);
  font-weight: 500;
}

.toc-link.active .toc-num {
  color: var(--accent);
  font-weight: 600;
}

/* Main Content Area */
.cv-main-content {
  display: flex;
  flex-direction: column;
  gap: 68px;
  min-width: 0;
}

.cv-section {
  scroll-margin-top: 92px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-badge-header {
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 12px;
}

.section-num {
  font-family: var(--mono);
  font-size: 0.85rem;
  color: var(--accent);
  background: rgba(174, 208, 196, 0.12);
  padding: 3px 8px;
  border-radius: 2px;
  font-weight: 600;
}

.section-badge-header h2 {
  font-size: clamp(1.6rem, 2.4vw, 2.1rem);
  font-weight: 500;
  color: var(--text);
  margin: 0;
  letter-spacing: -0.02em;
}

.section-subtext {
  font-size: 0.95rem;
  color: var(--muted);
  margin-top: -6px;
  margin-bottom: 4px;
}

.subsection-title {
  font-size: 1.25rem;
  color: var(--text);
  margin-top: 24px;
  margin-bottom: 4px;
  font-weight: 500;
}

/* Cards General */
.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 24px 26px;
  transition: border-color 160ms ease;
}

.card:hover {
  border-color: var(--line-strong);
}

/* Section 1: Personal Info */
.personal-top-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 32px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 22px;
  margin-bottom: 20px;
}

.person-name {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.02em;
}

.person-role {
  font-size: 1.05rem;
  color: var(--accent);
  margin-top: 4px;
  font-weight: 450;
}

.person-degree {
  font-family: var(--mono);
  font-size: 0.82rem;
  color: var(--muted);
  margin-top: 8px;
}

.personal-meta-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.88rem;
}

.meta-label {
  display: block;
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--line-strong);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}

.meta-val {
  color: var(--text);
}

.link-val {
  color: var(--accent);
  text-decoration: none;
}

.link-val:hover {
  text-decoration: underline;
}

.personal-summary-text {
  font-size: 1rem;
  color: #d8dfdb;
  line-height: 1.65;
}

/* Timeline / Entry Cards */
.timeline-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.entry-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.entry-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text);
}

.entry-org {
  font-size: 0.92rem;
  color: var(--accent);
  margin-top: 2px;
}

.entry-period {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--muted);
  white-space: nowrap;
}

.entry-scope {
  font-size: 0.92rem;
  color: var(--muted);
}

.entry-bullets {
  padding-left: 20px;
  color: #cfd8d3;
  font-size: 0.92rem;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.entry-metrics {
  font-family: var(--mono);
  font-size: 0.85rem;
  color: var(--accent);
}

.distinction-highlight {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(174, 208, 196, 0.12);
  border: 1px solid var(--accent);
  color: #fff;
  padding: 6px 12px;
  border-radius: 2px;
  font-size: 0.88rem;
  width: fit-content;
}

.gold-badge {
  color: #e5b869;
}

/* Research Box */
.research-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.research-status-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.research-year-tag {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--accent);
}

.research-heading {
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--text);
  line-height: 1.3;
}

.author-subline {
  font-family: var(--mono);
  font-size: 0.82rem;
  color: var(--muted);
}

.research-desc {
  font-size: 0.95rem;
  color: #cfd8d3;
  line-height: 1.6;
}

.research-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 8px;
}

/* Projects Grid */
.projects-cv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
}

.mini-project-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mini-project-card h4 {
  font-size: 1.1rem;
  color: var(--text);
  font-weight: 500;
}

.mini-project-card p {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.55;
  flex-grow: 1;
}

/* Certifications */
.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
}

.cert-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cert-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.cert-header h4 {
  font-size: 1.05rem;
  color: var(--text);
  font-weight: 500;
}

.cert-issuer {
  font-size: 0.84rem;
  color: var(--accent);
  margin-top: 2px;
}

.cert-date {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--muted);
  white-space: nowrap;
}

.cert-detail {
  font-size: 0.88rem;
  color: #cfd8d3;
  line-height: 1.55;
  flex-grow: 1;
}

.credential-id {
  font-family: var(--mono);
  font-size: 0.74rem;
  color: var(--line-strong);
  word-break: break-all;
  border-top: 1px solid var(--line);
  padding-top: 8px;
}

.credential-id span {
  color: var(--muted);
}

/* CPD Table */
.cpd-table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 3px;
  background: var(--surface);
}

.cpd-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  text-align: left;
}

.cpd-table th {
  background: #111714;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.75rem;
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.cpd-table td {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(52, 70, 62, 0.45);
  color: var(--text);
}

.cpd-title-cell {
  font-weight: 500;
  max-width: 360px;
}

.cpd-speaker-cell {
  color: var(--muted);
  font-size: 0.82rem;
}

.point-badge {
  background: rgba(174, 208, 196, 0.1);
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.74rem;
  padding: 3px 7px;
  border-radius: 2px;
  white-space: nowrap;
}

.cpd-date-cell {
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--muted);
  white-space: nowrap;
}

/* Workshops Grid */
.workshop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}

.workshop-card h4 {
  font-size: 1.05rem;
  color: var(--text);
  font-weight: 500;
}

.ws-org {
  font-size: 0.86rem;
  color: var(--accent);
  margin-top: 4px;
}

.ws-date {
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--muted);
  display: block;
  margin-top: 8px;
}

/* Conferences */
.conf-role {
  font-size: 0.9rem;
  color: var(--accent);
}

.conf-detail {
  font-size: 0.9rem;
  color: #cfd8d3;
  line-height: 1.55;
}

/* Languages */
.languages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}

.lang-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lang-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.lang-top h3 {
  font-size: 1.3rem;
  color: var(--text);
}

.lang-pill {
  background: rgba(174, 208, 196, 0.12);
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 2px;
}

.lang-note {
  font-size: 0.9rem;
  color: #cfd8d3;
  line-height: 1.55;
}

/* Competitions */
.competitions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}

.comp-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comp-award-badge {
  background: rgba(174, 208, 196, 0.15);
  border: 1px solid var(--accent);
  color: #fff;
  font-family: var(--mono);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 2px;
  width: fit-content;
}

.comp-card h4 {
  font-size: 1.05rem;
  color: var(--text);
  margin-top: 4px;
}

.comp-org {
  font-size: 0.82rem;
  color: var(--accent);
}

.comp-event {
  font-size: 0.86rem;
  color: var(--muted);
  line-height: 1.45;
}

/* Volunteers */
.volunteer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
}

.vol-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.vol-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.vol-header h4 {
  font-size: 1.05rem;
  color: var(--text);
}

.vol-role {
  font-size: 0.84rem;
  color: var(--accent);
  margin-top: 3px;
}

.vol-period {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--muted);
  white-space: nowrap;
}

.vol-detail {
  font-size: 0.88rem;
  color: #cfd8d3;
  line-height: 1.55;
}

/* Honors List */
.honors-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.honor-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.honor-gold {
  border-color: #d4a755;
  background: #18221c;
}

.honor-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.honor-title-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.gold-star {
  color: #e5b869;
  font-size: 1.1rem;
}

.honor-cat-badge {
  margin-left: 0;
  font-size: 0.72rem;
}

.honor-title-group h3 {
  font-size: 1.2rem;
  color: var(--text);
  font-weight: 500;
}

.honor-period {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--accent);
  white-space: nowrap;
}

.honor-awarder {
  font-size: 0.88rem;
  color: var(--muted);
}

.honor-detail {
  font-size: 0.92rem;
  color: #cfd8d3;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 1024px) {
  .cv-body-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .cv-nav-panel {
    position: static;
    max-height: none;
    overflow: visible;
  }

  .cv-toc-nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 6px;
  }

  .personal-top-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .cv-toc-nav {
    grid-template-columns: 1fr;
  }

  .entry-header,
  .honor-header,
  .cert-header {
    flex-direction: column;
    gap: 6px;
  }
}

/* Print Styles */
@media print {
  .no-print,
  .cv-nav-panel {
    display: none !important;
  }

  .cv-body-grid {
    display: block !important;
    margin-top: 0 !important;
  }

  .cv-main-content {
    gap: 28px !important;
  }

  .card {
    background: transparent !important;
    border: 1px solid #ccc !important;
    color: #000 !important;
    page-break-inside: avoid;
    padding: 14px !important;
  }

  .section-badge-header {
    border-bottom: 2px solid #000 !important;
  }

  .section-badge-header h2,
  .person-name,
  .entry-title,
  .research-heading {
    color: #000 !important;
  }

  .person-role,
  .entry-org,
  .section-num,
  .toc-num,
  .meta-val,
  .point-badge {
    color: #222 !important;
  }

  .cpd-table th {
    background: #eee !important;
    color: #000 !important;
  }
}
</style>
