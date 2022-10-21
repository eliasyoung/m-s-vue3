<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <the-header></the-header>
    <transition name="route" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";

export default {
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue != oldValue) this.$router.replace("/coaches");
    },
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch("tryLogin");
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

.route-enter {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-leave,
.route-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
