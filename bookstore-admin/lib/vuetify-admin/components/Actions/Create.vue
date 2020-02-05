<template>
  <div>
    <h1 class="mb-5 display-1">{{ $route.meta.label }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Create"
};
</script>
