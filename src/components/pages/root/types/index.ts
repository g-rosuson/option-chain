import type { OptionsChain, OptionSymbol } from 'src/shared/types';

interface State {
    isLoading: boolean;
    deadlineTimestamp: number;
    deadlineDate: string;
    optionsChain: OptionsChain | null;
    highlightStrike: number | null;
}

interface BuildInitialChainParams {
    instruments: OptionSymbol[];
    deadlineTimestamp: number;
    baseCoin: 'BTC' | 'ETH';
}

export type { State, BuildInitialChainParams };