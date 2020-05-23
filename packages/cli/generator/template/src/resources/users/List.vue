<template>
  <div>
    <va-aside-layout v-model="asideOpened" :title="asideTitle">
      <users-show v-if="show" :item="item"></users-show>
      <users-form v-else :id="id" :item="item" @saved="onSaved"></users-form>
    </va-aside-layout>
    <base-material-card :icon="resource.icon" :title="title">
      <va-data-iterator
        ref="list"
        v-model="selected"
        :options.sync="options"
        disable-create-redirect
        @action="onAction"
      >
        <template v-slot="props">
          <va-data-table
            :fields="[
              { source: 'name', sortable: true },
              { source: 'email', type: 'email' },
              {
                source: 'created_at',
                type: 'date',
                format: 'long',
                sortable: true,
              },
              {
                source: 'updated_at',
                type: 'date',
                format: 'long',
                sortable: true,
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
