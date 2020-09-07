<template>
  <div>
    <va-aside-layout :title="asideTitle">
      <users-show v-if="show" :item="item"></users-show>
      <users-form v-else :id="id" :item="item" @saved="onSaved"></users-form>
    </va-aside-layout>
    <base-material-card :icon="resource.icon" :title="title">
      <va-list
        ref="list"
        :filters="filters"
        disable-create-redirect
        @action="onAction"
      >
        <template v-slot:[`bulk.actions`]>
          <va-bulk-action-button
            :label="$t('users.enable')"
            icon="mdi-publish"
            color="success"
            :action="{ active: true }"
            text
          ></va-bulk-action-button>
          <va-bulk-action-button
            :label="$t('users.disable')"
            icon="mdi-download"
            color="orange"
            :action="{ active: false }"
            text
          ></va-bulk-action-button>
        </template>
        <va-data-table
          :fields="fields"
          disable-create-redirect
          disable-show-redirect
          disable-edit-redirect
          @item-action="onAction"
        >
          <template v-slot:[`field.roles`]="{ value }">
            <v-chip-group column>
              <v-chip color="yellow" small v-for="(item, i) in value" :key="i">
                <va-select-field source="roles" :item="item"></va-select-field>
              </v-chip>
            </v-chip-group>
          </template>
          <template v-slot:[`item.actions`]="{ resource, item }">
            <impersonate-button
              :resource="resource"
              :item="item"
              icon
            ></impersonate-button>
          </template>
        </va-data-table>
      </va-list>
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
      filters: [
        { source: "active", type: "boolean" },
        {
          source: "roles",
          type: "select",
          attributes: {
            multiple: true,
          },
        },
      ],
      fields: [
        { source: "name", sortable: true },
        { source: "email", type: "email" },
        { source: "active", type: "boolean", editable: true },
        "roles",
        {
          source: "created_at",
          type: "date",
          sortable: true,
        },
        {
          source: "updated_at",
          type: "date",
          sortable: true,
        },
      ],
      asideTitle: null,
      id: null,
      item: null,
      show: false,
    };
  },
  methods: {
    async onAction({ action, title, id, item }) {
      this.asideTitle = title;
      this.id = id;
      this.show = action === "show";
      this.item = item;
    },
    onSaved() {
      this.asideTitle = null;
      this.$refs.list.fetchData();
    },
  },
};
</script>
