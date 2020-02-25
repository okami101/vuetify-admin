<script>
import resourceCrudApi from "vuetify-admin/store/resource";

let actions = ["list", "show", "create", "edit", "delete"];

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
    }
  },
  async created() {
    let resource = this.name;
    let store = this.$store;
    let permissions = store.getters["auth/getPermissions"];

    /**
     * Register data api module for this resource
     */
    store.registerModule(
      resource,
      resourceCrudApi(
        this.$parent.$parent.$props.dataProvider,
        resource,
        this.authorizedActions
      )
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
          return c(`${resource}-${action}`, {
            props: {
              ...props,
              item: store.state[resource].item
            }
          });
        },
        async beforeRouteEnter(to, from, next) {
          /**
           * Route model binding
           */
          let { data } = await store.dispatch(`${resource}/getOne`, {
            id: to.params.id
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
                return c(`${resource}-${action}`, {
                  props
                });
              }
            },
        meta: {
          resource
        },
        beforeEnter: (to, from, next) => {
          /**
           * Build default main title
           */
          to.meta.title = this.$t(`va.pages.${action}`, {
            resource: this.$tc(
              `resources.${resource}`,
              action === "list" ? 10 : 1
            ).toLowerCase(),
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
    this.$router.addRoutes([
      {
        path: `/${resource}`,
        component: {
          render(c) {
            return c("router-view");
          }
        },
        meta: {
          title: this.$tc(`resources.${resource}`, 10)
        },
        children: routes
          .filter(({ action }) => this.authorizedActions.includes(action))
          .map(({ action, path, item }) => buildRoute(action, path, item))
      }
    ]);
  },
  computed: {
    authorizedActions() {
      if (this.only.length) {
        return this.only;
      }

      if (this.except.length) {
        return actions.filter(a => !this.except.includes(a));
      }

      return actions;
    }
  },
  render() {
    return null;
  }
};
</script>
