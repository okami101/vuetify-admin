<template>
  <va-form>
    <v-card>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <va-form-save></va-form-save>
    </v-card>
  </va-form>
</template>

<script>
export default {
  name: "SimpleForm"
};
</script>
