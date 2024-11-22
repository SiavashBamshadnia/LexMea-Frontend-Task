<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";

const route = useRoute()

const guests = ref([]);
const roomId = route.params['roomId']
const guestId = ref();

axios.get('/api/guests')
    .then((response) => {
      guests.value = response.data['data'];
    })
    .catch((error) => {
      console.log(error)
      if (error?.response?.data?.message) {
        alert(error.response.data.message)
      }
    })

const submitAssignGuestRequest = () => {
  if (!guestId.value) {
    alert('Please choose a guest');
    return;
  }
  axios.post(`/api/guests/${guestId.value}/assign-room`, {
    'room-id': roomId,
  }).then(() => {
    alert('Guest assigned successfully.');
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

  <form class="max-w-sm mx-auto mt-5" @submit.prevent="submitAssignGuestRequest">
    <div class="mb-5">
      <label for="guest-id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Guest
      </label>
      <select name="guest-id" id="guest-id" v-model="guestId"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option v-for="guest in guests" :value="guest['id']" v-text="guest['full_name']"></option>
      </select>
    </div>
    <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Submit
    </button>
  </form>
</template>

<style scoped>
</style>
