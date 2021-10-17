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
        Posted on:
        {{
          new Date(post.postDate).toLocaleString("en-us", { dateStyle: "long" })
        }}
      </p>
      <router-link
        class="link"
        :to="{ name: 'Post', params: { id: this.post.postId } }"
      >
        View The Post <Arrow class="arrow" />
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

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5s ease all;

      &:hover {
        background-color: #303030;

        .edit,
        .delete {
          path {
            fill: #fff;
          }
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }

    p {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 16px;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-size: 12px;
      font-weight: 500;
      padding-top: 20px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;

      &:hover {
        color: rbga(48, 48, 48 0.8);
      }

      .arrow {
        width: 10px;
      }
    }
  }
}
</style>
