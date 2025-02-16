import type React from 'react';

// export interface cellStyle {
//     align?: 'left' | 'center' | 'right'; // セル内文字位置（既定は left）
//     width?: string; // セルの幅
//     border?: boolean; // 枠線表示
// }

export interface SimpleTableProps {
    data: {
        thead: string[][]; // ヘッダー行
        tbody: string[][]; // 本文行
        tfoot: string[][]; // フッター行
    };
    isRowFirstHeader?: boolean; // 本文・フッター各行の最初のセルを <th> として出力するか
    colgroup?: number[]; // 各列の span 値（例: [2, 3]）
    thStyle?: React.CSSProperties;
    tdStyle?: React.CSSProperties;
}

interface ProcessedCell {
    content: string;
    colspan: number;
    rowspan: number;
    hidden: boolean; // すでに merge 済みの場合はレンダリングしない
}

/**
 * セクション内（thead/tbody/tfoot）の 2 次元配列データを処理し、
 * ・横方向の結合："_" の場合は左セルに結合（colspan 増加）
 * ・縦方向の結合："|" の場合は上セルに結合（rowspan 増加）
 * するための helper 関数
 */
const processSection = (rows: string[][]): ProcessedCell[][] => {
    // 最初に各セルの初期状態を作成
    const processed: ProcessedCell[][] = rows.map(row =>
        row.map(cell => ({
            content: cell,
            colspan: 1,
            rowspan: 1,
            hidden: false,
        })),
    );

    // 横方向のマージ：セルの内容が "_" の場合、左側の表示セルに結合する
    for (let i = 0; i < processed.length; i++) {
        const row = processed[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j].hidden) continue;
            if (row[j].content === '_') {
                // 左側で未非表示のセルを探す
                let k = j - 1;
                while (k >= 0 && row[k].hidden) {
                    k--;
                }
                if (k >= 0) {
                    row[k].colspan += 1;
                    row[j].hidden = true;
                }
            }
        }
    }

    // 縦方向のマージ：セルの内容が通常値の場合、下行同一列のセルが "|" なら merge する
    const rowCount = processed.length;
    // ※各行の列数は同じである前提
    const colCount = processed[0]?.length || 0;
    for (let j = 0; j < colCount; j++) {
        for (let i = 0; i < rowCount; i++) {
            const cell = processed[i][j];
            if (cell.hidden) continue;
            // 横マージ済みや、結合対象記号の場合は対象外
            if (cell.content === '_' || cell.content === '|') continue;
            let rowspanCount = 1;
            let r = i + 1;
            while (r < rowCount) {
                if (j < processed[r].length && processed[r][j].content === '|') {
                    processed[r][j].hidden = true;
                    rowspanCount++;
                    r++;
                } else {
                    break;
                }
            }
            cell.rowspan = rowspanCount;
        }
    }
    return processed;
};

const SimpleTable: React.FC<SimpleTableProps> = ({
    data,
    isRowFirstHeader = false,
    colgroup = [],
    thStyle = { textAlign: 'center', width: 'auto', border: '1px solid', padding: '0 0.5rem' },
    tdStyle = { textAlign: 'right', width: '3rem', border: '1px solid', padding: '0 0.5rem' },
}) => {
    // 各セクションを処理
    const headerRows = data.thead ? processSection(data.thead) : undefined;
    const bodyRows = data.tbody ? processSection(data.tbody) : [];
    const footerRows = data.tfoot ? processSection(data.tfoot) : undefined;

    /**
     * 各行（ProcessedCell[]）をレンダリング。
     * ヘッダーセクションでは常に <th> 、
     * 本文・フッターでは isRowFirstHeader の場合先頭セルを <th> にする
     */
    const renderRow = (row: ProcessedCell[], rowIndex: number, isHeaderSection: boolean) => (
        <tr key={rowIndex}>
            {row.map((cell, colIndex) => {
                if (cell.hidden) return null;
                if (isHeaderSection) {
                    return (
                        <th
                            key={colIndex.toString()}
                            colSpan={cell.colspan}
                            rowSpan={cell.rowspan}
                            style={{ ...thStyle }}
                        >
                            {cell.content}
                        </th>
                    );
                }
                if (isRowFirstHeader && colIndex === 0) {
                    return (
                        <th
                            key={colIndex.toString()}
                            colSpan={cell.colspan}
                            rowSpan={cell.rowspan}
                            style={{ ...thStyle }}
                        >
                            {cell.content}
                        </th>
                    );
                }
                return (
                    <td
                        key={colIndex.toString()}
                        colSpan={cell.colspan}
                        rowSpan={cell.rowspan}
                        style={{ ...tdStyle }}
                    >
                        {cell.content}
                    </td>
                );
            })}
        </tr>
    );

    return (
        <table className='min-w-full border-collapse'>
            {colgroup.length > 0 && (
                <colgroup>
                    {colgroup.map((span, index) => (
                        <col key={index.toString()} span={span} />
                    ))}
                </colgroup>
            )}

            {headerRows && <thead>{headerRows.map((row, i) => renderRow(row, i, true))}</thead>}

            {bodyRows && <tbody>{bodyRows.map((row, i) => renderRow(row, i, false))}</tbody>}

            {footerRows && <tfoot>{footerRows.map((row, i) => renderRow(row, i, false))}</tfoot>}
        </table>
    );
};

export default SimpleTable;
