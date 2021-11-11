<template>
  <div class="reset-password">
    <div class="form-wrap">
      <form class="reset" @submit.prevent="reset">
        <h2>Сбросить пароль</h2>
        <div class="inputs">
          <div class="validation" v-if="formValidMessage">
            <p>{{ this.formValidMessage }}</p>
          </div>
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
        <button>Сбросить</button>
        <div class="angle"></div>
      </form>
    </div>
  </div>
</template>

<script>
import email from "../../assets/Icons/envelope-regular.svg";

import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "authReset",
  data() {
    return {
      email: "",
      formValidMessage: "",
    };
  },
  computed: {
    isFormValid() {
      return this.email !== "";
    },
  },
  methods: {
    async reset() {
      if (this.isFormValid) {
        this.$emit("toggleLoader", true);
        this.formValidMessage = "";

        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.$emit("toggleLoader", false);
            this.$emit("toggleModal", "Проверьте свою почту");
          })
          .catch((e) => {
            this.formValidMessage = e.message;
            this.$emit("toggleLoader", false);
          });
      } else {
        this.formValidMessage = "Введите корректный email";
      }
    },
  },
  components: { email },
};
</script>

<stylescoped>
.reset-password .reset h2 {
	margin-bottom: 8px;
}
 .reset-password .reset p {
	text-align: center;
	margin-bottom: 12px;
}

</stylescoped>
