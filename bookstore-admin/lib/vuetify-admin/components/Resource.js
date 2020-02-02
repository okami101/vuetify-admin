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
    list: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
    create: {
      type: Boolean,
      default: true
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  created() {
    /**
     * Register crud routes for this resource
     */
    let id = this.id;
    let children = [];

    if (this.list) {
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
    if (this.create) {
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
    if (this.edit) {
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
    if (this.show) {
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
  render() {
    return null;
  }
};
