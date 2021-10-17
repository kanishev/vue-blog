<template>
  <header>
    <div class="container">
      <nav class="navbar">
        <div class="brand">
          <router-link class="header" to="/">Блог</router-link>
        </div>
        <div class="navbar-list">
          <ul v-show="!mobile">
            <router-link class="link navbar-link" to="/">Домашяя</router-link>
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
                <div class="option">
                  <router-link class="option" to="/profile">
                    <user class="icon" />
                    <p>Профиль</p>
                  </router-link>
                </div>
              </div>
              <div class="options">
                <div class="option" @click="signOut">
                  <signOut class="icon" />
                  <p>Выйти</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <menu-button
      class="menu-btn"
      @click="toggleMobileNavbar"
      v-show="mobile"
    ></menu-button>
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNavbar">
        <router-link class="link" to="/">Домашяя</router-link>
        <router-link class="link" to="/blogs">Блог</router-link>
        <router-link class="link" to="/create">Создать блог</router-link>
        <router-link v-if="!user" class="link" to="/auth">Войти</router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import menuButton from "../assets/Icons/bars-regular.svg";
import User from "../assets/Icons/user-alt-light.svg";
import SignOut from "../assets/Icons/sign-out-alt-regular.svg";

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
      isProfileMenuActive: false,
      mobile: false,
      mobileNavbar: false,
      windowWidth: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
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
  components: {
    menuButton,
    User,
    SignOut,
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);
  z-index: 2;

  .navbar-link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #fdcc21;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .brand {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .navbar-list {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;
        text-decoration: none;
      }

      .profile {
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

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 50px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
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

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }

              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            margin: 15px;

            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px;
                height: auto;
              }

              p {
                font-size: 14px;
                margin-left: 12px;
              }
            }
          }
        }
      }

      .link {
        margin-right: 32px;
      }

      .link:last-child {
        margin-right: 0;
      }
    }
  }

  .menu-btn {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
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

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>
