<script>
import resourceCrudApi from "vuetify-admin/store/resource";

export default {
  name: "Resource",
  props: {
    name: {
      type: String,
      required: true
    },
    only: {
      type: Array,
      default: () => []
    },
    except: {
      type: Array,
      default: () => []
    },
    dataProvider: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    let store = this.$store;
    let router = this.$router;
    let i18n = this.$i18n;
    let dataProvider = this.dataProvider || this.$parent.$parent.dataProvider;

    let resource = this.name;
    let actions = ["list", "show", "create", "edit", "delete"].filter(a => {
      if (this.only.length) {
        return this.only.includes(a);
      }

      if (this.except.length) {
        return !this.except.includes(a);
      }

      return true;
    });
    let permissions = store.getters["auth/getPermissions"];

    /**
     * Register data api module for this resource
     */
    store.registerModule(
      resource,
      resourceCrudApi(dataProvider, resource, actions)
    );

    /**
     * Default props for all crud routes
     */
    const props = {
      permissions,
      resource
    };

    /**
     * Route item component builder (edit and show)
     */
    const itemComponent = action => {
      return {
        render(c) {
          return c(`${resource}-${action}`);
        },
        async beforeRouteEnter(to, from, next) {
          /**
           * Route model binding
           */
          let { data } = await store.dispatch("api/getOne", {
            resource,
            params: {
              id: to.params.id
            }
          });

          /**
           * Insert model into resource store
           */
          store.commit(`${resource}/setItem`, data);
          next();
        },
        beforeRouteLeave(to, from, next) {
          store.commit(`${resource}/removeItem`);
          next();
        }
      };
    };

    /**
     * Action route builder
     */
    const buildRoute = (action, path, item = false) => {
      return {
        path,
        name: `${resource}_${action}`,
        component: item
          ? itemComponent(action)
          : {
              render(c) {
                return c(`${resource}-${action}`);
              }
            },
        meta: {
          resource
        },
        beforeEnter: (to, from, next) => {
          /**
           * Build default main title
           */
          to.meta.title = i18n.t(`va.pages.${action}`, {
            resource: i18n
              .tc(`resources.${resource}.name`, action === "list" ? 10 : 1)
              .toLowerCase(),
            id: to.params.id
          });
          next();
        }
      };
    };

    /**
     * Register crud routes for this resource
     */
    const routes = [
      { action: "list", path: "/", item: false },
      { action: "create", path: "create", item: false },
      { action: "show", path: ":id", item: true },
      { action: "edit", path: ":id/edit", item: true }
    ];

    /**
     * Add routes dynamically
     */
    router.addRoutes([
      {
        path: `/${resource}`,
        component: {
          render(c) {
            return c("router-view");
          }
        },
        meta: {
          title: i18n.tc(`resources.${resource}.name`, 10)
        },
        children: routes
          .filter(({ action }) => actions.includes(action))
          .map(({ action, path, item }) => buildRoute(action, path, item))
      }
    ]);
  },
  render(c) {
    return null;
  }
};
</script>
