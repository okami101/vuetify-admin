export default (store, i18n, resource, actions) => {
  /**
   * Route item component builder (edit and show)
   */
  const itemComponent = action => {
    return {
      render(c) {
        return c(`${resource}-${action}`);
      },
      async beforeRouteEnter(to, from, next) {
        /**
         * Route model binding
         */
        let { data } = await store.dispatch("api/getOne", {
          resource,
          params: {
            id: to.params.id
          }
        });

        /**
         * Insert model into resource store
         */
        store.commit(`${resource}/setItem`, data);
        next();
      },
      beforeRouteLeave(to, from, next) {
        store.commit(`${resource}/removeItem`);
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
      name: `${resource}_${action}`,
      component: item
        ? itemComponent(action)
        : {
            render(c) {
              return c(`${resource}-${action}`);
            }
          },
      meta: {
        resource
      },
      beforeEnter: (to, from, next) => {
        /**
         * Build default main title
         */
        to.meta.title = i18n.t(`va.pages.${action}`, {
          resource: i18n
            .tc(`resources.${resource}.name`, action === "list" ? 10 : 1)
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
    path: `/${resource}`,
    component: {
      render(c) {
        return c("router-view");
      }
    },
    meta: {
      title: i18n.tc(`resources.${resource}.name`, 10)
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
