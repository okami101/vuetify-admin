export default ({ store, i18n, resource }) => {
  let { name, actions } = resource;

  /**
   * Route item component builder (edit and show)
   */
  const itemComponent = action => {
    return {
      render(c) {
        return c(`${name}-${action}`);
      },
      async beforeRouteEnter(to, from, next) {
        /**
         * Route model binding
         */
        let { data } = await store.dispatch("api/getOne", {
          resource: name,
          params: {
            id: to.params.id
          }
        });

        /**
         * Insert model into resource store
         */
        store.commit(`${name}/setItem`, data);
        next();
      },
      beforeRouteLeave(to, from, next) {
        store.commit(`${name}/removeItem`);
        next();
      }
    };
  };

  /**
   * Action route builder
   */
  const buildRoute = (action, path, item = false) => {
    return {
      path,
      name: `${name}_${action}`,
      component: item
        ? itemComponent(action)
        : {
            render(c) {
              return c(`${name}-${action}`);
            }
          },
      meta: {
        resource: name
      },
      beforeEnter: (to, from, next) => {
        /**
         * Build default main title
         */
        to.meta.title = i18n.t(`va.pages.${action}`, {
          resource: i18n
            .tc(`resources.${name}.name`, action === "list" ? 10 : 1)
            .toLowerCase(),
          id: to.params.id
        });
        next();
      }
    };
  };

  /**
   * Return crud routes for this resource
   */
  return {
    path: `/${name}`,
    component: {
      render(c) {
        return c("router-view");
      }
    },
    meta: {
      title: i18n.tc(`resources.${name}.name`, 10)
    },
    children: [
      { action: "list", path: "/", item: false },
      { action: "create", path: "create", item: false },
      { action: "show", path: ":id", item: true },
      { action: "edit", path: ":id/edit", item: true }
    ]
      .filter(({ action }) => actions.includes(action))
      .map(({ action, path, item }) => buildRoute(action, path, item))
  };
};
