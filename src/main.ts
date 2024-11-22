import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import Rooms from "./components/Rooms.vue";
import AddRoom from "./components/AddRoom.vue";
import AssignGuest from "./components/AssignGuest.vue";
import Guests from "./components/Guests.vue";
import AddGuest from "./components/AddGuest.vue";
import EditGuest from "./components/EditGuest.vue";
import Index from "./components/Index.vue";

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Index},
        {path: '/rooms', component: Rooms},
        {path: '/rooms/add', component: AddRoom},
        {path: '/rooms/:roomId/assign-guest', component: AssignGuest},
        {path: '/guests', component: Guests},
        {path: '/guests/add', component: AddGuest},
        {path: '/guests/:guestId/edit', component: EditGuest},
    ]
});

app.use(router)

app.mount('#app');
