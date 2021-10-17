<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" to="/home">Блог</router-link>
          <ul>
            <li>
              <a href=""><YouTube class="svg-icon"/></a>
            </li>
            <li>
              <a href=""> <Twitter class="svg-icon" /> </a>
            </li>
            <li>
              <a href=""> <Instagram class="svg-icon" /> </a>
            </li>
            <li>
              <a href=""> <LinkedIn class="svg-icon" /> </a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" to="/home">Домашняя</router-link>
            <router-link class="link" to="/blogs">Посты</router-link>
            <router-link v-if="user" class="link" to="/create"
              >Создать пост</router-link
            >
            <router-link v-if="!user" class="link" to="/auth"
              >Войти / Зарегистрироваться</router-link
            >
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2021 Все права защищены</p>
      </div>
    </div>
  </footer>
</template>

<script>
import YouTube from "../assets/Icons/youtube-brands.svg";
import Twitter from "../assets/Icons/twitter-brands.svg";
import Instagram from "../assets/Icons/instagram-brands.svg";
import LinkedIn from "../assets/Icons/linkedin-brands.svg";

export default {
  name: "theFooter",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  components: { YouTube, Twitter, Instagram, LinkedIn },
};
</script>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;

  .container {
    display: flex;
    flex-direction: column;
    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 32px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }

      .header {
        font-size: 24px;
        color: #fff;
        text-decoration: none;
        font-weight: 600;
      }

      ul {
        display: flex;
        gap: 16px;
        list-style: none;
      }

      .col-1,
      .col-2 {
        display: flex;
        gap: 32px;
        flex: 1;
        @media (min-width: 800px) {
          gap: 0;
        }
      }

      .col-1 {
        flex-direction: column;

        .header {
          text-align: center;
          @media (min-width: 800px) {
            text-align: initial;
          }
        }

        ul {
          margin-top: auto;

          li {
            display: flex;
            align-items: center;

            .svg-icon {
              width: 24px;
              height: auto;
              color: #fff;
            }
          }
        }
      }

      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          @media (min-width: 800px) {
            flex-direction: column;
          }

          .link {
            font-size: 16px;
            font-weight: 500;
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }

    .right {
      gap: 32px;
      color: #fff;
      align-items: center;
      flex-direction: column;
      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }

    p {
      margin-top: auto;
    }
  }
}
</style>
