interface MarkPriceData {
    bestBuyPrice: string;
    bestBuyQty: string;
    bestSellPrice: string;
    bestSellQty: string;
    markPrice: string;
}

interface StrikeTableRowProps {
    strike: number;
    callData: MarkPriceData | null | undefined;
    putData: MarkPriceData | null | undefined;
    isHighlighted: boolean;
}

export type { MarkPriceData, StrikeTableRowProps };