import Vue from "vue";

/**
 * Users
 */
import UsersList from "./resources/users/List";
import UsersShow from "./resources/users/Show";
import UsersCreate from "./resources/users/Create";
import UsersEdit from "./resources/users/Edit";
import UsersForm from "./resources/users/Form";

/**
 * Posts
 */
import PostsList from "./resources/posts/List";
import PostsShow from "./resources/posts/Show";
import PostsCreate from "./resources/posts/Create";
import PostsEdit from "./resources/posts/Edit";
import PostsForm from "./resources/posts/Form";

/**
 * Users
 */
Vue.component("UsersList", UsersList);
Vue.component("UsersShow", UsersShow);
Vue.component("UsersCreate", UsersCreate);
Vue.component("UsersEdit", UsersEdit);
Vue.component("UsersForm", UsersForm);

/**
 * Posts
 */
Vue.component("PostsList", PostsList);
Vue.component("PostsShow", PostsShow);
Vue.component("PostsCreate", PostsCreate);
Vue.component("PostsEdit", PostsEdit);
Vue.component("PostsForm", PostsForm);
