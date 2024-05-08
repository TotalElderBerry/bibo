<template>
    <div class="max-w-screen-xl mx-auto mt-5 px-4">
        <div class="mb-8">
            <div>
                <h5 class="mb-[-5px] text-xs font-bold text-tertiary-900">Event</h5>
                <h5 class="text-4xl mb-1">{{event.name}}</h5>
            </div>
            <h5 class="text-sm font-light">{{getReadableDate(event.date)}} - {{event.venue}}</h5>
        </div>

        <div class="mt-1 bg-tertiary-50 p-3 rounded-lg ">
            <h1 class="text-xl my-1 font-semibold text-tertiary-700">Event Details</h1>
            <div class="grid grid-cols-3 gap-2">
                <div class="bg-white rounded-lg p-4">
                    <h1 class="text-gray-400">Organizer</h1>
                    <h1 class="text-2xl font-bold">{{eventorg.name}}</h1>
                    <h1 class="text-xs font-light">{{eventorg.email}}</h1>
                </div>

                <div class="bg-white rounded-lg p-4">
                    <h1 class="text-gray-400 mb-2">Event Created </h1>
                    <h1 class="text-2xl font-medium">{{getReadableDate(event.datetime_created)}}</h1>
                </div>

                <div class="bg-white rounded-lg p-4">
                    <h1 class="text-gray-400 mb-1">No. of Albums Uploaded </h1>
                    <h1 class="text-3xl font-medium">1</h1>
                </div>
            </div>
        </div>

        <div class="mt-10 px-4 flex justify-between">
            <h1 class="text-xl font-medium text-tertiary-700">Your Photos <span class="text-gray-400 text-sm font-light">(0 images uploaded)</span></h1>
            <input id="file-upload" type="file" accept="image/*" multiple style="display: none;" @change="uploadFiles"/>
            <!-- Button to trigger file selection -->
            <label for="file-upload" class="drop-shadow-2xl flex gap-3 items-center cursor-pointer px-3 py-2 text-xs font-medium text-center text-white bg-tertiary-700 rounded-lg hover:bg-tertiary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <ArrowUpOnSquareIcon class="w-6"/>
                <h1>Upload</h1>
            </label>
        </div>
        <div class="mx-4 grid grid-cols-6 gap-4 my-5">
            <div @click="() => getSelectedImage(fname.path, fname.filename)" v-for="fname in images" class="cursor-pointer thumbnail-container">
                <img :src="getPhotoUrl(fname.path, fname.filename)" class="thumbnail rounded-md" />
                a
            </div>
        </div>
    </div>

    <div id="toast-default" class="right-5 bottom-5 fixed flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert" v-if="isUploadingImage">
        <svg aria-hidden="true" role="status" class="inline w-6 h-6 me-3 text-blue animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
        <div class="ms-3 text-md font-normal">Uploading your Images...</div>
        <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>
</template>

<script setup>
import { ArrowUpOnSquareIcon, PhotoIcon } from '@heroicons/vue/24/solid';
import {ref,onMounted} from 'vue'
import { useRoute } from 'vue-router';
import { getReadableDate } from '../utils/date';
import { get } from '../utils/localstorage';
import axios from 'axios'
const route = useRoute()
const event = ref({})
const eventorg = ref({})
const images = ref([])
const photog_id = get('photog_id')
const selectedImg = ref('')
const isUploadingImage = ref(false)
onMounted(async()=>{
    try {
        await getEventBySlug()
        await getEventOrgById()
        const imgs = await fetchImages(event.value.slug,'')
        images.value = imgs
    } catch (error) {
        
    }
})

const getSelectedImage = (path,img) => {
    selectedImg.value = getPhotoUrl(path,img)
}

const getPhotoUrl = (path,img) => {
    return `http://localhost:5000/static/gallery/${path}/${img}`
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

const getEventOrgById = async () => {
    const eventOrgId = event.value.event_organizer_id
    try {
        const response = await axios.get(`http://localhost:5000/event_organizer/${eventOrgId}`)
        // console.log(response.data);
        eventorg.value = response.data[1].data
    } catch (error) {
        console.log(error);
    }
}

const uploadFiles = async (event_input) => {
    isUploadingImage.value = true
    let formData = new FormData();
    let files = event_input.target.files;
    for(let i=0; i<files.length; i++) {
        formData.append('files[]', files[i]);
    }
    try {
        const {data} = await axios.post(`http://127.0.0.1:5000/upload?slug=${event.value.slug}&photog_id=${photog_id}&event_id=${event.value.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if(data){
            images.value = await fetchImages(event.value.slug,'');
        }
        isUploadingImage.value = false
    } catch (error) {
        console.log(error);
        isUploadingImage.value = false
    }
}


const fetchImages = async (foldername, query) => {
    try {
        const {data} = await axios.get(`http://127.0.0.1:5000/upload?slug=${foldername}&photog_id=${photog_id}&query=${query}`);
        return data.data
    } catch (error) {
        console.log(error);
        toast.error('No folder');
    }
}
</script>

<style>
/* Custom CSS */
.thumbnail-container {
    position: relative;
    width: 100%;
    padding-top: 100%; /* Maintain a 1:1 aspect ratio */
    overflow: hidden;
}

.thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}

</style>