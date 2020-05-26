<template>
  <v-switch
    :false-value="false"
    :true-value="true"
    :input-value="input"
    v-bind="commonProps"
    @change="changeState"
  ></v-switch>
</template>

<script>
import Input from "../../../mixins/input";
import Editable from "../../../mixins/editable";

/**
 * Edit value as boolean. Rendered as a switch.
 */
export default {
  mixins: [Input, Editable],
  props: {
    /**
     * Boolean to be edited.
     * @model
     */
    value: Boolean,
  },
  methods: {
    changeState(value) {
      this.change(value);
      this.update(value);
    },
  },
};
</script>
