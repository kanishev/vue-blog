<template>
  <form action="" class="login">
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

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      page: "Login",
    };
  },
  components: { email, password },
};
</script>

<style></style>
