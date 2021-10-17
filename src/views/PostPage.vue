<template>
  <div v-if="currentPost" class="post-view">
    <div class="container quil-wrapper">
      <h2>{{ this.currentPost.postTitle }}</h2>
      <h4>
        Posted on:
        {{
          new Date(this.currentPost.postDate).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h4>
      <img :src="this.currentPost.postCoverImage" alt="coverImg" />
      <div
        class="post-content ql-editor"
        v-html="this.currentPost.postHTML"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "postPage",
  data() {
    return {
      currentPost: null,
    };
  },
  async mounted() {
    this.currentPost = await this.$store.state.post.posts.filter((p) => {
      return p.postId === this.$route.params.id;
    })[0];
  },
};
</script>

<style lang="scss">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
