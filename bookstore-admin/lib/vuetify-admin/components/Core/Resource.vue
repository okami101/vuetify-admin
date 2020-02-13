<script>
import resource from "../../store/resource";
import capitalize from "lodash/capitalize";

export default {
  name: "Resource",
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    singular: {
      type: String,
      required: true
    },
    stringify: {
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
      resource: name,
      label: this.label,
      singular: this.singular,
      stringify: this.stringify
    };

    let beforeEnter = async (to, from, next) => {
      let { model, label, singular, stringify } = to.meta;

      switch (to.meta.action) {
        case "list":
          to.meta.title = `List of ${label.toLowerCase()}`;
          break;
        case "create":
          to.meta.title = `Create new ${singular.toLowerCase()}`;
          break;
        case "show":
        case "edit":
          /**
           * Load model route and check validity before enter
           */
          let response = await this.$store.dispatch(`${name}/getOne`, {
            id: to.params.id
          });

          if (response.status !== 200) {
            return Promise.reject(response.statusText);
          }

          to.meta.model = await response.json();
          to.meta.title = `${capitalize(
            to.meta.action
          )} ${singular.toLowerCase()} "${stringify(to.meta.model)}" (#${
            to.meta.model.id
          })`;
          break;
      }

      document.title = to.meta.title;
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
          title: this.label
        },
        children
      }
    ]);
  },
  methods: {
    hasAction(name) {
      return this.actions.includes(name);
    }
  },
  render() {
    return null;
  }
};
</script>
