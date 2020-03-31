<template>
  <div>
    <va-aside v-model="asideOpened" :title="asideTitle">
      <users-show v-if="show" :item="item"></users-show>
      <users-form v-else :id="id" :item="item" @saved="onSaved"></users-form>
    </va-aside>
    <base-material-card icon="mdi-account" :title="title">
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
        @create="onAction('create')"
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
            v-bind="props"
            v-model="selected"
            :options.sync="options"
            disable-show-route
            disable-edit-route
            @show="(item) => onAction('show', item)"
            @edit="(item) => onAction('edit', item)"
            @clone="(item) => onAction('create', item)"
          >
            <template v-slot:name="{ item, value }">
              {{ value }}
            </template>
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
import { mapActions } from "vuex";

export default {
  components: {
    UsersShow,
    UsersForm,
    ImpersonateButton,
  },
  props: ["title"],
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
    ...mapActions({
      getOne: "api/getOne",
    }),
    async onAction(action, item = null) {
      let titleKey = `resources.users.titles.${action}`;
      let hasItem = ["show", "edit"].includes(action);

      this.asideTitle = hasItem
        ? `${this.$t(titleKey, item)} #${item.id}`
        : this.$t(titleKey);
      this.id = hasItem ? item.id : null;
      this.show = action === "show";

      if (item) {
        let { data } = await this.getOne({
          resource: "users",
          params: { id: item.id },
        });
        this.item = data;
      } else {
        this.item = null;
      }
      this.asideOpened = true;
    },
    onSaved() {
      this.asideOpened = false;
      this.$refs.list.fetchData();
    },
  },
};
</script>
