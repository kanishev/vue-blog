<template>
  <div class="create-post">
    <BlogImagePreview
      v-show="this.$store.state.post.postImagePreview"
      @closeImagePreview="closePreview"
    />
    <Loader v-show="isLoading" />
    <div class="container">
      <div class="error-message" :class="{ invisible: !error }">
        <p><span>Error:</span> {{ this.errorMessage }}</p>
      </div>
      <div class="post-info">
        <input type="text" placeholder="enter post title" v-model="postTitle" />
        <div class="upload-file">
          <label for="blog-image">Загрузить изображение</label>
          <input
            type="file"
            ref="image"
            id="blog-image"
            accept=".png, .jpeg, .jpg"
            @change="changeImage"
          />
          <button
            class="preview"
            :class="{ 'button-inactive': !this.$store.state.post.postImageURL }"
            @click="openPreview"
          >
            Preview
          </button>
          <span>File Chosen: {{ this.$store.state.post.postImageName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="postHTML"
          useCustomImageHandler
          @image-added="imageHandler"
        />
      </div>
      <div class="blog-actions">
        <button @click="updatePost">Сохранить изменения</button>
        <router-link class="router-button" to="/preview"
          >Посмотреть изменения</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import BlogImagePreview from "../components/Blogs/BlogImagePreview.vue";
import Loader from "../components/AppLoader.vue";

import { imageHandler } from "../utils/imageHandler";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";

export default {
  name: "EditPage",
  data() {
    return {
      error: null,
      file: null,
      isLoading: false,
      errorMessage: "",
      routeId: null,
      currentPost: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  async mounted() {
    this.routeId = this.$route.params.id;
    this.currentPost = await this.$store.state.post.posts.filter((p) => {
      return p.postId === this.$route.params.id;
    })[0];

    this.$store.commit("setPostState", this.currentPost);
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    postCoverImageName() {
      return this.$store.state.post.postImageName;
    },
    postTitle: {
      get() {
        return this.$store.state.post.postTitle;
      },
      set(p) {
        this.$store.commit("updatePostInfo", { key: "postTitle", p });
      },
    },
    postHTML: {
      get() {
        return this.$store.state.post.postHTML;
      },
      set(p) {
        this.$store.commit("updatePostInfo", { key: "postHTML", p });
      },
    },
  },
  methods: {
    changeImage() {
      this.file = this.$refs.image.files[0];
      const fileName = this.file.name;

      this.$store.commit("updatePostInfo", {
        key: "postImageName",
        p: fileName,
      });
      this.$store.commit("updatePostInfo", {
        key: "postImageURL",
        p: URL.createObjectURL(this.file),
      });
    },
    openPreview() {
      this.$store.commit("updatePostInfo", {
        key: "postImagePreview",
        p: true,
      });
    },
    closePreview() {
      this.$store.commit("updatePostInfo", {
        key: "postImagePreview",
        p: false,
      });
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      return imageHandler(file, Editor, cursorLocation, resetUploader);
    },
    async updatePost() {
      const dataBase = db.collection("blogPosts").doc(this.routeId);

      if (this.postTitle.length !== 0 && this.postHTML.length !== 0) {
        if (this.file) {
          this.isLoading = true;
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(
            `documents/blogPostImages/${this.$store.state.post.postImageName}`
          );

          docRef.put(this.file).on(
            "state_changed",
            (snapShot) => {
              console.warn(snapShot);
            },
            (err) => {
              console.warn(err);
              this.isLoading = false;
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();

              await dataBase.update({
                postHTML: this.postHTML,
                postCoverImage: downloadURL,
                postImageName: this.postCoverImageName,
                postTitle: this.postTitle,
              });

              await this.$store.dispatch("updatePost", this.routeId);

              this.isLoading = false;
              this.$router.push({ name: "Post", params: { id: dataBase.id } });
            }
          );
          return;
        }

        this.isLoading = true;
        await dataBase.update({
          postHTML: this.postHTML,
          postTitle: this.postTitle,
        });

        await this.$store.dispatch("updatePost", this.routeId);
        this.isLoading = false;
        this.$router.push({ name: "Post", params: { id: dataBase.id } });
        return;
      }

      this.errorMessage = "Fill all inputs";
      this.error = true;

      setTimeout(() => {
        this.error = false;
      }, 3000);

      return;
    },
  },
  components: { BlogImagePreview, Loader },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  .invisible {
    opacity: 0 !important;
  }

  .error-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .post-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.3s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    display: flex;
    flex-direction: column;
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
