/* eslint-disable no-unused-vars */

export default (i18n, admin) => [
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
