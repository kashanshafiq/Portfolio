<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PageIntro from '../components/PageIntro.vue'
import { academicCv } from '../content/academicCv'

const navItems = [
  { id: 'personal-info', num: '01', label: 'Personal Information' },
  { id: 'education', num: '02', label: 'Education & Training' },
  { id: 'research-experience', num: '03', label: 'Research Experience' },
  { id: 'work-experience', num: '04', label: 'Work Experience' },
  { id: 'projects', num: '05', label: 'Projects' },
  { id: 'certifications', num: '06', label: 'Certifications' },
  { id: 'professional-trainings', num: '07', label: 'Professional Trainings & CPD Seminars' },
  { id: 'skills', num: '08', label: 'Skills' },
  { id: 'honors-awards', num: '09', label: 'Honours & Awards' },
  { id: 'volunteering', num: '10', label: 'Volunteering' },
  { id: 'extracurricular', num: '11', label: 'Extracurricular Activities & Leadership' },
  { id: 'languages', num: '12', label: 'Language Skills' },
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
      :description="academicCv.personalInfo.keywords"
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

      <!-- Main Profile Sections -->
      <main class="cv-main-content">
        <!-- 01. Personal Information -->
        <section id="personal-info" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">01</span>
            <h2>Personal Information</h2>
          </div>
          <div class="card personal-card">
            <div class="personal-top-row">
              <div>
                <h3 class="person-name">{{ academicCv.personalInfo.name }}</h3>
                <p class="person-role">{{ academicCv.personalInfo.keywords }}</p>
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
                  <span class="meta-label">Phone / WhatsApp</span>
                  <a :href="`tel:${academicCv.personalInfo.phone}`" class="meta-val link-val">
                    {{ academicCv.personalInfo.phone }}
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

        <!-- 02. Education & Training -->
        <section id="education" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">02</span>
            <h2>Education &amp; Training</h2>
          </div>
          <p class="section-subtext">Undergraduate engineering degree with top academic honors and core technical coursework.</p>

          <div class="timeline-list">
            <article
              v-for="edu in academicCv.education"
              :key="edu.degree"
              class="card entry-card"
            >
              <div class="entry-header">
                <div>
                  <h3 class="entry-title">{{ edu.degree }}</h3>
                  <p class="entry-org">{{ edu.institution }} · {{ edu.location }}</p>
                </div>
                <span class="entry-period">{{ edu.period }}</span>
              </div>
              <div v-if="edu.distinction" class="distinction-highlight">
                <span class="gold-badge" aria-hidden="true">★</span>
                <strong>{{ edu.distinction }}</strong>
              </div>
              <p class="entry-metrics">
                <strong>Field:</strong> {{ edu.fieldOfStudy }} &nbsp;|&nbsp;
                <strong>Grade:</strong> {{ edu.grade }} &nbsp;|&nbsp;
                <strong>Level:</strong> {{ edu.eqfLevel }}
              </p>
              <p v-if="edu.thesis" class="entry-scope">
                <strong>Thesis:</strong> {{ edu.thesis }}
              </p>
              <div v-if="edu.courses && edu.courses.length" class="edu-courses-block">
                <span class="meta-label">Core Coursework</span>
                <div class="tag-list mini-tags">
                  <span v-for="c in edu.courses" :key="c" class="tag">{{ c }}</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <!-- 03. Research Experience -->
        <section id="research-experience" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">03</span>
            <h2>Research Experience</h2>
          </div>
          <p class="section-subtext">Undergraduate thesis research, mobile augmented reality development, and engineering visualization frameworks.</p>

          <div class="timeline-list">
            <article
              v-for="res in academicCv.researchExperience"
              :key="res.title"
              class="card entry-card"
            >
              <div class="entry-header">
                <div>
                  <h3 class="entry-title">{{ res.title }}</h3>
                  <p class="entry-org">{{ res.role }} · {{ res.organization }}</p>
                </div>
                <span class="entry-period">{{ res.period }}</span>
              </div>
              <p class="entry-scope">{{ res.summary }}</p>
              <ul class="entry-bullets">
                <li v-for="hl in res.highlights" :key="hl">{{ hl }}</li>
              </ul>
              <div class="research-actions">
                <RouterLink v-if="res.link" class="button" :to="res.link">
                  Read research details ↗
                </RouterLink>
                <a
                  v-if="res.doi"
                  class="text-link"
                  :href="res.doi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SSRN Preprint DOI ↗
                </a>
              </div>
            </article>
          </div>
        </section>

        <!-- 04. Work Experience -->
        <section id="work-experience" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">04</span>
            <h2>Work Experience</h2>
          </div>
          <p class="section-subtext">Professional practice, Scan-to-BIM modeling, high-rise tower management, and site engineering.</p>

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

        <!-- 05. Projects -->
        <section id="projects" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">05</span>
            <h2>Projects</h2>
          </div>
          <p class="section-subtext">Structural design, numerical modeling, BIM, hydraulic analysis, and engineering calculation projects.</p>

          <div class="projects-cv-grid">
            <article
              v-for="p in academicCv.projects"
              :key="p.title"
              class="card mini-project-card"
            >
              <h3 class="card-project-title">{{ p.title }}</h3>
              <p class="card-project-desc">{{ p.description }}</p>
              <div class="tag-list mini-tags">
                <span v-for="tool in p.tools" :key="tool" class="tag">{{ tool }}</span>
              </div>
            </article>
          </div>
        </section>

        <!-- 06. Certifications -->
        <section id="certifications" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">06</span>
            <h2>Certifications</h2>
          </div>
          <p class="section-subtext">Specialized technical credentials, BIM certifications, and structural design training.</p>

          <div class="cert-grid">
            <article
              v-for="cert in academicCv.certifications"
              :key="cert.title"
              class="card cert-card"
            >
              <div class="cert-header">
                <div>
                  <h3 class="cert-title-text">{{ cert.title }}</h3>
                  <p class="cert-issuer">{{ cert.issuer }}</p>
                </div>
                <span v-if="cert.date" class="cert-date">{{ cert.date }}</span>
              </div>
              <p class="cert-detail">{{ cert.detail }}</p>
              <div v-if="cert.link" class="cert-link-row">
                <a :href="cert.link" target="_blank" rel="noopener noreferrer" class="text-link cert-link">
                  View certificate ↗
                </a>
              </div>
            </article>
          </div>
        </section>

        <!-- 07. Professional Trainings & CPD Seminars -->
        <section id="professional-trainings" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">07</span>
            <h2>Professional Trainings &amp; CPD Seminars</h2>
          </div>
          <p class="section-subtext">PEC-accredited Continuing Professional Development (CPD) seminars, technical workshops, and conferences.</p>

          <h3 class="subsection-title">Continuing Professional Development (CPD) Seminars</h3>
          <div class="cpd-table-wrapper">
            <table class="cpd-table">
              <thead>
                <tr>
                  <th>Topic / Seminar Title</th>
                  <th>Keynote Speaker</th>
                  <th>Credit</th>
                  <th>Date</th>
                  <th>Certificate</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cpd in academicCv.professionalTrainings.cpdSeminars" :key="cpd.title">
                  <td class="cpd-title-cell">
                    <strong>{{ cpd.title }}</strong>
                    <p class="cpd-detail-text">{{ cpd.detail }}</p>
                  </td>
                  <td class="cpd-speaker-cell">{{ cpd.speaker }}</td>
                  <td class="cpd-point-cell"><span class="point-badge">{{ cpd.points }}</span></td>
                  <td class="cpd-date-cell">{{ cpd.date }}</td>
                  <td class="cpd-link-cell">
                    <a v-if="cpd.link" :href="cpd.link" target="_blank" rel="noopener noreferrer" class="text-link">
                      View ↗
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="subsection-title" style="margin-top: 36px;">Technical Workshops &amp; Conferences</h3>
          <div class="workshop-grid">
            <article
              v-for="ws in academicCv.professionalTrainings.workshops"
              :key="ws.title"
              class="card workshop-card"
            >
              <h3 class="ws-title-text">{{ ws.title }}</h3>
              <p class="ws-org">{{ ws.organizer }}</p>
              <p class="ws-detail">{{ ws.detail }}</p>
              <div class="ws-bottom">
                <span class="ws-date">{{ ws.date }}</span>
                <a v-if="ws.link" :href="ws.link" target="_blank" rel="noopener noreferrer" class="text-link">
                  View certificate ↗
                </a>
              </div>
            </article>
            <article
              v-for="conf in academicCv.professionalTrainings.conferences"
              :key="conf.title"
              class="card workshop-card"
            >
              <h3 class="ws-title-text">{{ conf.title }}</h3>
              <p class="ws-org">{{ conf.role }} · {{ conf.organizer }}</p>
              <p class="ws-detail">{{ conf.detail }}</p>
              <div class="ws-bottom">
                <span class="ws-date">{{ conf.date }}</span>
                <a v-if="conf.link" :href="conf.link" target="_blank" rel="noopener noreferrer" class="text-link">
                  View certificate ↗
                </a>
              </div>
            </article>
          </div>
        </section>

        <!-- 08. Skills -->
        <section id="skills" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">08</span>
            <h2>Skills</h2>
          </div>
          <p class="section-subtext">Core civil engineering competencies, specialized modeling software, and professional soft skills.</p>

          <div class="skills-cv-grid">
            <div class="card skill-category-card">
              <h3 class="skill-cat-title">Core Competencies</h3>
              <div class="tag-list">
                <span v-for="s in academicCv.skills.coreCompetencies" :key="s" class="tag skill-tag">{{ s }}</span>
              </div>
            </div>
            <div class="card skill-category-card">
              <h3 class="skill-cat-title">Software &amp; Tools</h3>
              <div class="tag-list">
                <span v-for="s in academicCv.skills.softwareAndTools" :key="s" class="tag skill-tag">{{ s }}</span>
              </div>
            </div>
            <div class="card skill-category-card">
              <h3 class="skill-cat-title">Soft Skills</h3>
              <div class="tag-list">
                <span v-for="s in academicCv.skills.softSkills" :key="s" class="tag skill-tag">{{ s }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 09. Honours & Awards -->
        <section id="honors-awards" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">09</span>
            <h2>Honours &amp; Awards</h2>
          </div>
          <p class="section-subtext">University Gold Medal, competitive merit scholarships, academic distinctions, and engineering competitions.</p>

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
                  <h3 class="honor-title-text">{{ award.title }}</h3>
                </div>
                <span class="honor-period">{{ award.period }}</span>
              </div>
              <p class="honor-awarder"><strong>Conferred by:</strong> {{ award.awarder }}</p>
              <p class="honor-detail">{{ award.detail }}</p>
              <div v-if="award.link" class="honor-link-row">
                <a :href="award.link" target="_blank" rel="noopener noreferrer" class="text-link">
                  View certificate / recognition ↗
                </a>
              </div>
            </article>
          </div>
        </section>

        <!-- 10. Volunteering -->
        <section id="volunteering" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">10</span>
            <h2>Volunteering</h2>
          </div>
          <p class="section-subtext">Community welfare initiatives, educational outreach, public awareness campaigns, and open academic resources.</p>

          <div class="volunteer-grid">
            <article
              v-for="v in academicCv.volunteering"
              :key="v.title"
              class="card vol-card"
            >
              <div class="vol-header">
                <div>
                  <h3 class="vol-title-text">{{ v.title }}</h3>
                  <p v-if="v.organization || v.location" class="vol-role">
                    {{ [v.organization, v.location].filter(Boolean).join(' · ') }}
                  </p>
                </div>
                <span class="vol-period">{{ v.period }}</span>
              </div>
              <p class="vol-detail">{{ v.detail }}</p>
              <div v-if="v.link" class="vol-link-row">
                <a :href="v.link" target="_blank" rel="noopener noreferrer" class="text-link">
                  View initiative link ↗
                </a>
              </div>
            </article>
          </div>
        </section>

        <!-- 11. Extracurricular Activities & Leadership -->
        <section id="extracurricular" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">11</span>
            <h2>Extracurricular Activities &amp; Leadership</h2>
          </div>
          <p class="section-subtext">Global leadership fellowships, engineering hackathons, mental well-being initiatives, and technical symposiums.</p>

          <div class="extracurricular-grid">
            <article
              v-for="e in academicCv.extracurricular"
              :key="e.title"
              class="card extra-card"
            >
              <div class="extra-header">
                <h3 class="extra-title-text">{{ e.title }}</h3>
                <span v-if="e.period" class="extra-period">{{ e.period }}</span>
              </div>
              <p class="extra-detail">{{ e.detail }}</p>
              <div v-if="e.link" class="extra-link-row">
                <a :href="e.link" target="_blank" rel="noopener noreferrer" class="text-link">
                  View certificate / initiative link ↗
                </a>
              </div>
            </article>
          </div>
        </section>

        <!-- 12. Language Skills -->
        <section id="languages" class="cv-section">
          <div class="section-badge-header">
            <span class="section-num">12</span>
            <h2>Language Skills</h2>
          </div>
          <p class="section-subtext">Mother tongue proficiency and international English language immersion qualifications.</p>

          <div class="languages-grid">
            <article
              v-for="lang in academicCv.languages"
              :key="lang.language"
              class="card lang-card"
            >
              <div class="lang-top">
                <h3 class="lang-name">{{ lang.language }}</h3>
                <span class="lang-pill">{{ lang.level }}</span>
              </div>
              <p class="lang-note">{{ lang.detail }}</p>
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
  font-size: var(--text-eyebrow);
  letter-spacing: 0.08em;
  color: var(--accent);
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line);
  font-weight: 500;
  text-transform: uppercase;
}

.cv-toc-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toc-link {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 8px 12px;
  border-radius: 2px;
  text-decoration: none;
  color: var(--muted);
  font-size: 0.9375rem;
  line-height: 1.40;
  transition: all 140ms ease;
  border-left: 3px solid transparent;
}

.toc-num {
  font-family: var(--mono);
  font-size: var(--text-badge, 0.75rem);
  color: var(--line-strong);
  flex-shrink: 0;
}

.toc-label {
  flex-grow: 1;
}

.toc-link:hover {
  color: var(--text);
  background: var(--surface-raised);
}

.toc-link.active {
  color: var(--text);
  background: var(--accent-selected);
  border-left-color: var(--accent);
  font-weight: 550;
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
  font-size: var(--text-meta-value, 0.875rem);
  color: var(--accent);
  background: var(--accent-soft);
  padding: 3px 8px;
  border-radius: 2px;
  font-weight: 500;
}

.section-badge-header h2 {
  font-size: var(--text-section-title);
  font-weight: 600;
  line-height: 1.18;
  color: var(--text);
  margin: 0;
  letter-spacing: -0.015em;
}

.section-subtext {
  font-size: var(--text-card-desc, 1rem);
  color: var(--muted);
  line-height: 1.60;
  margin-top: -6px;
  margin-bottom: 4px;
}

.subsection-title {
  font-size: var(--text-subsection-title);
  color: var(--text);
  margin-top: 24px;
  margin-bottom: 4px;
  font-weight: 580;
  line-height: 1.28;
  letter-spacing: -0.01em;
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
  font-weight: 500;
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
  color: var(--muted);
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
  font-weight: 580;
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
  color: var(--muted);
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
  background: var(--accent-soft);
  border: 1px solid var(--accent);
  color: var(--text);
  padding: 6px 12px;
  border-radius: 2px;
  font-size: 0.88rem;
  width: fit-content;
}

.gold-badge {
  color: var(--accent);
}

.edu-courses-block {
  margin-top: 4px;
}

.research-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 8px;
  flex-wrap: wrap;
}

/* Projects Grid */
.projects-cv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  gap: 18px;
}

.mini-project-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-project-title {
  font-size: 1.15rem;
  color: var(--text);
  font-weight: 580;
  line-height: 1.30;
}

.card-project-desc {
  font-size: 0.92rem;
  color: var(--muted);
  line-height: 1.58;
  flex-grow: 1;
}

/* Certifications */
.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(290px, 100%), 1fr));
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

.cert-title-text {
  font-size: 1.1rem;
  color: var(--text);
  font-weight: 580;
  line-height: 1.30;
}

.cert-issuer {
  font-size: 0.85rem;
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
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.55;
  flex-grow: 1;
}

.cert-link-row,
.honor-link-row,
.vol-link-row,
.extra-link-row {
  margin-top: 4px;
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
  background: var(--surface-input);
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
  border-bottom: 1px solid var(--line);
  color: var(--text);
  vertical-align: top;
}

.cpd-title-cell {
  font-weight: 500;
  max-width: 340px;
}

.cpd-detail-text {
  font-size: 0.82rem;
  color: var(--muted);
  margin-top: 4px;
  line-height: 1.45;
}

.cpd-speaker-cell {
  color: var(--muted);
  font-size: 0.82rem;
  white-space: nowrap;
}

.point-badge {
  background: var(--accent-soft);
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

.cpd-link-cell {
  white-space: nowrap;
}

/* Workshops Grid */
.workshop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 16px;
}

.workshop-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ws-title-text {
  font-size: 1.1rem;
  color: var(--text);
  font-weight: 580;
  line-height: 1.30;
}

.ws-org {
  font-size: 0.86rem;
  color: var(--accent);
}

.ws-detail {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.50;
  flex-grow: 1;
}

.ws-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
  flex-wrap: wrap;
}

.ws-date {
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--muted);
}

/* Skills Category Grid */
.skills-cv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 18px;
}

.skill-category-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.skill-cat-title {
  font-size: 1.15rem;
  font-weight: 580;
  color: var(--text);
  border-bottom: 1px solid var(--line);
  padding-bottom: 8px;
}

.skill-tag {
  font-size: 0.85rem;
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
  gap: 10px;
}

.honor-gold {
  border-color: var(--accent);
  background: var(--surface);
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
  color: var(--accent);
  font-size: 1.1rem;
}

.honor-cat-badge {
  margin-left: 0;
  font-size: 0.72rem;
}

.honor-title-text {
  font-size: 1.15rem;
  color: var(--text);
  font-weight: 580;
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
  color: var(--muted);
  line-height: 1.6;
}

/* Volunteers */
.volunteer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(290px, 100%), 1fr));
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

.vol-title-text {
  font-size: 1.1rem;
  color: var(--text);
  font-weight: 580;
  line-height: 1.30;
}

.vol-role {
  font-size: 0.85rem;
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
  color: var(--muted);
  line-height: 1.55;
  flex-grow: 1;
}

/* Extracurricular Grid */
.extracurricular-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 18px;
}

.extra-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.extra-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.extra-title-text {
  font-size: 1.1rem;
  color: var(--text);
  font-weight: 580;
  line-height: 1.30;
}

.extra-period {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--accent);
  white-space: nowrap;
}

.extra-detail {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.55;
  flex-grow: 1;
}

/* Languages */
.languages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
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

.lang-name {
  font-size: 1.25rem;
  color: var(--text);
  font-weight: 580;
}

.lang-pill {
  background: var(--accent-soft);
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 2px;
}

.lang-note {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.55;
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
    grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
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
  .cert-header,
  .extra-header,
  .vol-header {
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
  .card-project-title,
  .cert-title-text,
  .ws-title-text,
  .extra-title-text,
  .vol-title-text,
  .honor-title-text {
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
