import { NextResponse } from 'next/server';

import config from 'src/config';

const GET = async () => {
    try {
        const response = await fetch(config.endpoint.exchangeInfo);

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch exchange info' },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};

export { GET };