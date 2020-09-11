<template>
  <div class="d-flex align-center justify-center fill-height">
    <div class="text-center">
      <img
        src="../assets/logo.svg"
        alt="Vuetify Admin"
        width="300"
        height="300"
      />

      <div class="display-4">
        <span v-if="error">
          {{ error.status }}
          {{ error.message }}
        </span>
        <span v-else>404 {{ $t("routes.not_found").toLowerCase() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>
