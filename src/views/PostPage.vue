<template>
  <div v-if="currentPost" class="post-view">
    <div class="container quil-wrapper">
      <h2 class="post-title">{{ this.currentPost.postTitle }}</h2>
      <h4 class="post-date">
        Posted on:
        {{
          new Date(this.currentPost.postDate).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h4>
      <img
        class="post-image"
        :src="this.currentPost.postCoverImage"
        alt="coverImg"
      />
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

<style>
.post-view {
  padding: 60px 0;
}
.post-view .container {
  max-width: 700px;
}
.post-view .container .post-title {
  margin-bottom: 10px;
}
.post-view .container .post-date {
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 24px;
}
.post-view .container .post-image {
  max-width: inherit;
  margin-bottom: 20px;
}
</style>
