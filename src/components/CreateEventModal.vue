<template>
    <!-- Main modal -->
    <div id="create-event-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Create an Event
                    </h3>
                    <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="create-event-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5" v-if="step === 1">
                    <form class="space-y-4" action="#">
                        <div>
                            <label for="event-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Name</label>
                            <input v-model="event.name" @input="updateName($event.target.value)" type="text" name="event-name" id="event-name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Event Name" required />
                        </div>
                        <div>
                            <label for="event-price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Participants</label>
                            <input v-model="event.no_of_participants" @input="updateParticipants($event.target.value)" type="text" name="event-price" id="event-price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Event Name" required />
                        </div>
                        <div>
                            <label for="event-location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Location</label>
                            <input v-model="event.venue" @input="updateVenue($event.target.value)" type="text" name="event-location" id="event-location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Event Location" required />
                        </div>
                        <label for="event-date" class="block text-sm font-medium text-gray-900 dark:text-white">Event Date</label>
                        <div class="relative max-w-sm">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </div>
                            <input v-model="event.date" @input="updateDate($event.target.value)" datepicker type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
                        </div>
                        <button class="w-full text-white bg-tertiary-700 hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="()=>step=2">Next Step</button>
                    </form>
                </div>

                <div class="p-4 md:p-5" v-if="step === 2">
                    <form class="space-y-4" action="#">
                        <div class="grid grid-cols-4 gap-2" v-for="category in categories">
                            <input name="category" type="text" id="category" placeholder="5km" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" :value="category.category"/>
                            <input type="text" name="event-name" id="event-name" class="col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Price" required :value="category.price"/>
                        </div>
                        <div>
                            <button class="w-full flex items-center justify-center gap-2 text-tertiary-900 border border-tertiary-600 outline-tertiary-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <span><PlusIcon class="w-5"/> </span>
                                Add Category</button>
                        </div>
                        <button data-modal-hide="create-event-modal" @click.prevent="submitEvent" class="w-full text-white bg-tertiary-700 hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Event</button>
                    </form>
                </div>
            </div>
        </div>
    </div> 

</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid';
import { ref, defineProps } from 'vue';
const step = ref(1)
const categories = (
   [ {
        category: '5 km',
        price: 400
    },
    {
        category: '10 km',
        price: 800
    },
    {
        category: '21 km',
        price: 1000
    }]
)
// Props
const { event } = defineProps(['event']);
// Convert the v-model value to a ref
// const eventname = ref(modelValue);
const emit = defineEmits(['submitEvent'])
const updateName = (newValue) => {
    event.name = newValue;
    // emit('update:modelValue', newValue);
};

const updateDate = (newValue) => {
    event.date = newValue;
    console.log(event.date);
    // emit('update:modelValue', newValue);
};

const updateVenue = (newValue) => {
    event.venue = newValue;
    // emit('update:modelValue', newValue);
};

const updateParticipants = (newValue) => {
    event.no_of_participants = newValue
}

const submitEvent = () => {
    emit('submitEvent')
}
</script>