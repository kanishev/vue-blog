<template>
  <form @submit.prevent="register" class="register">
    <p class="auth-text">
      Уже есть аккаунт?
      <a
        class="router-link"
        href="#"
        @click.prevent="$emit('togglePage', 'Login')"
        >Войти</a
      >
    </p>
    <h2>Sign Up</h2>
    <div class="inputs">
      <div class="validation" v-if="formValidMessage">
        <p>{{ this.formValidMessage }}</p>
      </div>
      <div class="input">
        <input type="text" placeholder="Имя" v-model="firstName" />
        <user class="icon" />
      </div>
      <div class="input">
        <input type="text" placeholder="Фамилия" v-model="lastName" />
        <user class="icon" />
      </div>
      <div class="input">
        <input type="text" placeholder="Никнейм" v-model="userName" />
        <user class="icon" />
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
    <button type="submit">Зарегистрироваться</button>
    <div class="angle"></div>
  </form>
</template>

<script>
import email from "../../assets/Icons/envelope-regular.svg";
import password from "../../assets/Icons/lock-alt-solid.svg";
import user from "../../assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase/firebaseInit";

export default {
  name: "authRegister",
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      formValidMessage: "",
    };
  },
  computed: {
    isFormValid() {
      return (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.userName !== ""
      );
    },
  },
  methods: {
    async register() {
      if (this.isFormValid) {
        try {
          this.formValidMessage = "";
          const firebaseAuth = await firebase.auth();
          const createUser = await firebaseAuth.createUserWithEmailAndPassword(
            this.email,
            this.password
          );
          const result = await createUser;

          const dataBase = db.collection("users").doc(result.user.uid);
          await dataBase.set({
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
          });

          this.$router.push("/");
          return;
        } catch (e) {
          return (this.formValidMessage = e.message);
        }
      }

      this.formValidMessage = "Пожалуйста, заполните все поля";
    },
  },

  components: { email, password, user },
};
</script>

<style scoped>
h2 {
  max-width: 350px;
}
</style>
