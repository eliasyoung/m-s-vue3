<template>
  <div>
    <section>
      <BaseCard>
        <h2>Register as a coach now!</h2>
        <CoachForm @save-data="saveData"></CoachForm>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import CoachForm from "@/components/coaches/CoachForm.vue";

export default {
  methods: {
    saveData(formData) {
      this.$store.dispatch("coaches/registerCoach", formData);
      this.$router.replace("/coaches");
    },
  },
  components: {
    CoachForm,
  },
};
</script>

<style lang="less" scoped></style>
