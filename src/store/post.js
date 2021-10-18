import "firebase/storage";
import db from "../firebase/firebaseInit";

export default {
  state: {
    posts: [],
    postHTML: "Здесь можно основной текст поста",
    postTitle: "Заголовок поста",
    postName: "",
    postImageName: "",
    postImageURL: "",
    postImagePreview: false,
    isPostLoaded: false,
  },
  mutations: {
    updatePostInfo(state, { key, p }) {
      state[key] = p;
    },
    filterPosts(state, payload) {
      state.posts = state.posts.filter((p) => p.postId !== payload);
    },
    setPostState(state, p) {
      state.postTitle = p.postTitle;
      state.postHTML = p.postHTML;
      state.postImageURL = p.postImageURL;
      state.postImageName = p.postImageName;
    },
  },
  actions: {
    async getPost({ state }) {
      const dataBase = db.collection("blogPosts").orderBy("date", "desc");
      const dbResults = await dataBase.get();

      dbResults.forEach((doc) => {
        if (!state.posts.some((p) => p.postId === doc.id)) {
          const data = {
            postId: doc.data().postID,
            postHTML: doc.data().postHTML,
            postCoverImage: doc.data().postCoverImage,
            postTitle: doc.data().postTitle,
            postDate: doc.data().date,
            postImageName: doc.data().postImageName,
          };
          state.posts.push(data);
        }
      });
      state.isPostLoaded = true;
    },
    async deletePost({ commit }, payload) {
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();

      commit("filterPosts", payload);
    },
    async updatePost({ commit, dispatch }, payload) {
      commit("filterPosts", payload);

      await dispatch("getPost");
    },
  },
  getters: {
    blogPostsFeed(state) {
      return state.posts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.posts;
    },
  },
};
