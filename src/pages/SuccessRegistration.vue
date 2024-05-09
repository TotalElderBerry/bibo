<template>
    <div>
        <div class="mt-10 bg-green-200 w-3/4 mx-auto p-10 rounded-lg text-center">
            <div class="text-3xl text-gray-800 font-medium flex justify-center gap-2">
                <CheckBadgeIcon class="w-7 text-tertiary-900"/>
                <h1>
                    {{event.name}}
                </h1>
                <CheckBadgeIcon class="w-7 text-tertiary-900"/>
            </div>
            <hr class="my-5 border border-white"/>
            <div>
                <p>Thank you for registering for {{event.name}}. See you on January 24,2020</p>
            </div>

            <div class="text-xs font-light mt-4">
                <p>For any inquiries, please contact bibo@gmail.com</p>
            </div>

            <div class="mt-10">
                <a href="/events" class="text-white bg-tertiary-700 hover:bg-tertiary-800 focus:ring-4 focus:ring-tertiary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Back to Events
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CheckBadgeIcon } from '@heroicons/vue/24/solid';
import axios from 'axios';
import {ref,onMounted} from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const event = ref({})
const getEventBySlug = async () => {
    const eventSlug = route.params.id
    try {
        const response = await axios.get(`http://localhost:5000/event/slug/${route.params.id}`)
        // console.log(response.data);
        event.value = response.data[1].data
    } catch (error) {
        console.log(error);
    }
}

onMounted(async() => {
    await getEventBySlug()
})

</script>