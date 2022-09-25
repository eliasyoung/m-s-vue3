<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <the-header></the-header>
    <router-view />
  </div>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
};
</script>

<style lang="less">
// @import url("https://fonts.font.im/css?family=Roboto+Condensed");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto Condensed", sans-serif;

  body {
    margin: 0;
  }
}
</style>
