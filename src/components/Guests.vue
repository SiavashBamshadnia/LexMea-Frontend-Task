<script setup lang="ts">

import axios from "axios";
import {ref} from "vue";

const guests = ref([]);

axios.get('http://localhost:8000/api/guests')
    .then((response) => {
      guests.value = response.data['data'];
    })
    .catch((error) => {
      console.log(error);
      if (error?.response?.data?.message) {
        alert(error.response.data.message)
      }
    })

const deleteGuest = (id: int) => {
  if (!confirm('Are you sure you want to delete this guest?'))
    return;

  axios.delete('/api/guests/' + id).then(() => {
    let i = 0;
    for (const guest of guests.value) {
      if (guest['id'] == id) {
        guests.value.splice(i, 1);
      }
      i++;
    }
    alert('Guest deleted successfully.');
  }).catch((error) => {
    console.log(error)
    if (error?.response?.data?.message) {
      alert(error.response.data.message)
    }
  })
}
</script>

<template>
  <h1 class="mb-5">Guests</h1>
  <router-link to="/guests/add"
               class="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600">
    Add new guest
  </router-link>
  <div class="grid grid-cols-4 gap-4 mt-5">
    <div class="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden h-50" v-for="guest in guests"
         :key="guest['id']">
      <div class="p-4 flex flex-col justify-between h-full">
        <div>
          <h2 class="text-lg font-semibold text-gray-800" v-text="guest['full_name']"></h2>
          <p class="text-sm text-gray-600 mt-2" v-text="`Room #${guest['room_id']}`" v-if="guest['room_id']"></p>
        </div>
        <div class="mt-4">
          <router-link :to="`/guests/${guest['id']}/edit`"
                       class="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600">
            Edit
          </router-link>
          <br class="p-4">
          <button @click="deleteGuest(guest['id'])"
                  class="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>