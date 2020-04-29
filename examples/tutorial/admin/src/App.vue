<template>
    <va-admin>
        <va-header
            slot="header"
            :header-menu="headerMenu"
            :profile-menu="profileMenu"
            dense
            dark
            @mini="mini = !mini"
        ></va-header>
        <va-sidebar
            slot="sidebar"
            :menu="sidebarMenu"
            :mini="mini"
        ></va-sidebar>
        <va-footer slot="footer" :menu="footerMenu">
            &copy; 2020,
            <v-icon size="18">
                mdi-xml
            </v-icon>
            with
            <v-icon size="18">
                mdi-heart
            </v-icon>
            by
            <a href="https://www.company.com">My Awesome Company</a> for a
            better web.
        </va-footer>
        <impersonate-message slot="message"></impersonate-message>
    </va-admin>
</template>

<script>
import ImpersonateMessage from "@/components/ImpersonateMessage";
import nav from "./_nav";

export default {
    name: "App",
    components: {
        ImpersonateMessage,
    },
    data() {
        return {
            mini: false,
            headerMenu: [
                {
                    link: "/",
                    text: this.$t("menu.dashboard"),
                },
            ],
            footerMenu: [
                {
                    href: "#",
                    text: "About Us",
                },
                {
                    href: "#",
                    text: "Blog",
                },
                {
                    href: "#",
                    text: "License",
                },
            ],
            profileMenu: [
                {
                    icon: "mdi-account",
                    text: this.$t("menu.profile"),
                    link: "/profile",
                },
            ],
            sidebarMenu: nav(this.$i18n, this.$admin.getResourceLink),
        };
    },
};
</script>
