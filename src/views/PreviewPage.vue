<template>
  <div class="post-view">
    <div class="container quil-wrapper">
      <h2>{{ this.postTitle }}</h2>
      <img :src="postImage" alt="coverImg" />
      <div class="post-content ql-editor" v-html="postHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "preview",
  computed: {
    postTitle() {
      return this.$store.state.post.postTitle;
    },
    postHTML() {
      return this.$store.state.post.postHTML;
    },
    postImage() {
      return this.$store.state.post.postImageURL;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-style: 32px;
  }

  img {
    width: 100%;
    height: auto;
    margin-bottom: 32px;
  }
}
</style>
