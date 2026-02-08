const config = {
    endpoint: {
        markPriceStream: `${process.env.NEXT_PUBLIC_BINANCE_MARK_PRICE_ENDPOINT || ''}`,
        exchangeInfoApiRoute: `${process.env.NEXT_PUBLIC_EXCHANGE_INFO_API_ROUTE || ''}`,
        exchangeInfo: `${process.env.NEXT_PUBLIC_BINANCE_EXCHANGE_INFO_ENDPOINT || ''}`
    }
};

export default config;