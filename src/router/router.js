import Dashboard from "@/views/Dashboard.vue";
import LoginPage from "@/views/LoginPage.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", name: "Login", component: LoginPage },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
