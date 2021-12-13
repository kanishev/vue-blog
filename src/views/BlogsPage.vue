<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div class="toggle-edit" v-if="user">
        <span>Режим редактирования</span>
        <input type="checkbox" v-model="isEditPost" />
      </div>
      <blog-card
        v-for="(post, idx) in sampleBlogCards"
        :key="idx"
        :post="post"
      ></blog-card>
    </div>
  </div>
</template>

<script>
import BlogCard from "../components/Blogs/BlogCard.vue";
export default {
  name: "blogsPage",
  data() {
    return {
      isEdit: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    sampleBlogCards() {
      return this.$store.state.post.posts;
    },
    isEditPost: {
      get() {
        return this.$store.state.isEditPost;
      },
      set(p) {
        this.$store.commit("toggleEdit", p);
      },
    },
  },
  beforeDestroy() {
    this.$store.commit("toggleEdit", false);
  },
  components: { BlogCard },
};
</script>

<style csoped>
.blog-cards {
  position: relative;
  gap: 20px;
}
.blog-cards .toggle-edit {
  display: flex;
  align-items: center;
  position: absolute;
  top: -70px;
  right: 0;
}
.blog-cards .toggle-edit span {
  margin-right: 16px;
}
.blog-cards .toggle-edit input[type="checkbox"] {
  position: relative;
  border: none;
  -webkit-appearance: none;
  background: #fff;
  outline: none;
  width: 80px;
  height: 30px;
  border-radius: 20px;
}
.blog-cards .toggle-edit input[type="checkbox"]:before {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  top: 0;
  left: 0;
  background: #303030;
  transform: scale(1.1);
  transition: 750ms ease all;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.blog-cards .toggle-edit input:checked[type="checkbox"]:before {
  background: #fdcc21;
  left: 52px;
}
</style>
