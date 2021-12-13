<template>
  <form class="login" @submit.prevent="singIn">
    <p class="auth-text">
      Нет аккаунта?
      <a
        class="router-link"
        href="#"
        @click.prevent="$emit('togglePage', 'Register')"
        >Зарегистрироваться</a
      >
    </p>
    <h2>Войти в Блог</h2>
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
      >Забыли пароль?</a
    >
    <button>Войти</button>
    <div class="code">
      <h4>Test accaunt</h4>
      <p>login: test@mail.ru</p>
      <p>password: 111222</p>
    </div>
  </form>
</template>

<script>
import email from "../../assets/Icons/envelope-regular.svg";
import password from "../../assets/Icons/lock-alt-solid.svg";

import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "authLogin",
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
          this.$emit("toggleLoader", true);

          this.formValidMessage = "";

          const firebaseAuth = await firebase.auth();
          await firebaseAuth.signInWithEmailAndPassword(
            this.email,
            this.password
          );

          this.$router.push("/");
        } catch (err) {
          this.formValidMessage = err.message;
        } finally {
          this.$emit("toggleLoader", false);
        }
      } else {
        this.formValidMessage = "Пожалуйста, заполните все поля";
      }
    },
  },
  components: { email, password },
};
</script>

<style>
.code {
  margin-top: 20px;
  background-color: #f2f7f6;
  border-radius: 5px;
  padding: 10px;
}

.code p,
h4 {
  margin-bottom: 5px;
  text-align: center;
}
</style>
