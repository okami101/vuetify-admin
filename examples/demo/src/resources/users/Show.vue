<template>
  <va-show :item="item">
    <va-field source="name"></va-field>
    <va-field source="email"></va-field>
    <va-field source="active" type="boolean"></va-field>
    <va-field source="roles" v-slot="{ value }">
      <v-chip-group>
        <v-chip v-for="(item, i) in value" :key="i">
          <va-select-field source="roles" :item="item"></va-select-field>
        </v-chip>
      </v-chip-group>
    </va-field>
    <va-field
      source="publishers"
      v-slot="{ value }"
      v-if="item && item.roles.includes('editor')"
    >
      <v-chip-group>
        <v-chip v-for="(item, i) in value" :key="i">
          {{ item.name }}
        </v-chip>
      </v-chip-group>
    </va-field>
    <va-field
      source="authors"
      v-slot="{ value }"
      v-if="item && item.roles.includes('author')"
    >
      <v-chip-group>
        <v-chip v-for="(item, i) in value" :key="i">
          {{ item.name }}
        </v-chip>
      </v-chip-group>
    </va-field>
  </va-show>
</template>

<script>
export default {
  props: ["item"],
};
</script>
