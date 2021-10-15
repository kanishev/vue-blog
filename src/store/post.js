import "firebase/storage";
import db from "../firebase/firebaseInit";

export default {
  state: {
    posts: [],
    postHTML: "Write your post title here",
    postTitle: "Hello",
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
  },
  actions: {
    async getPost({ state }) {
      const dataBase = db.collection("blogPosts").orderBy("date", "desc");
      const dbResults = await dataBase.get();

      console.log(state);
      dbResults.forEach((doc) => {
        if (!state.posts.some((p) => p.postId === doc.id)) {
          const data = {
            postId: doc.data().postID,
            postHTML: doc.data().postHTML,
            postCoverImage: doc.data().postCoverImage,
            postTitle: doc.data().postTitle,
            postDate: doc.data().date,
          };
          state.posts.push(data);
        }
      });
      state.isPostLoaded = true;
      console.log(state.posts);
    },
  },
  getters: {
    blogPostsFeed(state) {
      return state.posts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.posts.slice(2, state.posts.length);
    },
  },
};
