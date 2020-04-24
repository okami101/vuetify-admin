export default (i18n, resourceLink) => [
  {
    icon: "mdi-view-dashboard",
    text: i18n.t("menu.dashboard"),
    link: "/",
  },
  { divider: true },
  { heading: i18n.t("menu.bookstore") },
  resourceLink("publishers"),
  resourceLink("authors"),
  resourceLink("books"),
  resourceLink("reviews"),
  { divider: true },
  { heading: i18n.t("menu.other") },
  resourceLink("users"),
  {
    icon: "mdi-settings",
    text: i18n.t("menu.settings"),
    link: "/settings",
    permissions: ["admin"],
  },
  {
    icon: "mdi-message",
    text: i18n.t("menu.feedback"),
    link: "/feedback",
    permissions: ["admin", "editor"],
  },
  { icon: "mdi-help-circle", text: i18n.t("menu.help"), link: "/help" },
];
