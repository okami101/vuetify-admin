module.exports = (ctx) => ({
  dest: "../../docs",
  locales: {
    "/": {
      lang: "en-US",
      title: "Vtec Admin",
      description: "SPA Admin Library",
    },
    /*"/fr/": {
      lang: "fr-FR",
      title: "Vtec Admin",
      description: "Librairie Admin SPA"
    }*/
  },
  head: [
    ["link", { rel: "icon", href: `/logo.png` }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#41b883" }],
  ],
  themeConfig: {
    repo: "okami101/vtec-admin",
    editLinks: true,
    docsDir: "packages/docs",
    // #697 Provided by the official algolia team.
    algolia: ctx.isProd
      ? {
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
        ],
        sidebar: {
          "/guide/": getGuideSidebar("Guide", "Zero to One", "CRUD", "Components"),
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
    [
      "container",
      {
        type: "vue",
        before: '<pre class="vue-container"><code>',
        after: "</code></pre>",
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
      children: ["", "getting-started", "laravel", "tutorial"],
    },
    {
      title: groupB,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "data-providers",
        "authentication",
        "admin",
        "resources",
        "i18n",
        "authorization",
        "generators",
      ],
    },
    {
      title: groupC,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "crud/layout",
        "crud/list",
        "crud/show",
        "crud/form",
      ],
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
