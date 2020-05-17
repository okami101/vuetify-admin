<template>
  <table>
    <thead>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </thead>
    <tbody>
      <tr v-for="property in properties" :key="property.name">
        <td><strong>{{ property.name }}</strong></td>
        <td><code>{{ property.type }}</code></td>
        <td>{{ property.description }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import get from "lodash/get";

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

    let def = get(json.definitions, this.definition);

    if (!def) {
      console.warn(`Def ${this.definition} not existing for this schema`);
      return;
    }

    this.properties = Object.keys(def.properties).map((key) => {
      let props = def.properties[key];

      if (props.$ref) {
        props = json.definitions[props.$ref.substr(props.$ref.lastIndexOf('/') + 1)];
      }
      return {
        name: key,
        type: props.type,
        description: props.description,
      };
    });
  }
}
</script>
