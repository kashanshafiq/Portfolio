import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView, meta: { title: 'Civil Engineering & Digital Construction' } },
    { path: '/work', component: () => import('./views/WorkView.vue'), meta: { title: 'Featured Projects' } },
    { path: '/projects/:slug', component: () => import('./views/ProjectView.vue'), meta: { title: 'Project' } },
    { path: '/research', component: () => import('./views/ResearchView.vue'), meta: { title: 'Research Work' } },
    { path: '/research/:slug', component: () => import('./views/ResearchDetailView.vue'), meta: { title: 'Research Work' } },
    { path: '/about', redirect: '/' },
    { path: '/experience', component: () => import('./views/ExperienceView.vue'), meta: { title: 'Work Experience' } },
    { path: '/experience/:slug', component: () => import('./views/ExperienceDetailView.vue'), meta: { title: 'Work Experience' } },
    { path: '/recognition', component: () => import('./views/RecognitionView.vue'), meta: { title: 'Honours and Awards' } },
    { path: '/community', component: () => import('./views/CommunityView.vue'), meta: { title: 'Volunteering' } },
    { path: '/cv', component: () => import('./views/CvView.vue'), meta: { title: 'Academics' } },
    { path: '/contact', redirect: '/#contact' },
    { path: '/:pathMatch(.*)*', component: () => import('./views/NotFoundView.vue'), meta: { title: 'Page not found' } },
  ],
  scrollBehavior: (to, _from, saved) => {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = `${String(to.meta.title || 'Portfolio')} — Kashan Shafiq`
})
