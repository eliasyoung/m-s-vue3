<template>
  <div>
    <BaseCard>
      <h2>Page not found</h2>
      <p>
        this page could not be found - maybe check out all our
        <router-link to="/coaches">coaches.</router-link>
      </p>
    </BaseCard>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="less" scoped></style>
