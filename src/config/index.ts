const config = {
    endpoint: {
        markPriceStream: 'wss://fstream.binance.com/market/stream?streams=btcusdt@optionMarkPrice',
        exchangeInfoApiRoute: '/api/exchange-info',
        exchangeInfo: 'https://eapi.binance.com/eapi/v1/exchangeInfo'
    }
};

export default config;