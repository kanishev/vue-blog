import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
import post from "./post";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
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
    setProfile(state, p) {
      state.profileId = p.id;
      state.profileEmail = p.data().email;
      state.profileFirstName = p.data().firstName;
      state.profileLastName = p.data().lastName;
      state.profileUserName = p.data().userName;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.charAt(0).toUpperCase() +
        state.profileLastName.charAt(0).toUpperCase();
    },
    changeProfileInfo(state, [key, data]) {
      state[key] = data;
    },
    toggleProfileMenu(state, p) {
      state.isProfileMenuActive = p;
    },
  },
  actions: {
    async getUser({ commit }) {
      try {
        const dataBase = await db
          .collection("users")
          .doc(firebase.auth().currentUser.uid);

        const dbResults = await dataBase.get();
        commit("setProfile", dbResults);
        commit("setProfileInitials");
      } catch (e) {
        console.log(e);
      }
    },
    async updateUserProfile(ctx) {
      try {
        const dataBase = await db.collection("users").doc(ctx.state.profileId);
        await dataBase.update({
          firstName: ctx.state.profileFirstName,
          lastName: ctx.state.profileLastName,
          userName: ctx.state.profileUserName,
        });
        ctx.commit("setProfileInitials");
      } catch (e) {
        console.log(e);
      }
    },
  },

  modules: { post },
});
