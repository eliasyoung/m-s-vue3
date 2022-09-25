import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";

import CoachesList from "@/pages/coaches/CoachesList.vue";
import CoachDetail from "@/pages/coaches/CoachDetail.vue";
import CoachRegistration from "@/pages/coaches/CoachRegistration.vue";

import ContactCoach from "@/pages/requests/ContactCoach.vue";
import RequestReceived from "@/pages/requests/RequestReceived.vue";

import NotFound from "@/pages/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/coaches",
    // component: HomeView,
  },
  {
    path: "/coaches",
    component: CoachesList,
  },
  {
    path: "/coaches/:id",
    component: CoachDetail,
    children: [
      {
        path: "/contact",
        component: ContactCoach,
      },
    ],
  },
  {
    path: "/register",
    component: CoachRegistration,
  },
  {
    path: "/requests",
    component: RequestReceived,
  },
  {
    path: "/:notFound(.*)",
    component: NotFound,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
