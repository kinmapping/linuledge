import db from '@astrojs/db';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import rehypeMermaid from 'rehype-mermaid';
// import remarkSubSuper from 'remark-sub-super';
import { loadEnv } from 'vite';

// ヘルパー関数経由で環境変数を呼び出す
const { SITE_URL, EDIT_SITE_URL, SOCIAL_GITHUB } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// sidebar 設定を別ファイルからインポート
import sidebarConfig from './sidebar.config.mjs';

// https://astro.build/config
export default defineConfig({
    // サイトマップ有効化
    site: SITE_URL,
    markdown: {
        // shikiConfig: {
        //     theme: 'one-dark-pro',
        // },
        // remarkPlugins: [mdxMermaid],
        // remarkPlugins: [[mdxMermaid.default, { output: 'svg' }]],
        rehypePlugins: [[rehypeMermaid, { strategy: 'img-svg', dark: true }]],
    },

    integrations: [
        react(),
        db(),
        starlight({
            title: 'Linuledge',

            components: {
                MobileMenuToggle: './src/custom-components/MobileMenuToggle.astro',
                Sidebar: './src/custom-components/Sidebar.astro',
                MarkdownContent: './src/custom-components/MarkdownContent.astro',
                PageFrame: './src/custom-components/PageFrame.astro',
                // mermaid: Mermaid,
                // mermaid: './src/components/Mermaid.astro',
            },
            defaultLocale: 'root',
            locales: {
                root: {
                    label: '日本語',
                    lang: 'ja',
                },
                en: {
                    label: 'English',
                },
            },
            logo: {
                src: './src/assets/linuledge-logo.svg',
                // replacesTitle: true,
            },
            customCss: [
                './src/styles/_sl-props.css',
                './src/tailwind.css',
                // @font-face CSSファイルへの相対パス
                // './src/fonts/font-face.css',
            ],
            editLink: {
                baseUrl: EDIT_SITE_URL,
            },
            tableOfContents: {
                minHeadingLevel: 2,
                maxHeadingLevel: 4,
            },
            social: {
                github: SOCIAL_GITHUB,
            },
            sidebar: sidebarConfig,
            // カスタム 404 ページを利用するか
            // disable404Route: true,
            credits: true,
        }),
        tailwind({
            // デフォルトのベーススタイルを無効にする
            applyBaseStyles: false,
        }),
        // vue({
        //     // This is needed, or else Vite will try to find image paths (which it wont be able to find because this will be called on the web, not directly)
        //     // For example <img src="/images/logo.png"> will not work without the code below
        //     template: {
        //         transformAssetUrls: {
        //             includeAbsolute: false,
        //         },
        //     },
        // }),
    ],
    // output: 'static',
    adapter: netlify(),
    // adapter: isProd ? netlify() : '',
    // 特定のパターンのページを事前レンダリング
    // prerender: {
    //     paths: ['/blog/*', '/about', '/products/[...slug]'],
    // },
    vite: {
        resolve: {
            alias: {
                // '@custom/*': './src/custom-components/*',
                '@astrojs/starlight/user-components/Icon.astro':
                    './src/custom-user-components/Icon.astro',
            },
        },
    },
});
