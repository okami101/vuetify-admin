export default (i18n, admin) => [
  {
    icon: "mdi-view-dashboard",
    text: i18n.t("menu.dashboard"),
    link: "/",
  },
  { divider: true },
  { heading: i18n.t("menu.bookstore") },
  ...admin.getResourceLinks([
    "publishers",
    "authors",
    "categories",
    "books",
    "reviews",
  ]),
  { divider: true },
  { heading: i18n.t("menu.other") },
  admin.getResourceLink("users"),
  admin.can(["admin"]) && {
    icon: "mdi-settings",
    text: i18n.t("menu.settings"),
    link: "/settings",
  },
  admin.can(["admin", "editor"]) && {
    icon: "mdi-message",
    text: i18n.t("menu.feedback"),
    link: "/feedback",
  },
  { icon: "mdi-help-circle", text: i18n.t("menu.help"), link: "/help" },
];
