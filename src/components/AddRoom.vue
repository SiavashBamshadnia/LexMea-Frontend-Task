<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";

const floorNumber = ref("");
const roomNumber = ref("");
const capacity = ref(1);

const submitCreateRoomRequest = () => {
  axios.post('/api/rooms', {
    floor_number: floorNumber.value,
    room_number: roomNumber.value,
    capacity: capacity.value
  }).then(() => {
    alert('Room added successfully.');
  }).catch((error) => {
    console.log(error)
    if (error?.response?.data?.message) {
      alert(error.response.data.message)
    }
  })
}
</script>

<template>
  <button @click="$router.back()"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Go Back
  </button>

  <form class="max-w-sm mx-auto mt-5" @submit.prevent="submitCreateRoomRequest">
    <div class="mb-5">
      <label for="floor-number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Floor number
      </label>
      <input type="number" id="floor-number" v-model="floorNumber"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             required/>
    </div>
    <div class="mb-5">
      <label for="room-number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Room number
      </label>
      <input type="number" id="room-number" v-model="roomNumber"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             required/>
    </div>
    <div class="mb-5">
      <label for="capacity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Capacity
      </label>
      <input type="number" id="capacity" v-model="capacity"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             required/>
    </div>
    <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Submit
    </button>
  </form>

</template>

<style scoped>
</style>
