<script>
import resource from "../../store/resource";
import { mapMutations, mapActions } from "vuex";

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

    let beforeEnter = async (to, from, next) => {
      this.setResourceName(name);

      switch (to.meta.action) {
        case "show":
        case "edit":
          /**
           * Load linked resource route
           */
          await this.getOne({ id: to.params.id });
          break;
      }
      next();
    };

    if (this.hasAction("list")) {
      children.push({
        path: "/",
        name: `${name}_list`,
        component: {
          render(c) {
            return c(`${name}-list`);
          }
        },
        meta: {
          action: "list",
          title: this.$t("va.pages.list")
        },
        beforeEnter
      });
    }
    if (this.hasAction("create")) {
      children.push({
        path: "create",
        name: `${name}_create`,
        component: {
          render(c) {
            return c(`${name}-create`);
          }
        },
        meta: {
          action: "create",
          title: this.$t("va.pages.create")
        },
        beforeEnter
      });
    }
    if (this.hasAction("edit")) {
      children.push({
        path: ":id/edit",
        name: `${name}_edit`,
        component: {
          render(c) {
            return c(`${name}-edit`);
          }
        },
        props: true,
        meta: {
          action: "edit",
          title: this.$t("va.pages.edit")
        },
        beforeEnter
      });
    }
    if (this.hasAction("show")) {
      children.push({
        path: ":id",
        name: `${name}_show`,
        component: {
          render(c) {
            return c(`${name}-show`);
          }
        },
        props: true,
        meta: {
          action: "show",
          title: this.$t("va.pages.show")
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
    ...mapMutations({
      setResourceName: "api/setResourceName",
      setResourceLabel: "api/setResourceLabel"
    }),
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
