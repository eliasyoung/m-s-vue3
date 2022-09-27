<template>
  <div>
    <section><CoachFilter @change-filter="setFilters"></CoachFilter></section>
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
import CoachFilter from "@/components/coaches/CoachFilter.vue";

export default {
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
      });
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
  },
  methods: {
    setFilters(updateFilters) {
      this.activeFilters = updateFilters;
    },
  },
  components: {
    CoachItem,
    CoachFilter,
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
