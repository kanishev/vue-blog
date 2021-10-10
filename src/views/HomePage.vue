<template>
  <div class="home">
    <blog-post :post="welcomeScreen"></blog-post>
    <blog-post
      v-for="(post, idx) in sampleBlogPost"
      :key="idx"
      :post="post"
    ></blog-post>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View more Recent Blog</h3>
        <div class="blog-cards">
          <blog-card
            v-for="(post, idx) in sampleBlogCards"
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
        title: "Welcome !",
        blogHTML: "Some text",
        blogCoverPhoto: "coding",
        main: true,
      },
      sampleBlogPost: [
        {
          title: "This is a filter title",
          blogHTML: "This is a filter blog post title",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "This is a filter title",
          blogHTML: "This is a filter blog post title",
          blogCoverPhoto: "designed-for-everyone",
        },
      ],
    };
  },
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
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
