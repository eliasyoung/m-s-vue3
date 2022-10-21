import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
import store from "@/store/index";

const CoachesList = () => import("@/pages/coaches/CoachesList.vue");
const CoachDetail = () => import("@/pages/coaches/CoachDetail.vue");
const CoachRegistration = () => import("@/pages/coaches/CoachRegistration.vue");

const ContactCoach = () => import("@/pages/requests/ContactCoach.vue");
const RequestReceived = () => import("@/pages/requests/RequestReceived.vue");

const UserAuth = () => import("@/pages/auth/UserAuth.vue");

const NotFound = () => import("@/pages/NotFound.vue");

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
        path: "contact",
        component: ContactCoach,
      },
    ],
  },
  {
    path: "/register",
    component: CoachRegistration,
    meta: { requiredAuth: true },
  },
  {
    path: "/requests",
    component: RequestReceived,
    meta: { requiredAuth: true },
  },
  {
    path: "/auth",
    component: UserAuth,
    meta: { requiredUnauth: true },
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

router.beforeEach(function (to, _, next) {
  if (to.meta.requiredAuth && !store.getters.isAuthenticated) {
    store.dispatch("tryLogin");
    if (!store.getters.isAuthenticated) {
      next("/auth");
    } else next();
  } else if (to.meta.requiredUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
