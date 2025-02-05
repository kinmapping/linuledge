export type Site = {
    website: string;
    author: string;
    profile: string;
    desc: string;
    title: string;
    ogImage?: string;
    lightAndDarkMode: boolean;
    postPerIndex: number;
    postPerPage: number;
    scheduledPostMargin: number;
    showArchives?: boolean;
    editPost?: {
        url?: URL['href'];
        text?: string;
        appendFilePath?: boolean;
    };
};

export interface Image {
    url: string;
    alt: string;
}

export interface Frontmatter {
    layout?: string;
    title: string;
    pubDate: string;
    description: string;
    author: string;
    image?: Image;
    tags: string[];
}
export interface CmdFrontmatter {
    layout?: string;
    title: string;
    description: string;
    image?: Image;
    tags: string[];
    featured: boolean;
    draft: boolean;
    author: string;
    pubDatetime: Date;
    modDatetime: Date;
}

export interface Post {
    frontmatter: Frontmatter;
    // content: string;
}

export interface OGData {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
}

interface BadgeConfig {
    text: string;
    variant?: 'note' | 'tip' | 'caution' | 'danger' | 'success' | 'default';
    class?: string;
}

export interface AstroContentModule {
    frontmatter: {
        title: string;
        description: string;
        tags: string[];
        sidebar: {
            label: string;
            order: number;
            badge: BadgeConfig;
        };
    };
    getHeadings: () => unknown;
    exampleCode: () => string;
    fileName: string;
    highlights: unknown;
    url: string;
    file: string;
    Content: unknown;
    default: unknown;
}
