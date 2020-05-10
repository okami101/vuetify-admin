<template>
  <div>
    <va-aside v-model="asideOpened" :title="asideTitle">
      <users-show v-if="show" :item="item"></users-show>
      <users-form v-else :id="id" :item="item" @saved="onSaved"></users-form>
    </va-aside>
    <base-material-card :icon="resource.icon" :title="title">
      <va-list
        ref="list"
        :filters="['q']"
        v-model="selected"
        :options.sync="options"
        disable-create-route
        @action="onAction"
      >
        <template v-slot="props">
          <va-datagrid
            :fields="[
              'name',
              { source: 'email', type: 'email' },
              {
                source: 'created_at',
                type: 'date',
                format: 'long',
              },
              {
                source: 'updated_at',
                type: 'date',
                format: 'long',
              },
            ]"
            v-bind="props"
            v-model="selected"
            :options.sync="options"
            disable-show-route
            disable-edit-route
            @item-action="onAction"
          >
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
