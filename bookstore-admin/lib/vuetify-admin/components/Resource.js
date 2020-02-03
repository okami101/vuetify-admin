import api from "../store/api";

export default {
  name: "Resource",
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
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
      api(this.$parent.$parent.$props.dataProvider, this.name, this.actions)
    );

    /**
     * Register crud routes for this resource
     */
    let id = this.id;
    let children = [];

    if (this.hasAction("list")) {
      children.push({
        path: "/",
        name: `${id.toLowerCase()}_list`,
        component: {
          render(c) {
            return c(`${id}List`);
          }
        }
      });
    }
    if (this.hasAction("create")) {
      children.push({
        path: "create",
        name: `${id.toLowerCase()}_create`,
        component: {
          render(c) {
            return c(`${id}Create`);
          }
        }
      });
    }
    if (this.hasAction("edit")) {
      children.push({
        path: ":id/edit",
        name: `${id.toLowerCase()}_edit`,
        component: {
          render(c) {
            return c(`${id}Edit`);
          }
        },
        props: true
      });
    }
    if (this.hasAction("show")) {
      children.push({
        path: ":id",
        name: `${id.toLowerCase()}_show`,
        component: {
          render(c) {
            return c(`${id}Show`);
          }
        },
        props: true
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
