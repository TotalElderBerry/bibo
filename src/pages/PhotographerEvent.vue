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
    } catch (error) {
        console.log(error);
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