import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView, meta: { title: 'Civil Engineering & Digital Construction' } },
    { path: '/work', component: () => import('./views/WorkView.vue'), meta: { title: 'Selected work' } },
    { path: '/projects/:slug', component: () => import('./views/ProjectView.vue'), meta: { title: 'Project' } },
    { path: '/research', component: () => import('./views/ResearchView.vue'), meta: { title: 'Research' } },
    { path: '/research/bim-to-ar', redirect: '/research' },
    { path: '/about', component: () => import('./views/AboutView.vue'), meta: { title: 'About' } },
    { path: '/experience', component: () => import('./views/ExperienceView.vue'), meta: { title: 'Experience' } },
    { path: '/recognition', component: () => import('./views/RecognitionView.vue'), meta: { title: 'Recognition' } },
    { path: '/community', component: () => import('./views/CommunityView.vue'), meta: { title: 'Community' } },
    { path: '/cv', component: () => import('./views/CvView.vue'), meta: { title: 'Academic CV' } },
    { path: '/contact', component: () => import('./views/ContactView.vue'), meta: { title: 'Contact' } },
    { path: '/:pathMatch(.*)*', component: () => import('./views/NotFoundView.vue'), meta: { title: 'Page not found' } },
  ],
  scrollBehavior: (_to, _from, saved) => saved || { top: 0 },
})

router.afterEach((to) => {
  document.title = `${String(to.meta.title || 'Portfolio')} — Kashan Shafiq`
})
