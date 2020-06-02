<%_ if (users) { _%>
export default (i18n, admin) => [
<%_ } else { _%>
export default (i18n) => [
<%_ } _%>
  {
    icon: "mdi-view-dashboard",
    text: i18n.t("menu.dashboard"),
    link: "/",
  },
  { divider: true },
  <%_ if (users) { _%>
  admin.getResourceLink("users"),
  <%_ } _%>
];
