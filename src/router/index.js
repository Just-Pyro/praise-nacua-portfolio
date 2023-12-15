import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import ContactView from '../views/ContactView.vue';
import Todolist from '../views/Todolist.vue';
import FlappyBird from '../views/vuegames/FlappyBird.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
  },

  {
    path: '/todolist',
    name: 'todolist',
    component: Todolist,
  },

  {
    path: '/vuegames/flappybird',
    name: 'flappybird',
    component: FlappyBird,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
