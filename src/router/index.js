import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";
import { Main, lineMain } from "@/view";

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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
