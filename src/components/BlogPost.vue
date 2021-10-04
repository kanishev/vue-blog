<template>
  <div class="blog-wrapper no-user">
    <div class="blog-content">
      <div>
        <h2>{{ post.title }}</h2>
        <p>{{ post.blogHTML }}</p>
        <router-link v-if="post.main" class="link link-light" to="#">
          Login/Register <Arrow class="arrow arrow-light" />
        </router-link>
        <router-link v-else class="link" to="#">
          View The Post<Arrow class="arrow" />
        </router-link>
      </div>
    </div>
    <div class="blog-image">
      <img
        v-if="post.welcomeScreen"
        :src="require(`../assets/blogPhotos/${post.photo}.jpg`)"
        alt="image"
      />
      <img
        v-else
        :src="require(`../assets/blogPhotos/${post.blogCoverPhoto}.jpg`)"
        alt="image"
      />
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
export default {
  props: ["post"],
  name: "blogPost",
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

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
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
