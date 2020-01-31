<template>
  <Admin title="Bookstore Admin" :menu="menu"></Admin>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    menu: [
      { icon: "mdi-view-dashboard", text: "Dashboard", link: "/" },
      { divider: true },
      { heading: "Bookstore" },
      {
        icon: "mdi-book",
        text: "Books",
        expanded: true,
        children: [
          { icon: "mdi-view-list", text: "List", link: "/books" },
          { icon: "mdi-plus", text: "Create book", link: "/books/create" }
        ]
      },
      { icon: "mdi-comment", text: "Reviews", link: "/reviews" },
      { divider: true },
      { heading: "Contacts" },
      { icon: "mdi-contacts", text: "Contacts", link: "/contacts" },
      { icon: "mdi-history", text: "Frequently contacted" },
      { divider: true },
      { icon: "mdi-content-copy", text: "Duplicates" },
      {
        icon: "mdi-text",
        text: "Labels",
        children: [{ icon: "mdi-plus", text: "Create label" }]
      },
      {
        icon: "mdi-more",
        text: "More",
        children: [
          { text: "Import" },
          { text: "Export" },
          { text: "Print" },
          { text: "Undo changes" },
          { text: "Other contacts" }
        ]
      },
      { divider: true },
      { heading: "Other" },
      { icon: "mdi-settings", text: "Settings", link: "/settings" },
      { icon: "mdi-message", text: "Send feedback", link: "/feedback" },
      { icon: "mdi-help-circle", text: "Help", link: "/help" }
    ]
  })
};
</script>
