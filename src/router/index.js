import VueRouter from "vue-router";
import Vue from "vue";
import PostPage from "../views/PostPage";
import AddPost from "../views/AddPost";
import Login from "../views/LoginPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/post",
    component: PostPage,
  },
  {
    path: "/add",
    component: AddPost,
  },
  { path: "/", meta: { layout: "Blank" }, component: Login },
];

const router = new VueRouter({ routes });

export default router;
