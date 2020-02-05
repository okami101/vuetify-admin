<template>
  <div>
    <h1 class="mb-5 display-1">{{ $route.meta.label }}</h1>
    <slot></slot>
  </div>
</template>

<script>
import Page from "../../mixins/Page";

export default {
  name: "Create",
  mixins: [Page]
};
</script>
