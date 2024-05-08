<template>
<div>
    <div class="flex flex-col gap-2 bg-gradient-to-t from-tertiary-400 to-tertiary-100 justify-center items-center h-[260px] mt-5">
        <h1 class="text-6xl font-bold text-center text-tertiary-800 ">
            Events
        </h1>
        <p class="font-medium text-white text-lg mt-2">Register and join the event para happy tang tanan</p>
    </div>

    <div class="max-w-screen-xl mx-auto mt-5 grid grid-cols-3 gap-2">
        <div v-for="event in events" class=" max-w-sm p-6 bg-tertiary-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a :href="`/events/${event.slug}`">
                <h5 class="mb-1 text-2xl font-bold tracking-tight text-gray-700 dark:text-white mt-2">{{event.name}}</h5>
                <div class="flex items-center gap-2">

                    <div class="flex items-center gap-2">
                        <CalendarDaysIcon class="text-tertiary-500 w-4" />
                        <p class="text-xs text-gray-600">January 23,2020</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <MapPinIcon class="text-tertiary-500 w-5"/>
                        <h5 class=" text-xs font-medium tracking-tight text-gray-700 dark:text-white">{{event.venue}}</h5>
                    </div>
                </div>
            </a>
            <div class="mt-2 flex gap-2">
                <div class="">
                    <p class="inline-flex w-10 justify-center items-center px-2 py-1 text-xs font-medium text-center text-white bg-tertiary-700 rounded-lg hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-tertiary-300 dark:bg-tertiary-600 dark:hover:bg-tertiary-700 dark:focus:ring-tertiary-800">5km</p>
                </div>

                <div class="">
                    <p class="inline-flex w-10 justify-center items-center px-2 py-1 text-xs font-medium text-center text-white bg-tertiary-700 rounded-lg hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-tertiary-300 dark:bg-tertiary-600 dark:hover:bg-tertiary-700 dark:focus:ring-tertiary-800">10km</p>
                </div>

                <div class="">
                    <p class="inline-flex w-10 justify-center items-center px-2 py-1 text-xs font-medium text-center text-white bg-tertiary-700 rounded-lg hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-tertiary-300 dark:bg-tertiary-600 dark:hover:bg-tertiary-700 dark:focus:ring-tertiary-800">21km</p>
                </div>
            </div>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
            <hr class="mb-2" />
            <div class="flex justify-end">

                <button @click="() => routeToEvent(event.slug)"  class="inline-flex items-center px-3 py-2 text-xs font-medium text-center text-white bg-tertiary-700 rounded-lg hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-tertiary-300 dark:bg-tertiary-600 dark:hover:bg-tertiary-700 dark:focus:ring-tertiary-800">
                    Register
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
            </div>
        </div>

    </div>

    <LoginRunnerModal :loginForm="loginForm" @loginEvent="loginAsync"/>
</div>
</template>

<script setup>
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/vue/24/solid';
CalendarDaysIcon
import axios from 'axios'
import {ref,onMounted} from 'vue'
import LoginRunnerModal from '../components/LoginRunnerModal.vue';
import { useRoute, useRouter } from 'vue-router';
import { set } from '../utils/localstorage';
import { Modal } from 'flowbite';
import { useStore } from '../store';

const events = ref([])
const event = ref()
const router = useRouter()
const route = useRoute()
const loginForm = ref({
    name: '',
    alias: '',
    email: '',
    password: ''
})

const store = useStore()

const routeToEvent = (slug) => {
    if(store.isRunnerLoggedIn){
        router.push({name: 'Event', params: {id: slug}})
    }else{
        const $targetEl = document.getElementById('login-modal');
        const modal = new Modal($targetEl)
        modal.show()
    }
}

const loginAsync = async () => {
    try {
        const form = new FormData()
        form.append('email', loginForm.value.email)
        form.append('password', loginForm.value.password)
                
        const response =await axios.post('http://localhost:5000/auth/runner/login',form, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        console.log(response.data);
        if(response.data[0].success){
            store.isRunnerLoggedIn = true;
            const id = response.data[1].data
            set("runner_id",id);
        }
    } catch (error) {
        console.log(error);
    }
}

const getEvents = async () => {
    try {
        const response = await axios.get('http://localhost:5000/event')
        events.value = response.data[1].data
    } catch (error) {
        console.log(error);
    }
}

const getEventBySlug = async () => {
    const eventSlug = route.params.slug
    try {
        const response = await axios.get(`http://localhost:5000/event/slug/${eventSlug}`)
        // console.log(response.data);
        event.value = response.data[1].data
    } catch (error) {
        console.log(error);
    }
}

onMounted(async() => {
    await getEvents()
    await getEventBySlug()
})
</script>