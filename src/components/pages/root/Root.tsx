'use client';

import React, { useEffect, useRef, useState } from 'react';
import config from 'src/config';
import utils from 'src/utils';

import Heading from 'src/components/ui/heading/Heading';
import OptionsTable from 'src/components/ui/optionsTable/OptionsTable';

import helpers from './helpers';

import type { State } from './types';

import styling from './Root.module.scss';

const Root = () => {
    // State
    const [{ isLoading, deadlineTimestamp, deadlineDate, optionsChain, highlightStrike }, setState] = useState<State>({
        isLoading: true,
        deadlineTimestamp: utils.time.getNextFridayTimestamp(),
        deadlineDate: '',
        optionsChain: null,
        highlightStrike: null
    });


    // Refs
    const websocketRef = useRef<WebSocket | null>(null);


    /**
     * Fetches the exchange info and builds the initial chain
     */
    useEffect(() => {
        const fetchExchangeInfo = async () => {
            const res = await fetch(config.endpoint.exchangeInfoApiRoute);
            const data = await res.json();

            const isDataValid = data.optionSymbols && data.optionSymbols.length > 0;

            const optionsChain = isDataValid ? helpers.buildInitialChain({
                instruments: data.optionSymbols,
                deadlineTimestamp: utils.time.getNextFridayTimestamp(),
                baseCoin: 'BTC'
            }) : null;

            // Format the deadline timestamp for display
            const deadlineTimestampFormatted = new Date(utils.time.getNextFridayTimestamp()).toLocaleString(undefined, {
                timeZone: 'UTC',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            setState((prev) => ({
                ...prev,
                optionsChain,
                deadlineDate: deadlineTimestampFormatted,
                isLoading: isDataValid
            }));
        };

        fetchExchangeInfo();
    }, [deadlineTimestamp]);


    /**
     * Sets up the websocket and updates the chain when new mark prices are received
     */
    useEffect(() => {
        if (!optionsChain || websocketRef.current) {
            return;
        }

        const websocket = new WebSocket(config.endpoint.markPriceStream);
        websocketRef.current = websocket;

        websocket.onmessage = (event) => {
            const msg = JSON.parse(event.data);

            setState((prev) => {
                const now = new Date();
                const nowInMilliseconds = now.getTime();

                if (deadlineTimestamp < nowInMilliseconds) {
                    return {
                        ...prev,
                        isLoading: true,
                        deadlineTimestamp: utils.time.getNextFridayTimestamp()
                    };
                }

                if (!prev.optionsChain) {
                    return prev;
                }

                const newChain = new Map(prev.optionsChain);

                let closestStrike: number | null = null;
                let minDiff = Infinity;

                for (const item of msg.data) {
                    const parts = item.s.split('-');
                    if (parts.length !== 4) {
                        continue;
                    }

                    const strike = Number(parts[2]);
                    if (!strike) {
                        continue;
                    }

                    const row = newChain.get(strike);
                    if (!row) {
                        continue;
                    }

                    const targetStrike = item.i * 1.25;
                    const diff = Math.abs(strike - targetStrike);

                    if (diff < minDiff) {
                        minDiff = diff;
                        closestStrike = strike;
                    }

                    const side = parts[3] === 'C' ? 'CALL' : 'PUT';

                    if (side === 'CALL' && row.call) {
                        row.call = {
                            ...row.call,
                            markPriceData: {
                                bestBuyPrice: item.bo,
                                bestBuyQty: item.bq,
                                bestSellPrice: item.ao,
                                bestSellQty: item.aq,
                                markPrice: item.mp,
                                indexPrice: item.indexPrice
                            }
                        };
                    }

                    if (side === 'PUT' && row.put) {
                        row.put = {
                            ...row.put,
                            markPriceData: {
                                bestBuyPrice: item.bo,
                                bestBuyQty: item.bq,
                                bestSellPrice: item.ao,
                                bestSellQty: item.aq,
                                markPrice: item.mp,
                                indexPrice: item.indexPrice
                            }
                        };
                    }
                }

                return {
                    ...prev,
                    optionsChain: newChain,
                    highlightStrike: closestStrike,
                    isLoading: false
                };
            });
        };

        return () => {
            if (websocketRef.current) {
                websocketRef.current.close();
                websocketRef.current = null;
            }
        };
    }, [deadlineTimestamp, optionsChain]);


    // Determine UI content
    let content = (
        <div>Loading information ...</div>
    );

    if (!isLoading && !optionsChain) {
        content = (
            <div>No data available</div>
        );
    }

    if (!isLoading && optionsChain) {
        content = (
            <OptionsTable
                optionsChain={optionsChain}
                highlightStrike={highlightStrike}
            />
        );
    }


    return (
        <>
            <Heading level={1} size="l">
                Binance options chain
            </Heading>

            <div className={styling.card}>
                <Heading level={2} size="s">Expires on:</Heading>

                <p>{deadlineDate || '-'}</p>
            </div>

            {content}
        </>
    );
};

export default Root;