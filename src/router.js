import  { createRouter, createWebHistory} from 'vue-router';

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'firstPage', component: () => import("@/components/index.vue")},
        { path: '/calculator', name: 'calculator', component: () => import("@/components/calc.vue")},
        { path: '/history', name: 'history', component: () => import("@/components/history.vue")},
    ]
});

