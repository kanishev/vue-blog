<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" to="/home">Блог</router-link>
          <ul>
            <li>
              <a href="https://t.me/chasti4ka_designer"
                ><Telegram class="svg-icon"
              /></a>
            </li>
            <li>
              <a href="https://wa.me/79221184640">
                <Whatsapp class="svg-icon" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/chastichka_designer">
                <Instagram class="svg-icon" />
              </a>
            </li>
            <li>
              <a href="https://www.behance.net/darimabolte6f1">
                <Behance class="svg-icon" />
              </a>
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
        <a class="site link" href="https://chastichkadesign.ru" target="_blank"
          >chastichkadesign.ru</a
        >
        <p>Copyright 2021 Все права защищены</p>
      </div>
    </div>
  </footer>
</template>

<script>
import Telegram from "../assets/Icons/telegram.svg";
import Whatsapp from "../assets/Icons/whatsapp.svg";
import Instagram from "../assets/Icons/instagram.svg";
import Behance from "../assets/Icons/behance.svg";

export default {
  name: "theFooter",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  components: { Telegram, Whatsapp, Instagram, Behance },
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
      margin-bottom: 32px;
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
              width: 32px;
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

            &:hover {
              color: #fdcc21;
            }
          }
        }
      }
    }

    .right {
      gap: 32px;
      color: #fff;
      align-items: center;
      flex-direction: column;
      text-align: center;
      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }

    .site {
      font-size: 21px;
      color: #fff;

      &:hover {
        color: #fdcc21;
      }
    }

    p {
      margin-top: auto;
    }
  }
}
</style>
