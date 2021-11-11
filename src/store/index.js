import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
import post from "./post";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isEditPost: null,
    user: null,
    editPost: null,
    isProfileMenuActive: false,
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
        state.profileFirstName
          .match(/(\b\S)?/g)
          .join("")
          .toUpperCase() +
        state.profileLastName
          .match(/(\b\S)?/g)
          .join("")
          .toUpperCase();
    },
    changeProfileInfo(state, [key, data]) {
      state[key] = data;
    },
    toggleProfileMenu(state, p) {
      state.isProfileMenuActive = p;
    },
  },
  actions: {
    async getUser(ctx) {
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);

      console.log(dataBase);
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
  getters: {
    isProfileMenuActive(state) {
      return state.isProfileMenuActive;
    },
  },
  modules: { post },
});
