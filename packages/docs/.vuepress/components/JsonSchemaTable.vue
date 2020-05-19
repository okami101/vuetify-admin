<template>
  <table>
    <thead>
      <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="property in properties" :key="property.name">
        <td>
          <strong>{{ property.name }}</strong>
        </td>
        <td>
          <code>{{ property.type }}</code>
        </td>
        <td>{{ property.description }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
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
    };
  },
  async mounted() {
    let { data } = await axios.get(`/schemas/${this.type}.json`);

    let def = get(data.definitions, this.definition);

    if (!def) {
      console.warn(`Def ${this.definition} not existing for this schema`);
      return;
    }

    this.properties = Object.keys(def.properties).map((key) => {
      let props = def.properties[key];

      if (props.$ref) {
        props =
          data.definitions[props.$ref.substr(props.$ref.lastIndexOf("/") + 1)];
      }
      return {
        name: key,
        type: props.type,
        description: props.description,
      };
    });
  },
};
</script>
