<template>
  <div>
    <section>FILTER</section>
    <section>
      <div class="controls">
        <button>Refresh</button>
        <router-link to="/register">Register as Coach</router-link>
      </div>
      <ul v-if="hasCoaches">
        <CoachItem
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :id="coach.id"
          :rate="coach.hourlyRate"
        >
        </CoachItem>
      </ul>
      <h3 v-else>THERE IS NO COACHES!!!!!!!!!</h3>
    </section>
  </div>
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem.vue";

export default {
  computed: {
    filteredCoaches() {
      return this.$store.getters["coaches/coaches"];
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
  },
  components: {
    CoachItem,
  },
};
</script>

<style lang="less" scoped></style>
