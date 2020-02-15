<script>
import resource from "../../store/resource";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "Resource",
  props: {
    name: {
      type: String,
      required: true
    },
    humanize: {
      type: [String, Function],
      required: true
    },
    actions: {
      type: Array,
      default: () => ["list", "show", "create", "edit", "delete"]
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
        this.actions
      )
    );

    /**
     * Register crud routes for this resource
     */
    let name = this.name;
    let children = [];
    let meta = {
      humanize: this.humanize
    };

    let beforeEnter = async (to, from, next) => {
      this.setResourceName(name);

      switch (to.meta.action) {
        case "list":
          to.meta.title = this.$t("va.titles.list", {
            resource: this.$tc(`resources.${name}`, 10).toLowerCase()
          });
          break;
        case "create":
          to.meta.title = this.$t("va.titles.create", {
            resource: this.$tc(`resources.${name}`, 1).toLowerCase()
          });
          break;
        case "show":
        case "edit":
          /**
           * Load linked resource route
           */
          let resource = await this.getOne({
            id: to.params.id
          });

          to.meta.title = this.$t(`va.titles.${to.meta.action}`, {
            resource: this.$tc(`resources.${name}`, 1).toLowerCase(),
            title: to.meta.humanize(resource),
            id: resource.id
          });
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
          ...meta,
          action: "list"
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
          ...meta,
          action: "create"
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
          ...meta,
          action: "edit"
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
          ...meta,
          action: "show"
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
  methods: {
    ...mapMutations({
      setResourceName: "api/setResourceName",
      setResourceLabel: "api/setResourceLabel"
    }),
    ...mapActions({
      getOne: "api/getOne"
    }),
    hasAction(name) {
      return this.actions.includes(name);
    }
  },
  render() {
    return null;
  }
};
</script>
