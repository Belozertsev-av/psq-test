import psVariants from "../pages/psVariants.vue";
import psOthers from "../pages/psOthers.vue";
import psReport from "../pages/psReport.vue";
import { createWebHistory, createRouter } from "vue-router";
import psReportToPrint from "../components/psReportToPrint.vue";

const routes = [
    { path: '/', component: psVariants },
    { path: '/others', component: psOthers },
    { path: '/report', name: 'report', component: psReport },
    {path: '/report/download', name: 'download', component: psReportToPrint }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router