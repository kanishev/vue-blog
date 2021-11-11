<template>
  <div class="blog-wrapper" :class="{ 'no-user': !user }">
    <div class="blog-content">
      <div v-if="post.main">
        <h2>Добро пожаловать</h2>

        <p>
          Для возможности создавать и изменять посты, пожалуйста,
          зарегистрируйтесь
        </p>
        <router-link class="link blog-link link-light" to="#">
          Войти / Зарегистрироваться <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
      <div v-else>
        <h2>{{ post.postTitle }}</h2>

        <router-link
          class="link blog-link"
          :to="{ name: 'Post', params: { id: this.post.postId } }"
        >
          Посмотреть пост<Arrow class="arrow" />
        </router-link>
      </div>
    </div>
    <div class="blog-image">
      <img v-if="post.main" src="../../assets/mainImage.jpg" alt="image" />
      <img v-else :src="post.postCoverImage" alt="image" />
    </div>
  </div>
</template>

<script>
import Arrow from "../../assets/Icons/arrow-right-light.svg";
export default {
  props: ["post"],
  name: "blogPost",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  components: { Arrow },
};
</script>

<style scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);
}
@media (min-width: 700px) {
  .blog-wrapper {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }
}
.blog-wrapper .blog-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 4;
  order: 2;
}
@media (min-width: 700px) {
  .blog-wrapper .blog-content {
    order: 1;
  }
}
@media (min-width: 800px) {
  .blog-wrapper .blog-content {
    flex: 3;
  }
}
.blog-wrapper .blog-content div {
  max-width: 375px;
  padding: 72px 24px;
}
@media (min-width: 700px) {
  .blog-wrapper .blog-content div {
    padding: 0 24px;
  }
}
.blog-wrapper .blog-content div h2 {
  font-size: 32px;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 24px;
}
@media (min-width: 700px) {
  .blog-wrapper .blog-content div h2 {
    font-size: 32px;
  }
}
.blog-wrapper .blog-content div p {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.7;
}
.blog-wrapper .blog-content div .content-preview {
  font-size: 13px;
  max-height: 24px;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.blog-wrapper .blog-content div .blog-link {
  margin-top: 32px;
  display: inline-flex;
  align-items: center;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: 0.5s ease-in all;
}
.blog-wrapper .blog-content div .blog-link:hover {
  border-bottom-color: #303030;
}
.blog-wrapper .blog-content div .link-light:hover {
  border-bottom-color: #fff f;
}
.blog-wrapper .blog-image {
  order: 1;
  flex: 3;
  box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);
}
@media (min-width: 700) {
  .blog-wrapper .blog-image {
    order: 2;
  }
}
@media (min-width: 800) {
  .blog-wrapper .blog-image {
    order: 4;
  }
}
.blog-wrapper .blog-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.blog-wrapper:nth-child(even) .blog-content {
  order: 2;
}
.blog-wrapper:nth-child(even) .blog-image {
  order: 1;
}
.no-user:first-child .blog-content {
  background-color: #303030;
  color: #fff;
}
</style>
