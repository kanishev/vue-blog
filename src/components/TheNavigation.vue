<template>
  <header>
    <div class="container">
      <nav class="navbar">
        <div class="brand">
          <router-link class="header" to="/">Блог</router-link>
        </div>
        <div class="navbar-list">
          <ul v-show="!mobile">
            <router-link class="link" to="/">Домашяя</router-link>
            <router-link class="link" to="/blogs">Блог</router-link>
            <router-link class="link" to="/create">Создать блог</router-link>
            <router-link class="link" to="/auth">Войти</router-link>
          </ul>
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
        <router-link class="link" to="/auth">Войти</router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import menuButton from "../assets/Icons/bars-regular.svg";

export default {
  name: "navigation",
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  data() {
    return {
      mobile: false,
      mobileNavbar: false,
      windowWidth: false,
    };
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

    toggleMobileNavbar() {
      this.mobileNavbar = !this.mobileNavbar;
    },
  },
  components: {
    menuButton,
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.08);
  z-index: 2;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #7b68ee;
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
