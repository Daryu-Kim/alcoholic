import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import InstallView from "../views/InstallView.vue";
import RegisterView from "../views/RegisterView.vue";
import MainView from "../views/MainView.vue";
import MainHomeView from "../views/MainHomeView.vue";
import MainSearchView from "../views/MainSearchView.vue";
import MainRecommendView from "../views/MainRecommendView.vue";
import MainChatView from "../views/MainChatView.vue";
import MainProfileView from "../views/MainProfileView.vue";
import ScanView from "../views/ScanView.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: HomeView,
  },
  {
    path: "/install",
    name: "install",
    component: InstallView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/main",
    name: "main",
    component: MainView,
    redirect: "/main/home",
    children: [
      {
        path: "home",
        name: "home",
        component: MainHomeView,
      },
      {
        path: "search",
        name: "search",
        component: MainSearchView,
      },
      {
        path: "recommend",
        name: "recommend",
        component: MainRecommendView,
      },
      {
        path: "chat",
        name: "chat",
        component: MainChatView,
      },
      {
        path: "profile",
        name: "profile",
        component: MainProfileView,
      },
    ],
  },
  {
    path: "/scan",
    name: "scan",
    component: ScanView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
