<template>
  <div class="blog-wrapper" :class="{ 'no-user': !user }">
    <div class="blog-content">
      <div v-if="post.main">
        <h2>{{ post.title }}</h2>

        <p>{{ post.blogHTML }}</p>
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
      console.log(this.post);
      return this.$store.state.user;
    },
  },
  components: { Arrow },
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);
  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
    @media (min-width: 700px) {
      order: 1;
    }
    @media (min-width: 800px) {
      flex: 3;
    }

    div {
      max-width: 375px;
      padding: 72px 24px;
      @media (min-width: 700px) {
        padding: 0 24px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media (min-width: 700px) {
          font-size: 48px;
        }
      }

      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }

      .content-preview {
        font-size: 13px;
        max-height: 24px;
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .blog-link {
        margin-top: 32px;
        display: inline-flex;
        align-items: center;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;

        &:hover {
          border-bottom-color: #303030;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: #ffff;
        }
      }
    }
  }

  .blog-image {
    order: 1;
    flex: 3;
    box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);

    @media (min-width: 700) {
      order: 2;
    }

    @media (min-width: 800) {
      order: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:nth-child(even) {
    .blog-content {
      order: 2;
    }

    .blog-image {
      order: 1;
    }
  }
}

.no-user:first-child {
  .blog-content {
    background-color: #303030;
    color: #fff;
  }
}
</style>
