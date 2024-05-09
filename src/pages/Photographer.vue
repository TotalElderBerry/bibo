<template>
    <div class="mt-10 px-4 max-w-screen-xl mx-auto flex flex-col h-screen">
        <div>
            <div class="mb-5 ">
                <h1 class="text-4xl font-semibold text-tertiary-600">Hello, {{ runner.alias }}</h1>
                <p class="text-md text-light text-gray-600">Select a running event to contribute your photos</p>
            </div>
            <form class="flex items-center max-w-sm mx-auto">   
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                        </svg>
                    </div>
                    <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Event" required />
                </div>
                <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-tertiary-700 rounded-lg border hover:bg-tertiary-500 focus:ring-4 focus:outline-none focus:ring-tertiary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span class="sr-only">Search</span>
                </button>
            </form>
        </div>

        <h1 class="mt-10 mb-2 text-2xl font-medium text-tertiary-600">Latest Run Events</h1>

        <div class="grid grid-cols-3 gap-2">
            <div class="grid grid-cols-1 my-2" v-for="e in events">
                <a :href="`/photographer/event/${e.slug}`" class=" block max-w-sm p-6 border border-tertiary-300 rounded-lg shadow-lg bg-tertiary-50  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-semibold tracking-tight text-teal-900 dark:text-white">{{e.name}}</h5>
                <hr class="my-3"/>
                <div class="text-sm font-light">
                    <div class="flex items-center gap-2">
                        <CalendarDaysIcon class="w-4 text-tertiary-800"/>
                        <p>{{getReadableDate(e.date)}}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <MapPinIcon class="w-4 text-tertiary-800"/>
                        <p>{{e.venue}}</p>
                    </div>
                </div>
                <hr class="mt-5 mb-2"/>
                <p class="text-xs">5 Photographers Uploaded Here</p>
                </a>
            </div>
        </div>

    </div>
</template>


<script setup>
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/vue/24/solid';
import {onMounted, ref} from 'vue'
import axios from 'axios'
import {getReadableDate} from '../utils/date'
import { get } from '../utils/localstorage';
const event = ref({
    name: '',
    venue: '',
    date: '',
    datetime_created: ''
})
const runner = ref({})

const events = ref([])

onMounted(async() => {
    try {
        await getEvents()
        await getPhotographerById()
    } catch (error) {
        
    }
})


const getEvents = async () => {
    try {
        const response = await axios.get('http://localhost:5000/event')
        events.value = response.data[1].data
        console.log(response.data[1].data);
    } catch (error) {
        console.log(error);
    }
}

const getPhotographerById = async () => {
    try {
        const photog_id = get("photog_id")
        const response = await axios.get(`http://localhost:5000/photographer/${photog_id}`)
        console.log(response);
        runner.value = response.data[1].data
    } catch (error) {
        
    }
}
</script>