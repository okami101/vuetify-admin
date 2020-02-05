<template>
  <page-layout>
    <slot></slot>
  </page-layout>
</template>

<script>
import Page from "../../mixins/Page";

export default {
  name: "Create",
  mixins: [Page]
};
</script>
