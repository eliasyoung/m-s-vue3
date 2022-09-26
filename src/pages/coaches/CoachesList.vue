<template>
  <div>
    <section>FILTER</section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline">Refresh</BaseButton>
          <BaseButton link to="/register">Register as Coach</BaseButton>
        </div>
        <ul v-if="hasCoaches">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :id="coach.id"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          >
          </CoachItem>
        </ul>
        <h3 v-else>THERE IS NO COACHES!!!!!!!!!</h3>
      </BaseCard>
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

<style lang="less" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
