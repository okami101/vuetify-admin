<template>
  <div>
    {{ selected }}
    <va-treeview
      :items="items"
      v-model="items"
      open-all
      selectable
      dense
      draggable
    ></va-treeview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      items: [
        {
          id: 1,
          name: "Applications",
          children: [
            { id: 2, name: "Calendar app", children: [] },
            { id: 3, name: "Chrome app", children: [] },
            { id: 4, name: "Webstorm app", children: [] },
          ],
        },
        {
          id: 5,
          name: "Documents",
          children: [
            {
              id: 6,
              name: "vuetify",
              children: [
                {
                  id: 7,
                  name: "src",
                  children: [
                    { id: 8, name: "index ts", children: [] },
                    { id: 9, name: "bootstrap ts", children: [] },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: "material2",
              children: [
                {
                  id: 11,
                  name: "src",
                  children: [
                    { id: 12, name: "v-btn ts", children: [] },
                    { id: 13, name: "v-card ts", children: [] },
                    { id: 14, name: "v-window ts", children: [] },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          name: "Downloads",
          children: [
            { id: 16, name: "October pdf", children: [] },
            { id: 17, name: "November pdf", children: [] },
            { id: 18, name: "Tutorial html", children: [] },
          ],
        },
        {
          id: 19,
          name: "Videos",
          children: [
            {
              id: 20,
              name: "Tutorials",
              children: [
                { id: 21, name: "Basic layouts mp4", children: [] },
                { id: 22, name: "Advanced techniques mp4", children: [] },
                { id: 23, name: "All about app dir", children: [] },
              ],
            },
            { id: 24, name: "Intro mov", children: [] },
            { id: 25, name: "Conference introduction avi", children: [] },
          ],
        },
      ],
    };
  },
};
</script>
