<template>
  <div class="profile">
    <Modal
      v-if="isModalActive"
      :modalText="modalText"
      @closeModal="isModalActive = false"
    />
    <div class="container">
      <h2>Настройки Аккаунта</h2>
      <div class="profile-info">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div class="admin-badge">
          <AdminIcon class="icon" />
          <span>Администратор</span>
        </div>
        <div class="input">
          <label for="firstName">Имя:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Фамилия:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="userName">Никнейм:</label>
          <input type="text" id="userName" v-model="userName" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" />
        </div>
        <button @click="updateInfo">Сохранит изменения</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/AppModal";
import AdminIcon from "../assets/Icons/user-crown-light.svg";

export default {
  name: "profilePage",
  data() {
    return {
      isModalActive: false,
      modalText: "UPDATED",
    };
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },
      set(p) {
        this.$store.commit("changeProfileInfo", ["profileFirstName", p]);
      },
    },
    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },
      set(p) {
        this.$store.commit("changeProfileInfo", ["profileLastName", p]);
      },
    },
    userName: {
      get() {
        return this.$store.state.profileUserName;
      },
      set(p) {
        this.$store.commit("changeProfileInfo", ["profileUserName", p]);
      },
    },
    email() {
      return this.$store.state.profileEmail;
    },
  },
  methods: {
    updateInfo() {
      this.$store.dispatch("updateUserProfile");
      this.isModalActive = true;
    },
  },
  components: { Modal, AdminIcon },
};
</script>

<style scoped>
.profile .container {
  max-width: 1000px;
  padding: 60px 25px;
}
.profile .container h2 {
  text-align: center;
  margin-bottom: 16px;
  font-weight: 300;
  font-size: 32px;
}
.profile .container .profile-info {
  border-radius: 8px;
  box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);
  padding: 32px;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 32px auto;
}
.profile .container .profile-info .initials {
  position: initial;
  width: 80px;
  height: 80px;
  font-size: 32px;
  background-color: #303030;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 50%;
}
.profile .container .profile-info .admin-badge {
  display: flex;
  align-self: center;
  color: #fff;
  font-size: 14px;
  padding: 8px 24px;
  border-radius: 8px;
  background-color: #303030;
  margin: 16px 0;
  text-align: center;
  text-transform: capitalize;
}
.profile .container .profile-info .icon {
  width: 14px;
  height: auto;
  margin-right: 8px;
}
.profile .container .input {
  margin: 16px 0;
}
.profile .container .input label {
  font-size: 14px;
  display: block;
  padding-bottom: 8px;
}
.profile .container .input input {
  width: 100%;
  border: none;
  background-color: #f2f7f6;
  padding: 8px;
  height: 50px;
}
.profile .container .input input:focus {
  outline: none;
}
.profile .container button {
  align-self: center;
}
</style>
