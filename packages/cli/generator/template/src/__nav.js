export default (i18n, resourceLink) => [
  {
    icon: "mdi-view-dashboard",
    text: i18n.t("menu.dashboard"),
    link: "/",
  },
  { divider: true },
  resourceLink("users"),
];
