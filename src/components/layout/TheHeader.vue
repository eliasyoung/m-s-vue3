<template>
  <div>
    <header>
      <nav>
        <h1><router-link to="/">Find a Coach!</router-link></h1>
        <ul>
          <li><router-link to="/coaches">All Coaches</router-link></li>
          <li v-if="isLoggedIn">
            <router-link to="/requests">Requests</router-link>
          </li>
          <li v-else>
            <router-link to="/auth">Login</router-link>
          </li>
          <li v-if="isLoggedIn">
            <BaseButton @click.native="logout">Logout</BaseButton>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      if (this.$route.path != "/coaches") this.$router.replace("/coaches");
    },
  },
};
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
  nav {
    a {
      text-decoration: none;
      color: #f391e3;
      display: inline-block;
      padding: 0.75rem 1.5rem;
      margin: 0;
      border: 1px solid transparent;
      &:hover,
      &:active,
      &.router-link-active {
        border: 1px solid #f391e3;
      }
    }
    h1 {
      margin: 0;
      a {
        color: white;
        margin: 0;
        &:hover,
        &:active,
        &.router-link-active {
          border-color: transparent;
        }
      }
    }
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        margin: 0 0.5rem;
      }
    }
  }
}
</style>
