<template>
  <div>
    <va-field source="name" :item="item"></va-field>
    <va-field source="email" :item="item"></va-field>
    <va-field source="active" type="boolean" :item="item"></va-field>
    <va-field source="roles" v-slot="{ value }" :item="item">
      <v-chip-group>
        <v-chip v-for="(item, i) in value" :key="i">
          <va-select-field source="roles" :item="item" enum></va-select-field>
        </v-chip>
      </v-chip-group>
    </va-field>
    <va-field
      source="publishers"
      v-slot="{ value }"
      v-if="item && item.roles.includes('editor')"
      :item="item"
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
      :item="item"
    >
      <v-chip-group>
        <v-chip v-for="(item, i) in value" :key="i">
          {{ item.name }}
        </v-chip>
      </v-chip-group>
    </va-field>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>
