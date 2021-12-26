<template>
  <header>
    <div class="container">
      <nav class="navbar">
        <div class="brand">
          <router-link class="header" to="/">Блог</router-link>
        </div>
        <div class="navbar-list">
          <ul v-show="!mobile">
            <router-link class="link navbar-link" to="/">Домашняя</router-link>

            <router-link class="link navbar-link" to="/blogs"
              >Посты</router-link
            >
            <router-link class="link navbar-link" to="/create"
              >Создать блог</router-link
            >
            <router-link v-if="!user" class="link navbar-link" to="/auth"
              >Войти</router-link
            >
          </ul>
          <div
            v-if="user"
            class="profile"
            ref="profile"
            @click="toggleProfileMenu"
          >
            <span>{{ this.$store.state.profileInitials }}</span>
            <div class="profile-menu" v-show="isProfileMenuActive">
              <div class="info">
                <p class="initials">{{ this.$store.state.profileInitials }}</p>
                <div class="right">
                  <p>
                    {{ this.$store.state.profileFirstName }}
                    {{ this.$store.state.profileLastName }}
                  </p>
                  <p>
                    {{ this.$store.state.profileUsername }}
                  </p>
                  <p>
                    {{ this.$store.state.profileEmail }}
                  </p>
                </div>
              </div>
              <div class="options">
                <router-link class="option" to="/profile">
                  <div class="option">
                    <userIcon class="icon" />
                    <p>Профиль</p>
                  </div>
                </router-link>
              </div>
              <div class="options">
                <div class="option" @click="signOut">
                  <signOutIcon class="icon" />
                  <p>Выйти</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <menuButtonIcon
      class="menu-btn"
      @click="toggleMobileNavbar"
      v-show="mobile"
    />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNavbar">
        <router-link @click.native="closeMobile" class="link" to="/"
          >Домашяя</router-link
        >
        <router-link @click.native="closeMobile" class="link" to="/profile"
          >Профиль</router-link
        >
        <router-link @click.native="closeMobile" class="link" to="/blogs"
          >Блог</router-link
        >
        <router-link @click.native="closeMobile" class="link" to="/create"
          >Создать блог</router-link
        >
        <router-link
          @click.native="closeMobile"
          v-if="!user"
          class="link"
          to="/auth"
          >Войти</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import menuButtonIcon from "../assets/Icons/bars-regular.svg";
import UserIcon from "../assets/Icons/user-alt-light.svg";
import SignOutIcon from "../assets/Icons/sign-out-alt-regular.svg";

import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "theNavigation",
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  data() {
    return {
      mobile: false,
      mobileNavbar: false,
      windowWidth: false,
      isProfileMenuActive: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    closeMobile() {
      this.mobileNavbar = false;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;

      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }

      this.mobile = false;
      this.mobileNavbar = false;

      return;
    },
    signOut() {
      firebase.auth().signOut();
      window.location.reload();
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.isProfileMenuActive = !this.isProfileMenuActive;
      }
    },
    toggleMobileNavbar() {
      this.mobileNavbar = !this.mobileNavbar;
    },
  },
  watch: {
    $route() {
      this.isProfileMenuActive = false;
    },
  },
  components: {
    menuButtonIcon,
    UserIcon,
    SignOutIcon,
  },
};
</script>

<style scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);
  z-index: 2;
}
header .navbar-link {
  font-weight: 500;
  padding: 0 8px;
  transition: 0.3s color ease;
}
header .navbar-link:hover {
  color: #fdcc21;
}
header nav {
  display: flex;
  padding: 25px 0;
}
header nav .brand {
  display: flex;
  align-items: center;
}
header nav .brand .header {
  font-weight: 600;
  font-size: 24px;
  color: #000;
  text-decoration: none;
}
header nav .navbar-list {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
}
header nav .navbar-list ul {
  margin-right: 32px;
  text-decoration: none;
}
header nav .navbar-list .profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: #303030;
}
@media (max-width: 750px) {
  header nav .navbar-list .profile {
    display: none;
  }
}
header nav .navbar-list .profile span {
  pointer-events: none;
}
header nav .navbar-list .profile .profile-menu {
  position: absolute;
  top: 50px;
  right: 0;
  width: 250px;
  background-color: #303030;
  box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);
}
header nav .navbar-list .profile .profile-menu .info {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #fff;
}
header nav .navbar-list .profile .profile-menu .info .initials {
  position: initial;
  width: 40px;
  height: 40px;
  background-color: #fff;
  color: #303030;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
header nav .navbar-list .profile .profile-menu .info .right {
  flex: 1;
  margin-left: 24px;
}
header nav .navbar-list .profile .profile-menu .info .right p:nth-child(1) {
  font-size: 14px;
}
header nav .navbar-list .profile .profile-menu .info .right p:nth-child(2),
header nav .navbar-list .profile .profile-menu .info .right p:nth-child(3) {
  font-size: 12px;
}
header nav .navbar-list .profile .profile-menu .options {
  margin: 15px;
}
header nav .navbar-list .profile .profile-menu .options .option {
  display: flex;
  text-decoration: none;
  color: #fff;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
}
header nav .navbar-list .profile .profile-menu .options .option .icon {
  width: 18px;
  height: auto;
}
header nav .navbar-list .profile .profile-menu .options .option p {
  font-size: 14px;
  margin-left: 12px;
}
header nav .navbar-list .link {
  margin-right: 32px;
}
header nav .navbar-list .link:last-child {
  margin-right: 0;
}
header .menu-btn {
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 25px;
  height: 25px;
  width: auto;
}
header .mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;
}
header .mobile-nav .link {
  padding: 15px 0;
  color: #fff;
}
header .mobile-nav-enter-active,
header .mobile-nav-leave-active {
  transition: all 1s ease;
}
header .mobile-nav-enter {
  transform: translateX(-250px);
}
header .mobile-nav-enter-to {
  transform: translateX(0);
}
header .mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
