import starlightPlugin from '@astrojs/starlight-tailwind';
import type { Config } from 'tailwindcss';

// Generated color palettes
const accent = {
    100: 'var(--accent-100)',
    200: 'var(--accent-200)',
    300: 'var(--accent-300)',
    400: 'var(--accent-400)',
    500: 'var(--accent-500)',
    600: 'var(--accent-600)',
    700: 'var(--accent-700)',
    800: 'var(--accent-800)',
    900: 'var(--accent-900)',
};
const gray = {
    100: 'var(--color-gray-1)',
    200: 'var(--color-gray-2)',
    300: 'var(--color-gray-3)',
    400: 'var(--color-gray-4)',
    500: 'var(--color-gray-5)',
    600: 'var(--color-gray-6)',
    700: 'var(--color-gray-7)',
    800: 'var(--color-gray-8)',
    900: 'var(--color-gray-9)',
};

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './src/tailwind.css'],
    theme: {
        extend: {
            colors: { accent, gray },
            textShadow: {
                neon: 'var(--text-shadow)',
            },
        },
        fontFamily: {
            // 好みのテキストフォント。Starlightはデフォルトでシステムフォントスタックを使用します。
            sans: ['Hannari'],
            // sans: ['和田研細丸ゴシック'],
            // sans: ['"Atkinson Hyperlegible"'],
            // 好みのコードフォント。Starlightはデフォルトでシステムの等幅フォントを使用します。
            mono: ['"IBM Plex Mono"'],
        },
        fontSize: {
            '2xs': '0.67rem',
            xs: '0.75rem',
            sm: '0.8rem',
            base: '0.88rem',
            lg: '0.95rem',
            xl: '1rem',
            '2xl': '1.2rem',
            '3xl': '1.4rem',
            '4xl': '1.7rem',
            '5xl': '2rem',
            '6xl': '3.2rem',
        },
        boxShadow: {
            // depressed
            '2xs-depressed': 'var(--xxs-depressed)',
            'xs-depressed': 'var(--xs-depressed)',
            's-depressed': 'var(--s-depressed)',
            // bump
            sbump: 'var(--sbump)',
            'sbump-active': 'var(--sbump-active)',
            mbump: 'var(--mbump)',
            'mbump-active': 'var(--mbump-active)',
            // distinct
            'xs-distinct': 'var(--xs-distinct)',
        },
    },
    plugins: [
        starlightPlugin(),
        // plugin(function ({matchUtilities, theme}) {
        //     matchUtilities(
        //         {
        //             'text-shadow': value => ({
        //                 textShadow: value,
        //             }),
        //         },
        //         { values: theme('textShadow') },
        //     );
        // })
    ],
} satisfies Config;
