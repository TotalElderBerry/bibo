<template>
    <div class="mt-10 text-center">
        <div class="my-10 flex flex-col gap-5 justify-center h-[400px]  bg-tertiary-50">
            <div class="w-2/3 mx-auto">
                <h1 class="font-semibold text-tertiary-600">For Organizers</h1>
                <h1 class="text-5xl  my-5 text-gray-800 leading-snug">Experience <span class="font-semibold text-tertiary-500">Excellence</span>: Your <span class="font-semibold text-tertiary-500">Trusted Event Organizing Partner.</span></h1>
                <div>
                    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" type="button" class="shadow-xl text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Register</button>
                    <button data-modal-target="login-modal" data-modal-toggle="login-modal" type="button" class="shadow-xl text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
                </div>
            </div>
        </div>
    </div>
    <section class="max-w-screen-xl mx-auto">
        <h1 class="text-2xl text-tertiary-700 ">Notable Organizers</h1>
        <div class="my-5">
            <img src="../assets/csps.png" width="150"/>
        </div>
    </section>
    <RegisterOrgModal :registerForm="registerForm"  @registerEvent="registerAsync"/>
    <LoginOrgModal />
</template>

<script setup>
import RegisterOrgModal from '../components/RegisterOrgModal.vue';
import LoginOrgModal from '../components/LoginOrgModal.vue';
import {ref} from 'vue'
import axios from 'axios';
const registerForm = ref({
    name: '',
    email: '',
    password: ''
})

const loginForm = ref({
    name: '',
    alias: '',
    email: '',
    password: ''
})

const registerAsync = async () => {
    try {
        const form = new FormData()
        form.append('name', registerForm.value.name)
        form.append('email', registerForm.value.email)
        form.append('password', registerForm.value.password)
                
        const response = await axios.post('http://localhost:5000/event_organizer/register',form, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    } catch (error) {
        console.log(error);
    }
}
</script>