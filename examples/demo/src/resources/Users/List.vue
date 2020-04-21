<template>
  <div>
    <va-aside v-model="asideOpened" :title="asideTitle">
      <users-show v-if="show" :item="item"></users-show>
      <users-form v-else :id="id" :item="item" @saved="onSaved"></users-form>
    </va-aside>
    <base-material-card :icon="resource.icon" :title="title">
      <va-list
        ref="list"
        :fields="[
          'name',
          'email',
          'active',
          'roles',
          'created_at',
          'updated_at',
        ]"
        :filters="[
          'q',
          { source: 'active', type: 'boolean' },
          {
            source: 'roles',
            type: 'select',
            options: {
              multiple: true,
              enum: true,
            },
          },
        ]"
        v-model="selected"
        :options.sync="options"
        disable-create-route
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
            show-label
            text
          ></va-bulk-action-button>
          <va-bulk-action-button
            resource="users"
            v-model="selected"
            :label="$t('users.disable')"
            icon="mdi-download"
            color="orange"
            :action="{ active: false }"
            show-label
            text
          ></va-bulk-action-button>
        </template>
        <template v-slot="props">
          <va-datagrid
            :fields="[
              'name',
              { source: 'email', type: 'email' },
              { source: 'active', type: 'boolean', editable: true },
              'roles',
              {
                source: 'created_at',
                type: 'date',
                options: { format: 'long' },
              },
              {
                source: 'updated_at',
                type: 'date',
                options: { format: 'long' },
              },
            ]"
            :sortables="['name', 'created_at', 'updated_at']"
            v-bind="props"
            v-model="selected"
            :options.sync="options"
            disable-show-route
            disable-edit-route
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
                    enum
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
          </va-datagrid>
        </template>
      </va-list>
    </base-material-card>
  </div>
</template>

<script>
import UsersShow from "./Show";
import UsersForm from "./Form";
import ImpersonateButton from "@/components/Buttons/ImpersonateButton";

export default {
  components: {
    UsersShow,
    UsersForm,
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
