import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";
import { Main, lineMain, interactiveMain } from "@/view";

const routes = [
  {
    path: "/",
    component: Main,
    // children: [
    //   {
    //     path: "line",
    //     component: lineMain,
    //   },
    // ],
  },
  { path: "/line", component: lineMain },
  { path: "/interactive", component: interactiveMain },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
