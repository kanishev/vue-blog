<template>
  <div class="app">
    <the-navigation></the-navigation>
    <router-view />
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "../components/TheFooter.vue";
import TheNavigation from "../components/TheNavigation.vue";
export default {
  name: "mainLayout",
  components: { TheFooter, TheNavigation },
};
</script>

<style></style>
