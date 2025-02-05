import mermaid from 'mermaid';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function ThemeReactMermaid({ src }: { src: string }) {
    const mermaidRef = useRef<HTMLDivElement>(null);

    const [theme, setTheme] = useState<'default' | 'dark'>(
        document.documentElement.dataset.theme === 'light' ? 'default' : 'dark',
    );

    // mermaidの再レンダリング用の関数
    const renderMermaid = useCallback(async () => {
        try {
            if (!mermaidRef.current) return;

            // DOMの準備を待つ
            await new Promise(resolve => setTimeout(resolve, 0));

            // mermaidの初期化と再レンダリング(https://mermaid.js.org/config/setup/interfaces/mermaid.Mermaid.html#initialize)
            mermaid.initialize({
                startOnLoad: false,
                theme: theme,
                securityLevel: 'loose', // SVG レンダリングの制限を緩和
                themeVariables: {
                    // テーマに基づいたスタイルを定義
                    fontSize: '14px',
                    dark: {
                        background: '#333',
                        nodeBackground: '#555',
                        nodeBorder: '#888',
                        nodeTextColor: '#fff',
                        lineColor: '#888',
                        mainTextColor: '#fff',
                    },
                    default: {
                        background: '#fff',
                        nodeBackground: '#fff',
                        nodeBorder: '#888',
                        nodeTextColor: '#333',
                        lineColor: '#888',
                        mainTextColor: '#333',
                    },
                },
            });

            // 既存の内容をクリア
            mermaidRef.current.innerHTML = src;

            // レンダリング前にDOMの準備ができていることを確認
            await new Promise(resolve => setTimeout(resolve, 100));

            // mermaidのレンダリング(https://mermaid.js.org/config/setup/interfaces/mermaid.Mermaid.html#render)
            const { svg } = await mermaid.render(`mermaid-${Date.now()}`, src);

            // SVGを挿入
            if (mermaidRef.current) {
                mermaidRef.current.innerHTML = svg;
            }
        } catch (error) {
            console.error('Mermaid rendering error:', error);
        }
    }, [src, theme]);

    // テーマ変更の監視と初回レンダリング用の Effect
    useEffect(() => {
        // コールバック関数を定義
        const observerCallback: MutationCallback = (mutationsList: MutationRecord[]) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    const newTheme =
                        document.documentElement.dataset.theme === 'light' ? 'default' : 'dark';
                    setTheme(newTheme || 'light');
                }
            }
        };

        // MutationObserverを作成し、HTML ルート要素の属性の変更を監視
        const observer = new MutationObserver(observerCallback);
        observer.observe(document.documentElement, { attributes: true });

        // renderMermaid();
        // 初回レンダリング
        const timer = setTimeout(() => {
            renderMermaid();
        }, 0);

        // クリーンアップ関数を返す(コンポーネントのアンマウント時に監視を停止: メモリーリーク対策)
        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, [renderMermaid]);

    return (
        <>
            <div ref={mermaidRef} className='my-4 rounded-lg border border-solid p-4'>
                {src}
            </div>
            {/* <div
                ref={mermaidRef}
                class='mr-auto ml-auto max-w-fit rounded-lg border border-solid p-4'
            >
                {src}
            </div> */}
        </>
    );
}
