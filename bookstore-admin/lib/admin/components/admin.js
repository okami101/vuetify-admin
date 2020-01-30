import { VApp, VAppBar, VAppBarNavIcon, VNavigationDrawer } from "vuetify/lib";

export default {
  name: "Admin",
  functional: true,
  render() {
    return (
      <VApp>
        <VNavigationDrawer app clipped value={true}>
          Coucou
        </VNavigationDrawer>
        <VAppBar color="blue darken-3" app dark clipped-left>
          <VAppBarNavIcon vOn:click_stop={alert("ok")}></VAppBarNavIcon>
        </VAppBar>
      </VApp>
    );
  }
};
