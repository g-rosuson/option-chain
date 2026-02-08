import React from 'react';

import Heading from '../heading/Heading';
import StrikeTableRow from './tableRow/TableRow';

import type { OptionsChain } from 'src/shared/types';

import styling from './OptionsTable.module.scss';

const OptionsTable = ({ optionsChain, highlightStrike }: { optionsChain: OptionsChain, highlightStrike: number | null }) => {
    const sortedOptionsByStrike = Array.from(optionsChain.values()).sort((a, b) => a.strike - b.strike);

    return (
        <div className={styling.container}>
            <table className={styling.table}>
                <thead>
                    <tr className={styling.row}>
                        <th className={styling.head} colSpan={4}>
                            CALLS
                        </th>

                        <th className={styling.spacer} colSpan={1}/>

                        <th className={styling.head} colSpan={4}>
                            PUTS
                        </th>
                    </tr>
                    <tr className={styling.row}>
                        <th className={styling.category}>Bid Qty</th>
                        <th className={styling.category}>Bid</th>
                        <th className={styling.category}>Ask</th>
                        <th className={styling.category}>Ask Qty</th>

                        <th className={styling.strike}>Strike</th>

                        <th className={styling.category}>Bid Qty</th>
                        <th className={styling.category}>Bid</th>
                        <th className={styling.category}>Ask</th>
                        <th className={styling.category}>Ask Qty</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedOptionsByStrike.map((row) => (
                        <StrikeTableRow
                            key={row.strike}
                            strike={row.strike}
                            callData={row.call?.markPriceData}
                            putData={row.put?.markPriceData}
                            isHighlighted={row.strike === highlightStrike}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OptionsTable;