import api from "../../store/api";

export default {
  name: "Resource",
  props: {
    name: {
      type: String,
      required: true
    },
    listLabel: String,
    showLabel: Function,
    createLabel: String,
    editLabel: Function,
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
      api(this.$parent.$parent.$props.dataProvider, this.name, this.actions)
    );

    /**
     * Register crud routes for this resource
     */
    let name = this.name;
    let children = [];

    let beforeEnter = async (to, from, next) => {
      document.title = to.meta.label;

      next();
    };

    let getResourceBeforeEnter = async (to, from, next) => {
      let response = await this.$store.dispatch(`${name}/getOne`, {
        id: to.params.id
      });

      if (response.status !== 200) {
        return Promise.reject(response.statusText);
      }

      to.meta.resource = await response.json();
      to.meta.label = to.meta.resourceLabel(to.meta.resource);
      document.title = to.meta.label;

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
          resource: name,
          action: "list",
          label: this.listLabel || `${name} list`
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
          resource: name,
          action: "create",
          label: this.createLabel || `${name} create`
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
          resource: name,
          action: "edit",
          label: `${name} edit`,
          resourceLabel: this.editLabel
        },
        beforeEnter: getResourceBeforeEnter
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
          resource: name,
          action: "show",
          label: `${name} show`,
          resourceLabel: this.showLabel
        },
        beforeEnter: getResourceBeforeEnter
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
          label: "Books"
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
