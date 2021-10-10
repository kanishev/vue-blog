<template>
  <form class="login" @submit.prevent="singIn">
    <p class="auth-text">
      Don't have an account?
      <a
        class="router-link"
        href="#"
        @click.prevent="$emit('togglePage', 'Register')"
        >Register</a
      >
    </p>
    <h2>Login to Blog</h2>
    <div class="inputs">
      <div class="validation" v-if="formValidMessage">
        <p>{{ this.formValidMessage }}</p>
      </div>
      <div class="input">
        <input type="text" placeholder="Email" v-model="email" />
        <email class="icon" />
      </div>
      <div class="input">
        <input type="password" placeholder="Password" v-model="password" />
        <password class="icon" />
      </div>
    </div>
    <a class="reset" href="#" @click.prevent="$emit('togglePage', 'Reset')"
      >Forgot password?</a
    >
    <button>Sign In</button>
    <div class="angle"></div>
  </form>
</template>

<script>
import email from "../../assets/Icons/envelope-regular.svg";
import password from "../../assets/Icons/lock-alt-solid.svg";

import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      page: "Login",
      formValidMessage: "",
    };
  },
  computed: {
    isFormValid() {
      return this.email !== "" && this.password !== "";
    },
  },
  methods: {
    async singIn() {
      if (this.isFormValid) {
        try {
          this.formValidMessage = "";

          const firebaseAuth = await firebase.auth();
          await firebaseAuth.signInWithEmailAndPassword(
            this.email,
            this.password
          );

          console.log(firebase.auth().currentUser.uid);
          this.$router.push("/");
        } catch (err) {
          this.formValidMessage = err.message;
        }
      } else {
        this.formValidMessage = "Пожалуйста, заполните все поля";
      }
    },
  },
  components: { email, password },
};
</script>

<style></style>
