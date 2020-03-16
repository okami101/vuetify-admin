<template>
  <v-card>
    <va-list
      :fields="['name', 'email', 'active', 'roles', 'created_at', 'updated_at']"
      :filters="[
        'q',
        { source: 'active', type: 'boolean' },
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
          { source: 'active', type: 'boolean', editable: true },
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
        <template v-slot:item.actions.custom="{ resource, item }">
          <impersonate-button
            :resource="resource"
            :item="item"
            icon
          ></impersonate-button>
        </template>
      </va-datagrid>
    </va-list>
  </v-card>
</template>

<script>
import ImpersonateButton from "@/components/Buttons/ImpersonateButton";

export default {
  components: {
    ImpersonateButton
  },
  data() {
    return {
      options: {},
      selected: []
    };
  }
};
</script>
