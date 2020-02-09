<template>
  <va-page>
    <v-card>
      <v-card-title>
        <v-row class="align-center">
          <v-col sm="auto">
            <va-title :title="title"></va-title>
          </v-col>
          <v-col class="d-flex">
            <v-spacer></v-spacer>
            <slot :id="item.id" name="action">
              <va-list-button></va-list-button>
              <va-edit-button :resource="item"></va-edit-button>
              <va-delete-button
                :resource="item"
                @deleted="$router.push(`/${$route.meta.resource}`)"
              ></va-delete-button>
            </slot>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <slot :id="item.id" name="action">
          <va-list-button></va-list-button>
          <va-edit-button :resource="item"></va-edit-button>
          <va-delete-button
            :resource="item"
            @deleted="$router.push(`/${$route.meta.resource}`)"
          ></va-delete-button>
        </slot>
      </v-card-actions>
    </v-card>
  </va-page>
</template>

<script>
export default {
  name: "Show",
  props: {
    title: [String, Function]
  },
  data() {
    return {
      item: this.$route.meta.model
    };
  }
};
</script>
