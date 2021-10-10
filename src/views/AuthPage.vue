<template>
  <div class="form-wrap">
    <Modal
      v-if="isModalActive"
      :modalText="modalText"
      @closeModal="isModalActive = false"
    />
    <Loader v-if="isLoaderActive" />
    <component
      :is="authPage"
      @togglePage="togglePage"
      @toggleModal="toggleModal"
      @toggleLoader="toggleLoader"
    ></component>
    <div class="background"></div>
  </div>
</template>

<script>
import Modal from "../components/TheModal.vue";
import Loader from "../components/TheLoader.vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
import Reset from "../components/Auth/Reset.vue";

export default {
  name: "AuthPage",
  data() {
    return {
      page: "Login",
      isModalActive: false,
      modalText: "Hello",
      isLoaderActive: false,
    };
  },
  methods: {
    togglePage(page) {
      this.page = page;
    },
    toggleModal(message) {
      this.modalText = message;
      this.isModalActive = true;
    },
    toggleLoader(status) {
      this.isLoaderActive = status;
    },
  },
  computed: {
    authPage() {
      return this.page;
    },
  },
  components: { Register, Reset, Login, Modal, Loader },
};
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }
}

.auth-text {
  margin-bottom: 32px;

  .router-link {
    color: #000;
  }
}

form {
  padding: 0 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  @media (min-width: 900px) {
    padding: 0 50px;
  }

  h2 {
    text-align: center;
    font-size: 32px;
    color: #303030;
    margin-bottom: 40px;
    @media (min-width: 900px) {
      font-size: 40px;
    }
  }

  .inputs {
    width: 100%;
    max-width: 350px;

    .input {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;

      input {
        width: 100%;
        border: none;
        background-color: #f2f7f6;
        padding: 4px 4px 4px 30px;
        height: 50px;
      }
    }

    .icon {
      width: 12px;
      position: absolute;
      left: 6px;
    }
  }

  .reset {
    text-decoration: none;
    color: #000;
    cursor: pointer;
    font-size: 14px;
    margin: 16px 0 32px;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease all;

    &:hover {
      border-color: #303030;
    }
  }

  .angle {
    display: none;
    position: absolute;
    background-color: #fff;
    transform: rotateZ(3deg);
    width: 60px;
    right: -30px;
    height: 100%;

    @media (min-width: 900px) {
      display: initial;
    }
  }
}

.background {
  display: none;
  flex: 2;
  background-size: cover;
  background-image: url("../assets/background.png");
  width: 100%;
  height: 101%;

  @media (min-width: 900px) {
    display: initial;
  }
}
</style>
