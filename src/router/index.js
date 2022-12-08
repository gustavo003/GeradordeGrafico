import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Graficodebarras from "../views/Graficodebarras.vue";
import Pizza from "../views/Pizza.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
   
    {
      path: "/graficopizza",
      name: "Graficopizza",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Pizza,
    },
    {
      path: "/graficobarras",
      name: "GraficoBarras",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Graficodebarras,
    },
  ],
});

export default router;
