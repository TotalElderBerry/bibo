<template>
<div class="max-w-screen-xl mx-auto mt-10" >
    <div class="flex items-center justify-between mb-8">
        
        <div>
            <div>
                <h5 class="mb-[-5px] text-xs font-bold text-tertiary-900">Event</h5>
                <h5 class="text-4xl mb-1">{{event.name}}</h5>
            </div>
            <h5 class="text-sm font-light">{{getReadableDate(event.date)}} - {{event.venue}}</h5>
        </div>
        <div>
                    <form class="flex items-center max-w-sm mx-auto">   
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                                </svg>
                            </div>
                            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Runner..." required />
                        </div>
                        <button @click.prevent="submitQuery" class="p-2.5 ms-2 text-sm font-medium text-white bg-tertiary-700 rounded-lg border hover:bg-tertiary-500 focus:ring-4 focus:outline-none focus:ring-tertiary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </form>
                </div>
    </div>
    <div class="mb-10 flex items-center gap-2">
        <button id="" data-dropdown-toggle="dropdown" class="text-white bg-tertiary-700 hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-tertiary-300 font-medium rounded-lg text-sm px-3.5 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{{filterOption}} <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
        </button>

        <!-- Dropdown menu -->
        <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
                <a @click="() => filterOption = 'Accepted'"  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Accepted</a>
            </li>
            <li>
                <a @click="() => filterOption = 'Pending'"  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pending</a>
            </li>
            
            </ul>
        </div>
        <div>
        </div>

        <div class="flex items-end gap-2">
            <button
                class="relative grid select-none items-center whitespace-nowrap rounded-lg cursor-pointer py-1.5 px-3 font-sans text-xs font-bold uppercase text-white" :class="categoryOption == '5 km'?'bg-tertiary-500':'bg-gray-500'"
                @click="() => categoryOption = '5 km'"
                >
                5km
            </button>
            <button
                class="relative grid select-none items-center whitespace-nowrap rounded-lg cursor-pointer py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                :class="categoryOption === '10 km'?'bg-tertiary-500':'bg-gray-500'"
                @click="() => categoryOption = '10 km'"
                >
                
                10km
            </button>
            <button
                class="relative grid select-none items-center whitespace-nowrap rounded-lg cursor-pointer py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                :class="categoryOption == '21 km'?'bg-tertiary-500':'bg-gray-500'"
                @click="() => categoryOption = '21 km'"
                >
                21km
            </button>
        </div>
    </div>



    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-tertiary-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Runner name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Size
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3" v-if="filterOption === 'Pending'">
                        Action
                    </th>
                    <th scope="col" class="px-6 py-3" v-if="filterOption === 'Accepted'">
                        Bib Number
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" v-for="runner in runners">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ runner.first_name }} {{ runner.last_name }}
                    </th>
                    <td class="px-6 py-4">
                        Medium
                    </td>
                    <td class="px-6 py-4">
                        {{runner.category.trim()}}
                    </td>
                    <td class="px-6 py-4">
                        500
                    </td>
                    <td v-if="filterOption === 'Pending'" class="px-6 py-4 gap-2 flex">
                        <button data-modal-target="default-modal" data-modal-toggle="default-modal" @click="() => openModal(runner)" class="font-medium text-tertiary-600 dark:text-blue-500 hover:underline">Accept</button>
                        <button href="#" class="font-medium text-red-600 dark:text-blue-500 hover:underline">Reject</button>
                    </td>
                    <td class="px-6 py-4" v-if="filterOption === 'Accepted'">
                        {{runner.bib_no}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Main modal -->
<div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Accept Runner
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
                
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    WARNING: This cannot be undone
                </p>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" class="text-white bg-tertiary-700 hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-tertiary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="approveRunner">
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="isRegisteringLoading">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" v-if="isRegisteringLoading"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" v-if="isRegisteringLoading"/>
                    </svg>
                    {{isRegisteringLoading?'Loading':'Confirm'}}
                
                </button>
                <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue'
import { useRoute } from 'vue-router';
import axios from 'axios'
import { getReadableDate } from '../utils/date';
import { Modal } from 'flowbite';
const filterOption = ref('Pending')
const categoryOption = ref('5 km')
const event = ref({})
const route = useRoute()
const isLoading = ref(false)
const runners = ref([])
const selectedRunner = ref({})
const isRegisteringLoading = ref(false)
const approveRunner = async () => {
    isRegisteringLoading.value = true
    try {
        console.log(selectedRunner.value.id);
        console.log(event.value.id);
        const response = await axios.post(`http://localhost:5000/event_organizer/${event.value.id}/${selectedRunner.value.id}/approve_reg`)
        const $targetEl = document.getElementById('default-modal');
        const modal = new Modal($targetEl)
        if(response.data.success){
            runners.value = runners.value.filter(runner => runner.id !== selectedRunner.value.id)
        }
        modal.hide()
        isRegisteringLoading.value = false
    } catch (error) {
        console.log(error);
        isRegisteringLoading.value = false
    }
}

const openModal = (runner) => {
    const $targetEl = document.getElementById('default-modal');
    const modal = new Modal($targetEl)
    modal.show()
    selectedRunner.value = runner
}

const openFilterModal = () => {
    const $targetEl = document.getElementById('dropdown');
    const modal = new Modal($targetEl)
    modal.show()
}


const getEventBySlug = async () => {
    const eventSlug = route.params.slug
    try {
        const response = await axios.get(`http://localhost:5000/event/slug/${eventSlug}`)
        event.value = response.data[1].data
    } catch (error) {
        console.log(error);
    }
}

const getRunners = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/runner/${event.value.id}?status=${filterOption.value}`)
        runners.value = response.data[1].data
    } catch (error) {
        console.log(error);
    }
}

watch(filterOption, async() => {
    await getRunners()
})

onMounted(async() => {
    isLoading.value = true
    try {
        await getEventBySlug()
        await getRunners()
        isLoading.value = false
    } catch (error) {
        isLoading.value = false
    }
})
</script>