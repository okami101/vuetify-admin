export default ({ store, i18n, resource, title }) => {
  let { name, actions, translatable, titles = {} } = resource;

  const setTitle = (to, action, item = null) => {
    if (item) {
      /**
       * Build default main title with item
       */
      to.meta.title = titles[action]
        ? titles[action](data)
        : i18n.t(`va.pages.${action}`, {
            resource: i18n.tc(`resources.${name}.name`, 1).toLowerCase(),
            id: to.params.id
          });
    } else {
      /**
       * Build default main title
       */
      to.meta.title =
        titles[action] ||
        i18n.t(`va.pages.${action}`, {
          resource: i18n
            .tc(`resources.${name}.name`, action === "list" ? 10 : 1)
            .toLowerCase()
        });
    }

    /**
     * Set main and document title
     */
    //store.commit("layout/setTitle", to.meta.title || this.title);
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
      component: {
        render(c) {
          return c(`${name}-${action}`);
        },
        async beforeRouteEnter(to, from, next) {
          if (to.params.id) {
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

            setTitle(to, action, data);
            return next();
          }

          setTitle(to, action);
          next();
        },
        beforeRouteLeave(to, from, next) {
          store.commit(`${name}/removeItem`);
          next();
        }
      },
      meta: {
        resource: name,
        translatable,
        actions
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
      { action: "list", path: "/" },
      { action: "create", path: "create" },
      { action: "show", path: ":id" },
      { action: "edit", path: ":id/edit" }
    ]
      .filter(({ action }) => actions.includes(action))
      .map(({ action, path }) => buildRoute(action, path))
  };
};
