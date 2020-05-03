<template>
  <div :class="['code-heading', colorClass]">
    <slot />
    <span v-if="path">
      <span class="dot" v-if="type">·</span><i>{{ path }}</i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    path: String,
  },
  computed: {
    colorClass() {
      return this.type ? `code-heading__${this.type}` : "code-heading__default";
    },
  },
};
</script>

<style lang="scss" scoped>
.code-heading {
  width: 100%;
  height: 45px;
  line-height: 40px;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: -20px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  text-align: left;
  padding: 0 20px;
  box-sizing: border-box;
  color: white;

  .dot {
    margin: 0 10px;
  }

  &__bad {
    background-color: #cc0000;

    &::before {
      content: "BAD";
    }
  }

  &__good {
    background-color: #3eaf7c;

    &::before {
      content: "GOOD";
    }
  }

  &__default {
    background-color: #4e6e8e;
  }

  &__nginx {
    background-color: #009639;

    &::before {
      content: "NGINX";
    }
  }

  &__json {
    color: #000000;
    background-color: #F5DA55;

    &::before {
      content: "JSON";
    }
  }

  &__js {
    color: #000000;
    background-color: #F5DA55;

    &::before {
      content: "JS";
    }
  }

  &__php {
    background-color: #8892BF;

    &::before {
      content: "PHP";
    }
  }

  &__env {
    background-color: #000000;

    &::before {
      content: "DOTENV";
    }
  }

  &__sh {
    background-color: #000000;

    &::before {
      content: "SH";
    }
  }

  &__vue {
    background-color: #41B883;

    &::before {
      content: "VUE";
    }
  }

  &__sass {
    background-color: #CF649A;

    &::before {
      content: "SASS";
    }
  }

  &__scss {
    background-color: #CF649A;

    &::before {
      content: "SCSS";
    }
  }

  &__css {
    background-color: #264DE4;

    &::before {
      content: "CSS";
    }
  }

  &__html {
    background-color: #E44D26;

    &::before {
      content: "HTML";
    }
  }
}
</style>
