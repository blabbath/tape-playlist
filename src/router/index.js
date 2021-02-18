import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import Recorder from '../views/Recorder.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/recorder',
        name: 'Recorder',
        component: Recorder,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/:catchAll(.*)',
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
