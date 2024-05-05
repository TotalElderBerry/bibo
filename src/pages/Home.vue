<template>
    <div class="max-w-screen-xl mx-auto mb-5">
        <div class="bg-tertiary-50 text-center py-20 ">
            <h3 class="text-4xl tracking-tight  text-color font-display">Find Your Photos</h3>
            <div></div>
            
            <form class="max-w-lg mx-auto my-10">
                <div class="flex">
                    <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                    <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-tertiary-700 border border-gray-300 rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg></button>
                    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                        <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Events</button>
                        </li>
                        <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Photographers</button>
                        </li>
                        
                        </ul>
                    </div>
                    <div class="relative w-full">
                        <input v-model="query" type="search" id="search-dropdown" class=" block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300" placeholder="Search..." required />
                        <button @click.prevent="search" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-tertiary-700 rounded-e-lg border  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div class="flex flex-col items-center justify-center gap-2 mt-4">
            <a v-for="event in events" class="w-[450px] rounded-sm    cursor-pointer grid grid-cols-5 border border-tertiary-500" :href="`/gallery?event=${event.slug}`">
                <div class="text-center text-white bg-tertiary-800 p-2 font-semibold">
                    <h1 class="text-xl">{{formatDate(event.date).month}}</h1>
                    <h1 class="">{{formatDate(event.date).date}}</h1>
                </div>
                <div class="col-span-4 bg-white py-2 px-3 hover:bg-tertiary-100">
                    <h1 class="text-xl font-bold text-gray-600">{{event.name}}</h1>
                    <h1 class="text-xs mt-1  font-light">{{event.venue}}</h1>
                </div>
            </a>

            <!-- <div class="w-[500px] p-5 rounded-xl  bg-tertiary-100 cursor-pointer">
                <h1 class="text-xl font-bold text-gray-700">Sm2Sm Run 2024</h1>
                <h1 class="text-sm">January 24,2023</h1>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue'
import { getReadableDate } from '../utils/date';
const query = ref("")
const events = ref([])
const getEvents = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/event?q=${query.value}`)
        events.value = response.data[1].data
    } catch (error) {
        console.log(error);
    }
}

const search = async () => {
    await getEvents()
}

function formatDate(inputDateStr) {
    // Parse the input date string
    var inputDate = new Date(inputDateStr);

    // Get the month and date components
    var month = inputDate.toLocaleDateString('en-US', { month: 'short' });
    var date = inputDate.getDate();

    // Create and return the formatted date object
    var formattedDateObject = { month: month, date: date };
    return formattedDateObject;
}
</script>