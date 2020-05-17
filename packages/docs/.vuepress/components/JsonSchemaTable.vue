<template>
  <table>
    <thead>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </thead>
    <tbody>
      <tr v-for="(property, name) in properties">
        <td><strong>{{ name }}</strong></td>
        <td><code>{{ property.type }}</code></td>
        <td>{{ property.description }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      properties: [],
    }
  },
  async mounted() {
    let response = await fetch(`/schemas/${this.type}.json`);
    let json = await response.json();

    let def = json.definitions[this.definition];

    if (!def) {
      console.warn(`Def ${this.definition} not existing for this schema`);
      return;
    }

    this.properties = def.properties;
  }
}
</script>
