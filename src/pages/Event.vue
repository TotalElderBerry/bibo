<template>
    <div class="max-w-screen-xl p-4 mx-auto " v-if="!isLoading">
        <div class=" relative flex justify-center mb-10 bg-tertiary-200 p-10 rounded-xl">
            <div class="absolute inset-0  flex bg-red-300 rounded-xl">
                <img  src="../assets/runningman.jpg" class="max-h-full rounded-xl w-full object-cover bg-center">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-tertiary-900 to-tertiary-300 opacity-70 rounded-xl"></div>

            <div class="text-white px-10 py-2 rounded-md relative">
                <h1 class="mb-5 text-center font-black text-3xl">Countdown</h1>
                <div class="flex gap-3">
                    <div class="text-center w-20">
                        <h1 class="bg-tertiary-800 text-white rounded-md h-10 flex items-center justify-center text-3xl font-bold">{{months}}</h1>
                        <h1 class="text-sm mt-2 font-bold">Months</h1>
                    </div>
                    <div class="text-center w-20">
                        <h1 class="bg-tertiary-800 text-white rounded-md h-10 flex items-center justify-center text-3xl font-bold">{{days}}</h1>
                        <h1 class="text-sm mt-2 font-bold">Days</h1>
                    </div>
                    <div class="text-center w-20">
                        <h1 class="bg-tertiary-800 text-white rounded-md h-10 flex items-center justify-center text-3xl font-bold">{{ hours }}</h1>
                        <h1 class="text-sm mt-2 font-bold">Hrs</h1>
                    </div>
                    <div class="text-center w-20">
                        <h1 class="bg-tertiary-800 text-white rounded-md h-10 flex items-center justify-center text-3xl font-bold">{{ minutes }}</h1>
                        <h1 class="text-sm mt-2 font-bold">Min</h1>
                    </div>
                    <div class="text-center w-20">
                        <h1 class="bg-tertiary-800 text-white rounded-md h-10 flex items-center justify-center text-3xl font-bold">{{ seconds }}</h1>
                        <h1 class="text-sm mt-2">Secs</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-3">
            <div class="items-center ">
                <div class="h-[260px] max-w-sm p-6 bg-tertiary-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex justify-between">
                        <div>
                        <h5 class="text-md font-medium tracking-tight text-tertiary-800 dark:text-white mt-2">EVENT</h5>
                        <h5 class="mb-1 text-2xl font-semibold tracking-tight text-gray-800 dark:text-white mt-2">{{event.name}}</h5>
                        <a href="#">
                            <div class="flex items-center gap-2">
                                <div class="flex items-center gap-1 mb-4">
                                    <MapPinIcon class="text-tertiary-500 w-5"/>
                                    <h5 class=" text-xs font-medium tracking-tight text-gray-700 dark:text-white">{{ event.venue }}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="mt-2">
                        <div class="flex-col rounded-md inline-flex bg-tertiary-600 border">
                            <div>
                                <p class="font-bold py-1 px-3 text-lg text-white">{{formatDate(event.date).month}}</p>
                            </div>
                            <div class="bg-white text-center">
                                <p>{{formatDate(event.date).date}}</p>
                            </div>
                        </div>
                    </div>
                    </div>     
                    <div class="mt-2 gap-2 flex flex-col gap-2">
                    <div class="">
                        <p class="inline-flex justify-center items-center px-2 py-1 text-xs font-medium text-center text-white bg-tertiary-700 rounded-lg hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-tertiary-300 dark:bg-tertiary-600 dark:hover:bg-tertiary-700 dark:focus:ring-tertiary-800">5km - 100 Pesos</p>
                    </div>

                    <div class="">
                        <p class="inline-flex justify-center items-center px-2 py-1 text-xs font-medium text-center text-white bg-tertiary-700 rounded-lg hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-tertiary-300 dark:bg-tertiary-600 dark:hover:bg-tertiary-700 dark:focus:ring-tertiary-800">10km - 200 Pesos</p>
                    </div>

                    <div class="">
                        <p class="inline-flex justify-center items-center px-2 py-1 text-xs font-medium text-center text-white bg-tertiary-700 rounded-lg hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-tertiary-300 dark:bg-tertiary-600 dark:hover:bg-tertiary-700 dark:focus:ring-tertiary-800">21km - 500 Pesos</p>
                    </div>
                </div>   
                
            </div>
            <div class="mt-2 bg-white border border-gray-200 rounded-lg shadow  max-w-sm p-6">
                <h1 class="font-bold">
                    Payment Details
                </h1>
                <div class="mt-2">
                    <p class="text-sm">
                        Gcash - 09154516111
                    </p>
                    <p class="text-sm">
                        Chinabank - 09154516111
                    </p>
                </div>
                <hr class="my-3"/>
                <p class="text-xs">Please send your receipt to bibo@gmail.com</p>
            </div>
        </div>

            
            <div class="col-span-2">
                <div class="space-y-4 max-w-[600px] mx-auto border p-5 rounded-md" >
                    <h1 class="font-bold text-lg">Registration</h1>
                        <div>
                            <label for="myname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input disabled v-model="runner.first_name"  type="text" name="myname" id="myname" class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 bg-tertiary-50 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Your Name"  />
                        </div>
                        <div>
                            <label for="myname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input disabled v-model="runner.last_name" type="text" name="myname" id="myname" class="bg-tertiary-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Your Name"  />
                        </div>
                        <div>
                            <label for="alias" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Address</label>
                            <input  type="text" name="alias" id="myname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="IPI Housing"  />
                        </div>
                        <label for="myname" class="block  text-sm font-medium text-gray-900 dark:text-white">Size</label>

                        <div class="flex items-center gap-4">
                            <div class="flex items-center ">
                                <input checked id="size-radio" type="radio" value="" name="size-radio" class="w-4 h-4 text-tertiary-600 bg-gray-100 border-gray-300 focus:ring-tertiary-500 dark:focus:ring-tertiary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="size-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Small</label>
                            </div>

                            <div class="flex items-center ">
                                <input id="size-radio" type="radio" value="" name="size-radio" class="w-4 h-4 text-tertiary-600 bg-gray-100 border-gray-300 focus:ring-tertiary-500 dark:focus:ring-tertiary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="size-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medium</label>
                            </div>

                            <div class="flex items-center ">
                                <input id="size-radio" type="radio" value="" name="size-radio" class="w-4 h-4 text-tertiary-600 bg-gray-100 border-gray-300 focus:ring-tertiary-500 dark:focus:ring-tertiary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="size-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Large</label>
                            </div>
                        
                        </div>
                        <label for="myname" class="block  text-sm font-medium text-gray-900 dark:text-white">Categories</label>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center ">
                            <input v-model="category" checked id="default-radio-1" type="radio" value="5 km" name="default-radio" class="w-4 h-4 text-tertiary-600 bg-gray-100 border-gray-300 focus:ring-tertiary-500 dark:focus:ring-tertiary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">5km</label>
                        </div>
                        <div class="flex items-center">
                            <input v-model="category"  id="default-radio-2" type="radio" value="10 km" name="default-radio" class="w-4 h-4 text-tertiary-600 bg-gray-100 border-gray-300 focus:ring-tertiary-500 dark:focus:ring-tertiary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">10km</label>
                        </div>
                        <div class="flex items-center">
                            <input v-model="category"  id="default-radio-2" type="radio" value="21 km" name="default-radio" class="w-4 h-4 text-tertiary-600 bg-gray-100 border-gray-300 focus:ring-tertiary-500 dark:focus:ring-tertiary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">21km</label>
                        </div>
                    </div>
                        
                        <button @click="openModal"  class="w-full text-white bg-tertiary-700 hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                    </div>
            </div>
        </div>
    </div>
    <RegConfirmationModal @register="registerEvent"/>
</template>

<script setup>
import { CalendarDaysIcon,MapPinIcon } from '@heroicons/vue/24/solid';
import axios from 'axios'
import {ref,onMounted, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { get } from '../utils/localstorage';
import RegConfirmationModal from '../components/RegConfirmationModal.vue';
import { Modal } from 'flowbite';
const route = useRoute()
const router = useRouter()
const event = ref({})
const runner = ref({
    first_name: '',
    last_name: ''
})

const isLoading = ref(true)
const category = ref('5 km')
const months = ref()
const days = ref()
const hours = ref()
const minutes = ref()
const seconds = ref()

const openModal = (slug) => {
    const $targetEl = document.getElementById('confirm-modal');
    const modal = new Modal($targetEl)
    modal.show()
}

const getEventBySlug = async () => {
    isLoading.value = true
    const eventSlug = route.params.id
    try {
        const response = await axios.get(`http://localhost:5000/event/slug/${eventSlug}`)
        // console.log(response.data);
        event.value = response.data[1].data
        isLoading.value = false
    } catch (error) {
        isLoading.value = false
        console.log(error);
    }
}

const getRunnerById = async () => {
    const id = get('runner_id')
    console.log(id);
    try {
        const response = await axios.get(`http://localhost:5000/runner/one/${id}`)
        // console.log(response.data[1].data);
        runner.value = response.data[1].data
    } catch (error) {
        
    }
}

const registerEvent = async () => {
    const id = get('runner_id')
    try {
        const form = new FormData()
        form.append('category',category.value)
        const response = await axios.post(`http://localhost:5000/runner/${id}/register_event/${event.value.id}`, form)
        console.log(response.data);
        if(response.data.success){
            router.push({name: 'RegistrationSuccess', params: {id: event.value.slug}})
            const $targetEl = document.getElementById('confirm-modal');
            const modal = new Modal($targetEl)
            modal.hide()
        }
    } catch (error) {
        console.log(error);
    }
}

const updateCountdown = () => {
      const now = new Date();
      const to = new Date(event.value.date)
      const difference = to - now;
      if (difference > 0) {
        const oneMinute = 60 * 1000;
        const oneHour = oneMinute * 60;
        const oneDay = oneHour * 24;
        const oneMonth = oneDay * 30; // Approximation
        const oneSecond = 1000
        months.value = Math.floor(difference / oneMonth);
        days.value = Math.floor((difference % oneMonth) / oneDay);
        hours.value = Math.floor((difference % oneDay) / oneHour);
        minutes.value = Math.floor((difference % oneHour) / oneMinute);
        seconds.value = Math.floor((difference % oneMinute) / oneSecond);
      } else {
        clearInterval(1000);
      }
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

watch(seconds, () => {
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
})

onMounted(async() => {
    await getEventBySlug()
    await getRunnerById()
    updateCountdown()
})

</script>