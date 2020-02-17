<script>
import { VTabs, VTab, VTabItem, VIcon } from "vuetify/lib";

export default {
  name: "TabbedShow",
  components: {
    VTabs,
    VTab,
    VIcon,
    VTabItem
  },
  data() {
    return {
      currentTab: this.$route.hash.substring(1)
    };
  },
  watch: {
    currentTab(val) {
      if (val) {
        const hash = `#${val}`;

        if (this.$route.hash !== hash) {
          this.$router.replace({ hash: `#${val}` });
        }
      }
    }
  },
  render(c) {
    let tabs = this.$slots.default.map(s => {
      return {
        id: s.componentOptions.propsData.id,
        icon: s.componentOptions.propsData.icon,
        label: s.componentOptions.propsData.label
      };
    });

    return c(
      "v-tabs",
      {
        props: {
          value: this.currentTab
        },
        attrs: {
          grow: true
        },
        on: {
          change: number => {
            this.currentTab = number;
          }
        }
      },
      [
        [
          ...tabs.map(t =>
            c(
              "v-tab",
              {
                attrs: {
                  href: `#tab-${t.id}`
                }
              },
              [
                c(
                  "v-icon",
                  {
                    attrs: {
                      small: true
                    },
                    class: "mr-2"
                  },
                  t.icon
                ),
                t.label
              ]
            )
          ),
          ...tabs.map((t, i) =>
            c(
              "v-tab-item",
              {
                attrs: {
                  value: `tab-${t.id}`
                },
                class: "pt-6"
              },
              [this.$slots.default[i]]
            )
          )
        ]
      ]
    );
  }
};
</script>
