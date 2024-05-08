<template>
<div class="max-w-screen-xl mx-auto mt-10">

    
    <div class="mb-8">
        <div>
            <h5 class="mb-[-5px] text-xs font-bold text-tertiary-900">Event</h5>
            <h5 class="text-4xl mb-1">SM2SM Run</h5>
        </div>
        <h5 class="text-sm font-light">January 20, 2024 - Talamban</h5>
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
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Brian Keith Lisondra
                    </th>
                    <td class="px-6 py-4">
                        Medium
                    </td>
                    <td class="px-6 py-4">
                        5km
                    </td>
                    <td class="px-6 py-4">
                        500
                    </td>
                    <td class="px-6 py-4 gap-2 flex">
                        <button href="#" class="font-medium text-tertiary-600 dark:text-blue-500 hover:underline">Accept</button>
                        <button href="#" class="font-medium text-red-600 dark:text-blue-500 hover:underline">Reject</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</div>
</template>

<script setup></script>