<template>
    <!-- Main modal -->
    <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <div>
                        <h3 class="text-xl font-semibold text-tertiary-800 dark:text-white">
                            {{ props.eventInfo.name }}
                        </h3>
                        <h3 class="text-xs text-gray-900 dark:text-white">
                            By Brian Keith Lisondra
                        </h3>
                    </div>
                    
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="space-y-4 flex justify-center p-3 bg-tertiary-50">
                    <img :src="props.img" class=" max-h-[500px]"/>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="default-modal" type="button" class="flex items-center gap-2 text-white bg-tertiary-700 hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-tertiary-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-tertiary-600 dark:hover:bg-tertiary-700 dark:focus:ring-tertiary-800">
                        <ArrowDownCircleIcon class="w-5" />
                        Download</button>
                    <button data-modal-hide="default-modal" type="button" class="flex  items-center text-tertiary-500  gap-2 py-2.5 px-3 ms-3 text-sm font-medium focus:outline-none bg-white rounded-lg border border-tertiary-200 hover:bg-tertiary-100 hover:text-tertiary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        <span><GiftIcon class="w-3.5 text-tertiary-700 "/></span>
                        Make a Donation
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ArrowDownCircleIcon, GiftIcon } from '@heroicons/vue/24/solid';
const props = defineProps(['img','eventInfo'])

</script>