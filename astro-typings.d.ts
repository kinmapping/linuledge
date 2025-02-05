declare module '*.astro' {
    import type { AstroComponentFactory } from 'astro';
    const AstroComponent: AstroComponentFactory;
    export default AstroComponent;
}

declare module '@astrojs/starlight/utils/user-config';
