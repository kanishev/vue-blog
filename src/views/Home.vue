<template>
  <div class="home">
    <blog-post :post="welcomeScreen"></blog-post>
    <blog-post
      v-for="(post, idx) in sampleBlogPost"
      :key="idx"
      :post="post"
    ></blog-post>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue";
export default {
  name: "Home",
  data() {
    return {
      welcomeScreen: {
        title: "Welcome",
        sectionPost: "Some text",
        welcomeScreen: true,
        photo: "coding",
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
  components: { BlogPost },
};
</script>
