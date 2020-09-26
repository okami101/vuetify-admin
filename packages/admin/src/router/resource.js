import camelCase from "lodash/camelCase";
import kebabCase from "lodash/kebabCase";
import upperFirst from "lodash/upperFirst";

export default ({ store, i18n, resource, title }) => {
  let { name, include, routes, translatable, getTitle, pluralName } = resource;

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
          let componentName = `${upperFirst(camelCase(name))}${upperFirst(
            action
          )}`;

          let props = {
            id: this.id,
            title: this.$route.meta.title,
            resource,
            item: store.state[name].item,
            permissions: store.getters["auth/getPermissions"],
          };

          if (componentName in this.$options.components) {
            /**
             * Return client side page component
             */
            return c(componentName, {
              props,
            });
          }

          /**
           * Return guesser page component
           */
          return c(`Va${upperFirst(action)}Guesser`, {
            props,
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
            try {
              let { data } = await store.dispatch(`${name}/getOne`, {
                id,
                include,
              });

              /**
               * Insert model into route & resource store
               */
              store.commit(`${name}/setItem`, data);

              if (to.params.id) {
                setTitle(to, action, data);
                return next();
              }
            } catch ({ status, message }) {
              to.meta.title = message;
              document.title = message;

              store.commit(`messages/setError`, {
                status,
                message:
                  status === 404
                    ? i18n.t("va.pages.not_found", {
                        resource: resource.singularName,
                        id,
                      })
                    : message,
              });
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
        authenticated: true,
        resource: name,
        translatable,
      },
    };
  };

  /**
   * Return crud routes for this resource
   */
  return {
    path: `/${kebabCase(name)}`,
    component: {
      render(c) {
        return c("router-view");
      },
    },
    meta: {
      title: pluralName,
    },
    children: [
      { name: "list", path: "" },
      { name: "create", path: "create" },
      { name: "show", path: ":id" },
      { name: "edit", path: ":id/edit" },
    ]
      .filter(({ name }) => routes.includes(name))
      .map(({ name, path }) => buildRoute(name, path)),
  };
};
