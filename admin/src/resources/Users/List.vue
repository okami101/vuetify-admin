<template>
  <v-card>
    <va-list
      :fields="['name', 'email', 'roles', 'created_at', 'updated_at']"
      :filters="[
        'q',
        {
          source: 'roles',
          type: 'select',
          options: {
            multiple: true,
            enum: true
          }
        }
      ]"
      flat
      v-model="selected"
      :options.sync="options"
      v-slot="props"
    >
      <va-datagrid
        :fields="[
          'name',
          { source: 'email', type: 'email' },
          'roles',
          {
            source: 'created_at',
            type: 'date',
            options: { format: 'long' }
          },
          {
            source: 'updated_at',
            type: 'date',
            options: { format: 'long' }
          }
        ]"
        v-bind="props"
        v-model="selected"
        :options.sync="options"
      >
        <template v-slot:name="{ item, value }">
          <router-link :to="{ name: 'users_show', params: { id: item.id } }">
            {{ value }}
          </router-link>
        </template>
        <template v-slot:roles="{ value }">
          <v-chip-group column>
            <v-chip color="yellow" small v-for="(item, i) in value" :key="i">
              <va-select-field
                source="roles"
                :item="item"
                enum
              ></va-select-field>
            </v-chip>
          </v-chip-group>
        </template>
      </va-datagrid>
    </va-list>
  </v-card>
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
