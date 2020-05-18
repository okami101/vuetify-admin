<template>
  <a :href="`mailto:${value}`">{{ value }}</a>
</template>

<script>
import Field from "../../../mixins/field";

export default {
    mixins: [Field],
};
</script>
