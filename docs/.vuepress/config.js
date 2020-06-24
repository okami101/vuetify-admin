module.exports = (ctx) => ({
  locales: {
    "/": {
      lang: "en-US",
      title: "Vtec Admin",
      description: "🚀 Integrate Vue-powered Admin Framework",
    },
    /*"/fr/": {
      lang: "fr-FR",
      title: "Vtec Admin",
      description: "Librairie Admin SPA"
    }*/
  },
  head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    [
      "link",
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#da532c" }],
    ["meta", { name: "theme-color", content: "#41b883" }],
  ],
  themeConfig: {
    repo: "okami101/vtec-admin",
    editLinks: true,
    docsDir: "docs",
    // #697 Provided by the official algolia team.
    algolia: ctx.isProd
      ? {
          appId: "8GJW59LEHF",
          apiKey: "d12d25e8d8e68781b4f2cff49aea7645",
          indexName: "docs_vtec",
        }
      : null,
    smoothScroll: true,
    locales: {
      "/": {
        label: "English",
        selectText: "Languages",
        ariaLabel: "Select language",
        editLinkText: "Edit this page on GitHub",
        lastUpdated: "Last Updated",
        nav: [
          {
            text: "Guide",
            link: "/guide/",
          },
          {
            text: "Vtec Admin",
            link: "https://www.npmjs.com/package/vtec-admin",
          },
          {
            text: "Vue CLI Plugin",
            link:
              "https://www.npmjs.com/package/vue-cli-plugin-vtec-admin",
          },
          {
            text: "Laravel",
            link: "https://github.com/okami101/vtec-laravel-crud",
          },
          {
            text: "Demo",
            link: "https://vtec-bookstore-demo.okami101.io",
          },
        ],
        sidebar: {
          "/guide/": getGuideSidebar(
            "Guide",
            "Zero to One",
            "CRUD",
            "Components"
          ),
        },
      },
      /*"/fr/": {
        label: "Français",
        selectText: "Langues",
        ariaLabel: "Sélectionner une langue",
        editLinkText: "Editer cette page sur Github",
        lastUpdated: "Dernière mise à jour",
        nav: [
          {
            text: "Guide",
            link: "/fr/guide/"
          }
        ],
        sidebar: {
          "/fr/guide/": getGuideSidebar("Guide", "Zéro à Un", "Composants")
        }
      }*/
    },
  },
  plugins: [
    ["@vuepress/back-to-top", true],
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
    ["@vuepress/medium-zoom", true],
    [
      "vuepress-plugin-code-copy",
      {
        color: "#41b883",
      },
    ],
    'vuepress-plugin-element-tabs',
    [
      "container",
      {
        type: "vue",
        before: '<pre class="vue-container"><code>',
        after: "</code></pre>",
      },
    ],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-169208301-1",
      },
    ],
  ],
  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      md.use(require("./markdown-it-json-table"));
    },
  },
});

function getGuideSidebar(groupA, groupB, groupC, groupD) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 2,
      children: ["", "getting-started", "tutorial", "api-platform", "laravel"],
    },
    {
      title: groupB,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "data-providers",
        "admin",
        "resources",
        "i18n",
        "authentication",
        "authorization",
        "generators",
      ],
    },
    {
      title: groupC,
      collapsable: false,
      sidebarDepth: 2,
      children: ["crud/layout", "crud/list", "crud/show", "crud/form"],
    },
    {
      title: groupD,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "components/fields",
        "components/inputs",
        "components/buttons",
        "components/mixins",
      ],
    },
  ];
}
