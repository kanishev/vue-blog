export default {
  state: {
    postHTML: "Write your post title here",
    postTitle: "Hello",
    postName: "",
    postImageName: "",
    postImageURL: "",
    postImagePreview: false,
  },
  mutations: {
    updatePostInfo(state, { key, p }) {
      state[key] = p;
    },
  },
};
