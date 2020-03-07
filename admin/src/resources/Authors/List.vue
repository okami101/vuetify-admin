<template>
  <va-list
    :fields="['id', 'name']"
    :filters="['q', 'name']"
    v-slot="props"
    v-model="selected"
    :options.sync="options"
  >
    <va-datagrid
      :fields="[
        'id',
        {
          source: 'photo',
          type: 'image',
          options: {
            preview: 'thumbnails.small'
          }
        },
        'name'
      ]"
      row-click="show"
      v-bind="props"
      v-model="selected"
      :options.sync="options"
    ></va-datagrid>
  </va-list>
</template>

<script>
export default {
  data() {
    return {
      options: {},
      selected: []
    };
  }
};
</script>
