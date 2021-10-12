import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomePage.vue";
import Blogs from "../views/BlogsPage.vue";
import Auth from "../views/AuthPage.vue";
import Create from "../views/CreatePage.vue";
import Profile from "../views/ProfilePage.vue";
import Admin from "../views/AdminPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home Page",
      layout: "main",
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: "Blogs Page",
      layout: "main",
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    meta: {
      title: "Auth Page",
      layout: "empty",
    },
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {
      title: "Create Page",
      layout: "main",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile Page",
      layout: "main",
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin Page",
      layout: "main",
    },
  },
  {
    path: "*",
    component: Home,
    meta: {
      title: "Home Page",
      layout: "main",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Blog`;
  next();
});

export default router;
