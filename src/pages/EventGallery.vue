<template>
    <div class="px-4 max-w-screen-xl mx-auto">
        <div class="pt-10">
            <div class="flex items-center justify-between">
                <div class="ml-3">
                    <h3 class="text-3xl">{{ eventname.name }}</h3>
                    <h5 class="text-primary">Event Date: {{getReadableDate(eventname.date)}}</h5>
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
                            <input v-model="query"type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-tertiary-500 focus:border-tertiary-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Bib Number..." required />
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
                
            <div v-for="album in albumPhotog" class="my-5 bg-tertiary-50 p-5">
                <h5 class="text-tertiary-800 text-lg">Album By <span class="font-bold">{{album.photographer.alias}}</span></h5>
                <h5 class="text-xs my-2">{{ album.images.length }} out of {{ album.album.number_of_uploads }} photos</h5>
                    <div class="grid grid-cols-7 gap-4 my-5">
                        <div @click="getSelectedImage(fname.path, fname.filename)" v-for="fname,index in album.images" :key="index" class="cursor-pointer thumbnail-container max-h-[100px]" data-modal-target="default-modal" data-modal-toggle="default-modal">
                            <img :src="getPhotoUrl(fname.path, fname.filename)" class="thumbnail rounded-md" />
                            {{fname}}
                        </div>
                    </div>
                </div>
            </div>
        <ImageModal :eventInfo="eventname" :img="selectedImg"/>
</div>
<!-- Main modal -->

</template>

<script setup>
import ImageModal from '../components/ImageModal.vue';
import { useRoute, useRouter } from 'vue-router';
import { getReadableDate } from '../utils/date';
import { Modal } from 'flowbite';
const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const filenames = ref("")
const query = ref("")
const eventname = ref("")
const selectedImg = ref("")
const albums = ref([])

const albumPhotog = ref([])
import axios from 'axios'
import {onMounted,ref} from 'vue'

const getSelectedImage = (path,img) => {
    selectedImg.value = getPhotoUrl(path,img)
    const $targetEl = document.getElementById('default-modal');
    const modal = new Modal($targetEl)
    modal.show()
}

const fetchImages = async (foldername, query, p_id) => {
    try {
        if(p_id){
            const {data} = await axios.get(`http://127.0.0.1:5000/upload?slug=${foldername}&query=${query}&photog_id=${p_id}`);
            return data.data
        }else{
            const {data} = await axios.get(`http://127.0.0.1:5000/upload?slug=${foldername}&query=${query}`);
            return data.data
        }
    } catch (error) {
        console.log(error);
        toast.error('An error occurred. Please try again later.');
    }
}

const getEventBySlug = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/event/slug/${route.query.event}`);
        return response.data[1].data
    } catch (error) {
        console.log(error);
        // toast.error('An error occurred. Please try again later.');
    }
}

const getPhotoUrl = (path,url) => {
    const event = route.query.event
    return `http://localhost:5000/static/gallery/${path}/${url}`
}

const getPhotographerById = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/photographer/${id}`);
        return response.data[1].data
    } catch (error) {
        
    }
}

const getAlbums = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/upload/uploader?event_id=${eventname.value.id}`);
        return response.data.data
    } catch (error) {
        
    }
}

onMounted(async () => {
    isLoading.value = true
    const event = route.query.event
    if(event === ''){
        // toast.error("Must specify event name")
        return
    }
    try {
        eventname.value = await getEventBySlug()
        console.log(eventname.value);
        albums.value = await getAlbums()

        for(const albumIdx in albums.value){
            const albumImages = await fetchImages(route.query.event,query.value,albums.value[albumIdx].photographer_id)
            const photographer = await getPhotographerById(albums.value[albumIdx].photographer_id)
            const toShow = {album: albums.value[albumIdx], images:albumImages, photographer: photographer}
            albumPhotog.value.push(toShow)
        }
        isLoading.value = false
    } catch (error) {
        console.log(error);
        isLoading.value = false
    }
    
})

const submitQuery = async () => {
    const event = route.query.event
    isLoading.value = true
    const hashmap = new Map();

    try {
        const filename = await fetchImages(event,query.value)
        for(const fileIdx in filename){
            const id = filename[fileIdx].path.split("\\")[1]
            if (hashmap.has(id)) {
                // If the ID exists, push the filename to the existing array
                const existingFilenames = hashmap.get(id);
                existingFilenames.push(filename[fileIdx]);
                hashmap.set(id, existingFilenames);
            } else {
                // If the ID does not exist, create a new array with the filename
                hashmap.set(id, [filename[fileIdx]]);
            }
        }

        for(const albumIdx in albumPhotog.value){
            const id = albumPhotog.value[albumIdx].album.photographer_id
            console.log(id);
            console.log(hashmap.has(id.toString()));
            if(hashmap.has(id.toString())){
                albumPhotog.value[albumIdx].images = hashmap.get(id.toString())
            }else{
                albumPhotog.value[albumIdx].images = []
            }
        }
        isLoading.value = false
    } catch (error) {
        isLoading.value = false
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