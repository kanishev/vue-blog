<template>
  <div class="app-wrapper">
    <Loader v-if="isLoading" />
    <component :is="layout" v-if="this.isPostLoaded"></component>
  </div>
</template>

<script>
import EmptyLayout from "./layouts/EmptyLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";
import Loader from "./components/AppLoader.vue";

import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "app",
  data() {
    return {
      isLoading: true,
      isPostLoaded: false,
    };
  },
  created() {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        this.$store.commit("updateUser", user);
        if (user) {
          this.$store.dispatch("getUser").then(() => {
            this.isLoading = false;
          });
        }
      });

      this.$store.dispatch("getPost").then(() => {
        this.isPostLoaded = true;
      });
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  mounted() {},
  methods: {},
  components: { EmptyLayout, MainLayout, Loader },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;1,400&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

#loader {
  display: none;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}

.router-button:focus {
  outline: none;
}

.router-button:hover {
  background-color: #fdcc21;
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
}

@media (min-width: 700px) {
  .button-ghost {
    margin-top: 0;
    margin-left: auto;
  }
}

.button-ghost i {
  margin-left: 8px;
}
.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

button:disabled {
  background: lightgray;
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 100px 16px;
  }
}

.blog-card-wrap .blog-cards {
  display: flex;
  flex-wrap: wrap;
}

.validation {
  padding: 18px 0;
  text-align: center;
  background: gold;
}
</style>
