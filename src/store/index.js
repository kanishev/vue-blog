import Vue from "vue";
import Vuex from "vuex";

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
    profileInitialized: null,
  },
  mutations: {
    toggleEdit(state, p) {
      state.isEditPost = p;
      console.log(state.isEditPost);
    },
  },
  actions: {},
  modules: {},
});
