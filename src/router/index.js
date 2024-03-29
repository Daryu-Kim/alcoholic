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
import FollowerView from "../views/FollowerView.vue";
import FollowingView from "../views/FollowingView.vue";
import ProfileView from "../views/ProfileView.vue";
import PlaceView from "../views/PlaceView.vue";
import PostListView from "../views/PostListView.vue";
import PostView from "../views/PostView.vue";
import PostSendView from "../views/PostSendView.vue";
import MainRecommendPlaceView from "../views/MainRecommendPlaceView.vue";
import MainRecommendUserView from "../views/MainRecommendUserView.vue";

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
        redirect: "/main/recommend/place",
        children: [
          {
            path: "place",
            name: "replace",
            component: MainRecommendPlaceView,
          },
          {
            path: "user",
            name: "reuser",
            component: MainRecommendUserView,
          },
        ],
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
  {
    path: "/follower",
    name: "follower",
    component: FollowerView,
  },
  {
    path: "/following",
    name: "following",
    component: FollowingView,
  },
  {
    path: "/profile",
    name: "userprofile",
    component: ProfileView,
  },
  {
    path: "/place",
    name: "place",
    component: PlaceView,
  },
  {
    path: "/post",
    name: "post",
    component: PostListView,
  },
  {
    path: "/post-view",
    name: "post-view",
    component: PostView,
  },
  {
    path: "/post-send",
    name: "post-send",
    component: PostSendView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
