<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900 mt-2 max-w-screen-xl mx-auto">
    <div class="flex flex-wrap items-center justify-between mx-auto ">
        <a href="/" class="flex items-center">
            <img src="../assets/v2.png" class="h-20" alt="Logo" />
            <img src="../assets/logo.png" class="h-20 ml-[-25px]" alt="Logo" />
            <!-- <span class="self-center text-2xl font-bold whitespace-nowrap dark:text-white">BIB-O</span> -->
        </a>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul v-if="route.name === 'Home' || route.name === 'Photographers' || route.name === 'Organizers' || route.name === 'Gallery' " class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
            <a href="/events" class="block py-2 px-3 text-white bg-tertiary-700 rounded md:bg-transparent md:text-tertiary-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">EVENTS</a>
            </li>
            <li>
            <a :href="store.isEventOrgLoggedIn?'/organizer':'/organizers'" class="block py-2 px-3 text-white bg-tertiary-700 rounded md:bg-transparent md:text-tertiary-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">ORGANIZERS</a>
            </li>
            <li>
            <a :href="store.isPhotographerLoggedIn?'/photographer/home':'/photographers'" class="block py-2 px-3 text-white bg-tertiary-700 rounded md:bg-transparent md:text-tertiary-700 md:p-0 dark:text-white md:dark:text-blue-500">BE A BIB-O PHOTOGRAPHER</a>
            </li>
            <li>
            <a href="/" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">FIND YOUR PHOTOS</a>
            </li>
        </ul>

        <ul v-if="route.name === 'Photographer' || route.name === 'PhotographerEvent'" class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
            <a href="/photographer/home" class="block py-2 px-3 text-white bg-tertiary-700 rounded md:bg-transparent md:text-tertiary-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">HOME</a>
            </li>
            <li>
            <a href="#" class="block py-2 px-3 text-white bg-tertiary-700 rounded md:bg-transparent md:text-tertiary-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">YOUR GALLERY</a>
            </li>      
        </ul>

        <ul v-if="route.name === 'Organizer' || route.name === 'OrganizerEvent'" class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
            <a href="/organizer" class="block py-2 px-3 text-white bg-tertiary-700 rounded md:bg-transparent md:text-tertiary-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">YOUR EVENTS</a>
            </li>
            <li>
            <a href="#" class="block py-2 px-3 text-white bg-tertiary-700 rounded md:bg-transparent md:text-tertiary-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">LOGOUT</a>
            </li>
        </ul>

        <ul v-if="route.name === 'Events' || route.name === 'Event'" class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <div class="flex gap-5" v-if="!store.isRunnerLoggedIn">
                <li>
                    <a data-modal-target="login-modal" data-modal-toggle="login-modal" href="#" class="block py-2 px-3 text-white bg-tertiary-700 rounded md:bg-transparent md:text-tertiary-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">LOGIN</a>
                </li>
                <li>
                    <a data-modal-target="register-modal" data-modal-toggle="register-modal" href="#" class="block py-2 px-3 text-white bg-tertiary-700 rounded md:bg-transparent md:text-tertiary-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">REGISTER</a>
                </li>
            </div>
            <div class="flex gap-5" v-else>
                <li>
                    <a href="/events" class="block py-2 px-3 text-white bg-tertiary-700 rounded md:bg-transparent md:text-tertiary-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">HOME</a>
                </li>
                <li>
                    <a href="#" class="block py-2 px-3 text-white bg-tertiary-700 rounded md:bg-transparent md:text-tertiary-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">MY EVENTS</a>
                </li>
            </div>
            
        </ul>
        </div>
    </div>
    </nav>

</template>

<script setup>
import { useRoute } from 'vue-router';
import { useStore } from '../store';
const route = useRoute()
const store = useStore()
</script>