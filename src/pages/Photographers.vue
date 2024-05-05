<template>
    <div class="mt-10 grid grid-cols-2 max-w-screen-xl mx-auto">
        <div class="my-10 grid grid-cols-1 gap-4">
            <h1 class="font-semibold text-tertiary-600">For Photographers</h1>
            <h1 class="text-7xl font-semibold">Share your <span class="text-tertiary-500"> moments </span> to the world.</h1>
            <div>
                <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Join Now</button>
                <button data-modal-target="login-modal" data-modal-toggle="login-modal" type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
            </div>
        </div>

        <div class="my-10 mx-auto">
            <div class="flex gap-1 my-2">
                <div class=" h-[150px]">
                    <img src="../assets/cameraman.jpg" class="rounded-lg my-1 h-full" width="250"/>
                </div>
                <div class="h-[150px]">
                    <img src="../assets/runningman.jpg" class="rounded-lg my-1 h-full" width="350"/>
                </div>
            </div>
            <div class="flex gap-1">
                <div class="h-[200px]">
                    <img src="../assets/sm.jpg" class="rounded-lg my-1 h-full" width="150"/>
                </div>
                <div>
                    <img src="../assets/allofus.jpg" class="rounded-lg my-1" width="300"/>
                </div>
                <div class="h-[200px]">
                    <img src="../assets/milo.jpg" class="rounded-lg my-1 h-full" width="150"/>
                </div>
            </div>
        </div>
    </div>
    <RegisterPhotogModal :registerForm="registerForm" @registerEvent="registerAsync"/>
    <LoginPhotogModal :loginForm="loginForm" @loginEvent="loginAsync"/>
</template>

<script setup>
import RegisterPhotogModal from '../components/RegisterPhotogModal.vue';
import LoginPhotogModal from '../components/LoginPhotogModal.vue';
import {ref, onMounted} from 'vue'
import axios from 'axios'
import {set,get} from '../utils/localstorage'
const registerForm = ref({
    name: '',
    alias: '',
    email: '',
    password: ''
})

const loginForm = ref({
    name: '',
    alias: '',
    email: '',
    password: ''
})

const loginAsync = async () => {
    try {
        const form = new FormData()
        form.append('email', loginForm.value.email)
        form.append('password', loginForm.value.password)
                
        const response =await axios.post('http://localhost:5000/auth/photographer/login',form, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        console.log(response.data);
        const id = response.data[1].data_id
        set("photog_id",id);
    } catch (error) {
        console.log(error);
    }
}

const registerAsync = async () => {
    try {
        const form = new FormData()
        form.append('name', registerForm.value.name)
        form.append('alias', registerForm.value.alias)
        form.append('email', registerForm.value.email)
        form.append('password', registerForm.value.password)
                
        const response = await axios.post('http://localhost:5000/photographer/registration',form, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    } catch (error) {
        console.log(error);
    }
}
</script>