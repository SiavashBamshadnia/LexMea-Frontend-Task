<template>
  <div class="h-screen">
    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
      <div class="flex shrink-0 items-center">
        <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
             alt="Your Company"/>
      </div>
      <div class="hidden sm:ml-6 sm:block">
        <div class="flex space-x-4">
          <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              :class="[isActive(item.to) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
              v-text="item.name"></router-link>
        </div>
      </div>
    </div>
    <RouterView class="mt-10"/>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navigation = [
  {name: 'Home', to: '/'},
  {name: 'Rooms', to: '/rooms'},
  {name: 'Guests', to: '/guests'},
]

function isActive(to) {
  return route.path === to
}
</script>
