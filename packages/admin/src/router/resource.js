export default ({ store, resource, title }) => {
  let { name, actions, translatable, getTitle, pluralName } = resource;

  const setTitle = (to, action, item = null) => {
    to.meta.title = getTitle(action, item);

    /**
     * Set main and document title
     */
    document.title = `${to.meta.title} | ${title}`;

    return title;
  };

  /**
   * Action route builder
   */
  const buildRoute = (action, path) => {
    return {
      path,
      name: `${name}_${action}`,
      props: true,
      component: {
        props: ["id"],
        render(c) {
          return c(`${name.replace("_", "-")}-${action}`, {
            props: {
              id: this.id,
              title: this.$route.meta.title,
              resource,
              item: store.state[name].item,
              permissions: store.getters["auth/getPermissions"],
            },
          });
        },
        async beforeRouteEnter(to, from, next) {
          /**
           * Initialize from query if available
           */
          let id = to.params.id || to.query.source;

          if (id) {
            /**
             * Route model binding
             */
            let { data } = await store.dispatch(`${name}/getOne`, {
              id,
            });

            /**
             * Insert model into route & resource store
             */
            store.commit(`${name}/setItem`, data);

            if (to.params.id) {
              setTitle(to, action, data);
              return next();
            }
          }

          setTitle(to, action);
          next();
        },
        beforeRouteLeave(to, from, next) {
          store.commit(`${name}/removeItem`);
          next();
        },
      },
      meta: {
        resource: name,
        translatable,
      },
    };
  };

  /**
   * Return crud routes for this resource
   */
  return {
    path: `/${name.replace("_", "-")}`,
    component: {
      render(c) {
        return c("router-view");
      },
    },
    meta: {
      title: pluralName,
    },
    children: [
      { name: "list", path: "/" },
      { name: "create", path: "create" },
      { name: "show", path: ":id" },
      { name: "edit", path: ":id/edit" },
    ]
      .filter(({ name }) => actions.includes(name))
      .map(({ name, path }) => buildRoute(name, path)),
  };
};
