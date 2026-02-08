import type { BuildInitialChainParams } from '../types';
import type { OptionsChain, StrikeRow } from 'src/shared/types';


/**
 * Builds the initial chain from the instruments
 * @param instruments - The instruments to build the chain from
 * @param deadlineTimestamp - The deadline timestamp
 * @param baseCoin - The base coin to build the chain for
 * @returns The built chain
 */
const buildInitialChain = ({ instruments, deadlineTimestamp, baseCoin }: BuildInitialChainParams): OptionsChain => {
    const underlying = `${baseCoin}USDT`;
    const chain = new Map<number, StrikeRow>();

    for (const instrument of instruments || []) {
        if (
            instrument.underlying !== underlying ||
            instrument.status !== 'TRADING' ||
            instrument.expiryDate !== deadlineTimestamp
        ) {
            continue;
        }

        const strike = Number(instrument.strikePrice);

        let row = chain.get(strike);
        if (!row) {
            row = { strike };
            chain.set(strike, row);
        }

        if (instrument.side === 'CALL') {
            row.call = instrument;
        }

        if (instrument.side === 'PUT') {
            row.put = instrument;
        }
    }

    return chain;
};


const helpers = {
    buildInitialChain
};

export default helpers;