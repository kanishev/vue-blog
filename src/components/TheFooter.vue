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

<style scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;
}
footer .container {
  display: flex;
  flex-direction: column;
}
@media (min-width: 800px) {
  footer .container {
    flex-direction: row;
    gap: 0;
  }
}
footer .container > div {
  display: flex;
  flex: 1;
}
footer .container .left {
  gap: 32px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}
@media (min-width: 800px) {
  footer .container .left {
    flex-direction: row;
    align-items: initial;
    gap: 0;
  }
}
footer .container .left .header {
  font-size: 24px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}
footer .container .left ul {
  display: flex;
  gap: 16px;
  list-style: none;
}
footer .container .left .col-1,
footer .container .left .col-2 {
  display: flex;
  gap: 32px;
  flex: 1;
}
@media (min-width: 800px) {
  footer .container .left .col-1,
  footer .container .left .col-2 {
    gap: 0;
  }
}
footer .container .left .col-1 {
  flex-direction: column;
}
footer .container .left .col-1 .header {
  text-align: center;
}
@media (min-width: 800px) {
  footer .container .left .col-1 .header {
    text-align: initial;
  }
}
footer .container .left .col-1 ul {
  margin-top: auto;
}
footer .container .left .col-1 ul li {
  display: flex;
  align-items: center;
}
footer .container .left .col-1 ul li .svg-icon {
  width: 32px;
  height: auto;
  color: #fff;
}
footer .container .left .col-2 ul {
  height: 100%;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
@media (min-width: 800px) {
  footer .container .left .col-2 ul {
    flex-direction: column;
  }
}
footer .container .left .col-2 ul .link {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
}
footer .container .left .col-2 ul .link:hover {
  color: #fdcc21;
}
footer .container .right {
  gap: 32px;
  color: #fff;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
@media (min-width: 800px) {
  footer .container .right {
    align-items: flex-end;
    gap: 0;
  }
}
footer .container .site {
  font-size: 21px;
  color: #fff;
}
footer .container .site:hover {
  color: #fdcc21;
}
footer .container p {
  margin-top: auto;
}
</style>
