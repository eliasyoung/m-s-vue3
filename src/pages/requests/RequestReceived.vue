<template>
  <div>
    <BaseDialog :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <BaseCard>
        <header>
          <h2>Requests Received</h2>
        </header>
        <BaseSpinner v-if="isLoading"></BaseSpinner>
        <ul v-else-if="hasRequests">
          <RequestItem
            v-for="request in receivedRequests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.message"
          ></RequestItem>
        </ul>
        <h3 v-else>You havent received any requests yet.</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import RequestItem from "@/components/requests/RequestItem.vue";

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return !this.isLoading && this.$store.getters["requests/hasRequests"];
    },
  },
  methods: {
    fetchRequests() {
      this.isLoading = true;
      this.$store
        .dispatch("requests/fetchRequest")
        .catch((rej) => {
          this.error = rej;
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.fetchRequests();
  },
  components: {
    RequestItem,
  },
};
</script>

<style lang="less" scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
