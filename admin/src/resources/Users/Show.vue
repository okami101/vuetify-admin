<template>
  <va-show>
    <template v-slot:actions>
      <impersonate-button :item="item"></impersonate-button>
    </template>
    <v-row justify="center">
      <v-col lg="2">
        <v-card>
          <v-card-text>
            <va-field source="name"></va-field>
            <va-field source="email"></va-field>
            <va-field source="active" type="boolean"></va-field>
            <va-field source="roles" v-slot="{ value }">
              <v-chip-group>
                <v-chip v-for="(item, i) in value" :key="i">
                  <va-select-field
                    source="roles"
                    :item="item"
                    enum
                  ></va-select-field>
                </v-chip>
              </v-chip-group>
            </va-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </va-show>
</template>

<script>
import ImpersonateButton from "@/components/Buttons/ImpersonateButton";

export default {
  components: {
    ImpersonateButton
  },
  props: {
    item: Object
  }
};
</script>
