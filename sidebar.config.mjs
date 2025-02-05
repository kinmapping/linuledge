// src/config/sidebar.config.mjs
export default [
    {
        label: 'Astro Starlight',
        collapsed: true,
        items: [
            {
                label: 'ガイド',
                autogenerate: { directory: 'astro-starlight/guide' },
            },
            {
                label: 'Component',
                collapsed: true,
                autogenerate: { directory: 'astro-starlight/component' },
            },
            {
                label: 'CSS',
                autogenerate: { directory: 'astro-starlight/css' },
            },
            {
                label: '要件',
                autogenerate: { directory: 'astro-starlight/requirement' },
            },
        ],
    },
    {
        label: 'システム設計',
        collapsed: true,
        items: [
            {
                label: 'アジャイル開発',
                collapsed: true,
                autogenerate: { directory: 'system-design/agile' },
            },
            {
                label: 'ウォーターフォール',
                collapsed: true,
                autogenerate: { directory: 'system-design/waterfall' },
            },
            {
                label: 'テスト駆動開発',
                collapsed: true,
                autogenerate: { directory: 'system-design/tdd' },
            },
            {
                label: 'AI駆動開発',
                collapsed: true,
                autogenerate: { directory: 'system-design/ai-driven-development' },
            },
        ],
    },
    {
        label: 'Go',
        collapsed: true,
        items: [
            {
                label: 'Goの基礎',
                collapsed: true,
                autogenerate: { directory: 'golang/base' },
            },
            {
                label: 'Goコマンド',
                collapsed: true,
                autogenerate: { directory: 'golang/cmd' },
            },
        ],
    },
    {
        label: 'Linux',
        collapsed: true,
        items: [
            {
                label: 'コマンド',
                collapsed: true,
                items: [
                    {
                        label: 'bash組み込み',
                        collapsed: true,
                        autogenerate: { directory: 'linux/cmd/builtin' },
                    },
                    {
                        label: 'ファイル・ディレクトリ操作',
                        collapsed: true,
                        autogenerate: { directory: 'linux/cmd/file-operation' },
                    },
                    {
                        label: '探す・調べる',
                        collapsed: true,
                        autogenerate: { directory: 'linux/cmd/search' },
                    },
                    {
                        label: 'システム運用・管理',
                        collapsed: true,
                        autogenerate: { directory: 'linux/cmd/operation-monitoring' },
                    },
                    {
                        label: 'ネットワーク',
                        collapsed: true,
                        autogenerate: { directory: 'linux/cmd/network' },
                    },
                    {
                        label: '構築',
                        collapsed: true,
                        autogenerate: { directory: 'linux/cmd/build' },
                    },
                    {
                        label: 'セキュリティ',
                        collapsed: true,
                        autogenerate: { directory: 'linux/cmd/security' },
                    },
                    {
                        label: 'リモートサーバー連携',
                        collapsed: true,
                        autogenerate: { directory: 'linux/cmd/remote-server-con' },
                    },
                    {
                        label: 'メール',
                        collapsed: true,
                        autogenerate: { directory: 'linux/cmd/mail' },
                    },
                ],
            },
            {
                label: '記事',
                items: [
                    {
                        label: 'ハードウェア機器',
                        collapsed: true,
                        autogenerate: { directory: 'linux/posts/hardware' },
                    },
                    {
                        label: 'OS',
                        collapsed: true,
                        autogenerate: { directory: 'linux/posts/os' },
                    },
                    {
                        label: 'リポジトリ・パッケージ',
                        collapsed: true,
                        autogenerate: { directory: 'linux/posts/repository-package' },
                    },
                    {
                        label: 'ネットワーク について',
                        collapsed: true,
                        autogenerate: { directory: 'linux/posts/network' },
                    },
                    {
                        label: 'システム管理',
                        collapsed: true,
                        autogenerate: { directory: 'linux/posts/system-manage' },
                    },
                    {
                        label: 'Webサーバ',
                        collapsed: true,
                        autogenerate: { directory: 'linux/posts/web-server' },
                    },
                    {
                        label: 'Mail について',
                        collapsed: true,
                        autogenerate: { directory: 'linux/posts/mail' },
                    },
                    {
                        label: 'ログ管理',
                        collapsed: true,
                        autogenerate: { directory: 'linux/posts/log-manage' },
                    },
                    {
                        label: 'DNS について',
                        collapsed: true,
                        autogenerate: { directory: 'linux/posts/dns' },
                    },
                    {
                        label: 'シェルスクリプト',
                        collapsed: true,
                        autogenerate: { directory: 'linux/posts/shellscript' },
                    },
                ],
            },
        ],
    },
    {
        label: 'Usacloud',
        collapsed: true,
        autogenerate: { directory: 'usacloud' },
    },
    {
        label: 'Terraform',
        collapsed: true,
        items: [
            {
                label: 'Terraform について',
                autogenerate: { directory: 'terraform/about-terraform' },
            },
            {
                label: 'AWS プロバイダ',
                autogenerate: { directory: 'terraform/aws-provider-services' },
            },
            {
                label: 'さくらクラウド プロバイダ',
                autogenerate: { directory: 'terraform/sakuracloud-provider-services' },
            },
            {
                label: 'Terraform コマンド',
                collapsed: true,
                items: [
                    {
                        label: '主要なワークフローコマンド',
                        autogenerate: { directory: 'terraform/cmds/main-commands' },
                    },
                    {
                        label: '一般的でないコマンドや高度なコマンド',
                        autogenerate: {
                            directory: 'terraform/cmds/all-other-commands',
                        },
                    },
                ],
            },
        ],
    },
    {
        label: 'Ansible',
        collapsed: true,
        items: [
            {
                label: 'Ansible の基本',
                autogenerate: { directory: 'ansible/about-ansible' },
            },
            {
                label: 'Ansible コマンド',
                autogenerate: { directory: 'ansible/cmds' },
            },
            {
                label: 'モジュールの使用例',
                autogenerate: { directory: 'ansible/modules' },
            },
        ],
    },
];
