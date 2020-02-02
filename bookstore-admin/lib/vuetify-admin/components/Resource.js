export default {
  name: "Resource",
  functional: true,
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
    console.log("ok");
    /**
     * Register crud routes for this resource
     */
    let children = [];

    if (this.list) {
      children.push({
        path: "/",
        name: `${this.id.toLowerCase()}_list`,
        component: {
          render(c) {
            return c(`${this.id}List`);
          }
        }
      });
    }
    this.$router.addRoutes({
      path: this.name,
      redirect: this.name,
      name: this.id.toLowerCase(),
      component: {
        render(c) {
          return c("router-view");
        }
      },
      children
    });
  },
  render() {
    return null;
  }
};
