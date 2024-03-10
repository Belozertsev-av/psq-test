import psVariants from "../pages/psVariants.vue";
import psOthers from "../pages/psOthers.vue";
import psReport from "../pages/psReport.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: '/', component: psVariants },
    { path: '/others', component: psOthers },
    { path: '/report', component: psReport },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router