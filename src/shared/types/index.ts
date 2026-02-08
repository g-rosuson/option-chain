type OptionSymbol = {
    expiryDate: number;
    symbol: string;
    side: 'CALL' | 'PUT';
    strikePrice: string;
    underlying: string;
    status: string;
    markPriceData: {
        bestBuyPrice: string;
        bestBuyQty: string;
        bestSellPrice: string;
        bestSellQty: string;
        markPrice: string;
        indexPrice: string;
    };
};

interface StrikeRow {
    strike: number;
    call?: OptionSymbol;
    put?: OptionSymbol;
}

type OptionsChain = Map<number, StrikeRow>;

export type { OptionSymbol, StrikeRow, OptionsChain };