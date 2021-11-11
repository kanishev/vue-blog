<template>
  <figure class="blog-card">
    <div class="icons" v-show="isEditPost && $route.name == 'Blogs'">
      <div class="icon" @click="editPost">
        <Edit class="edit" />
      </div>
      <div class="icon" @click="deletePost">
        <Delete class="delete" />
      </div>
    </div>
    <img :src="post.postCoverImage" alt="cardImage" />
    <figcaption class="info">
      <h4>{{ post.postTitle }}</h4>
      <p>
        Пост выложен:
        {{
          new Date(post.postDate).toLocaleString("ru-RU", { dateStyle: "long" })
        }}
      </p>
      <router-link
        class="link"
        :to="{ name: 'Post', params: { id: this.post.postId } }"
      >
        Посмотреть пост <Arrow class="arrow" />
      </router-link>
    </figcaption>
  </figure>
</template>

<script>
import Arrow from "../../assets/Icons/arrow-right-light.svg";
import Edit from "../../assets/Icons/edit-regular.svg";
import Delete from "../../assets/Icons/trash-regular.svg";

export default {
  props: ["post"],
  name: "blogCard",
  computed: {
    isEditPost() {
      return this.$store.state.isEditPost;
    },
  },
  methods: {
    deletePost() {
      this.$store.dispatch("deletePost", this.post.postId);
    },
    editPost() {
      this.$router.push({ name: "Edit", params: { id: this.post.postId } });
    },
  },
  components: {
    Arrow,
    Edit,
    Delete,
  },
};
</script>

<style scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  width: 380px;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;
}
.blog-card:hover {
  transform: rotateZ(-1deg) scale(1.01);
  box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);
}
.blog-card .icons {
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}
.blog-card .icons .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #fff;
  transition: 0.5s ease all;
}
.blog-card .icons .icon:hover {
  background-color: #303030;
}
.blog-card .icons .icon:hover .edit path,
.blog-card .icons .icon:hover .delete path {
  fill: #fff;
}
.blog-card .icons .icon:nth-child(1) {
  margin-right: 8px;
}
.blog-card .icons .icon .edit,
.blog-card .icons .icon .delete {
  pointer-events: none;
  height: 15px;
  width: auto;
}
.blog-card img {
  display: block;
  border-radius: 8px 8px 0 0;
  z-index: 1;
  width: 100%;
  min-height: 200px;
  object-fit: cover;
}
.blog-card .info {
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 3;
  padding: 32px 16px;
  color: #000;
}
.blog-card .info h4 {
  padding-bottom: 8px;
  font-size: 20px;
  font-weight: 300;
}
.blog-card .info p {
  font-weight: 400;
  font-size: 12px;
  padding-bottom: 16px;
}
.blog-card .info .link {
  display: inline-flex;
  align-items: center;
  margin-top: auto;
  font-size: 12px;
  font-weight: 500;
  padding-top: 20px;
  padding-bottom: 4px;
  transition: 0.5s ease-in all;
}
.blog-card .info .link:hover {
  color: rbga(48, 48, 48 0.8);
}
.blog-card .info .link .arrow {
  width: 10px;
}
</style>
