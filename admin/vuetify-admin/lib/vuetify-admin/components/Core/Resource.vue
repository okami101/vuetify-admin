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
    let children = [];
    let permissions = store.getters["auth/getPermissions"];

    /**
     * Register data api module for this resource
     */
    store.registerModule(
      resource,
      resourceCrudApi(
        this.$parent.$parent.$props.dataProvider,
        resource,
        this.getActions
      )
    );

    let beforeEnter = async (to, from, next) => {
      to.meta.title = this.$t(`va.pages.${to.meta.action}`, {
        resource: this.$tc(
          `resources.${resource}`,
          to.meta.action === "list" ? 10 : 1
        ).toLowerCase(),
        id: to.params.id
      });
      next();
    };

    const props = {
      permissions,
      resource
    };

    const itemComponent = action => {
      return {
        functional: true,
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
          await store.dispatch(`${resource}/getOne`, {
            id: to.params.id
          });
          next();
        },
        beforeRouteLeave(to, from, next) {
          store.commit(`${resource}/removeItem`);
          next();
        }
      };
    };

    /**
     * Register crud routes for this resource
     */
    if (this.hasAction("list")) {
      children.push({
        path: "/",
        name: `${resource}_list`,
        component: {
          functional: true,
          render(c) {
            return c(`${resource}-list`, {
              props
            });
          }
        },
        meta: {
          action: "list",
          resource
        },
        beforeEnter
      });
    }
    if (this.hasAction("create")) {
      children.push({
        path: "create",
        name: `${resource}_create`,
        component: {
          functional: true,
          render(c) {
            return c(`${resource}-create`, {
              props
            });
          }
        },
        meta: {
          action: "create",
          resource
        },
        beforeEnter
      });
    }
    if (this.hasAction("edit")) {
      children.push({
        path: ":id/edit",
        name: `${resource}_edit`,
        component: itemComponent("edit"),
        meta: {
          action: "edit",
          resource
        },
        beforeEnter
      });
    }
    if (this.hasAction("show")) {
      children.push({
        path: ":id",
        name: `${resource}_show`,
        component: itemComponent("show"),
        meta: {
          action: "show",
          resource
        },
        beforeEnter
      });
    }
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
        children
      }
    ]);
  },
  computed: {
    getActions() {
      if (this.only.length) {
        return this.only;
      }

      if (this.except.length) {
        return actions.filter(a => !this.except.includes(a));
      }

      return actions;
    }
  },
  methods: {
    hasAction(name) {
      return this.getActions.includes(name);
    }
  },
  render() {
    return null;
  }
};
</script>
