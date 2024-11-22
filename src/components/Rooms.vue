<script setup lang="ts">

import axios from "axios";
import {ref} from "vue";

const rooms = ref([]);

axios.get('http://localhost:8000/api/rooms')
    .then((response) => {
      rooms.value = response.data['data'];
    })
    .catch((error) => {
      console.log(error);
      if (error?.response?.data?.message) {
        alert(error.response.data.message)
      }
    })

const capitalize = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val.toLowerCase()).slice(1);
}
</script>

<template>
  <h1 class="mb-5">Rooms</h1>
  <router-link to="/rooms/add"
               class="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600">
    Add new room
  </router-link>
  <div class="grid grid-cols-4 gap-4 mt-5">
    <div class="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden h-50" v-for="room of rooms">
      <div class="p-4 flex flex-col justify-between h-full">
        <div>
          <h2 class="text-lg font-semibold text-gray-800" v-text="`Room #${room['id']}`"></h2>
          <p class="text-sm text-gray-600 mt-2" v-text="`Capacity: ${room['capacity']}`"></p>
          <p class="text-sm text-gray-600 mt-2" v-text="`Status: ${capitalize(room['status'])}`"></p>
          <h3 class="text-gray-600 mt-2" v-show="room['guests'].length > 0">Guests:</h3>
          <ul class="text-sm text-gray-600 mt-2">
            <li v-for="guest in room['guests']" :key="guest['id']" v-text="guest['full_name']"></li>
          </ul>
        </div>
        <div class="mt-4">
          <router-link :to="`/rooms/${room['id']}/assign-guest`"
                       class="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600">
            Assign Guest
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>