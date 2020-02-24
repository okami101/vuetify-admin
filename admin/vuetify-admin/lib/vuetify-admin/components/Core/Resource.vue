<script>
import resource from "vuetify-admin/store/resource";
import { mapActions } from "vuex";

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
    /**
     * Register data api module for this resource
     */
    this.$store.registerModule(
      this.name,
      resource(
        this.$parent.$parent.$props.dataProvider,
        this.name,
        this.getActions
      )
    );

    /**
     * Register crud routes for this resource
     */
    let name = this.name;
    let children = [];
    let permissions = this.$store.getters["auth/getPermissions"];

    let beforeEnter = async (to, from, next) => {
      switch (to.meta.action) {
        case "show":
        case "edit":
          /**
           * Load linked resource route
           */
          await this.getOne({ resource: name, params: { id: to.params.id } });
          break;
      }

      to.meta.title = this.$t(`va.pages.${to.meta.action}`, {
        resource: this.$tc(
          `resources.${name}`,
          to.meta.action === "list" ? 10 : 1
        ).toLowerCase(),
        id: to.params.id
      });
      next();
    };

    let props = {
      permissions,
      resource: name
    };

    if (this.hasAction("list")) {
      children.push({
        path: "/",
        name: `${name}_list`,
        component: {
          render(c) {
            return c(`${name}-list`, {
              props
            });
          }
        },
        meta: {
          action: "list",
          resource: name
        },
        beforeEnter
      });
    }
    if (this.hasAction("create")) {
      children.push({
        path: "create",
        name: `${name}_create`,
        props: { permissions },
        component: {
          render(c) {
            return c(`${name}-create`, {
              props
            });
          }
        },
        meta: {
          action: "create",
          resource: name
        },
        beforeEnter
      });
    }
    if (this.hasAction("edit")) {
      children.push({
        path: ":id/edit",
        name: `${name}_edit`,
        props: { permissions },
        component: {
          render(c) {
            return c(`${name}-edit`, {
              props
            });
          },
          beforeRouteLeave(to, from, next) {
            this.$store.commit(`${name}/removeItem`);
            next();
          }
        },
        props: true,
        meta: {
          action: "edit",
          resource: name
        },
        beforeEnter
      });
    }
    if (this.hasAction("show")) {
      children.push({
        path: ":id",
        name: `${name}_show`,
        props: { permissions },
        component: {
          render(c) {
            return c(`${name}-show`, {
              props
            });
          },
          beforeRouteLeave(to, from, next) {
            this.$store.commit(`${name}/removeItem`);
            next();
          }
        },
        props: true,
        meta: {
          action: "show",
          resource: name
        },
        beforeEnter
      });
    }
    this.$router.addRoutes([
      {
        path: `/${this.name}`,
        component: {
          render(c) {
            return c("router-view");
          }
        },
        meta: {
          title: this.$tc(`resources.${name}`, 10)
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
    ...mapActions({
      getOne: "api/getOne"
    }),
    hasAction(name) {
      return this.getActions.includes(name);
    }
  },
  render() {
    return null;
  }
};
</script>
