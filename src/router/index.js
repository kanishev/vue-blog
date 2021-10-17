import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomePage.vue";
import store from "../store/index";

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
    component: () => import("../views/BlogsPage.vue"),
    meta: {
      title: "Blogs Page",
      layout: "main",
    },
  },
  {
    path: "/post/:id",
    name: "Post",
    component: () => import("../views/PostPage.vue"),
    meta: {
      title: "Post Page",
      layout: "main",
    },
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import("../views/EditPage.vue"),
    meta: {
      title: "Edit Page",
      layout: "main",
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/AuthPage.vue"),
    meta: {
      title: "Auth Page",
      layout: "empty",
    },
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("../views/CreatePage.vue"),
    meta: {
      title: "Create Page",
      layout: "main",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/ProfilePage.vue"),
    meta: {
      title: "Profile Page",
      layout: "main",
    },
  },
  {
    path: "/preview",
    name: "Preview",
    component: () => import("../views/PreviewPage.vue"),
    meta: {
      title: "Preview Page",
      layout: "empty",
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
  if (
    (!store.state.user && to.name == "Edit") ||
    (!store.state.user && to.name == "Create")
  ) {
    next({ name: "Auth" });
  } else {
    document.title = `${to.meta.title} | Blog`;
    next();
  }
});

export default router;
