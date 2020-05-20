<template>
  <va-input v-bind="$props" class="va-array-input" v-if="input">
    <draggable
      v-if="input.length"
      :value="input"
      draggable=".item"
      handle=".handle"
      @input="update"
    >
      <div v-for="(item, i) in input" :key="item[trackedBy]" class="item">
        <slot
          :resource="resource"
          :item="item"
          :parent-source="source"
          :index="i"
        ></slot>
        <div class="d-flex">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn outlined icon text v-on="on" class="handle">
                <v-icon small>mdi-cursor-move</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("va.actions.move") }}</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-btn outlined color="red" @click.stop="remove(i)">
            <v-icon small>mdi-minus-circle-outline</v-icon>
            <span class="ml-2">{{ $t("va.actions.remove") }}</span>
          </v-btn>
        </div>
      </div>
      <v-btn slot="footer" outlined color="green" @click.stop="add">
        <v-icon small>mdi-plus-circle-outline</v-icon>
        <span class="ml-2">{{ $t("va.actions.add") }}</span>
      </v-btn>
    </draggable>
  </va-input>
</template>

<script>
import Input from "../../../mixins/input";

export default {
  mixins: [Input],
  props: {
    /**
     * Object property to use as key tracking.
     */
    trackedBy: {
      type: String,
      default: "id",
    },
  },
  methods: {
    add() {
      this.input.push({});
      this.update(this.input);
    },
    remove(index) {
      this.input.splice(index, 1);
      this.update(this.input);
    },
  },
};
</script>

<style>
.va-array-input > .v-input__control > .v-input__slot {
  display: block;
}
.va-array-input > .v-input__control > .v-input__slot > .v-label {
  display: inline-block;
  margin-bottom: 0.5rem;
}

.item {
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  border-bottom: solid 1px var(--v-primary-lighten5);
  margin-bottom: 2rem;
}
</style>
