<template>
  <div class="home">
    <blog-post v-if="!user" :post="welcomeScreen"></blog-post>
    <blog-post
      v-for="(post, idx) in blogPostsFeed"
      :key="idx"
      :post="post"
    ></blog-post>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>Последние посты</h3>
        <div class="blog-cards">
          <blog-card
            v-for="(post, idx) in blogPostsCards"
            :key="idx"
            :post="post"
          ></blog-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/Blogs/BlogPost.vue";
import BlogCard from "../components/Blogs/BlogCard.vue";

export default {
  name: "Home",
  data() {
    return {
      welcomeScreen: {
        main: true,
      },
    };
  },
  computed: {
    blogPostsFeed() {
      return this.$store.getters.blogPostsFeed;
    },
    blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    },
    user() {
      return this.$store.state.user;
    },
  },
  components: { BlogPost, BlogCard },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
</style>
