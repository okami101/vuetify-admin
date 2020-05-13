import upperFirst from "lodash/upperFirst";

export default ({ i18n, locales }) => {
  const defaultNumberFormat = {
    en: {
      currency: {
        style: "currency",
        currency: "USD",
      },
    },
    fr: {
      currency: {
        style: "currency",
        currency: "EUR",
      },
    },
  };

  /**
   * Load i18n locales
   */
  Object.keys(locales).forEach((locale) => {
    i18n.mergeLocaleMessage(locale, { va: locales[locale] });

    /**
     * Date format
     */
    i18n.mergeDateTimeFormat("en", {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      long: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      },
      longWithTime: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
      },
    });

    /**
     * Number format
     */
    if (defaultNumberFormat[locale]) {
      i18n.mergeNumberFormat(locale, defaultNumberFormat[locale]);
    }
  });

  /**
   * Default try to humanize i18n locale
   */
  i18n.missing = (locale, key, vm, values) => {
    let label = key;
    let lastIndex = key.lastIndexOf(".");

    if (lastIndex !== -1) {
      label = key.substr(lastIndex + 1, key.length);
    }

    return upperFirst(label.replace("_", " "));
  };
};
