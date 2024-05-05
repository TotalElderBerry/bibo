import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import EventGallery from '../pages/EventGallery.vue';
import Photographers from '../pages/Photographers.vue';
import Organizers from '../pages/Organizers.vue';
import Organizer from '../pages/Organizer.vue';
import Photographer from '../pages/Photographer.vue';
import PhotographerEvent from '../pages/PhotographerEvent.vue';


const routes = [
  {
    path: '/', 
    name: 'Home',
    component: Home, 
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: EventGallery,
  },
  {
    path: '/photographers',
    name: 'Photographers',
    component: Photographers,
  },
  {
    path: '/organizers',
    name: 'Organizers',
    component: Organizers,
  },
  {
    path: '/organizer',
    name: 'Organizer',
    component: Organizer,
  },
  {
    path: '/photographer/home',
    name: 'Photographer',
    component: Photographer,
  },
  {
    path: '/photographer/event/:slug',
    name: 'PhotographerEvent',
    component: PhotographerEvent,
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

