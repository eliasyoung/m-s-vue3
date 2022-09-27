<template>
  <div>
    <section>
      <BaseCard>
        <h2>Register as a coach now!</h2>
        <CoachForm></CoachForm>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import CoachForm from "@/components/coaches/CoachForm.vue";

export default {
  components: {
    CoachForm,
  },
};
</script>

<style lang="less" scoped>


</style>
