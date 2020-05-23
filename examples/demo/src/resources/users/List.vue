<template>
  <div>
    <va-aside-layout v-model="asideOpened" :title="asideTitle">
      <users-show v-if="show" :item="item"></users-show>
      <users-form v-else :id="id" :item="item" @saved="onSaved"></users-form>
    </va-aside-layout>
    <base-material-card :icon="resource.icon" :title="title">
      <va-data-iterator
        ref="list"
        :filters="[
          { source: 'active', type: 'boolean' },
          {
            source: 'roles',
            type: 'select',
            attributes: {
              multiple: true,
            },
          },
        ]"
        v-model="selected"
        :options.sync="options"
        disable-create-redirect
        @action="onAction"
      >
        <template v-slot:bulk.actions>
          <va-bulk-action-button
            resource="users"
            v-model="selected"
            :label="$t('users.enable')"
            icon="mdi-publish"
            color="success"
            :action="{ active: true }"
            text
          ></va-bulk-action-button>
          <va-bulk-action-button
            resource="users"
            v-model="selected"
            :label="$t('users.disable')"
            icon="mdi-download"
            color="orange"
            :action="{ active: false }"
            text
          ></va-bulk-action-button>
        </template>
        <template v-slot="props">
          <va-data-table
            :fields="[
              { source: 'name', sortable: true },
              { source: 'email', type: 'email' },
              { source: 'active', type: 'boolean', editable: true },
              'roles',
              {
                source: 'created_at',
                type: 'date',
                sortable: true,
                attributes: {
                  format: 'long',
                },
              },
              {
                source: 'updated_at',
                type: 'date',
                sortable: true,
                attributes: {
                  format: 'long',
                },
              },
            ]"
            v-bind="props"
            v-model="selected"
            :options.sync="options"
            disable-create-redirect
            disable-show-redirect
            disable-edit-redirect
            @item-action="onAction"
          >
            <template v-slot:roles="{ value }">
              <v-chip-group column>
                <v-chip
                  color="yellow"
                  small
                  v-for="(item, i) in value"
                  :key="i"
                >
                  <va-select-field
                    source="roles"
                    :item="item"
                  ></va-select-field>
                </v-chip>
              </v-chip-group>
            </template>
            <template v-slot:item.actions="{ resource, item }">
              <impersonate-button
                :resource="resource"
                :item="item"
                icon
              ></impersonate-button>
            </template>
          </va-data-table>
        </template>
      </va-data-iterator>
    </base-material-card>
  </div>
</template>

<script>
import ImpersonateButton from "@/components/buttons/ImpersonateButton";

export default {
  components: {
    ImpersonateButton,
  },
  props: ["resource", "title"],
  data() {
    return {
      asideOpened: false,
      asideTitle: null,
      id: null,
      item: null,
      show: false,
      options: {},
      selected: [],
    };
  },
  methods: {
    async onAction({ action, title, id, item }) {
      this.asideTitle = title;
      this.id = id;
      this.show = action === "show";
      this.item = item;
      this.asideOpened = true;
    },
    onSaved() {
      this.asideOpened = false;
      this.$refs.list.fetchData();
    },
  },
};
</script>
