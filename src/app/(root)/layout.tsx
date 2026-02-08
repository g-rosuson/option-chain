import React from 'react';
import { jetBrainsMono } from 'src/resources/fonts';

import Layout from 'src/components/shared/layout/Layout';
import Heading from 'src/components/ui/heading/Heading';

import 'src/stylesheets/global.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </head>

            <body className={jetBrainsMono.className}>
                <main>
                    <Layout>
                        <Heading level={1} size="s">
                            Options app
                        </Heading>

                        {children}
                    </Layout>
                </main>
            </body>
        </html>
    );
}