<template>
    <div class="mt-10 max-w-screen-xl mx-auto flex flex-col h-screen">
        <div class="flex items-center justify-between mb-5 ">
            <div>
                <h1 class="text-2xl font-semibold text-tertiary-800 ml-4">Your Events</h1>
            </div>
            <div class="flex gap-5">
                <div class="">
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
                        
                    </form>
                </div>

                <button type="button" class="shadow-xl px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-tertiary-700 hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" data-modal-target="create-event-modal" data-modal-toggle="create-event-modal">
                    <PlusCircleIcon class="w-5 mr-2"/>
                    Add an Event
                </button>
            </div>
        </div>

        <div  class="p-4 rounded-lg flex-grow mb-5">
            <div class="bg-tertiary-50 p-2 grid grid-cols-3 place-items-center mb-4">
                <div class="text-center">
                    <h1 class=" text-tertiary-700 font-semibold">Event Name</h1>
                    <h1 class=" text-xs">(Event Date)</h1>
                </div>

                <div class="">
                    <h1 class="text-tertiary-700 font-semibold">Date Created</h1>
                </div>
                
                <div class="">
                    <h1 class="text-tertiary-700 font-semibold">Actions</h1>
                </div>
            </div>
            <div v-for="e in events" class="bg-tertiary-50 p-4 grid grid-cols-3 place-items-center border-b-2 border-tertiary-300">
                <div class="text-center">
                    <a :href="`/organizer/event/1`" class="text-lg text-tertiary-700 font-semibold cursor-pointer hover:underline">{{e.name}}</a>
                    <h1 class="text-xs mt-1 font-light">{{getReadableDate(e.date)}} </h1>
                </div>

                <div class="">
                    <h1 class="text-lg">{{getReadableDate(e.datetime_created)}}</h1>
                </div>

                <div class="flex gap-2 text-tertiary-800">
                    <PencilSquareIcon class="w-6 cursor-pointer"/>
                    <CameraIcon class="w-6 cursor-pointer"/>
                    <TrashIcon class="text-red-500 w-6 cursor-pointer"/>
                </div>
            </div>
        </div>
        <CreateEventModal :event="event" @submitEvent="submitEvent"/>
    </div>
</template>


<script setup>
import { PencilSquareIcon, CameraIcon, TrashIcon, PlusCircleIcon } from '@heroicons/vue/24/solid';
import CreateEventModal from '../components/CreateEventModal.vue';
import {onMounted, ref} from 'vue'
import axios from 'axios'
import {getReadableDate} from '../utils/date'
const event = ref({
    name: '',
    venue: '',
    date: '',
    datetime_created: ''
})

const events = ref([])

onMounted(async() => {
    try {
        await getEvents()
    } catch (error) {
        
    }
})

const submitEvent = async () => {
    try {
        await submitEventAsync()
        // Create a new Date object
        const currentDate = new Date();

        // Get the current date components
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = currentDate.getDate();

        // Format the date as desired
        const formattedDate = year + "-" + month + "-" + day;
        event.value.datetime_created = formattedDate
        events.value.push(event.value)
    } catch (error) {
        
    }
}

const submitEventAsync = async () => {
    try {
        const form = new FormData()
        form.append('name', event.value.name)
        form.append('venue', event.value.venue)
        form.append('date', event.value.date)
        form.append('time_start', '')
        form.append('time_end', '')
        form.append('short_description', '')
        form.append('no_of_participants', 0)
        form.append('price', 0)
        
        console.log(event.value.date);
        const response = axios.post('http://localhost:5000/event/1/create_event',form, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    } catch (error) {
        console.log(error);
    }
}

const getEvents = async () => {
    try {
        const response = await axios.get('http://localhost:5000/event/1')
        // console.log(response.data);
        events.value = response.data[1].data
        console.log(response.data[1]);
    } catch (error) {
        console.log(error);
    }
}
</script>