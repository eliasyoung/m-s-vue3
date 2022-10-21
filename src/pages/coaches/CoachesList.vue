<template>
  <div>
    <BaseDialog :show="!!error" title="An Error Occurred!" @close="clearError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section><CoachFilter @change-filter="setFilters"></CoachFilter></section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click.native="loadCoaches(true)"
            >Refresh</BaseButton
          >
          <BaseButton link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as Coach</BaseButton
          >
          <BaseButton
            link
            to="/register"
            v-if="isLoggedIn && !isCoach && !isLoading"
            >Register as Coach</BaseButton
          >
        </div>
        <div v-if="isLoading">
          <BaseSpinner></BaseSpinner>
        </div>
        <ul v-else-if="hasCoaches">
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
      isLoading: false,
      error: null,
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
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    setFilters(updateFilters) {
      this.activeFilters = updateFilters;
    },
    loadCoaches(forceRefresh = false) {
      this.isLoading = true;
      this.$store
        .dispatch("coaches/loadCoaches", { forceRefresh })
        .catch((error) => {
          this.error = error || "Something went wrong...";
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    clearError() {
      this.error = null;
    },
  },
  components: {
    CoachItem,
    CoachFilter,
  },
  created() {
    this.loadCoaches();
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
