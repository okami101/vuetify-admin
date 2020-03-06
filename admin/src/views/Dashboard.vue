<template>
  <div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
