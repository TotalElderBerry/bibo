import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import EventGallery from '../pages/EventGallery.vue';
import Photographers from '../pages/Photographers.vue';
import Organizers from '../pages/Organizers.vue';
import Organizer from '../pages/Organizer.vue';
import Photographer from '../pages/Photographer.vue';
import PhotographerEvent from '../pages/PhotographerEvent.vue';
import Events from '../pages/Events.vue';
import Event from '../pages/Event.vue';
import OrganizerEvent from '../pages/OrganizerEvent.vue';
import SuccessRegistration from '../pages/SuccessRegistration.vue';
import { useStore } from '../store';
import { get } from '../utils/localstorage';


const routes = [
  {
    path: '/', 
    name: 'Home',
    component: Home, 
  },
  {
    path: '/events', 
    name: 'Events',
    component: Events, 
  },
  {
    path: '/events/:id', 
    name: 'Event',
    component: Event, 
  },
  {
    path: '/events/:id/registration/success', 
    name: 'RegistrationSuccess',
    component: SuccessRegistration, 
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
    path: '/organizer/event/:slug',
    name: 'OrganizerEvent',
    component: OrganizerEvent,
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

router.beforeEach((to, _from, next) => {
  const store = useStore()
  const runnerId = get('runner_id')
  const photogId = get('photog_id')
  const eventOrgId = get('eventOrg_id')

  if(runnerId) store.isRunnerLoggedIn = true
  if(photogId) store.isPhotographerLoggedIn = true
  if(eventOrgId) store.isEventOrgLoggedIn = true

  next()
})

export default router;

