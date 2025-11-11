export default {
    title: "Bigstone Wiki",
    description: "A wiki for Bigstone and our projects! Make sure your components align with the standards.",
    themeConfig: {
        logo: "/logo.png",
        siteTitle: "Bigstone Wiki",
        footer: {
            message: "Released under the CC BY-NC-ND 4.0 License.",
            copyright: "Copyright © 2025-present Bigstone Development",
        },
        nav: [
            { text: "About", link: "/about" },
            { text: "Contact", link: "/contact" },
            { text: "Guides", link: "/guides" },
            { text: "Standards", link: "/standards" },
            { text: "History", link: "/history" },
        ],
        sidebar: [
            {
                text: "Main",
                collapsible: true,
                items: [
                    { text: "Introduction", link: "/about" },
                    { text: "Getting Started", link: "/standards" },
                    { text: "Our History", link: "/history" },
                ],
            },
            {
                text: "Sandbox",
                collapsible: false,
                items: [
                    { text: "Introduction", link: "https://sandbox.bigstone.dev" },
                    { text: "Downloads", link: "https://sandbox.bigstone.dev/downloads" },
                    { text: "Guides", link: "/guides" },
                ],
            },
            {
                text: "Other",
                collapsible: true,
                items: [
                    { text: "Main Website", link: "https://bigstone.dev" },
                    { text: "Sandbox Website", link: "https://sandbox.bigstone.dev" },
                    { text: "Our Discord", link: "https://discord.bigstone.dev" },
                ],
            },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/BigstoneDevelopment" },
            { icon: "discord", link: "https://discord.bigstone.dev", target: "_blank" },
        ],

        lastUpdated: {
              text: 'Updated at',
              formatOptions: {
                    dateStyle: 'full',
                    timeStyle: 'medium'
              }
        },
        search: {
              provider: 'local'
        },
    },
};
