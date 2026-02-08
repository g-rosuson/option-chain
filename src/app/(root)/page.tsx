import React from 'react';
import { Metadata } from 'next';

import RootPage from 'src/components/pages/root/Root';
import Heading from 'src/components/ui/heading/Heading';


export const metadata: Metadata = {
    metadataBase: new URL('https://www.options-url.com'),
    title: 'Option chain service',
    description: 'Option chain service is a platform for trading options on the Binance exchange.',
    openGraph: {
        title: 'Option chain service',
        description: 'Options is a platform for trading options on the Binance exchange.',
        type: 'website',
        images: []
    }
};

const Root = async () => {
    return (
        <>
            <Heading level={1} size="s">
                Options app
            </Heading>

            <RootPage/>
        </>
    );
};

export default Root;