import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
import post from "./post";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog card #1",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1, 2021",
      },
      {
        blogTitle: "Blog card #2",
        blogCoverPhoto: "stock-2",
        blogDate: "May 1, 2021",
      },
      {
        blogTitle: "Blog card #3",
        blogCoverPhoto: "stock-3",
        blogDate: "May 1, 2021",
      },
      {
        blogTitle: "Blog card #4",
        blogCoverPhoto: "stock-4",
        blogDate: "May 1, 2021",
      },
    ],
    isEditPost: null,
    user: null,
    editPost: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    updateUser(state, p) {
      state.user = p;
    },
    toggleEdit(state, p) {
      state.isEditPost = p;
    },
    setProfile(state, p) {
      state.profileId = p.id;
      state.profileEmail = p.data().email;
      state.profileFirstName = p.data().firstName;
      state.profileLastName = p.data().lastName;
      state.profileUserName = p.data().userName;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeProfileInfo(state, [key, data]) {
      console.log(key);
      state[key] = data;
    },
  },
  actions: {
    async getUser(ctx) {
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      ctx.commit("setProfile", dbResults);
      ctx.commit("setProfileInitials");
    },
    async updateUserProfile(ctx) {
      const dataBase = await db.collection("users").doc(ctx.state.profileId);
      await dataBase.update({
        firstName: ctx.state.profileFirstName,
        lastName: ctx.state.profileLastName,
        userName: ctx.state.profileUserName,
      });
      ctx.commit("setProfileInitials");
    },
  },
  modules: { post },
});
