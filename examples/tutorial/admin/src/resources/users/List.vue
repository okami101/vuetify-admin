<template>
  <div>
    <va-aside-content v-model="asideOpened" :title="asideTitle">
      <users-show v-if="show" :item="item"></users-show>
      <users-form v-else :id="id" :item="item" @saved="onSaved"></users-form>
    </va-aside-content>
    <base-material-card :icon="resource.icon" :title="title">
      <va-list
        ref="list"
        :filters="['q']"
        v-model="selected"
        :options.sync="options"
        @create="(e) => onAction('create', e)"
      >
        <template v-slot="props">
          <va-data-table
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
            @show="(e) => onAction('show', e)"
            @edit="(e) => onAction('edit', e)"
            @create="(e) => onAction('create', e)"
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
    async onAction(action, { title, id, item }) {
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
