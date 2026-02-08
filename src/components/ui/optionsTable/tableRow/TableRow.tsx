import React from 'react';

import type { StrikeTableRowProps } from './types';

import styling from './TableRow.module.scss';

/**
 * Memoized table row component that only re-renders when the data has changed.
 */
const StrikeTableRow = React.memo(({ strike, callData, putData, isHighlighted }: StrikeTableRowProps) => {
    return (
        <tr className={styling.row} data-highlighted={isHighlighted}>
            <td className={styling.data}>{callData?.bestBuyQty ?? '-'}</td>
            <td className={styling.data}>{callData?.bestBuyPrice ?? '-'}</td>
            <td className={styling.data}>{callData?.bestSellPrice ?? '-'}</td>
            <td className={styling.data}>{callData?.bestSellQty ?? '-'}</td>
            <td className={styling.strike}>
                {strike}
            </td>
            <td className={styling.data}>{putData?.bestBuyQty ?? '-'}</td>
            <td className={styling.data}>{putData?.bestBuyPrice ?? '-'}</td>
            <td className={styling.data}>{putData?.bestSellPrice ?? '-'}</td>
            <td className={styling.data}>{putData?.bestSellQty ?? '-'}</td>
        </tr>
    );
});

StrikeTableRow.displayName = 'StrikeTableRow';
export default StrikeTableRow;