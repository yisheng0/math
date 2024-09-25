import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";
import { Main, lineMain, interactiveMain, home } from "@/view";

const routes = [
  {
    path: "/",
    component: home,
  },
  {
    path: "/base",
    component: Main,
  },
  { path: "/line", component: lineMain },
  { path: "/interactive", component: interactiveMain },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
