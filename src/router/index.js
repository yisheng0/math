import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";
import { Main, lineMain, interactiveMain, home, baseMain } from "@/view";

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
  { path: "/math", component: baseMain },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
