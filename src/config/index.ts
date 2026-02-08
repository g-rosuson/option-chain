const config = {
    endpoint: {
        markPriceStream: `${process.env.NEXT_PUBLIC_BINANCE_MARK_PRICE_ENDPOINT}`,
        exchangeInfo: `${process.env.NEXT_PUBLIC_BINANCE_EXCHANGE_INFO_ENDPOINT}`
    }
};

export default config;