import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home/Home.vue') }
    ]
  },
  {
    path: '/import',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/import/ImportPage.vue') }
    ]
  },
  {
    path: '/resumes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/resumes/ResumesPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
