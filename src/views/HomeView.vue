<script setup lang="ts">
import BridgeHero from '../components/BridgeHero.vue'
import ProjectDiagram from '../components/ProjectDiagram.vue'
import ResearchFeature from '../components/ResearchFeature.vue'
import ContactCard from '../components/ContactCard.vue'
import { profile, approach } from '../content/profile'
import { projects } from '../content/projects'

const featured = projects[0]!
</script>

<template>
  <div class="shell">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Civil Engineer</p>
        <h1 id="hero-title">KASHAN<br>SHAFIQ</h1>
        <p class="hero-description">{{ profile.introduction }}</p>
        <div class="hero-actions">
          <RouterLink class="button primary" to="/work">
            Explore my work <span aria-hidden="true">↗</span>
          </RouterLink>
          <a class="text-link" href="#contact">
            Get in touch <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <BridgeHero />
    </section>

    <div class="discipline-strip" aria-label="Areas of practice">
      <span>Structures</span>
      <span>Digital modelling</span>
      <span>Applied research</span>
      <i aria-hidden="true"></i>
    </div>

    <section class="selected-work" aria-labelledby="selected-work-title">
      <div class="section-side">
        <h2 id="selected-work-title">Selected<br>work<span class="accent">.</span></h2>
        <p>Problems, methods,<br>and what I learned.</p>
        <RouterLink class="text-link" to="/work">
          View featured projects <span aria-hidden="true">↗</span>
        </RouterLink>
      </div>

      <RouterLink
        class="featured-visual"
        :to="`/projects/${featured.slug}`"
        aria-label="View structural design case study"
      >
        <ProjectDiagram kind="structure" label="Illustrative axonometric structural frame schematic" />
      </RouterLink>

      <div class="featured-info">
        <h3>{{ featured.title }}</h3>
        <dl class="metadata">
          <div><dt>Method</dt><dd>ETABS + SAFE</dd></div>
          <div><dt>Type</dt><dd>Academic project</dd></div>
        </dl>
        <RouterLink class="text-link" :to="`/projects/${featured.slug}`">
          Open case study <span aria-hidden="true">↗</span>
        </RouterLink>
      </div>
    </section>

    <div class="secondary-projects">
      <RouterLink
        v-for="project in projects.slice(1, 3)"
        :key="project.slug"
        :to="`/projects/${project.slug}`"
        class="mini-project"
      >
        <ProjectDiagram :kind="project.diagram" :label="`${project.title} illustrative schematic`" />
        <div>
          <h3>{{ project.title }} <span aria-hidden="true">↗</span></h3>
          <p>{{ project.summary }}</p>
        </div>
      </RouterLink>
    </div>
  </div>

  <section class="approach-band" aria-labelledby="approach-title">
    <div class="shell">
      <p id="approach-title" class="eyebrow">
        How I approach a problem <span class="short-rule" aria-hidden="true"></span>
      </p>
      <div class="approach-grid">
        <div v-for="item in approach" :key="item.title">
          <h2>{{ item.title }}</h2>
          <p>{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <div class="shell">
    <ResearchFeature />
    <section class="background-links" aria-label="More about Kashan">
      <RouterLink to="/cv">
        <span class="eyebrow">Academics</span>
        <h3>COMSATS Wah <span aria-hidden="true">↗</span></h3>
        <p>BS Civil Engineering · 2022–2026</p>
      </RouterLink>
      <RouterLink to="/experience">
        <span class="eyebrow">Work Experience</span>
        <h3>Scan-to-BIM <span aria-hidden="true">↗</span></h3>
        <p>Junior BIM Modeler · Archnetix</p>
      </RouterLink>
      <RouterLink to="/community">
        <span class="eyebrow">Volunteering</span>
        <h3>People & learning <span aria-hidden="true">↗</span></h3>
        <p>Leadership, service and sharing knowledge.</p>
      </RouterLink>
    </section>
  </div>

  <!-- Contact Section with Dialog Box at Bottom Right -->
  <section id="contact" class="home-contact-section" aria-labelledby="contact-heading">
    <div class="shell contact-split">
      <div class="contact-editorial">
        <p class="eyebrow">Contact / Collaboration</p>
        <h2 id="contact-heading">
          Precision in structure.<br>Curiosity in conversation<span class="accent">.</span>
        </h2>
        <p class="contact-desc">
          Have an inquiry regarding Scan-to-BIM modelling, finite element analysis, academic research preprints, or professional engineering opportunities? Feel free to drop a direct note.
        </p>

        <div class="contact-details-block">
          <div class="detail-item">
            <span class="eyebrow">Direct Email</span>
            <a :href="`mailto:${profile.contact.email}`" class="contact-channel-link">
              {{ profile.contact.email }} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div class="detail-item">
            <span class="eyebrow">LinkedIn</span>
            <a
              :href="profile.contact.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-channel-link"
            >
              linkedin.com/in/kashan-shafiq <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div class="detail-item">
            <span class="eyebrow">Location</span>
            <p class="contact-location-info">Islamabad / Wah Cantt, Pakistan</p>
          </div>
        </div>
      </div>

      <div class="contact-card-container">
        <ContactCard />
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-contact-section {
  padding-block: 85px 110px;
  border-top: 1px solid var(--line);
  background: var(--bg);
  scroll-margin-top: 40px;
}

.contact-split {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 50px;
  align-items: start;
}

.contact-editorial h2 {
  font-size: clamp(2.2rem, 4.2vw, 3.8rem);
  margin-block: 18px 22px;
  line-height: 1.06;
}

.contact-desc {
  font-size: 1.08rem;
  color: var(--muted);
  line-height: 1.65;
  max-width: var(--prose-max-width, 68ch);
  margin-bottom: 34px;
}

.contact-details-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 1px solid var(--line);
  padding-top: 26px;
  max-width: 500px;
}

.detail-item .eyebrow {
  display: block;
  margin-bottom: 5px;
}

.contact-channel-link {
  color: var(--accent);
  font-size: 1.05rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  transition: color 160ms;
}

.contact-channel-link:hover {
  color: var(--accent-hover);
}

.contact-location-info {
  color: var(--text);
  font-size: 0.95rem;
}

.contact-card-container {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 960px) {
  .contact-split {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .contact-card-container {
    justify-content: stretch;
  }
  .home-contact-section {
    padding-block: 60px 80px;
  }
}
</style>
