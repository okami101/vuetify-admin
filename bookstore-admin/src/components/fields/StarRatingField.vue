<template>
  <span>
    <v-icon small v-for="i in rating" :key="i">mdi-star-circle</v-icon>
  </span>
</template>

<script>
export default {
  name: "StarRatingField",
  props: {
    rating: {
      type: Number,
      required: true
    }
  }
};
</script>
