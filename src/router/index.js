import psVariants from "../views/psVariants.vue";
import psOthers from "../views/psOthers.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: '/', component: psVariants },
    { path: '/others', component: psOthers },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router