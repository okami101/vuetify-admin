<template>
  <div>
    <va-aside-layout :title="asideTitle">
      <users-show v-if="show" :item="item"></users-show>
      <users-form v-else :id="id" :item="item" @saved="onSaved"></users-form>
    </va-aside-layout>
    <%_ if (material) { _%>
    <base-material-card :icon="resource.icon" :title="title">
    <%_ } else { _%>
    <v-card>
      <v-card-title>
        <h1 class="display-1">
          {{ title }}
        </h1>
      </v-card-title>
      <v-card-text>
    <%_ } _%>
      <va-list
        ref="list"
        disable-create-redirect
        @action="onAction"
      >
        <va-data-table
          :fields="fields"
          disable-create-redirect
          disable-show-redirect
          disable-edit-redirect
          @item-action="onAction"
        >
          <%_ if (impersonation) { _%>
          <template v-slot:[`item.actions`]="{ resource, item }">
            <impersonate-button
              :resource="resource"
              :item="item"
              icon
            ></impersonate-button>
          </template>
          <%_ } _%>
        </va-data-table>
      </va-list>
    <%_ if (material) { _%>
    </base-material-card>
    <%_ } else { _%>
      </v-card-text>
    </v-card>
    <%_ } _%>
  </div>
</template>

<script>
<%_ if (impersonation) { _%>
import ImpersonateButton from "@/components/buttons/ImpersonateButton";
<%_ } _%>

export default {
  <%_ if (impersonation) { _%>
  components: {
    ImpersonateButton,
  },
  <%_ } _%>
  props: ["resource", "title"],
  data() {
    return {
      fields: [
        { source: "name", sortable: true },
        { source: "email", type: "email" },
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
