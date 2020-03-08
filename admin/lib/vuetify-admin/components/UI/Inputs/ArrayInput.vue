<template>
  <va-input v-bind="$props" class="va-array-input">
    <ul v-if="input.length">
      <li v-for="(item, i) in input" :key="i">
        <div>
          <component
            v-for="childInput in getInputs"
            :key="childInput.source"
            :is="`va-${childInput.type}-input`"
            :label="childInput.label"
            v-bind="childInput.options"
            v-model="input[i][childInput.source]"
          ></component>
        </div>
        <v-btn outlined color="red" @click.stop="remove(i)">
          <v-icon small>mdi-minus-circle-outline</v-icon>
          <span class="ml-2">{{ $t("va.actions.remove") }}</span>
        </v-btn>
      </li>
    </ul>
    <v-btn outlined color="green" @click.stop="add">
      <v-icon small>mdi-plus-circle-outline</v-icon>
      <span class="ml-2">{{ $t("va.actions.add") }}</span>
    </v-btn>
  </va-input>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "ArrayInput",
  mixins: [Input],
  props: {
    inputs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getInputs() {
      return this.inputs
        .map(f => {
          return typeof f === "string"
            ? {
                source: f
              }
            : f;
        })
        .map(f => {
          return {
            ...f,
            type: f.type || "text",
            label:
              f.label ||
              this.$t(
                `resources.${this.resource}.fields.${this.source}.${f.source}`
              )
          };
        });
    }
  },
  methods: {
    add() {
      this.input.push({});
    },
    remove(index) {
      this.input.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.va-array-input > ::v-deep .v-input__control > .v-input__slot {
  display: block;
}
.va-array-input > ::v-deep .v-input__control > .v-input__slot > .v-label {
  display: inline-block;
  margin-bottom: 0.5rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;
    border-bottom: solid 1px var(--v-primary-lighten5);
    margin-bottom: 2rem;

    .v-btn {
      margin-left: auto;
    }
  }
}
</style>
