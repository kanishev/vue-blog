import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

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
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    updateUser(state, p) {
      state.user = p;
    },
    toggleEdit(state, p) {
      state.isEditPost = p;
      console.log(state.isEditPost);
    },
    setProfile(state, p) {
      state.profileId = p.id;
      state.profileEmail = p.data().email;
      state.profileFirstName = p.data().firstName;
      state.profileLastName = p.data().lastName;
      state.profileUsername = p.data().userName;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
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
      console.log(dbResults);
    },
  },
  modules: {},
});
