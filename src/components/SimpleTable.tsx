import type React from 'react';

export interface SpanData {
    positionX: number;
    positionY: number;
    span: number;
}

// export interface ColgroupData {
//     span: number;
//     border?: boolean;
// }

export interface SimpleTableProps {
    data: string[][]; // セルの内容を行列として指定
    isThead?: boolean; // data の最初の行を <thead> とするか
    isTfoot?: boolean; // data の最後の行を <tfoot> とするか
    isRowFirstHeader?: boolean; // 各行の最初のセルを <th> で出力するか
    colgroup?: number[]; // 各 col の span 値を指定（例: [2, 3]）
    colspan?: SpanData[]; // 各セルの colspan 設定（1始まりの座標 x, y と n の値）
    rowspan?: SpanData[]; // 各セルの rowspan 設定（1始まりの座標 x, y と n の値）
    rowgroup?: number[]; // body 部分の行をグループ分割する。各数値はそのグループの行数
    thStyle?: {
        align?: 'left' | 'center' | 'right'; // th 要素の文字位置（既定値は left）
        width?: string; // th 要素の幅
        border?: boolean; // th 要素の枠線を表示するか
    };
    tdStyle?: {
        align?: 'left' | 'center' | 'right'; // td 要素の文字位置（既定値は left）
        width?: string; // td 要素の幅
        border?: boolean; // td 要素の枠線を表示するか
    };
}

const SimpleTable: React.FC<SimpleTableProps> = ({
    data,
    isThead = false,
    isTfoot = false,
    isRowFirstHeader = false,
    colgroup = [],
    colspan = [],
    rowspan = [],
    rowgroup,
    thStyle = { align: 'left', width: 'auto', border: true },
    tdStyle = { align: 'left', width: 'auto', border: true },
}) => {
    // ヘッダー・フッター・body 行の抽出
    let headRow: string[] | undefined;
    let footRow: string[] | undefined;
    let bodyRows: string[][] = [];

    if (isThead && data.length > 0) {
        headRow = data[0];
    }
    if (isTfoot && data.length > 0) {
        footRow = data[data.length - 1];
    }
    if (isThead && isTfoot) {
        bodyRows = data.slice(1, data.length - 1);
    } else if (isThead) {
        bodyRows = data.slice(1);
    } else if (isTfoot) {
        bodyRows = data.slice(0, data.length - 1);
    } else {
        bodyRows = data;
    }

    // rowgroup 指定による body 行のグループ分け
    let groupedBodyRows: string[][][] = [];
    if (rowgroup && rowgroup.length > 0) {
        let index = 0;
        for (const groupCount of rowgroup) {
            groupedBodyRows.push(bodyRows.slice(index, index + groupCount));
            index += groupCount;
        }
        if (index < bodyRows.length) {
            groupedBodyRows.push(bodyRows.slice(index));
        }
    } else {
        groupedBodyRows = [bodyRows];
    }

    /**
     * renderCell 関数
     * ・JSX で <td> もしくは <th> を返す
     * ・rowIndex / colIndex は 1 始まり（colspan/rowspan の指定と合わせる）
     */
    const renderCell = (content: string, rowIndex: number, colIndex: number) => {
        let cellColspan: number | undefined = undefined;
        let cellRowspan: number | undefined = undefined;

        const foundColspan = colspan.find(
            item => item.positionX === colIndex + 1 && item.positionY === rowIndex,
        );
        if (foundColspan) {
            cellColspan = foundColspan.span;
        }
        // console.log({ content, cellColspan });

        const foundRowspan = rowspan.find(
            item => item.positionX === colIndex + 1 && item.positionY === rowIndex,
        );
        if (foundRowspan) {
            cellRowspan = foundRowspan.span;
        }
        // console.log({ cellRowspan });

        if (isRowFirstHeader && colIndex === 0) {
            return (
                <th
                    key={colIndex}
                    // className={thStyle.border ? 'border' : ''}
                    colSpan={cellColspan}
                    rowSpan={cellRowspan}
                    align={thStyle.align}
                    style={{
                        width: thStyle.width,
                        padding: '0 0.5rem',
                        border: thStyle.border ? '1px solid var(--sl-color-white)' : 'none',
                    }}
                >
                    {content}
                </th>
            );
        }
        return (
            <td
                key={colIndex}
                // className={tdStyle.border ? 'border' : ''}
                colSpan={cellColspan}
                rowSpan={cellRowspan}
                align={tdStyle.align}
                style={{
                    width: tdStyle.width,
                    padding: '0 0.5rem',
                    border: tdStyle.border ? '1px solid var(--sl-color-white)' : 'none',
                }}
            >
                {content}
            </td>
        );
    };

    return (
        <table className='min-w-full border-collapse'>
            {colgroup && colgroup.length > 0 && (
                <colgroup>
                    {colgroup.map(spanValue => (
                        <col key={spanValue.toString()} span={spanValue} />
                    ))}
                </colgroup>
            )}

            {headRow && (
                <thead>
                    <tr>{headRow.map((cell, j) => renderCell(cell, 1, j))}</tr>
                </thead>
            )}

            {groupedBodyRows.map((group, groupIndex) => (
                <tbody key={groupIndex.toString()}>
                    {group.map((row, i) => {
                        // 全体での行番号の計算
                        const overallIndex =
                            (headRow ? 1 : 0) +
                            groupedBodyRows
                                .slice(0, groupIndex)
                                .reduce((sum, g) => sum + g.length, 0) +
                            i +
                            1;
                        return (
                            <tr key={i.toString()}>
                                {row.map((cell, j) => renderCell(cell, overallIndex, j))}
                            </tr>
                        );
                    })}
                </tbody>
            ))}

            {footRow && (
                <tfoot>
                    <tr>{footRow.map((cell, j) => renderCell(cell, data.length, j))}</tr>
                </tfoot>
            )}
        </table>
    );
};

export default SimpleTable;
