<template>
  <div class="reset-password">
    <div class="form-wrap">
      <form action="" class="reset">
        <h2>Reset Password</h2>
        <p>Forgot Your Password ? Enter email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email class="icon" />
          </div>
          <p class="auth-text">
            Уже вспомнили пароль?
            <a
              class="router-link"
              href="#"
              @click.prevent="$emit('togglePage', 'Login')"
              >Войти в систему</a
            >
          </p>
        </div>
        <button>Reset</button>
        <div class="angle"></div>
      </form>
    </div>
  </div>
</template>

<script>
import email from "../../assets/Icons/envelope-regular.svg";

export default {
  name: "reset",
  data() {
    return {
      email: null,
    };
  },
  components: { email },
};
</script>

<style lang="scss" scoped>
.reset-password {
  .reset {
    h2 {
      margin-bottom: 8px;
    }

    p {
      text-align: center;
      margin-bottom: 12px;
    }
  }
}
</style>
